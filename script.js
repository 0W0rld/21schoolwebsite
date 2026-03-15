// ================= ДАННЫЕ ГАЛЕРЕИ =================
const galleryData = {
    teachers: [
        { 
            name: "Давлетбаева Гульназ Ринатовна", 
            info: "Заместитель директора по воспитательной работе", 
            years: "В школе: с 1998 года (28 лет)", 
            img: "teacher-davletbaeva.png",
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
            years: "В школе: с 1996 года (33 года)", 
            img: "teacher-rytsova.png",
            details: {
                born: "20 ноября 1969 года, г. Нижнекамск",
                education: "Елабужский педагогический институт (учитель информатики, математики и физики), Институт развития образования РТ",
                experience: "33 года",
                awards: "Почётная грамота Министерства образования и науки РТ (16.05.2022), Почётная грамота Татарской Республиканской организации Профсоюза образования (05.04.2023)",
                hobbies: "Больше всего нравится шитьё. Шью разные вещи. Также есть огород, где люблю проводить время.",
                story: "В школе работает с 1996 года. В профессию попала случайно - пошла поступать вместе с подругами. За годы работы было много тёплых моментов. Однажды в день рождения ученики приготовили сюрприз - большой торт. Пришлось снять их с уроков и пойти всем классом домой. Девочки накрывали на стол, мальчики украшали комнату, доставали из погреба компоты. Сидели все вместе, пили компоты, ели торт - это было замечательно! Особенно запомнился ученик Савелий Хомяков из необеспеченной семьи, который после учёбы подрабатывал в магазине, чтобы помочь бабушке."
            }
        }
    ],
    school: [
        { name: "Главный вход", info: "Вид на фасад школы", years: "Фото: 2026", img: "s1.jpg" },
        { name: "Спортзал", info: "Площадка для соревнований", years: "Фото: 2025", img: "s2.jpg" },
        { name: "Библиотека", info: "Более 20 000 книг", years: "Фото: 2026", img: "s3.jpg" },
        { name: "Столовая", info: "Уютная зона обедов", years: "Фото: 2026", img: "s4.jpg" },
        { name: "Кабинет Физики", info: "Лабораторное оборудование", years: "Фото: 2025", img: "s5.jpg" }
    ]
};

