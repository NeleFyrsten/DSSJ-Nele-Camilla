const hamburger = document.querySelector(".hamburger"); //div
const navMenu = document.querySelector(".navbar__menu"); //ul with all menu links
const backButton = document.querySelector(".backButton"); //svg arrow

hamburger.addEventListener("click", openMenu);
backButtonNewsletter.addEventListener("click", closeMenu);

function openMenu() { //open and close menu in mobile
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

function closeMenu() { //when the svg arrow is clicked it closes the menu
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}