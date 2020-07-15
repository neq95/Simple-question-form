import { Question } from "./question";
import { renderModalAfterAuth } from "./modal";

export function createAuthContent() {
    let content = `
    <form class="auth">
        <div class="input-box auth__input-box">
            <input class="input-box__input auth__input" placeholder=" " name="login" type="text" autocomplete="off" required>
            <label for="login" class="input-box__label">
                <span class="input-box__label-text">Login</span>
            </label>
        </div>
        <div class="input-box auth__input-box">
            <input class="input-box__input auth__input" placeholder=" " name="password" type="password" autocomplete="off" required>
            <label for="password" class="input-box__label">
                <span class="input-box__label-text">Password</span>
            </label>
        </div>
        <div class="auth__button-box">
            <button class="auth__button auth__button--cancel">Cancel</button>
            <button type="submit" class="auth__button">Log in</button>
        </div>
    </form>
    `
    return content;
}

export async function authFormHandler(event) {
    event.preventDefault();
     
    let login = event.target.querySelector(".auth__input[name='login']").value;
    let password = event.target.querySelector(".auth__input[name='password']").value;
    let submitButton = event.target.querySelector(".auth__button[type='submit']")

    try {
        let id = await authWithEmailAndPassword(login, password);
        submitButton.disabled = true;

        let content = await Question.getQuestionsFromServer(id);
        renderModalAfterAuth(content);
    } catch(e) {
        renderModalAfterAuth(e.message);
    }
    
    submitButton.disabled = false;
}

function authWithEmailAndPassword(email, password) {
    let apiKey = "AIzaSyDNAn8zzSSqD_W6cgHfjV3uUfBag5HaMe0"
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: "POST",
        body: JSON.stringify({
            email, password, 
            returnSecureToken: true}),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => data.idToken);
}