import {body,
        resultsContainer,
        cardsContainer,
        swiperWrapper,
        searchInput,
        preloaderCircle,
        preloaderText,
        noResultImageContainer,
        noResultTitle,
        noResultSubtitle,
        resultsMore,
        resultsTitleLinkContainer, 
        REQUESTERRORS} from "./constants.js";

import {dateTransform,
        changeImageToDefaultIfNeed,
        trimText,
        removeElementByClassName,
        removeElement} from "./utils.js"

import { newCard } from "./card"
import { newLocalStorage } from "./localStorage.js";

class CardList {

constructor() {
}
 
  renderTitle() {
    if (document.querySelector('.results__title-link-container') === null) {
      const titleLinkContainer = document.createElement('div');
      titleLinkContainer.classList.add("title-link-container", "results__title-link-container");
    const title = document.createElement('h3');
      title.classList.add("title");
      title.textContent = 'Результаты поиска';
    const link = document.createElement('a');
      link.classList.add("link-text", "text-right");
      link.setAttribute('href', './analytics.html');
      link.textContent = 'Посмотреть аналитику >';

    titleLinkContainer.appendChild(title);
    titleLinkContainer.appendChild(link);
    resultsContainer.appendChild(titleLinkContainer);
    }
    resultsContainer.classList.remove('results_display-none');
  }

  removeTitle() {
    removeElementByClassName('.results__title-link-container', resultsContainer)
  }

  renderPreloader() {
    const preloaderCircle = document.createElement('i');
      preloaderCircle.classList.add('circle-preloader');
    const preloaderText = document.createElement('p');
      preloaderText.classList.add('text', 'text-center', 'text-preloader');
      preloaderText.textContent = 'Идет поиск новостей...';
    resultsContainer.appendChild(preloaderCircle);  
    resultsContainer.appendChild(preloaderText);
  }

  removePreloader() {
    removeElementByClassName('.circle-preloader', resultsContainer),
    removeElementByClassName('.text-preloader', resultsContainer)
  }

  renderNoResult(typeOfError) {
    const noResultImageContainer = document.createElement('div');
      noResultImageContainer.classList.add('no-result__image');
    const noResultImage = document.createElement('img');
      noResultImage.setAttribute('src', REQUESTERRORS[typeOfError][2]);
    const noResultTitle = document.createElement('h4');
      noResultTitle.classList.add('title-mini', 'title-mini_center', 'no-result__title');
      noResultTitle.textContent = REQUESTERRORS[typeOfError][0];
    const noResultSubtitle = document.createElement('p');
    noResultSubtitle.classList.add('text', 'text-center', 'no-result__subtitle');
    noResultSubtitle.textContent = REQUESTERRORS[typeOfError][1];
    noResultImageContainer.appendChild(noResultImage);
    resultsContainer.appendChild(noResultImageContainer);
    resultsContainer.appendChild(noResultTitle);
    resultsContainer.appendChild(noResultSubtitle);
  }

  removeNoResult () {
    removeElementByClassName('.no-result__title', resultsContainer),
    removeElementByClassName('.no-result__image', resultsContainer),
    removeElementByClassName('.no-result__subTitle', resultsContainer)
  }

  removeAll () {
    removeElementByClassName('.no-result__title', resultsContainer),
    removeElementByClassName('.no-result__image', resultsContainer),
    removeElementByClassName('.no-result__subtitle', resultsContainer),
    removeElementByClassName('.circle-preloader', resultsContainer),
    removeElementByClassName('.text-preloader', resultsContainer),
    removeElementByClassName('.results__title-link-container', resultsContainer),
    removeElementByClassName('.results__cards-container', resultsContainer),
    removeElementByClassName('.results__more', resultsContainer)
  }

  createCardsContainer() {
    if (document.querySelector('.results__cards-container') === null) {
      const cardsContainer = document.createElement('section');
      cardsContainer.classList.add('results__cards-container');
      resultsContainer.appendChild(cardsContainer);
    }
  }

