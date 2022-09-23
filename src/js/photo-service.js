const API_KEY = '30126477-a57d6dba24f5300b01ed82fe1';
const BASE_URL = 'https://pixabay.com/api';
const options = {
  headers: {
    Autorization: API_KEY,
  },
};

export default class PhotoApiService {
  constructor() {
    this.seachQuery = '';
    this.page = 1;
    this.fotoForPage = 40;
  }

  fetchArticles() {
    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.seachQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.fotoForPage}`;

    return fetch(url, options)
      .then(response => response.json())
      .then(({ articles }) => {
        this.incrementPage();
        return articles;
      });
  }
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.seachQuery;
  }

  set query(newQuery) {
    this.seachQuery = newQuery;
  }
}
