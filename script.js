const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let stars = [];
let mouseStars = [];
let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const isMobile = window.innerWidth < 768;
const numStars = isMobile ? 100 : 200;

// Resize canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Initialize background stars
function initStars() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5,
      speed: 0.2 + Math.random() * 0.5,
    });
  }
}

// Update + draw
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background stars
  ctx.fillStyle = "#0077ff";
  for (let star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();

    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  }

  // Mouse trail stars
  for (let i = mouseStars.length - 1; i >= 0; i--) {
    const star = mouseStars[i];
    ctx.beginPath();
    ctx.fillStyle = `rgba(0, 119, 255, ${star.alpha})`;
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();

    star.x += star.vx;
    star.y += star.vy;
    star.alpha -= 0.015;

    if (star.alpha <= 0) {
      mouseStars.splice(i, 1);
    }
  }

  requestAnimationFrame(animate);
}

// Spawn stars at cursor
function spawnMouseStars(x, y) {
  for (let i = 0; i < 4; i++) {
    mouseStars.push({
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      size: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      alpha: 1,
    });
  }
}

// Mouse movement
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  spawnMouseStars(mouse.x, mouse.y);
});

// Touch movement (for mobile)
window.addEventListener("touchmove", (e) => {
  if (e.touches.length > 0) {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
    spawnMouseStars(mouse.x, mouse.y);
  }
});

// Resize listener
window.addEventListener("resize", () => {
  resizeCanvas();
  initStars();
});

// Init
resizeCanvas();
initStars();
animate();
