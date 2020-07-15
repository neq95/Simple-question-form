export class Question {
    static create(question) {
        return fetch("https://simple-question-form.firebaseio.com/questions.json", {
            method: "POST",
            body: JSON.stringify(question),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            question.id = data.name;
            return question;
        }).then(addToLocalStorage)
        .then(Question.renderList)
    }

    static renderList() {
        let questions = getQuestionsFromLocalStorage();

        let html = questions.length > 0 ? questions.map(toCard).join("") : "<div> Вы пока ничего не спрашивали </div>";

        let list = document.querySelector(".questions-list")
        list.innerHTML = html;
    }

    static getQuestionsFromServer(token) {
        if(!token) {
            return new Promise((resolve, reject) => {
                reject(new Error("You don't have any token"));
            })
        }
        return fetch(`https://simple-question-form.firebaseio.com/questions.json?auth=${token}`)
            .then(response => response.json())
            .then(data => {
                return data ? Object.keys(data).map(key => {
                    return {
                        ...data[key],
                        id: key
                    }
                }) : [];
            });
    }
}

function addToLocalStorage(question) {
    let localStorageQuestions = getQuestionsFromLocalStorage();
    localStorageQuestions.push(question);
    localStorage.setItem("questions", JSON.stringify(localStorageQuestions));
}

function getQuestionsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("questions")) || [];
}

function toCard(question) {
    return `<div class="question-list__question question"><div class="question__date">${new Date(question.date).toLocaleDateString()} ${new Date(question.date).toLocaleTimeString()}</div> <p class="question__text">${question.text}</p></div>`;
}