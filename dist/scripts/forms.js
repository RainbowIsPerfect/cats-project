class Form {
    $form;
    constructor($form) {
        this.$form = $form;
    }
    createCatObject(id) {
        const catObject = {
            id: id || Date.now(),
            name: this.$form.elements['name'].value,
            image: this.$form.elements['image'].value,
            age: Number(this.$form.elements['age'].value),
            rate: Number(this.$form.elements['rate'].value),
            favorite: this.$form.elements['favorite'].checked,
            description: this.$form.elements['description'].value
        };
        return catObject;
    }
    fillFormFields(object) {
        for (const key of Object.keys(object)) {
            if (this.$form.elements[key]) {
                const elementProperty = this.$form.elements[key].type === "checkbox" ? "checked" : "value";
                this.$form.elements[key][elementProperty] = object[key];
            }
        }
    }
    addEvent(eventType, callBack) {
        this.$form.addEventListener(eventType, callBack);
        return this;
    }
}
export class AddForm extends Form {
    localStorageKey;
    constructor($form, localStorageKey) {
        super($form);
        this.localStorageKey = localStorageKey;
    }
    fillFormWithLocalStorageData(key) {
        const localStorageData = JSON.parse(localStorage.getItem(key));
        this.fillFormFields(localStorageData);
    }
}
export class EditForm extends Form {
    id;
    constructor($form) {
        super($form);
        this.id;
    }
    fillForm(id, cat) {
        this.fillFormFields(cat);
        this.id = id;
    }
}
