import "../src/styles/index.css";

import {searchButton,
        searchInput} from './js/constants.js'
        
import { newSendForm } from "./js/sendForm";
import { newCardList } from "./js/cardList";
import { newCard } from "./js/card";

newCardList.addCardsAfterRefresh();

searchButton.addEventListener('click', () => {
    const form = newSendForm(searchInput);
    form.inputValueValidation();
});

searchInput.addEventListener('keyup', () => {
    if (event.key == 'Enter') {
        const form = newSendForm(searchInput);
        form.inputValueValidation();
    }
});