import { ERRORMESSAGES } from "./constants";
import { CardList, Card } from "./components";
import { Search } from "./search";
import { NewsApi } from "./modules";
import { LocStor } from "./localStorage";

export class SendForm {

  constructor(form) {
      this.form = form;
      this.inputValueValidation(form);
  }

  sendRequest() {
    new Search(CardList, Card, NewsApi, LocStor);
  }

  inputValueValidation() {
    let errorCode; 
    if (this.form.validity.valueMissing) {
      errorCode = 'noLength'
    } else if (this.form.value.length === 1 || this.form.value.length > 30) {
      errorCode = 'invalidLength'
    } else {
      errorCode = 'noError'
    }
    this.formValidation(errorCode);
  }

  formValidation(errorCode) {
    if (errorCode === 'noError') {
      this.sendRequest();
    } else {
      this.renderErrorMessage(errorCode);
      this.form.addEventListener('input', () => {
      this.liveValidation(errorCode)})
    } 
  }

  liveValidation() {
    let newErrorCode; 
    if (this.form.validity.valueMissing) {
      newErrorCode = 'noLength'
    } else if (this.form.value.length === 1 || this.form.value.length > 30) {
      newErrorCode = 'invalidLength'
    } else {
      newErrorCode = 'noError'
    }
    this.renderErrorMessage(newErrorCode);    
  }

  renderErrorMessage(errorCode) {
    this.form.previousElementSibling.textContent = ERRORMESSAGES[errorCode];
  }

}