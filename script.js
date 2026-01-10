// Переключение страниц
document.querySelectorAll("nav button[data-page]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(btn.dataset.page).classList.add("active");
  });
});

// Тема
const toggle = document.getElementById("themeToggle");
toggle.onclick = () => {
  document.body.classList.toggle("dark");
  toggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
};

// Викторина (база)
const start = document.getElementById("startQuiz");
start.onclick = () => {
  document.getElementById("quiz-step-1").style.display = "none";
  document.getElementById("quiz-step-2").style.display = "block";
  document.getElementById("quiz-question").textContent =
    "Пример вопроса по выбранным параметрам";
};
