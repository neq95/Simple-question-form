export function openModal(title, content) {
    let modalOverlay = document.createElement("div");
    modalOverlay.classList.add("modal-overlay");

    let modalWindow = document.createElement("div")
    modalWindow.classList.add("modal");
    modalOverlay.append(modalWindow);

    let inner = `<h2 class="modal__title">${title}</h2>
    ${content}`;
    modalWindow.innerHTML = inner;

    document.body.append(modalOverlay);
}

export function renderModalAfterAuth(content) {
    console.log(content)
}