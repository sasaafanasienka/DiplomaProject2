// Вычисление текущей даты и даты неделю назад в правильном формате
export const date1 = new Date();
export const curDate = date1;
export const currentDate = date1.toJSON().slice(0,10);
let date2 = new Date(date1.getFullYear(), date1.getMonth() , date1.getDate() - 5);
export const pastDate = date2.toJSON().slice(0,10);

//Преобразование формата даты
import {months, ERRORMESSAGES} from './constants.js';

export function dateTransform(dateOfPublication) {
    let fulldate = new Date(dateOfPublication);
    return `${fulldate.getDate()} ${months[fulldate.getMonth()][1]}, ${fulldate.getFullYear()}`;
}

//Функцмия заменяющая изображение на заглушку, если изображение не загружается
export function changeImageToDefaultIfNeed(imageURL) {
    let image;
    if (imageURL === null) {
        image = './images/no_image_in_news.svg';
    } else {
        image = imageURL;
    }
    return image;            
}

//Функция удаляет элемент, если он есть на странице
export function deleteElement(parentNode, classElementToDelete) {
if (document.querySelector(classElementToDelete) !== null) {                //если элемент есть на странице,
    parentNode.removeChild(document.querySelector(classElementToDelete));  //то ее нужно удалить
  }
}

//Функция добавляет значение поля ввода в шаблон запроса и возвращает готовый запрос
import {newsApiAdress, token} from './constants';

export function generateRequestTemplate(inputValue) {
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

      let options = {
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
  let outerContainer = card;
  let textContainer = card.querySelector('.results__text-container');
  let textFrame = textContainer.querySelector('.text');
  let text = textFrame.textContent;
  let clone = document.createElement('div');

  // console.log(textFrame)  
  // console.log(`${textFrame}`)  
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