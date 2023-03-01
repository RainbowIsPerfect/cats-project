import { Cat, Options } from "./types.js";
import { BODY_HIDDEN_CLASS, MODAL_ACTIVE_CLASS, MODAL_CONTENT_ACTIVE_CLASS } from "./variables.js";

export class Modal {
    element: HTMLElement;
    contentData: string;
    content: HTMLElement;
    default: Options;
    options: Options;
    animations: string[];
    closeButtonData: string;
    constructor(element: HTMLElement, contentData: string, options?: Options) {
        this.element = element;
        this.contentData = contentData;
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

    open(): void {
        this.classesHandler("add");
    }

    close(): void {
        this.classesHandler("remove");
    }

    private classesHandler(action: "add" | "remove"): void {
        document.body.classList[action](BODY_HIDDEN_CLASS);
        this.element.classList[action](MODAL_ACTIVE_CLASS);
        this.content.classList[action](MODAL_CONTENT_ACTIVE_CLASS);
    }

    private setContentOptions(): void {
        if (this.animations.includes(this.options.animationType) && this.options.animationType !== "none") {
            this.content.classList.add(this.options.animationType);
            this.content.setAttribute("style", `--time:${this.options.animationDuration}s;`);
        }
    }

    private setOverlayOptions(): void {
        let properties = "";
        if (this.options.backdropBlur) {
            properties += `--blur:${this.options.backdropBlur}px;`;
        }
        if (this.options.backgroundOpacity) {
            properties += `--opacity:${this.options.backgroundOpacity};`;
        }
        this.element.setAttribute('style', properties);
    }

    private initDefaultEvents(): void {
        this.element.addEventListener('mousedown', (event): void => {
            if (event.target instanceof HTMLElement) {
                if (!event.target.closest(this.contentData) || event.target.dataset[this.closeButtonData] !== undefined) {
                    this.close();
                }
            }
        });
    }

    addEvent(eventType: string, callBack: (e?: Event) => void): this {
        this.element.addEventListener(eventType, callBack);
        
        return this;
    }
}

export class DescriptionModal extends Modal {
    fieldData: string;
    constructor(element: HTMLElement, contentData: string, fieldDataValue: string, options?: Options) {
        super(element, contentData, options);
        this.fieldData = fieldDataValue;
    }

    fill(cat: Cat): this {
        const fields = this.content.querySelectorAll(this.fieldData) as NodeListOf<HTMLElement>;
        fields.forEach(output => {
            if (output instanceof HTMLImageElement) {
                output.src = cat.image;
                output.alt = `Cat named ${cat.name}`;
            } else {
                output.innerHTML = cat[output.dataset.info] !== "" ? cat[output.dataset.info] : "Information is not provided";
            }
        });

        return this;
    }
}