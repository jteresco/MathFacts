var problems = [];
var currentProblem;
var timeLimit = 5;
var timeLeft;

function initialize() {

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
}

function pickProblem() {

    // pick one
    let problemNum = Math.floor(Math.random() * problems.length);
    currentProblem = problems[problemNum];
    document.getElementById("problem").innerHTML = currentProblem.problem;
    document.getElementById("answer").innerHTML = "";

    document.getElementById("message").innerHTML = "You have " + timeLimit + " seconds.";
    timeLeft = timeLimit;
    document.getElementById("leftToAnswer").innerHTML = "Problems left: " + problems.length;

    // update countdown in 1 second
    setTimeout(clockTick, 1000);
    
}

function clockTick() {

    timeLeft--;
    if (timeLeft == 0) {
	// time's up
	document.getElementById("answer").value = currentProblem.answer;
	document.getElementById("message").innerHTML = "Time's up!  Remember for next time! " + currentProblem.problem + " = " + currentProblem.answer;
    }
    else {
	if (timeLeft == 1) {
	    document.getElementById("message").innerHTML = "You have 1 second.";
	}
	else {
	    document.getElementById("message").innerHTML = "You have " + timeLeft + " seconds.";
	}
	setTimeout(clockTick, 1000);
	
    }
}
