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
    
//close newsletter (cross icon)
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
const submitBorder = document.querySelectorAll('.submit__border');

submitButton.addEventListener('click', submissionComplete) 

function submissionComplete() {
    //adding classes for the loading animation
    submitButton.classList.toggle('active');
    submitBorder.forEach((e) => {
        e.classList.toggle('active');
    })
    
    // getting and adding the name for the next page ("Velkommen ...")
    const inputFirstName = document.querySelector('.newsletter__firstName');   
    const firstName = inputFirstName.value;

    const welcome = document.querySelector('.newsletter__headline--submitted');
    welcome.textContent = `Velkommen ${firstName}!`;

    // changing content of right side
    setTimeout (() => {
        signUpForm.classList.toggle('active');
        submittedScreen.classList.toggle('active');
        closeNewsletter.style.display = "none";
    }, 5000)
    
}

//tilbage til siden
const backButtonNewsletter = submittedScreen.querySelector('button');
console.log(backButtonNewsletter);
backButtonNewsletter.addEventListener('click', backToPage);
//resetting all the classes in case user opens window again
function backToPage() {
    signUp.classList.toggle('active');
    inform.classList.toggle('active');
    welcome.classList.toggle('inactive');

    signUpForm.classList.toggle('active');
    submittedScreen.classList.toggle('active');   
    
    submitButton.classList.toggle('active');
    submitBorder.forEach((e) => {
        e.classList.toggle('active');
    })

    closeNewsletter.style.display = "block";
}


// progress bar

//register scroll movements in the form section
signUpForm.addEventListener('scroll', updateProgressBar);

function updateProgressBar() {
    // getting all the sections 
    const formSection = document.querySelectorAll('.newsletter__signUpForm > section');
    console.log(formSection);
    
    formSection.forEach((section) => {
        console.log(section.classList);
        // get information about section size and position relative to the viewport
        const rect = section.getBoundingClientRect();

        const halfWindow = window.innerHeight / 2;
        const sectionHeight = section.clientHeight;
        const bottomDistance = sectionHeight + rect.top;

        //section range: as long as the section touches the middle
        if (rect.top <= halfWindow && bottomDistance >= halfWindow) {

            //getting data-position of the section 
            const scrollPosition_section = section.dataset.position;
            console.log(`data-position for this section is ${scrollPosition_section}`);
            // getting data-position of the dots
            const progressBarDot = document.querySelectorAll('.progressBar__dot');

            progressBarDot.forEach((dot) => {
                const scrollPosition_dot = dot.dataset.position;
                console.log(`this dot has the scroll position ${scrollPosition_dot}`);
                
                
                if(scrollPosition_section === scrollPosition_dot) {
                    dot.classList.add('active')
                }
                else {
                    dot.classList.remove('active')
                }
            })
        }
    })
}