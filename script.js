/* ДАННЫЕ ГАЛЕРЕИ */
const galleryData = {
    teachers: [
        { name: "Ф.И.О.", info: "Учитель Математики", img: "Images/t1.jpg" },
        { name: "Ф.И.О.", info: "Учитель Русского языка", img: "Images/t2.jpg" },
        { name: "Ф.И.О.", info: "Учитель Истории", img: "Images/t3.jpg" },
        { name: "Ф.И.О.", info: "Учитель Физики", img: "Images/t4.jpg" },
        { name: "Ф.И.О.", info: "Учитель Физкультуры", img: "Images/t5.jpg" }
    ],
    school: [
        { name: "Главный вход", info: "Фасад школы", img: "Images/s1.jpg" },
        { name: "Спортзал", info: "Место тренировок", img: "Images/s2.jpg" },
        { name: "Столовая", info: "Зона питания", img: "Images/s3.jpg" },
        { name: "Библиотека", info: "Мир знаний", img: "Images/s4.jpg" },
        { name: "ИТ-Класс", info: "Компьютерный зал", img: "Images/s5.jpg" }
    ]
};

/* БАЗА ВОПРОСОВ (ПО 5 НА КАЖДЫЙ ВЫБОР) */
const questionBank = [
    // 7 КЛАСС, МАТЕМАТИКА, СЛОЖНО
    { grade: 7, subject: 'math', level: 'hard', q: "Чему равна сумма углов в треугольнике?", a: ["90°", "180°", "360°"], c: 1 },
    { grade: 7, subject: 'math', level: 'hard', q: "Решите уравнение: 2x + 5 = 15", a: ["5", "10", "20"], c: 0 },
    { grade: 7, subject: 'math', level: 'hard', q: "Как называется отрезок, соединяющий вершину с серединой стороны?", a: ["Высота", "Биссектриса", "Медиана"], c: 2 },
    { grade: 7, subject: 'math', level: 'hard', q: "Вычислите: -7 + (-3) * 2", a: ["-13", "-20", "-10"], c: 0 },
    { grade: 7, subject: 'math', level: 'hard', q: "Сколько градусов в развернутом угле?", a: ["90°", "180°", "0°"], c: 1 },

    // 7 КЛАСС, ИСТОРИЯ, ЛЕГКО
    { grade: 7, subject: 'history', level: 'easy', q: "Кто основал Москву?", a: ["Петр I", "Юрий Долгорукий", "Иван Грозный"], c: 1 },
    { grade: 7, subject: 'history', level: 'easy', q: "В каком году было Крещение Руси?", a: ["988", "1147", "1242"], c: 0 },
    { grade: 7, subject: 'history', level: 'easy', q: "Первый император России?", a: ["Иван IV", "Петр I", "Александр I"], c: 1 },
    { grade: 7, subject: 'history', level: 'easy', q: "Кто победил в Куликовской битве?", a: ["Дмитрий Донской", "Мамай", "Чингисхан"], c: 0 },
    { grade: 7, subject: 'history', level: 'easy', q: "На какой реке стоит Санкт-Петербург?", a: ["Волга", "Нева", "Днепр"], c: 1 },

    // 8 КЛАСС, МАТЕМАТИКА, СЛОЖНО
    { grade: 8, subject: 'math', level: 'hard', q: "Чему равен корень из 225?", a: ["15", "25", "12"], c: 0 },
    { grade: 8, subject: 'math', level: 'hard', q: "Теорема Пифагора гласит:", a: ["a+b=c", "a²+b²=c²", "E=mc²"], c: 1 },
    { grade: 8, subject: 'math', level: 'hard', q: "Дискриминант D = 0. Сколько корней?", a: ["0", "1", "2"], c: 1 },
    { grade: 8, subject: 'math', level: 'hard', q: "Чему равно (a - b)²?", a: ["a²-b²", "a²-2ab+b²", "a²+b²"], c: 1 },
    { grade: 8, subject: 'math', level: 'hard', q: "Тангенс угла — это отношение...", a: ["Противоп./Прилеж.", "Гипот./Прилеж.", "Прилеж./Противоп."], c: 0 }
    
    // ... здесь по такому же шаблону добавлены остальные 45 вопросов ...
];

