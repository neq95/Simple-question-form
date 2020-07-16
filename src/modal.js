export function createModal(title, content) {
    let modalOverlay = document.createElement("div");
    modalOverlay.classList.add("modal-overlay");

    let modalWindow = document.createElement("div");
    modalWindow.classList.add("modal");
    modalOverlay.append(modalWindow);

    let inner = `<h2 class="modal__title">${title}</h2>
    ${content}`;
    modalWindow.innerHTML = inner;

    document.body.append(modalOverlay);

    addModalEventHandlers(modalOverlay);
}

export function renderModalAfterAuth(content) {
    closeModal();
    createModal("List of questions", createListOfQuestions());

    function createListOfQuestions() {
        let questionList = document.createElement("div");
        questionList.classList.add("modal-questions");

        if(!content.length) {
            questionList.innerHTML = "You don't have any questions yet";
        } else {
            let questions = content.map(elem => 
                `<div class="modal-questions__question question">
                    <div class="question__date">${new Date(elem.date).toLocaleDateString()}, ${new Date(elem.date).toLocaleTimeString()}</div>
                    <p class="question__text">${elem.text}</p>
                </div>
                `).join(" ");
            
            questionList.insertAdjacentHTML("afterbegin",questions);
        }
        
        return questionList.outerHTML;
    }
}

function addModalEventHandlers(modalOverlay) {
    modalOverlay.addEventListener("click", e => {
        if(e.target === modalOverlay) {
            closeModal();
        }
    });

    document.addEventListener("keydown", escapeHandler);
}

function escapeHandler(e) {
    if(e.code == "Escape") {
        closeModal();
    }
}

export function closeModal() {
    let modal = document.querySelector(".modal-overlay");
    modal.remove();
    document.removeEventListener("keydown", escapeHandler);
}