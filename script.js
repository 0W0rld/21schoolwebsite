/* ================= ТЕМА ================= */
const themeBtn = document.getElementById("themeToggle");
let themeCooldown = false;

function setTheme(theme){
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  themeBtn.textContent = theme === "dark" ? "🌙" : "☀️";
}

themeBtn.addEventListener("click", () => {
  if(themeCooldown) return;

  themeCooldown = true;
  setTimeout(()=>themeCooldown=false,3000);

  const current = document.documentElement.getAttribute("data-theme") || "light";
  setTheme(current === "light" ? "dark" : "light");

  playClick();
});

setTheme(localStorage.getItem("theme") || "light");

/* ================= НАВИГАЦИЯ ================= */
const sections = document.querySelectorAll("section");
const homeCard = document.querySelector(".home-card");

function showSection(){
  const hash = location.hash.replace("#","") || "home";
  sections.forEach(s=>s.style.display="none");

  if(hash === "home"){
    document.getElementById("home").style.display="flex";
    homeCard.classList.remove("exit");
    homeCard.style.animation="homeIn .8s ease forwards";
  } else {
    homeCard.classList.add("exit");
    setTimeout(()=>{
      const target = document.getElementById(hash);
      if(target) target.style.display="flex";
    },300);
  }
}

window.addEventListener("hashchange", showSection);
window.addEventListener("load", showSection);

/* ================= ЗВУКИ ================= */
const hoverSound = new Audio("hover.mp3");
const clickSound = new Audio("click.mp3");

function playHover(){ hoverSound.cloneNode().play(); }
function playClick(){ clickSound.cloneNode().play(); }

document.querySelectorAll("button, a").forEach(el=>{
  el.addEventListener("mouseenter", playHover);
  el.addEventListener("click", playClick);
});

/* ================= ВИКТОРИНА (АДАПТИВ) ================= */
const quizState = {
  grade: null,
  level: null,
  subject: null
};

function setQuizOption(type, value){
  quizState[type] = value;
  console.log("QUIZ STATE:", quizState);

  if(quizState.grade && quizState.level && quizState.subject){
    loadAdaptiveQuiz();
  }
}

function loadAdaptiveQuiz(){
  // пример логики
  let questions;

  if(quizState.grade <= 7 && quizState.level === "good" && quizState.subject === "history"){
    questions = [
      {q:"В каком веке была Куликовская битва?", a:["13","14","15"], c:1}
    ];
  } else {
    questions = [
      {q:"Сколько дней в неделе?", a:["5","7","6"], c:1}
    ];
  }

  console.log("Загружены вопросы:", questions);
}
