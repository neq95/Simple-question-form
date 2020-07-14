export function openModal(title, content) {
    let modal = document.createElement("div");
    modal.classList.add("modal");

    let modalWindow = document.createElement("div")
    modalWindow.classList.add("modal__modal-window");

    modal.append(modalWindow);
    document.body.append(modal);
}