// import debounce from 'lodash.debounce';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PhotoApiService from './photo-service';
import LoadMoreButton from './lode-more-button';

const DEBOUNCE_DELAY = 1000;


const refs = {
    submit: document.querySelector('button[type="submit"]'),
    // load: document.querySelector('.load'),
    inputSearch: document.querySelector('.search-form'),
    galleryConteiner: document.querySelector('.gallery'),
    
  };

  const photoApiService = new PhotoApiService();
  const loadMoreButton = new LoadMoreButton({
    selector: '[data-action="load-more"]',
    hidden: true,
  });
  console.log(loadMoreButton);
  

  refs.inputSearch.addEventListener('click', startSearch);
//   refs.loadMoreButton.addEventListener('click', onLoadMore);
loadMoreButton.refs.button.addEventListener('click', fatchCards);

  function startSearch(e) {
    e.preventDefault();

    photoApiService.query = e.currentTarget.elements.searchQuery.value;

    if(photoApiService.query === '') {
        return Notify.info('Please enter something.');
    }

    loadMoreButton.show();
  
photoApiService.resetPage();
clearGalleryConteiner();
fatchCards ()
  }
function fatchCards () {
    loadMoreButton.disabled();
    photoApiService.fetchArticles().then(articles => {
        appendGalleryCards(articles);
        loadMoreButton.enable();
    });

}
//   function onLoadMore() {
//     loadMoreButton.disabled()
//     photoApiService.fetchArticles().then(appendGalleryCards);
//   }

  function appendGalleryCards (articles) {
    refs.galleryConteiner.insertAdjacentHTML('beforeend', photoCard(articles))
  }


  function photoCard(articles) {
    return articles
      .map((previewURL, tags, likes, views, comments, downloads) => {
        return  `
        <div class="photo-card">
        <img src="${previewURL}" alt="${tags} " loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes: ${likes} </b>
          </p>
          <p class="info-item">
            <b>Views: ${views} </b>
          </p>
          <p class="info-item">
            <b>Comments: ${comments} </b>
          </p>
          <p class="info-item">
            <b>Downloads: ${downloads} </b>
          </p>
        </div>
      </div>`
      })
      .join("");
  };

function clearGalleryConteiner() {
    refs.galleryConteiner.innerHTML = '';
}
//   <p class="card-text">Languages: ${Object.values(languages)} </p>`