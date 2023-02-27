import { fetch, addModal, editModal, cards } from "./index.js";
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
}
export class AddForm extends Form {
    localStorageKey;
    constructor($form, localStorageKey) {
        super($form);
        this.initEvents();
        this.localStorageKey = localStorageKey;
    }
    fillFormWithLocalStorageData(key) {
        const localStorageData = JSON.parse(localStorage.getItem(key));
        this.fillFormFields(localStorageData);
    }
    initEvents() {
        this.$form.addEventListener('submit', (event) => {
            event.preventDefault();
            localStorage.removeItem(this.localStorageKey);
            const currentCat = this.createCatObject();
            fetch.addNewCat(currentCat);
            cards.createNewCard(currentCat);
            addModal.close();
            this.$form.reset();
        });
        this.$form.addEventListener('input', () => {
            localStorage.setItem(this.localStorageKey, JSON.stringify(this.createCatObject()));
        });
    }
}
export class EditForm extends Form {
    id;
    constructor($form) {
        super($form);
        this.id;
        this.initEvents();
    }
    async fillForm(id) {
        const cat = await fetch.getCatByID(id);
        this.fillFormFields(cat);
        this.id = id;
    }
    initEvents() {
        this.$form.addEventListener('submit', (event) => {
            event.preventDefault();
            const newCat = super.createCatObject(this.id);
            fetch.change(this.id, newCat);
            cards.updateCardByID(this.id, newCat);
            editModal.close();
        });
    }
}
