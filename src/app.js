import "./style.scss";
import {Question} from "./question";
import { openModal, createAuthContent } from "./modal";

let form = document.querySelector(".question-form");
let formInput = form.querySelector(".input-box__input");
let formButton = form.querySelector(".question-form__button");
let modalButton = document.querySelector(".modal-button");

form.addEventListener("submit", submitFormHandler);
formInput.addEventListener("input", changeFormInputHandler);

window.addEventListener("load", Question.renderList);

modalButton.addEventListener("click", () => {
    openModal("Authorization", createAuthContent());
});

function changeFormInputHandler() {
    (formInput.value.length >= 10) ? formButton.disabled = false : formButton.disabled = true;
}

function submitFormHandler(event) {
    event.preventDefault();
    let question = {
        text: formInput.value.trim(),
        date: new Date().toJSON()
    }

    formButton.disabled = true;

    Question.create(question).then(data => {
        formInput.value = "";
    })
}