import "../src/styles/about.css";
import "../src/swiper.js";

import { gitHubApiAdress } from "./js/constants";
import { GitHubApi } from "./js/gitHubApi";
import { newRenderCommitCards } from "./js/renderCommitCards";
import { numberOfSlides } from "./js/utils"
import Swiper from "swiper";

newRenderCommitCards.render();

window.addEventListener("resize", () => {
  new Swiper('.swiper-container', numberOfSlides())
});
// window.addEventListener("resize", () => {
//     new Swiper ('.swiper-container', numberOfSlides());
//   });
// window.addEventListener("resize", () => {
//     new Swiper ('.swiper-container', numberOfSlides());
//   });
