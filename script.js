const urlAPI = "https://mock-api.driven.com.br/api/v4/buzzquizz/";
const yourQuizzes = document.querySelector(".yourQuizzes");
const quizzes = document.querySelector(".allQuizzes");

function getQuizzes() {
    const promise = axios.get(`${urlAPI}quizzes`);
    promise.then(renderQuizzes);
}

function renderQuizzes(response) {
    const idQuizz = localStorage.getItem("id");
    console.log(idQuizz);
    if(!idQuizz) {
        yourQuizzes.innerHTML = `
            <p>You haven't created any<br/>quizzes yet :(</p>
            <button>Create Quizz</button>`
    }
    for (let i=0; i<response.data.length; i++) {
        quizzes.innerHTML += `
            <div class="quizz">
                <img src="${response.data[i].image}">
                <h3>${response.data[i].title}</h3>
                <div class="gradient"></div>    
            </div>`
    }
}

getQuizzes();