  addSomeNewCards() {
    this.renderTitle();
    this.createCardsContainer();
    const arrayOfArticles = newLocalStorage.getArrayOfNews();
    const screenWidth = document.documentElement.clientWidth;              //Будем действовать в зависимости от ширины экрана
    const startPoint = localStorage.getItem('numberOfRenderedCards');      //стартовый порядковый номер массива для загрузки карточек
    let endPoint
    if (screenWidth > 550 && screenWidth < 750 || screenWidth > 1600) {    // Будем загружать 4 карточки если на экране помещается 4 или 2 в ряд
      if ((Math.ceil(startPoint / 4) + 1) * 4 <= arrayOfArticles.length) {   //проверим хватит ли в массиве карточек для загрузки
        endPoint = (Math.ceil(startPoint / 4) + 1) * 4;                    //Всегда будет загружаться количество карточек нужное до целого следующего ряда
      } else {
        endPoint = arrayOfArticles.length - 1;                                   //если карточек осталось мало, то загрузим то, что осталось до конца 
      }
    } else {                                                               // Будем загружать 3 карточки если на экране помещается 3 или 1 в ряд
      if ((Math.ceil(startPoint / 3) + 1) * 3 <= arrayOfArticles.length) {   //проверим хватит ли в массиве карточек для загрузки
        endPoint = (Math.ceil(startPoint / 3) + 1) * 3;                    //Всегда будет загружаться количество карточек нужное до целого следующего ряда
      } else {
        endPoint = arrayOfArticles.length - 1;                                   //если карточек осталось мало, то загрузим то, что осталось до конца
      }
    }
    localStorage.setItem('numberOfRenderedCards', endPoint);               //сохраним в localStotage количество загруженных страниц, чтобы после перезагрузки страницы они все появились сно
    this.addCards(startPoint, endPoint);
    this.renderMoreButton();
  }

  addCardsAfterRefresh() {
    this.removeTitle();
    if (localStorage.getItem('length') !== null || newLocalStorage.getArrayOfNews().length !== 0) {
      // console.log(localStorage.getItem('length'))
      // console.log(newLocalStorage.getArrayOfNews().length)
      // console.log(JSON.parse(localStorage.getItem('result')));
      // console.log(1);
      searchInput.value = localStorage.getItem('wordToSearch');
      this.renderTitle();
      this.createCardsContainer();
      const endPoint = localStorage.getItem('numberOfRenderedCards');
      this.addCards(0, endPoint);
      this.renderMoreButton();
    }
    // } else {
    //   this.removeTitle();
    // }
  }

  addCards(startPoint, endPoint) {
    const arrayOfArticles = newLocalStorage.getArrayOfNews();
    const resultsContainer = document.querySelector('.results')
    const cardsContainer = document.querySelector('.results__cards-container');

    removeElementByClassName('.results__more', resultsContainer);

    for (let i = startPoint; i < endPoint; i++) {
      // console.log(i)
      const cardElement = 
      newCard.create (changeImageToDefaultIfNeed(arrayOfArticles[i].urlToImage),
                      dateTransform(arrayOfArticles[i].publishedAt), 
                      arrayOfArticles[i].title,
                      arrayOfArticles[i].description,
                      arrayOfArticles[i].source.name,
                      arrayOfArticles[i].url,
      );
      // console.log(cardElement);
      // console.log(cardsContainer);
      cardsContainer.appendChild(cardElement);
      cardElement.querySelector('.text').textContent = trimText(cardElement);
    }
  }

  renderMoreButton() {     
    const arrayOfArticles = newLocalStorage.getArrayOfNews(); 
    if (document.querySelectorAll('.results__card').length < arrayOfArticles.length) { //если в локалСторадж еще остались незагруженные карточки
      const moreButton = document.createElement('button');                           //то нужно нарисовать кннопку "Показать еще"
      moreButton.classList.add('results__more', 'button-text', 'button');
      moreButton.textContent = 'Показать еще';
      moreButton.addEventListener('click', () => {
        this.addSomeNewCards();
      });
      resultsContainer.appendChild(moreButton);
      }
  }
}

export const newCardList = new CardList();