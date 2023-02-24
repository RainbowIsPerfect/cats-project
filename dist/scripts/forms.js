import { fetch, addModal, editModal, cards } from "./index.js";
class Form {
    $form;
    constructor($form) {
        this.$form = $form;
    }
    createObject(id) {
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
        this.events();
    }
    events() {
        this.$form.addEventListener('submit', (event) => {
            event.preventDefault();
            const currentCat = super.createObject();
            fetch.addNewCat(currentCat);
            cards.create(currentCat);
            addModal.close();
        });
    }
}
export class EditForm extends Form {
    id;
    constructor($form) {
        super($form);
        this.id;
        this.events();
    }
    async fill(id) {
        const cat = await fetch.getCatByID(id);
        this.$form.elements['name'].value = cat.name;
        this.$form.elements['image'].value = cat.image;
        this.$form.elements['age'].value = cat.age;
        this.$form.elements['rate'].value = cat.rate;
        this.$form.elements['favorite'].checked = cat.favorite;
        this.$form.elements['description'].value = cat.description;
        this.id = id;
    }
    events() {
        this.$form.addEventListener('submit', (event) => {
            event.preventDefault();
            const newCat = super.createObject(this.id);
            fetch.change(this.id, super.createObject(this.id));
            cards.update(this.id, newCat);
            editModal.close();
        });
    }
}
