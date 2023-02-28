import { api } from "./fetch.js";
import { AddForm, EditForm } from "./forms.js";
import { CatCards } from "./cards.js";
import { Modal, DescriptionModal } from "./modal.js";
import { $addModal, $editModal, $readMoreModal, $addForm, $editForm, $addButton, $cardContainer, localStorageKey, activeIconClass, fieldDataValue, cardDataValue, buttonActionsData } from "./variables.js";
const addModal = new Modal($addModal);
const editModal = new Modal($editModal);
const readMoreModal = new DescriptionModal($readMoreModal, fieldDataValue);
const addForm = new AddForm($addForm, localStorageKey);
const editForm = new EditForm($editForm);
const cards = new CatCards($cardContainer);
if (localStorage.getItem(localStorageKey)) {
    addForm.fillFormWithLocalStorageData(localStorageKey);
}
const renderAllCats = async () => {
    const data = await api.getAllCats();
    return cards.renderAllCards(data);
};
renderAllCats();
const editButtonClickHandle = async (id) => {
    const cat = await api.getCatByID(id);
    editForm.fillForm(id, cat);
    editModal.open();
};
const readButtonClickHandle = async (id) => {
    const cat = await api.getCatByID(id);
    readMoreModal.fill(cat);
    readMoreModal.open();
};
const favoriteButtonClickHandle = (id, $icon) => {
    $icon.classList.toggle(activeIconClass);
    api.makeCatFavorite(id, $icon.classList.contains(activeIconClass));
};
const deleteButtonClickHandle = (id, $card) => {
    api.deleteCatById(id);
    cards.deleteCard($card);
};
const handleButtonClick = (e) => {
    if (e.target instanceof HTMLButtonElement) {
        const $currentCard = e.target.closest(cardDataValue);
        const currentId = Number($currentCard.dataset.id);
        const actionType = e.target.dataset.action;
        switch (actionType) {
            case buttonActionsData.delete:
                deleteButtonClickHandle(currentId, $currentCard);
                break;
            case buttonActionsData.edit:
                editButtonClickHandle(currentId);
                break;
            case buttonActionsData.favorite:
                const $icon = e.target.children[0];
                favoriteButtonClickHandle(currentId, $icon);
                break;
            case buttonActionsData.read:
                readButtonClickHandle(currentId);
                break;
            default:
                break;
        }
    }
};
const addFormSubmitEvent = (e) => {
    e.preventDefault();
    localStorage.removeItem(localStorageKey);
    const currentCat = addForm.createCatObject();
    api.addNewCat(currentCat);
    cards.createNewCard(currentCat);
    addModal.close();
    $addForm.reset();
};
const saveDataToLocalStorage = () => localStorage.setItem(localStorageKey, JSON.stringify(addForm.createCatObject()));
const changeCatFormEvent = (e) => {
    e.preventDefault();
    const newCat = editForm.createCatObject(editForm.id);
    api.change(editForm.id, newCat);
    cards.updateCardByID(editForm.id, newCat);
    editModal.close();
};
$addButton.addEventListener('click', () => addModal.open());
addForm.addEvent('submit', addFormSubmitEvent).addEvent('input', saveDataToLocalStorage);
editForm.addEvent('submit', changeCatFormEvent);
cards.addEvent('click', handleButtonClick);
