import { 
  DisplayMode,
  Environment,
  EnvironmentType,
  Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPComponentLoader } from '@microsoft/sp-loader';

import styles from './TaskDashboardWebPart.module.scss';
import * as strings from 'TaskDashboardWebPartStrings';
import { ITasks } from '../../models/ITasks';
import { TaskService } from '../../services/TaskService';
import * as $ from 'jquery';
require('datatables');
require('bootstrap');
import { Chart } from 'chart.js';
import * as moment from 'moment';

export interface ITaskDashboardWebPartProps {
  description: string;
  listName: string;
}

export default class TaskDashboardWebPart extends BaseClientSideWebPart<ITaskDashboardWebPartProps> {

  private _taskListName : string = 'Tasks';
  private _webUrl : string = '';
  private _requestData : string[];
  private _envType : string;
  private _taskData: ITasks[];

  private _backgroundColours: string[] = ['#ed7d31','#a074a6','#ffc000','#4472c4','#5b97d5','#FCE400','#F7931E','#39B54A','#df0007','#ffc000'];
  private _pieChartConfig = {
    type: 'pie',
    data: {
      labels: [],
      datasets: [{
          label: '',
          data: [],
          backgroundColor: this._backgroundColours
      }]
    },
    options: {
      responsive: true
    }
  };
  
  private _barChartConfig = {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: '',
        data: [],
        backgroundColor: this._backgroundColours
      }]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      },
      responsive: true
    }
  };

  protected onInit(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      console.log('in OnInit');
      if (this.properties.listName != "")
        this._taskListName = this.properties.listName;

      this._envType = Environment.type == EnvironmentType.Local ? 'local' : 'server';
      this._webUrl = this.context.pageContext.web.absoluteUrl;
      // load css for datatables
      SPComponentLoader.loadCss('https://cdn.datatables.net/1.10.12/css/jquery.dataTables.min.css');
      SPComponentLoader.loadCss('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');
      
      resolve();
    });
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="col-xs-12 col-sm-12 col-md-6">
        <div id="Chart1" class="panel panel-default">
            <div class="panel-heading">By Priority</div>
            <div class="panel-body" style="text-align: center;">
              <canvas id="chart-area" height="200" class="chartjs-render-monitor" ></canvas>
            </div>
          </div>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6">
        <div id="Chart2" class="panel panel-default">
            <div class="panel-heading">By Status</div>
            <div class="panel-body" style="text-align: center;">
              <canvas id="chart-area2" height="200" class="chartjs-render-monitor" ></canvas>
            </div>
          </div>
      </div>
      <table id="taskTable" class="display ${styles.taskDashboard}" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th scope="col">Title</th>
                <th scope="col">Priority</th>
                <th scope="col">Status</th>
                <th scope="col">Start Date</th>
                <th scope="col">Due Date</th>
            </tr>
        </thead>
      </table>`;

      // get task data
      if (Environment.type == EnvironmentType.Local) {
        console.log('local environment');
        this._taskData = TaskService.getLocalTasks();
        this.updateUI();
      }
      else {
        console.log('server environment');
        var reqUrl = this._webUrl + "/_api/web/Lists/GetByTitle('" + this._taskListName + "')/Items?$select=Id,Title,Priority,Status,Author/ID,Author/Title,Created,StartDate,DueDate&$expand=Author/ID,Author/Title&$orderby=Priority";
        console.log(reqUrl);
        var parent = this;
        $.ajax({
          url: reqUrl,
          type: "GET",
          headers: {
            "accept": "application/json;odata=verbose",
          },
          success: function(data) {
            console.log('success');
            parent._taskData = data.d.results;
            parent.updateUI();
          }
          ,
          error: function(error){
              console.log(JSON.stringify(error));
          }
        });
      }
  }

  public updateUI() {
    try {
      console.log('in update table method');
      let cTable: JQuery = $('#taskTable', this.domElement);
      (cTable as any).DataTable({
        data: this._taskData,
        columns: [
          {'data':'Title'},
          {'data':'Priority'},
          {'data':'Status'},
          {'data':'StartDate',
          'render': function(data) {
              if (data != "" && data != null) {
                return moment(data).format('YYYY/MM/DD');
              }
              else { return ''; }
            }
          },
          {'data':'DueDate',
          'render': function(data) {
              if (data != "" && data != null) {
                return moment(data).format('YYYY/MM/DD');
              }
              else { return ''; }
            }
          }
        ],
        "order": [[1, 'asc']]
      });

      var occurences;
      var result;
      var sCount;
      let ctx1: any = document.getElementById('chart-area');
      var chart1 = new Chart(ctx1, this._barChartConfig);
      occurences = this._taskData.reduce(function (r, row) {
          r[row.Priority] = ++r[row.Priority] || 1;
          return r;
        }, {}
      );
      
      result = Object.keys(occurences).map(function (key) {
        return { key: key, value: occurences[key] };
      });
      console.log('Priority: ' + result);
      for (sCount = 0; sCount < result.length; sCount++) {
        this._barChartConfig.data.labels[sCount] = result[sCount].key;
        this._barChartConfig.data.datasets[0].data[sCount] = result[sCount].value;
      }
      chart1.update();
      
      let ctx2: any = document.getElementById('chart-area2');
      var chart2 = new Chart(ctx2, this._pieChartConfig);
      
      occurences = this._taskData.reduce(function (r, row) {
          r[row.Status] = ++r[row.Status] || 1;
          return r;
        }, {}
      );
      result = Object.keys(occurences).map(function (key) {
        return { key: key, value: occurences[key] };
      });
      console.log('Status: ' + result);
      for (sCount = 0; sCount < result.length; sCount++) {
        this._pieChartConfig.data.labels[sCount] = result[sCount].key;
        this._pieChartConfig.data.datasets[0].data[sCount] = result[sCount].value;
      }
      chart2.update();
    }
    catch (err) {
      console.error(err);
    }
    
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('listName', {
                  label: strings.ListNameFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
