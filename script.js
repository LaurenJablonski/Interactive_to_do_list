/**
 * Global list of item IDs in to-do list
 */
var arrayOfItemIDs = []

/**
 * Gets a token to be used in API calls
 * This token references your personal database instance, should be kept consitent throughout the exercise
 *
 * @returns {string}
 */
function getToken() {
    return 'lauren2';
}

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");
//showCalendar(currentMonth, currentYear,'');

function showCalendar(month, year,items) {

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {//adds 1 to i count in each iteration
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {//adds 1 to j count in each iteration
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);//appends a node as the last child of a node so appends cellText as the las child of the cell node
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");// color today's date if the fetched date, month and year allign with that of today
                }
                items.forEach(i => {
                    var dueDateForCalendar = new Date(i['DueDate']);
                    if (date === dueDateForCalendar.getDate() && month === dueDateForCalendar.getMonth() && year === dueDateForCalendar.getFullYear()){
                        cell.classList.add("bg-primary");
                        $(this).cell.hover(function(i) {
                            console.log(i['Desc']);
                        });
                        




                    }

                });
                cell.appendChild(cellText);//appends a node as the last child of a node.
                row.appendChild(cell);
                date++// this adds 1 to the date in each iteration
            }
        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

}



function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;// 11 is used here as the getMonth() method returns the month (from 0 to 11) for the specified date
    currentMonth = (currentMonth + 1) % 12; // divide by 12 for how many months there are in a year
    getItems(function (items) {
        showCalendar(currentMonth,currentYear,items);
    });


}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    getItems(function (items) {
        showCalendar(currentMonth,currentYear,items);
    });


}

function jump() {
    currentYear = parseInt(selectYear.value)//parseInt() function parses a string and returns an integer. Where only the first number in the string is returned
    currentMonth = parseInt(selectMonth.value);
    console.log(currentYear);
    console.log(currentMonth);
    getItems(function (items) {
        showCalendar(currentMonth,currentYear,items);
    });
}



/**
 * Makes an HTTP request to the Todo list API
 * You shouldn't need to modify this - but feel free to do so!
 *
 * @param {string} method HTTP method/verb to be used
 * @param {string} resource Resource to be acted upon on the server, e.g. '/item' or '/item/3'(latter means to get the third item in the todo list)
 * @param {Object} body Request body (if needed)
 * @param {function} successCb On success callback
 * @param {function} errorCb On error callback
 */
function makeRequest(method, resource, body, successCb, errorCb) {
    var baseUrl = 'https://todoapi.nxj.io';
    console.log(JSON.stringify(body));
    /** alert(method+resource+JSON.stringify(body));*/
    $.ajax({
        method: method,
        url: baseUrl + resource,
        headers: {'token': getToken()},
        data: body ? JSON.stringify(body) : null,
        success: successCb,
        error: errorCb
    });

}

/**
 * Gets items from Todo list API (makes a GET request)
 *
 * @param {function} callback On success callback, function takes one argument: the item array
 */
function getItems(callback) {
    makeRequest('GET', '/item', null, function (data) {
        var items = data['Data'];
        callback(items);
    }, function () {
        console.log("An error occured in getItems");
        callback([]);
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
    var body = {
        'Name': name, 'Desc': description,
        'Assignee': assignee, 'DueDate': dueDate,
        'Props': props};

    makeRequest('POST', '/item', body, function (data) {
        /** It makes the request and if the request is successful then it executes getItems(). If no success then it tells you there's an error*/
        console.log('success');/** in order to add a new item you must make a POST request */

        getItems();

    }, function () {
        console.log("An error occured in addItem");
        /** alert("An error occured in addItem");*/

    });
}




/**
 This function fetches all the relevant items first(name, description etc) and then calls the addItem function. It gets the text from the textboxes
 and sends them to the addItem function and then sends the data to the API server. Note:.value gives you the property of the text inside the
 textbox.
 */
function submitItem() {

    let todoItemname = document.getElementById("nameTextboxID").value;
    let todoItemDesc = document.getElementById("descriptionTextboxID").value;
    let todoItemDate = document.getElementById("dateTextboxID").value;


    if (todoItemname == "" || todoItemname == null) {
        alert("Please enter a task!");
    }
    if (todoItemDesc == "" || todoItemDesc == null) {
        alert("Please enter a description for the task!");
    }
    if (todoItemDate == "" || todoItemDate == null) {
        alert("Please enter a due date for the task!");

    } else {
        addItem(todoItemname, todoItemDesc, '', todoItemDate, '');
        clearAndRefresh();

    }
}
function clearAndRefresh(){
    $('#myForm')[0].reset();// this clears the form text boxes after the user has inputted
    refreshList();// this gets all the items from the API and actually displays them on the webpage, so after the items have been submitted to the webpage.
}

/**
 * Updates an item in the Todo list
 *
 * @param {int} id ID of item
 * @param {string} name Name of item
 * @param {string} description Short description of the item
 * @param {string} assignee Assignee of item
 * @param {string} dueDate Due Date of the item
 * @param {string} props Any other information you might want to include
 */
function updateItem(id, name, description, assignee, dueDate, props) {
}


function deleteItem(id){
    makeRequest('DELETE','/item/'+ id, null, function (data){
        clearAndRefresh();
        getItems();
    }, function () {
        console.log("An error occured in deleteItem");


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
        var itemDueDate = new Date(i['DueDate']);
        var distance = itemDueDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var daysWithText = days;

        if (days > 2){
            daysWithText = days + " days left." ;

        }else if (days >= 0 && days <= 2) {
            daysWithText = '<p style="color:orange;"> Deadline approaching (less than 2 days left) </p>'

        }else if (days < 0){
            daysWithText = '<p style="color:red;"> DEADLINE EXPIRED </p>'

        }

        element = '<div>'
        element += '<tr><td><input type="checkbox" id="myCheck" class="tick_button" onclick="tickFunction()" ></td>';
        element += '<td><input type="checkbox" id="myCross" class="strike_button" onclick="strikeFunction()" ></td>';
        element += '<td>' + i['Name'] + '</td>';
        element += '<td>' + i['Desc'] + '</td>';
        element += '<td>' + daysWithText + '</td>';
        element += '<td><button type="button" id="deleteButton"  value="Delete" onclick="deleteItem(' + i.ID + ')"><i class="fa fa-trash"></i></button></td>';
        element += '</div>'
        list += element
    });


    $(this).element += '</table>';
    $('#list').html(list);
}


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
 * Pulls all items from the API and displays them on the page
 */
function refreshList() {
    getItems(function (items) {
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
    arrayOfItemIDs.forEach(id=>{
        deleteItem(id)
    })
}






