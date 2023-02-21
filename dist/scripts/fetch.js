import { createCard } from "./card-functions.js";
export class Fetch {
    url;
    constructor(url) {
        this.url = url;
    }
    async display() {
        const response = await fetch(`${this.url}show`);
        const data = await response.json();
        data.forEach((cat) => createCard(cat));
    }
    async delete(id) {
        const response = await fetch(`${this.url}delete/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log(data);
    }
    async add(object) {
        const response = await fetch(`${this.url}add`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(object)
        });
        const data = await response.json();
        console.log(data);
        createCard(object);
    }
    async makeFavorite(id, isFavorite) {
        const response = await fetch(`${this.url}update/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ favorite: !isFavorite })
        });
        const data = await response.json();
        console.log(data);
    }
    async showCurrent(id) {
        const response = await fetch(`${this.url}show/${id}`);
        const data = await response.json();
        return data;
    }
    async change(object, id) {
        const response = await fetch(`${this.url}update/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(object)
        });
        const data = await response.json();
        console.log(data);
    }
}
