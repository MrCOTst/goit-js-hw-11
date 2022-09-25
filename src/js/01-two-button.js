import '../css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PhotoApiService from './photo-service';
import LoadMoreButton from './lode-more-button';
import photoCard from './card-markup';

const refs = {
  submit: document.querySelector('button[type="submit"]'),
  inputSearch: document.querySelector('.search-form'),
  galleryConteiner: document.querySelector('.gallery'),
};

const photoApiService = new PhotoApiService();
const loadMoreButton = new LoadMoreButton({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.inputSearch.addEventListener('submit', startSearch);
loadMoreButton.refs.button.addEventListener('click', fatchCards);

function startSearch(e) {
  e.preventDefault();
  clearGalleryConteiner();
  photoApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  photoApiService.resetPage();

  if (photoApiService.query === '') {
    Notify.info('Please enter something.');
    clearGalleryConteiner();
    loadMoreButton.hide();
    return;
  }
  fatchCards();
  
  loadMoreButton.show();
  
}

function fatchCards() {
  loadMoreButton.disabled();
  photoApiService.fetchArticles().then(data => {
    loadMoreButton.enable();

    appendGalleryCards(data);

    if(photoApiService.page === 2 && data.hits.length) {
    Notify.success(`Hooray! We found ${data.totalHits} images.`);
  }
  
    if (!data.hits.length && !data.totalHits) {
      Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      loadMoreButton.hide();
      return;
    }

    if (!data.hits.length && data.totalHits) {
      Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      loadMoreButton.hide();
      return;
    }
}
  );
}
//     loadMoreButton.disabled();
//     loadMoreButton.enable();
//     loadMoreButton.show();
//     loadMoreButton.hide();

function appendGalleryCards(data) {
  const markup = data.hits.map(data => photoCard(data)).join('');
  refs.galleryConteiner.insertAdjacentHTML('beforeend', markup);
}

function clearGalleryConteiner() {
  refs.galleryConteiner.innerHTML = '';
}