
       // ================= ДАННЫЕ ГАЛЕРЕИ =================
const galleryData = {
    teachers: [
        { 
            name: "Давлетбаева Гульназ Ринатовна", 
            info: "Заместитель директора по воспитательной работе", 
            years: "В школе: с 1998 года", 
            img: "Images/teacher-davletbaeva.png",
            details: {
                born: "23 июля 1978 года, г. Нижнекамск",
                education: "Педагогическое училище (учитель начальных классов), Набережночелнинский педагогический институт (учитель ИЗО)",
                experience: "28 лет",
                awards: "Грамоты Городского управления образования, Нижнекамского района Республики Татарстан",
                story: "Работа заместителем директора по ВР – это не только праздники и творчество, но и огромная ответственность. Самое ценное в работе – моменты, когда через годы узнаёшь, что твои слова или поступки сыграли важную роль в судьбе ученика. Однажды позвонила знакомая и передала трубку женщине, которая благодарила за сына, закончившего школу 5 лет назад. Оказывается, какой-то разговор с ним, сказанные вовремя слова помогли ему в жизни. Такие моменты доказывают: работа учителя - самая прекрасная, ведь от нас зависит, каким вырастет человек."
            }
        },
        { 
            name: "Рыцова Гульсирень Камиловна", 
            info: "Учитель информатики, математики и физики", 
            years: "В школе: с 1996 года", 
            img: "Images/teacher-rytsova.png",
            details: {
                born: "20 ноября 1969 года, г. Нижнекамск",
                education: "Елабужский педагогический институт (учитель информатики, математики и физики), Институт развития образования РТ",
                experience: "33 года",
                awards: "Почётная грамота Министерства образования и науки РТ (16.05.2022), Почётная грамота Татарской Республиканской организации Профсоюза образования (05.04.2023)",
                hobbies: "Больше всего нравится шитьё. Шью разные вещи. Также есть огород, где люблю проводить время.",
                story: "В школе работает с 1996 года. В профессию попала случайно - пошла поступать вместе с подругами. За годы работы было много тёплых моментов. Однажды в день рождения ученики приготовили сюрприз - большой торт. Пришлось снять их с уроков и пойти всем классом домой. Девочки накрывали на стол, мальчики украшали комнату, доставали из погреба компоты. Сидели все вместе, пили компоты, ели торт - это было замечательно! Особенно запомнился ученик Савелий Хомяков из необеспеченной семьи, который после учёбы подрабатывал в магазине, чтобы помочь бабушке."
            }
        },
        { 
            name: "ФИО", 
            info: "Учитель", 
            years: "В школе: с ... года", 
            img: "Images/te.png",
            details: {
                born: "",
                education: "",
                experience: "",
                awards: "",
                story: ""
            }
        }
        // ... остальные учителя
    ],
    school: [
        { name: "Главный вход", info: "Вид на фасад школы", years: "Фото: 2026", img: "Images/s1.jpg" },
        { name: "Спортзал", info: "Площадка для соревнований", years: "Фото: 2025", img: "Images/s2.jpg" },
        { name: "Библиотека", info: "Более 20 000 книг", years: "Фото: 2026", img: "Images/s3.jpg" },
        { name: "Столовая", info: "Уютная зона обедов", years: "Фото: 2026", img: "Images/s4.jpg" },
        { name: "Кабинет Физики", info: "Лабораторное оборудование", years: "Фото: 2025", img: "Images/s5.jpg" }
    ]
};

// Функция открытия папки (обновленная)
function openFolder(type) {
    const overlay = document.getElementById('gallery-overlay');
    const title = document.getElementById('folder-title');
    const photoList = document.getElementById('photo-list');
    const folderType = document.getElementById('folder-type'); // скрытое поле

    title.innerText = type === 'teachers' ? "Наши Учителя" : "Наша Школа";
    photoList.innerHTML = "";
    
    // Сохраняем тип папки для использования при клике
    if (folderType) folderType.value = type;

    galleryData[type].forEach((item, index) => {
        photoList.innerHTML += `
            <div class="photo-card" onclick="openTeacherDetails('${type}', ${index})">
                <img src="${item.img}" alt="Фото" onerror="this.src='https://via.placeholder.com/300x200?text=Нет+фото'">
                <h4 style="color:#005fa3">${item.name}</h4>
                <p style="font-size:14px; margin:5px 0;">${item.info}</p>
                <small style="opacity:0.6">${item.years}</small>
            </div>
        `;
    });

    overlay.style.display = 'flex';
}

// Функция открытия детальной информации об учителе
function openTeacherDetails(type, index) {
    if (type !== 'teachers') return; // Только для учителей
    
    const teacher = galleryData.teachers[index];
    if (!teacher.details) return; // Если нет детальной информации
    
    const detailsOverlay = document.getElementById('teacher-details-overlay');
    const detailsContent = document.getElementById('teacher-details-content');
    
    let awardsHtml = teacher.details.awards ? teacher.details.awards.split(',').map(a => `<li>${a.trim()}</li>`).join('') : '<li>Нет информации</li>';
    
    detailsContent.innerHTML = `
        <div class="teacher-details-card">
            <button class="close-details-btn" onclick="closeTeacherDetails()">×</button>
            <div class="teacher-details-header">
                <img src="${teacher.img}" alt="${teacher.name}" onerror="this.src='https://via.placeholder.com/150?text=Фото'">
                <h2>${teacher.name}</h2>
                <p class="teacher-position">${teacher.info}</p>
                <p class="teacher-years">${teacher.years}</p>
            </div>
            <div class="teacher-details-body">
                ${teacher.details.born ? `
                <div class="detail-section">
                    <h4>Дата и место рождения</h4>
                    <p>${teacher.details.born}</p>
                </div>
                ` : ''}
                
                ${teacher.details.education ? `
                <div class="detail-section">
                    <h4>Образование</h4>
                    <p>${teacher.details.education}</p>
                </div>
                ` : ''}
                
                <div class="detail-section">
                    <h4>Педагогический стаж</h4>
                    <p>${teacher.details.experience}</p>
                </div>
                
                ${teacher.details.awards ? `
                <div class="detail-section">
                    <h4>Награды</h4>
                    <ul class="awards-list">${awardsHtml}</ul>
                </div>
                ` : ''}
                
                ${teacher.details.hobbies ? `
                <div class="detail-section">
                    <h4>Увлечения</h4>
                    <p>${teacher.details.hobbies}</p>
                </div>
                ` : ''}
                
                ${teacher.details.story ? `
                <div class="detail-section story-section">
                    <h4>Интересная история</h4>
                    <p class="teacher-story">${teacher.details.story}</p>
                </div>
                ` : ''}
            </div>
        </div>
    `;
    
    detailsOverlay.style.display = 'flex';
}

function closeTeacherDetails() {
    document.getElementById('teacher-details-overlay').style.display = 'none';
}

function closeFolder() {
    document.getElementById('gallery-overlay').style.display = 'none';
}
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
