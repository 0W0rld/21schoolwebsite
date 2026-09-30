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
        education: "Педагогическое училище, Набережночелнинский пединститут",
        experience: "28 лет",
        awards: "Грамоты Городского управления образования, Нижнекамского района",
        story: "Самое ценное в работе – моменты, когда через годы узнаёшь, что твои слова или поступки сыграли важную роль в судьбе ученика."
      }
    },
    { 
      name: "Рыцова Гульсирень Камиловна", 
      info: "Учитель информатики, математики и физики", 
      years: "В школе: 30 лет (с 1996 г.)", // ИСПРАВЛЕНА МАТЕМАТИКА
      img: "teacher-rytsova.png",
      details: {
        born: "20 ноября 1969 года, г. Нижнекамск",
        education: "Елабужский педагогический институт",
        experience: "30 лет",
        awards: "Почётная грамота Министерства образования и науки РТ",
        hobbies: "Шитьё, огород.",
        story: "В профессию попала случайно. Однажды в день рождения ученики приготовили сюрприз - большой торт. Пришлось снять их с уроков и пойти всем классом праздновать!"
      }
    },
    { 
      name: "Шумкина Нина Павловна", 
      info: "Учитель", 
      years: "В школе: с 1995 года", 
      img: "teacher-shumkina.png",
      details: {
        born: "г. Мамадыш",
        education: "КГПИ, Набережные Челны (1984)",
        experience: "с 1995 года",
        story: "С детства мечтала быть учителем. О первом директоре Галявееве Н.Н.: 'человек с большой буквы, мудрый, воспитанный'. Мечтает посетить Байкал."
      }
    },
    { 
      name: "Ахкиямова Фяридя Биляловна", 
      info: "Заместитель директора по учебной работе", 
      years: "В школе: 40 лет (с 1986 г.)", // ИСПРАВЛЕНА МАТЕМАТИКА
      img: "teacher-akhkiyamova.png",
      details: {
        born: "26 ноября 1955 года, Пензенская область",
        education: "Казанский Государственный университет имени Ульянова Ленина",
        experience: "40 лет",
        awards: "Почетная грамота Татарского Республиканского комитета Профсоюза",
        story: "Стала замдиректора с открытия школы в 1986 году. Любит детей и свою работу."
      }
    },
    { 
      name: "Ольга Геннадьевна", 
      info: "Педагог", 
      years: "Стаж: 30 лет", 
      img: "teacher-olga.png",
      details: {
        born: "Чувашская ССР",
        education: "Высшее педагогическое",
        experience: "30 лет (с 1995 года)",
        awards: "Грамота ГУО, Грамота Нижнекамского района РТ",
        story: "Умеет найти подход к каждому обучающемуся, поддерживает их в учебе и мотивирует стремиться к новым знаниям."
      }
    }
  ],
  school: [
    { name: "Главный вход", info: "Вид на фасад школы", years: "Фото: 2026", img: "s1.jpg" },
    { name: "Спортзал", info: "Площадка для соревнований", years: "Фото: 2025", img: "s2.jpg" },
    { name: "Библиотека", info: "Более 20 000 книг", years: "Фото: 2026", img: "s3.jpg" }
  ]
};

// Данные для ветеранов
const veteransData = {
  shumkina: galleryData.teachers[2].details,
  olga: galleryData.teachers[4].details
};

// ================= ЛОГИКА ОВЕРЛЕЕВ И ГАЛЕРЕИ =================
function openFolder(type) {
  const overlay = document.getElementById('gallery-overlay');
  const title = document.getElementById('folder-title');
  const photoList = document.getElementById('photo-list');

  title.innerText = type === 'teachers' ? "Наши Учителя" : "Наша Школа";
  photoList.innerHTML = "";

  galleryData[type].forEach((item, index) => {
    photoList.innerHTML += `
      <div class="photo-card" onclick="${type === 'teachers' ? `openTeacherDetails('teachers', ${index})` : ''}">
        <img src="${item.img}" alt="Фото" onerror="this.src='https://via.placeholder.com/300x200?text=Нет+фото'">
        <h4 style="color: var(--primary);">${item.name}</h4>
        <p style="font-size:14px; margin:5px 0; color: var(--text-main);">${item.info}</p>
        <small style="opacity:0.7">${item.years}</small>
      </div>
    `;
  });
  overlay.classList.add('visible');
}

function openTeacherDetails(type, index) {
  if (type !== 'teachers') return;
  const teacher = galleryData.teachers[index];
  if (!teacher.details) return;
  buildTeacherModal(teacher);
}

