//Преобразование формата даты
import {months, ERRORMESSAGES, msPerDay, daysPerWeek} from './constants.js';
import placeHoldImage from "../images/no_image_in_news.svg";

export function dateTransform(dateOfPublication) {
    const fulldate = new Date(dateOfPublication);
    return `${fulldate.getDate()} ${months[fulldate.getMonth()][1]}, ${fulldate.getFullYear()}`;
}

//Функция заменяющая изображение на заглушку, если ссылки на изображение нет в ответе от Api
export function changeImageToDefaultIfNeed(imageURL) {
    let image;
      if (imageURL === null) {
        image = placeHoldImage;
      } else {
        image = imageURL;
      }
    return image;            
}

//Функция удаляет элемент, если он есть на странице
export function removeElementByClassName(classElementToDelete, parentNode) {
  if (document.querySelector(classElementToDelete) !== null) {                //если элемент есть на странице,
    parentNode.removeChild(document.querySelector(classElementToDelete));  //то их нужно удалить
  }
}

//Функция удаляет элемент, если он есть на странице
export function removeElement(elementToDelete, parentNode) {
  if (elementToDelete !== null) {
    parentNode.removeChild(elementToDelete);
  }
}

//Функция добавляет значение поля ввода в шаблон запроса, считает даты в правильном формате и возвращает готовый запрос
import {newsApiAdress, token} from './constants';

export function generateRequestTemplate(inputValue) {
    const date1 = new Date();
    const currentDate = date1.toJSON().slice(0,10);
    const date2 = new Date(date1 - msPerDay * (daysPerWeek - 1));
    const pastDate = date2.toJSON().slice(0,10);
    return  `${newsApiAdress}` + 
            'q=' + `${inputValue}` + '&' +
            'from=' + `${currentDate}` + '&' +
            'to=' + `${pastDate}` + '&' +
            'pageSize=100&' +
            'language=ru&' + 
            'apiKey=' + `${token}`;
}

//Функция рассчитывает объект опций для правильной инициализации слайдера на любом размере экрана
export function numberOfSlides() {

    let slidesCount;
    let slidesCentered;
    let marginLeft;

      if (document.documentElement.clientWidth > 1200) {
        marginLeft = document.documentElement.clientWidth * 0.071;
        slidesCount = 3.5;
        slidesCentered = false;
      } else if (document.documentElement.clientWidth > 1000) {
        marginLeft = document.documentElement.clientWidth * 0.071;
        slidesCount = 2.35;
        slidesCentered = true;
      } else if (document.documentElement.clientWidth > 750) {
        marginLeft = document.documentElement.clientWidth * 0.051;
        slidesCount = 2.22;
        slidesCentered = false;
      } else if (document.documentElement.clientWidth > 0) {
        marginLeft = document.documentElement.clientWidth * 0.051;
        slidesCount = 1.11;
        slidesCentered = true;
      }

      const options = {
        slidesPerView: slidesCount,
        spaceBetween: 10,
        initialSlide:	0,
        grabCursor: true,
        roundLengths: true,
        slidesOffsetBefore: marginLeft,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      }
      return options;
  }

//Валидация поля ввода
export function fieldValidation(item) {
  if (item.validity.valueMissing) {
     item.nextElementSibling.textContent = ERRORMESSAGES.noLength;
     return false
  }
  else if (item.value.length === 1 || item.value.length > 30) {
    item.nextElementSibling.textContent = ERRORMESSAGES.invalidLength;
    return false
  }
  else item.nextElementSibling.textContent = ERRORMESSAGES.noError;
  return true
}

//Функция обрезает текст до требуемой в карточке длины
export function trimText(card) {
  const outerContainer = card;
  const textContainer = card.querySelector('.results__text-container');
  const textFrame = textContainer.querySelector('.text');
  let text = textFrame.textContent;
  const clone = document.createElement('div');

  clone.classList.add('text');
  clone.style.cssText = `position: absolute;
                         visibility: hidden;
                         width: ${textContainer.clientWidth}px;
                         height: auto`;
  
  clone.textContent = text;
  outerContainer.appendChild(clone);

  var l = text.length - 1;
  for (; l >= 0 && clone.clientHeight > textContainer.clientHeight; --l) {
    clone.textContent = text.substring(0, l) + '...';
  }

  text = clone.textContent;
  outerContainer.removeChild(clone);
  return text;
}