/* ================= ДАННЫЕ ГАЛЕРЕИ ================= */
// Убедись, что файлы Images/t1.jpg и т.д. существуют!
const galleryData = {
    teachers: [
        { name: "Ф.И.О.", info: "Учитель Русского языка", years: "В школе: с 2010 по 2026", img: "Images/t1.jpg" },
        { name: "Ф.И.О.", info: "Учитель Математики", years: "В школе: с 2005 по 2026", img: "Images/t2.jpg" },
        { name: "Ф.И.О.", info: "Учитель Истории", years: "В школе: с 2015 по 2026", img: "Images/t3.jpg" },
        { name: "Ф.И.О.", info: "Учитель Физкультуры", years: "В школе: с 2018 по 2026", img: "Images/t4.jpg" },
        { name: "Ф.И.О.", info: "Учитель Биологии", years: "В школе: с 2012 по 2026", img: "Images/t5.jpg" }
    ],
    school: [
        { name: "Главный вход", info: "Вид на фасад школы", years: "Фото: 2026", img: "Images/s1.jpg" },
        { name: "Спортзал", info: "Площадка для соревнований", years: "Фото: 2025", img: "Images/s2.jpg" },
        { name: "Библиотека", info: "Более 20 000 книг", years: "Фото: 2026", img: "Images/s3.jpg" },
        { name: "Столовая", info: "Уютная зона обедов", years: "Фото: 2026", img: "Images/s4.jpg" },
        { name: "Кабинет Физики", info: "Лабораторное оборудование", years: "Фото: 2025", img: "Images/s5.jpg" }
    ]
};

function openFolder(type) {
    const overlay = document.getElementById('gallery-overlay');
    const title = document.getElementById('folder-title');
    const photoList = document.getElementById('photo-list');

    title.innerText = type === 'teachers' ? "Наши Учителя" : "Наша Школа";
    photoList.innerHTML = "";

    galleryData[type].forEach(item => {
        photoList.innerHTML += `
            <div class="photo-card">
                <img src="${item.img}" alt="Фото" onerror="this.src='https://via.placeholder.com/300x200?text=Нет+фото'">
                <h4 style="color:#005fa3">${item.name}</h4>
                <p style="font-size:14px; margin:5px 0;">${item.info}</p>
                <small style="opacity:0.6">${item.years}</small>
            </div>
        `;
    });

    overlay.style.display = 'flex';
}

function closeFolder() {
    document.getElementById('gallery-overlay').style.display = 'none';
}

/* ================= БАЗА ВОПРОСОВ (4 на каждый случай) ================= */
const questions = [
    // 7 КЛАСС - МАТЕМАТИКА
    { grade: 7, subject: 'math', level: 'hard', q: "Чему равна сумма углов треугольника?", a: ["90°", "180°", "360°"], c: 1 },
    { grade: 7, subject: 'math', level: 'easy', q: "Как называется результат сложения?", a: ["Сумма", "Разность", "Произведение"], c: 0 },
    // 7 КЛАСС - РУССКИЙ
    { grade: 7, subject: 'russian', level: 'hard', q: "В каком слове пишется НН?", a: ["Кожаный", "Стеклянный", "Гусиный"], c: 1 },
    { grade: 7, subject: 'russian', level: 'easy', q: "Что изучает морфология?", a: ["Звуки", "Части речи", "Запятые"], c: 1 },
    // 7 КЛАСС - ИСТОРИЯ
    { grade: 7, subject: 'history', level: 'hard', q: "Кто был первым царём из династии Романовых?", a: ["Михаил Фёдорович", "Пётр I", "Иван Грозный"], c: 0 },
    { grade: 7, subject: 'history', level: 'easy', q: "В каком году было Крещение Руси?", a: ["988", "1147", "1242"], c: 0 },
    { grade: 7, subject: 'history', level: 'hard', q: "Какое событие 1480 года официально положило конец зависимости русских земель от Большой Орды?", a: ["Утрехтский Мир", "Ништадский Мир", "Вестфальский Мир"], c: 2 },
    { grade: 7, subject: 'history', level: 'hard', q: "Как назывался первый в истории России общерусский свод законов, изданный Иваном III в 1497 году, который ввел правило «Юрьева дня»?", a: ["Русская Правда", "Судебник", "Соборное уложение"], c: 1 },
    { grade: 7, subject: 'history', level: 'easy', q: "Кто был первым русским царем, официально венчавшимся на царство в 1547 году в Успенском соборе?", a: ["Иван IV (Грозный)", "Петр I", "Борис Годунов"], c: 0 },
    { grade: 7, subject: 'history', level: 'easy', q: "Какое народное ополчение под руководством Кузьмы Минина и Дмитрия Пожарского освободило Москву от польских интервентов в 1612 году?", a: ["Первое ополчение", "Третье ополчение", "Второе ополчение"], c: 2 },
    

    // 8 КЛАСС - МАТЕМАТИКА
    { grade: 8, subject: 'math', level: 'hard', q: "Решите: x² = 64. Чему равен x?", a: ["8", "8 и -8", "16"], c: 1 },
    { grade: 8, subject: 'math', level: 'easy', q: "Чему равен корень из 121?", a: ["10", "11", "12"], c: 1 },
    // 8 КЛАСС - РУССКИЙ
    { grade: 8, subject: 'russian', level: 'hard', q: "Найдите безличное предложение:", a: ["Я иду домой.", "Вечереет.", "Мы поём."], c: 1 },
    { grade: 8, subject: 'russian', level: 'easy', q: "Как пишутся частицы -то, -либо, -нибудь?", a: ["Раздельно", "Слитно", "Через дефис"], c: 2 },
    // 8 КЛАСС - ИСТОРИЯ
    { grade: 8, subject: 'history', level: 'hard', q: "В каком году произошла Бородинская битва?", a: ["1709", "1812", "1914"], c: 1 },
    { grade: 8, subject: 'history', level: 'easy', q: "Кто победил в войне 1812 года?", a: ["Франция", "Россия", "Швеция"], c: 1 }
];

