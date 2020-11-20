const http = require('http'); // you get the http library in node.js. Note you have to use require in node.js in order to get a library. This includes the http library into our code inside the http variable
const fs = require('fs');// this allows us to read another file in our code. this variable fs allows us to do all the file handling that we need to do






const server = http.createServer((request,response) => {//create a server using the http library you just imported and call the create server function on this object. The create server function takes a function that has 2 parameters, request and response which is going to handle all the activity on our server. SO everytime someone requests a page on our server, it is going to call this function.

    const {headers, method, url} = request; //this request object is an instant of an Incoming Message
    console.log(request.method); //having this here tells you what the original request is and it is OPTIONS


    // assigns values to the headers
    if (request.method === 'OPTIONS' && request.url === '/item') {
        console.log("PREFLIGHT OPTIONS REQUEST")
        console.log(request.headers);

        //then handles the preflight request

        var handleCors = function (request, response) {
            console.log("its a preflight request");
            response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080'); // allows any origin to access the server
            response.setHeader('Access-Control-Allow-Headers', '*');
            response.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
            response.setHeader('Content-Type', 'text/html');
            response.statuscode = 404;
            response.end();
            //console.log(response.headers);
            return response; //doing return response shows you the server response
        }
        handleCors(request,response); //Without this the initial request is OPTIONS, but with it the initial request is GET

          if (handleCors('GET', response)){
         //if (request.method === 'GET' && request.url === '/item'){
             console.log("hello world");
             fs.readFile('index.html', function (error, data) {
                 if (error) {
                     response.statuscode = 404 // 404 just means that we are not able to find what you are looking for
                     response.write('Error: File not found.')
                 } else {

                     let dictionary = {
                         "items": [

                             {
                                 "ID": 1,
                                 "Name": "Walk the dog",
                                 "Desc": "25 min walk",
                                 "DueDate": "25/09/2020"
                             },
                             {
                                 "ID": 2,
                                 "Name": "Go to shops",
                                 "Desc": "buy bread",
                                 "DueDate": "14/09/2020"

                             },
                             {
                                 "ID": 3,
                                 "Name": "give presentation",
                                 "Desc": "next jump",
                                 "DueDate": "5/10/2020"

                             }
                         ]
                     }

                     response.write(data)//this will just write all the information that is in html

                     const responseBody = {
                         //headers,
                         //method,
                         //url,
                         body: dictionary
                     }

                     response.write(JSON.stringify(responseBody))
                     //response.write(dictionary[2]['DueDate'])
                     //console.log('dictionary'['Name'])
                     console.log(responseBody);
                 }

                 response.end(); //end the response
                 return responseBody;




         })
    }else{
              console.log("it's not a GET request");
          }}





    });




server.listen(8080,function(error) {//tells the server to listen on port 8080
    if (error) {
        console.log('something went wrong', error)
    } else {
        console.log('server is listening on port 8080')
    }
})



//
//     // in order to make a request you need these 3 parameters
//     console.log(method, url, headers);
//
//
//     response.statuscode = 200 //tells the user that the status is okay
//     response.setHeader("Content-Type", "text/html") //tells the browser we'll be writing in ("key", "value we want to set to that header"). tells it that the information being passed to it is in json, and so it should pass it as json.
//
//     //CORS policy
//
//     //response.setHeader("Access-Control-Allow-Credentials", "true") //think this is cookies or authentification
//     response.setHeader("Access-Control-Allow-Origin", "*") // allows any origin to access the server
//     response.setHeader("Access-Control-Allow-Headers", "*")
//     response.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE") // so this means that https://localhost:8080 is allowed to make a GET request
//
//     if (method === 'GET') {
//         console.log("GET REQUEST ALLOWED")
//
//
//
//
//         fs.readFile('index.html', function (error, data) {
//             if (error) {
//                 response.statuscode = 404 // 404 just means that we are not able to find what you are looking for
//                 response.write('Error: File not found.')
//             } else {
//                 response.write(data)//this will just write all the information that is in html
//
//                 let dictionary = {
//                     "items": [
//
//                         {
//                             "ID": 1,
//                             "Name": "Walk the dog",
//                             "Desc": "25 min walk",
//                             "DueDate": "25/09/2020"
//                         },
//                         {
//                             "ID": 2,
//                             "Name": "Go to shops",
//                             "Desc": "buy bread",
//                             "DueDate": "14/09/2020"
//
//                         },
//                         {
//                             "ID": 3,
//                             "Name": "give presentation",
//                             "Desc": "next jump",
//                             "DueDate": "5/10/2020"
//
//                         }
//                     ]
//                 }
//
//                 const responseBody = {
//                     headers,
//                     method,
//                     url,
//                     body: dictionary
//                 }
//
//                 response.write(JSON.stringify(responseBody))
//             }
//
//             response.end(); //end the response
//
//         });
//
// }})
























































