// Add imports above this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';
// Change code below this line

const markupGallery = document.querySelector('.gallery');

const imageGallery = galleryItems
  .map(({ preview, original, description }) => {
    return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
  })
  .join(' ');

markupGallery.insertAdjacentHTML('beforeend', `${imageGallery}`);

var lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  });
console.log(galleryItems);
