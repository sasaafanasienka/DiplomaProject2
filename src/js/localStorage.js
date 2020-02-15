import { searchInput } from "./constants";

class LocalStorage {
    loadToLocalStorage(resultOfRequest) {
        localStorage.clear();
        localStorage.setItem('result', JSON.stringify(resultOfRequest));
        localStorage.setItem('wordToSearch', searchInput.value);
        localStorage.setItem('numberOfRenderedCards', 0);
    }

    getArrayOfNews() {
        if (localStorage.getItem('result') === null) {
            // console.log(1)
            const arr = []
            return arr;
        } else {
            // console.log(localStorage.getItem('result'))
            // console.log(2);
            // console.log(2);
            return JSON.parse(localStorage.getItem('result')).articles
        }
    }
};

export const newLocalStorage = new LocalStorage();