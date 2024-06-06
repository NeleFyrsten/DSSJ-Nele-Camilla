/**
 * 1. progressBar: scroll
 * 2. category you come from is checked
 * 3. all categories = all checked
 * 4. age + accessibility --> when you click label checkbox is checked (active class!)
 * 5. interval: only one check allowed
 * 6. submit --> velkommen "fornavn"
 * 7. open/close animation 
 * 8. when opening newsletter --> hide welcome text beneath
 *
 * fornavn: localstorage
 * 
 */


// open newsletter
const openButton = document.querySelector('.openNewsletter');
openButton.addEventListener('click', openNewsletter);

function openNewsletter() {
    const inform = document.querySelector('.newsletter__inform');
    inform.classList.toggle('active');

    const signUp = document.querySelector('.newsletter__signUp');
    signUp.classList.toggle('active');

    const welcome = document.querySelector('.welcome');
    welcome.classList.toggle('inactive');
}