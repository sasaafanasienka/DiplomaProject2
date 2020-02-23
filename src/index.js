import "../src/styles/index.css";

import {searchButton,
        searchInput} from './js/constants.js'
        
import { Validation } from "./js/validation";
import { CardList } from "./js/cardList";
import { LocalStorage } from "./js/localStorage";
import { NewsApi } from "./js/newsApi"
import { generateRequestTemplate } from "./js/utils.js"
 

const cardList = new CardList();
const newLocalStorage = new LocalStorage();
const validation = (inputValue) => new Validation(inputValue);
const api = (template) => new NewsApi(template);


function addCardsAfterRefresh() {
    cardList.removeTitle();
    const arrayOfArticles = newLocalStorage.getArrayOfNews();
    if (arrayOfArticles.length > 0) {
      searchInput.value = localStorage.getItem('wordToSearch');
      cardList.renderTitle();
      cardList.createCardsContainer();
      const endPoint = localStorage.getItem('numberOfRenderedCards');
      cardList.addCards(0, endPoint, arrayOfArticles);
      cardList.renderMoreButton(arrayOfArticles);
    } 
  }

addCardsAfterRefresh();  

function search() {

    validation(searchInput).inputValueValidation();

    cardList.removeAll(); 
    cardList.renderTitle();
    cardList.renderPreloader();
    searchInput.setAttribute('disabled', true);
    searchInput.classList.add('head-block__search-input_disabled')
    searchButton.setAttribute('disabled', true)
    searchButton.classList.add('head-block__search-button_disabled')

    api(generateRequestTemplate(searchInput.value)).request()
        .then((result) => {
            console.log(result.articles);
            newLocalStorage.loadToLocalStorage(result);
            console.log(localStorage);
            cardList.removePreloader();
            if (result.articles.length === 0) {
                cardList.renderNoResult('noResult');
            } else {
                cardList.createCardsContainer();
                cardList.addSomeNewCards();
            }
        })
        .catch(() => {
            newCardList.removePreloader();
            newCardList.renderNoResult('badRequest');
        })
        .finally(() => {
            searchInput.removeAttribute('disabled', true)
            searchButton.removeAttribute('disabled', true)
            searchInput.classList.remove('head-block__search-input_disabled')
            searchButton.classList.remove('head-block__search-button_disabled')
        })
}

searchButton.addEventListener('click', () => {
    search();
});

searchInput.addEventListener('keyup', () => {
    if (event.key == 'Enter') {
        search();
    }
});