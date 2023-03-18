import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import NewsApiService from './fetch_images';
import { showPhotoCard } from './renderPhotoCard';

const refs = {
  searchForm: document.querySelector('#search-form'),
  imageContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

export { refs };

hideLoadMoreBtn();
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

const newsApiService = new NewsApiService();

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

async function onSearch(e) {
  e.preventDefault();
  clearImageContainer();

  const form = e.currentTarget;
  newsApiService.searchQuery = form.elements.searchQuery.value.trim();

  if (newsApiService.searchQuery === '') {
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  hideLoadMoreBtn();
  newsApiService.resetPage();

  await newsApiService
    .getImages()
    .then(showPhotoCard)
    .catch(error => console.error(error))
    .finally(() => form.reset());

  if (newsApiService.totalHits === 0) {
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else if (newsApiService.totalPage === 1) {
    Notiflix.Notify.success(
      `Hooray! We found ${newsApiService.totalHits} images.`
    ),
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      ),
      hideLoadMoreBtn();
  } else if (newsApiService.totalHits >= 1) {
    Notiflix.Notify.success(
      `Hooray! We found ${newsApiService.totalHits} images.`
    ),
      showLoadMoreBtn();
  }

  onScroll();
  lightbox.refresh();
}

async function onLoadMore() {
  if (
    newsApiService.page === newsApiService.totalPage ||
    newsApiService.totalPage === 1
  ) {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    ),
      hideLoadMoreBtn();
  }
  await newsApiService.getImages().then(showPhotoCard);
  lightbox.refresh();
}

function clearImageContainer() {
  refs.imageContainer.innerHTML = '';
}

function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

function hideLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('is-hidden');
}

function onScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });

  window.scrollTo({
    top: 100,
    behavior: 'smooth',
  });
}
