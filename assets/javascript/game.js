
$(document).ready(function () {
    var questionCounter = 0;
    var time = 10;
    var correctGuesses = 0;
    var incorrectGuesses = 0;
    var questions = [
        {
            question: "What is the distance between the Sun and Earth??",
            choices: ["438,000 miles", "27 million miles", "93 million miles", "2 million miles"],
            correctAnswer: "93 million miles",
        },
        {
            question: "How many moons does Jupiter have?",
            choices: ["67", "52", "3", "16"],
            correctAnswer: "67",
        },
        {
            question: "What is the most common type of star found in the Milky Way?",
            choices: ["Red giant", "Brown dwarf", "Red dwarf", "Blue giant"],
            correctAnswer: "Red dwarf",
        },
        {
            question: "What is the diameter of the Earth’s moon?",
            choices: ["4,692 miles", "2,159 miles", "873 miles", "12,246 miles"],
            correctAnswer: "2,159 miles",
        }];

    function questionContent() {
        $("#gameScreen").append("<p><strong>" +
            questions[questionCounter].question +
            "</p><p class='choices'>" +
            questions[questionCounter].choices[0] +
            "</p><p class='choices'>" +
            questions[questionCounter].choices[1] +
            "</p><p class='choices'>" +
            questions[questionCounter].choices[2] +
            "</p><p class='choices'>" +
            questions[questionCounter].choices[3] +
            "</strong></p>");
    }

    function userWin() {
        $("#gameScreen").html("<h2>Correct!</h2>");
        correctGuesses++;
        var correctAnswer = questions[questionCounter].correctAnswer;
        $("#gameScreen").append("<p class='center'>The answer was <span class='answer'>" + correctAnswer + "</span></p>");
        setTimeout(nextQuestion, 3000);
        questionCounter++;
    }

    function userLoss() {
        $("#gameScreen").html("<h2>Wrong!</h2>");
        incorrectGuesses++;
        var correctAnswer = questions[questionCounter].correctAnswer;
        $("#gameScreen").append("<p class='center'>The answer was <span class='answer'>" + correctAnswer + "</span></p>");
        setTimeout(nextQuestion, 3000);
        questionCounter++;
    }

    function userTimeout() {
        if (time === 0) {
            $("#gameScreen").html("<h2>You ran out of time!</h2>");
            incorrectGuesses++;
            var correctAnswer = questions[questionCounter].correctAnswer;
            $("#gameScreen").append("<p class='center'>The answer was <span class='answer'>" + correctAnswer + "</span></p>");
            setTimeout(nextQuestion, 3000);
            questionCounter++;
        }
    }

    function resultsScreen() {
        if (correctGuesses === questions.length) {
            var endMessage = "Killed it!";
        }
        else if (correctGuesses > incorrectGuesses) {
            var endMessage = "Decent job";
        }
        else {
            var endMessage = "Maybe try again";
        }
        $("#gameScreen").html("<h2 class='center'>" + endMessage + "</h2>" + "<p class='center'>You got <strong class='center'>" +
            correctGuesses + "</strong> right.</p>" +
            "<p class='center'>You got <strong class='center'>" + incorrectGuesses + "</strong> wrong.</p>");
        $("#gameScreen").append("<h2 id='start'>Start Over?</h2>");
        gameReset();
        $("#start").click(nextQuestion);
    }

    function timer() {
        clock = setInterval(countDown, 1000);
        function countDown() {
            if (time < 1) {
                clearInterval(clock);
                userTimeout();
            }
            if (time > 0) {
                time--;
            }
            $("#timer").html("<strong>" + time + "</strong>");
        }
    }

    function nextQuestion() {
        if (questionCounter < questions.length) {
            time = 10;
            $("#gameScreen").html("<p id='hurry'>Better hurry! <span id='timer'>" + time);
            questionContent();
            timer();
            userTimeout();
        }
        else {
            resultsScreen();
        }
    }

    function gameReset() {
        questionCounter = 0;
        correctGuesses = 0;
        incorrectGuesses = 0;
    }

    $("#start").click(nextQuestion);

    $("#gameScreen").on("click", ".choices", (function () {
        var userGuess = $(this).text();
        if (userGuess === questions[questionCounter].correctAnswer) {
            clearInterval(clock);
            userWin();
        }
        else {
            clearInterval(clock);
            userLoss();
        }
    }));
});
