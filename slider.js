// functions:
// 1. get images, add them to the slider
// 2. arrows -> slide to the next category
// 3. focus class on the one in the middle
// 4. change pagecontent (?)

// get images
function getImages() {
    fetch(images.json)
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
    for (const image of data) {
        if (image.location === "categorySlider") { //check where the image is supposed to be shown (location), in this case categorySlider
            const categorySliderCard = document.querySelectorAll('categorySlider__card');


        } 
    }

}


// get buttons
const SliderButtonNext = document.querySelector('.slider__arrow--next');
const SliderButtonPrev = document.querySelector('.slider__arrow--previous');