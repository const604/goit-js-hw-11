import {refs} from './index'

function showPhotoCard(hits) {
  const markup = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
      <a class="link-card" href="${largeImageURL}">
        <div class="photo-card">
          <img src="${webformatURL}" alt="${tags}" width=300 height=200 loading="lazy" />
          <div class="info">
            <p class="info-item">
             <b>Likes</b> ${likes}
            </p>
            <p class="info-item">
              <b>Views</b> ${views}
            </p>
            <p class="info-item">
              <b>Comments</b> ${comments}
            </p>
            <p class="info-item">
              <b>Downloads</b> ${downloads}
            </p>
          </div>
        </div>
      </a>
        `;
      }
    )
    .join('');

  refs.imageContainer.insertAdjacentHTML('beforeend', markup);
}

export { showPhotoCard };
