// functions:
// 1. get images, add them to the slider
// 2. arrows -> slide to the next category
// 3. focus class on the one in the middle
// 4. change pagecontent (?)

// get images
function getImages() {
    fetch("categorySlider.json")
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log('Data received:', data);
        addImagesToSlider(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};

function addImagesToSlider(data) {
    // looking for the imageID of the categoryCard
    const categorySliderCard = document.querySelectorAll('.categorySlider__card');
    categorySliderCard.forEach(categoryCard => {
        
        const imageID = categoryCard.getAttribute('imageID');
        
        // looking for the image with the same id
        for (const object of data) {
            // getting the id of the object
            const objectId = object.id;
            console.log(objectId);
            
            if(imageID == objectId) {
                console.log(`the element ${imageID} is connected to the image ${objectId}`)
                // getting the img in the card
                const categorySliderImage = categoryCard.querySelector('.categorySlider__image'); //categoryCard instead of document -> finds the first one in this section 
                console.log(object.image);
                categorySliderImage.src = `${object.image}`;
                // getting the credit 
                const imageCredit = categoryCard.querySelector('.imageCredit');
                imageCredit.textContent = `Foto: ${object.imageCredit}`;
                return //otherwise it continues checking the other ones, after it has found the right one
            }
        }
    });
}
//calling the fetch function
getImages()


// ----------- move the slider --------------

//get the buttons and cards
const sliderArrowPrev = document.querySelector('.slider__arrow--previous');
const sliderArrowNext = document.querySelector('.slider__arrow--next');
const sliderCard = document.querySelectorAll('.categorySlider__card');

//events
sliderArrowPrev.addEventListener('click', moveSlider);
sliderArrowNext.addEventListener('click', moveSlider);
sliderCard.forEach(card => {
    card.addEventListener('click', moveSlider);
})


//imageID of the focus card in a variable -> we start with "all", which hast imageID=4
let cardInFocus = 4;
let cardCount = 0;

//function: move the slider in the right direction and focus the right card
function moveSlider(e) { //e = event the call comes from (either arrowPrev or arrowNext)
    const slider = document.querySelector('.categorySlider');
    console.log(e.target);

    // stop the slider from moving too far, hiding the arrow in that direction
    if (cardInFocus >= 8 || cardInFocus <= 1) {
        e.currentTarget.style.opacity = "0";
        return
    }

    // if you click on a card instead of an arrow
    //currentTarget: where it came from in this script, not where i actually clicked on
    if (e.currentTarget.classList.contains('categorySlider__card')) {
        const cardID = e.currentTarget.getAttribute('imageID');
        cardInFocus = cardID;
    }
   
    if (e.currentTarget === sliderArrowPrev) { 
        cardInFocus -= 1;
        cardCount += 200;
        // changing the margin variable in css
        document.documentElement.style.setProperty('--currentCard', cardCount + 'px');
    }

    if (e.currentTarget === sliderArrowNext) {
        cardInFocus += 1;
        cardCount -= 200;
        document.documentElement.style.setProperty('--currentCard', cardCount + 'px');
    }

    console.log(cardCount);

    // ----- changing focus card ------
    console.log(cardInFocus);
    // removing the focus class of the former focus card
    const formerFocus = document.querySelector('.categorySlider__card.focus');
    formerFocus.classList.remove('focus');

    // looking for the card, that should be in focus now->looking for attribute with []
    const newFocus = document.querySelector(`.categorySlider__card[imageID="${cardInFocus}"]`);
    console.log(newFocus); 
    newFocus.classList.toggle('focus');
}


//change content of the page:
/**
 * just change main content (fetch from another html file)
 * change background-image of hero section,
 * change content of hero section (don't forget extra classes)
 */