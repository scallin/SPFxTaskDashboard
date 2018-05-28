import{ ITasks } from '../models/ITasks';

export class TaskService {

    private static _sampleTaskData: ITasks[] = <ITasks[]> [
        {
            "__metadata": {
                "id": "20c3a02c-7aa9-4e24-b03b-e451797a4a0b",
                "uri": "http://sdcgisazapmdw35/sites/teamsite/_api/Web/Lists(guid'74009a48-983a-47ee-9017-a7b6fea36ed2')/Items(1)",
                "etag": "\"1\"",
                "type": "SP.Data.TasksListItem"
            },
            "Author": {
                "__metadata": {
                    "id": "4a66f1b6-fa7e-4b3f-be55-37eecf0342ee",
                    "type": "SP.Data.UserInfoItem"
                },
                "ID": 1,
                "Title": "Jones, Steve"
            },
            "Id": 1,
            "ID": 1,
            "Title": "SPFx PnP",
            "Created": "2018-04-30T17:45:43Z",
            "Priority": "(2) Normal",
            "Status": "In Progress",
            "StartDate": "2018-05-21T04:00:00Z",
            "DueDate": "2018-09-30T04:00:00Z"
        },
        {
            "__metadata": {
                "id": "890b8d4b-dc32-44bf-89e9-13a6ac4ee005",
                "uri": "http://sdcgisazapmdw35/sites/teamsite/_api/Web/Lists(guid'74009a48-983a-47ee-9017-a7b6fea36ed2')/Items(2)",
                "etag": "\"1\"",
                "type": "SP.Data.TasksListItem"
            },
            "Author": {
                "__metadata": {
                    "id": "0fc4a15c-4c53-43df-bc1f-d11b8a42a079",
                    "type": "SP.Data.UserInfoItem"
                },
                "ID": 1,
                "Title": "Jones, Steve"
            },
            "Id": 2,
            "ID": 2,
            "Title": "Office 365 Integration",
            "Created": "2018-04-30T17:46:17Z",
            "Priority": "(1) High",
            "Status": "In Progress",
            "StartDate": null,
            "DueDate": null
        },
        {
            "__metadata": {
                "id": "4212dc6a-4897-4525-a137-260762fd9737",
                "uri": "http://sdcgisazapmdw35/sites/teamsite/_api/Web/Lists(guid'74009a48-983a-47ee-9017-a7b6fea36ed2')/Items(3)",
                "etag": "\"1\"",
                "type": "SP.Data.TasksListItem"
            },
            "Author": {
                "__metadata": {
                    "id": "ce96da13-5dee-4c87-bf7a-d9bf72b5d0ab",
                    "type": "SP.Data.UserInfoItem"
                },
                "ID": 1,
                "Title": "Jones, Steve"
            },
            "Id": 3,
            "ID": 3,
            "Title": "Microsoft Teams",
            "Created": "2018-04-30T17:46:54Z",
            "Priority": "(2) Normal",
            "Status": "In Progress",
            "StartDate": "2018-04-30T04:00:00Z",
            "DueDate": null
        },
        {
            "__metadata": {
                "id": "d36634bc-798b-498a-953e-ec749731eef6",
                "uri": "http://sdcgisazapmdw35/sites/teamsite/_api/Web/Lists(guid'74009a48-983a-47ee-9017-a7b6fea36ed2')/Items(4)",
                "etag": "\"1\"",
                "type": "SP.Data.TasksListItem"
            },
            "Author": {
                "__metadata": {
                    "id": "11b1cbe4-efbd-4318-83fb-5f2dbd97f80a",
                    "type": "SP.Data.UserInfoItem"
                },
                "ID": 1,
                "Title": "Jones, Steve"
            },
            "Id": 4,
            "ID": 4,
            "Title": "Convert Fabulous 40",
            "Created": "2018-04-30T17:47:43Z",
            "Priority": "(2) Normal",
            "Status": "Not Started",
            "StartDate": null,
            "DueDate": null
        },
        {
            "__metadata": {
                "id": "6cf29d17-c957-4fe0-b31d-2f5e6a364121",
                "uri": "http://sdcgisazapmdw35/sites/teamsite/_api/Web/Lists(guid'74009a48-983a-47ee-9017-a7b6fea36ed2')/Items(5)",
                "etag": "\"1\"",
                "type": "SP.Data.TasksListItem"
            },
            "Author": {
                "__metadata": {
                    "id": "4b3058db-cb2d-47c2-8437-a887c9c27cfd",
                    "type": "SP.Data.UserInfoItem"
                },
                "ID": 1,
                "Title": "Jones, Steve"
            },
            "Id": 5,
            "ID": 5,
            "Title": "React Training",
            "Created": "2018-04-30T17:48:22Z",
            "Priority": "(1) High",
            "Status": "Not Started",
            "StartDate": null,
            "DueDate": null
        },
        {
            "__metadata": {
                "id": "82937c7a-302a-4b6b-bd90-5aebc06e8ab0",
                "uri": "http://sdcgisazapmdw35/sites/teamsite/_api/Web/Lists(guid'74009a48-983a-47ee-9017-a7b6fea36ed2')/Items(6)",
                "etag": "\"1\"",
                "type": "SP.Data.TasksListItem"
            },
            "Author": {
                "__metadata": {
                    "id": "b8665034-cac1-41ed-8f26-a85b3fabd808",
                    "type": "SP.Data.UserInfoItem"
                },
                "ID": 1,
                "Title": "Jones, Steve"
            },
            "Id": 6,
            "ID": 6,
            "Title": "TypeScript Training",
            "Created": "2018-04-30T17:48:54Z",
            "Priority": "(1) High",
            "Status": "In Progress",
            "StartDate": "2018-04-04T04:00:00Z",
            "DueDate": "2018-12-29T05:00:00Z"
        },
        {
            "__metadata": {
                "id": "268d1fd6-dcf4-4dfd-a1fd-a0b5d75204a2",
                "uri": "http://sdcgisazapmdw35/sites/teamsite/_api/Web/Lists(guid'74009a48-983a-47ee-9017-a7b6fea36ed2')/Items(7)",
                "etag": "\"1\"",
                "type": "SP.Data.TasksListItem"
            },
            "Author": {
                "__metadata": {
                    "id": "4331a258-d459-4408-ad65-de4991053a8c",
                    "type": "SP.Data.UserInfoItem"
                },
                "ID": 1,
                "Title": "Jones, Steve"
            },
            "Id": 7,
            "ID": 7,
            "Title": "Angular Training",
            "Created": "2018-04-30T17:49:10Z",
            "Priority": "(3) Low",
            "Status": "Deferred",
            "StartDate": null,
            "DueDate": null
        },
        {
            "__metadata": {
                "id": "cd354693-274a-43d9-bde0-76bb01d15041",
                "uri": "http://sdcgisazapmdw35/sites/teamsite/_api/Web/Lists(guid'74009a48-983a-47ee-9017-a7b6fea36ed2')/Items(8)",
                "etag": "\"1\"",
                "type": "SP.Data.TasksListItem"
            },
            "Author": {
                "__metadata": {
                    "id": "0e471415-7e8e-4b6e-bd5f-6031b6376eba",
                    "type": "SP.Data.UserInfoItem"
                },
                "ID": 1,
                "Title": "Jones, Steve"
            },
            "Id": 8,
            "ID": 8,
            "Title": "Flow",
            "Created": "2018-04-30T17:49:42Z",
            "Priority": "(2) Normal",
            "Status": "Not Started",
            "StartDate": null,
            "DueDate": null
        },
        {
            "__metadata": {
                "id": "4dd0d22a-c7ea-4945-9a41-f61144c293a5",
                "uri": "http://sdcgisazapmdw35/sites/teamsite/_api/Web/Lists(guid'74009a48-983a-47ee-9017-a7b6fea36ed2')/Items(9)",
                "etag": "\"1\"",
                "type": "SP.Data.TasksListItem"
            },
            "Author": {
                "__metadata": {
                    "id": "69b8ba76-ed19-47f7-a5f3-d532be838818",
                    "type": "SP.Data.UserInfoItem"
                },
                "ID": 1,
                "Title": "Jones, Steve"
            },
            "Id": 9,
            "ID": 9,
            "Title": "PowerApps",
            "Created": "2018-04-30T17:50:00Z",
            "Priority": "(1) High",
            "Status": "Not Started",
            "StartDate": null,
            "DueDate": null
        }
    ];

    public static getLocalTasks(): ITasks[] {
        return this._sampleTaskData;
    }
}