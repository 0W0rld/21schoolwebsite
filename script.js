// ---------- ПРИЛИПАЮЩЕЕ МЕНЮ ----------
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (window.scrollY > 10) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
});

// ---------- АНИМАЦИИ ПОЯВЛЕНИЯ ----------
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
});
document.querySelectorAll('.fade').forEach(el => observer.observe(el));

// ---------- ВИКТОРИНА ----------
const quizForm = document.getElementById("quiz-form");
const quizResult = document.getElementById("quiz-result");
let answered = false;

quizForm.addEventListener("submit", function(e){
  e.preventDefault();
  if(answered) return;

  const selected = quizForm.querySelector("input[name='question1']:checked");
  if(!selected){
    quizResult.innerHTML = "<p class='wrong'>Выберите ответ</p>";
    return;
  }

  answered = true;

  if(selected.value === "math"){ // правильный ответ
    quizResult.innerHTML = "<div class='result-icon correct-icon show'>✔</div><p class='correct'>Правильно!</p>";
    quizForm.querySelector("button").style.display = "none";
  } else { // неправильный ответ
    quizResult.innerHTML = "<div class='result-icon wrong-icon show'>✖</div><p class='wrong'>Неверно</p>";
    const btn = quizForm.querySelector("button");
    btn.disabled = true;
    btn.textContent = "Все уроки важны и нужны";
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = "Ответить";
      quizResult.innerHTML = "";
      answered = false;
    }, 3000);
  }
});

