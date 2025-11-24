// Плавное появление при скролле
const observer = new IntersectionObserver((entries) => {
    entries.forEach(el => {
        if (el.isIntersecting) el.target.classList.add("show");
    });
});
document.querySelectorAll(".fade").forEach(el => observer.observe(el));


// ПЕРЕКЛЮЧЕНИЕ СЕКЦИЙ
const sections = document.querySelectorAll(".content-section");
const buttons = document.querySelectorAll(".menu-btn");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {

        const id = btn.dataset.section;

        // Показ нужной секции
        sections.forEach(sec => sec.classList.remove("visible"));
        document.getElementById(id).classList.add("visible");

        // Плавное появление
        setTimeout(() => {
            document.getElementById(id).classList.add("show");
        }, 50);

        // Подсветка кнопки
        btn.style.background = "rgba(0, 121, 255, 0.35)";
        setTimeout(() => btn.style.background = "none", 300);
    });
});


// ❗ УБИРАЕМ ВСЕ АВТОПЕРЕКЛЮЧЕНИЯ НА ИСТОРИЮ
// Ничего больше не переключает страницы автоматически.


// ВИКТОРИНА
const quizContainer = document.getElementById("quizContainer");

let quizIndex = 0;

const questions = [
    {
        text: "Какой предмет является основным?",
        answers: [
            {text: "Математика", correct: true},
            {text: "Русский язык", correct: false},
            {text: "История", correct: false}
        ]
    },
    {
        text: "Сколько лет учатся в средней школе?",
        answers: [
            {text: "9 лет", correct: true},
            {text: "7 лет", correct: false},
            {text: "11 лет", correct: false}
        ]
    }
];

function renderQuiz() {
    const q = questions[quizIndex];

    quizContainer.innerHTML = `
        <p>${q.text}</p>
        ${q.answers.map((a, i)=>`
            <label class="quiz-option" data-id="${i}">
                <div class="option-circle"></div>
                <input type="radio" name="q">
                ${a.text}
            </label>
        `).join("")}
        <button id="answerBtn">Ответить</button>
    `;

    document.querySelectorAll(".quiz-option").forEach(op => {
        op.addEventListener("click", () => {
            document.querySelectorAll(".quiz-option").forEach(o => o.classList.remove("selected"));
            op.classList.add("selected");
        });
    });

    document.getElementById("answerBtn").onclick = checkAnswer;
}

function checkAnswer() {

    const selected = document.querySelector(".quiz-option.selected");
    if (!selected) return;

    const answerId = selected.dataset.id;
    const correct = questions[quizIndex].answers[answerId].correct;

    if (correct) {
        quizContainer.innerHTML = "<p class='correct'>Правильно! 🎉</p>";

        setTimeout(() => {
            quizIndex++;
            if (quizIndex < questions.length) renderQuiz();
            else quizContainer.innerHTML = "<p>Викторина завершена!</p>";
        }, 1200);

    } else {
        selected.style.borderColor = "#d90000";
        selected.querySelector(".option-circle").style.background = "#d90000";

        const btn = document.getElementById("answerBtn");
        btn.textContent = "Все уроки важны и нужны!";
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = "Ответить";
            btn.disabled = false;
        }, 3000);
    }
}

renderQuiz();
