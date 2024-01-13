let title, image, qttQuestionsCreated, qttLevelsCreated, objectQuizz = {}, isEdition = false, quizzEditing;

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

function renderCreationPage() {
    main.innerHTML = `
        <div class="creationPage">
            <p>Start at the beginning</p>
            <div class="createInputs">
                <input class="createTitle" placeholder="Title" type="text">
                <p class="invalidText hidden">Between 20 and 65 characters</p>
                <input class="createImage" placeholder="Your quizz's image URL" type="text">
                <p class="invalidText hidden">Enter a valid URL</p>
                <input class="createQttQuestions" placeholder="Number of questions" type="text">
                <p class="invalidText hidden">At least 3 questions</p>
                <input class="createQttLevels" placeholder="Number of levels" type="text">
                <p class="invalidText hidden">At least 2 levels</p>
            </div>
            <button class="createQuizz" onclick="createQuizz()">Continue to create questions</button>
        </div>`
    if(isEdition) {
        const createTitle = document.querySelector(".createTitle");
        const createImage = document.querySelector(".createImage");
        const createQttQuestions = document.querySelector(".createQttQuestions");
        const createQttLevels = document.querySelector(".createQttLevels");
        createTitle.value = quizzEditing.title;
        createImage.value = quizzEditing.image;
        createQttQuestions.value = quizzEditing.questions.length;
        createQttLevels.value = quizzEditing.levels.length;
    }
}

