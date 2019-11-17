var socket = io();
var playerAnswered = false;
var correct = false;
var name;
var score = 0;

var params = jQuery.deparam(window.location.search); //Gets the id from url

socket.on('connect', function() {
    //Tell server that it is host connection from game view
    socket.emit('player-join-game', params);

    // document.getElementById('question').innerHTML = data.q1;
    // console.log(data)
    document.getElementById('finalScore').style.visibility = "hidden";
    document.getElementById('answer1').style.visibility = "visible";
    document.getElementById('answer2').style.visibility = "visible";
    document.getElementById('answer3').style.visibility = "visible";
    document.getElementById('answer4').style.visibility = "visible";
});

socket.on('noGameFound', function() {
    window.location.href = '../../'; //Redirect user to 'join game' page 
});

function answerSubmitted(num) {
    if (playerAnswered == false) {
        playerAnswered = true;

        socket.emit('playerAnswer', num); //Sends player answer to server

        //Hiding buttons from user
        document.getElementById('questionBox').style.visibility = "hidden";
        // document.getElementById('answer2').style.visibility = "hidden";
        // document.getElementById('answer3').style.visibility = "hidden";
        // document.getElementById('answer4').style.visibility = "hidden";
        document.getElementById('message').style.display = "block";
        document.getElementById('message').innerHTML = "Answer Submitted! Waiting on other players...";

    }
}

//Get results on last question
socket.on('answerResult', function(data) {
    if (data == true) {
        correct = true;
    }
});

socket.on('questionOver', function(data) {
    if (correct == true) {
        document.body.style.backgroundColor = "#4CAF50";
        document.getElementById('message').style.display = "block";
        document.getElementById('message').innerHTML = "Correct!";
    } else {
        document.body.style.backgroundColor = "#f94a1e";
        document.getElementById('message').style.display = "block";
        document.getElementById('message').innerHTML = "Incorrect!";
    }
    document.getElementById('answer1').style.visibility = "hidden";
    document.getElementById('answer2').style.visibility = "hidden";
    document.getElementById('answer3').style.visibility = "hidden";
    document.getElementById('answer4').style.visibility = "hidden";
    socket.emit('getScore');
});

socket.on('gameQuestions', function(data) {
    console.log(data)
    document.getElementById('question').innerHTML = data.q1;
    document.getElementById('answer1').innerHTML = data.a1;
    document.getElementById('answer2').innerHTML = data.a2;
    document.getElementById('answer3').innerHTML = data.a3;
    document.getElementById('answer4').innerHTML = data.a4;
    // var correctAnswer = data.correct;
    // document.getElementById('playersAnswered').innerHTML = "Players Answered 0 / " + data.playersInGame;
    // updateTimer();
});

socket.on('newScore', function(data) {
    document.getElementById('scoreText').innerHTML = "Score: " + data;
    document.getElementById('finalScore').innerHTML = data;
});
socket.on('nextQuestionPlayer', function(data) {
    correct = false;
    playerAnswered = false;
    document.getElementById('answer1').style.visibility = "visible";
    document.getElementById('answer2').style.visibility = "visible";
    document.getElementById('answer3').style.visibility = "visible";
    document.getElementById('answer4').style.visibility = "visible";
    document.getElementById('message').style.display = "none";
    document.body.style.backgroundColor = "white";

});

socket.on('hostDisconnect', function() {
    window.location.href = "../../";
});

socket.on('playerGameData', function(data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].playerId == socket.id) {
            document.getElementById('nameText').innerHTML = "Name: " + data[i].name;
            document.getElementById('scoreText').innerHTML = "Score: " + data[i].gameData.score;
        }
    }
});

socket.on('GameOver', function() {
    document.body.style.backgroundColor = "#ececec";
    document.getElementById('answer1').style.visibility = "hidden";
    document.getElementById('answer2').style.visibility = "hidden";
    document.getElementById('answer3').style.visibility = "hidden";
    document.getElementById('answer4').style.visibility = "hidden";
    document.getElementById('message').style.display = "block";
    document.getElementById('message').style.color = "black";
    document.getElementById('message').innerHTML = "Quiz Finish!!<br/><small>Score:</small>";
    document.getElementById('finalScore').style.textAlign = "center";
    document.getElementById('finalScore').style.fontSize = "46pt";
    document.getElementById('finalScore').style.visibility = "visible";

});