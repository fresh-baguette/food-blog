// ========================================
// Site favicon
// ========================================
//
// The favicon files live in the same folder as script.js.
// This automatically finds that folder, whether the page is:
//
//   index.html
//   recipes/light-moussaka.html
//   recipes/zurek.html
//   etc.
//
// Therefore no favicon code has to be added to individual HTML files.
// ========================================

const siteScript = document.currentScript;

if (siteScript) {
    const siteRoot = new URL('.', siteScript.src);

    const faviconFiles = [
        {
            rel: 'icon',
            href: new URL('favicon.ico', siteRoot).href,
            sizes: 'any'
        },
        {
            rel: 'icon',
            href: new URL('favicon-48x48.png', siteRoot).href,
            type: 'image/png',
            sizes: '48x48'
        },
        {
            rel: 'apple-touch-icon',
            href: new URL('apple-touch-icon.png', siteRoot).href
        }
    ];

    faviconFiles.forEach((settings) => {
        const link = document.createElement('link');

        Object.entries(settings).forEach(([name, value]) => {
            link.setAttribute(name, value);
        });

        document.head.appendChild(link);
    });
}


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
// Multiple categories are allowed.
//
// Examples:
//
// data-category="Side"
// data-category="Side Main"
// data-category="Side/Main"
// data-category="Side, Main"
//
// All three multi-category forms above behave the same way.
// ========================================

const categoryButtons = [
    ...document.querySelectorAll('.category-button')
];

const recipeCards = [
    ...document.querySelectorAll('.recipe-card')
];


// Convert a card's category string into separate categories.
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

        // Highlight only the selected category button.

        categoryButtons.forEach((otherButton) => {
            otherButton.classList.toggle(
                'active',
                otherButton === button
            );
        });

        // Show only recipes belonging to the selected category.

        recipeCards.forEach((card) => {
            const categories = getCategories(card);

            const shouldShow =
                selectedCategory === 'All' ||
                categories.includes(selectedCategory);

            card.hidden = !shouldShow;
        });
    });
});