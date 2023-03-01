import { Cat, Config, Message } from "./types.js";

const config: Config = {
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
}

class Api {
    private headers: HeadersInit;
    private url: string;
    constructor(config: Config) {
        this.url = config.getFullUrl();
        this.headers = config.getHeaders();
    }

    private async getResponse(response: Response) {
        return response.ok ? response.json() : Promise.reject(new Error(`${response.status}`));
    }

    async getAllCats(): Promise<Cat[]> {
        const response = await fetch(`${this.url}show`);
        const data: Cat[] = await this.getResponse(response);
        console.log("getAllCats", data);
        
        return data;
    }

    async getCatByID(id: number): Promise<Cat> {
        const response = await fetch(`${this.url}show/${id}`);
        const data: Cat = await this.getResponse(response);
        console.log("getCatByID", data);
        
        return data;
    }

    async deleteCatById(id: number): Promise<Message> {
        const response = await fetch(`${this.url}delete/${id}`, {
            method: "DELETE"
        });
        const data: Message = await this.getResponse(response);
        console.log("deleteCatById", data);
        
        return data;
    }

    async addNewCat(object: Cat): Promise<Message> {
        const response = await fetch(`${this.url}add`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(object)
        });
        const data: Message = await this.getResponse(response); 
        console.log("addNewCat",data);
        
        return data;
    }

    async makeCatFavorite(id: number, isFavorite: boolean): Promise<Message> {
        const response = await fetch(`${this.url}update/${id}`, {
            method: "PUT",
            headers: this.headers,
            body: JSON.stringify({favorite: isFavorite})
        });
        const data: Message = await this.getResponse(response);
        console.log("makeCatFavorite",data);
        
        return data;
    }

    async change(id: number, object: Cat): Promise<Message> {
        const response = await fetch(`${this.url}update/${id}`, {
            method: "PUT",
            headers: this.headers,
            body: JSON.stringify(object)
        });
        const data: Message = await this.getResponse(response);
        console.log("change", data);

        return data;
    }
}

export const api = new Api(config);