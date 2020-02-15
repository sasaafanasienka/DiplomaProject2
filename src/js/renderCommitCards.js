import { swiperWrapper } from "./constants.js";
import { numberOfSlides, dateTransform } from "./utils.js"
import { newGitHubApiRequest } from "./gitHubApi.js";

class RenderCommitCards {
    constructor(adressToRequest) {
        this.adress = adressToRequest;
    }
  
    async _render() {
        await newGitHubApiRequest.request()
            .then(result => {
                result.forEach(el => {
                    const slide = document.createElement('div');
                          slide.classList.add('swiper-slide');
                    const date = document.createElement('p');
                          date.classList.add('date');
                          date.textContent = dateTransform(el.commit.committer.date);
                    const headContainer = document.createElement('div');
                          headContainer.classList.add('swiper-slide__head-container');
                    const slideIcon = document.createElement('div');
                          slideIcon.classList.add('swiper-slide__icon');
                    const slideImg = document.createElement('img');
                          slideImg.classList.add('swiper-slide__img');
                          slideImg.setAttribute('alt', 'Фото автора коммита');
                          slideImg.setAttribute('src', el.author.avatar_url);
                    const slideTitleContainer = document.createElement('div');
                          slideTitleContainer.classList.add('swiper-slide__title-container');
                    const slideTitle = document.createElement('h4');
                          slideTitle.classList.add('title-mini');
                          slideTitle.textContent = el.commit.committer.name;
                    const slideEmail = document.createElement('p');
                          slideEmail.classList.add('swiper-slide__email');
                          slideEmail.textContent = el.commit.committer.email;
                    const slideText = document.createElement('p');
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

  export const newRenderCommitCards = new RenderCommitCards();