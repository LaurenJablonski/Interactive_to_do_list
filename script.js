/**
 * Global list of item IDs in to-do list
 */
var arrayOfItemIDs = []//defining an empty array

/**
 * Gets a token to be used in API calls
 * This token references your personal database instance, should be kept consitent throughout the exercise
 *
 * @returns {string}
 */
function getToken() {
    return 'lauren2';
}

let today = new Date();//gets todays date (that is the default date of new Date)
let currentMonth = today.getMonth();//gets the month today is in
let currentYear = today.getFullYear();//gets the year today is in
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];//defines all the months in an array

let monthAndYear = document.getElementById("monthAndYear");

function showCalendar(month, year,items) {

    let firstDay = (new Date(year, month)).getDay(); //getDay() then returns the day of the week for the specified date e.g sunday=0 (why the calendar starts from sun-sat)
    let daysInMonth = 32 - new Date(year, month, 32).getDate();//calculates the number of days in the month
    let tbl = document.getElementById("calendar-body"); // body of the calendar

    tbl.innerHTML = "";//clears all the cells in the table as it replaces them with an empty string

    // filing data about month and year in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;//returns the inner HTML of the element for the month and the year
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {//there are a max of 6 rows in the table. adds 1 to i count in each iteration
        // creates a table row
        let row = document.createElement("tr");//<tr> element defines a row of cells in a table

        //now we want to create the individual cells, and fill them up with data.

        for (let j = 0; j < 7; j++) {//There are 7 cells in each row. adds 1 to j count in each iteration
            if (i === 0 && j < firstDay) {// if you're on the first row of the table and the day is less than the value of the first day
                let cell = document.createElement("td");//creates a table column
                let cellText = document.createTextNode("");//creates a textnode with a specified text, which is empty in this instance. (think this is the start of the calendar that has blank spaces in some of the cells).
                cell.appendChild(cellText);//appends a node as the last child of a node so appends cellText as the last child of the cell node (think cell node is the parent node and cell text is the child node)
                row.appendChild(cell);//appends cell(child node) to row(parent node)
            }
            else if (date > daysInMonth) {// if a date value is more than the number of days in a month then it breaks.- this must indiciate when the next month starts
                break;
            }

            else { //this is for all the other cells in the table that don't have the conditions in the previous 2 if and else if statements.
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);//now a text node is created to fill the cells with dates
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");// color today's date if the fetched date, month and year allign with that of today
                }
                items.forEach(i => {
                    var dueDateForCalendar = new Date(i['DueDate']);// this variable defines the due date that will be on the calendar equal to the due date inputted by the user, where the date inputted by the user will then we taken as the new date.
                    if (date === dueDateForCalendar.getDate() && month === dueDateForCalendar.getMonth() && year === dueDateForCalendar.getFullYear()){
                        cell.classList.add("bg-primary");// if a certain date matches the due date, then it will turn that particular cell dark blue

                        // when we hover over the cell we want the task name  and description to appear:
                        // there were other ways of doing this but they needed the the cell to have an id or a class which I was unsure how to do with the way I have created the cells in for loops. So I found that setting the attributes seperately was more appropriate here.
                        cell.setAttribute('data-toggle', 'tooltip'); // tooltip is the small box that appears when a user moves over something with their mouse. 'data-toggle' is the attribut and 'tooltip' is the specified value
                        cell.setAttribute('title',"Task name: " + i['Name'] + "\nTask description: " + i['Desc']);//this sets what you want to appear in the pop up

                    }

                });
                cell.appendChild(cellText);//appends a node(celltext) as the last child of a node(cell). so which ever statement was used, at the end the cell and celltext will be appended.
                row.appendChild(cell);
                date++// this adds 1 to the date in each iteration
            }
        }

        tbl.appendChild(row); // appending each row into calendar body. (so the code makes one row at a time in each single iteration, and then appends them all together at the end).
    }

}

/**
 * This function enables you to go to the next month in the calendar. *
 */

function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;// 11 is used here as the getMonth() method returns the month (from 0 to 11) for the specified date
    currentMonth = (currentMonth + 1) % 12; //add 1 since you want to go to the month ahead of the current month, and then divide by 12 for how many months there are in a year
    showCalendar(currentMonth,currentYear,globalItems);// then display the calendar once the new month and year have been obtained
    }

/**
 * This function enables you to go to the previous month in the calendar. *
 */

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;// subtract 1 because you want to go to the previous month.
    showCalendar(currentMonth,currentYear,globalItems);// then display the calendar once the new month and year have been obtained

}

