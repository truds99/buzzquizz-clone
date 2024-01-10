let title, image, qttQuestionsCreated, qttLevelsCreated, objectQuizz = {};

function renderCreationPage() {
    main.innerHTML = `
        <div class="creationPage">
            <p>Start at the beginning</p>
            <div class="createInputs">
                <input class="createTitle" placeholder="Title" type="text">
                <input class="createImage" placeholder="Your quizz's image URL" type="text">
                <input class="createQttQuestions" placeholder="Number of questions" type="text">
                <input class="createQttLevels" placeholder="Number of levels" type="text">
            </div>
            <button class="createQuizz" onclick="createQuizz()">Continue to create questions</button>
        </div>`
}

function createQuizz() {
    const createTitle = document.querySelector(".createTitle");
    const createImage = document.querySelector(".createImage");
    const createQttQuestions = document.querySelector(".createQttQuestions");
    const createQttLevels = document.querySelector(".createQttLevels");
    if (createTitle.value.length < 20 || createTitle.value.length > 65) {
        alert("The title must contain between 20 and 65 characters");
        return;
    }
    if (!isUrl(createImage.value)){
        alert("Enter a valid URL");
        return;
    }
    if (createQttQuestions.value < 3 || isNaN(createQttQuestions.value)){
        alert("The quiz must contains at least 3 questions");
        return;
    }
    if (createQttLevels.value < 2 || isNaN(createQttLevels.value)){
        alert("The quiz must contains at least 2 levels");
        return;
    }
    title = createTitle.value, image = createImage.value, qttQuestionsCreated = createQttQuestions.value, qttLevelsCreated = createQttLevels.value;
    objectQuizz["title"] = title;
    objectQuizz["image"] = image;
    renderCreateQuestions();
}

function renderCreateQuestions() {
    main.innerHTML = `
        <div class="creationQuestionsPage">
            <p class="creationQuestionsTitle">Create your questions</p>
        </div>`;
    const creationQuestionsPage = document.querySelector(".creationQuestionsPage");
    for (let i=0; i<qttQuestionsCreated; i++) {
        creationQuestionsPage.innerHTML += `
            <div class="creationQuestions">
                <ion-icon onclick="toggleExpand(this);" name="open-outline"></ion-icon>
                <p>Question ${i+1}</p>
                <div class="inline">
                    <input class="titleQuestion" type="text" placeholder="Question text">
                    <input class="backgroundQuestion" type="text" placeholder="Question's background color">
                    <p>Correct answer</p>
                    <div class="correctAnswer">
                        <input class="correctText" type="text" placeholder="Correct answer">
                        <input class="correctImage" type="text" placeholder="Image URL">
                    </div>
                    <p>Incorrect answers</p>
                    <div class="incorrectAnswer">
                        <input class="incorrectText1" type="text" placeholder="Incorrect answer 1">
                        <input class="incorrectImage1" type="text" placeholder="Image URL 1">
                    </div>
                    <div class="incorrectAnswer">
                        <input class="incorrectText2" type="text" placeholder="Incorrect answer 2">
                        <input class="incorrectImage2" type="text" placeholder="Image URL 2">
                    </div>
                    <div class="incorrectAnswer">
                        <input class="incorrectText3" type="text" placeholder="Incorrect answer 3">
                        <input class="incorrectImage3" type="text" placeholder="Image URL 3">
                    </div>
                </div>
            </div>`;
    }
    creationQuestionsPage.innerHTML += `
        <button onclick="createQuestions()">Continue to create levels</button>`
}

function createQuestions() {
    if (checkInputsQuestions() === "invalid") {
        return;
    } 

    const creationQuestions = document.querySelectorAll(".creationQuestions");
    const titleQuestions = document.querySelectorAll(".titleQuestion");
    const colorQuestions = document.querySelectorAll(".backgroundQuestion");
    const correctTexts = document.querySelectorAll(".correctText");
    const correctImages = document.querySelectorAll(".correctImage");
    const incorrectText1 = document.querySelectorAll(".incorrectText1");
    const incorrectImage1 = document.querySelectorAll(".incorrectImage1");
    const incorrectText2 = document.querySelectorAll(".incorrectText2");
    const incorrectImage2 = document.querySelectorAll(".incorrectImage2");
    const incorrectText3 = document.querySelectorAll(".incorrectText3");
    const incorrectImage3 = document.querySelectorAll(".incorrectImage3");
    let objectQuestions = [];

    for (let i=0; i<creationQuestions.length; i++) {
        let answersGroup=[];
       
        answersGroup.push({
            text: correctTexts[i].value,
            image: correctImages[i].value,
            isCorrectAnswer: true
        });
        answersGroup.push({
            text: incorrectText1[i].value,
            image: incorrectImage1[i].value,
            isCorrectAnswer: false
        })
        if (incorrectText2[i].value !== "") {
            answersGroup.push({
                text: incorrectText2[i].value,
                image: incorrectImage2[i].value,
                isCorrectAnswer: false
            })
        }
        if (incorrectText3[i].value !== "") {
            answersGroup.push({
                text: incorrectText3[i].value,
                image: incorrectImage3[i].value,
                isCorrectAnswer: false
            })
        }
        
        objectQuestions.push({
            title: titleQuestions[i].value,
            color: colorQuestions[i].value,
            answers: answersGroup
        });   
    }

    objectQuizz["questions"] = objectQuestions;

    renderCreateLevels();

}

