##EasyRest
### REST framework for implementing REST service.

Install
```js
npm install @stjohnd777/easyrest
```
### Overview
- uses express
- will create express instance if not provided
- will piggyback on express instance if provided
- provides heart beat service /ping
- supports http and https
- stand up a dozen services in a day

Just define the  object literal
```js
let ep = {
  method: method,
  path: path,
  provider: async (req,res) => { ...}
}
```
Or Use object constructor
```js

let ep = new RestEndpoint(method, path, provider)
```

Example Hello World

GET Request at /hello
```js

const {RestServiceFactory } = require('@stjohnd777/easyrest')

const port = 3000
const aProvider =  (req, res) =>{
    res.json({
        success:true,
        message : "Hello Easy Rest"
    });
}

let service = new RestServiceFactory(
    serviceName
    ,[ {
        method:'GET',
        path:"/hello",
        provider:aProvider
    } ]

)
service.start(port)
```

Path Parameters are as usual with express

- Path parameters are part of the url itself that usually occurs after the name of the service. 
- Example /thing/:thingId


Query Parameters

- The query string portion of a URL is the part of the URL after the question mark ?. For example: ?answer=42 
- Each key=value pair is called a query parameter. 
- If your query string has multiple query parameters, they're  separated by &.  For example, the below string has 2 query parameters, a and b.
 
?a=1&b=2

GET request to path parameters
```js
const {RestServiceFactory } = require('@stjohnd777/easyrest')
 
let service = new RestServiceFactory(
    serviceName
    ,[ {
        method:'GET',
        path:"/widget/:prop1/:prop2",
        provider:async ()=>{
          let prop1 = req.params.props1
          let prop3 = req.params.props2
          const qps = req.query
          // do stuff ...
          res.json({ ...

          });
        }
    } ]

)
service.start(port)
```
### Review

|HTTP method	| Description |
|---------------|-------------|
|GET|    Retrieve an existing resource.|
|POST|Create a new resource.|
|PUT|    Update an existing resource.|
|PATCH|Partially update an existing resource.|
|DELETE|Delete a resource.|

### Review Code Ranges

|Code 	|Category
|-------|--------
|2xx	|Successful operation
|3xx	|Redirection
|4xx	|Client error
|5xx	|Server error

### Review Some Codes

|Code|	Meaning	Description
|----|-----------------------
|200	|OK	 The requested action was successful.
|201	|Created A new resource was created.
|202	|Accepted The request was received, but no modification has been made yet.
|204	|No Content	The request was successful, but the response has no content.
|400	|Bad Request The request was malformed.
|401	|Unauthorized The client is not authorized to perform the requested action.
|404	|Not Found	The requested resource was not found.
|415	|Unsupported Media Type	The request data format is not supported by the server.
|422	|Unprocessable Entity	The request data was properly formatted but contained invalid or missing data.
|500	|Internal Server Error	The server threw an error when processing the request.

### Review API endpoint in 
|HTTP  	|API endpoint	           |Description
|-------|--------------------------|----
|GET	|/NOUN	               |Get a list of NOUN.
|GET	|/NOUN/<noun_id>|Get a single customer.
|POST	|/NOUN	               |Create a new customer.
|PUT	|/NOUN/<noun_id>|Update a customer.
|PATCH	|/NOUN/<noun_id>|Partially update a customer.
|DELETE	|/NOUN/<noun_id>|Delete a customer.

Let use Task as the noun:

```js
task = {
    id,
    assigned_to,
    name,
    description,
    due_date,
    status,
}

let epFetchTasks = {'GET', '/task/:task_id', async(req,res)=>{
    let id = req.params.task_id
    // fetch all
    let tasks = ...
    req.json {
        success: true
        tasks: tasks
    }    
}}
let epAddTask = { 'POST', '/task', async (res,res)=>{
    let body = req.body
    
}}
let epUpdateTask = { 'PUT', '/task/:task_id',async (res,res)=>{
    let body = req.body
}}
let ep = { 'PATCH', '/task/:task_id',async (res,res)=>{
    let body = req.body
    
}}
let epDeleteTask = { 'DELETE', '/task/:task_id',async (res,res)=>{
    let id = req.params.task_id
}}

const endpoints = [epFetchTasks,epAddTask,epUpdateTask,epDeleteTask]


let service = new RestServiceFactory(
    'task_services'
    ,endpoints
)
service.start(port)
```


