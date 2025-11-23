// ------------------------------
// Липкая шапка
// ------------------------------
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if(window.scrollY > 10) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
});

// ------------------------------
// Появление при скролле
// ------------------------------
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
});
document.querySelectorAll('.fade').forEach(el => observer.observe(el));

// ------------------------------
// Викторина
// ------------------------------
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

  // убираем старые галочки
  document.querySelectorAll('.option-circle').forEach(c => c.classList.remove('correct','wrong'));
  document.querySelectorAll('.quiz-option').forEach(opt => opt.style.pointerEvents='none');

  const correctOption = quizForm.querySelector("label[data-correct='true']");

  if(selected.value === "math"){ // правильный ответ
    selected.closest('label').querySelector('.option-circle').classList.add('correct');
    quizResult.innerHTML = "<p class='correct'>Правильно!</p>";
  } else { // неправильный
    selected.closest('label').querySelector('.option-circle').classList.add('wrong');
    correctOption.querySelector('.option-circle').classList.add('correct');

    const btn = quizForm.querySelector("button");
    btn.disabled = true;
    btn.textContent = "Все уроки важны и нужны";
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = "Ответить";
      quizResult.innerHTML = "";
      document.querySelectorAll('.option-circle').forEach(c => c.classList.remove('correct','wrong'));
      document.querySelectorAll('.quiz-option').forEach(opt => opt.style.pointerEvents='auto');
      answered = false;
    }, 3000);
  }
});

// Выбор опции при клике (добавляем визуально selected)
document.querySelectorAll('.quiz-option').forEach(opt => {
  opt.addEventListener('click', () => {
    if(answered) return;
    document.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
    opt.querySelector("input").checked = true;
  });
});
