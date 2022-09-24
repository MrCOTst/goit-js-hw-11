import axios from 'axios';

const API_KEY = '30126477-a57d6dba24f5300b01ed82fe1';
const BASE_URL = 'https://pixabay.com/api';

export default class PhotoApiService {
  constructor() {
    this.seachQuery = '';
    this.page = 1;
    this.fotoForPage = 40;
  }

  async fetchArticles() {
    const options = {
      params: {
        key: API_KEY,
        q: `${this.seachQuery}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: `${this.page}`,
        per_page: `${this.fotoForPage}`,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const articles = await axios.get(BASE_URL, options);
         console.log(articles);
         const data = articles.data;
         this.incrementPage();
         return data;   
      } catch (error) {
        console.error();
      }
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

// fetchArticles() {
//   const url = `${BASE_URL}/?key=${API_KEY}&q=${this.seachQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.fotoForPage}`;

//   return fetch(url, options)
//     .then(response => response.json())
//     .then(({ articles }) => {
//       this.incrementPage();
//       return articles;
//     });
