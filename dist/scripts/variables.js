export const localStorageKey = 'cat';
export const activeIconClass = "card__action-button-icon--active";
export const bodyHiddenClass = "hidden";
export const modalActiveClass = "modal--active";
export const modalContentActiveClass = "modal__content--active";
export const fieldDataValue = '[data-info]';
export const cardDataValue = '[data-id]';
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
export const $cardContainer = document.querySelector(".card-container");
export const $addModal = document.querySelector("[data-modal='add']");
export const $editModal = document.querySelector("[data-modal='edit']");
export const $readMoreModal = document.querySelector("[data-modal='read']");
export const $addForm = document.forms['add-form'];
export const $editForm = document.forms['edit-form'];
export const $addButton = document.querySelector("[data-add]");