// Функция открытия папки
function openFolder(type) {
    const overlay = document.getElementById('gallery-overlay');
    const title = document.getElementById('folder-title');
    const photoList = document.getElementById('photo-list');

    title.innerText = type === 'teachers' ? "Наши Учителя" : "Наша Школа";
    photoList.innerHTML = "";

    galleryData[type].forEach((item, index) => {
        photoList.innerHTML += `
            <div class="photo-card" onclick="${type === 'teachers' ? `openTeacherDetails('${type}', ${index})` : ''}">
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
    if (type !== 'teachers') return;
    
    const teacher = galleryData.teachers[index];
    if (!teacher.details) return;
    
    const detailsOverlay = document.getElementById('teacher-details-overlay');
    const detailsContent = document.getElementById('teacher-details-content');
    
    let awardsHtml = teacher.details.awards ? teacher.details.awards.split(',').map(a => `<li>${a.trim()}</li>`).join('') : '';
    
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
                ${teacher.details.born ? `<div class="detail-section"><h4>Дата и место рождения</h4><p>${teacher.details.born}</p></div>` : ''}
                ${teacher.details.education ? `<div class="detail-section"><h4>Образование</h4><p>${teacher.details.education}</p></div>` : ''}
                <div class="detail-section"><h4>Педагогический стаж</h4><p>${teacher.details.experience}</p></div>
                ${teacher.details.awards ? `<div class="detail-section"><h4>Награды</h4><ul class="awards-list">${awardsHtml}</ul></div>` : ''}
                ${teacher.details.hobbies ? `<div class="detail-section"><h4>Увлечения</h4><p>${teacher.details.hobbies}</p></div>` : ''}
                ${teacher.details.story ? `<div class="detail-section story-section"><h4>История</h4><p class="teacher-story">${teacher.details.story}</p></div>` : ''}
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

// ================= ВОПРОСЫ ПО ИСТОРИИ ШКОЛЫ =================
const questions = [
    // ЛЕГКИЕ ВОПРОСЫ
    { grade: 'any', attention: 'low', interest: 'any', 
      q: "В каком году открылась наша школа?", 
      a: ["1985", "1986", "1987"], c: 1 },
    
    { grade: 'any', attention: 'low', interest: 'any', 
      q: "Сколько учеников приняла школа 1 сентября 1986 года?", 
      a: ["1242", "2242", "3242"], c: 1 },
    
    { grade: 'any', attention: 'low', interest: 'any', 
      q: "Кто был первым директором школы?", 
      a: ["Махмутов А.Г.", "Галявеев Н.Н.", "Сираев И.Р."], c: 1 },
    
    { grade: 'any', attention: 'low', interest: 'any', 
      q: "Сколько лет исполнилось школе в 2016 году?", 
      a: ["25 лет", "30 лет", "35 лет"], c: 1 },
    
    // СРЕДНИЕ ВОПРОСЫ
    { grade: 'any', attention: 'medium', interest: 'any', 
      q: "Сколько класс-комплектов было в школе в 1987 году?", 
      a: ["50", "100", "150"], c: 1 },
    
    { grade: 'any', attention: 'medium', interest: 'any', 
      q: "Как назывался клуб интернациональной дружбы?", 
      a: ["КИД", "Клуб дружбы", "Интерклуб"], c: 0 },
    
    { grade: 'any', attention: 'medium', interest: 'any', 
      q: "Чье имя носил КИД?", 
      a: ["Гагарина", "Саманты Смит", "Терешковой"], c: 1 },
    
    { grade: 'any', attention: 'medium', interest: 'any', 
      q: "Какой завод шефствовал над школой?", 
      a: ["Нижнекамскнефтехим", "Окись-этилен", "ТАНЕКО"], c: 1 },
    
    // СЛОЖНЫЕ ВОПРОСЫ
    { grade: 'any', attention: 'high', interest: 'any', 
      q: "Какое постановление подписал И.Метшин в 2001 году?", 
      a: ["№230", "№451а", "№253"], c: 1 },
    
    { grade: 'any', attention: 'high', interest: 'any', 
      q: "Кто был комсоргом учительской комсомольской организации?", 
      a: ["Ермолаева С.", "Шахмаева З.Л.", "Кудрявцева Г.А."], c: 1 },
    
    { grade: 'any', attention: 'high', interest: 'any', 
      q: "Сколько учителей работало в школе в 1987 году?", 
      a: ["100", "145", "200"], c: 1 },
    
    { grade: 'any', attention: 'high', interest: 'any', 
      q: "В каком году ввели эксперимент «Школа полного дня»?", 
      a: ["2005", "2006", "2007"], c: 1 },
    
    // ВОПРОСЫ ПО НАГРАДАМ
    { grade: 'any', attention: 'medium', interest: 'fascinating', 
      q: "Кто из учителей получил Грант «Лучший педагог в области ИКТ»?", 
      a: ["Рыцова Г.К.", "Вахитова А.В.", "Мингазова Е.В."], c: 0 },
    
    { grade: 'any', attention: 'medium', interest: 'fascinating', 
      q: "Сколько медалистов выпустила школа?", 
      a: ["22", "32", "42"], c: 1 }
];

// ================= ЛОГИКА ВИКТОРИНЫ =================
let quizSet = { grade: null, attention: null, interest: null };
let currentPool = [];
let qIndex = 0;

function setQuizOption(btn, type, val) {
    btn.parentElement.querySelectorAll('.setup-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    quizSet[type] = val;

    if (quizSet.grade && quizSet.attention && quizSet.interest) {
        currentPool = questions.filter(q => 
            (q.grade === quizSet.grade || q.grade === 'any') && 
            (q.attention === quizSet.attention || q.attention === 'any') && 
            (q.interest === quizSet.interest || q.interest === 'any')
        );

        if (currentPool.length < 3) {
            let additionalPool = questions.filter(q => 
                (q.grade === 'any') && 
                (q.attention === 'any' || q.attention === quizSet.attention) && 
                (q.interest === 'any' || q.interest === quizSet.interest)
            );
            currentPool = [...new Set([...currentPool, ...additionalPool])];
        }

        if (currentPool.length > 0) {
            currentPool = shuffleArray(currentPool);
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
        qBox.innerText = "Викторина завершена! Ты отлично знаешь историю школы!";
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
    quizSet = { grade: null, attention: null, interest: null };
    document.getElementById('quiz-setup').style.display = 'block';
    document.getElementById('quiz-main').style.display = 'none';
    document.querySelectorAll('.setup-btn').forEach(b => b.classList.remove('active'));
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// ================= НАВИГАЦИЯ =================
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
