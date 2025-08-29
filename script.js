const matrixRain = document.getElementById('matrixRain');
const matrixBox = document.getElementById('matrixBox');
const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function createMatrixColumn() {
  const column = document.createElement('div');
  column.className = 'matrix-column';

  const columnHeight = Math.random() * 15 + 10;
  for (let i = 0; i < columnHeight; i++) {
    const char = document.createElement('span');
    char.className = 'matrix-char';
    char.textContent = chars[Math.floor(Math.random() * chars.length)];
    column.appendChild(char);
  }

  column.style.left = Math.random() * 100 + '%';
  column.style.animationDuration = (Math.random() * 3 + 2) + 's';
  column.style.animationDelay = Math.random() * 2 + 's';

  matrixRain.appendChild(column);

  setTimeout(() => column.remove(), 9000);
}

for (let i = 0; i < 25; i++) {
  setTimeout(() => createMatrixColumn(), i * 200);
}
setInterval(createMatrixColumn, 300);

setInterval(() => {
  document.querySelectorAll('.matrix-column').forEach(column => {
    column.querySelectorAll('.matrix-char').forEach(char => {
      if (Math.random() < 0.1) {
        char.textContent = chars[Math.floor(Math.random() * chars.length)];
      }
    });
  });
}, 120);

// Subtle tilt effect for UX
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 8;
  const y = (e.clientY / window.innerHeight - 0.5) * 8;
  matrixBox.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
});


//cursor effect

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
  cursor.style.opacity = "1"; // show when mouse inside
});

document.addEventListener("mouseleave", () => {
  cursor.style.opacity = "0"; // hide when mouse leaves page
});

document.addEventListener("mouseenter", () => {
  cursor.style.opacity = "1"; // show again when mouse comes back
});


// FAQ Section
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('ai-faq');

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.ai-toggle');
    if (!btn) return;

    const card = btn.parentElement;
    const panel = card.querySelector('.ai-panel');
    const isOpen = card.classList.contains('active');

    // Close other cards
    grid.querySelectorAll('.ai-card.active').forEach(openCard => {
      if (openCard === card) return;
      collapse(openCard.querySelector('.ai-panel'), openCard);
    });

    // Toggle clicked card
    if (isOpen) {
      collapse(panel, card);
    } else {
      expand(panel, card);
    }
  });

  function collapse(panel, card) {
    panel.style.height = panel.scrollHeight + 'px';
    requestAnimationFrame(() => { panel.style.height = '0px'; });
    card.classList.remove('active');
    card.querySelector('.ai-toggle').setAttribute('aria-expanded', 'false');
  }

  function expand(panel, card) {
    panel.style.height = panel.scrollHeight + 'px';
    panel.addEventListener('transitionend', function onEnd(ev) {
      if (ev.propertyName === 'height') {
        panel.style.height = 'auto';
        panel.removeEventListener('transitionend', onEnd);
      }
    });
    card.classList.add('active');
    card.querySelector('.ai-toggle').setAttribute('aria-expanded', 'true');
  }

  // Start all closed
  document.querySelectorAll('.ai-panel').forEach(p => { p.style.height = '0px'; });
});