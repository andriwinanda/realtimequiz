var socket = io();
var questionNum = 1; //Starts at two because question 1 is already present

function updateDatabase() {
    var questions = [];
    var name = document.getElementById('name').value;
    for (var i = 1; i <= questionNum; i++) {
        var question = document.getElementById('q' + i).value;
        var answer1 = document.getElementById(i + 'a1').value;
        var answer2 = document.getElementById(i + 'a2').value;
        var answer3 = document.getElementById(i + 'a3').value;
        var answer4 = document.getElementById(i + 'a4').value;
        var correct = document.getElementById('correct' + i).value;
        var answers = [answer1, answer2, answer3, answer4];
        questions.push({ "question": question, "answers": answers, "correct": correct })
    }

    var quiz = { id: 0, "name": name, "questions": questions };
    socket.emit('newQuiz', quiz);
}

function addQuestion() {
    questionNum += 1;

    var questionsDiv = document.getElementById('allQuestions');

    var newQuestionDiv = document.createElement("div");

    var questionLabel = document.createElement('label');
    var questionField = document.createElement('textarea');

    var answer1Label = document.createElement('label');
    var answer1Field = document.createElement('input');

    var answer2Label = document.createElement('label');
    var answer2Field = document.createElement('input');

    var answer3Label = document.createElement('label');
    var answer3Field = document.createElement('input');

    var answer4Label = document.createElement('label');
    var answer4Field = document.createElement('input');

    var correctLabel = document.createElement('label');
    var correctField = document.createElement('input');
    correctField.classList.add('correct')


    questionLabel.innerHTML = "Question " + String(questionNum) + ": ";
    questionField.setAttribute('class', 'question');
    questionField.setAttribute('id', 'q' + String(questionNum));
    questionField.setAttribute('cols', '700');

    answer1Label.innerHTML = "Answer 1: ";
    answer2Label.innerHTML = " Answer 2: ";
    answer3Label.innerHTML = "Answer 3: ";
    answer4Label.innerHTML = " Answer 4: ";
    correctLabel.innerHTML = "Correct Answer (1-4): ";

    answer1Field.setAttribute('id', String(questionNum) + "a1");
    answer1Field.setAttribute('type', 'text');
    answer2Field.setAttribute('id', String(questionNum) + "a2");
    answer2Field.setAttribute('type', 'text');
    answer3Field.setAttribute('id', String(questionNum) + "a3");
    answer3Field.setAttribute('type', 'text');
    answer4Field.setAttribute('id', String(questionNum) + "a4");
    answer4Field.setAttribute('type', 'text');
    correctField.setAttribute('id', 'correct' + String(questionNum));
    correctField.setAttribute('type', 'number');

    newQuestionDiv.setAttribute('id', 'question-field'); //Sets class of div

    var fieldQ = document.createElement('div')
    fieldQ.classList.add('field')
    fieldQ.appendChild(questionLabel);
    fieldQ.appendChild(questionField);
    newQuestionDiv.appendChild(fieldQ);

    newQuestionDiv.appendChild(document.createElement('br')); //Creates a break between each question

    var fieldA1 = document.createElement('div')
    fieldA1.classList.add('field')
    fieldA1.appendChild(answer1Label);
    fieldA1.appendChild(answer1Field);
    newQuestionDiv.appendChild(fieldA1);

    var fieldA2 = document.createElement('div')
    fieldA2.classList.add('field')
    fieldA2.appendChild(answer2Label);
    fieldA2.appendChild(answer2Field);
    newQuestionDiv.appendChild(fieldA2);

    var fieldA3 = document.createElement('div')
    fieldA3.classList.add('field')
    fieldA3.appendChild(answer3Label);
    fieldA3.appendChild(answer3Field);
    newQuestionDiv.appendChild(fieldA3);

    var fieldA4 = document.createElement('div')
    fieldA4.classList.add('field')
    fieldA4.appendChild(answer4Label);
    fieldA4.appendChild(answer4Field);
    newQuestionDiv.appendChild(fieldA4);

    newQuestionDiv.appendChild(document.createElement('br')); //Creates a break between each question


    var fieldCorrect = document.createElement('div')
    fieldCorrect.classList.add('field')
    fieldCorrect.appendChild(correctLabel);
    fieldCorrect.appendChild(correctField);
    newQuestionDiv.appendChild(fieldCorrect);

    questionsDiv.appendChild(document.createElement('br')); //Creates a break between each question
    questionsDiv.appendChild(newQuestionDiv); //Adds the question div to the screen

    newQuestionDiv.style.backgroundColor = randomColor();
}

//Called when user wants to exit quiz creator
function cancelQuiz() {
    if (confirm("Are you sure you want to exit? All work will be DELETED!")) {
        window.location.href = "../";
    }
}

socket.on('startGameFromCreator', function(data) {
    window.location.href = "../../host/?id=" + data;
});

function randomColor() {

    var colors = ['#4CAF50', '#f94a1e', '#3399ff', '#ff9933'];
    var randomNum = Math.floor(Math.random() * 4);
    return colors[randomNum];
}

function setBGColor() {
    var randColor = randomColor();
    document.getElementById('question-field').style.backgroundColor = randColor;
}