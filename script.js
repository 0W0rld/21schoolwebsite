// =====================
// ПЕРЕКЛЮЧЕНИЕ СЕКЦИЙ
// =====================

let currentSection = "mainSection";
let pendingSection = null;

const sections = document.querySelectorAll(".content-section");
const buttons = document.querySelectorAll(".menu-btn");

const modal = document.getElementById("confirmExit");
const yesExit = document.getElementById("yesExit");
const noExit = document.getElementById("noExit");

// Клик на кнопку меню
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const next = btn.dataset.section;

        highlightButton(btn);

        if (currentSection === "historySection" && next !== "historySection") {
            pendingSection = next;
            modal.style.display = "flex";
            return;
        }

        switchSection(next);
    });
});

// Подсветка кнопки панели
function highlightButton(btn) {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
}

// Переключение секций
function switchSection(id) {
    sections.forEach(sec => sec.classList.remove("visible"));

    setTimeout(() => {
        document.getElementById(id).classList.add("visible");
    }, 150);

    currentSection = id;
}

// Работа модалки
yesExit.onclick = () => {
    modal.style.display = "none";
    switchSection(pendingSection);
};
noExit.onclick = () => {
    pendingSection = null;
    modal.style.display = "none";
};

// =====================
// ВИКТОРИНА
// =====================

const quizData = [
    {
        q: "Какой предмет ведёт важную роль?",
        options: ["Математика", "Русский язык", "История"],
        correct: 0
    },
    {
        q: "Основатель школы №21?",
        options: ["Ученики", "Учителя", "Город"],
        correct: 1
    }
];

let quizIndex = 0;
const quizContainer = document.getElementById("quizContainer");

loadQuiz();

function loadQuiz() {
    const data = quizData[quizIndex];

    quizContainer.innerHTML = `
    <form id="quiz">
        <p>${data.q}</p>

        ${data.options
            .map((opt, i) => `
            <label class="quiz-option">
                <div class="option-circle"></div>
                <input name="answer" type="radio" value="${i}">
                ${opt}
            </label>
        `).join("")}

        <button>Ответить</button>
    </form>
    `;

    const form = document.getElementById("quiz");
    const options = document.querySelectorAll(".quiz-option");

    options.forEach(opt => {
        opt.addEventListener("click", () => {
            options.forEach(o => o.classList.remove("selected"));
            opt.classList.add("selected");
            opt.querySelector("input").checked = true;
        });
    });

    form.addEventListener("submit", e => {
        e.preventDefault();

        const answer = form.answer.value;
        if (answer === "") return;

        checkAnswer(answer);
    });
}

function checkAnswer(value) {
    const correct = quizData[quizIndex].correct;

    quizContainer.innerHTML = `
        <div class="result-block">
            <span class="result-icon ${value == correct ? "correct-icon" : "wrong-icon"} show">
                ${value == correct ? "✔" : "✖"}
            </span>
        </div>
    `;

    if (value == correct) {
        setTimeout(() => {
            quizIndex++;
            if (quizIndex >= quizData.length) quizIndex = 0;
            loadQuiz();
        }, 1400);
    } else {
        setTimeout(() => {
            loadQuiz();
        }, 1600);
    }
}

