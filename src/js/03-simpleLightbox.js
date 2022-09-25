import '../css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PhotoApiService from './photo-service';
import photoCard from './simple-markup';
import { lightbox } from './simple-call';

const refs = {
  submit: document.querySelector('button[type="submit"]'),
  inputSearch: document.querySelector('.search-form'),
  galleryConteiner: document.querySelector('.gallery'),
  observe: document.querySelector('.observe'),
};

const photoApiService = new PhotoApiService();

refs.inputSearch.addEventListener('submit', startSearch);

function startSearch(e) {
  e.preventDefault();
  clearGalleryConteiner();
  photoApiService.query = e.currentTarget.elements.searchQuery.value.trim();

  if (photoApiService.query === '') {
    Notify.info('Please enter something.');
    clearGalleryConteiner();
    return;
  }
  photoApiService.resetPage();
  fatchCards();
}

function fatchCards() {
  photoApiService.fetchArticles().then(data => {
    appendGalleryCards(data);

    if (photoApiService.page === 2 && data.hits.length) {
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }

    if (!data.hits.length && !data.totalHits) {
      Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
       return;
    }

    if (!data.hits.length && data.totalHits) {
      Notify.info("We're sorry, but you've reached the end of search results.");
       return;
    }
    lightbox.refresh();
  });
}

function appendGalleryCards(data) {
  const markup = data.hits.map(data => photoCard(data)).join('');
  refs.galleryConteiner.insertAdjacentHTML('beforeend', markup);
}

function clearGalleryConteiner() {
  refs.galleryConteiner.innerHTML = '';
}

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && photoApiService.query !== '') {
      fatchCards();
      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '100px',
});
observer.observe(refs.observe);


