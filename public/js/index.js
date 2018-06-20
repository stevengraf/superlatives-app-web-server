//CLIENT SIDE JAVASCRIPT

//is run after the socket.io.js is loaded
//creates the socket and stores it in the variable 'socket'
var socket = io();
var usersArray = [];
var name;

socket.on('connect', function () {
    console.log('Connected to server');
});
socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

//add button functionality
jQuery('#addbutton').click(function (e) {
    e.preventDefault();

    name = jQuery('[name=name]').val();
    if (name !== "") {
        usersArray.push(name);
        jQuery('#userlist').append(usersArray.length + ". " + usersArray[usersArray.length - 1] + '</br>');
    }
    console.log(usersArray[usersArray.length - 1]);
    jQuery('[name=name]').val('');
});

jQuery('#startbutton').click(function (e) {
    e.preventDefault();
    socket.emit('start', usersArray);
})

jQuery('#resetbutton').click(function (e) {
    e.preventDefault();
    var length = usersArray.length;
    for (var x = 0; x < length; x++) {
        usersArray.pop();
    }
    jQuery('#userlist').html('<h2>Current list: </h2>');
    socket.emit('reset', usersArray);
})

socket.on('response', function (returnedArray) {
    console.log('Array size: ');
    console.log(returnedArray.length);
});

//add functionality to start button and pass the array of users