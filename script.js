// Плавное появление
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.classList.add("show");
    });
});
document.querySelectorAll('.fade').forEach(el=>observer.observe(el));

// Разделы
const sections = document.querySelectorAll("section");

// История отдельный раздел
document.getElementById("history-btn").addEventListener("click",()=>{
    sections.forEach(sec=>sec.style.display="none");
    const hist = document.getElementById("history");
    hist.style.display="block";
    setTimeout(()=>hist.classList.add("show"),50);
});
document.getElementById("back-main-history").addEventListener("click",()=>{
    document.getElementById("history").style.display="none";
    document.getElementById("main").style.display="block";
});

// Панорама
let panoViewer = null;
document.getElementById("school-btn").addEventListener("click",()=>{
    sections.forEach(sec=>sec.style.display="none");
    const schoolSec = document.getElementById("school");
    schoolSec.style.display="block";
    setTimeout(()=>schoolSec.classList.add("show"),50);
    const pan = document.getElementById('panorama');
    pan.innerHTML = "";
    panoViewer = pannellum.viewer('panorama',{
        type:'equirectangular',
        panorama:'https://pannellum.org/images/alma.jpg',
        autoLoad:true
    });
});
document.getElementById("back-main-school").addEventListener("click",()=>{
    if(panoViewer){panoViewer.destroy(); panoViewer=null;}
    document.getElementById("school").style.display="none";
    document.getElementById("main").style.display="block";
});

// Викторина
const quizForm = document.getElementById("quiz-form");
const quizResult = document.getElementById("quiz-result");
const quizQuestion = document.getElementById("quiz-question");

const quizData = [
    {question:"Какой предмет является основным?", options:["Математика","Русский язык","История"], correct:0},
    {question:"Сколько дней в неделе?", options:["5","7","6"], correct:1}
];

let currentQuiz = 0;
let answered = false;

function loadQuiz(){
    const data = quizData[currentQuiz];
    quizQuestion.textContent = data.question;
    const labels = document.querySelectorAll(".quiz-option");
    labels.forEach((label,i)=>{
        const input = label.querySelector("input");
        const circle = label.querySelector(".option-circle");
        const textSpan = label.querySelector(".option-text");
        input.checked=false;
        circle.classList.remove("correct","wrong","show");
        label.classList.remove("selected");
        textSpan.textContent = data.options[i];
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
    const selectedIndex = [...quizForm.querySelectorAll("input[name='question']")].indexOf(selected);
    const labels = document.querySelectorAll(".quiz-option");
    const correctIndex = quizData[currentQuiz].correct;

    if(selectedIndex === correctIndex){
        labels[selectedIndex].querySelector(".option-circle").classList.add("correct","show");
        quizResult.innerHTML="<p class='correct'>Правильно!</p>";
        setTimeout(()=>{
            currentQuiz++;
            if(currentQuiz>=quizData.length){ quizResult.innerHTML="<p>Викторина завершена!</p>"; return;}
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
