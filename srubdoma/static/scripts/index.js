import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";
import FormValidator from "./FormValidator.js";
import Popup from "./Popup1.js";

const root = document.querySelector(".root");
const menuBurger = root.querySelector(".menu-burger");
const menuBurgerSpans = root.querySelectorAll(".menu-burger__item");
const headerMenu = root.querySelector(".header__outer");
const anchors = root.querySelectorAll(".header__nav-link");
const kindsSliderEl = root.querySelector("#kinds-slider");
const stepsSliderEl = root.querySelector("#steps-slider");
const quotesSliderEl = root.querySelector("#quotes-slider");
const projectsSliderEl = root.querySelector("#projects-slider");
const openFornBtns = root.querySelectorAll('[data-open-popup=""]');
const telInput = root.querySelector(".request-popup__input_type_tel");
const isDesktop = window.matchMedia("(min-width: 1010px)").matches;

const toggleMenu = (isOpen) => {
  headerMenu.classList[isOpen ? "add" : "remove"]("_opened");
  menuBurgerSpans.forEach(function (item) {
    item.classList[isOpen ? "add" : "remove"]("menu-burger__item_active");
  });
};

function toggleHeaderMenu() {
  const isOpen = !headerMenu.classList.contains("_opened");

  toggleMenu(isOpen);
  !isDesktop && toggleRootDisable(isOpen);
}

const toggleRootDisable = (isDisable = true) => {
  root.classList[isDisable ? "add" : "remove"]("_disabled");
};

menuBurger.addEventListener("click", toggleHeaderMenu);

// перемещение к элементам сайта
anchors.forEach((anchor) => {
  anchor.addEventListener("click", () => toggleHeaderMenu(false));
});

const kindsSwiper = new Swiper(kindsSliderEl, {
  spaceBetween: 20,
  speed: isDesktop ? 1000 : 800,
  navigation: {
    nextEl: ".kinds__btn-next",
    prevEl: ".kinds__btn-prev",
  },
});

const stepsSwiper = new Swiper(stepsSliderEl, {
  spaceBetween: 20,
  slidesPerView: "auto",
  speed: 800,
  navigation: {
    nextEl: ".steps__btn-next",
    prevEl: ".steps__btn-prev",
  },
});

const quotesSwiper = new Swiper(quotesSliderEl, {
  spaceBetween: 20,
  slidesPerView: "auto",
  speed: 800,
  navigation: {
    nextEl: ".quotes__btn-next",
    prevEl: ".quotes__btn-prev",
  },
});

const projectsSwiper = new Swiper(projectsSliderEl, {
  effect: isDesktop && "fade",
  spaceBetween: 20,
  speed: 800,
  autoplay: isDesktop && {
    delay: 2500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  navigation: {
    nextEl: ".projects__btn-next",
    prevEl: ".projects__btn-prev",
  },
});

const requestPopup = new Popup(".request-popup");
const confirmPopup = new Popup(".confirm-popup");

const onOpenFormBtnClick = () => {
  requestPopup.open();
};

openFornBtns.forEach((btn) => {
  btn.addEventListener("click", onOpenFormBtnClick);
});

const telMask = new IMask(telInput, {
  mask: "+{7}-000-000-00-00",
});

Array.from(document.forms).forEach((item) => {
  const formValid = new FormValidator(
    {
      formSelector: ".popup__form",
      inputSelector: ".popup__input",
      submitButtonSelector: ".popup__button",
      inactiveButtonClass: "popup__button_disabled",
      inputErrorClass: "popup__input_type_error",
      errorClass: "popup__error_visible",
      errorConfig: {
        first_name: {
          valueMissing: "Заполните имя",
        },
        phone_number: {
          valueMissing: "Заполните номер телефона",
        },
      },
    },
    item
  );
  //включение валидации
  formValid.enableValidation();
});
