/* ================= ДАННЫЕ ГАЛЕРЕИ ================= */
const galleryContent = {
  teachers: [
    { name: "Ф.И.О.", info: "Учитель Русского языка и Литературы.", years: "В школе: 2010 — 2026 гг." },
    { name: "Ф.И.О.", info: "Учитель Математики и Алгебры.", years: "В школе: 2005 — 2026 гг." },
    { name: "Ф.И.О.", info: "Учитель Истории и Обществознания.", years: "В школе: 2015 — 2026 гг." },
    { name: "Ф.И.О.", info: "Учитель Физической культуры.", years: "В школе: 1998 — 2026 гг." },
    { name: "Ф.И.О.", info: "Учитель Физики и Астрономии.", years: "В школе: 2012 — 2026 гг." },
    { name: "Ф.И.О.", info: "Педагог-организатор.", years: "В школе: 2020 — 2026 гг." }
  ],
  school: [
    { name: "Центральный вход", info: "Вид на главный фасад здания школы.", years: "Фото: Октябрь 2025" },
    { name: "Спортивный зал", info: "Современное оборудование для тренировок.", years: "Фото: Сентябрь 2025" },
    { name: "Школьный музей", info: "Экспозиция, посвященная истории школы.", years: "Фото: Май 2025" },
    { name: "Столовая", info: "Просторный зал для питания учащихся.", years: "Фото: Январь 2026" },
    { name: "Кабинет информатики", info: "Новые рабочие станции для программирования.", years: "Фото: Февраль 2026" },
    { name: "Актовый зал", info: "Место проведения праздников и концертов.", years: "Фото: Декабрь 2025" }
  ]
};

function openFolder(folder) {
  const overlay = document.getElementById('gallery-overlay');
  const title = document.getElementById('folder-title');
  const container = document.getElementById('photo-container');
  
  title.innerText = folder === 'teachers' ? "Наши Учителя" : "Наша Школа";
  container.innerHTML = "";

  galleryContent[folder].forEach(item => {
    container.innerHTML += `
      <div class="photo-card fade show">
        <div class="photo-img">НЕТ ФОТО</div>
        <h4 style="color:#005fa3;">${item.name}</h4>
        <p style="font-size:14px; margin:5px 0;">${item.info}</p>
        <small style="opacity:0.6;">${item.years}</small>
      </div>
    `;
  });
  
  overlay.style.display = 'flex';
}

function closeFolder() {
  document.getElementById('gallery-overlay').style.display = 'none';
}

/* ================= БАЗА ВОПРОСОВ (УМНАЯ) ================= */
const questionBank = [
  // 7 КЛАСС
  { grade: 7, subject: 'russian', level: 'hard', q: "В каком слове пишется НН?", a: ["Кожа..ый", "Деревя..ый", "Гуси..ый"], c: 1 },
  { grade: 7, subject: 'russian', level: 'easy', q: "Какая часть речи отвечает на вопрос 'Кто?' / 'Что?'", a: ["Существительное", "Глагол", "Наречие"], c: 0 },
  { grade: 7, subject: 'history', level: 'hard', q: "Кто был первым царём из династии Романовых?", a: ["Алексей Михайлович", "Михаил Фёдорович", "Иван Грозный"], c: 1 },
  { grade: 7, subject: 'history', level: 'easy', q: "В каком году было Крещение Руси?", a: ["988", "1147", "1242"], c: 0 },
  { grade: 7, subject: 'math', level: 'hard', q: "Чему равна сумма углов в треугольнике?", a: ["90°", "180°", "360°"], c: 1 },
  { grade: 7, subject: 'math', level: 'easy', q: "7 * 8 = ?", a: ["48", "54", "56"], c: 2 },

  // 8 КЛАСС
  { grade: 8, subject: 'russian', level: 'hard', q: "Какое предложение является безличным?", a: ["Я иду домой.", "Вечереет.", "Мы слушаем музыку."], c: 1 },
  { grade: 8, subject: 'russian', level: 'easy', q: "Как пишутся частицы -то, -либо, -нибудь?", a: ["Раздельно", "Слитно", "Через дефис"], c: 2 },
  { grade: 8, subject: 'history', level: 'hard', q: "В каком году произошла Бородинская битва?", a: ["1709", "1812", "1853"], c: 1 },
  { grade: 8, subject: 'history', level: 'easy', q: "Кто был императором во время войны 1812 года?", a: ["Александр I", "Николай II", "Петр I"], c: 0 },
  { grade: 8, subject: 'math', level: 'hard', q: "Решите: x² = 64", a: ["8", "8 и -8", "16"], c: 1 },
  { grade: 8, subject: 'math', level: 'easy', q: "Периметр квадрата со стороной 5 равен:", a: ["20", "25", "10"], c: 0 }
];

