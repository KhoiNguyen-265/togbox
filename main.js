const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let currentModal = null;

$$("[data-modal]").forEach((btn) => {
    btn.onclick = function () {
        const modal = $(`#${btn.dataset.modal}`);

        if (!modal) {
            console.error(`${this.dataset.modal} does not exits!`);
            return;
        }
        modal.classList.add("show");
        currentModal = modal;
    };
});

$$(".modal-close").forEach((btn) => {
    btn.onclick = function () {
        const modal = btn.closest(".modal-backdrop");

        if (modal) {
            modal.classList.remove("show");
            currentModal = null;
        }
    };
});

$$(".modal-backdrop").forEach((modal) => {
    modal.onclick = function (e) {
        if (e.target === modal) {
            modal.classList.remove("show");
            currentModal = null;
        }
    };
});

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && currentModal) {
        currentModal.classList.remove("show");
        currentModal = null;
    }
});
