import { Fetch } from "./fetch.js";
import { url, $modal, $modalContent, $addButton, $cardContainer } from "./variables.js";
import { deleteCard } from "./card-functions.js";
import { Modal } from "./modal.js";
export const fetch = new Fetch(url);
export const modal = new Modal($modal, $modalContent);
$addButton.addEventListener('click', () => {
    modal.render("POST");
});
$cardContainer.addEventListener('click', (e) => {
    const $currentCard = e.target instanceof HTMLElement ? e.target.closest('.card') : undefined;
    if (e.target instanceof HTMLButtonElement) {
        if (e.target.dataset.delete !== undefined) {
            fetch.delete(+($currentCard.dataset.id));
            deleteCard($currentCard);
        }
        if (e.target.dataset.favorite !== undefined) {
            e.target.children[0].classList.toggle("card__button-icon--active");
            fetch.makeFavorite(+($currentCard.dataset.id), e.target.children[0].classList.contains("card__button-icon--active"));
        }
    }
    else if (e.target instanceof HTMLImageElement && e.target.classList.contains('card__image')) {
        modal.handleForm("PUT", +($currentCard.dataset.id));
    }
});
fetch.display();