function createQuizz() {
    if (checkInputsInitial() === "invalid") {
        return;
    }

    const createTitle = document.querySelector(".createTitle");
    const createImage = document.querySelector(".createImage");
    const createQttQuestions = document.querySelector(".createQttQuestions");
    const createQttLevels = document.querySelector(".createQttLevels");

    
    title = createTitle.value, image = createImage.value, qttQuestionsCreated = createQttQuestions.value,
    qttLevelsCreated = createQttLevels.value;
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
                    <p class="invalidText hidden">At least 20 characters</p>
                    <input class="backgroundQuestion" type="text" placeholder="Question's background color">
                    <p class="invalidText hidden">Enter a valid hexadecimal color</p>
                    <p>Correct answer</p>
                    <div class="correctAnswer">
                        <input class="correctText" type="text" placeholder="Correct answer">
                        <p class="invalidText hidden">Enter a correct answer</p>
                        <input class="correctImage" type="text" placeholder="Image URL">
                        <p class="invalidText hidden">Enter a valid URL</p>
                    </div>
                    <p>Incorrect answers</p>
                    <div class="incorrectAnswer">
                        <input class="incorrectText1" type="text" placeholder="Incorrect answer 1">
                        <p class="invalidText hidden">Enter at least one incorrect answer</p>
                        <input class="incorrectImage1" type="text" placeholder="Image URL 1">
                        <p class="invalidText hidden">Enter a valid URL</p>
                    </div>
                    <div class="incorrectAnswer">
                        <input class="incorrectText2" type="text" placeholder="Incorrect answer 2">
                        <p class="invalidText hidden">Enter valid incorrect answers</p>
                        <input class="incorrectImage2" type="text" placeholder="Image URL 2">
                        <p class="invalidText hidden">Enter valid incorrect answers</p>
                    </div>
                    <div class="incorrectAnswer">
                        <input class="incorrectText3" type="text" placeholder="Incorrect answer 3">
                        <p class="invalidText hidden">Enter valid incorrect answers</p>
                        <input class="incorrectImage3" type="text" placeholder="Image URL 3">
                        <p class="invalidText hidden">Enter valid incorrect answers</p>
                    </div>
                </div>
            </div>`;
    }
    creationQuestionsPage.innerHTML += `
        <button onclick="createQuestions()">Continue to create levels</button>`
    if(isEdition) {
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
        for (let j=0; j<creationQuestions.length; j++) {
            if (quizzEditing.questions[j]) {
                titleQuestions[j].value = quizzEditing.questions[j].title;
                colorQuestions[j].value = quizzEditing.questions[j].color;
                correctTexts[j].value = quizzEditing.questions[j].answers[0].text;
                correctImages[j].value = quizzEditing.questions[j].answers[0].image;
                incorrectText1[j].value = quizzEditing.questions[j].answers[1].text;
                incorrectImage1[j].value = quizzEditing.questions[j].answers[1].image;
                if (quizzEditing.questions[j].answers[2]) {
                    incorrectText2[j].value = quizzEditing.questions[j].answers[2].text;
                    incorrectImage2[j].value = quizzEditing.questions[j].answers[2].image;
                }
                if (quizzEditing.questions[j].answers[3]) {
                    incorrectText3[j].value = quizzEditing.questions[j].answers[3].text;
                    incorrectImage3[j].value = quizzEditing.questions[j].answers[3].image;
                }
            }
        }
    }
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

    resetCheck();

    titleQuestions.forEach(elm => {
            if (elm.value.length < 20 || typeof(elm.value) !== "string"){
                inputInvalid(elm);
                inputs = "invalid";
            }});
    colorQuestions.forEach(elm => {
            if (!isColor(elm)) {
                inputInvalid(elm);
                inputs = "invalid";
            }});
    correctTexts.forEach(elm => { 
            if (elm.value === "") {
                inputInvalid(elm);
                inputs = "invalid";
            }});
    correctImages.forEach(elm => {
            if (!isUrl(elm.value)){
                inputInvalid(elm);
                inputs = "invalid";
            }});
    incorrectText1.forEach(elm => { 
            if (elm.value === "") {
                inputInvalid(elm);
                inputs = "invalid";
            }});
    incorrectImage1.forEach(elm => {
            if (!isUrl(elm.value)){
                inputInvalid(elm);
                inputs = "invalid";
            }});
    incorrectText2.forEach(elm => {
            if ((elm.value === "" && elm.nextElementSibling.nextElementSibling.value !== "") || 
                (elm.value !== "" && !isUrl(elm.nextElementSibling.nextElementSibling.value))){
                inputInvalid(elm);
                inputInvalid(elm.nextElementSibling.nextElementSibling);
                inputs = "invalid";
            }});
    incorrectText3.forEach(elm => {
            if ((elm.value === "" && elm.nextElementSibling.nextElementSibling.value !== "") || 
                (elm.value !== "" && !isUrl(elm.nextElementSibling.nextElementSibling.value))){
                inputInvalid(elm);
                inputInvalid(elm.nextElementSibling.nextElementSibling);
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
                    <input class="titleLevel" type="text" placeholder="Level text">
                    <p class="invalidText hidden">At least 10 characters</p>
                    <input class="minValue" type="text" placeholder="Minimum percentage of hits">
                    <p class="invalidText hidden">One '0' and others 1 to 100</p>
                    <input class="urlImageLevel" type="text" placeholder="Image URL">
                    <p class="invalidText hidden">Enter a valid URL</p>
                    <input class="levelDescription" type="text" placeholder="Level description">
                    <p class="invalidText hidden">At least 30 characters</p>
                </div>
            </div>`;
    }
    creationLevelsPage.innerHTML += `
        <button onclick="createLevels()">Finish Quizz</button>`
    if(isEdition) {
        const titleLevel = document.querySelectorAll(".titleLevel");
        const minValue = document.querySelectorAll(".minValue");
        const urlImageLevel = document.querySelectorAll(".urlImageLevel");
        const levelDescription = document.querySelectorAll(".levelDescription");
        for (let j=0; j<qttLevelsCreated; j++) {
            if (quizzEditing.levels[j]) {
                titleLevel[j].value = quizzEditing.levels[j].title;
                minValue[j].value = quizzEditing.levels[j].minValue;
                urlImageLevel[j].value = quizzEditing.levels[j].image;
                levelDescription[j].value = quizzEditing.levels[j].text;
            }
        }
    }
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

    resetCheck();

    titleLevel.forEach (elm => {
        if(elm.value.length < 10 || typeof(elm.value) !== "string"){
            inputInvalid(elm);
            inputs = "invalid";
        }
    });
    minValue.forEach (elm => {
        if(!(elm.value >= 0 && elm.value <= 100)){
            inputInvalid(elm);
            inputs = "invalid";
        }
        if (elm.value == 0) {
            contMinValue++;
        }
    });
    if (contMinValue !== 1) {
        minValue.forEach (elm => inputInvalid(elm));
        inputs = "invalid";
    }
    urlImageLevel.forEach(elm => {
        if (!isUrl(elm.value)){
            inputInvalid(elm);
            inputs = "invalid";
        }
    });
    levelDescription.forEach (elm => {
        if(elm.value.length < 30 || typeof(elm.value) !== "string"){
            inputInvalid(elm);
            inputs = "invalid";
        }
    })
    return inputs;
}

