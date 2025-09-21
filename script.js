// ===== MATRIX-LIKE BACKGROUND =====
const canvas = document.getElementById("cover-bg");
const ctx = canvas.getContext("2d");

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[]<>?/|";
const fontSize = 12;
let columns, rows;
let grid = [];

// Initialize canvas and grid
function initCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / fontSize);
  rows = Math.ceil(canvas.height / fontSize);
  initGrid();
}

function initGrid() {
  grid = [];
  for (let y = 0; y < rows; y++) {
    let row = [];
    for (let x = 0; x < columns; x++) {
      row.push(letters.charAt(Math.floor(Math.random() * letters.length)));
    }
    grid.push(row);
  }
}

// Draw grid with gradient fade
function drawGrid() {
  // Clear canvas
  ctx.fillStyle = "#0d1117";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Create vertical gradient for opacity fade
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "rgba(255,119,170,0.75)"); // top (brighter)
  gradient.addColorStop(1, "rgba(255,119,170,0.01)"); // bottom (faded)
  ctx.fillStyle = gradient;
  ctx.font = fontSize + "px monospace";

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      ctx.fillText(grid[y][x], x * fontSize, y * fontSize);
    }
  }
}

function updateGrid() {
  const changes = Math.floor(columns * rows * 0.02);
  for (let i = 0; i < changes; i++) {
    const x = Math.floor(Math.random() * columns);
    const y = Math.floor(Math.random() * rows);
    grid[y][x] = letters.charAt(Math.floor(Math.random() * letters.length));
  }
}

function animate() {
  updateGrid();
  drawGrid();
  requestAnimationFrame(animate);
}

// Initialize canvas and animation
window.addEventListener("resize", initCanvas);
initCanvas();
animate();

// ===== PROJECT CAROUSEL =====
document.querySelectorAll('.project-carousel').forEach(carousel => {
  const slide = carousel.querySelector('.carousel-slide');
  const images = slide.querySelectorAll('img');
  const prev = carousel.querySelector('.prev');
  const next = carousel.querySelector('.next');
  let index = 0;

  function showSlide(i) {
    if (i < 0) index = 0;
    else if (i >= images.length) index = images.length - 1;
    else index = i;

    // Slide horizontally
    slide.style.transform = `translateX(-${index * 100}%)`;

    // Hide left arrow on first image, right arrow on last image
    prev.style.display = index === 0 ? 'none' : 'block';
    next.style.display = index === images.length - 1 ? 'none' : 'block';
  }

  prev.addEventListener('click', () => showSlide(index - 1));
  next.addEventListener('click', () => showSlide(index + 1));

  showSlide(0); // Initialize
});