/**
 * This function enables you to skip to a certain month in a certain year, instead of using the next and prev buttons. *
 */

function jump() {
    currentYear = parseInt(selectYear.value)//parseInt() function parses a string and returns an integer. Where only the first number in the string is returned
    currentMonth = parseInt(selectMonth.value);
    //console.log(currentYear);
    //console.log(currentMonth);

    showCalendar(currentMonth,currentYear,globalItems);// calls the getItems function now with the new month and year

}


/**
 * Makes an HTTP request to the Todo list API
 *
 * @param {string} method HTTP method/verb to be used
 * @param {string} resource Resource to be acted upon on the server, e.g. '/item' or '/item/3'(latter means to get the third item in the todo list)
 * @param {Object} body Request body (if needed)
 * @param {function} successCb On success callback
 * @param {function} errorCb On error callback
 */
function makeRequest(method, resource, body, successCb, errorCb) {
    var baseUrl = 'http://localhost:8080';
    $.ajax({ //ajax= techinique for accessing web servers from a webpage so this is where the connection is being made to the API. It sends teh http requests easily and quickly as you don't have to reload the page.
        method: method,
        url: baseUrl + resource,
        headers: {'token': getToken()},
        data: body ? JSON.stringify(body) : null,
        success: successCb,//on success then call successCb
        error: errorCb//on error then call errorCb
    });

    //new request
    var http_request;
    http_request = new XMLHTTPRequest(); // this interacts with the server
    http_request.open("GET", "server.js"); //because I'm thinking I need to GET the information from the server to then display it on my webpage
    http_request.withCredentials = true;
    http_request.setRequesteHeader("Content-Type", "application/json");
    http_request.send({ 'request': "authentification token"});

}


/**
 * Gets items from Todo list API (makes a GET request)
 *
 * @param {function} callback On success callback, function takes one argument: the item array
 */
function getItems(callback) {
    makeRequest('GET', '/item', null, function (data) {
        var items = data['Data'];//object['properties of the object']
        callback(items);//if the request was successful then callback(items)
    }, function () {
        console.log("An error occured in getItems");
        callback([]);// if the request ws unsuccessful then callback an empty array and state in the console that an error has occured
    });
}


/**
 * Adds new item to the Todo list
 *
 * @param {string} name Name of item
 * @param {string} description Short description of the item
 * @param {string} assignee Assignee of item
 * @param {string} dueDate Due Date of the item
 * @param {string} props Any other information you might want to include
 * @param {string} howlong allows the user to easily see how much time they have left to complete the task
 */
function addItem(name, description, assignee, dueDate, props) {
    var body = {// creates the variable for the body that will be used as a parameter in the makeRequest function
        'Name': name, 'Desc': description,
        'Assignee': assignee, 'DueDate': dueDate,
        'Props': props};

    makeRequest('POST', '/item', body, function (data) {
        /** It makes the request and if the request is successful then it executes getItems(). If no success then it tells you there's an error*/
        console.log('success');
        getItems();

    }, function () {
        console.log("An error occured in addItem");

    });
}




/**
 This function fetches all the relevant items first(name, description etc) and then calls the addItem function. It gets the text from the textboxes
 and sends them to the addItem function and then sends the data to the API server. Note:.value gives you the property of the text inside the
 textbox.
 */
function submitItem() {

    let todoItemname = document.getElementById("nameTextboxID").value;//gets the data entered by the user
    let todoItemDesc = document.getElementById("descriptionTextboxID").value;
    let todoItemDate = document.getElementById("dateTextboxID").value;


    if (todoItemname == "" || todoItemname == null) {// series for statements that give alerts if the user has forgotten to enter the name. description or task
        alert("Please enter a task!");
    }
    if (todoItemDesc == "" || todoItemDesc == null) {
        alert("Please enter a description for the task!");
    }
    if (todoItemDate == "" || todoItemDate == null) {
        alert("Please enter a due date for the task!");

    } else {
        addItem(todoItemname, todoItemDesc, '', todoItemDate, '');
        clearAndRefresh();//if name, description and due date have been added then clear the form and refresh the page.

    }
}

function clearAndRefresh(){
    $('#myForm')[0].reset();// this clears the form text boxes after the user has inputted. sets the form to its default state
    refreshList();// this gets all the items from the API and actually displays them on the webpage, so after the items have been submitted to the webpage.
}

