import { Fetch } from "./fetch.js";
import { AddForm, EditForm } from "./forms.js";
import { url, $addModal, $addModalContent, $readMoreModal, $readMoreModalContent, $addForm, $editForm, $editModal, $editModalContent, $addButton, $cardContainer } from "./variables.js";
import { CatCards } from "./card-functions.js";
import { Modal, DescriptionModal } from "./modal.js";
export const fetch = new Fetch(url);
export const addModal = new Modal($addModal, $addModalContent);
export const editModal = new Modal($editModal, $editModalContent);
const readMoreModal = new DescriptionModal($readMoreModal, $readMoreModalContent);
const addForm = new AddForm($addForm);
const editForm = new EditForm($editForm);
export const cards = new CatCards($cardContainer);
$addButton.addEventListener('click', () => {
    addModal.open();
});
$cardContainer.addEventListener('click', (e) => {
    if (e.target instanceof HTMLButtonElement) {
        const $currentCard = event.target.closest('.card');
        const currentId = Number($currentCard.dataset.id);
        switch (e.target.dataset.action) {
            case "delete":
                fetch.deleteCatById(currentId);
                cards.delete($currentCard);
                break;
            case "edit":
                editForm.fill(currentId);
                editModal.open();
                break;
            case "favorite":
                const $icon = e.target.querySelector('.card__button-icon');
                $icon.classList.toggle("card__button-icon--active");
                fetch.makeCatFavorite(currentId, $icon.classList.contains("card__button-icon--active"));
                break;
            case "read":
                readMoreModal.render(currentId);
                readMoreModal.open();
                break;
            default:
                break;
        }
    }
});
cards.display();
