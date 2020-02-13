// import { CardList } from './components.js';
// const newCardList = new CardList();Л

export class NewsApi {

    constructor() {
    };

    async simpleRequest(template) {

        let res = await fetch(template)
            if (res.ok) {
                const result = await res.json();
                return result;
            } else {
            return Promise.reject('Ошибка: ${response.status}')
            }
        }
};