/* ================= ЛОГИКА ВИКТОРИНЫ ================= */
let userSelection = { grade: null, level: null, subject: null };
let currentQuestions = [];
let qIndex = 0;

function setQuizParam(btn, key, value) {
  const parent = btn.parentElement;
  parent.querySelectorAll('.setup-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  userSelection[key] = value;

  // Если все 3 параметра выбраны - запускаем
  if (userSelection.grade && userSelection.level && userSelection.subject) {
    currentQuestions = questionBank.filter(q => 
      q.grade === userSelection.grade && 
      q.subject === userSelection.subject && 
      q.level === userSelection.level
    );
    
    // Если по уровню не нашли - даем общие по предмету этого класса
    if(currentQuestions.length === 0) {
      currentQuestions = questionBank.filter(q => q.grade === userSelection.grade && q.subject === userSelection.subject);
    }

    setTimeout(startQuiz, 500);
  }
}

function startQuiz() {
  document.getElementById('quiz-setup').style.display = 'none';
  const main = document.getElementById('quiz-main');
  main.style.display = 'block';
  qIndex = 0;
  loadNextQuestion();
}

function loadNextQuestion() {
  const qBox = document.getElementById('quiz-question');
  const optBox = document.getElementById('options-box');
  const feedback = document.getElementById('quiz-feedback');
  feedback.innerText = "";

  if (qIndex >= currentQuestions.length) {
    qBox.innerText = "Викторина завершена! Отличный результат!";
    optBox.innerHTML = "";
    return;
  }

  const currentQ = currentQuestions[qIndex];
  qBox.innerText = currentQ.q;
  optBox.innerHTML = "";

  currentQ.a.forEach((ans, i) => {
    const div = document.createElement('div');
    div.className = "quiz-option";
    div.innerHTML = `<div class="option-circle"></div><span>${ans}</span>`;
    div.onclick = () => checkAnswer(div, i, currentQ.c);
    optBox.appendChild(div);
  });
}

function checkAnswer(el, chosen, correct) {
  const circle = el.querySelector('.option-circle');
  if (chosen === correct) {
    circle.classList.add('correct');
    setTimeout(() => {
      qIndex++;
      loadNextQuestion();
    }, 800);
  } else {
    circle.classList.add('wrong');
  }
}

function resetQuiz() {
  userSelection = { grade: null, level: null, subject: null };
  document.getElementById('quiz-setup').style.display = 'block';
  document.getElementById('quiz-main').style.display = 'none';
  document.querySelectorAll('.setup-btn').forEach(b => b.classList.remove('active'));
}

/* ================= НАВИГАЦИЯ И ОБЩЕЕ ================= */
function updateNav() {
  const hash = location.hash || "#home";
  document.querySelectorAll('section').forEach(s => s.style.display = 'none');
  const target = document.querySelector(hash);
  if (target) target.style.display = 'flex';
}
window.addEventListener('hashchange', updateNav);
window.addEventListener('load', updateNav);

document.getElementById('themeToggle').onclick = () => {
  document.body.classList.toggle('dark');
  document.getElementById('themeToggle').innerText = document.body.classList.contains('dark') ? "🌙" : "☀️";
};

// Эффект появления при скролле
const obs = new IntersectionObserver(ents => {
  ents.forEach(e => { if(e.isIntersecting) e.target.classList.add('show'); });
});
document.querySelectorAll('.fade').forEach(f => obs.observe(f));
