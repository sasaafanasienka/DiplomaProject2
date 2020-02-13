import "../src/styles/index.css";

import {searchButton,
        searchInput} from './js/constants.js'
        
import { SendForm } from "./js/form";

searchButton.addEventListener('click', () => {
    new SendForm(searchInput);
});

searchInput.addEventListener('keyup', () => {
    if (event.key == 'Enter') {
        new SendForm(searchInput);
    }
});