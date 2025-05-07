const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

// Initializing canvas and mouse settings
let stars = [];
let mouseStars = [];
let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const isMobile = window.innerWidth < 768;
const numStars = isMobile ? 100 : 200;

// Resize the canvas based on window size
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Initialize the stars with random properties
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

// Function to animate the stars and mouse particles
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the background stars
  ctx.fillStyle = "#00aaff";  // Light blue color for stars
  for (let star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();

    // Move stars down and reset position when they reach the bottom
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  }

  // Draw mouse interaction stars (particles)
  for (let i = mouseStars.length - 1; i >= 0; i--) {
    const star = mouseStars[i];
    ctx.beginPath();
    ctx.fillStyle = `rgba(0, 170, 255, ${star.alpha})`; // Slightly brighter blue
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();

    // Update the star's position and alpha value (fade-out effect)
    star.x += star.vx;
    star.y += star.vy;
    star.alpha -= 0.015;  // Fade-out speed

    // Remove the particle if it fades out
    if (star.alpha <= 0) {
      mouseStars.splice(i, 1);
    }
  }

  // Request the next frame to continue the animation
  requestAnimationFrame(animate);
}

// Spawn particles when the mouse moves
function spawnMouseStars(x, y) {
  for (let i = 0; i < 4; i++) {
    mouseStars.push({
      x: x + (Math.random() - 0.5) * 20,  // Spread the particles around the mouse position
      y: y + (Math.random() - 0.5) * 20,
      size: Math.random() * 2 + 1,  // Random size for each particle
      vx: (Math.random() - 0.5) * 1.5,  // Random velocity for direction
      vy: (Math.random() - 0.5) * 1.5,
      alpha: 1,  // Full opacity initially
    });
  }
}

// Event listener for mouse movement to spawn particles
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  spawnMouseStars(mouse.x, mouse.y);
});

// Event listener for touch events on mobile devices
window.addEventListener("touchmove", (e) => {
  e.preventDefault();
  if (e.touches.length > 0) {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
    spawnMouseStars(mouse.x, mouse.y);
  }
}, { passive: false });

// Event listener for window resize
window.addEventListener("resize", () => {
  resizeCanvas();
  initStars();
});









// Initialize the canvas, stars, and animation
resizeCanvas();
initStars();
animate();
