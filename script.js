let lastThemeSwitch = 0;
const COOLDOWN = 3000;

document.getElementById("themeToggle").onclick = () => {
  const now = Date.now();
  if (now - lastThemeSwitch < COOLDOWN) return;
  document.body.classList.toggle("dark");
  lastThemeSwitch = now;
};

function showPage(id) {
  const current = document.querySelector(".page.active");
  const next = document.getElementById(id);

  if (current && current.id === "home") {
    const card = current.querySelector(".home-card");
    card.style.animation = "homeExit 0.6s forwards";
    setTimeout(() => {
      current.classList.remove("active");
      activateNext(next, id);
    }, 600);
  } else {
    if (current) current.classList.remove("active");
    activateNext(next, id);
  }
}

function activateNext(page, id) {
  page.classList.add("active");

  if (id === "home") {
    const card = page.querySelector(".home-card");
    card.style.animation = "homeEnter 0.8s ease forwards";
  }
}

document.querySelectorAll("nav button").forEach(btn => {
  btn.onclick = () => showPage(btn.dataset.page);
});
