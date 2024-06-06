/**
 * 1. progressBar: scroll
 *     
 * 6. submit --> velkommen "fornavn"
 *         
 * fornavn: localstorage
 * 
 */

//global variables
const inform = document.querySelector('.newsletter__inform');
const signUp = document.querySelector('.newsletter__signUp');
const welcome = document.querySelector('.welcome');

// open newsletter
const openNewsletter = document.querySelector('.openNewsletter');
openNewsletter.addEventListener('click', () => {

        inform.classList.toggle('active');
        signUp.classList.toggle('active');
        welcome.classList.toggle('inactive');
});
    
//close newsletter
const closeNewsletter = document.querySelector('.icon__close');
closeNewsletter.addEventListener('click', () => {

        signUp.classList.toggle('active');
        inform.classList.toggle('active');
        welcome.classList.toggle('inactive');
});


//check all categories 
const allCategories = document.querySelector('.newsletter__checkbox--allCategories');
allCategories.addEventListener('change', checkAllCategories);

function checkAllCategories() {
    const category = document.querySelectorAll('.newsletter__checkbox');

    if(allCategories.checked == true) {
        category.forEach(checkbox => {
            checkbox.checked = true;
        })
    }

    else {
        category.forEach(checkbox => {
            checkbox.checked = false;
        })
    }
}

//submitting
const submitButton = document.querySelector('.newsletter__submitButton');
const signUpForm = document.querySelector('.newsletter__signUpForm');
const submittedScreen = document.querySelector('.newsletter__submitted');

submitButton.addEventListener('click', submissionComplete) 

function submissionComplete() {
    // getting the name
    const inputFirstName = document.querySelector('.newsletter__firstName');   
    const firstName = inputFirstName.value;

    const welcome = document.querySelector('.newsletter__headline--submitted');
    welcome.textContent = `Velkommen ${firstName}!`;
    // changing content of right side
    signUpForm.classList.toggle('active');
    submittedScreen.classList.toggle('active');
}

//tilbage til siden
const backButton = submittedScreen.querySelector('button');
console.log(backButton);
backButton.addEventListener('click', backToPage);

function backToPage() {
    signUp.classList.toggle('active');
    inform.classList.toggle('active');
    welcome.classList.toggle('inactive');

    signUpForm.classList.toggle('active');
    submittedScreen.classList.toggle('active');    
}





