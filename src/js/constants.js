export const searchInput = document.querySelector('.head-block__search-input');
export const searchButton = document.querySelector('.head-block__search-button');

export const newsApiAdress = 'https://newsapi.org/v2/everything?';
export const token = '24337bfa4224440baa15c36b5bdddec0';

export const gitHubApiAdress = 'https://api.github.com/repos/sasaafanasienka/DiplomaProject2/commits';

export const body = document.querySelector('.body');

export const resultsContainer = document.querySelector('.results');
export const cardsContainer = document.querySelector('.results__card-container');

export const swiperWrapper = document.querySelector('.swiper-wrapper'); 

export const months = {
    '0': ['январь', 'января'],
    '1': ['февраль', 'февраля'],
    '2': ['март', 'марта'],
    '3': ['апрель', 'апреля'],
    '4': ['май', 'мая'],
    '5': ['июнь', 'июня'],
    '6': ['июль', 'июля'],
    '7': ['август', 'августа'],
    '8': ['сентябрь', 'сентября'],
    '9': ['октябрь', 'октября'],
    '10': ['ноябрь', 'ноября'],
    '11': ['декабрь', 'декабря'],
}

export const daysOfTheWeek = {
    '0': 'вс',
    '1': 'пн',
    '2': 'вт',
    '3': 'ср',
    '4': 'чт',
    '5': 'пт',
    '6': 'сб',
}

export const ERRORMESSAGES = {
    noError: '',
    invalidLength: 'Должно быть от 2 до 30 символов',
    noLength: 'Это обязательное поле',
  }