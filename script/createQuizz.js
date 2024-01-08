let title, image, qttQuestionsCreated, qttLevelsCreated;
let createdQuestions=[], createdBackgrounds=[], createdCorrectTexts=[], createdCorrectImages=[], createdIncorrectAnswers=[];

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

    for (let i=0; i<creationQuestions.length; i++) {
        let createdIncorrectGroup=[];
        createdQuestions.push(titleQuestions[i].value);
        createdBackgrounds.push(colorQuestions[i].value);
        createdCorrectTexts.push(correctTexts[i].value);
        createdCorrectImages.push(correctImages[i].value);
        createdIncorrectGroup.push({text: incorrectText1[i].value, image: incorrectImage1[i].value});
        if (incorrectText2[i].value !== "") {
            createdIncorrectGroup.push({text: incorrectText2[i].value, image: incorrectImage2[i].value});
        }
        if (incorrectText3[i].value !== "") {
            createdIncorrectGroup.push({text: incorrectText3[i].value, image: incorrectImage3[i].value});
        }
        createdIncorrectAnswers[i] = createdIncorrectGroup;        
    }

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
        colorQuestions.forEach(elm => {
            if (!isColor(elm)) {
                alert("Enter a valid hexadecimal color");
                inputs = "invalid";
            }});
        correctTexts.forEach(elm => { 
            if (elm.value === "") {
                alert("Enter a correct answer");
                inputs = "invalid";
            }});
        correctImages.forEach(elm => {
            if (!isUrl(elm.value)){
                alert("Enter a valid URL in all correct answers");
                inputs = "invalid";
            }});
        incorrectText1.forEach(elm => { 
            if (elm.value === "") {
                alert("Enter at least one incorrect answer in each question");
                inputs = "invalid";
            }});
        incorrectImage1.forEach(elm => {
            if (!isUrl(elm.value)){
                alert("Enter a valid URL in each incorrect answers");
                inputs = "invalid";
            }});
        incorrectText2.forEach(elm => {
            if ((elm.value === "" && elm.nextElementSibling.value !== "") || (elm.value !== "" && !isUrl(elm.nextElementSibling.value))){
                alert("Enter valid incorrect answers");
                inputs = "invalid";
            }});
        incorrectText3.forEach(elm => {
            if ((elm.value === "" && elm.nextElementSibling.value !== "") || (elm.value !== "" && !isUrl(elm.nextElementSibling.value))){
                alert("Enter valid incorrect answers");
                inputs = "invalid";
            }});    
    return inputs;
}

function renderCreateLevels() {

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