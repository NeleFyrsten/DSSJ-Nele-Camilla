// functions:
// 1. get images, add them to the slider
// 2. arrows -> slide to the next category
// 3. focus class on the one in the middle
// 4. change pagecontent (?)


// get images
function getData() {
    fetch("js/categorySlider.json")
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

            //implementing the found data into html
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
getData()


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

//default cardInFocus: ALleKategorier
let cardInFocus = 4;

//function: move the slider in the right direction and focus the right card
function moveSlider(e) { //e = event the call comes from (either arrowPrev or arrowNext)
    const slider = document.querySelector('.categorySlider');
    
    // if you click on a card instead of an arrow
    //currentTarget: where it came from in this script, not where i actually clicked on
    if (e.currentTarget.classList.contains("categorySlider__card")) {
        const cardID = e.currentTarget.getAttribute("imageID");
        cardInFocus = parseInt(cardID);
    }

    if (e.currentTarget === sliderArrowPrev) {
        if (cardInFocus > 1) { //if there are no cards to the right -> don't move
            cardInFocus -= 1;
        }
    }

    if (e.currentTarget === sliderArrowNext) {
        if (cardInFocus < sliderCard.length) {
            cardInFocus += 1;
        }
    }
    
    // change the variable in css to the cardInFocus, so all the calculations work
    document.documentElement.style.setProperty("--currentCard", cardInFocus);

    // ----- changing focus card ------
    console.log(cardInFocus);
    // removing the focus class of the former focus card
    const formerFocus = document.querySelector('.categorySlider__card.focus');
    formerFocus.classList.remove('focus');

    // looking for the card, that should be in focus now->looking for attribute with []
    const newFocus = document.querySelector(`.categorySlider__card[imageID="${cardInFocus}"]`);
    console.log(newFocus); 
    newFocus.classList.toggle('focus');

    // getting the ID of the newFocus page, whose content we'd like to show
    // we need the id to get the right data from the json file
    const currentPage = parseInt(newFocus.getAttribute('imageID'));
    console.log(currentPage)

    getPageData(currentPage)
}

/** ________________________________________
 *          CHANGE PAGE CONTENT
    ________________________________________*/

function getPageData(id) {
    fetch("js/categorySlider.json")
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log('Data received:', data);
        // id is the currentPage id. cardIDs start at 1, arrayobjects at [0], therefor -1
        // this enables us to just let the relevant object through to the next function
        adaptHeroSection(data[id - 1]);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
// --> now we have the data of the page we want to look at

//change content of the page:
/**
 * we want to achieve a smooth effect: just the pictures should be changed, the slider
 * should remain as it is
 * -->
 * just change main content (fetch from another html file)
 * change background-image of hero section,
 * change content of hero section (don't forget extra classes)
 *
 * 2.find the matching content in json file
 * 3.replace src of heroImage and textContent of text
 * 4.replace the main content with another html file
 */

function adaptHeroSection(data) {
    
    console.log(data);

    // implement data in index.html
    
    const heroImage = document.querySelector('.heroSection__backgroundImage');
    heroImage.src = `${data.heroImage}`;

    const heroTitle = document.querySelector('.heroSection__title');
    heroTitle.textContent = `${data.heroTitle}`

    const heroDescription = document.querySelector('.heroSection__description');
    heroDescription.textContent = `${data.heroDescription}`

    const imageCredit = document.querySelector('.imageCredit'); //possible, because this is the first Credit on the page
    imageCredit.textContent = `Foto: ${data.imageCredit}`;
    
    
    // "Alle kategorier" and the others differ in certain elements, such as image, sliderBackground and description in mobile mode
    // variables, which are needed in both cases, but are used differently:
    const heroText = document.querySelector('.heroSection__text');
    const heroDescriptionMobile = document.querySelector('.heroSection__description--mobile');
    const heroImageMobile = document.querySelector('.heroSection__backgroundImage--mobile');
    const slider = document.querySelector('.categorySlider');
    const socialMedia = document.querySelector('.socialMedia');
    
    if (data.id === "4") {
        heroImageMobile.src = `${data.heroImageMobile}`;
        heroDescriptionMobile.textContent = `${data.heroDescriptionMobile}`;

        //removing --category classes, because otherwise they're still there once a category page was chosen
        heroImage.classList.remove('heroSection__backgroundImage--category');
        heroText.classList.remove('heroSection__text--category');
        slider.style.background = 'linear-gradient(0deg, #0a423c 0%, #0a423c calc(100% - 50px), #ffffff00 calc(100% - 20px))';
        socialMedia.style.display = 'flex';
    }

    else {
        heroImageMobile.src = `${data.heroImage}`;
        heroDescriptionMobile.textContent = `${data.heroDescription}`;

        heroImage.classList.add('heroSection__backgroundImage--category');
        heroText.classList.add('heroSection__text--category');
        heroText.classList.remove('.heroSection__text')
        slider.style.background = 'linear-gradient(0deg, #21171F 0%, #21171F calc(100% - 50px), #ffffff00 calc(100% - 20px))';
        socialMedia.style.display = 'none'
    }
}   

