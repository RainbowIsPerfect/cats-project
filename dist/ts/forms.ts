import { Cat } from "./types.js";
import { formInputsData } from "./variables.js";

class Form {
    $form: HTMLFormElement
    constructor($form: HTMLFormElement) {
        this.$form = $form;
    }

    createCatObject(id?: number): Cat  {
        const catObject: Cat = {
            id: id || Date.now(),
            name: this.$form.elements[formInputsData.name].value,
            image: this.$form.elements[formInputsData.image].value,
            age: Number(this.$form.elements[formInputsData.age].value),
            rate: Number(this.$form.elements[formInputsData.rate].value),
            favorite: this.$form.elements[formInputsData.favorite].checked,
            description: this.$form.elements[formInputsData.description].value 
        };
        
        return catObject;
    }

    fillFormFields(object: Cat): void {
        for (const key of Object.keys(object)) {
            if (this.$form.elements[key]) {
                const elementProperty = this.$form.elements[key].type === "checkbox" ? "checked" : "value";
                this.$form.elements[key][elementProperty] = object[key];
            }
        }
    }

    addEvent(eventType: string, callBack: (e? : Event) => void): this {
        this.$form.addEventListener(eventType, callBack);

        return this;
    }
}

export class AddForm extends Form {
    localStorageKey: string;
    constructor($form: HTMLFormElement, localStorageKey: string) {
        super($form);
        this.localStorageKey = localStorageKey;
    }

    fillFormWithLocalStorageData(key: string): void {
        const localStorageData = JSON.parse(localStorage.getItem(key));
        this.fillFormFields(localStorageData);
    }

}

export class EditForm extends Form {
    id: number;
    constructor($form: HTMLFormElement) {
        super($form);
        this.id;
    }

    fillForm(id: number, cat: Cat): void {
        this.fillFormFields(cat);
        this.id = id;
    }
}