function openVeteranDetails(id) {
  const details = veteransData[id];
  if (!details) return;
  // Находим базовую инфу из galleryData чтобы взять имя и фото
  const baseTeacher = galleryData.teachers.find(t => t.details === details);
  if (baseTeacher) buildTeacherModal(baseTeacher);
}

function buildTeacherModal(teacher) {
  const overlay = document.getElementById('teacher-details-overlay');
  const content = document.getElementById('teacher-details-content');
  
  let awardsHtml = teacher.details.awards ? teacher.details.awards.split(',').map(a => `<li>${a.trim()}</li>`).join('') : '';
  
  content.innerHTML = `
    <div class="teacher-details-card">
      <button class="close-details-btn" onclick="closeModal('teacher-details-overlay')">×</button>
      <div class="teacher-details-header">
        <img src="${teacher.img}" alt="${teacher.name}" onerror="this.src='https://via.placeholder.com/150?text=Фото'">
        <h2>${teacher.name}</h2>
        <p class="teacher-position">${teacher.info}</p>
        <p class="veteran-exp">${teacher.years}</p>
      </div>
      <div class="teacher-details-body">
        ${teacher.details.born ? `<div class="detail-section"><h4>Место рождения</h4><p>${teacher.details.born}</p></div>` : ''}
        ${teacher.details.education ? `<div class="detail-section"><h4>Образование</h4><p>${teacher.details.education}</p></div>` : ''}
        <div class="detail-section"><h4>Педагогический стаж</h4><p>${teacher.details.experience}</p></div>
        ${teacher.details.awards ? `<div class="detail-section"><h4>Награды</h4><ul class="awards-list" style="padding-left: 20px;">${awardsHtml}</ul></div>` : ''}
        ${teacher.details.story ? `<div class="detail-section story-section"><h4>История</h4><p style="font-style: italic;">${teacher.details.story}</p></div>` : ''}
      </div>
    </div>
  `;
  overlay.classList.add('visible');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('visible');
}
function closeFolder() { closeModal('gallery-overlay'); }

// ================= ВИКТОРИНА =================
const questions = [
  { attention: 'low', interest: 'any', q: "В каком году открылась наша школа?", a: ["1985", "1986", "1987"], c: 1 },
  { attention: 'low', interest: 'any', q: "Кто был первым директором школы?", a: ["Махмутов А.Г.", "Галявеев Н.Н.", "Сираев И.Р."], c: 1 },
  { attention: 'medium', interest: 'any', q: "Как назывался клуб интернациональной дружбы?", a: ["КИД", "Клуб дружбы", "Интерклуб"], c: 0 },
  { attention: 'high', interest: 'any', q: "Сколько медалистов выпустила школа?", a: ["22", "32", "42"], c: 1 }
];

let quizSet = { attention: null, interest: null };
let currentPool = [], qIndex = 0;

function setQuizOption(btn, type, val) {
  btn.parentElement.querySelectorAll('.setup-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  quizSet[type] = val;

  if (quizSet.attention && quizSet.interest) {
    currentPool = questions.sort(() => 0.5 - Math.random()).slice(0, 3);
    setTimeout(() => {
      document.getElementById('quiz-setup').style.display = 'none';
      document.getElementById('quiz-main').style.display = 'block';
      qIndex = 0; renderQ();
    }, 400);
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
  quizSet = { attention: null, interest: null };
  document.getElementById('quiz-setup').style.display = 'block';
  document.getElementById('quiz-main').style.display = 'none';
  document.querySelectorAll('.setup-btn').forEach(b => b.classList.remove('active'));
}

// ================= НАВИГАЦИЯ И РОУТИНГ =================
function handleNavigation() {
  const hash = window.location.hash || "#home";
  const sections = document.querySelectorAll("section");
  
  sections.forEach(s => {
    s.style.display = "none";
    s.classList.remove("active-section");
  });

  const target = document.querySelector(hash);
  if (target) {
    target.style.display = "flex";
    setTimeout(() => target.classList.add("active-section"), 20);
  }
}

window.addEventListener("hashchange", handleNavigation);
window.addEventListener("DOMContentLoaded", handleNavigation);

function toggleMobileMenu() {
  const navList = document.querySelector("nav ul");
  navList.classList.toggle("open");
}

document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
  document.getElementById("themeToggle").innerText = document.body.classList.contains("dark") ? "🌙" : "☀️";
};
