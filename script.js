let currentSection = "mainSection";
let pendingSection = null;

const sections = document.querySelectorAll(".content-section");
const menuButtons = document.querySelectorAll(".menu-btn");

const modal = document.getElementById("confirmExit");
const yesExit = document.getElementById("yesExit");
const noExit = document.getElementById("noExit");

menuButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.dataset.section;

        if (currentSection === "historySection" && target !== "historySection") {
            pendingSection = target;
            modal.style.display = "flex";
            return;
        }

        switchSection(target);
    });
});

yesExit.onclick = () => {
    modal.style.display = "none";
    switchSection(pendingSection);
};
noExit.onclick = () => {
    modal.style.display = "none";
    pendingSection = null;
};

function switchSection(id) {
    sections.forEach(sec => sec.classList.remove("visible"));

    setTimeout(() => {
        document.getElementById(id).classList.add("visible");
    }, 150);

    currentSection = id;
}

