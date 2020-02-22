import { ERRORMESSAGES } from "./constants";
import { newSearch } from "./search";

export class SendForm {

  constructor(form) {
      this.form = form;
  }

  sendRequest() {
    newSearch.searching();
  }

  inputValueValidation(form) {
    let errorCode; 
    if (this.form.validity.valueMissing) {
      errorCode = 'noLength'
    } else if (this.form.value.length === 1 || this.form.value.length > 30) {
      errorCode = 'invalidLength'
    } else {
      errorCode = 'noError'
    }
    this._formValidation(errorCode);
  }

  _formValidation(errorCode) {
    if (errorCode === 'noError') {
      this.sendRequest();
    } else {
      this._renderErrorMessage(errorCode);
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
    this._renderErrorMessage(newErrorCode);    
  }

  _renderErrorMessage(errorCode) {
    this.form.previousElementSibling.textContent = ERRORMESSAGES[errorCode];
  }
}