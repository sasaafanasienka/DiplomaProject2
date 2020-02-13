import {body,
        resultsContainer,
        cardsContainer,
        swiperWrapper} from "./constants.js";

import {deleteElement, deleteElem, dateTransform, numberOfSlides, loadCards, changeImageToDefaultIfNeed, trimText} from "./utils.js"

export class CardList {
 
  renderTitle() {
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

    resultsContainer.classList.remove('results_display-none');
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
    const preloaderCircle = document.querySelector('.circle-preloader')
    const preloaderText = document.querySelector('.text-preloader')
    resultsContainer.removeChild(preloaderCircle);
    resultsContainer.removeChild(preloaderText);
  }

  renderNoResult() {
    const noResultImageContainer = document.createElement('div');
      noResultImageContainer.classList.add('no-result__image');
    const noResultImage = document.createElement('img');
      noResultImage.setAttribute('src', './images/not-found_v1.svg');
      // noResultImage.setAttribute('src', "<%=('../images/not-found-v1.svg')%>");
    const noResultTitle = document.createElement('h4');
      noResultTitle.classList.add('title-mini', 'title-mini_center', 'no-result__title');
      noResultTitle.textContent = 'Ничего не найдено!';
    const noResultSubtitle = document.createElement('p');
    noResultSubtitle.classList.add('text', 'text-center', 'no-result__subtitle');
    noResultSubtitle.textContent = 'К сожалению по вашему запросу ничего не найдено.';
    noResultImageContainer.appendChild(noResultImage);
    resultsContainer.appendChild(noResultImageContainer);
    resultsContainer.appendChild(noResultTitle);
    resultsContainer.appendChild(noResultSubtitle);
  }

  removeNoResult () {
    const noResultImageContainer = document.querySelector('no-result__image');
    const noResultTitle = document.querySelector('no-result__title');
    const noResultSubtitle = document.querySelector('no-result__subtitle');
    resultsContainer.removeChild(noResultImageContainer);
    resultsContainer.removeChild(noResultTitle);
    resultsContainer.removeChild(noResultSubtitle);
  }

  removeAll () {
    deleteElement(resultsContainer, '.results__title-link-container')
    deleteElement(resultsContainer, '.results__more')
    deleteElement(resultsContainer, '.no-result__image')
    deleteElement(resultsContainer, '.no-result__title')
    deleteElement(resultsContainer, '.no-result__subtitle')
    deleteElement(resultsContainer, '.results__cards-container')
  }

  addCard(methodToAddCards) {
    const section = document.createElement('section');
    resultsContainer.appendChild(section);  
    methodToAddCards;
   }

  createCardsContainer() {
    if (document.querySelector('.results__cards-container') === null) {
      const cardsContainer = document.createElement('div');
      cardsContainer.classList.add('results__cards-container');
      resultsContainer.appendChild(cardsContainer);
    }
  }
}

export class Card {

downloadSomeNewCards() {
  const articlesArr = JSON.parse(localStorage.result).articles; // для удобства создадим массив с карточками из данных в localStoarge 

  let section = document.querySelector('.results__cards-container');
  deleteElement(resultsContainer, '.results__more'); //удалим кнопку "показать еще"
  const screenWidth = document.documentElement.clientWidth; //будем действовать в зависимости от ширины экрана
  let startPoint = document.querySelectorAll('.results__card').length; //стартовый порядковый номер массива для загрузки карточек 
  let endPoint; //конечный порядковый номер массива для загрузки карточек
  if (screenWidth > 550 && screenWidth < 750 || screenWidth > 1600) { // Будем загружать 4 карточки если на экране помещается 4 или 2 в ряд
    if (startPoint + (Math.ceil(startPoint / 4) + 1) * 4 <= articlesArr.length) { //проверим хватит ли в массиве карточек для загрузки
      endPoint = (Math.ceil(startPoint / 4) + 1) * 4; //Всегда будет загружаться количество карточек нужное до целого следующего ряда
    } else {
      endPoint = articlesArr.length; //если карточек осталось мало, то загрузим то, что осталось до конца 
    }
  } else { // Будем загружать 3 карточки если на экране помещается 3 или 1 в ряд
    if (startPoint + (Math.ceil(startPoint / 3) + 1) * 3 <= articlesArr.length) { //проверим хватит ли в массиве карточек для загрузки
      endPoint = (Math.ceil(startPoint / 3) + 1) * 3; //Всегда будет загружаться количество карточек нужное до целого следующего ряда
    } else {
      endPoint = articlesArr.length; //если карточек осталось мало, то загрузим то, что осталось до конца
    }
  }
  for (let i = startPoint; i < endPoint; i++) {
    const cardElement = 
    this.create (changeImageToDefaultIfNeed(articlesArr[i].urlToImage),
                dateTransform(articlesArr[i].publishedAt), 
                articlesArr[i].title,
                articlesArr[i].description,
                articlesArr[i].source.name,
                articlesArr[i].url,
    );
    section.appendChild(cardElement);
    cardElement.querySelector('.text').textContent = trimText(cardElement);  
  }

  if (document.querySelectorAll('.results__card').length < articlesArr.length) { //если в локалСторадж еще остались незагруженные карточки
  const moreButton = document.createElement('button');                           //то нужно нарисовать кннопку "Показать еще"
  moreButton.classList.add('results__more', 'button-text', 'button');
  moreButton.textContent = 'Показать еще';
  moreButton.addEventListener('click', () => {
    const newCards = new Card;
    newCards.downloadSomeNewCards();
  });
  resultsContainer.appendChild(moreButton);
  }
}

