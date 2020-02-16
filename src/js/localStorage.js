import { searchInput } from "./constants";

class LocalStorage {

    loadToLocalStorage(resultOfRequest) {
        localStorage.clear();
        localStorage.setItem('result', JSON.stringify(resultOfRequest));
        localStorage.setItem('wordToSearch', searchInput.value);
        localStorage.setItem('numberOfRenderedCards', 0);
    }

    getArrayOfNews() {
        this.checkErrors();

        if (localStorage.getItem('result') !== null) {
            return JSON.parse(localStorage.getItem('result')).articles
        } else {
            const emptyArray = [];
            return emptyArray;
        }
    }

    checkErrors() {
        console.log('checking localStorage for errors..')
        if (localStorage.getItem('numberOfRenderedCards') < 0) { //отлавливаем возмоджные ошибки в localStorage;
            localStorage.clear();
        };
        if (
            localStorage.getItem('result') === null 
            || localStorage.getItem('result') === undefined
            ) {
            localStorage.clear();
        }
    }
};

export const newLocalStorage = new LocalStorage();