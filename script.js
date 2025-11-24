// ================== ПЛАВНОЕ ПОЯВЛЕНИЕ СЕКЦИЙ ==================
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add("show"); });
});
document.querySelectorAll('.fade').forEach(el => observer.observe(el));

// ================== ВИКТОРИНА ==================
const quizForm = document.getElementById("quiz-form");
const quizResult = document.getElementById("quiz-result");
const quizQuestion = document.getElementById("quiz-question");

const quizData = [
  {question:"Какой предмет является основным?", options:["Математика","Русский язык","История"], correct:0},
  {question:"Сколько дней в неделе?", options:["5","7","6"], correct:1}
];

let currentQuiz = 0;
let answered = false;

function loadQuiz() {
  const data = quizData[currentQuiz];
  quizQuestion.textContent = data.question;
  const labels = document.querySelectorAll(".quiz-option");
  labels.forEach((label,i)=>{
    const input=label.querySelector("input");
    const circle=label.querySelector(".option-circle");
    const textSpan=label.querySelector(".option-text");
    input.checked=false;
    circle.classList.remove("correct","wrong","show");
    label.classList.remove("selected");
    textSpan.textContent=data.options[i];
  });
  answered=false;
  quizResult.innerHTML="";
}
loadQuiz();

quizForm.addEventListener("submit",function(e){
  e.preventDefault();
  if(answered) return;
  const selected = quizForm.querySelector("input[name='question']:checked");
  if(!selected){ quizResult.innerHTML="<p class='wrong'>Выберите ответ</p>"; return; }
  answered=true;
  const selectedIndex=[...quizForm.querySelectorAll("input[name='question']")].indexOf(selected);
  const labels=document.querySelectorAll(".quiz-option");
  const correctIndex=quizData[currentQuiz].correct;

  if(selectedIndex===correctIndex){
    labels[selectedIndex].querySelector(".option-circle").classList.add("correct","show");
    quizResult.innerHTML="<p class='correct'>Правильно!</p>";
    setTimeout(()=>{
      currentQuiz++;
      if(currentQuiz>=quizData.length){ quizResult.innerHTML="<p>Викторина завершена!</p>"; return; }
      loadQuiz();
    },1000);
  } else {
    labels[selectedIndex].querySelector(".option-circle").classList.add("wrong","show");
    labels[correctIndex].querySelector(".option-circle").classList.add("correct","show");
    quizResult.innerHTML="<p class='wrong'>Неправильно</p>";
    setTimeout(()=>{ loadQuiz(); },3000);
  }
});

document.querySelectorAll(".quiz-option").forEach(option=>{
  option.addEventListener("click",()=>{
    if(answered) return;
    document.querySelectorAll(".quiz-option").forEach(o=>o.classList.remove("selected"));
    option.classList.add("selected");
    option.querySelector("input").checked=true;
  });
});

// ================== ПАНОРАМА ==================
let panoViewer=null;
let panoramaActive=false;

document.getElementById("school-btn").addEventListener("click", e=>{
  e.preventDefault();
  showSectionOnly("school");
  panoramaActive=true;
  const pan=document.getElementById('panorama');
  pan.innerHTML="";
  panoViewer=pannellum.viewer('panorama',{
    type:'equirectangular',
    panorama:'https://pannellum.org/images/alma.jpg',
    autoLoad:true
  });
});

document.getElementById("back-main").addEventListener("click",()=>{
  if(panoramaActive){
    if(!confirm("Вы точно хотите завершить просмотр школы и вернуться назад?")) return;
    panoViewer.destroy();
    panoramaActive=false;
  }
  showSectionOnly("mainSection");
});

// ================== ИСТОРИЯ ==================
document.querySelectorAll(".menu-btn[data-section='historySection']").forEach(btn=>{
  btn.addEventListener("click",()=>{ showSectionOnly("historySection"); });
});

document.querySelectorAll(".back-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{ showSectionOnly("mainSection"); });
});

// ================== ФУНКЦИЯ ДЛЯ ПОКАЗА ОДНОЙ СЕКЦИИ ==================
function showSectionOnly(sectionId){
  document.querySelectorAll("section").forEach(sec=>sec.style.display="none");
  const section=document.getElementById(sectionId);
  section.style.display="block";
  section.classList.remove("show");
  setTimeout(()=>section.classList.add("show"),50);
}

// ================== ПЛАВНАЯ ПРОКРУТКА ==================
document.querySelectorAll("header nav ul li a").forEach(link=>{
  if(link.id==="school-btn") return;
  link.addEventListener("click", e=>{
    e.preventDefault();
    const target=document.querySelector(link.getAttribute("href"));
    target.scrollIntoView({behavior:"smooth"});
    target.classList.add("highlight");
    setTimeout(()=>target.classList.remove("highlight"),1000);
  });
});


