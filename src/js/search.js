import { generateRequestTemplate } from "./utils";
import { searchInput } from "./constants";

searchInput

export class Search {

    constructor(classToRenderCardList, classToRenderCards, apiClass, localStorageClass) {
        this.searching(classToRenderCardList, classToRenderCards, apiClass, localStorageClass);
    }

    async searching(classToRenderCardList, classToRenderCards, apiClass, localStorageClass) {

        const cardList = new classToRenderCardList;
        cardList.removeAll();
        cardList.renderTitle();
        cardList.renderPreloader();

        const refreshLocStor = new localStorageClass;

        const api = new apiClass;
        await api.simpleRequest(generateRequestTemplate(searchInput.value))
        .then((result) => {
            cardList.removePreloader();
            refreshLocStor.loadToLocalStorage(result);
            if (result.articles.length === 0) {
                cardList.renderNoResult();
            } else {
                const newCard = new classToRenderCards;
                cardList.createCardsContainer();
                cardList.addCard(newCard.downloadSomeNewCards());
            }
        })
    }
}