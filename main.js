const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

Togbox.elements = [];

function Togbox(options = {}) {
    this.opt = Object.assign(
        {
            closeMethods: ["button", "overlay", "escape"],
            footer: false,
            destroyOnClose: true,
            cssClass: [],
        },
        options
    );

    this.template = $(`#${this.opt.templateId}`);

    const { closeMethods } = this.opt;
    this._allowButtonClose = closeMethods.includes("button");
    this._allowBackdropClose = closeMethods.includes("overlay");
    this._allowEscapeClose = closeMethods.includes("escape");

    this._footerButtons = [];

    if (!this.template) {
        console.error(`#${this.opt.templateId} does not exist!`);
        return;
    }

    this._handleEscapeKey = this._handleEscapeKey.bind(this);
}

Togbox.prototype._getScrollbarWidth = function () {
    if (this._scrollbarWidth) {
        return this._scrollbarWidth;
    }

    const div = document.createElement("div");
    Object.assign(div.style, {
        position: "absolute",
        top: "-9999px",
        overflow: "scroll",
    });
    document.body.appendChild(div);
    this._scrollbarWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);

    return this._scrollbarWidth;
};

Togbox.prototype._build = function () {
    const content = this.template.content.cloneNode(true);

    // Create modal elements
    this._backdrop = document.createElement("div");
    this._backdrop.className = "togbox__backdrop";

    const container = document.createElement("div");
    container.className = "togbox__container";

    this.opt.cssClass.forEach((className) => {
        if (typeof className === "string") {
            container.classList.add(className);
        }
    });

    if (this._allowButtonClose) {
        const closeBtn = this._createButton("&times;", "togbox__close", () =>
            this.close()
        );

        container.append(closeBtn);
    }

    const modalContent = document.createElement("div");
    modalContent.className = "togbox__content";

    // Append content and elements
    modalContent.append(content);
    container.append(modalContent);

    if (this.opt.footer) {
        this._modalFooter = document.createElement("div");
        this._modalFooter.className = "togbox__footer";

        this._renderFooterContent();

        this._renderFooterButtons();

        container.appendChild(this._modalFooter);
    }

    this._backdrop.append(container);
    document.body.append(this._backdrop);
};

Togbox.prototype.setFooterContent = function (html) {
    this._footerContent = html;
    this._renderFooterContent();
};

Togbox.prototype.addFooterButton = function (title, className, callback) {
    const button = this._createButton(title, className, callback);

    this._footerButtons.push(button);
    this._renderFooterButtons();
};

Togbox.prototype._renderFooterContent = function () {
    if (this._modalFooter && this._footerContent) {
        this._modalFooter.innerHTML = this._footerContent;
    }
};

Togbox.prototype._renderFooterButtons = function () {
    if (this._modalFooter) {
        this._footerButtons.forEach((btn) => {
            this._modalFooter.append(btn);
        });
    }
};

Togbox.prototype._createButton = function (title, className, callback) {
    const button = document.createElement("button");
    button.className = className;
    button.innerHTML = title;
    button.onclick = callback;

    return button;
};

Togbox.prototype.open = function () {
    Togbox.elements.push(this);

    if (!this._backdrop) {
        this._build();
    }

    setTimeout(() => {
        this._backdrop.classList.add("togbox__backdrop--show");
    }, 0);

    // Disable scrolling
    document.body.classList.add("togbox--no-scroll");
    document.body.style.paddingRight = this._getScrollbarWidth() + "px";

    // Attach event listeners
    if (this._allowBackdropClose) {
        this._backdrop.onclick = (e) => {
            if (e.target === this._backdrop) {
                this.close();
            }
        };
    }

    if (this._allowEscapeClose) {
        document.addEventListener("keydown", this._handleEscapeKey);
    }

    this._onTransitionEnd(this.opt.onOpen);

    return this._backdrop;
};

Togbox.prototype._handleEscapeKey = function (e) {
    const lastModal = Togbox.elements[Togbox.elements.length - 1];

    if (e.key === "Escape" && this === lastModal) {
        this.close();
    }
};

Togbox.prototype._onTransitionEnd = function (callback) {
    this._backdrop.ontransitionend = (e) => {
        if (e.propertyName !== "transform") return;
        callback();
    };
};

Togbox.prototype.close = function (destroy = this.opt.destroyOnClose) {
    Togbox.elements.pop();

    this._backdrop.classList.remove("togbox__backdrop--show");

    if (this._allowEscapeClose) {
        document.removeEventListener("keydown", this._handleEscapeKey);
    }

    this._onTransitionEnd(() => {
        if (destroy) {
            this._backdrop.remove();
            this._backdrop = null;
            this._modalFooter = null;
        }

        // Enable scrolling
        if (!Togbox.elements.length) {
            document.body.classList.remove("togbox--no-scroll");
            document.body.style.paddingRight = "";
        }

        if (typeof this.opt.onClose === "function") {
            this.opt.onClose();
        }
    });
};

Togbox.prototype.destroy = function () {
    this.close(true);
};

const modal1 = new Togbox({
    templateId: "modal-1",
    // closeMethods: ["button", "overlay", "escape"],
    destroyOnClose: false,
    onOpen: () => {
        console.log("Modal 1 opened");
    },
    onClose: () => {
        console.log("Modal 1 closed");
    },
});

$("#open-modal-1").onclick = () => {
    const modalElement = modal1.open();
};

const modal2 = new Togbox({
    templateId: "modal-2",
    closeMethods: ["button", "escape"],
    cssClass: ["class1", "class2", "classN"],
    onOpen: () => {
        console.log("Modal 2 opened");
    },
    onClose: () => {
        console.log("Modal 2 closed");
    },
});
$("#open-modal-2").onclick = () => {
    const modalElement = modal2.open();

    const form = modalElement.querySelector("#login-form");
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            const formData = {
                email: $("#email").value.trim(),
                password: $("#password").value.trim(),
            };

            console.log(formData);
        };
    }
};

const modal3 = new Togbox({
    templateId: "modal-3",
    footer: true,
    closeMethods: [],
    onOpen: () => {
        console.log("Modal 3 opened");
    },
    onClose: () => {
        console.log("Modal 3 closed");
    },
});

$("#open-modal-3").onclick = () => {
    const modalElement = modal3.open();
};

// modal3.setFooterContent("<h2>Footer Content </h2>");
modal3.addFooterButton(
    "Danger",
    "togbox__btn togbox__btn--danger togbox__btn--pull-left",
    (e) => {
        modal3.close();
        console.log("Danger clicked");
    }
);

modal3.addFooterButton("Cancel", "togbox__btn", (e) => {
    modal3.close();
    console.log("Cancel clicked");
});

modal3.addFooterButton("Agree", "togbox__btn togbox__btn--primary", (e) => {
    modal3.close();
    console.log("Agree clicked");
});