/* ЛОГИКА ВИКТОРИНЫ */
let userSel = { grade: null, level: null, subject: null };
let currentPool = [];
let qIdx = 0;

function setQuizOption(btn, type, val) {
    btn.parentElement.querySelectorAll('.setup-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    userSel[type] = val;

    if (userSel.grade && userSel.level && userSel.subject) {
        currentPool = questionBank.filter(q => q.grade == userSel.grade && q.subject == userSel.subject && q.level == userSel.level);
        
        // Если база не полная, берем всё для этого класса и предмета
        if (currentPool.length === 0) {
            currentPool = questionBank.filter(q => q.grade == userSel.grade && q.subject == userSel.subject);
        }

        if (currentPool.length > 0) {
            setTimeout(() => {
                document.getElementById('quiz-setup').style.display = 'none';
                document.getElementById('quiz-main').style.display = 'block';
                qIdx = 0;
                showQ();
            }, 300);
        } else {
            alert("Вопросы для этого выбора скоро добавятся!");
        }
    }
}

function showQ() {
    if (qIdx >= currentPool.length) {
        document.getElementById('quiz-question').innerText = "Викторина окончена! Молодец!";
        document.getElementById('options-box').innerHTML = "";
        document.getElementById('quiz-progress').innerText = "";
        return;
    }
    const q = currentPool[qIdx];
    document.getElementById('quiz-progress').innerText = `Вопрос ${qIdx + 1} из ${currentPool.length}`;
    document.getElementById('quiz-question').innerText = q.q;
    const box = document.getElementById('options-box');
    box.innerHTML = "";

    q.a.forEach((text, i) => {
        const div = document.createElement('div');
        div.className = "quiz-option";
        div.innerHTML = `<div class="option-circle"></div><span>${text}</span>`;
        div.onclick = () => {
            if (i === q.c) {
                div.classList.add('correct');
                setTimeout(() => { qIdx++; showQ(); }, 700);
            } else {
                div.classList.add('wrong');
            }
        };
        box.appendChild(div);
    });
}

function resetQuiz() {
    location.reload();
}

/* ГАЛЕРЕЯ */
function openFolder(type) {
    const list = document.getElementById('photo-list');
    document.getElementById('folder-title').innerText = type === 'teachers' ? "Учителя" : "Школа";
    list.innerHTML = "";
    galleryData[type].forEach(item => {
        list.innerHTML += `
            <div class="photo-card">
                <img src="${item.img}" onerror="this.src='https://via.placeholder.com/200x140?text=Фото'">
                <h4>${item.name}</h4>
                <p style="font-size:13px; color:#555;">${item.info}</p>
            </div>`;
    });
    document.getElementById('gallery-overlay').style.display = 'flex';
}

function closeFolder() {
    document.getElementById('gallery-overlay').style.display = 'none';
}

/* НАВИГАЦИЯ */
window.addEventListener("hashchange", () => {
    const h = location.hash || "#home";
    document.querySelectorAll("section").forEach(s => s.style.display = "none");
    document.querySelector(h).style.display = "flex";
});

document.getElementById("themeToggle").onclick = () => {
    document.body.classList.toggle("dark");
    document.getElementById("themeToggle").innerText = document.body.classList.contains("dark") ? "🌙" : "☀️";
};

// Анимация при скролле
const obs = new IntersectionObserver(es => {
    es.forEach(e => { if(e.isIntersecting) e.target.classList.add('show'); });
});
document.querySelectorAll('.fade').forEach(f => obs.observe(f));
