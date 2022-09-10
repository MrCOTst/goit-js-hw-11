//ініціалізуємо троттл//
import throttle from 'lodash.throttle';

//задаємо змінні для ключа сховища та об'єкта данних, що виводяться в консоль при Submit//
const STORAGE_KEY = "feedback-form-state";
let data = {};

// звертаємося до елементів HTML розмітки та прослуховуємо дії на елементах форми//
const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('.feedback-form textarea'),
    email: document.querySelector('.feedback-form input')
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextareaInput, 500));

//функція повернення збережених у локальній пам'яті елементів//
recoveryForm();

//функція дій при натисканні на Submit з відміною реакцій по дуфолту, виведенням даних, що відправляються, у консоль
//очищення форми, пам'яті та об'єкта даних
function onFormSubmit(e) {
    e.preventDefault();

    console.log('Submit:', data)
    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    data = {};
};

//функція запису даних введених до елементів форми до локальної пам'яті з перетворенням об'єта даних у рядок
function onTextareaInput(e) {
    data[e.target.name] = e.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    };
    
//тіло функції повернення збережених у локальній пам'яті данних, перевірка наявності данних взагалі, якщо ТРУ
// то виконуємо перетворення збережених даних з рядка у об'єкт, записуємо у відповідні поля форми, оновлюємо 
// об'єкт збереження даних
function recoveryForm () {
    let savedData = localStorage.getItem(STORAGE_KEY);
    if(savedData) {
        savedData = JSON.parse(savedData);
        refs.textarea.value = savedData.message || "";
        refs.email.value = savedData.email || "";
        Object.entries(savedData).forEach(([name, value]) =>
        data[name] = value);
        }
}

