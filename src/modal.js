export function openModal(title, content) {
    let modalOverlay = document.createElement("div");
    modalOverlay.classList.add("modal-overlay");

    let modalWindow = document.createElement("div")
    modalWindow.classList.add("modal");
    modalOverlay.append(modalWindow);

    let inner = `<h2 class="modal__title">${title}</h2>
    <div class="modal__content">${content}</div>`;
    modalWindow.innerHTML = inner;

    document.body.append(modalOverlay);
}

export function createAuthContent() {
    let content = `
    <div class="input-box modal__input-box">
    <input class="input-box__input modal__input" placeholder=" " name="login" type="text" autocomplete="off">
    <label for="login" class="input-box__label">
    <span class="input-box__label-text">Login</span>
    </label>
    </div>
    <div class="input-box modal__input-box">
    <input class="input-box__input modal__input" placeholder=" " name="password" type="password" autocomplete="off">
    <label for="password" class="input-box__label">
    <span class="input-box__label-text">Password</span>
    </label>
    </div>
    <div class="modal__button-box">
    <button class="modal__button modal__button--cancel">Cancel</button>
    <button type="submit" class="modal__button">Log in</button>
    </div>
    `
    return content;
}