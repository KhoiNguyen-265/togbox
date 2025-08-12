const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

/* <div id="modal-1" class="modal-backdrop">
    <div class="modal-container">
        <button class="modal-close">&times;</button>
        <div class="modal-content">
            <h1>Modal 1</h1>
        </div>
    </div>
</div> */

function Modal() {
    this.open = (content) => {
        // Create modal elements
        const backdrop = document.createElement("div");
        backdrop.classList = "modal-backdrop";

        const container = document.createElement("div");
        container.classList = "modal-container";

        const closeBtn = document.createElement("button");
        closeBtn.classList = "modal-close";
        closeBtn.innerHTML = `&times;`;

        const modalContent = document.createElement("div");
        modalContent.classList = "modal-content";
        modalContent.innerHTML = content;

        // Add elements for DOM
        container.append(closeBtn, modalContent);
        backdrop.append(container);
        document.body.append(backdrop);

        setTimeout(() => {
            backdrop.classList.add("show");
        }, 0);

        // Attach event listeners
        closeBtn.onclick = () => {
            backdrop.classList.remove("show");
        };

        backdrop.onclick = (e) => {
            if (e.target === backdrop) {
                backdrop.classList.remove("show");
            }
        };

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                backdrop.classList.remove("show");
            }
        });
    };
}

const modal = new Modal();

$("#open-modal-1").onclick = function () {
    modal.open("<h1>Hello anh em 1 </h1>");
};
$("#open-modal-2").onclick = function () {
    modal.open("<h1>Hello anh em 2</h1>");
};
$("#open-modal-3").onclick = function () {
    modal.open("<h1>Hello anh em 3 </h1>");
};