/* ================= ЛОГИКА ВИКТОРИНЫ ================= */
let quizSet = { grade: null, level: null, subject: null };
let currentPool = [];
let qIndex = 0;

function setQuizOption(btn, type, val) {
    btn.parentElement.querySelectorAll('.setup-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    quizSet[type] = val;

    if (quizSet.grade && quizSet.level && quizSet.subject) {
        currentPool = questions.filter(q => 
            q.grade === quizSet.grade && 
            q.subject === quizSet.subject && 
            q.level === quizSet.level
        );

        // Если точного совпадения уровня нет, берем все вопросы этого класса и предмета
        if (currentPool.length === 0) {
            currentPool = questions.filter(q => q.grade === quizSet.grade && q.subject === quizSet.subject);
        }

        if (currentPool.length > 0) {
            setTimeout(() => {
                document.getElementById('quiz-setup').style.display = 'none';
                document.getElementById('quiz-main').style.display = 'block';
                qIndex = 0;
                renderQ();
            }, 400);
        }
    }
}

function renderQ() {
    const qBox = document.getElementById('quiz-question');
    const optBox = document.getElementById('options-box');
    const info = document.getElementById('quiz-info');

    if (qIndex >= currentPool.length) {
        qBox.innerText = "Викторина завершена! Ты отлично справляешься!";
        optBox.innerHTML = "";
        info.innerText = "";
        return;
    }

    const currentQ = currentPool[qIndex];
    qBox.innerText = currentQ.q;
    info.innerText = `Вопрос ${qIndex + 1} из ${currentPool.length}`;
    optBox.innerHTML = "";

    currentQ.a.forEach((txt, i) => {
        const div = document.createElement('div');
        div.className = "quiz-option";
        div.innerHTML = `<div class="option-circle"></div><span>${txt}</span>`;
        div.onclick = () => {
            if (i === currentQ.c) {
                div.querySelector('.option-circle').classList.add('correct');
                setTimeout(() => { qIndex++; renderQ(); }, 600);
            } else {
                div.querySelector('.option-circle').classList.add('wrong');
            }
        };
        optBox.appendChild(div);
    });
}

function resetQuiz() {
    quizSet = { grade: null, level: null, subject: null };
    document.getElementById('quiz-setup').style.display = 'block';
    document.getElementById('quiz-main').style.display = 'none';
    document.querySelectorAll('.setup-btn').forEach(b => b.classList.remove('active'));
}

/* ================= НАВИГАЦИЯ ================= */
window.addEventListener("hashchange", () => {
    const hash = location.hash || "#home";
    document.querySelectorAll("section").forEach(s => s.style.display = "none");
    const target = document.querySelector(hash);
    if (target) target.style.display = "flex";
});

document.getElementById("themeToggle").onclick = () => {
    document.body.classList.toggle("dark");
    document.getElementById("themeToggle").innerText = document.body.classList.contains("dark") ? "🌙" : "☀️";
};

// Intersection Observer для появления
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('show'); });
});
document.querySelectorAll('.fade').forEach(f => observer.observe(f));

// Функция для показа/скрытия полного списка наград
function toggleAwards(btn) {
    const fullList = btn.nextElementSibling;
    if (fullList.style.display === 'none') {
        fullList.style.display = 'block';
        btn.textContent = '📜 Скрыть награды';
    } else {
        fullList.style.display = 'none';
        btn.textContent = '📜 Все награды (7)';
    }
}
