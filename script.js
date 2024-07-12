// Отримуємо необхідні елементи DOM
const container = document.querySelector('.container');
const background = document.querySelector('.background');

// Ініціалізуємо змінні для відстеження позиції скролінгу
let scrollPosition = 0;
const sectionWidth = window.innerWidth;
const totalWidth = sectionWidth * (container.children.length - 1);

// Змінні для обробки дотиків на мобільних пристроях
let startX, startY;
let isSwiping = false;

// Функція для оновлення позиції скролінгу
function updateScroll(delta) {
    scrollPosition += delta;
    scrollPosition = Math.max(0, Math.min(scrollPosition, totalWidth));
    container.style.transform = `translateX(-${scrollPosition}px)`;
    background.style.transform = `translateX(-${scrollPosition * 0.5}px)`; // Ефект паралаксу
}

// Обробник події для колеса миші
window.addEventListener('wheel', (e) => {
    e.preventDefault();
    updateScroll(e.deltaY);
}, { passive: false });

// Обробники подій для сенсорних пристроїв
container.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isSwiping = false;
}, { passive: true });

container.addEventListener('touchmove', (e) => {
    if (!startX || !startY) return;
    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;
    const dx = startX - x;
    const dy = startY - y;
    
    if (!isSwiping) {
        if (Math.abs(dx) > Math.abs(dy)) {
            isSwiping = true;
            e.preventDefault();
        }
    } else {
        updateScroll(dx);
        startX = x;
    }
}, { passive: false });

container.addEventListener('touchend', () => {
    startX = null;
    startY = null;
}, { passive: true });

// Обробник події для зміни розміру вікна
window.addEventListener('resize', () => {
    const newSectionWidth = window.innerWidth;
    const scaleFactor = newSectionWidth / sectionWidth;
    scrollPosition *= scaleFactor;
    updateScroll(0);
});
