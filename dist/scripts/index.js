import { Fetch } from "./fetch.js";
import { AddForm, EditForm } from "./forms.js";
import { CatCards } from "./card-functions.js";
import { Modal, DescriptionModal } from "./modal.js";
// import { url, $addModal, $addModalContent, $readMoreModal, $readMoreModalContent, $addForm, $editForm, $editModal, $editModalContent, $addButton, $cardContainer} from "./variables.js";
const db = "rainbowisperfect";
const url = `https://cats.petiteweb.dev/api/single/${db}/`;
const $cardContainer = document.querySelector(".card-container");
const $addModal = document.querySelector("[data-modal='add']");
const $addModalContent = $addModal.querySelector(".modal__content");
const $editModal = document.querySelector("[data-modal='edit']");
const $readMoreModal = document.querySelector("[data-modal='read']");
const $readMoreModalContent = $readMoreModal.querySelector(".modal__content");
const $editModalContent = $editModal.querySelector(".modal__content");
const $addForm = document.forms['add-form'];
const $editForm = document.forms['edit-form'];
const $addButton = document.querySelector("[data-add]");
export const fetch = new Fetch(url);
export const addModal = new Modal($addModal, $addModalContent);
export const editModal = new Modal($editModal, $editModalContent);
export const readMoreModal = new DescriptionModal($readMoreModal, $readMoreModalContent);
export const addForm = new AddForm($addForm);
export const editForm = new EditForm($editForm);
export const cards = new CatCards($cardContainer);
$addButton.addEventListener('click', () => addModal.open());
cards.renderAllCards();
