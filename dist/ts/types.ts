export interface Cat {
    id: number
    name: string,
    image: string,
    age: number,
    rate: number,
    favorite: boolean,
    description?: string
}

export interface Message {
    message: string
}

export interface Config {
    readonly dataBase: string,
    readonly baseUrl: string,
    httpHeaders: Headers,
    getFullUrl: () => string,
    getHeaders: () => HeadersInit
}

interface Headers {
    'Content-type': string
}

export interface Options {
    backdropBlur?: number,
    backgroundOpacity?: number,
    animationType?: string,
    animationDuration?: number,
}