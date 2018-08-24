// math facts web page by Jim Teresco
// 2018-08-24

var problems = [];
var currentProblemNum;
var currentProblem;
var timeLimit = 7;
var timeLeft;
var answerDelay = 3;
var lastTimeout;
var numProblems = 50;
var startTime;
var numTimeouts;
var numIncorrect;

// add in all problems in range
function allProblems(low, high) {
    
    for (let a = low; a <= high; a++) {
	for (let b = low; b <= high; b++) {
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

}

function initialize() {

    document.getElementById("answer").disabled = true;

    // create the list of problems
    
    // start with the hard ones
    allProblems(6,8);

    // add in some random ones
    let nextOp = 0; // *
    while (problems.length < numProblems) {

	let a = Math.floor(Math.random() * 11);
	let b = Math.floor(Math.random() * 11);
	switch (nextOp) {
	case 0:
	    problems.push({
		problem: a + " x " + b,
		answer: a*b
	    });
	    nextOp = 1;
	    break;
	case 1:
	    problems.push({
		problem: a + " + " + b,
		answer: a+b
	    });
	    nextOp = 2;
	    break;
	case 2:
	    problems.push({
		problem: (a+b) + " - " + b,
		answer: a
	    });
	    nextOp = 0;
	    break;
	}
    }

    numIncorrect = 0;
    numTimeouts = 0;
    startTime = Date.now();
    // pick one to get started
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
	numTimeouts++;
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
	numIncorrect++;
	document.getElementById("answer").value = currentProblem.answer;
	document.getElementById("message").innerHTML = "That's incorrect!  Remember for next time! " + currentProblem.problem + " = " + currentProblem.answer;
    }

    if (problems.length == 0) {
	let elapsedTime = Math.round((Date.now() - startTime) / 1000);
	document.getElementById("leftToAnswer").innerHTML =
	    "You got them all in " + elapsedTime + " seconds and got " +
	    numIncorrect + " wrong and took too long on " + numTimeouts +
	    " along the way.";
    }
    else {
	setTimeout(pickProblem, answerDelay*1000);
    }
}
