// ========================================
// Mobile navigation
// ========================================

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');

if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');

        menuButton.setAttribute(
            'aria-expanded',
            String(isOpen)
        );
    });

    nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');

            menuButton.setAttribute(
                'aria-expanded',
                'false'
            );
        });
    });
}


// ========================================
// Current year in the footer
// ========================================

const year = document.getElementById('year');

if (year) {
    year.textContent = new Date().getFullYear();
}


// ========================================
// Recipe category filters
// ========================================
//
// A recipe may belong to one OR several categories.
//
// Examples:
//
// data-category="Side"
// data-category="Side Main"
// data-category="Side/Main"
// data-category="Side, Main"
//
// A Side/Main recipe will appear under both
// the Side and Main filters.
// ========================================

const categoryButtons = [
    ...document.querySelectorAll('.category-button')
];

const recipeCards = [
    ...document.querySelectorAll('.recipe-card')
];


// Turn the data-category text into a list.
//
// "Side"       -> ["Side"]
// "Side Main"  -> ["Side", "Main"]
// "Side/Main"  -> ["Side", "Main"]
// "Side, Main" -> ["Side", "Main"]

function getCategories(card) {
    return (card.dataset.category || '')
        .split(/[\s,\/]+/)
        .filter(Boolean);
}


categoryButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const selectedCategory = button.dataset.category;

        // Mark only the selected button as active.
        categoryButtons.forEach((otherButton) => {
            otherButton.classList.toggle(
                'active',
                otherButton === button
            );
        });

        // Show cards matching the selected category.
        recipeCards.forEach((card) => {
            const categories = getCategories(card);

            const shouldShow =
                selectedCategory === 'All' ||
                categories.includes(selectedCategory);

            card.hidden = !shouldShow;
        });
    });
});