// ---- Плавное появление секций ----
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
});

document.querySelectorAll(".fade").forEach(el => observer.observe(el));


// ---- Викторина ----

const quizData = [
  {
    question: "Какой предмет является основным?",
    options: ["Математика", "Русский язык", "История"],
    correct: 0
  },
  {
    question: "Сколько дней в неделе?",
    options: ["5", "7", "6"],
    correct: 1
  }
];

let currentQuiz = 0;
let answered = false;

const quizQuestion = document.getElementById("quiz-question");
const quizOptions = document.getElementById("quiz-options");
const quizForm = document.getElementById("quiz-form");
const quizResult = document.getElementById("quiz-result");

function loadQuiz() {
  const data = quizData[currentQuiz];

  quizQuestion.textContent = data.question;
  quizOptions.innerHTML = "";
  quizResult.textContent = "";

  data.options.forEach((opt, i) => {
    const wrapper = document.createElement("label");
    wrapper.className = "quiz-option";

    wrapper.innerHTML = `
      <div class="option-circle"></div>
      <input type="radio" name="quiz" value="${i}">
      <span class="option-text">${opt}</span>
    `;

    wrapper.addEventListener("click", () => {
      if (answered) return;
      document.querySelectorAll(".quiz-option").forEach(o => o.classList.remove("selected"));
      wrapper.classList.add("selected");
      wrapper.querySelector("input").checked = true;
    });

    quizOptions.appendChild(wrapper);
  });

  answered = false;
}

loadQuiz();

quizForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (answered) return;

  const selected = document.querySelector("input[name='quiz']:checked");
  if (!selected) {
    quizResult.textContent = "Выберите ответ";
    return;
  }

  answered = true;

  const userAns = parseInt(selected.value);
  const correct = quizData[currentQuiz].correct;

  const allOptions = document.querySelectorAll(".quiz-option");

  if (userAns === correct) {
    allOptions[userAns].querySelector(".option-circle").classList.add("correct", "show");
    quizResult.textContent = "Правильно!";

    setTimeout(() => {
      currentQuiz++;
      if (currentQuiz >= quizData.length) {
        quizResult.textContent = "Викторина завершена!";
      } else {
        loadQuiz();
      }
    }, 1000);

  } else {
    allOptions[userAns].querySelector(".option-circle").classList.add("wrong", "show");
    allOptions[correct].querySelector(".option-circle").classList.add("correct", "show");
    quizResult.textContent = "Неправильно";

    setTimeout(() => loadQuiz(), 2500);
  }
});


// ---- Панорама ----
let panoViewer = null;
let panoramaActive = false;

document.getElementById("school-btn").addEventListener("click", (e) => {
  e.preventDefault();

  document.querySelectorAll("section").forEach(sec => sec.style.display = "none");

  const schoolSec = document.getElementById("school");
  schoolSec.style.display = "block";

  setTimeout(() => schoolSec.classList.add("show"), 50);

  panoramaActive = true;

  const pan = document.getElementById("panorama");
  pan.innerHTML = "";

  panoViewer = pannellum.viewer("panorama", {
    type: "equirectangular",
    panorama: "https://pannellum.org/images/alma.jpg",
    autoLoad: true
  });
});

document.getElementById("back-main").addEventListener("click", () => {
  if (panoramaActive) {
    if (!confirm("Вы точно хотите завершить просмотр школы и вернуться назад?")) return;

    panoViewer.destroy();
    panoramaActive = false;
  }

  document.getElementById("school").style.display = "none";

  document.querySelectorAll("section").forEach(sec => {
    if (sec.id !== "school") sec.style.display = "block";
  });

  document.querySelectorAll(".fade").forEach(el => el.classList.remove("show"));
  setTimeout(() => {
    document.querySelectorAll(".fade").forEach(el => el.classList.add("show"));
  }, 50);
});


// ---- Навигация по ссылкам ----
document.querySelectorAll("header nav ul li a").forEach(link => {
  link.addEventListener("click", (e) => {
    if (link.id === "school-btn") return;

    e.preventDefault();
    const section = document.querySelector(link.getAttribute("href"));
    section.scrollIntoView({ behavior: "smooth" });

    section.classList.add("highlight");
    setTimeout(() => section.classList.remove("highlight"), 900);
  });
});
