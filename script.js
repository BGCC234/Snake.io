const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = window.innerWidth > 500 ? 400 : window.innerWidth - 20;
canvas.height = canvas.width;

// Grid size and initial state
const gridSize = 20;
let snake = [{ x: gridSize * 5, y: gridSize * 5 }];
let food = { x: gridSize * 10, y: gridSize * 10 };
let direction = { x: 0, y: 0 };
let score = 0;

// Load images
const snakeImage = new Image();
snakeImage.src = "snake.png"; // Replace with your snake image path

const foodImage = new Image();
foodImage.src = "food.png"; // Replace with your food image path

// Handle touch controls
document.getElementById("left").addEventListener("click", () => setDirection(-1, 0));
document.getElementById("up").addEventListener("click", () => setDirection(0, -1));
document.getElementById("down").addEventListener("click", () => setDirection(0, 1));
document.getElementById("right").addEventListener("click", () => setDirection(1, 0));

function setDirection(x, y) {
  if ((direction.x !== 0 && x !== 0) || (direction.y !== 0 && y !== 0)) return;
  direction = { x, y };
}

function update() {
  if (!direction.x && !direction.y) return;

  const head = { x: snake[0].x + direction.x * gridSize, y: snake[0].y + direction.y * gridSize };

  // Wrap around logic for infinite play
  head.x = (head.x + canvas.width) % canvas.width;
  head.y = (head.y + canvas.height) % canvas.height;

  // Check for collision with itself
  if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    alert(`Game Over! Score: ${score}`);
    snake = [{ x: gridSize * 5, y: gridSize * 5 }];
    direction = { x: 0, y: 0 };
    score = 0;
    food = { x: gridSize * 10, y: gridSize * 10 };
    return;
  }

  snake.unshift(head);

  // Check for food collision
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
      y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
    };
  } else {
    snake.pop();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  snake.forEach(segment => {
    ctx.drawImage(snakeImage, segment.x, segment.y, gridSize, gridSize);
  });

  // Draw food
  ctx.drawImage(foodImage, food.x, food.y, gridSize, gridSize);

  // Draw score
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 20);
}

function gameLoop() {
  update();
  draw();
  setTimeout(gameLoop, 100);
}

gameLoop();
