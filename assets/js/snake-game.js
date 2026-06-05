document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('snakeCanvas');
  const ctx = canvas.getContext('2d');
  const scoreEl = document.getElementById('snakeScore');
  const highScoreEl = document.getElementById('snakeHighScore');
  const overlay = document.getElementById('snakeOverlay');
  const overlayTitle = document.getElementById('snakeOverlayTitle');
  const overlayMessage = document.getElementById('snakeOverlayMessage');
  const startButton = document.getElementById('snakeStart');

  const GRID = 20;
  const TILE_COUNT = 30;
  const BASE_SPEED_MS = 110;
  const MIN_SPEED_MS = 40;

  let score = 0;
  let highScore = 0;
  let speed = BASE_SPEED_MS;
  let direction = { x: 0, y: 0 };
  let nextDirection = { x: 0, y: 0 };
  let snake = [{ x: 15, y: 15 }];
  let food = { x: 10, y: 10 };
  let gameActive = false;
  let timer = null;

  function setText() {
    scoreEl.textContent = `Score: ${score}`;
    highScoreEl.textContent = `High Score: ${highScore}`;
  }

  function placeFood() {
    food = {
      x: Math.floor(Math.random() * TILE_COUNT),
      y: Math.floor(Math.random() * TILE_COUNT),
    };

    if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
      placeFood();
    }
  }

  function draw() {
    ctx.fillStyle = '#eef7ff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fde6b5';
    ctx.fillRect(food.x * GRID, food.y * GRID, GRID, GRID);

    for (const [index, segment] of snake.entries()) {
      ctx.fillStyle = index === 0 ? '#1d3f5c' : '#5a7a98';
      ctx.fillRect(segment.x * GRID + 1, segment.y * GRID + 1, GRID - 2, GRID - 2);
    }
  }

  function stopLoop() {
    clearTimeout(timer);
    timer = null;
  }

  function updateOverlay(type) {
    overlay.classList.add('visible');
    if (type === 'start') {
      overlayTitle.textContent = 'Ready to play?';
      overlayMessage.textContent = 'Press Start or use arrow keys/WASD to begin.';
      startButton.textContent = 'Start';
    } else {
      overlayTitle.textContent = 'Game Over';
      overlayMessage.textContent = 'Press Restart, R, or any movement key to play again.';
      startButton.textContent = 'Restart';
    }
  }

  function hideOverlay() {
    overlay.classList.remove('visible');
  }

  function gameOver() {
    gameActive = false;
    if (score > highScore) {
      highScore = score;
    }
    setText();
    updateOverlay('gameover');
    stopLoop();
  }

  function startGame() {
    score = 0;
    speed = BASE_SPEED_MS;
    direction = { x: 0, y: 0 };
    nextDirection = { x: 0, y: 0 };
    snake = [{ x: 15, y: 15 }];
    placeFood();
    gameActive = true;
    setText();
    hideOverlay();
    draw();
    scheduleNext();
  }

  function scheduleNext() {
    stopLoop();
    timer = setTimeout(loop, speed);
  }

  function loop() {
    if (!gameActive) return;
    if (!nextDirection.x && !nextDirection.y) {
      scheduleNext();
      return;
    }

    direction = nextDirection;
    const head = {
      x: snake[0].x + direction.x,
      y: snake[0].y + direction.y,
    };

    if (
      head.x < 0 ||
      head.x >= TILE_COUNT ||
      head.y < 0 ||
      head.y >= TILE_COUNT ||
      snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
      gameOver();
      return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      score += 10;
      speed = Math.max(MIN_SPEED_MS, speed - 3);
      placeFood();
      setText();
    } else {
      snake.pop();
    }

    draw();
    scheduleNext();
  }

  function setDirection(newDirection) {
    if (newDirection.x === -direction.x && newDirection.y === -direction.y) return;
    nextDirection = newDirection;
  }

  document.addEventListener('keydown', event => {
    const key = event.key.toLowerCase();
    const movementKeys = ['w', 'a', 's', 'd', 'arrowup', 'arrowleft', 'arrowdown', 'arrowright'];

    switch (key) {
      case 'w':
      case 'arrowup':
        if (!gameActive) startGame();
        setDirection({ x: 0, y: -1 });
        break;
      case 's':
      case 'arrowdown':
        if (!gameActive) startGame();
        setDirection({ x: 0, y: 1 });
        break;
      case 'a':
      case 'arrowleft':
        if (!gameActive) startGame();
        setDirection({ x: -1, y: 0 });
        break;
      case 'd':
      case 'arrowright':
        if (!gameActive) startGame();
        setDirection({ x: 1, y: 0 });
        break;
      case 'r':
        if (!gameActive) startGame();
        break;
      default:
        if (!gameActive && movementKeys.includes(key)) {
          startGame();
        }
    }
  });

  startButton.addEventListener('click', startGame);

  setText();
  placeFood();
  updateOverlay('start');
  draw();
});
