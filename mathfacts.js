var problems = [];
var currentProblem;

function initialize() {

    // create the list of problems
    for (let a = 2; a <= 10; a++) {
	for (let b = 2; b <= 10; b++) {
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
    
}

