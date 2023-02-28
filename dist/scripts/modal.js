import { bodyHiddenClass, modalActiveClass, modalContentActiveClass } from "./variables.js";
export class Modal {
    element;
    contentData;
    content;
    default;
    options;
    animations;
    closeButtonData;
    constructor(element, options) {
        this.element = element;
        this.contentData = "[data-content]";
        this.closeButtonData = "close";
        this.content = this.element.querySelector(this.contentData);
        this.default = {
            backdropBlur: 1,
            backgroundOpacity: 0.8,
            animationType: "fadeInUp",
            animationDuration: 0.3,
        };
        this.animations = ["none", "fadeIn", "zoomIn", "fadeInDown", "fadeInUp", "bounce"];
        this.options = { ...this.default, ...options };
        this.setOverlayOptions();
        this.setContentOptions();
        this.initDefaultEvents();
    }
    open() {
        this.classesHandler("add");
    }
    close() {
        this.classesHandler("remove");
    }
    classesHandler(action) {
        document.body.classList[action](bodyHiddenClass);
        this.element.classList[action](modalActiveClass);
        this.content.classList[action](modalContentActiveClass);
    }
    setContentOptions() {
        if (this.animations.includes(this.options.animationType) && this.options.animationType !== "none") {
            this.content.classList.add(this.options.animationType);
            this.content.setAttribute("style", `--time:${this.options.animationDuration}s;`);
        }
    }
    setOverlayOptions() {
        let properties = "";
        if (this.options.backdropBlur) {
            properties += `--blur:${this.options.backdropBlur}px;`;
        }
        if (this.options.backgroundOpacity) {
            properties += `--opacity:${this.options.backgroundOpacity};`;
        }
        this.element.setAttribute('style', properties);
    }
    initDefaultEvents() {
        this.element.addEventListener('mousedown', (event) => {
            if (!event.target.closest(this.contentData) || event.target.dataset[this.closeButtonData] !== undefined) {
                this.close();
            }
        });
    }
    addEvent(eventType, callBack) {
        this.element.addEventListener(eventType, callBack);
        return this;
    }
}
export class DescriptionModal extends Modal {
    fieldData;
    constructor(element, fieldDataValue, options) {
        super(element, options);
        this.fieldData = fieldDataValue;
    }
    fill(cat) {
        const outputs = this.content.querySelectorAll(this.fieldData);
        outputs.forEach(output => {
            if (output instanceof HTMLImageElement) {
                output.src = cat.image;
                output.alt = `Cat named ${cat.name}`;
            }
            else {
                output.innerHTML = cat[output.dataset.info] !== "" ? cat[output.dataset.info] : "Information is not provided";
            }
        });
    }
}
