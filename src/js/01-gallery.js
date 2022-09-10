// Add imports above this line

// Рефакторинг з застосуванням шаблонізатора Handlebars

import galleryCardsTpl from '../templates/gallery-cards.hbs';
import galleryItems from '../js/gallery-items.json';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

// Change code below this line

console.log(galleryItems);

const cardSet = document.querySelector(".gallery");
const cardsMarkup = createImageCards(galleryItems);

cardSet.insertAdjacentHTML("beforeend", cardsMarkup);

function createImageCards(galleryItems) {
  return galleryCardsTpl(galleryItems);
};

new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
} );


// Рефакторинг просто за підключенням SimpleLightbox по npm //

// import SimpleLightbox from 'simplelightbox';
// import "simplelightbox/dist/simple-lightbox.min.css";
// import { galleryItems } from './gallery-items';
// // Change code below this line

// console.log(galleryItems);

// const cardSet = document.querySelector(".gallery");
// const cardsMarkup = createImageCards(galleryItems);

// cardSet.insertAdjacentHTML("beforeend", cardsMarkup);

// function createImageCards(items) {
//   return items
//     .map(({ preview, original, description }) => {
//       return `
//     <div class="gallery__item">
//     <a class="gallery__link" href="${original}">
//       <img class="gallery__image"
//       src="${preview}"
//       alt="${description}"
//     />
//   </a>
// </div>
//     `;
//     })
//     .join("");
// };
// new SimpleLightbox('.gallery a', {
//     captionsData: 'alt',
//     captionPosition: 'bottom',
//     captionDelay: 250,
// } );






