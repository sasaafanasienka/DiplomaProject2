import { daysOfTheWeek, months, daysPerWeek, msPerDay } from "./constants";

class AnalyticsRender {
    constructor() {
        this.totalResult = JSON.parse(localStorage.getItem('result')).totalResults;
        this.articles = JSON.parse(localStorage.getItem('result')).articles;
        this.wordToSearch = localStorage.getItem('wordToSearch');
    }

    _renderTitle() {
        document.querySelector('.analytics__title').textContent = `Вы спросили: ${this.wordToSearch}`;
        document.querySelector('.analytics__news-number').textContent = `${this.totalResult}` 
        document.querySelector('.analytics__titles-number').textContent = `${this._titlesCount()}`
    }

    _titlesCount() {
        let numberOfTitles = 0;
        this.articles.forEach((element) => {
            if (element.title.toLowerCase().includes(this.wordToSearch.toLowerCase())) {
                numberOfTitles++;
            }
        })
        return numberOfTitles;
    }

    _calculationForAxisDates() {

        let monthsArr = [];
        let datesObject = {}; // создаем объект в который потом запишем, сколько раз встречается каждая дата публикации
        
        for (let i = 1; i <= daysPerWeek; i++) {
            const date = new Date(new Date().getTime() - (daysPerWeek - i) * msPerDay); //86400000 секунд в сутках
            document.querySelector(`.graph__data-date_${i}`).textContent =
                `${date.getDate()}, ${daysOfTheWeek[date.getDay()]}`;
            const month = months[date.getMonth()][0];
            if (!monthsArr.includes(month)) {
                monthsArr.push(month);
            }
            datesObject[date.getDate()] = 0;
        }
        document.querySelector('.graph__head-month').textContent = `дата (${monthsArr.join(', ')})`
        this._calculationForRows(this.articles, datesObject);
    }

    _calculationForRows(data, object) {
        let rowWidth;
        data.forEach((elem) => {
            object[new Date(elem.publishedAt).getDate()] = 
            object[new Date(elem.publishedAt).getDate()] + 1 
        })
        for (let i = 1; i <= daysPerWeek; i++) {

            rowWidth = object[Object.keys(object)[i - 1]] / 100 * 91; //91% - ширина выделенная в верстке для этого элемента
            const rowGraphElement = document.querySelector(`.graph__data-row_${i}`);               
            rowGraphElement.style.width = `${rowWidth}%`

            const newGraphText = document.createElement('p');
            newGraphText.classList.add(`graph__data-text_${i}`, 'graph__data-text');
            newGraphText.textContent = `${object[Object.keys(object)[i - 1]]}`
            
            if (object[Object.keys(object)[i - 1]] >= 4) {
                newGraphText.style.cssText = "position: absolute; top: 0%; bottom: 0%; left: 5px"
            } else if (object[Object.keys(object)[i - 1]] === 0) { 
                newGraphText.style.cssText = "position: absolute; top: 0%; bottom: 0%; left: 0; color: #2f71e5"
            } else {
                newGraphText.style.cssText = "position: absolute; top: 0%; bottom: 0%; right: -14px; color: #2f71e5"
            }
            rowGraphElement.appendChild(newGraphText);    
        }     
    }
}

export const newAnalyticsRender = new AnalyticsRender();