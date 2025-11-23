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
const quizQuestion=document.getElementById("quiz-question");

const quizData=[
  {question:"Какой предмет является основным?", options:["Математика","Русский язык","История"], correct:0},
  {question:"Сколько дней в неделе?", options:["5","7","6"], correct:1}
];
let currentQuiz=0;
let answered=false;

function loadQuiz(){
  const data=quizData[currentQuiz];
  quizQuestion.textContent=data.question;
  const labels=document.querySelectorAll(".quiz-option");
  labels.forEach((label,i)=>{
    label.querySelector("input").checked=false;
    label.querySelector(".option-circle").classList.remove("correct","wrong");
    label.childNodes[2].textContent=data.options[i];
  });
  answered=false;
}
loadQuiz();

quizForm.addEventListener("submit",function(e){
  e.preventDefault();
  if(answered) return;
  const selected=quizForm.querySelector("input[name='question']:checked");
  if(!selected){ quizResult.innerHTML="<p class='wrong'>Выберите ответ</p>"; return; }

  answered=true;
  const selectedIndex=[...quizForm.querySelectorAll("input[name='question']")].indexOf(selected);
  const labels=document.querySelectorAll(".quiz-option");
  if(selectedIndex===quizData[currentQuiz].correct){
    labels[selectedIndex].querySelector(".option-circle").classList.add("correct");
    quizResult.innerHTML="<p class='correct'>Правильно!</p>";
    setTimeout(()=>{
      currentQuiz++;
      if(currentQuiz>=quizData.length){ quizResult.innerHTML="<p>Викторина завершена!</p>"; return;}
      loadQuiz();
    },1000);
  }else{
    labels[selectedIndex].querySelector(".option-circle").classList.add("wrong");
    labels[quizData[currentQuiz].correct].querySelector(".option-circle").classList.add("correct");
    quizResult.innerHTML="<p class='wrong'>Неправильно</p>";
    setTimeout(()=>{
      loadQuiz();
      quizResult.innerHTML="";
    },3000);
  }
});

// Панорама
let panoViewer = null;
let panoramaActive=false;

document.getElementById("school-btn").addEventListener("click", e=>{
  e.preventDefault();
  document.querySelectorAll("section").forEach(sec=>sec.style.display="none");
  const schoolSec=document.getElementById("school");
  schoolSec.style.display="block";
  setTimeout(()=>schoolSec.classList.add("show"),50);
  initPanorama();
});

function initPanorama(){
  panoramaActive=true;
  const pan=document.getElementById('panorama');
  pan.innerHTML="";
  panoViewer=pannellum.viewer('panorama',{
    type:'equirectangular',
    panorama:'https://pannellum.org/images/alma.jpg',
    autoLoad:true
  });
}

document.getElementById("back-main").addEventListener("click",()=>{
  if(panoramaActive){
    const confirmExit=confirm("Вы точно хотите завершить просмотр школы и вернуться назад?");
    if(!confirmExit) return;
    panoViewer.destroy();
    panoramaActive=false;
  }
  document.getElementById("school").style.display="none";
  document.querySelectorAll("section").forEach(sec=>{ if(sec.id!=="school") sec.style.display="block"; });
});


