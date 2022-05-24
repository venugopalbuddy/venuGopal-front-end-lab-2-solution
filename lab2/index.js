let questions = [
    new Question("In which year of First World War Germany declared war on Russia and France ?", [1914, 1915, 1916, 1917], 1914),
    new Question("India has largest deposits of ____ in the world ?", ["gold", "copper", "iron", "mica"], "mica"),
    new Question("India's first satellite is named after ?", ["Aryabhatta", "Bhaskara II", "Bhaskara I", "Albert Einstien"], "Aryabhatta"),
    new Question("India's first atomic reactor was ?", ["Zerlina", "Dhruva", "Apsara", "kamini"], "Apsara"),
    new Question("In a normal human body, the total number of red blood cells is ?", ["15 trillion", "20 trillion", "25 trillion", "30 trillion"], "30 trillion"),
    new Question("If force is expressed in Newton and the distance in metre, then the work done is expressed in ?", ["Joule", "Kg wt", "Kg wt m", "Watt"], "Joule"),
    new Question("If speed of rotation of the earth increases, weight of the body ?", ["increases", "remains unchanged", "decreases", "may increase or decrease"], "decreases"),
    new Question("Ornithology is the study of ?", ["birds", "bones", "smells", "ornaments"], "birds")
];


function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.index = 0;
}

Quiz.prototype.getQuestionByIndex = function () {
    return this.questions[this.index];
}

Quiz.prototype.checkForCorrectAnswer = function (answer) {
    if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.index++;
}

Quiz.prototype.isEnded = function () {
    return this.index === this.questions.length;
}

function Question(questiontext, choices, answer) {
    this.text = questiontext;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
}



function loadQuestions() {
    if (quiz.isEnded()) {
        showFinalScores();
    }
    else {
        let currentQuestion = quiz.getQuestionByIndex();
        let element = document.getElementById("question");
        element.innerHTML = currentQuestion.text;

        let choices = currentQuestion.choices;
        for (let i = 0; i < choices.length; i++) {
            let eachChoiceElement = document.getElementById("choice" + i);
            eachChoiceElement.innerHTML = choices[i];

            let eachButtonElement = document.getElementById("btn" + i);
            eachButtonElement.onclick = function () {
                quiz.checkForCorrectAnswer(choices[i]);
                loadQuestions();
            };
        }
        showProgress();
    }
}

let quiz = new Quiz(questions);
loadQuestions();

function showFinalScores() {
    let resultPercentage = (quiz.score / questions.length) * 100;
    let completeHTML = `<h1> Result </h1>
       <h2 id='score'> Your Scores : ${quiz.score} </h2>
       <h3>And mark percentage is : ${resultPercentage}%  </h3>  
      `;
    let quizCanavs = document.getElementById("quiz");
    quizCanavs.innerHTML = completeHTML;
}

function showProgress() {
    let questNo = quiz.index + 1;
    let element = document.getElementById("progress");
    element.innerHTML = `Question ${questNo} of  ${quiz.questions.length}`;
}