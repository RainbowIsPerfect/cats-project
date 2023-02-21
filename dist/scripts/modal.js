import { fetch } from "./index.js";
export class Modal {
    element;
    content;
    default;
    options;
    animations;
    constructor(element, content, options) {
        this.element = element;
        this.content = content;
        this.default = {
            background: {
                backdropBlur: 1,
                backgroundOpacity: 0.8,
            },
            animation: {
                animationType: "fadeInUp",
                animationDuration: 0.3,
            },
        };
        this.animations = ["none", "fadeIn", "zoomIn", "fadeInDown", "fadeInUp", "bounce"];
        this.options = { ...this.default, ...options };
        this.setOptions();
    }
    setOptions() {
        let properties = "";
        if (this.options.background.backdropBlur)
            properties += `backdrop-filter: blur(${this.options.background.backdropBlur}px);`;
        if (this.options.background.backdropBlur)
            properties += `background-color: rgba(0, 0, 0, ${this.options.background.backgroundOpacity})`;
        this.element.setAttribute('style', properties);
        if (this.animations.includes(this.options.animation.animationType) && this.options.animation.animationType !== "none") {
            this.content.classList.add(this.options.animation.animationType);
            this.content.setAttribute("style", `--time:${this.options.animation.animationDuration}s`);
        }
    }
    render(method, cat) {
        document.body.querySelector('.modal__content').insertAdjacentHTML('beforeend', `<h2 class="modal__heading">${cat === undefined ? "Add new cat" : "Cat info"}</h2>
        <form class="modal__form form" action="${method}">
            <div class="form__option">
                <label class="form__label" for="">Name</label>
                <input class="form__input" type="text" placeholder="Name" value="${cat === undefined ? "" : cat.name}" name="name">
            </div>
            <div class="form__option">
                <label class="form__label" for="">Image</label>
                <input class="form__input" type="text" placeholder="Link" value="${cat === undefined ? "" : cat.image}" name="image">
            </div>
            <div class="form__option">
                <label class="form__label" for="">Age</label>
                <input class="form__input" type="number" min="0" placeholder="10" value="${cat === undefined ? "" : cat.age}" name="age">
            </div>
            <div class="form__option">
                <label class="form__label" for="">Rate</label>
                <input class="form__input" type="number" min="0" max="10" placeholder="10" value="${cat === undefined ? "" : cat.rate}" name="rate">
            </div>
            <div class="form__option form__option--row">
                <label class="form__label" for="">Favorite</label>
                <input class="form__input" type="checkbox" 
                ${cat === undefined ? "" : cat.favorite ? "checked" : ""} name="favorite">
            </div>
            <div class="form__option">
                <textarea class="form__textarea" placeholder="Tell us about your cat" rows="4" name="description">${cat === undefined ? "" : cat.description}</textarea>
            </div>
            <div class="form__button-container">
                <button class="form__button" type="submit">${cat === undefined ? "Add" : "Change"}</button>
                <button class="form__button" type="reset">Reset</button>
            </div>
        </form>`);
        if (cat === undefined) {
            this.events(true);
        }
        else {
            this.events(false, cat.id);
        }
        this.open();
    }
    async handleForm(method, id) {
        const data = await fetch.showCurrent(id);
        this.render(method, data);
    }
    open() {
        document.body.classList.add('modal-enabled');
        this.element.classList.add('modal--active');
        this.element.children[0].children[0].classList.add('modal__content--active');
    }
    close(event, isForced) {
        if ((event.target instanceof HTMLDivElement && !event.target.closest('.modal__content')) || isForced) {
            Array.from(this.element.children[0].children[0].children).forEach(el => el.remove());
            document.body.classList.remove('modal-enabled');
            this.element.classList.remove('modal--active');
            this.element.children[0].children[0].classList.remove('modal__content--active');
        }
    }
    events(ifAdd, id) {
        const form = this.element.querySelector('form');
        this.element.addEventListener('click', (event) => this.close(event));
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const newCat = {
                id: Date.now(),
                name: '',
                image: '',
                age: 0,
                rate: 0,
                favorite: false,
            };
            Array.from(form.elements).filter(el => !(el instanceof HTMLButtonElement)).forEach(element => {
                if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
                    if (element instanceof HTMLInputElement && element.type === "checkbox") {
                        newCat[element.name] = element.checked;
                    }
                    else {
                        newCat[element.name] = element.value;
                    }
                }
            });
            ifAdd ? fetch.add(newCat) : fetch.change(newCat, id);
            this.close(event, true);
        });
    }
}
