const pages = document.querySelectorAll(".page");
const homeCard = document.getElementById("homeCard");

function showByHash() {
  const hash = location.hash.replace("#", "") || "home";

  pages.forEach(p => p.classList.remove("active"));

  if (hash === "home") {
    document.getElementById("home").classList.add("active");
    homeCard.classList.remove("exit");
    homeCard.style.animation = "homeIn 0.8s ease forwards";
  } else {
    if (homeCard) {
      homeCard.classList.add("exit");
    }

    setTimeout(() => {
      const page = document.getElementById(hash);
      if (page) page.classList.add("active");
    }, 300);
  }
}

window.addEventListener("hashchange", showByHash);
window.addEventListener("load", showByHash);

/* ТЕМА С КД */
let lastSwitch = 0;
document.getElementById("themeToggle").onclick = () => {
  const now = Date.now();
  if (now - lastSwitch < 3000) return;
  document.body.classList.toggle("dark");
  lastSwitch = now;
};
