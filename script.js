/* ================= НАВИГАЦИЯ ================= */
const sections = document.querySelectorAll("section");
const homeCard = document.querySelector(".home-card");

function showSection() {
  const hash = location.hash.replace("#", "") || "home";
  sections.forEach(s => s.style.display = "none");

  const target = document.getElementById(hash);
  if (target) {
    target.style.display = "flex";
    if (hash === "home") homeCard.style.animation = "fadeIn 0.8s ease forwards";
  }
}
window.addEventListener("hashchange", showSection);
window.addEventListener("load", showSection);

/* ================= FADE EFFECT ================= */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("show"); });
}, { threshold: 0.1 });
document.querySelectorAll(".fade").forEach(el => observer.observe(el));

/* ================= ТЕМА ================= */
const themeBtn = document.getElementById("themeToggle");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeBtn.textContent = document.body.classList.contains("dark") ? "🌙" : "☀️";
  });
}

/* ================= УМНАЯ ВИКТОРИНА ================= */
const allQuestions = [
  // 7 класс, История
  { grade: 7, subject: 'history', level: 'good', q: "Кто был первым царем из династии Романовых?", a: ["Алексей Михайлович", "Михаил Федорович", "Петр I"], c: 1 },
  { grade: 7, subject: 'history', level: 'bad', q: "В каком веке жил Иван Грозный?", a: ["16 век", "18 век", "20 век"], c: 0 },
  
  // 8 класс, Русский
  { grade: 8, subject: 'russian', level: 'good', q: "В каком слове пишется НН?", a: ["Кожа..ый", "Стекля..ый", "Гуси..ый"], c: 1 },
  { grade: 8, subject: 'russian', level: 'bad', q: "Сколько гласных букв в русском языке?", a: ["5", "10", "33"], c: 1 },
  
  // Общие/Заглушки (если выбор не совпал)
  { grade: 7, subject: 'russian', level: 'good', q: "Укажите деепричастие:", a: ["Бежать", "Бегущий", "Бегая"], c: 2 },
  { grade: 8, subject: 'history', level: 'good', q: "В каком году произошла Бородинская битва?", a: ["1812", "1709", "1914"], c: 0 }
];

let quizSettings = { grade: null, level: null, subject: null };
let currentFilteredQuestions = [];
let qIndex = 0;

function setQuizOption(btn, type, value) {
  const group = btn.parentElement.querySelectorAll(".setup-btn");
  group.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  quizSettings[type] = value;

  if (quizSettings.grade && quizSettings.level && quizSettings.subject) {
    // Фильтруем вопросы по выбору пользователя
    currentFilteredQuestions = allQuestions.filter(q => 
      q.grade === quizSettings.grade && q.subject === quizSettings.subject
    );

    // Если точных совпадений нет, берем просто по предмету
    if (currentFilteredQuestions.length === 0) {
      currentFilteredQuestions = allQuestions.filter(q => q.subject === quizSettings.subject);
    }

    setTimeout(startQuiz, 400);
  }
}

function startQuiz() {
  const setup = document.getElementById("quiz-setup");
  const main = document.getElementById("quiz-main");
  
  setup.style.display = "none";
  main.style.display = "block";
  setTimeout(() => main.style.opacity = "1", 50);
  
  qIndex = 0;
  loadQuestion();
}

function loadQuestion() {
  const qText = document.getElementById("quiz-question");
  const progText = document.getElementById("quiz-progress");
  const options = document.querySelectorAll(".quiz-option");

  if (qIndex >= currentFilteredQuestions.length) {
    qText.textContent = "Викторина завершена! Вы молодец!";
    options.forEach(o => o.style.display = "none");
    progText.textContent = "";
    return;
  }

  const currentQ = currentFilteredQuestions[qIndex];
  qText.textContent = currentQ.q;
  progText.textContent = `Вопрос ${qIndex + 1} из ${currentFilteredQuestions.length}`;

  options.forEach((o, i) => {
    o.style.display = "flex";
    const circle = o.querySelector(".option-circle");
    const text = o.querySelector(".option-text");
    
    circle.className = "option-circle";
    text.textContent = currentQ.a[i];
    o.style.pointerEvents = "auto";
  });
}

function handleAnswer(index) {
  const currentQ = currentFilteredQuestions[qIndex];
  const options = document.querySelectorAll(".quiz-option");
  const selectedOption = options[index];
  const circle = selectedOption.querySelector(".option-circle");

  // Блокируем клики на время анимации
  options.forEach(o => o.style.pointerEvents = "none");

  if (index === currentQ.c) {
    circle.classList.add("correct");
    setTimeout(() => {
      qIndex++;
      smoothTransition();
    }, 800);
  } else {
    circle.classList.add("wrong");
    // Даем шанс исправиться через секунду
    setTimeout(() => {
      circle.className = "option-circle";
      options.forEach(o => o.style.pointerEvents = "auto");
    }, 1000);
  }
}

function smoothTransition() {
  const main = document.getElementById("quiz-main");
  main.style.opacity = "0";
  setTimeout(() => {
    loadQuestion();
    main.style.opacity = "1";
  }, 400);
}

function resetQuiz() {
  quizSettings = { grade: null, level: null, subject: null };
  const setup = document.getElementById("quiz-setup");
  const main = document.getElementById("quiz-main");
  
  main.style.opacity = "0";
  setTimeout(() => {
    main.style.display = "none";
    setup.style.display = "block";
    document.querySelectorAll(".setup-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".quiz-option").forEach(o => o.style.display = "flex");
  }, 400);
}
