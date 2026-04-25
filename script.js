// script.js

// --- ДАННЫЕ ---
const facts = [
   "Венера — самая горячая планета Солнечной системы, температура на поверхности достигает +470°C.",
   "На Венере день дольше года — сутки длятся дольше, чем оборот вокруг Солнца.",
   "В чёрной дыре время замедляется почти до полной остановки.",
   "Космическая станция МКС облетает Землю за 90 минут.",
   "Звук в космосе не распространяется, потому что там вакуум."
];
const news = [
   "NASA обнаружило новую экзопланету в обитаемой зоне звезды.",
   "Китай успешно запустил миссию по исследованию обратной стороны Луны.",
   "SpaceX провела успешный запуск ракеты Falcon Heavy с рекордным количеством спутников."
];
const interval = 7000; // мс

// --- ФУНКЦИЯ СЛАЙДЕРА С ИНДИКАТОРОМ ---
function startSlider(sliderId, items, progressId) {
   const slider = document.getElementById(sliderId);
   const progress = document.getElementById(progressId);
   let currentIndex = items.length - 1; // Начинаем с последнего

   function showItem() {
       currentIndex = (currentIndex + 1) % items.length; // Следующий индекс

       // Сброс индикатора и запуск анимации заполнения
       progress.style.width = '0%';
       let width = 0;
       const timer = setInterval(() => {
           if (width >= 100) clearInterval(timer);
           progress.style.width = width + '%';
           width += (100 / (interval / (interval/items.length)));
       }, interval / items.length);

       // Отображение текста
       slider.innerHTML = `<p>"${items[currentIndex]}"</p>`;
       
       // Планирование следующего перехода после полного интервала
       setTimeout(showItem, interval);
   }
   
   // Запуск цикла после загрузки DOM
   setTimeout(showItem, interval);
}
document.addEventListener('DOMContentLoaded', () => {
   if (document.getElementById('fact-slider')) startSlider('fact-slider', facts, 'fact-progress');
   if (document.getElementById('news-slider')) startSlider('news-slider', news, 'news-progress');
});


// --- КВИЗЫ ---
const quizzes = [
 [
     {q:"Какая планета самая большая в Солнечной системе?", o:["Марс","Юпитер","Земля"], a:"Юпитер"},
     {q:"Сколько планет в Солнечной системе?", o:["8","9","7"], a:"8"},
     {q:"Как называется первый искусственный спутник Земли?", o:["Спутник-1","Аполлон","Восток-1"], a:"Спутник-1"}
 ],
 [
     {q:"Какая планета известна как 'Красная планета'?", o:["Марс","Венера","Меркурий"], a:"Марс"},
     {q:"Какая звезда ближе всего к Земле?", o:["Полярная","Солнце","Сириус"], a:"Солнце"},
     {q:"Какой газ преобладает в атмосфере Марса?", o:["Кислород","Азот","Углекислый газ"], a:"Углекислый газ"}
 ],
 [
     {q:"Кто был первым человеком в космосе?", o:["Юрий Гагарин","Нил Армстронг","Алексей Леонов"], a:"Юрий Гагарин"},
     {q:"В каком году был запущен первый спутник Земли?", o:["1957","1961","1969"], a:"1957"},
     {q:"Как назывался корабль Гагарина?", o:["Союз","Восток-1","Аполлон-11"], a:"Восток-1"}
 ]
];

let currentQuizId = null; // Хранит ID выбранного квиза

function loadQuiz(id) {
 const container = document.getElementById('quiz-container');
 container.innerHTML = ''; // Очистить контейнер

 currentQuizId = id; // Запомнить выбранный квиз

 const quizForm = document.createElement('form');
 quizzes[id].forEach((item, i) => {
     const div = document.createElement('div');
     div.className = 'question-block';
     div.innerHTML = `<strong>${i+1}. ${item.q}</strong><br>`;
     
     item.o.forEach(opt => {
         const label = document.createElement('label');
         const input = document.createElement('input');
         input.type = 'radio';
         input.name = `q${id}-${i}`;
         input.value = opt;
         label.appendChild(input);
         label.appendChild(document.createTextNode(` ${opt}`));
         div.appendChild(label);
         div.appendChild(document.createElement('br'));
     });
     
     quizForm.appendChild(div);
 });
 
 const submitBtn = document.createElement('button');
 submitBtn.type = 'button';
 submitBtn.id = 'submit-btn';
 submitBtn.textContent = 'Проверить ответы';
 submitBtn.onclick = () => showResults(quizForm, quizzes[id], id);
 quizForm.appendChild(submitBtn);
 
 container.appendChild(quizForm);
}

function showResults(form, quiz, id) {
 const container = document.getElementById('quiz-container');
 let scoreDiv = container.querySelector('.score');
 if (!scoreDiv) {
     scoreDiv = document.createElement('div');
     scoreDiv.className = 'score';
 } else scoreDiv.innerHTML = '';
 
 let correct = 0, total = quiz.length, answeredCount = 0;
 let userAnswers = [];
 let formElementsArray = Array.from(form.elements);

 quiz.forEach((item, i) => {
   const sel = form.querySelector(`input[name='q${id}-${i}']`);
   
   const p = document.createElement('p');
   p.innerHTML = `<strong>${i+1}. ${item.q}</strong><br>`;
   
   if (sel) {
       const checkedRadioInForm = form.querySelector(`input[name='q${id}-${i}']:checked`);
       if (checkedRadioInForm) {
           userAnswers.push(checkedRadioInForm.value);
           answeredCount++;
       } else {
           userAnswers.push(null);
       }
       
       if (userAnswers[i] === item.a) {
           p.innerHTML += `<span style='color:#4CAF50'>✔ Верно ( ${userAnswers[i]})</span><br>`;
           correct++;
       } else if (userAnswers[i] !== null){
           p.innerHTML += `<span style='color:#f44336'>✘ Неверно ( ${userAnswers[i]})</span><br>` +
                          `<span>Правильный ответ: ${item.a}</span><br>`;
       } else {
           p.innerHTML += `<span style='color:#f44336'>✘ Без ответа</span><br>` +
                          `<span>Правильный ответ: ${item.a}</span><br>`;
       }
   }
   
   scoreDiv.appendChild(p);
 });
 
 // --- ИЗМЕНЕНИЕ ЗДЕСЬ ---
 // Убрана строка "Всего вопросов в квизе"
 scoreDiv.innerHTML += `<h3>Ваш результат:</h3>` +
                       `<p>Правильных ответов из отвеченных вопросов ( ${answeredCount}): ${correct}</p>`;
 container.appendChild(scoreDiv);
}
