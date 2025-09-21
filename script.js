const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20; // size of each square
const canvasSize = canvas.width;
let snake = [{ x: 200, y: 200 }];
let food = { x: 0, y: 0 };
let dx = gridSize;
let dy = 0;
let gameInterval;

// Generate random food position
function randomFood() {
  food.x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
  food.y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
}

// Draw canvas, snake, and food
function draw() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw food
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, gridSize, gridSize);

  // Draw snake
  ctx.fillStyle = '#00ffcc';
  snake.forEach(part => ctx.fillRect(part.x, part.y, gridSize, gridSize));
}

// Move snake and check collisions
function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // GAME OVER if snake hits border
  if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
    clearInterval(gameInterval);
    alert('Game Over! You hit the wall.');
    return;
  }

  snake.unshift(head);

  // Check if snake eats food
  if (head.x === food.x && head.y === food.y) {
    randomFood();
  } else {
    snake.pop();
  }

  // Check self-collision
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      clearInterval(gameInterval);
      alert('Game Over! You ate yourself.');
      return;
    }
  }
}

// Main game loop
function gameLoop() {
  moveSnake();
  draw();
}

// Change snake direction
function changeDirection(direction) {
  if (direction === 'up' && dy === 0) { dx = 0; dy = -gridSize; }
  if (direction === 'down' && dy === 0) { dx = 0; dy = gridSize; }
  if (direction === 'left' && dx === 0) { dx = -gridSize; dy = 0; }
  if (direction === 'right' && dx === 0) { dx = gridSize; dy = 0; }
}

// Listen for keyboard input
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp') changeDirection('up');
  if (e.key === 'ArrowDown') changeDirection('down');
  if (e.key === 'ArrowLeft') changeDirection('left');
  if (e.key === 'ArrowRight') changeDirection('right');
});

// Start game
randomFood();
gameInterval = setInterval(gameLoop, 150);
