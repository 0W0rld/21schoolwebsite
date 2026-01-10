const sections = document.querySelectorAll("section");
const homeCard = document.querySelector(".home-card");

function showSection(){
  const hash = location.hash.replace("#","") || "home";

  sections.forEach(s=>s.style.display="none");

  if(hash === "home"){
    document.getElementById("home").style.display="flex";
    homeCard.classList.remove("exit");
    homeCard.style.animation="homeIn .8s ease forwards";
  }else{
    homeCard.classList.add("exit");
    setTimeout(()=>{
      const target = document.getElementById(hash);
      if(target){
        target.style.display="flex";
      }
    },300);
  }
}

window.addEventListener("hashchange",showSection);
window.addEventListener("load",showSection);

/* ===== FADE ===== */
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add("show");
  });
});
document.querySelectorAll(".fade").forEach(el=>observer.observe(el));

/* ===== ВИКТОРИНА ===== */
const quizData=[
  {q:"Сколько дней в неделе?",a:["5","7","6"],c:1},
  {q:"Основной предмет?",a:["Математика","Физкультура","ИЗО"],c:0}
];

let qIndex=0;
const qText=document.getElementById("quiz-question");
const options=document.querySelectorAll(".quiz-option");

function loadQuiz(){
  const d=quizData[qIndex];
  qText.textContent=d.q;
  options.forEach((o,i)=>{
    o.classList.remove("selected");
    o.querySelector(".option-circle").className="option-circle";
    o.querySelector(".option-text").textContent=d.a[i];
  });
}

options.forEach((o,i)=>{
  o.onclick=()=>{
    options.forEach(x=>x.classList.remove("selected"));
    o.classList.add("selected");
    const circle=o.querySelector(".option-circle");
    if(i===quizData[qIndex].c){
      circle.classList.add("correct");
      setTimeout(()=>{
        qIndex++;
        if(qIndex<quizData.length) loadQuiz();
      },800);
    }else{
      circle.classList.add("wrong");
    }
  };
});

loadQuiz();

