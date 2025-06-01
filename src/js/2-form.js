const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

// Початковий стан об'єкта
let formData = {
  email: '',
  message: ''
};

// 1. Відновлюємо стан форми з локального сховища при завантаженні
document.addEventListener('DOMContentLoaded', () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      formData = JSON.parse(savedData);
      form.elements.email.value = formData.email || '';
      form.elements.message.value = formData.message || '';
    } catch (error) {
      console.error('Помилка при зчитуванні з LocalStorage:', error);
    }
  }
});

// 2. Слухаємо подію input і зберігаємо в LocalStorage
form.addEventListener('input', event => {
  const { name, value } = event.target;
  formData[name] = value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// 3. Слухаємо подію submit
form.addEventListener('submit', event => {
  event.preventDefault();

  const { email, message } = formData;

  if (email.trim() === '' || message.trim() === '') {
    alert('Fill please all fields');
    return;
  }

  console.log('Дані форми:', formData);

  // Очищення
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
});