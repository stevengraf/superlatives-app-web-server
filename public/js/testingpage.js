//CLIENT SIDE JAVASCRIPT

//is run after the socket.io.js is loaded
//creates the socket and stores it in the variable 'socket'
var socket = io();
var username = 'User';
var usersArray = [];

socket.on('connect', function () {
    console.log('Connected to server');
});
socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

//refresh list button
//calls to refreshList function from the server
jQuery('#refresh-button').click(function () {
    socket.emit('refreshList');
    console.log('Refresh');
});


socket.on('response', function (returnedArray) {
    console.log('Array size: ' + returnedArray.length);
});

socket.on('refreshListFire', function (returnedHTML) {
    jQuery('#nameslist').html(returnedHTML);
    console.log(returnedHTML);
});