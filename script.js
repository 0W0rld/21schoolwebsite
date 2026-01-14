/* ===== НАВИГАЦИЯ ===== */
const sections=document.querySelectorAll("section");
const homeCard=document.querySelector(".home-card");

function showSection(){
  const hash=location.hash.replace("#","")||"home";
  sections.forEach(s=>s.style.display="none");

  if(hash==="home"){
    document.getElementById("home").style.display="flex";
    homeCard.classList.remove("exit");
  }else{
    homeCard.classList.add("exit");
    const target=document.getElementById(hash);
    if(target) target.style.display="flex";
  }
}

window.addEventListener("hashchange",showSection);
window.addEventListener("load",showSection);

/* ===== FADE ===== */
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add("show");
  });
});
document.querySelectorAll(".fade").forEach(el=>observer.observe(el));

/* ===== ТЕМА ===== */
const themeBtn=document.getElementById("themeToggle");
let cd=false;

themeBtn.onclick=()=>{
  if(cd) return;
  cd=true;
  setTimeout(()=>cd=false,3000);

  document.body.classList.toggle("dark");
  themeBtn.textContent=document.body.classList.contains("dark")?"🌙":"☀️";
};

/* ===== ВИКТОРИНА ===== */
const quizState={};

function setQuizOption(k,v){
  quizState[k]=v;
  if(quizState.grade&&quizState.level&&quizState.subject){
    document.getElementById("quiz-setup").style.display="none";
    document.getElementById("quiz-main").style.display="block";
    loadQuiz();
  }
}

const quizData=[
  {q:"Сколько дней в неделе?",a:["5","7","6"],c:1},
  {q:"2 + 2 = ?",a:["3","4","5"],c:1}
];

let qIndex=0;
const qText=document.getElementById("quiz-question");
const options=document.querySelectorAll(".quiz-option");

function loadQuiz(){
  const d=quizData[qIndex];
  qText.textContent=d.q;
  options.forEach((o,i)=>{
    o.querySelector(".option-text").textContent=d.a[i];
    o.querySelector(".option-circle").className="option-circle";
  });
}

options.forEach((o,i)=>{
  o.onclick=()=>{
    if(i===quizData[qIndex].c){
      o.querySelector(".option-circle").style.background="#00b347";
      qIndex++;
      if(qIndex<quizData.length) setTimeout(loadQuiz,800);
    }else{
      o.querySelector(".option-circle").style.background="#d90000";
    }
  };
});

