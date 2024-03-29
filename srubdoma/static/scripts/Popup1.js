export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this.popupOpenedClass = "popup_opened";
    this._popup = document.querySelector(this._popupSelector);
    this._closeBtn = this._popup.querySelector(".popup__close");
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    this._disableRoot = this._disableRoot.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this._root = document.querySelector(".root");

    this.setEventListeners();
  }

  // закрытие попапа через esc
  _handleEscClose(e) {
    if (e.key === "Escape") this.close();
  };

  // закрытие попапа через оверлей
  _handleOverlayClose(e) {
    if (e.target === e.currentTarget) this.close();
  };

  _disableRoot(isDisable = true) {
    this._root.classList[isDisable ? "add" : "remove"]("_disabled");
  };

  // открытие попапа
  open() {
    this._popup.classList.add(this.popupOpenedClass);
    this._disableRoot();

    document.addEventListener("keydown", this._handleEscClose);
  };

  // закрытие попапа
  close() {
    this._popup.classList.remove(this.popupOpenedClass);
    this._disableRoot(false);

    document.removeEventListener("keydown", this._handleEscClose);
  };

  // добавление обработчиков событий
  setEventListeners() {
    this._closeBtn.addEventListener("click", () => this.close());
    this._popup.addEventListener("click", this._handleOverlayClose);
  };
}
