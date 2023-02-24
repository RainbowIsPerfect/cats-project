import { fetch } from "./index.js";
export class CatCards {
    cardContainer;
    constructor(cardContainer) {
        this.cardContainer = cardContainer;
    }
    async display() {
        const data = await fetch.getAllCats();
        data.forEach(cat => this.create(cat));
    }
    update(id, cat) {
        const $currentCat = this.cardContainer.querySelector(`[data-id="${id}"]`);
        const $currentCatInfo = $currentCat.querySelector('.card__info');
        const $currentCatDescription = $currentCat.querySelector('.card__description');
        const $currentCatFavorite = $currentCat.querySelector(`[data-action="favorite"]`).children[0];
        $currentCatInfo.innerHTML = `<strong class="card__name">${cat.name}</strong> ${cat.age}`;
        $currentCatDescription.innerText = `${cat.description ? cat.description : "No description provided"}`;
        $currentCatFavorite.classList.toggle('card__button-icon--active');
    }
    create(cat) {
        const favoriteClass = cat.favorite ? "card__button-icon--active" : "";
        const cardHTML = `
        <div class="card" data-id="${cat.id}">
            <div class="card__image-container">
                <img class="card__image" src="${cat.image}" alt="">
                <div class="card__button-container">
                    <button class="card__action-button" data-action="favorite">
                        <svg class="card__button-icon ${favoriteClass}" fill="gray" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
                    </button>
                    <button class="card__action-button" data-action="edit">
                        <svg class="card__button-icon" fill="#131313" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
                    </button>
                    <button class="card__action-button" data-action="delete">
                        <svg class="card__button-icon" fill="#131313" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                    </button>
                </div>
            </div>
            <div class="card__options">
                <p class="card__info"><strong class="card__name">${cat.name}</strong> ${cat.age}</p>
                <p class="card__description">${cat.description ? cat.description : "No description provided"}</p>
                <button class="card__read-more-button" data-action="read">Read more</button>
            </div>
        </div>`;
        this.cardContainer.insertAdjacentHTML('beforeend', cardHTML);
    }
    delete(card) {
        card.remove();
    }
}
