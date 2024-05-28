
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

const sliderContainer = document.querySelector(".kidsSlider");

function addData(data){
    console.log(data);
    data.forEach((item) => {

        //create the productcards that has to contain the info in the json file
        const productCard = document.createElement("section");
        productCard.classList.add("kidsSlider__card");
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

        if (item.id === "3"){
          productCard.classList.add("kidsSlider__card--focus");
        }
    });
}