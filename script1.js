/element += '<td><button type="button" id="deleteButton"  value="Delete" onclick="deleteItem()"><i class="fa fa-trash"></i></button></td>';

alert("hello");

var countDownDate = dateToCountdownFrom.getTime(); /** would need to set this to whichever date entered for each item by the user (so would need to make this the user input box on the other page (input id="todoItemDate") i think */
alert("hello");

var x = setInterval(function() {
    // Set the date we're counting down to
    alert("hello");


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

    }
    else if (days >= 0 && days <= 2){
        // When the deadline is within 2 days away then display deadline approaching in orange
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "<span style='color: orange;'>Deadline approaching!</span>";

    }
    else if (days < 0){
        // when the deadline is reached then it displays EXPIRED in red
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "<span style='color: red;'>DEADLINE EXPIRED</span>";
    }



}, 1000);

