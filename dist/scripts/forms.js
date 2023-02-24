import { fetch, addModal, editModal, cards } from "./index.js";
class Form {
    $form;
    constructor($form) {
        this.$form = $form;
    }
    createCatObject(id) {
        return {
            id: id || Date.now(),
            name: this.$form.elements['name'].value,
            image: this.$form.elements['image'].value,
            age: Number(this.$form.elements['age'].value),
            rate: Number(this.$form.elements['rate'].value),
            favorite: this.$form.elements['favorite'].checked,
            description: this.$form.elements['description'].value
        };
    }
}
export class AddForm extends Form {
    constructor($form) {
        super($form);
        this.initEvents();
    }
    initEvents() {
        this.$form.addEventListener('submit', (event) => {
            event.preventDefault();
            const currentCat = super.createCatObject();
            fetch.addNewCat(currentCat);
            cards.createNewCard(currentCat);
            addModal.close();
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
        this.$form.elements['name'].value = cat.name;
        this.$form.elements['image'].value = cat.image;
        this.$form.elements['age'].value = cat.age;
        this.$form.elements['rate'].value = cat.rate;
        this.$form.elements['favorite'].checked = cat.favorite;
        this.$form.elements['description'].value = cat.description;
        this.id = id;
    }
    initEvents() {
        this.$form.addEventListener('submit', (event) => {
            event.preventDefault();
            const newCat = super.createCatObject(this.id);
            fetch.change(this.id, super.createCatObject(this.id));
            cards.updateCardByID(this.id, newCat);
            editModal.close();
        });
    }
}
