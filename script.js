// Переключение страниц + корректный скролл
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const page = document.getElementById(id);
  page.classList.add("active");

  setTimeout(() => {
    page.scrollIntoView({ behavior: "smooth", block: "start" });
    window.scrollBy(0, -80);
  }, 50);
}

document.querySelectorAll("nav button[data-page]").forEach(btn => {
  btn.addEventListener("click", () => {
    showPage(btn.dataset.page);
  });
});

// Защита смены темы (3 секунды)
let lastThemeSwitch = 0;
const COOLDOWN = 3000;

document.getElementById("themeToggle").addEventListener("click", () => {
  const now = Date.now();
  if (now - lastThemeSwitch < COOLDOWN) return;

  document.body.classList.toggle("dark");
  lastThemeSwitch = now;
});
