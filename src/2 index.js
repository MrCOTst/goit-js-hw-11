      import './css/styles.css';
      // import countryCardsTpl from './templates/country-cards';
      // import countryCardTpl from '../templates/country-card';
      // import throttle from 'lodash.throttle';
      // import { Notify } from 'notiflix/build/notiflix-notify-aio';
      
      // const DEBOUNCE_DELAY = 300;
      // let searchValue = null;
      
    //   const refs = {
    //     fetchCountryInput:document.querySelector('input'),
    //          countryList:document.querySelector('.country-list'),
    //          countryInfo:document.querySelector('.country-info'),
    //         };
      
    //         document.querySelector('#search-box').placeholder="Please enter the name of the country";
      
            
    //       refs.fetchCountryInput.addEventListener("input", onSearchValue);
      
      
          refs.fetchCountryInput.addEventListener("input", debounce(() => {
            fetchCountry()
            .then((countries) => renderCountiesList(countries))
            .catch((error) => console.log(error));
            
        }, DEBOUNCE_DELAY))

        function fetchCountry() {
            let search = refs.fetchCountryInput.value;
              const url = `https://restcountries.com/v2/name/${search}?fields=name,flags,capital,population,languages`
                  return fetch(url).then((response) => {
                  if(!response.ok) {
                    Notify.failure('Oops, there is no country with that name.');
                      throw new Error (response.status);
                      
                  }
                  return response.json();
              })
          };
          
          function renderCountiesList(countries) {
            refs.countryList.innerHTML = '';
            console.log(countries);
            
            if(countries.length > MIN_NUMBER_OF_COUNTRIES) {
              Notify.info('Too many matches found. Please enter a more specific name.');
            };
            if (MIN_NUMBER_OF_COUNTRIES >= countries.length > 1) {
              let markup = countryCards(countries);
              refs.countryList.innerHTML = markup;
               };
           if (countries.length === 1) {
            markup = oneCountryCard(countries);
            }
            console.log(countries.length);
            refs.countryList.innerHTML = markup;
          };
          
          function countriesCards(countries) {
              return countries
                .map(({ name, flags }) => {
                  return `
                  <li class="country-item">
                  
                  <img class="country-flag"
                    src="${flags.svg}"
                    alt="Flag of ${name}"
                    width = 50px
                  />
                  <h2 class="country-name">${name} </h2>
                </li>
                `;
                })
                .join("");
            };
          
          
            function oneCountryCard({name, flags, capital, population, languages }) {
              return  `
                <h1 class="search-country-name">${name}</h2>
              <img class="search-country-flag"
                src="${flags}"
                alt="Flag of ${name}"
              />
              <p class="card-text">Capital:${capital} </p>
              <p class="card-text">Population:${population} </p>
              <p class="card-text">Languages:${languages} </p>`
              };
      
      
      
      
          
      
      // fetchUsersBtn.addEventListener("click", () => {
      //   fetchUsers()
      //     .then((users) => renderUserList(users))
      //     .catch((error) => console.log(error));
      // });
      
      
      
            // function onSearchValue () {
            //   let search = refs.fetchCountryInput.value;
            //   console.log(search);
      
            //   const url = `https://restcountries.com/v2/name/${search}?fields=name,capital,flags`
            //   const r = fetch(url).then(response => {
            //       return response.json();
            //       })
            //       .then(country => {
            //           console.log(country);
            //           const markup = countryCards(country);
            //           refs.countryList.innerHTML = markup;
              
            //       })
            //       .catch(error => {
            //           console.log(error);
            //       });
              
            //   // console.log("About country:", r);
            //   function countryCards(items) {
            //     return items
            //       .map(({ name, flags }) => {
            //         return `
            //         <li class="country-item">
                    
            //         <img class="country-flag"
            //           src="${flags.svg}"
            //           alt="Flag of ${name}"
            //           width = 50px
            //         />
            //         <h2 class="country-name">${name} </h2>
            //       </li>
            //       `;
            //       })
            //       .join("");
            //   };
            // }
            
      
      // const cardsMarkup = createCountryCards(galleryItems);
      
      // cardSet.insertAdjacentHTML("beforeend", cardsMarkup);
      
      // function createImageCards(galleryItems) {
      //   return galleryCardsTpl(galleryItems);
      // };
      
      
      
      
      
      
      
      
      
      
            
            
      // const fetchUsersBtn = document.querySelector(".btn");
      // const userList = document.querySelector(".user-list");
      
      // fetchUsersBtn.addEventListener("click", () => {
      //   fetchUsers()
      //     .then((users) => renderUserList(users))
      //     .catch((error) => console.log(error));
      // });
      
      // function fetchUsers() {
      //   return fetch("https://jsonplaceholder.typicode.com/users").then(
      //     (response) => {
      //       if (!response.ok) {
      //         throw new Error(response.status);
      //       }
      //       return response.json();
      //     }
      //   );
      // }
      
      // function renderUserList(users) {
      //   const markup = users
      //     .map((user) => {
      //       return `<li>
      //           <p><b>Name</b>: ${user.name}</p>
      //           <p><b>Email</b>: ${user.email}</p>
      //           <p><b>Company</b>: ${user.company.name}</p>
      //         </li>`;
      //     })
      //     .join("");
      //   userList.innerHTML = markup;
      // }
      
      
      
      //////
      
      //ініціалізуємо троттл//
      // import throttle from 'lodash.throttle';
      
      // //задаємо змінні для ключа сховища та об'єкта данних, що виводяться в консоль при Submit//
      // const STORAGE_KEY = "feedback-form-state";
      // let data = {};
      
      // // звертаємося до елементів HTML розмітки та прослуховуємо дії на елементах форми//
      // const refs = {
      //     form: document.querySelector('.feedback-form'),
      //     textarea: document.querySelector('.feedback-form textarea'),
      //     email: document.querySelector('.feedback-form input')
      // };
      
      // refs.form.addEventListener('submit', onFormSubmit);
      // refs.form.addEventListener('input', throttle(onTextareaInput, 500));
      
      // //функція повернення збережених у локальній пам'яті елементів//
      // recoveryForm();
      
      // //функція дій при натисканні на Submit з відміною реакцій по дуфолту, виведенням даних, що відправляються, у консоль
      // //очищення форми, пам'яті та об'єкта даних
      // function onFormSubmit(e) {
      //     e.preventDefault();
      
      //     console.log('Submit:', data)
      //     e.currentTarget.reset();
      //     localStorage.removeItem(STORAGE_KEY);
      //     data = {};
      // };
      
      // //функція запису даних введених до елементів форми до локальної пам'яті з перетворенням об'єта даних у рядок
      // function onTextareaInput(e) {
      //     data[e.target.name] = e.target.value;
      //     localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      //     };
          
      // //тіло функції повернення збережених у локальній пам'яті данних, перевірка наявності данних взагалі, якщо ТРУ
      // // то виконуємо перетворення збережених даних з рядка у об'єкт, записуємо у відповідні поля форми, оновлюємо 
      // // об'єкт збереження даних
      // function recoveryForm () {
      //     let savedData = localStorage.getItem(STORAGE_KEY);
      //     if(savedData) {
      //         savedData = JSON.parse(savedData);
      //         refs.textarea.value = savedData.message || "";
      //         refs.email.value = savedData.email || "";
      //         Object.entries(savedData).forEach(([name, value]) =>
      //         data[name] = value);
      //         }
      // }