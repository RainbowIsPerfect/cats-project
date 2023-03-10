const config = {
    dataBase: "rainbowisperfect",
    baseUrl: `https://cats.petiteweb.dev/api/single/`,
    httpHeaders: {
        'Content-type': 'application/json',
    },
    getHeaders() {
        return new Headers(this.httpHeaders);
    },
    getFullUrl() {
        return `${this.baseUrl}${this.dataBase}/`;
    },
};
class Api {
    headers;
    url;
    constructor(config) {
        this.url = config.getFullUrl();
        this.headers = config.getHeaders();
    }
    async getResponse(response) {
        return response.ok ? response.json() : Promise.reject(new Error(`${response.status}`));
    }
    async getAllCats() {
        const response = await fetch(`${this.url}show`);
        const data = await this.getResponse(response);
        console.log("getAllCats", data);
        return data;
    }
    async getCatByID(id) {
        const response = await fetch(`${this.url}show/${id}`);
        const data = await this.getResponse(response);
        console.log("getCatByID", data);
        return data;
    }
    async deleteCatById(id) {
        const response = await fetch(`${this.url}delete/${id}`, {
            method: "DELETE"
        });
        const data = await this.getResponse(response);
        console.log("deleteCatById", data);
        return data;
    }
    async addNewCat(object) {
        const response = await fetch(`${this.url}add`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(object)
        });
        const data = await this.getResponse(response);
        console.log("addNewCat", data);
        return data;
    }
    async makeCatFavorite(id, isFavorite) {
        const response = await fetch(`${this.url}update/${id}`, {
            method: "PUT",
            headers: this.headers,
            body: JSON.stringify({ favorite: isFavorite })
        });
        const data = await this.getResponse(response);
        console.log("makeCatFavorite", data);
        return data;
    }
    async change(id, object) {
        const response = await fetch(`${this.url}update/${id}`, {
            method: "PUT",
            headers: this.headers,
            body: JSON.stringify(object)
        });
        const data = await this.getResponse(response);
        console.log("change", data);
        return data;
    }
}
export const api = new Api(config);
