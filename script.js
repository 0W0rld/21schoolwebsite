const pages = document.querySelectorAll(".page");
const homeCard = document.getElementById("homeCard");

// === РОУТЕР ПО ХЭШУ ===
function renderByHash() {
  const hash = location.hash.replace("#", "") || "home";

  pages.forEach(p => p.classList.remove("active"));

  if (hash === "home" || hash === "about") {
    document.getElementById("home").classList.add("active");
    homeCard.classList.remove("hide");
    homeCard.style.animation = "homeUp 0.8s ease forwards";
  } else {
    homeCard.classList.add("hide");

    setTimeout(() => {
      document.getElementById(hash)?.classList.add("active");
    }, 300);
  }
}

// === СЛУШАЕМ СМЕНУ ХЭША ===
window.addEventListener("hashchange", renderByHash);
window.addEventListener("load", renderByHash);

// === ТЁМНАЯ / СВЕТЛАЯ ТЕМА С КД ===
let lastSwitch = 0;
document.getElementById("themeToggle").onclick = () => {
  const now = Date.now();
  if (now - lastSwitch < 3000) return;
  document.body.classList.toggle("dark");
  lastSwitch = now;
};