  create(imgLink, date, title, text, source, linkPage) {
    const resultCard = document.createElement('div');
      resultCard.classList.add('results__card');
    const cardImg = document.createElement('img');
      cardImg.classList.add('results__card-cover');
      cardImg.setAttribute('src', imgLink);
    const cardDate = document.createElement('p');
      cardDate.classList.add('results__card-content', 'date')
      cardDate.textContent = date;
    const cardTitle = document.createElement('h4');
      cardTitle.classList.add('results__card-content', 'title-mini')
      cardTitle.textContent = title;
    const outerContainer = document.createElement('div');
      outerContainer.classList.add('.results__outer-container');  
    const cardTextContainer = document.createElement('div');  
      cardTextContainer.classList.add('results__card-content','results__text-container');
    const cardText = document.createElement('p');
      cardText.classList.add('text')
      cardText.textContent = text;
    const cardSource = document.createElement('p');
      cardSource.classList.add('results__card-content', 'source')
      cardSource.textContent = source;
    const cardButton = document.createElement('a');
      cardButton.classList.add('results__card-button');
      cardButton.setAttribute('href', linkPage);  
      cardButton.setAttribute('target', '_blank');

    cardTextContainer.appendChild(cardText);
    outerContainer.appendChild(cardTextContainer);
    resultCard.appendChild(cardImg);
    resultCard.appendChild(cardDate);
    resultCard.appendChild(cardTitle);
    resultCard.appendChild(outerContainer);
    resultCard.appendChild(cardSource);
    resultCard.appendChild(cardButton);
    return resultCard;  
  }
}

export class RenderCommitCards {
  constructor(adressToRequest, requestClass) {
      this.adress = adressToRequest;
      this.render(requestClass)
  }

  async render(requestClass) {
      let data = new requestClass;
      await data.request()
          .then(result => {
              result.forEach(el => {
                  let slide = document.createElement('div');
                      slide.classList.add('swiper-slide');
                  let date = document.createElement('p');
                      date.classList.add('date');
                      date.textContent = dateTransform(el.commit.committer.date);
                  let headContainer = document.createElement('div');
                      headContainer.classList.add('swiper-slide__head-container');
                  let slideIcon = document.createElement('div');
                      slideIcon.classList.add('swiper-slide__icon');
                  let slideImg = document.createElement('img');
                      slideImg.classList.add('swiper-slide__img');
                      slideImg.setAttribute('alt', 'Фото автора коммита');
                      slideImg.setAttribute('src', el.author.avatar_url);
                  let slideTitleContainer = document.createElement('div');
                      slideTitleContainer.classList.add('swiper-slide__title-container');
                  let slideTitle = document.createElement('h4');
                      slideTitle.classList.add('title-mini');
                      slideTitle.textContent = el.commit.committer.name;
                  let slideEmail = document.createElement('p');
                      slideEmail.classList.add('swiper-slide__email');
                      slideEmail.textContent = el.commit.committer.email;
                  let slideText = document.createElement('p');
                      slideText.classList.add('text');
                      slideText.textContent = el.commit.message;
                  slideIcon.appendChild(slideImg);
                  slideTitleContainer.appendChild(slideTitle);               
                  slideTitleContainer.appendChild(slideEmail);
                  headContainer.appendChild(slideIcon);
                  headContainer.appendChild(slideTitleContainer);
                  slide.appendChild(date);
                  slide.appendChild(headContainer);
                  slide.appendChild(slideText);
                  swiperWrapper.appendChild(slide);
              })
          })
      new Swiper('.swiper-container', numberOfSlides());
    
  }
}