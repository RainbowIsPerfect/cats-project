export const LOCAL_STORAGE_KEY = 'cat';
export const ACTIVE_ICON_CLASS = "card__action-button-icon--active";
export const BODY_HIDDEN_CLASS = "hidden";
export const MODAL_ACTIVE_CLASS = "modal--active";
export const MODAL_CONTENT_ACTIVE_CLASS = "modal__content--active";
export const FIELD_DATA = '[data-info]';
export const CARD_DATA = '[data-id]';
export const LIKE_ICON_DATA = '[data-like]';
export const MODAL_CONTENT_DATA = "[data-content]";
export const buttonActionsData = {
    delete: 'delete',
    edit: 'edit',
    favorite: 'favorite',
    read: 'read',
};
export const cardFieldsData = {
    id: 'data-id',
    info: 'data-info',
    action: 'data-action',
    image: 'data-image',
};
export const formInputsData = {
    name: 'name',
    image: 'image',
    rate: 'rate',
    age: 'age',
    favorite: 'favorite',
    description: 'description'
}
export const $cardContainer = <HTMLDivElement>document.querySelector("[data-container]");
export const $addModal = <HTMLDivElement>document.querySelector("[data-modal='add']");
export const $editModal = <HTMLDivElement>document.querySelector("[data-modal='edit']");
export const $readMoreModal = <HTMLDivElement>document.querySelector("[data-modal='read']");
export const $addForm = <HTMLFormElement>document.forms['add-form'];
export const $editForm = <HTMLFormElement>document.forms['edit-form'];
export const $addButton = <HTMLButtonElement>document.querySelector("[data-add]");