function deleteItem(id){
    makeRequest('DELETE','/item/'+ id, null, function (data){ //appends the id to the item parameter
        clearAndRefresh();// if its successful then the form is cleared, the page is refreshed to display the new items
        getItems();
    }, function () {
        console.log("An error occured in deleteItem");// if unsuccessful then the console tells you that an error has occured
    });
}




/**
 * Adds an item list onto the page
 * Requires a DOM element with id 'list' to be present
 *
 * @param {Array} items
 * We need this function to be able to append the item onto the page.
 * In this function we can see that this function takes each item (which is returned from the getItems()) and creates HTML. So
 * for each item from the API, the same piece of HTML is made with the data from the item object which is what the items.forEach
 *loop is doing. Basically the for loop is building a HTML element for each item so if there are 5 items in the todo list, it will loop
 * over each item once (creating 5 items) and adds it to the variable list which is a string. At the end, this string of HTML is inserted
 * into the HTML document using this piece of code ($('#list').html(list);). So in jquery this finds the div with an id list and sets
 * the inner HTML to the variable list. If no items return, it will just insert the string '<div>ID,Name,Description </div>'.
 * If there was only one item in the list then the string would become '<div>ID,Name,Description</div><div>01,todo1,first to do item </div>'.
 */
function createItemTable(items) {
    //alert(JSON.stringify(items[2]['DueDate']));
    var list = '<table id="toDoTable" style="width:100%" position:absolute ><tr><th style="text-align:center">Tick</th><th style="text-align:center">Cross out</th><th style="text-align:center">Name</th><th style="text-align:center">Description</th><th style="text-align:center">Days remaining</th><th style="text-align:center">Delete</th></tr>';
    var now = new Date();

    items.forEach(i => {
        arrayOfItemIDs.push(i.ID)
        var itemDueDate = new Date(dictionary[i].DueDate);
        var distance = itemDueDate - now;//calculates the difference between the current date and due date
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));//gives you the amount of days
        var daysWithText = days;

        //series of if statements that show different statements depending on the number of days remaining
        if (days > 2){
            daysWithText = days + " days left." ;

        }else if (days > 0 && days <= 2) {
            daysWithText = '<p style="color:orange;"> Deadline approaching (less than 2 days left) </p>'

        }else if (days <= 0){
            daysWithText = '<p style="color:red;"> DEADLINE EXPIRED </p>'

        }

        // as you pass through the loop these items are sdded to the page
        element = '<div>'
        element += '<tr><td><input type="checkbox" id="myCheck" class="tick_button" onclick="tickFunction()" ></td>';
        element += '<td><input type="checkbox" id="myCross" class="strike_button" onclick="strikeFunction()" ></td>';
        element += '<td>' + i['Name'] + '</td>'; // shouldn't this be changed to dictionary?
        element += '<td>' + i['Desc'] + '</td>';
        element += '<td>' + daysWithText + '</td>';
        element += '<td><button type="button" id="deleteButton"  value="Delete" onclick="deleteItem(' + i.ID + ')"><i class="fa fa-trash"></i></button></td>';
        element += '</div>'
        list += element
    });


    $(this).element += '</table>';// add the element to the table
    $('#list').html(list);
}

//let data = require('./server');
//alert(data);

/**
 * This function allows you to tick a button when you have completed a task whilst simultaneously crossing out that element in the table
 */
function strikeFunction() {
    $('.strike_button').change(function() {
        if (this.checked) {
            $(this).parent().parent().addClass("strikeout");
        }
        else {
            $(this).parent().parent().removeClass("strikeout");
        }
    });
}
function tickFunction() {
    var checkBox = document.getElementById("myCheck");
    if (checkBox.checked == true) {
    }
}



/**
 * Refreshes the item list
 * Pulls all items from the API and displays them on the page and on the calendar
 */

var globalItems = []

function refreshList() {
    getItems(function (items) {
        globalItems = items
        createItemTable(items);
        showCalendar(currentMonth,currentYear,items);
    });
}




$().ready(function () { //* this function means that when the page has finished loading, it calls the refreshlist function, where this refreshlist function calls the getItems function with fucnction createItemTable as a function. (it's passing a function as an argument) */
    refreshList();
});

/**
 * This function removes all the items that are in the list.
 *
 */
function removeAll(){
    arrayOfItemIDs.forEach(id=>{// this removes the entire array of items as it replaces them with an empty array as defined as a global variable at the top
        deleteItem(id)
    })
}






