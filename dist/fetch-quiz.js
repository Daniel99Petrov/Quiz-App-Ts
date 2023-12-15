"use strict";
// Get references to HTML elements
let categoryDropdown = document.getElementById("select-category");
let countDropdown = document.getElementById("select-count");
let difficultyDropdown = document.getElementById("select-difficulty");
let searchButton = document.querySelector(".search");
let nextButton = document.querySelector(".next");
let resetButton = document.querySelector(".reset");
let questText = document.querySelector(".quest-text");
let answers = document.querySelector(".answers");
let histories = document.querySelector(".history-cards");
let pointsMessage = document.querySelector(".points");
let downloadButton = document.querySelector(".download");
// Initialize variables for quiz state
let allQuestions = [];
let currentQuestion;
let questionText;
let currentAnswers = [];
let myAnswers = [];
let correctAnswers = [];
let categoryTransformer = 22;
let count = 20;
let difficulty = "medium";
let currentCount = 0;
let localPoints = 0;
let points = 0;
// Event listener for category dropdown
categoryDropdown.onchange = (ev) => {
    let selectedIndex = categoryDropdown.selectedIndex;
    let selectedOption = categoryDropdown.options[selectedIndex];
    if (selectedOption.value === "1") {
        categoryTransformer = 21;
    }
    else if (selectedOption.value === "3") {
        categoryTransformer = 23;
    }
    else {
        categoryTransformer = 22;
    }
    console.log(categoryTransformer);
};
// Event listener for count dropdown
countDropdown.onchange = (ev) => {
    let selectedIndex = countDropdown.selectedIndex;
    let selectedOption = countDropdown.options[selectedIndex];
    if (selectedOption.value === "1") {
        count = 10;
    }
    else if (selectedOption.value === "3") {
        count = 30;
    }
    else {
        count = 20;
    }
};
// Event listener for difficulty dropdown
difficultyDropdown.onchange = (ev) => {
    let selectedIndex = difficultyDropdown.selectedIndex;
    let selectedOption = difficultyDropdown.options[selectedIndex];
    if (selectedOption.value === "1") {
        difficulty = "easy";
    }
    else if (selectedOption.value === "3") {
        difficulty = "hard";
    }
    else {
        difficulty = "medium";
    }
};
// Function to shuffle an array
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
    return array;
}
// Function to display a question
function displayQuestion() {
    currentQuestion = allQuestions[currentCount - 1];
    questionText = `${currentCount}.${currentQuestion.question}`;
    questText.textContent = questionText;
    console.log(questText.textContent);
    console.log(currentQuestion.correct_answer);
    currentAnswers.push(currentQuestion.correct_answer);
    currentQuestion.incorrect_answers.forEach((element) => {
        currentAnswers.push(element);
    });
    console.log(currentAnswers);
    shuffle(currentAnswers);
    console.log(currentAnswers);
    console.log(answers);
    answers.innerHTML = "";
    currentAnswers.forEach((answer, index) => {
        const answerContainer = document.createElement("div");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "answers";
        input.value = (index + 1).toString();
        input.classList.add(`${index + 1}`);
        const label = document.createElement("label");
        label.htmlFor = `${index + 1}`;
        label.textContent = answer.toString();
        // Append the input and label to the answers container
        answerContainer.appendChild(input);
        answerContainer.appendChild(label);
        answers.appendChild(answerContainer);
        if (label.textContent === currentQuestion.correct_answer) {
            input.classList.add("green");
            console.log(label);
        }
        answers.classList.add("answers-container");
    });
}
// Function to handle the "Next" button click
function handleNextButtonClick() {
    // Get the selected radio button
    const selectedRadioButton = document.querySelector('input[name="answers"]:checked');
    console.log(selectedRadioButton);
    console.log(currentCount);
    // Check if a radio button is selected
    if (selectedRadioButton) {
        selectedRadioButton.classList.add("checked");
        // Update history with the current question and answers
        histories.innerHTML += `${questionText}
    <br><br>
    ${answers.innerHTML} 
    <br><br><hr>`;
        console.log(histories.innerHTML);
        // Get the label text corresponding to the selected radio button
        const label = document.querySelector(`label[for="${selectedRadioButton.value}"]`);
        if (label === null || label === void 0 ? void 0 : label.textContent) {
            const selectedLabel = label.textContent;
            //   document
            //     .querySelector(`label[for="${(selectedRadioButton as HTMLInputElement).value}"]`)
            //     .classList.add("checked");
            label.classList.add("checked");
            // Store the chosen answer in the array
            myAnswers.push(selectedLabel);
            correctAnswers.push(currentQuestion.correct_answer);
            if (selectedLabel === currentQuestion.correct_answer) {
                points++;
            }
            console.log(points);
            // Move to the next question
            currentCount++;
            currentAnswers = [];
            if (currentCount <= count) {
                displayQuestion();
            }
            else {
                endGame();
            }
        }
    }
    else {
        // Handle the case where no radio button is selected
        alert("Please select an answer before moving to the next question.");
    }
}
// Function to end the game
function endGame() {
    var _a;
    for (let index = 0; index < correctAnswers.length; index++) {
        if (correctAnswers[index] === myAnswers[index]) {
            localPoints++;
        }
    }
    localStorage.setItem("points", String(localPoints));
    localStorage.setItem("questionsCount", String(count));
    const pointsResult = Math.round((Number(localStorage.getItem("points")) / count) * 100);
    pointsMessage.innerHTML = `<h2>You scored ${pointsResult}% !</h2>`;
    answers.classList.add("hidden");
    questText.classList.add("hidden");
    (_a = document.querySelector(".history")) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
    downloadButton.classList.remove("hidden");
    nextButton.classList.add("hidden");
    localStorage.setItem("myAnswers", String(myAnswers));
    localStorage.setItem("correctAnswers", String(correctAnswers));
}
// Function to reset the game state
function resetGame() {
    var _a;
    answers.classList.add("hidden");
    resetButton.classList.add("hidden");
    nextButton.classList.add("hidden");
    downloadButton.classList.add("hidden");
    searchButton.classList.remove("hidden");
    (_a = document.querySelector(".history")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
    questText.textContent = `Press START`;
    questText.classList.remove("hidden");
    histories.innerHTML = ``;
    allQuestions = [];
    localStorage.clear();
    //   currentQuestion = {""};
    questionText;
    currentAnswers = [];
    myAnswers = [];
    currentCount = 0;
    points = 0;
}
// Event listener for the "Start" button click
searchButton.addEventListener("click", function () {
    fetch(`https://opentdb.com/api.php?amount=${count}&category=${categoryTransformer}&type=multiple&difficulty=${difficulty}`)
        .then((data) => {
        return data.json();
    })
        .then((data) => {
        if (currentCount === 0) {
            answers.classList.remove("hidden");
            resetButton.classList.remove("hidden");
            nextButton.classList.remove("hidden");
            searchButton.classList.add("hidden");
        }
        currentCount++;
        console.log(data);
        console.log(data.results[0].question);
        data.results.forEach((element) => {
            allQuestions.push(element);
        });
        console.log(allQuestions);
        localStorage.clear();
        localStorage.setItem("questions", JSON.stringify(data.results));
        displayQuestion();
    });
});
// Event listener for the "Next" button click
nextButton.addEventListener("click", handleNextButtonClick);
// Event listener for the "Reset" button click
resetButton.addEventListener("click", resetGame);

const worker = new Worker("./worker.js", { type: "module" });
downloadButton.addEventListener("click", () => {
    const points = localStorage.getItem("points");
    const questionsCount = localStorage.getItem("questionsCount");
    // const correctAnswers = JSON.parse(localStorage.getItem("correctAnswers"));
    console.log(myAnswers);
    worker.onmessage = (e) => {
        const blob = e.data;
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "QuizPoints.zip";
        link.click();
    };
    worker.postMessage({ points, questionsCount });
});
