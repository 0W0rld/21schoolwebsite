/* ================= НАВИГАЦИЯ ================= */
const sections = document.querySelectorAll("section");
const homeCard = document.querySelector(".home-card");

function showSection() {
  const hash = location.hash.replace("#", "") || "home";

  sections.forEach(s => s.style.display = "none");

  if (hash === "home") {
    document.getElementById("home").style.display = "flex";
    homeCard.classList.remove("exit");
    // Анимация входа для домашней карточки
    homeCard.style.animation = "fadeIn 0.8s ease forwards";
  } else {
    const target = document.getElementById(hash);
    if (target) {
      target.style.display = "flex";
    }
  }
}

window.addEventListener("hashchange", showSection);
window.addEventListener("load", showSection);

/* ================= FADE EFFECT ================= */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("show");
  });
}, { threshold: 0.1 });

document.querySelectorAll(".fade").forEach(el => observer.observe(el));

/* ================= ТЕМА ================= */
const themeBtn = document.getElementById("themeToggle");
let themeCooldown = false;

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    if (themeCooldown) return;

    themeCooldown = true;
    setTimeout(() => themeCooldown = false, 1000);

    document.body.classList.toggle("dark");
    themeBtn.textContent = document.body.classList.contains("dark") ? "🌙" : "☀️";
  });
}

/* ================= ВИКТОРИНА ================= */
let quizSettings = { grade: null, level: null, subject: null };
let qIndex = 0;

const quizData = [
  { q: "Сколько будет 2 + 2?", a: ["3", "4", "5"], c: 1 },
  { q: "Столица России?", a: ["СПб", "Москва", "Казань"], c: 1 }
];

const qText = document.getElementById("quiz-question");
const options = document.querySelectorAll(".quiz-option");

function setQuizOption(btn, type, value) {
  // Визуальное выделение кнопки в группе
  const buttons = btn.parentElement.querySelectorAll(".setup-btn");
  buttons.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  // Сохраняем выбор
  quizSettings[type] = value;

  // Если все 3 параметра выбраны, запускаем викторину
  if (quizSettings.grade && quizSettings.level && quizSettings.subject) {
    setTimeout(() => {
      document.getElementById("quiz-setup").style.display = "none";
      document.getElementById("quiz-main").style.display = "block";
      loadQuiz();
    }, 500);
  }
}

function loadQuiz() {
  if (qIndex >= quizData.length) {
    qText.textContent = "Викторина завершена! Отличная работа!";
    options.forEach(o => o.style.display = "none");
    return;
  }

  const d = quizData[qIndex];
  qText.textContent = d.q;

  options.forEach((o, i) => {
    o.classList.remove("selected");
    const circle = o.querySelector(".option-circle");
    const text = o.querySelector(".option-text");

    circle.className = "option-circle";
    text.textContent = d.a[i];

    o.onclick = () => {
      options.forEach(x => x.classList.remove("selected"));
      o.classList.add("selected");

      if (i === d.c) {
        circle.classList.add("correct");
        setTimeout(() => {
          qIndex++;
          loadQuiz();
        }, 800);
      } else {
        circle.classList.add("wrong");
      }
    };
  });
}

function resetQuiz() {
  qIndex = 0;
  quizSettings = { grade: null, level: null, subject: null };
  document.getElementById("quiz-setup").style.display = "block";
  document.getElementById("quiz-main").style.display = "none";
  document.querySelectorAll(".setup-btn").forEach(b => b.classList.remove("active"));
  options.forEach(o => o.style.display = "flex");
}
