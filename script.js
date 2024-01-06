const urlAPI = "https://mock-api.driven.com.br/api/v4/buzzquizz/";
const main = document.querySelector(".main");
let hits = 0, qttQuestions, levels;

function getQuizzes() {
    const promise = axios.get(`${urlAPI}quizzes`);
    promise.then(renderQuizzes);
}

function renderQuizzes(response) {
    main.innerHTML = `
        <div class="mainScreen">
            <h2 class="titleYourQuizzes">Your Quizzes</h2>
            <div class="yourQuizzes"></div>
            <h2>All Quizzes</h2>
            <div class="allQuizzes"></div>
        </div>`;
    const yourQuizzes = document.querySelector(".yourQuizzes");
    const quizzes = document.querySelector(".allQuizzes");
    const savedQuizzesString = localStorage.getItem("ids");
    const titleYourQuizzes = document.querySelector(".titleYourQuizzes");
    if(!savedQuizzesString){
        savedQuizzesString = "[]";
    }
    if(savedQuizzesString === "[]"){
        titleYourQuizzes.innerHTML = "";
        yourQuizzes.innerHTML = `
            <div class="noQuizz">
                <p>You haven't created any<br/>quizzes yet :(</p>
                <button>Create Quizz</button>
            </div>`
    }
    const savedQuizzes = JSON.parse(savedQuizzesString);
    for (let i=0; i<response.data.length; i++) {
        if(savedQuizzes.includes(response.data[i].id)){
            yourQuizzes.innerHTML += `
                <div class="quizz" onclick="getOnlyQuizz(${response.data[i].id})">
                    <img src="${response.data[i].image}">
                    <h3>${response.data[i].title}</h3>
                    <div class="gradient"></div>    
                </div>`
        }
        else{
        quizzes.innerHTML += `
            <div class="quizz" onclick="getOnlyQuizz(${response.data[i].id})">
                <img src="${response.data[i].image}">
                <h3>${response.data[i].title}</h3>
                <div class="gradient"></div>    
            </div>`
        }
    }
}

function getOnlyQuizz (quizz) {
    const promise = axios.get(`${urlAPI}quizzes/${quizz}`);
    promise.then(openQuizz);
}

function openQuizz(quizz) {
    qttQuestions = quizz.data.questions.length;
    levels = quizz.data.levels;
    main.innerHTML= `
        <div class="title">
            <img src="${quizz.data.image}" alt="${quizz.data.title}">
            <h4>${quizz.data.title}</h4>
            <div class="blackLay"></div>
        </div>
        <div class="allQuestions"></div>`;
    const allQuestions = document.querySelector(".allQuestions");
    for (let i=0; i<qttQuestions; i++) {
        let backgroundColor = setBackground();
        allQuestions.innerHTML += `
            <div class="question unanswered">
                <h5 class="${backgroundColor}">${quizz.data.questions[i].title}</h5>
                <div class="allAnswers"></div>
            </div>`;
        const allAnswers = allQuestions.lastChild.querySelector(".allAnswers");
        quizz.data.questions[i].answers.sort(comparador);
        for (let j=0; j<quizz.data.questions[i].answers.length; j++) {
            allAnswers.innerHTML += `
                <div class="answer ${quizz.data.questions[i].answers[j].isCorrectAnswer}" onclick="selectAnswer(this)">
                    <img src="${quizz.data.questions[i].answers[j].image}">
                    <h6>${quizz.data.questions[i].answers[j].text}</h6>
                </div>`
        }
    }
}   


function selectAnswer(answer) {
    const question = answer.parentNode;
    if (!question.parentNode.classList.contains("unanswered")){
        return;
    }
    question.parentNode.classList.remove("unanswered");
    const answers = question.querySelectorAll(".answer");
    answers.forEach(elm => {
        if(elm !== answer) {
            elm.firstElementChild.classList.add("opacity");
        }
        if(elm.classList.contains("true")){
            elm.lastElementChild.classList.add("true");
        }
        else {
            elm.lastElementChild.classList.add("false");
        }
    });
    if (answer.classList.contains("true")){
        hits ++;
    }
    setTimeout(scrollPage, 2000);
}

function comparador() { 
	return Math.random() - 0.5; 
}

function scrollPage() {
    const unanswered = document.querySelector(".unanswered");
    if (unanswered) {
        unanswered.scrollIntoView();
    }
    else {
        renderResult();
    }
}

function renderResult() {
    const allQuestions = document.querySelector(".allQuestions");
    hitsPct = Math.round(hits*100/qttQuestions);
    const getLevel = calcLevel(hitsPct);
    allQuestions.innerHTML += `
        <div class="result">
            <h5 class="backgroundRed">${hitsPct}% de acerto: ${levels[getLevel].title}</h5>
            <div class="resultContent">
                <img src="${levels[getLevel].image}">
                <p>${levels[getLevel].text}</p>
            </div>
        </div>`;
    const result = document.querySelector(".result");
    result.scrollIntoView();
}

function calcLevel(n) {
    let x = 0;
    for (let i=0; i<levels.length; i++) {
        if (n >= levels[i].minValue) {
            x = i;
        }
    }
    return x;
} 

function setBackground () {
    let colors = [1, 2, 3, 4, 5];
    colors.sort(comparador);
    switch (colors[0]) {
        case 1: return "backgroundBlue";
        case 2: return "backgroundGreen";
        case 3: return "backgroundYellow";
        case 4: return "backgroundPurple";
        case 5: return "backgroundRed";
    }
}

getQuizzes();

