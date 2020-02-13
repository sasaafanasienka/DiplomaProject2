import "../src/styles/about.css";
import "../src/swiper.js";

import { gitHubApiAdress } from "./js/constants";
import { GitHubApi } from "./js/gitHubApi";
import { RenderCommitCards } from "./js/components";
import { numberOfSlides } from "./js/utils"

new RenderCommitCards(gitHubApiAdress, GitHubApi);

window.addEventListener("resize", () => {
    new Swiper ('.swiper-container', numberOfSlides());
  });