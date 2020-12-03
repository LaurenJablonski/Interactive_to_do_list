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
            response.setHeader('Access-Control-Allow-Origin', '*'); // allows any origin to access the server
            response.setHeader('Access-Control-Allow-Headers', '*');
            response.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
            response.setHeader('Content-Type', 'text/html');
            response.statuscode = 404;
            response.end();
            //console.log(response.headers);
            return response; //doing return response shows you the server response
        }
        handleCors(request, response); //Without this the initial request is OPTIONS, but with it the initial request is GET
    }

          //if (handleCors('GET', response)){
         if (request.method === 'GET' && request.url === '/item'){
             console.log("hello world");
             response.setHeader('Access-Control-Allow-Origin', '*');

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

                 response.end(); //end the response
                 return responseBody;




         }

         if (request.method === 'POST' && request.url === '/item'){
         response.setHeader('Access-Control-Allow-Origin', '*');

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

         let data =[];

         request.on('data', chunk => {
             data += chunk;
             //console.log(data); the data here is the new item that needs to be added to the dictionary
         })
         request.on('end', (error,data1,callback) => {
             if(error){
                 console.log("an error occured")
             }else{
                 var jsonData1 = JSON.parse(data);
                 console.log(JSON.parse(data));//using this means that you can see the new item that has been added in the console
                 console.log(typeof jsonData1);
                 console.log(dictionary);
                 console.log(typeof dictionary);
                 let merged = {...jsonData1, ...dictionary};
                 console.log(merged);
                 callback(jsonData1);
             }


             //body = dictionary.concat(jsonData1).toString();

             response.statuscode = 200;


             const responseBody = {
                 //headers,
                 //method,
                 //url,
                 body: jsonData1
             }

             response.write(JSON.stringify(responseBody));
             response.end();




            // var jsonNewData =  JSON.parse(dictionary).items
            //  console.log(jsonNewData.DueDate);
            //
            // var result = dictionary.concat(body);
            // console.log(result);

             // body1 = Buffer.concat(body1).toString();
             // // BEGINNING OF NEW STUFF
             //
             // response.on('error', (err) => {
             //     console.error(err);
             // });
             //
             // response.statusCode = 200;
             // //response.setHeader('Content-Type', 'application/json');
             //
             // const responseBody = { headers, method, url, body1 };
             //
             // response.write(JSON.stringify(responseBody));
             // console.log("the response is" + JSON.stringify(responseBody))
             // response.end();



             })
         }





    });




server.listen(8080,function(error) {//tells the server to listen on port 8080
    if (error) {
        console.log('something went wrong', error)
    } else {
        console.log('server is listening on port 8080')
    }
})

























































