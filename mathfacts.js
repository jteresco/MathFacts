var problems = [];
var currentProblemNum;
var currentProblem;
var timeLimit = 7;
var timeLeft;
var answerDelay = 3;
var lastTimeout;

function initialize() {

    document.getElementById("answer").disabled = true;

    // create the list of problems
    for (let a = 3; a <= 10; a++) {
	for (let b = 3; b <= 10; b++) {
	    problems.push({
		problem: a + " x " + b,
		answer: a*b
	    });
	    problems.push({
		problem: a + " + " + b,
		answer: a+b
	    });
	    problems.push({
		problem: (a+b) + " - " + b,
		answer: a
	    });
	}
    }

    pickProblem();

    // add keypress listener to answer field
    document.getElementById("answer").addEventListener(
	'keypress',
	function(e) {
	    if (e.keyCode == 13) {
		enterPressedInInput();
	    }
	}
    );
}

function pickProblem() {

    // pick one
    currentProblemNum = Math.floor(Math.random() * problems.length);
    currentProblem = problems[currentProblemNum];
    document.getElementById("problem").innerHTML = currentProblem.problem;
    document.getElementById("answer").disabled = false;
    document.getElementById("answer").focus();
    document.getElementById("answer").select();
    document.getElementById("answer").value = "";

    document.getElementById("message").innerHTML = "You have " + timeLimit + " seconds.";
    timeLeft = timeLimit;
    document.getElementById("leftToAnswer").innerHTML = "Problems left: " + problems.length;

    // update countdown in 1 second
    lastTimeout = setTimeout(clockTick, 1000);
    
}

function clockTick() {

    timeLeft--;
    if (timeLeft == 0) {
	// time's up
	document.getElementById("answer").disabled = true;
	document.getElementById("answer").value = currentProblem.answer;
	document.getElementById("message").innerHTML = "Time's up!  Remember for next time! " + currentProblem.problem + " = " + currentProblem.answer;
	setTimeout(pickProblem, answerDelay*1000);
    }
    else {
	if (timeLeft == 1) {
	    document.getElementById("message").innerHTML = "You have 1 second.";
	}
	else {
	    document.getElementById("message").innerHTML = "You have " + timeLeft + " seconds.";
	}
	lastTimeout = setTimeout(clockTick, 1000);
	
    }
}

function enterPressedInInput() {

    // clear the timeout for the countdown
    clearTimeout(lastTimeout);

    document.getElementById("answer").disabled = true;

    // if time is up, we can't enter an answer
    if (timeLeft == 0) return;

    // check the answer
    let answer = document.getElementById("answer").value.trim();

    if (answer == currentProblem.answer+"") {
	document.getElementById("message").innerHTML = "Correct!";
	problems.splice(currentProblemNum, 1);
    }
    else {
	document.getElementById("answer").value = currentProblem.answer;
	document.getElementById("message").innerHTML = "That's incorrect!  Remember for next time! " + currentProblem.problem + " = " + currentProblem.answer;
    }

    if (problems.length == 0) {
	document.getElementById("leftToAnswer").innerHTML =
	    "You got them all, well done!";
    }
    else {
	setTimeout(pickProblem, answerDelay*1000);
    }
}