function postQuizz(readyQuizz) {
    loading();
    if(!isEdition) {
    const promise = axios.post(`${urlAPI}quizzes`, readyQuizz);
    promise
        .catch(error)
        .then(renderFinishCreation);
    }
    else {
        let keyEdit;
        const userQuizzes = JSON.parse(localStorage.getItem("ids"));
        for (let i=0; i<userQuizzes.length; i++) {
            if (userQuizzes[i].id === quizzEditing.id) {
                keyEdit = userQuizzes[i].key;     
            }
        }
        const promise2 = axios.put(`${urlAPI}quizzes/${quizzEditing.id}`, readyQuizz, {
            headers: {
                "Secret-Key": keyEdit
            }
        });
        promise2
            .catch(error)
            .then(renderFinishCreation);
    }
}

function renderFinishCreation(response) {
    if (!isEdition) {
        saveOnLocalStorage(response.data.id, response.data.key);
    }
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

function saveOnLocalStorage(id, key){
    let oldQuizzesString = localStorage.getItem("ids");
    if (oldQuizzesString) {
        let oldQuizzes = JSON.parse(oldQuizzesString);
        oldQuizzes.push({"id": id, "key": key});
        let newQuizzesString = JSON.stringify(oldQuizzes);
        localStorage.setItem("ids", newQuizzesString);
    }
    else {
        let newQuizzes = [{"id": id, "key": key}];
        let newQuizzesString = JSON.stringify(newQuizzes);
        localStorage.setItem("ids", newQuizzesString);
    }
}

function error() {
    alert("error sending quizz"); 
}

async function editQuizz(idEdit) {
    try {
        const response = await axios.get(`${urlAPI}quizzes/${idEdit}`);
        renderEditPage(response.data);
    }
    catch {
        alert("error editing quizz");
    }       
}

function renderEditPage(quizz) {
    isEdition = true;
    quizzEditing = quizz;
    renderCreationPage();
}

function inputInvalid(input) {
    input.classList.add("inputInvalid");
    input.nextElementSibling.classList.remove("hidden");
    input.style.marginBottom = "0";
}

function resetCheck() {
    const allInvalidInputs = document.querySelectorAll(".inputInvalid");
    const allInvalidTexts = document.querySelectorAll(".invalidText");

    allInvalidInputs.forEach(elm => {
        elm.classList.remove("inputInvalid");
        elm.style.marginBottom = "15px";
    });
    allInvalidTexts.forEach(elm => {
        if(!elm.classList.contains("hidden"))
        elm.classList.add("hidden")});
}

function checkInputsInitial() {
    const createTitle = document.querySelector(".createTitle");
    const createImage = document.querySelector(".createImage");
    const createQttQuestions = document.querySelector(".createQttQuestions");
    const createQttLevels = document.querySelector(".createQttLevels");
    let inputs = "valid";

    resetCheck();

    if (createTitle.value.length < 20 || createTitle.value.length > 65) {
        inputInvalid(createTitle);
        inputs = "invalid";
    }
    if (!isUrl(createImage.value)){
        inputInvalid(createImage);
        inputs = "invalid";
    }
    if (createQttQuestions.value < 3 || isNaN(createQttQuestions.value)){
        inputInvalid(createQttQuestions);
        inputs = "invalid";
    }
    if (createQttLevels.value < 2 || isNaN(createQttLevels.value)){
        inputInvalid(createQttLevels);
        inputs = "invalid";
    }

    return inputs;
}