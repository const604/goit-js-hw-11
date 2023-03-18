import axios from 'axios';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalHits = 1;
    this.per_page = 40;
    this.totalPage = 1;
  }

  async getImages() {
    const KEY = '34367091-415fdde7ec5b95c0f515d26a0';
    const url = 'https://pixabay.com/api/';
    const options = {
      params: {
        key: KEY,
        q: this.searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: this.page,
        per_page: this.per_page,
      },
      headers: {
        'content-type': 'application/json',
      },
    };

    try {
      const response = await axios.get(url, options);
      this.incrementPage();
      this.totalHits = response.data.totalHits;
      this.totalPage = Math.ceil(this.totalHits / this.per_page);
      return response.data.hits;
    } catch (error) {
      console.error(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
