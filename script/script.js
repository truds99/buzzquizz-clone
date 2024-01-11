const urlAPI = "https://mock-api.driven.com.br/api/v4/buzzquizz/";
const main = document.querySelector(".main");
let hits = 0, qttQuestions, levels, timeout, quizzID;

function getQuizzes() {
    const promise = axios.get(`${urlAPI}quizzes`);
    promise.then(renderQuizzes);
}

function renderQuizzes(response) {
    main.innerHTML = `
        <div class="mainScreen">
            <h2 class="titleYourQuizzes">Your Quizzes</h2>
            <div class="yourQuizzes">
            <ion-icon class="buttonCreate" onclick="renderCreationPage()" name="add-circle"></ion-icon>
            </div>
            <h2>All Quizzes</h2>
            <div class="allQuizzes">
            </div>
        </div>`;
    const yourQuizzes = document.querySelector(".yourQuizzes");
    const quizzes = document.querySelector(".allQuizzes");
    let savedQuizzesString = localStorage.getItem("ids");
    const titleYourQuizzes = document.querySelector(".titleYourQuizzes");
    if(!savedQuizzesString){
        savedQuizzesString = "[]";
    }
    if(savedQuizzesString === "[]"){
        document.querySelector(".buttonCreate").classList.add("hidden");
        titleYourQuizzes.innerHTML = "";
        yourQuizzes.innerHTML = `
            <div class="noQuizz">
                <p>You haven't created any<br/>quizzes yet :(</p>
                <button onclick="renderCreationPage()">Create Quizz</button>
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
    quizzID = quizz.data.id;
    main.innerHTML= `
        <div class="title">
            <img src="${quizz.data.image}" alt="${quizz.data.title}">
            <h4>${quizz.data.title}</h4>
            <div class="blackLay"></div>
        </div>
        <div class="quizzContent"></div>`;
    const quizzContent = document.querySelector(".quizzContent");
    for (let i=0; i<qttQuestions; i++) {
        quizzContent.innerHTML += `
            <div class="question unanswered">
                <h5>${quizz.data.questions[i].title}</h5>
                <div class="allAnswers"></div>
            </div>`;
        quizzContent.lastElementChild.firstElementChild.style.backgroundColor = `${quizz.data.questions[i].color}`
        const allAnswers = quizzContent.lastChild.querySelector(".allAnswers");
        quizz.data.questions[i].answers.sort(comparador);
        for (let j=0; j<quizz.data.questions[i].answers.length; j++) {
            allAnswers.innerHTML += `
                <div class="answer ${quizz.data.questions[i].answers[j].isCorrectAnswer}" onclick="selectAnswer(this)">
                    <img src="${quizz.data.questions[i].answers[j].image}">
                    <h6>${quizz.data.questions[i].answers[j].text}</h6>
                </div>`
        }
    }
    window.scrollTo(0, 0);
}   

function selectAnswer(answer) {
    const question = answer.parentNode;
    if (!question.parentNode.classList.contains("unanswered")){
        return;
    }
    clearTimeout(timeout);
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
    timeout = setTimeout(scrollPage, 2000);
}

function comparador() { 
	return Math.random() - 0.5; 
}

function scrollPage() {
    const unanswered = document.querySelector(".unanswered");
    if (unanswered) {
        unanswered.scrollIntoView();
        scrollBy(0, -30);
    }
    else {
        renderResult();
    }
}

function renderResult() {
    const quizzContent = document.querySelector(".quizzContent");
    hitsPct = Math.round(hits*100/qttQuestions);
    const getLevel = calcLevel(hitsPct);
    quizzContent.innerHTML += `
        <div class="auxScroll"></div>
        <div class="result">
            <h5 class="backgroundRed">${hitsPct}% de acerto: ${levels[getLevel].title}</h5>
            <div class="resultContent">
                <img src="${levels[getLevel].image}">
                <p>${levels[getLevel].text}</p>
            </div>
        </div>`;
    quizzContent.innerHTML += `
        <button class="restart" onclick="restartQuizz(${quizzID})">Restart Quizz</button>
        <button class="toHome" onclick="window.location.reload()">Back to homepage</button>`
    const auxScroll = document.querySelector(".auxScroll");
    auxScroll.scrollIntoView();
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

function restartQuizz(id) {
    hits = 0;
    getOnlyQuizz(id);
    const title = document.querySelector(".title");
    title.scrollIntoView();
}

getQuizzes();



