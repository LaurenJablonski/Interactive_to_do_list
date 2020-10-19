const http = require('http'); // you get the http library in node.js. Note you have to use require in node.js in order to get a library. This includes the http library into our code inside the http variable
const fs = require('fs');// this allows us to read another file in our code. this variable fs allows us to do all the file handling that we need to do


const server = http.createServer((request,response) => {//create a server using the http library you just imported and call the create server function on this object. The create server function takes a function that has 2 parameters, request and response which is going to handle all the activity on our server. SO everytime someone requests a page on our server, it is going to call this function.

    const { method, url, headers} = request; // in order to make a request you need these 3 parameters
    console.log( method, url, headers);
    if (method === 'GET' && url === "/"){ //use the response object passed into this function that gives the user a response
        response.statuscode = 200 //tells the user that the status is okay
        response.setHeader("Content-Type", "index.html") //tells the browser we'll be writing in ("key", "value we want to set to that header"). tells it that the information being passed to it is in json, and so it should pass it as json.

        //CORS policy

        response.setHeader("Access-Control-Allow-Credentials", "true") //think this is cookies or authentification
        response.setHeader("Access-Control-Allow-Origin", "*") // allows any origin to access the server
        response.setHeader("Access-Control-Allow-Headers", "Content-Type")
        response.setHeader("Access-Control-Allow-Methods", "GET") // so this means that https://localhost:8080 is allowed to make a GET request


        fs.readFile('index.html', function(error,data){
            if (error){
                response.statuscode = 404 // 404 just means that we are not able to find what you are looking for
                response.write('Error: File not found.')
            } else {
                response.write(data)//this will just write all the information that is in html

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
                    headers,
                    method,
                    url,
                    //body: dictionary
                }

                response.write(JSON.stringify(responseBody))
            }

            response.end(); //end the response

})};

server.listen(8080,function(error){//tells the server to listen on port 8080
    if (error){
        console.log('something went wrong', error)
    }else{
        console.log('server is listening on port 8080')
    }});
























































