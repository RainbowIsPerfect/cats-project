import { api } from "./fetch.js";
import { AddForm, EditForm } from "./forms.js";
import { CatCards } from "./cards.js";
import { Modal, DescriptionModal } from "./modal.js";
import { 
    LOCAL_STORAGE_KEY, ACTIVE_ICON_CLASS, FIELD_DATA, CARD_DATA, LIKE_ICON_DATA, 
    MODAL_CONTENT_DATA, buttonActionsData, $addModal, $editModal, 
    $readMoreModal, $addForm, $editForm, $addButton, $cardContainer 
} from "./variables.js";

const addModal = new Modal($addModal, MODAL_CONTENT_DATA);
const editModal = new Modal($editModal, MODAL_CONTENT_DATA);
const readMoreModal = new DescriptionModal($readMoreModal, MODAL_CONTENT_DATA, FIELD_DATA);
const addForm = new AddForm($addForm, LOCAL_STORAGE_KEY);
const editForm = new EditForm($editForm);
const cards = new CatCards($cardContainer);

if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
    addForm.fillFormWithLocalStorageData(LOCAL_STORAGE_KEY);
}

const renderAllCats = async (): Promise<void> => {
    const data = await api.getAllCats();
    return cards.renderAllCards(data);
};

renderAllCats();

const editButtonClickHandle = async (id: number): Promise<void> => {
    const cat = await api.getCatByID(id);
    editForm.fillForm(id, cat);
    editModal.open();
};

const readButtonClickHandle = async (id: number): Promise<void> => {
    const cat = await api.getCatByID(id);
    readMoreModal.fill(cat).open();
};

const favoriteButtonClickHandle = (id: number, $icon: Element): void => {
    $icon.classList.toggle(ACTIVE_ICON_CLASS);
    api.makeCatFavorite(id, $icon.classList.contains(ACTIVE_ICON_CLASS));
};

const deleteButtonClickHandle = (id: number, $card: HTMLElement): void => {
    api.deleteCatById(id);
    cards.deleteCard($card);
};

const handleButtonClick = (e: Event): void => {
    if (e.target instanceof HTMLButtonElement) {
        const $currentCard = e.target.closest(CARD_DATA) as HTMLElement;
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
                const $icon = e.target.querySelector(LIKE_ICON_DATA);
                favoriteButtonClickHandle(currentId, $icon);
                break;
            case buttonActionsData.read:
                readButtonClickHandle(currentId);
                break;
            default:
                break;
        }
    }
}

const addFormSubmitEvent = (e: Event): void => {
    e.preventDefault();
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    const currentCat = addForm.createCatObject();
    api.addNewCat(currentCat);
    cards.createNewCard(currentCat);
    addModal.close();
    $addForm.reset();
}

const saveDataToLocalStorage = (): void => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(addForm.createCatObject()));

const changeCatFormEvent = (e: Event): void => {
    e.preventDefault();
    const newCat = editForm.createCatObject(editForm.id);
    api.change(editForm.id, newCat);
    cards.updateCardByID(editForm.id, newCat);
    editModal.close();
}

$addButton.addEventListener('click', (): void => addModal.open());
addForm.addEvent('submit', addFormSubmitEvent).addEvent('input', saveDataToLocalStorage);
editForm.addEvent('submit', changeCatFormEvent);
cards.addEvent('click', handleButtonClick);
