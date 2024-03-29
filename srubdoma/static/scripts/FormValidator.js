export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
    this._email = this._form.querySelector('#id_e_mail');
  }

  _showEmailError(errorText) {
    switch(true) {
      case this._email.validity.valueMissing:
        errorText.textContent = 'Заполните это поле';
        break;
      case this._email.validity.patternMismatch:
      case this._email.validity.typeMismatch:
        errorText.textContent = 'Email-адрес должен соответствовать действительному формату';
        break;
    }
  }

  _showTextError(input, errorText) {
    switch(true) {
      case input.validity.valueMissing:
        errorText.textContent = this._config.errorConfig[input.name].valueMissing;
        break;
      case input.validity.patternMismatch:
      case input.validity.typeMismatch:
        errorText.textContent = this._config.errorConfig[input.name].patternMismatch;
        break;
    }
  }

  // функция показа ошибки при вводе неверных данных в input
  _showInputError(formInput, errorMessage) {
    const errorText = this._form.querySelector(`.${formInput.name}-error`);
    formInput.classList.add(this._config.inputErrorClass);
    errorText.classList.add(this._config.errorClass);

    formInput === this._email ? this._showEmailError(errorText) : this._showTextError(formInput, errorText);

    errorText.style.height = `${errorText.scrollHeight + 4}px`;

  }
  // функция скрытия ошибки при вводе неверных данных в input
  _hideInputError(formInput) {
    const errorText = this._form.querySelector(`.${formInput.name}-error`);

    formInput.classList.remove(this._config.inputErrorClass);
    errorText.classList.remove(this._config.errorClass);
    errorText.textContent = '';
    errorText.style.height = `0px`;
  }
  // функция проверки input'a на валидность
  _isValid(formInput, errorMessage) {
    return !formInput.validity.valid
    ? this._showInputError(formInput, errorMessage)
    : this._hideInputError(formInput);
  }
  // функция дезактивации кнопки отправки формы
  _deactivateSubmitButton() {
    this._submitButton.classList.add(this._config.inactiveButtonClass);
    this._submitButton.setAttribute('disabled', '');
  }
  // функция активации кнопки отправки формы
  _activateSubmitButton() {
    this._submitButton.classList.remove(this._config.inactiveButtonClass);
    this._submitButton.removeAttribute('disabled');
  }
  // функция изменения статуса кнопки в зависимости от валидности формы
  _toggleBtnForm() {
    return this._form.checkValidity()
    ? this._activateSubmitButton()
    : this._deactivateSubmitButton();
  }
  //функция очистки текста ошибок в форме
  resetValidation() {
    this._toggleBtnForm();
    this._inputList.forEach(item => this._hideInputError(item));
  }

  // функция присвоения обработчиков input'ам формы
  _setInputEventListeners() {
    // предварительная проверка input'ов для определения статуса кнопки
    this._toggleBtnForm();

    this._inputList.forEach(item => {
      item.addEventListener('input', (e) => {
        this._isValid(item, item.validationMessage);

        // активация кнопки при валидности заполняемых данных формы
        this._toggleBtnForm();
      });

    });

    this._form.addEventListener('reset', () => { this._deactivateSubmitButton() });
  }
  //функция активации валидации формы
  enableValidation() {
    // запуск для каждого input'а валидации
    this._setInputEventListeners();
  }
}
