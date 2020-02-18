import "../src/styles/about.css";
import "../src/swiper.js";

import { newRenderCommitCards } from "./js/renderCommitCards";
import { numberOfSlides } from "./js/utils"
import Swiper from "swiper";

newRenderCommitCards.render();

window.addEventListener("resize", () => { //я так и не понял о каком методе reInit говорил ревьюер. в документации к свайперу ничего такого найти не поулчилось 
  new Swiper('.swiper-container', numberOfSlides())
});