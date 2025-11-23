// Липкая шапка
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  window.scrollY>10?header.classList.add("scrolled"):header.classList.remove("scrolled");
});

// Появление при скролле
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add("show"); });
});
document.querySelectorAll('.fade').forEach(el=>observer.observe(el));

// Викторина
const quizForm=document.getElementById("quiz-form");
const quizResult=document.getElementById("quiz-result");
let answered=false;

quizForm.addEventListener("submit",function(e){
  e.preventDefault();
  if(answered) return;
  const selected=quizForm.querySelector("input[name='question1']:checked");
  if(!selected){ quizResult.innerHTML="<p class='wrong'>Выберите ответ</p>"; return; }

  answered=true;
  document.querySelectorAll('.option-circle').forEach(c=>c.classList.remove('correct','wrong'));
  document.querySelectorAll('.quiz-option').forEach(opt=>opt.style.pointerEvents='none');

  const correctOption=quizForm.querySelector("label[data-correct='true']");

  if(selected.value==="math"){
    selected.closest('label').querySelector('.option-circle').classList.add('correct');
    quizResult.innerHTML="<p class='correct'>Правильно!</p>";
  }else{
    selected.closest('label').querySelector('.option-circle').classList.add('wrong');
    correctOption.querySelector('.option-circle').classList.add('correct');

    const btn=quizForm.querySelector("button");
    btn.disabled=true; btn.textContent="Все уроки важны и нужны";
    setTimeout(()=>{
      btn.disabled=false; btn.textContent="Ответить"; quizResult.innerHTML="";
      document.querySelectorAll('.option-circle').forEach(c=>c.classList.remove('correct','wrong'));
      document.querySelectorAll('.quiz-option').forEach(opt=>opt.style.pointerEvents='auto');
      answered=false;
    },3000);
  }
});

// Выбор опции
document.querySelectorAll('.quiz-option').forEach(opt=>{
  opt.addEventListener('click',()=>{
    if(answered) return;
    document.querySelectorAll('.quiz-option').forEach(o=>o.classList.remove('selected'));
    opt.classList.add('selected');
    opt.querySelector("input").checked=true;
  });
});

// Внутренняя страница школы
let panoramaActive = false;
let panoramaInstance;

document.getElementById("school-btn").addEventListener("click", e => {
  e.preventDefault();
  document.querySelectorAll("section").forEach(sec => sec.style.display = "none");
  const schoolSec = document.getElementById("school");
  schoolSec.style.display = "block";
  setTimeout(()=>schoolSec.classList.add("show"),50);
  initMap();
});

document.getElementById("back-main").addEventListener("click",()=>{
  if(panoramaActive){
    const confirmExit = confirm("Вы точно хотите закончить исследовать нашу школу и вернуться назад?");
    if(!confirmExit) return;
    panoramaActive=false;
    panoramaInstance.destroy();
  }
  const schoolSec = document.getElementById("school");
  schoolSec.style.display = "none";
  document.querySelectorAll("section").forEach(sec=>{if(sec.id!=="school") sec.style.display="block"});
});

// Навигация с подтверждением выхода из панорамы
document.querySelectorAll('nav ul li a').forEach(navLink=>{
  navLink.addEventListener('click', e=>{
    const targetId = navLink.getAttribute('href').substring(1);
    if(panoramaActive && targetId){
      e.preventDefault();
      const confirmExit = confirm("Вы точно хотите закончить исследовать нашу школу и вернуться назад?");
      if(!confirmExit) return;
      panoramaActive=false;
      panoramaInstance.destroy();
      document.querySelectorAll("section").forEach(sec=>sec.style.display="none");
      document.getElementById(targetId).style.display="block";
    }
  });
});

// Инициализация карты и панорамы
function initMap(){
  const map=L.map('map').setView([55.632,51.821],17);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:22}).addTo(map);

  const points=[
    {coords:[55.632,51.821], name:"Класс 1", info:"Преподаёт Иванов И.И.", panorama:"https://pannellum.org/images/alma.jpg"},
    {coords:[55.6325,51.822], name:"Класс 2", info:"Преподаёт Петров П.П.", panorama:"https://pannellum.org/images/alma.jpg"}
  ];

  points.forEach(p=>{
    const marker=L.marker(p.coords).addTo(map);
    marker.on("click",()=>{
      document.getElementById("info-content").innerHTML=`<h4>${p.name}</h4><p>${p.info}</p>`;
      initPanorama(p);
    });
  });
}

function initPanorama(point){
  panoramaActive=true;
  const panoramaDiv=document.getElementById("panorama");
  panoramaDiv.innerHTML="";
  panoramaInstance = pannellum.viewer('panorama',{
      "type":"equirectangular",
      "panorama": point.panorama,
      "autoLoad": true
  });
}
