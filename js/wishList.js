const wishListIcon = document.querySelector('.wishlist');
const wishList = document.querySelector('.wishListSection');

wishListIcon.addEventListener('click', () => {
    wishList.classList.toggle('active');
});

const kidsSlider = document.querySelector('.kidsSlider__cards');

kidsSlider.addEventListener('click', (event) => {
    // Check if the clicked element is a '.addAsWish' button
    if (event.target.classList.contains('addAsWish')) {
        const addAsWishIcon = event.target.querySelector('.addAsWishIcon');
        if (addAsWishIcon) {
            addAsWishIcon.classList.toggle('--active');
            const product = event.target.parentNode;
            // Get the unique item ID
            const itemId = product.getAttribute('data-id');

            // Check if an item with the same itemId already exists in the wishList
            const existingItem = Array.from(wishList.children).find(item => item.getAttribute('data-id') === itemId);

            // Only add the item to the wishlist if it doesn't already exist, if it does exist, remove it.
            if (!existingItem) {
                makeWishItem(product);
            } else {
                removeWishItem(existingItem);
            }
        }
    }
});

//function for making the item and appending it into the wishlist
function makeWishItem(product) {
    const wishItem = product.cloneNode(true);
    wishList.appendChild(wishItem);
    wishItem.classList.remove('kidsSlider__card--focus');
}

//function for removing the item if it already existed in the wishlist
function removeWishItem(wishItem) {
    wishList.removeChild(wishItem);
}