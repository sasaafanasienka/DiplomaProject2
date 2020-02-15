import { generateRequestTemplate } from "./utils";
import { searchInput, searchButton } from "./constants";
import { newCardList } from "./cardList";
import { newLocalStorage } from "./localStorage";
import { newNewsApiRequest } from "./newsApi";
import { newCard } from "./card";

class Search {

    searching() {

        newCardList.removeAll(); 
        newCardList.renderTitle();
        newCardList.renderPreloader();
        searchInput.setAttribute('disabled', true);
        searchInput.classList.add('head-block__search-input_disabled')
        searchButton.setAttribute('disabled', true)
        searchButton.classList.add('head-block__search-button_disabled')

        async function request() {
            const api = await newNewsApiRequest(generateRequestTemplate(searchInput.value));
            const result = await api.simpleRequest();
       
            newLocalStorage.loadToLocalStorage(result);
            newCardList.removePreloader();
            searchInput.removeAttribute('disabled', true)
            searchButton.removeAttribute('disabled', true)
            searchInput.classList.remove('head-block__search-input_disabled')
            searchButton.classList.remove('head-block__search-button_disabled')

            if (result.articles.length === 0) {
                newCardList.renderNoResult('noResult');
            } else {
                newCardList.createCardsContainer();
                newCardList.addSomeNewCards();
            }
        }

        request();
    }
}

export const newSearch = new Search();


// export class Search {

//     constructor(classToRenderCardList, classToRenderCards, apiClass, localStorageClass) {
//         this.searching(classToRenderCardList, classToRenderCards, apiClass, localStorageClass);
//     }

//     async searching(classToRenderCardList, classToRenderCards, apiClass, localStorageClass) {

//         const cardList = new classToRenderCardList;
//         cardList.removeAll();
//         cardList.renderTitle();
//         cardList.renderPreloader();

//         const refreshLocalStorage = new localStorageClass;

//         const api = new apiClass;
//         await api.simpleRequest(generateRequestTemplate(searchInput.value))
//         .then((result) => {
//             cardList.removePreloader();
//             refreshLocalStorage.loadToLocalStorage(result);
//             if (result.articles.length === 0) {
//                 cardList.renderNoResult();
//             } else {
//                 const newCard = new classToRenderCards;
//                 cardList.createCardsContainer();
//                 cardList.addCard(newCard.downloadSomeNewCards());
//             }
//         })
//     }
// }