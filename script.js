const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
const gridSize = 20;
const rows = 20;
const cols = 20;

let snake = [{x: 10, y: 10}];
let food = {x: 5, y: 5};
// Start moving to the right automatically
let direction = {x: 1, y: 0};
let nextDirection = {x: 1, y: 0}; // to prevent reversing instantly
let score = 0;
let gameInterval;

function createFood() {
    food.x = Math.floor(Math.random() * cols);
    food.y = Math.floor(Math.random() * rows);
}

function draw() {
    gameArea.innerHTML = '';

    // Draw food
    const foodDiv = document.createElement('div');
    foodDiv.style.left = food.x * gridSize + 'px';
    foodDiv.style.top = food.y * gridSize + 'px';
    foodDiv.classList.add('food');
    gameArea.appendChild(foodDiv);

    // Draw snake
    snake.forEach(segment => {
        const snakeDiv = document.createElement('div');
        snakeDiv.style.left = segment.x * gridSize + 'px';
        snakeDiv.style.top = segment.y * gridSize + 'px';
        snakeDiv.classList.add('snake');
        gameArea.appendChild(snakeDiv);
    });

    scoreDisplay.textContent = `Score: ${score}`;
}

function moveSnake() {
    // Update direction
    direction = nextDirection;

    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};

    // Check collision with walls
    if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
        clearInterval(gameInterval);
        alert('Game Over! Your score: ' + score);
        return;
    }

    // Check collision with itself
    for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            clearInterval(gameInterval);
            alert('Game Over! Your score: ' + score);
            return;
        }
    }

    snake.unshift(head);

    // Check if food eaten
    if (head.x === food.x && head.y === food.y) {
        score++;
        createFood();
    } else {
        snake.pop();
    }

    draw();
}

document.addEventListener('keydown', e => {
    switch(e.key) {
        case 'ArrowUp':
            if (direction.y !== 1) nextDirection = {x: 0, y: -1};
            break;
        case 'ArrowDown':
            if (direction.y !== -1) nextDirection = {x: 0, y: 1};
            break;
        case 'ArrowLeft':
            if (direction.x !== 1) nextDirection = {x: -1, y: 0};
            break;
        case 'ArrowRight':
            if (direction.x !== -1) nextDirection = {x: 1, y: 0};
            break;
    }
});

createFood();
draw();
gameInterval = setInterval(moveSnake, 200);
