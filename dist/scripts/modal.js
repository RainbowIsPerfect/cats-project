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
        console.log(this.options);
        this.setOptions();
        this.events();
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
    open() {
        document.body.classList.add('hidden');
        this.element.classList.add('modal--active');
        this.content.classList.add('modal__content--active');
    }
    close() {
        document.body.classList.remove('hidden');
        this.element.classList.remove('modal--active');
        this.content.classList.remove('modal__content--active');
    }
    events() {
        this.element.addEventListener('click', (event) => {
            if (event.target instanceof HTMLElement && !event.target.closest('.modal__content')) {
                this.close();
            }
        });
    }
}
export class DescriptionModal extends Modal {
    constructor(element, content, options) {
        super(element, content, options);
    }
    async fill(id) {
        const cat = await fetch.getCatByID(id);
        const outputs = this.content.querySelectorAll('[data-info]');
        outputs.forEach(output => {
            if (output instanceof HTMLSpanElement) {
                output.innerHTML = cat[output.dataset.info] ? cat[output.dataset.info] : "Information is not provided";
            }
            else {
                output.src = cat.image;
                output.alt = `Cat named ${cat.name}`;
            }
        });
    }
}
