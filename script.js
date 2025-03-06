'use strict';

/**
 * PRELOAD
 *
 * Loading will end after the document is loaded
 */
const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
});

/**
 * Add event listener to multiple elements
 */
const addEventOnElements = function (elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener(eventType, callback);
    }
};

/**
 * NAVBAR TOGGLE
 */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNavbar);


const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScollPos =0;

const hideHeader = function () {
    const isScrollBottom = lastScollPos < window.scrollY;
    if (isScrollBottom) {
        header.classList.add("hide");
    } else {
        header.classList.remove("hide");
    }

    lastScollPos = window.scrollY;
}


window.addEventListener("scroll",function () {
    if (window.scrollY >= 50 ) {
        header.classList.add("active");
        backTopBtn.classList.add("active");
        hideHeader();
    } else {
        header.classList.remove("active");
        backTopBtn.classList.remove("active");
    }
});

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]")

let currentSlidesPos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
    lastActiveSliderItem.classList.remove("active");
    heroSliderItems[currentSlidesPos].classList.add("active");
    lastActiveSliderItem = heroSliderItems[currentSlidesPos];
}

const slideNext = function () {
    if (currentSlidesPos >= heroSliderItems.length - 1){
        currentSlidesPos = 0;
    } else {
        currentSlidesPos++;
    }

    updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
    if (currentSlidesPos <= 0 ) {
        currentSlidesPos = heroSliderItems.length -1;
    } else {
        currentSlidesPos--;
    }

    updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);


let autoSlideInterval;

const autoSlide = function() {
    autoSlideInterval = setInterval(function() {
        slideNext();
    }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function(){
    clearInterval(autoSlideInterval);
} );

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn],"mouseout", autoSlide);

window.addEventListener("load", autoSlide);


const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

    x = (event.clientX / window.innerWidth * 10) - 5;
    y = (event.clientY / window.innerHeight * 10) - 5;

    x = x - (x * 2);
    y = y = (y *2 );

    for(let i = 0, len = parallaxItems.length; i < len; i++) {
        x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
        y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
        parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
    }

});

