const http = require('http'); // you get the http library in node.js. Note you have to use require in node.js in order to get a library. This includes the http library into our code inside the http variable
const fs = require('fs');// this allows us to read another file in our code. this variable fs allows us to do all the file handling that we need to do

// var dictionary = {
//     "items": [
//
//         {
//             "ID": 1,
//             "Name": "Walk the dog",
//             "Desc": "25 min walk",
//             "DueDate": "25/09/2020"
//         },
//         {
//             "ID": 2,
//             "Name": "Go to shops",
//             "Desc": "buy bread",
//             "DueDate": "14/09/2020"
//
//         },
//         {
//             "ID": 3,
//             "Name": "give presentation",
//             "Desc": "next jump",
//             "DueDate": "5/10/2020"
//
//         }
//     ]
// };



let obj = {
    items: []
};

fs.exists('dictionary.json', function(exists) {

    if (exists) {

        console.log("yes file exists");


        fs.readFile('dictionary.json', function readFileCallback(err, data) {

            if (err) {
                console.log(err);
            } else {
                obj = JSON.parse(data);
                console.log("here are the items in the dictionary");
                console.log(obj);//first you just want to read the items in dictionary.json here
                // onsole.log(data);
                newItem = obj.items.push({
                    ID: 4,
                    Name: 'hello',
                    Desc: "new item",
                    DueDate: "5/10/2021"
                });

                console.log("the new item is:");
                console.log(newItem);

                let json = JSON.stringify(obj);
                fs.writeFile('dictionary.json', json);

            }
        });
    }else {

        console.log("file not exists");
    }
});



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

        let data =[];

        request.on('data', chunk => {
            data += chunk;
            //console.log(data); the data here is the new item that needs to be added to the dictionary
        })
        request.on('end', () => {
            var newItem = JSON.parse(data);


            var length = Object.keys(dictionary['items']).length; //finds the length of the items in the dictionary
            console.log(length);
            var findLastItem = dictionary['items'][length - 1]; //finds the index of hte last item in the dictionary
            console.log(findLastItem);
            newItem['ID'] = findLastItem['ID'] + 1; //adds one to the last index in the dictionary to give you the index of the new item being added to hte dictionary
            console.log(newItem['ID']);

            console.log(dictionary);
            // var parsedDictionary = JSON.parse(dictionary);
            // console.log(parsedDictionary);
            dictionary['items'].push(newItem);

            console.log(dictionary);
            //dictionary = JSON.stringify(dictionary);

        })


            //body = dictionary.concat(jsonData1).toString();

            response.statuscode = 200;


            // const responseBody = {
            //     //headers,
            //     //method,
            //     //url,
            //     body: merged //jsonData1
            // }
            //
            // response.write(JSON.stringify(responseBody));
            response.end();





        }

    if (request.method === 'DELETE' && request.url === '/item') {
        response.setHeader('Access-Control-Allow-Origin', '*');

        console.log('this is the delete request');


    }






});




server.listen(8080,function(error) {//tells the server to listen on port 8080
    if (error) {
        console.log('something went wrong', error)
    } else {
        console.log('server is listening on port 8080')
    }
})









































