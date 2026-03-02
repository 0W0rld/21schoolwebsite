/* ================= НАВИГАЦИЯ ================= */
const sections = document.querySelectorAll("section");
const homeCard = document.querySelector(".home-card");

function showSection() {
  const hash = location.hash.replace("#", "") || "home";

  sections.forEach(s => s.style.display = "none");

  if (hash === "home") {
    document.getElementById("home").style.display = "flex";
    homeCard.classList.remove("exit");
    homeCard.style.animation = "homeIn .8s ease forwards";
  } else {
    homeCard.classList.add("exit");
    setTimeout(() => {
      const target = document.getElementById(hash);
      if (target) {
        target.style.display = "flex";
        // Запуск анимации появления (IntersectionObserver сработает)
        const content = target.querySelector('.fade');
        if(content) content.classList.add('show');
      }
    }, 300);
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
    setTimeout(() => themeCooldown = false, 1000); // Снизил КД до 1 сек для удобства

    document.body.classList.toggle("dark");
    themeBtn.textContent = document.body.classList.contains("dark") ? "🌙" : "☀️";
  });
}

/* ================= ВИКТОРИНА ================= */
const quizData = [
  { q: "Сколько дней в неделе?", a: ["5", "7", "6"], c: 1 },
  { q: "Столица России?", a: ["Питер", "Москва", "Казань"], c: 1 },
  { q: "2 + 2 * 2 = ?", a: ["8", "4", "6"], c: 2 }
];

let qIndex = 0;
let userSettings = { grade: null, level: null, subject: null };

const qText = document.getElementById("quiz-question");
const options = document.querySelectorAll(".quiz-option");
const setupArea = document.getElementById("quiz-setup");
const quizArea = document.getElementById("quiz-main");

// Функция выбора параметров
function setQuizOption(btn, type, value) {
  // Убираем активность с других кнопок в этой группе
  const parent = btn.parentElement;
  parent.querySelectorAll('.setup-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  userSettings[type] = value;

  // Проверяем, всё ли выбрано
  if (userSettings.grade && userSettings.level && userSettings.subject) {
    setTimeout(() => {
      setupArea.style.display = "none";
      quizArea.style.display = "block";
      loadQuiz();
    }, 500);
  }
}

function loadQuiz() {
  if (qIndex >= quizData.length) {
    qText.textContent = "Поздравляем! Ты прошел викторину!";
    options.forEach(o => o.style.display = "none");
    return;
  }

  const d = quizData[qIndex];
  qText.textContent = d.q;

  options.forEach((o, i) => {
    o.style.display = "flex";
    o.classList.remove("selected");
    const circle = o.querySelector(".option-circle");
    const text = o.querySelector(".option-text");

    circle.className = "option-circle";
    text.textContent = d.a[i];
  });
}

options.forEach((o, i) => {
  o.onclick = () => {
    options.forEach(x => x.classList.remove("selected"));
    o.classList.add("selected");

    const circle = o.querySelector(".option-circle");

    if (i === quizData[qIndex].c) {
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

function resetQuiz() {
  qIndex = 0;
  userSettings = { grade: null, level: null, subject: null };
  setupArea.style.display = "block";
  quizArea.style.display = "none";
  document.querySelectorAll('.setup-btn').forEach(b => b.classList.remove('active'));
}