function checkInputsQuestions() {
    const titleQuestions = document.querySelectorAll(".titleQuestion");
    const colorQuestions = document.querySelectorAll(".backgroundQuestion");
    const correctTexts = document.querySelectorAll(".correctText");
    const correctImages = document.querySelectorAll(".correctImage");
    const incorrectText1 = document.querySelectorAll(".incorrectText1");
    const incorrectImage1 = document.querySelectorAll(".incorrectImage1");
    const incorrectText2 = document.querySelectorAll(".incorrectText2");
    const incorrectText3 = document.querySelectorAll(".incorrectText3");
    let inputs = "valid";

        titleQuestions.forEach(elm => {
            if (elm.value.length < 20 || typeof(elm.value) !== "string"){
                alert("Title must cointain at least 20 characters");
                inputs = "invalid";
            }});
        if (inputs === "invalid") {
                return inputs;
        }
        colorQuestions.forEach(elm => {
            if (!isColor(elm)) {
                alert("Enter a valid hexadecimal color");
                inputs = "invalid";
            }});
        if (inputs === "invalid") {
            return inputs;
        }
        correctTexts.forEach(elm => { 
            if (elm.value === "") {
                alert("Enter a correct answer");
                inputs = "invalid";
            }});
        if (inputs === "invalid") {
            return inputs;
        }
        correctImages.forEach(elm => {
            if (!isUrl(elm.value)){
                alert("Enter a valid URL in all correct answers");
                inputs = "invalid";
            }});
        if (inputs === "invalid") {
            return inputs;
        }
        incorrectText1.forEach(elm => { 
            if (elm.value === "") {
                alert("Enter at least one incorrect answer in each question");
                inputs = "invalid";
            }});
        if (inputs === "invalid") {
            return inputs;
        }
        incorrectImage1.forEach(elm => {
            if (!isUrl(elm.value)){
                alert("Enter a valid URL in each incorrect answers");
                inputs = "invalid";
            }});
        if (inputs === "invalid") {
            return inputs;
        }
        incorrectText2.forEach(elm => {
            if ((elm.value === "" && elm.nextElementSibling.value !== "") || (elm.value !== "" && !isUrl(elm.nextElementSibling.value))){
                alert("Enter valid incorrect answers");
                inputs = "invalid";
            }});
        if (inputs === "invalid") {
            return inputs;
        }
        incorrectText3.forEach(elm => {
            if ((elm.value === "" && elm.nextElementSibling.value !== "") || (elm.value !== "" && !isUrl(elm.nextElementSibling.value))){
                alert("Enter valid incorrect answers");
                inputs = "invalid";
            }});    
    return inputs;
}

function renderCreateLevels() {
    main.innerHTML = `
    <div class="creationLevelsPage">
        <p class="creationQuestionsTitle">Create your levels</p>
    </div>`;
    const creationLevelsPage = document.querySelector(".creationLevelsPage");
    for (let i=0; i<qttLevelsCreated; i++) {
        creationLevelsPage.innerHTML += `
            <div class="creationLevels">
                <ion-icon onclick="toggleExpand(this);" name="open-outline"></ion-icon>
                <p>Level ${i+1}</p>
                <div class="inline levelInputs">
                    <input class="titleLevel" type="text" placeholder="Question text">
                    <input class="minValue" type="text" placeholder="Minimum percentage of hits">
                    <input class="urlImageLevel" type="text" placeholder="Image URL">
                    <input class="levelDescription" type="text" placeholder="Level description">
                </div>
            </div>`;
    }
    creationLevelsPage.innerHTML += `
        <button onclick="createLevels()">Finish Quizz</button>`
}

