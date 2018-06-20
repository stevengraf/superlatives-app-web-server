//SERVER SIDE JAVASCRIPT
// JavaScript source code
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;

//public path refers to the folder that stores html
const publicPath = path.join(__dirname, '../public/');

//variable declaration
var app = express();
var server = http.createServer(app);
var serverArray = [];

//pass in the web socket server
var io = socketIO(server);

app.use(express.static(publicPath));


//listen for event and do something when it happens
io.on('connection', (socket) => {
    console.log('New user connected');

    //logs a disconnect message to the console of the server
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    //NEW INDEX.JS MATERIAL
    //start button functionality on index.html
    socket.on('start', (usersArray) => {
        console.log('Current users: ');
        serverArray = usersArray;
        for (var x = 0; x < serverArray.length; x++) {
            console.log(serverArray[x]);
        }
        io.emit('response', serverArray);
    });

    socket.on('reset', (usersArray) => {
        console.log('Reset button fired');
        console.log(usersArray.length)
        serverArray = usersArray;
    });


    //when user presses refresh list button on testingpage.html
    socket.on('refreshList', () => {
        var htmlString = '';
        for (var x = 0; x < serverArray.length; x++) {
            //html code for the buttons to send to a jquery on testing page
            htmlString += ('<div class="form-field" id="nameslist"><button class="button2" id="' + x + '">' + serverArray[x] + '</button></div>');
        }
        socket.emit('refreshListFire', htmlString);
    });

});

server.listen(port, () => {
    console.log('Server is up on port: ' + port);
});