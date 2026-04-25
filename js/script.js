document.addEventListener('DOMContentLoaded', () => {
// --- Автоперелистывание фактов на главной странице ---
if (window.location.pathname === '/index.html' || window.location.pathname === '') {
const facts = [
{ title: 'Венера вращается в обратную сторону', text: 'Венера — единственная планета Солнечной системы, которая вращается вокруг своей оси в направлении, противоположном большинству планет. Сутки на Венере длиннее года.', source: 'NASA Solar System Exploration' },
{ title: 'Уран лежит на боку', text: 'Ось вращения Урана наклонена примерно на 98° к плоскости орбиты, из-за чего планета как бы «лежит на боку». Это приводит к экстремальным сменам сезонов.', source: 'NASA Science' },
{ title: 'Нептун излучает больше тепла, чем получает', text: 'Нептун излучает примерно в 2,6 раза больше энергии, чем получает от Солнца. Источник этого внутреннего тепла до конца не ясен.', source: 'NASA Planetary Fact Sheet' },
{ title: 'Меркурий имеет хвост как у кометы', text: 'У Меркурия есть длинный натриевый хвост, простирающийся на миллионы километров в сторону от Солнца. Он образуется из-за солнечного ветра, который выбивает атомы с поверхности планеты.', source: 'NASA MESSENGER Mission' },
{ title: 'Венера горячее Меркурия', text: 'Несмотря на то что Меркурий ближе к Солнцу, температура на поверхности Венеры (~465°C) выше из-за мощного парникового эффекта.', source: 'NASA Venus Facts' }
];
let currentFact = Math.floor(Math.random() * facts.length);
const factCard = document.getElementById('fact-card');
const factTitle = document.getElementById('fact-title');
const factText = document.getElementById('fact-text');
const factSource = document.getElementById('fact-source');
const progressBar = document.getElementById('progress-bar');
function showFact(idx) {
const f = facts[idx];
factTitle.textContent = f.title;
factText.textContent = f.text;
factSource.textContent = f.source;
}
function startFactTimer() {
let progress = 100;
const duration = 5000;
const step = (100 / (duration / (1000 / 60)));
const interval = setInterval(() => {
progress -= step;
progressBar.style.width = progress + '%';
if (progress <= 0) {
clearInterval(interval);
currentFact = (currentFact + 1) % facts.length;
factCard.classList.add('fade-out');
setTimeout(() => {
showFact(currentFact);
factCard.classList.remove('fade-out');
startFactTimer();
}, 500);
}
}, (duration / (duration / (1000 / 60))));
}
showFact(currentFact);
startFactTimer();
}
// --- Логика квизов ---
const quizzesData = {
planets: [
{ question: "Какая планета вращается в обратную сторону?", options: ["Марс", "Венера", "Юпитер", "Сатурн"], answerIndex: 1, explanation: "Венера — единственная планета, которая вращается вокруг своей оси в направлении, противоположном большинству планет." },
{ question: "У какой планеты ось вращения наклонена примерно на 98°?", options: ["Меркурий", "Уран", "Нептун", "Земля"], answerIndex: 1, explanation: "Уран имеет экстремальный наклон оси вращения — около 98°, что приводит к необычным сменам сезонов." },
{ question: "Какая планета излучает больше тепла, чем получает?", options: ["Юпитер", "Нептун", "Марс", "Венера"], answerIndex: 1, explanation: "Нептун излучает значительно больше внутреннего тепла, чем получает от Солнца. Причина этого до конца не ясна." }
],
stars: [
{ question: "Какая звезда — самая массивная из известных?", options: ["R136a1", "Бетельгейзе", "Полярная", "Солнце"], answerIndex: 0, explanation: "R136a1 в скоплении R136 — самая массивная известная звезда, её масса более чем в 250 раз превышает массу Солнца." },
{ question: "Что такое магнетар?", options: ["Тип чёрной дыры", "Разновидность нейтронной звезды с экстремальным магнитным полем", "Тип галактики", "Космический корабль"], answerIndex: 1, explanation: "Магнетар — это нейтронная звезда с невероятно мощным магнитным полем, до квадриллиона гаусс." },
{ question: "Как называется ближайшая к Земле звезда (не считая Солнца)?", options: ["Сириус", "Проксима Центавра", "Альфа Центавра A", "Полярная"], answerIndex: 1, explanation: "Проксима Центавра — ближайшая к Земле звезда после Солнца, находится на расстоянии около 4,24 световых лет." }
],
phenomena: [
{ question: "Что такое пульсар?", options: ["Тип планеты", "Вращающаяся нейтронная звезда, испускающая пучки излучения", "Чёрная дыра", "Тип кометы"], answerIndex: 1, explanation: "Пульсар — это быстро вращающаяся нейтронная звезда, которая испускает пучки электромагнитного излучения." },
{ question: "Какое явление возникает при столкновении двух чёрных дыр?", options: ["Сверхновая", "Гравитационные волны", "Туманность", "Квазар"], answerIndex: 1, explanation: "При слиянии чёрных дыр возникают гравитационные волны — колебания пространства-времени, предсказанные Эйнштейном." },
{ question: "Что такое «Великий аттрактор»?", options: ["Чёрная дыра в центре Млечного Пути", "Гравитационная аномалия, притягивающая галактики", "Тип звезды", "Планета"], answerIndex: 1, explanation: "Великий аттрактор — гравитационная аномалия в межгалактическом пространстве, оказывающая влияние на движение галактик." }
]
};
// Определяем текущий квиз по URL
const path = window.location.pathname;
let quizKey;
if (path.includes('/quizzes/')) {
if (path.includes('planets')) quizKey = 'planets';
else if (path.includes('stars')) quizKey = 'stars';
else if (path.includes('phenomena')) quizKey = 'phenomena';
}
if (quizKey) {
const quizData = quizzesData[quizKey];
let currentQuestion = -1;
let score = 0;
let userAnswers = [];
const quizContainer = document.getElementById('quiz-container');
const quizForm = document.getElementById('quiz-form');
const startQuizBtn = document.getElementById('start-quiz');
const submitAnswerBtn = document.getElementById('submit-answer');
const quizIntro = document.getElementById('quiz-intro');
const quizProgress = document.getElementById('quiz-progress');
const quizResult = document.getElementById('quiz-result');
const progressBarQuiz = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const resultScore = document.getElementById('result-score');
const resultTotal = document.getElementById('result-total');
const resultList = document.getElementById('result-list');
const restartQuizBtn = document.getElementById('restart-quiz');
function showSection(id) {
[quizIntro, quizProgress, quizResult].forEach(el => el.classList.add('hidden'));
document.getElementById(id).classList.remove('hidden');
}
function renderQuestion() {
const q = quizData[currentQuestion];
let html = `<h3>${q.question}</h3>`;
q.options.forEach((opt, i) => {
   const id = `q${currentQuestion}o${i}`;
   html += `
     <label for="${id}">
       <input type="radio" name="answer" id="${id}" value="${i}" required>
       ${opt}
     </label><br>`;
});
quizForm.innerHTML = html;
updateProgress();
}
function updateProgress() {
   const total = quizData.length;
   const current = currentQuestion + 1;
   progressText.textContent = `Вопрос ${current} из ${total}`;
   progressBarQuiz.style.width = `${(current / total) * 100}%`;
}
function showResult() {
   resultScore.textContent = score;
   resultTotal.textContent = quizData.length;
   let listHTML = '';
   quizData.forEach((q, i) => {
     const userSel = userAnswers[i];
     const correct = q.answerIndex;
     const isCorrect = userSel === correct;
     const userOpt = q.options[userSel];
     const correctOpt = q.options[correct];
     listHTML += `<li class="${isCorrect ? 'correct' : 'incorrect'}">
       ${isCorrect ? '✅' : '❌'} Вопрос ${i + 1}: Вы ответили "${userOpt}". Правильный ответ — "${correctOpt}".
       ${q.explanation}
     </li>`;
});
resultList.innerHTML = listHTML;
showSection('quiz-result');
}
submitAnswerBtn.addEventListener('click', () => {
   const selected = quizForm.querySelector('input[name=answer]:checked');
   if (!selected) return alert("Пожалуйста, выберите ответ!");
   const answerIndex = parseInt(selected.value);
   userAnswers[currentQuestion] = answerIndex;
   if (answerIndex === quizData[currentQuestion].answerIndex) score++;
   if (currentQuestion + 1 < quizData.length) {
       nextQuestion();
   } else {
       showResult();
   }
});
function nextQuestion() {
currentQuestion++;
renderQuestion();
}
function startQuiz() {
currentQuestion = -1;
score = 0;
userAnswers = [];
showSection('quiz-progress');
nextQuestion();
}
startQuizBtn.addEventListener('click', startQuiz);
restartQuizBtn.addEventListener('click', () => showSection('quiz-intro'));
}
});