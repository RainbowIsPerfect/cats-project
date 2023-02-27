import { Fetch } from "./fetch.js";
import { AddForm, EditForm } from "./forms.js";
import { CatCards } from "./card-functions.js";
import { Modal, DescriptionModal } from "./modal.js";
import { url, $addModal, $editModal, $readMoreModal, $addForm, $editForm, $addButton, $cardContainer, localStorageKey } from "./variables.js";
export const fetch = new Fetch(url);
export const addModal = new Modal($addModal);
export const editModal = new Modal($editModal);
export const readMoreModal = new DescriptionModal($readMoreModal);
export const addForm = new AddForm($addForm, localStorageKey);
export const editForm = new EditForm($editForm);
export const cards = new CatCards($cardContainer);
$addButton.addEventListener('click', () => addModal.open());
cards.renderAllCards();
if (localStorage.getItem(localStorageKey)) {
    addForm.fillFormWithLocalStorageData(localStorageKey);
}
