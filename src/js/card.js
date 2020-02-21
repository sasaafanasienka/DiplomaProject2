import placeHoldImage from "../images/no_image_in_news.svg";

class Card {

  create(imgLink, date, title, text, source, linkPage) {
    const resultCard = document.createElement('div');
      resultCard.classList.add('results__card');
    const cardImg = document.createElement('img');
      cardImg.classList.add('results__card-cover');
      cardImg.setAttribute('src', imgLink);
      cardImg.onerror = () => {                       //если картинка не загружается
        cardImg.setAttribute('src', placeHoldImage);  //то вставим на ее место заглушку
      }
      cardImg.setAttribute('alt', 'Обложка новости');
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

export const newCard = new Card();