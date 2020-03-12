$(document).ready(function() {

    // track question 
    var questionCounter = 0;
    // 30 seconds for each question
    var time = 30;
    // will keep tally of right guesses for end game
    var correctGuesses = 0;
    //will keep tally of wrong guesses for end game
    var incorrectGuesses = 0;

    // question & answer array
    var questions = [
      {
	    question: "What does wubba lubba dub dub mean?",
	    choices: ["Please Leave", "I'm a Genius", "Let's Party", "I'm in pain"],
	    correctAnswer: "I'm in pain",
	  }, 

	  {
	    question: "What is the name of Morty's crush?",
	    choices: ["Annie", "Jessica", "Summer", "Heather"],
	    correctAnswer: "Jessica",
	  },

	  {
	    question: "Which implement does Rick use to travel between dimensions?",
	    choices: ["Rift Ray", "Jump Laser", "Interdimensional Ray", "Portal Gun"],
	    correctAnswer: "Portal Gun",
	  },

	  {
	    question: "In one episode, it's revealed that Rick has built a theme park inside of a homeless man. What is that theme park called?",
	    choices: ["Anatomy Park", "Body Land", "Intestine Town", "Organopolis"],
	    correctAnswer: "Anatomy Park",
	  },
	  
	  ];
	  

	// create question contents according to question count
	function questionContent() {
		// a for loop would be cool here...
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

	// user guessed correctly
	function userWin() {
		$("#gameScreen").html("<p>Correct!</p>");
		correctGuesses++;
		var correctAnswer = questions[questionCounter].correctAnswer;
		$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
			correctAnswer + 
			"</span></p>");
		setTimeout(nextQuestion, 4000);
		questionCounter++;
	}

	// user guessed incorrectly
	function userLoss() {
		$("#gameScreen").html("<p>Incorrect!</p>");
		incorrectGuesses++;
		var correctAnswer = questions[questionCounter].correctAnswer;
		$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
			correctAnswer + 
			"</span></p>");
		setTimeout(nextQuestion, 4000);
		questionCounter++;
	}

	// user ran out of time
	function userTimeout() {
		if (time === 0) {
			$("#gameScreen").html("<p>Time is up!</p>");
			incorrectGuesses++;
			var correctAnswer = questions[questionCounter].correctAnswer;
			$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
				correctAnswer + 
				"</span></p>");
			setTimeout(nextQuestion, 4000);
			questionCounter++;
		}
	}

	// screen that shows final score 
	function resultsScreen() {
		if (correctGuesses === questions.length) {
			var endMessage = "Perfect Score";
		}
		else {
			var endMessage = "Try Again?";
		}
		$("#gameScreen").html("<p>" +  "</p>" + "<p>You got <strong>" + 
			correctGuesses + "</strong> right.</p>" + 
			"<p>You got <strong>" + incorrectGuesses + "</strong> wrong.</p>");
		$("#gameScreen").append("<h1 id='start'>Start Over?</h1>");
		gameReset();
		$("#start").click(nextQuestion);
	}

	// game clock currently set to 30 seconds
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

	// moves question counter forward to show next question
	function nextQuestion() {
		if (questionCounter < questions.length) {
			time = 30;
			$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
			questionContent();
			timer();
			userTimeout();
		}
		else {
			resultsScreen();
		}
	
	}

	// reset score and counter parameters on restart
	function gameReset() {
		questionCounter = 0;
		correctGuesses = 0;
		incorrectGuesses = 0;
	}

    function startGame() {
    	$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
    	$("#start").hide();
		questionContent();
    	timer();
    	userTimeout();
    }

    // start game
    $("#start").click(nextQuestion);

   
	$("#gameScreen").on("click", ".choices", (function() {
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