function toggleExpand(elm) {
    elm.parentNode.lastElementChild.classList.toggle("hidden");
    elm.parentNode.lastElementChild.classList.toggle("inline");
}

function isUrl(url) {
    const rule =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
    return rule.test(url);
}

function isColor(color) {
    const rule =
    /^#[0-9A-F]{6}$/i
    return rule.test(color.value);
}

function createLevels() {

    if (checkInputsLevels() === "invalid") {
        return;
    }
   
    const titleLevel = document.querySelectorAll(".titleLevel");
    const minValue = document.querySelectorAll(".minValue");
    const urlImageLevel = document.querySelectorAll(".urlImageLevel");
    const levelDescription = document.querySelectorAll(".levelDescription");
    let arrayLevels = [];
    
    for (let i=0; i<qttLevelsCreated; i++) {
        arrayLevels.push ({
            title: titleLevel[i].value,
            image: urlImageLevel[i].value,
            text: levelDescription[i].value,
            minValue: minValue[i].value
        });
    }

    objectQuizz["levels"] = arrayLevels;

    postQuizz(objectQuizz);
}

function checkInputsLevels() {
    let inputs = "valid";
    const titleLevel = document.querySelectorAll(".titleLevel");
    const minValue = document.querySelectorAll(".minValue");
    const urlImageLevel = document.querySelectorAll(".urlImageLevel");
    const levelDescription = document.querySelectorAll(".levelDescription");
    let contMinValue = 0;

    titleLevel.forEach (elm => {
        if(elm.value.length < 10 || typeof(elm.value) !== "string"){
            alert("Level title must cointain at least 10 characters");
            inputs = "invalid";
        }
    });
    if (inputs === "invalid") {
        return inputs;
    }
    minValue.forEach (elm => {
        if(!(elm.value >= 0 && elm.value <= 100)){
            alert("Enter a percentage between 0 and 100");
            inputs = "invalid";
        }
        if (elm.value == 0) {
            contMinValue++;
        }
    });
    if (contMinValue !== 1) {
        alert("One minimum percentage must be 0");
        inputs = "invalid";
    }
    if (inputs === "invalid") {
        return inputs;
    }
    urlImageLevel.forEach(elm => {
        if (!isUrl(elm.value)){
            alert("Enter a valid URL in all levels");
            inputs = "invalid";
        }
    });
    if (inputs === "invalid") {
        return inputs;
    }
    levelDescription.forEach (elm => {
        if(elm.value.length < 30 || typeof(elm.value) !== "string"){
            alert("Level description must cointain at least 30 characters");
            inputs = "invalid";
        }
    })
    return inputs;
}

function postQuizz(readyQuizz) {
    const promise = axios.post(`${urlAPI}quizzes`, readyQuizz);
    promise
        .catch(alert("Error sending quiz"))
        .then(renderFinishCreation);
}

function renderFinishCreation(response) {
    saveOnLocalStorage(response.data.id);
    main.innerHTML = `
        <div class="finishCreationPage">
            <p class="creationQuestionsTitle">Your quizz is finished!</p>
            <div class="quizz" onclick="getOnlyQuizz(${response.data.id})">
                <img src="${response.data.image}" alt="">
                <h3>${response.data.title}</h3>
                <div class="gradient"></div> 
            </div>
            <button class="access" onclick="getOnlyQuizz(${response.data.id})">Access quiz</button>
            <button class="toHome" onclick="window.location.reload()">Back to homepage</button>
        </div>`;
}

function saveOnLocalStorage(id){
    let oldQuizzesString = localStorage.getItem("ids");
    if (oldQuizzes) {
        let oldQuizzes = JSON.parse(oldQuizzesString);
        let newQuizzes = oldQuizzes.push(id);
        let newQuizzesString = JSON.stringify(newQuizzes);
        localStorage.setItem(newQuizzesString);
    }
    else {
        let newQuizzes = [id];
        let newQuizzesString = JSON.stringify(newQuizzes);
        localStorage.setItem(newQuizzesString);
    }
}

document.addEventListener("keyup", function (event) {
    if (event.key === "Enter" && document.querySelector(".createInputs")) {
        createQuizz();
        return;
    }
    if (event.key === "Enter" && document.querySelector(".creationQuestions")) {
        createQuestions();
        return;
    }
    if (event.key === "Enter" && document.querySelector(".creationLevels")) {
        createLevels();
        return;
    }
});
