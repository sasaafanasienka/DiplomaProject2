import { searchInput } from "./constants";

export class LocStor {

    loadToLocalStorage(resultOfRequest) {
        localStorage.clear();
        localStorage.setItem('result', JSON.stringify(resultOfRequest));
        localStorage.setItem('wordToSearch', searchInput.value);
    }
};