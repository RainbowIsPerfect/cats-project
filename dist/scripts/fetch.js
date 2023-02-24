export class Fetch {
    url;
    constructor(url) {
        this.url = url;
    }
    async getAllCats() {
        const response = await fetch(`${this.url}show`);
        const data = await response.json();
        console.log(data);
        return data;
    }
    async getCatByID(id) {
        const response = await fetch(`${this.url}show/${id}`);
        const data = await response.json();
        console.log(data);
        return data;
    }
    async deleteCatById(id) {
        const response = await fetch(`${this.url}delete/${id}`, {
            method: "DELETE"
        });
        const data = await response.json();
        console.log(data);
    }
    async addNewCat(object) {
        const response = await fetch(`${this.url}add`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(object)
        });
        const data = await response.json();
        console.log(data);
    }
    async makeCatFavorite(id, isFavorite) {
        const response = await fetch(`${this.url}update/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ favorite: isFavorite })
        });
        const data = await response.json();
        console.log(data);
    }
    async change(id, object) {
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
