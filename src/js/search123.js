import { generateRequestTemplate } from "./utils";
import { searchInput, searchButton } from "./constants";
import { CardList } from "./cardList";
import { LocalStorage } from "./localStorage";
import { NewsApiRequest } from "./newsApi";

export class Search {

    searching() {

        newCardList.removeAll(); 
        newCardList.renderTitle();
        newCardList.renderPreloader();
        searchInput.setAttribute('disabled', true);
        searchInput.classList.add('head-block__search-input_disabled')
        searchButton.setAttribute('disabled', true)
        searchButton.classList.add('head-block__search-button_disabled')

        async function request() {
            
            try {
                const api = await newNewsApiRequest(generateRequestTemplate(searchInput.value));
                const result = await api.simpleRequest();
           
                newLocalStorage.loadToLocalStorage(result);
                newCardList.removePreloader();
                if (result.articles.length === 0) {
                    newCardList.renderNoResult('noResult');
                } else {
                    newCardList.createCardsContainer();
                    newCardList.addSomeNewCards();
                }
            } catch {
                newCardList.removePreloader();
                newCardList.renderNoResult('badRequest');
            } finally {
                searchInput.removeAttribute('disabled', true)
                searchButton.removeAttribute('disabled', true)
                searchInput.classList.remove('head-block__search-input_disabled')
                searchButton.classList.remove('head-block__search-button_disabled')
            }
            
        }

        request();
    }
}