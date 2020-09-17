
const http = require('http'); // you get the http library in node.js. Note you have to use require in node.js in order to get a library. This includes the http library into our code inside the http variable
const fs = require('fs');// this allows us to read another file in our code. this variable fs allows us to do all the file handling that we need to do

 const server = http.createServer((request,response) => {//create a server using the http library you just imported and call the create server function on this object. The create server function takes a function that has 2 parameters, request and response which is going to handle all the activity on our server. SO everytime someone requests a page on our server, it is going to call this function.

    const { method, url, headers} = request

    if (method === 'GET' && url === "/items"){ //use the response object passed into this function that gives the user a response
        response.statuscode = 200 //tells the user that the status is okay
        response.setHeader("Content-Type", "application/json") //tells the browser we'll be writing in ("key", "value we want to set to that header"). tells it that the information being passed to it is in json, and so it should pass it as json.

        fs.readFile('index.html'. function(error,data){
            if (error){
                response.statuscode = 404 // 404 just means that we are not able to find what you are looking for
                response.write('Error: File not found.')
            } else{
                response.write(data)//this will just write all the information that is in html
            }


        })
        response.end() //end the response
        let dictionary = {
            "items":[

            {
                "ID":1,
                "Name": "Walk the dog",
                "Desc": "25 min walk",
                "DueDate": "25/09/2020"
            },
            {
                "ID":2,
                "Name": "Go to shops",
                "Desc": "buy bread",
                "DueDate": "14/09/2020"

            },
            {
                "ID":3,
                "Name": "give presentation",
                "Desc": "next jump",
                "DueDate": "5/10/2020"

            }
        ]
    }

    const responseBody = {
    headers,
    method,
    url,
    body: dictionary
    }

    response.write(JSON.stringify(responseBody))

}
})

server.listen(8080,function(error){
    if (error){
        console.log('something went wrong', error)
    }else{
        console.log('server is listening on port 8080')
    })



     //tells the server to listen on port 8080



























//var http = require('http');
//var fs = require('fs')

//http.createServer(function(req,res) {//callback function used to handle the requests

  //  console.log(req);
    //var baseUrl = 'http://localhost:8080';
    //const { method, baseUrl } = request;

    //if (method === 'GET' && url === baseUrl + "/items"){
      //  response.statusCode = 200
        //const responseBody = {
          //  method,
            //url,
            //body: ['Name': name, 'Desc': description,
            //'Assignee': assignee, 'DueDate': dueDate,
            //'Props': props]
        //}
        //response.write(JSON.stringify(responseBody))//think this is where it will actually appear on the page
        //response.end()
    //}
    //if (method === 'POST' && url === baseUrl + "/item"){
      //  response.statusCode = 200
        //const responseBody = {
          //  method,
            //url,
            //body: ['Name': name, 'Desc': description,
            //'Assignee': assignee, 'DueDate': dueDate,
            //'Props': props]
    //}
      //  response.write(JSON.stringify(responseBody))
        //response.end()
    //}
    //if (method === 'DELETE' && url === baseUrl + "/item/"){
      //  response.statusCode = 200
        //const responseBody = {
          //  method,
            //url,
            //body: []//returns an empty array since the item is deleted so you want the response to be nothing
    //}
      //  response.write(JSON.stringify(responseBody))
        //response.end()
    //}
//}).listen(8080); //tells the server to listen on port 8080
//console.log("listening");






















//const sqlite3 = require('sqlite3').verbose(); //this imports the SQLite3 module. Verbose is the execution mode to produce long stack traces.

//let db = new sqlite3.Database(':memory:', (err) => {//create a database object which opens the database connection automatically
    //if (err) {
      //  return console.error(err.message);//here we're using a callback function that executes an error message if there's an error, but if the connection is successful then this will be stated in the console.
    //}
  //  console.log('Connected to the in-memory SQlite database.');
//});

//db.close((err) => {//this closes the database once the pending queries have been completed again using callback functions
    //if (err) {
      //  return console.error(err.message);
    //}
  //  console.log('Close the database connection.');
//});








//var http = require('http');

//const PORT = 3000; // Non-standard HTTP port. Note a standard port would be port 80


//function handleRequest(request, response) {
  //  console.log(request.headers);
    //response.end('It Works!! Path Hit: ' + request.url);
//}

//var server = http.createServer(handleRequest);
//server.listen(PORT, function () {
  //  console.log("Server listening on: http://localhost:%s", PORT);
//});








//const http = require('http');

//const hostname = '127.0.0.1';
//const port = 3000;

//const server = http.createServer((req, res) => {
  //  res.statusCode = 200;
    //res.setHeader('Content-Type', 'text/plain');
    //res.end('Hello, World!\n');
//});

//server.listen(port, hostname, () => {
  //  console.log(`Server running at http://${hostname}:${port}/`);
//});

