
function getJSON() {
  fetch("../js/kidsSlider.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data received:", data);
      addData(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

getJSON();

const sliderContainer = document.querySelector(".kidsSlider__cards");


function addData(data){
    console.log(data);
    cardsCount = data.length;
    data.forEach((item) => {

        //create the productcards that has to contain the info in the json file
        const productCard = document.createElement("section");
        productCard.classList.add("kidsSlider__card");
        productCard.setAttribute("data-id", item.id);
        sliderContainer.appendChild(productCard);

        //create the img element
        const productImage = document.createElement("img");
        productImage.src = item.image;
        productImage.classList.add("kidsSlider__image");
        productCard.appendChild(productImage);

        //create the image credit
        const imageCredit = document.createElement("p");
        imageCredit.textContent = item.imageCredit;
        imageCredit.classList.add("imageCredit");
        productCard.appendChild(imageCredit);

        //create the title
        const productTitle = document.createElement("h6");
        productTitle.textContent = item.title;
        productTitle.classList.add("kidsSlider__title");
        productCard.appendChild(productTitle);

        //create the location
        const productDescription = document.createElement("p");
        productDescription.textContent = item.location;
        productDescription.classList.add("kidsSlider__location");
        productCard.appendChild(productDescription);

        //Create the heart
        const addAsWish = document.createElement('button');
        addAsWish.classList.add('addAsWish');
        const addAsWishIcon = document.createElement('img');
        addAsWishIcon.src = '../images/icon__heart.svg';
        addAsWishIcon.classList.add('addAsWishIcon');
        addAsWish.appendChild(addAsWishIcon);
        productCard.appendChild(addAsWish);

        if (item.id === "3"){
          productCard.classList.add("kidsSlider__card--focus");
        }
    });
}

const ageButtons = document.querySelectorAll('.ageButton');
ageButtons.forEach ((ageButton) =>{
  ageButton.addEventListener('click', () => {
    
    ageButton.classList.toggle('--active');
  })
})

const next = document.querySelector('.slider__arrow--next');
const prev = document.querySelector('.slider__arrow--previous');


prev.addEventListener("click", moveSlider);
next.addEventListener("click", moveSlider);

let cardInFocus = 3;
let cardsCount = sliderContainer.children.length;

function moveSlider(e) {
    if (e.currentTarget === prev) {
        cardInFocus -= 1;
        if (cardInFocus < 1) {
            cardInFocus = cardsCount;
        }
    }

    if (e.currentTarget === next) {
        cardInFocus += 1;
        if (cardInFocus > cardsCount) {
            cardInFocus = 1;
        }
    }

    const formerFocus = sliderContainer.querySelector(".kidsSlider__card--focus");
    if (formerFocus) {
        formerFocus.classList.remove("kidsSlider__card--focus");
    }

    const newFocus = sliderContainer.querySelector(`.kidsSlider__card[data-id="${cardInFocus}"]`);
    if (newFocus) {
        newFocus.classList.add("kidsSlider__card--focus");
    }

    adaptKidsSlider(e.currentTarget === prev);
}

function adaptKidsSlider(prev) {
    const cards = Array.from(sliderContainer.children); // Convert NodeList to array
    if (prev) {
        const card = cards.pop(); // Method that removes the last element in an array (aka removes the last card)
        sliderContainer.removeChild(card);
        sliderContainer.insertBefore(card, cards[0]);
    } else {
        const card = cards.shift(); // Method that removes the first element in an array (aka removes the first card)
        sliderContainer.removeChild(card);
        sliderContainer.appendChild(card);
    }
}
