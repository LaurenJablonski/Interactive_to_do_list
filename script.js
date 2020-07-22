/**
 * Gets a token to be used in API calls
 * This token references your personal database instance, should be kept consitent throughout the exercise
 *
 * @returns {string}
 */
function getToken() {
    return 'lauren2';
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
    alert('');
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
function addItem(name, description, assignee, dueDate, props, howLong) {
    var body = {
        'Name': name, 'Desc': description,
        'Assignee': assignee, 'DueDate': dueDate,
        'Props': props, 'HowLong': howLong};

    /** alert(body);*/
    makeRequest('POST', '/item', body, function (data) {
        /** It makes the request and if the request is successful then it executes getItems(). If no success then it tells you there's an error*/
        console.log('success');/** in order to add a new item you must make a POST request */
        /**alert('success');*/
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
    alert("testing");
    let todoItemname = document.getElementById("nameTextboxID").value;

    let todoItemDesc = document.getElementById("descriptionTextboxID").value;
    let todoItemDate = document.getElementById("dateTextboxID").value

    let dateToCountdownFrom = new Date(todoItemDate);

    var countDownDate = dateToCountdownFrom.getTime();
    /** would need to set this to whichever date entered for each item by the user (so would need to make this the user input box on the other page (input id="todoItemDate") i think */

    var x = setInterval(function () {
        // Set the date we're counting down to

        // Get today's date and time since this will be used to determine the time difference between now and the deadline
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;


        // Time calculations for just days (thought having the seconds countdown would be a bit intense on a to-do list)
        var days = Math.floor(distance / (1000 * 60 * 60 * 24)); // Converts distance into days and rounds

        if (days > 2) {
            // If the deadline is more than 2 days away then just show the number of days
            clearInterval(x);
            document.getElementById("countdown").innerHTML = days + " days until deadline"

        } else if (days >= 0 && days <= 2) {
            // When the deadline is within 2 days away then display deadline approaching in orange
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "<span style='color: orange;'>Deadline approaching!</span>";

        } else if (days < 0) {
            // when the deadline is reached then it displays EXPIRED in red
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "<span style='color: red;'>DEADLINE EXPIRED</span>";
        }


    }, 1000);


    /**alert(todoItemDate);
     alert(dateToCountdownFrom);*/
    /** x;  when the + button is pressed then submitItem is executed which adds the items which needs to add the how long bit too so therefore must ensure that we call the variable x */
    addItem(todoItemname, todoItemDesc, '', todoItemDate, '', x);
}


/**
 * Deletes and item in the Todo list
 *
 * @param {int} id ID of item
 */
function deleteItem(id) {
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
function updateItem(id, name, description, assignee, dueDate, props, howLong) {
}

/**
 * Adds an item list onto the page
 * Requires a DOM element with id 'list' to be present
 *
 * @param {Array} items
 * We need this function to be able to append the item onto the page.
 * In this function we can see that this function takes each item (which is returned from the getItems() and creates HTML. So
 * for each item from the API, the same piece of HTML is made with the data from the item object which is what the items.forEach
 *loop is doing. Basically the for loop is building a HTML element for each item so if there are 5 items in the todo list, it will loop
 * over each item once (creating 5 items) and adds it to the variable list which is a string. At the end, this string of HTML is inserted
 * into the HTML document using this piece of code ($('#list').html(list);). So in jquery this finds the div with an id list and sets
 * the inner HTML to the variable list. If no items return, it will just insert the string '<div>ID,Name,Description </div>'.
 * If there was only one item in the list then the string would become '<div>ID,Name,Description</div><div>01,todo1,first to do item </div>'.
 */
function createItemTable(items) {
    alert(JSON.stringify(items[2]['countdown']));
    var list = '<table style="width:100%" position:absolute ><tr><th>ID</th><th>Name</th><th>Description</th><th>Duedate</th><th> How long left?</th></tr>';
    items.forEach(i => {
        element = '<div>'
        element += '<tr><td>' + i['ID'] + '. ' + '</td>';
        element += '<td>' + i['Name'] + '</td>';
        element += '<td>' + i['Desc'] + '</td>';
        element += '<td>' + i['DueDate'] + '</td>';
        element += '<td>' + i['countdown'] + '</td>';
        element += '</div>'
        list += element
    });
    element += '</table>';
    $('#list').html(list);

}


/**
 * Refreshes the item list
 * Pulls all items from the API and displays them on the page
 */
function refreshList() {
    getItems(function (items) {
        createItemTable(items);
    });
}

$().ready(function () { //* this function means that when the page has finished loading, it calls the refreshlist function, where this refreshlist function calls the getItems function with fucnction createItemTable as a function. (it's passing a function as an argument) */
    refreshList();
});





