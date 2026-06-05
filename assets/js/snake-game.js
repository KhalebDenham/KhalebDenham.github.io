document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('snakeCanvas');
  const ctx = canvas.getContext('2d');
  const scoreEl = document.getElementById('snakeScore');
  const highScoreEl = document.getElementById('snakeHighScore');
  const overlay = document.getElementById('snakeOverlay');
  const restartButton = document.getElementById('snakeRestart');

  const GRID = 20;
  const TILE_COUNT = 30;
  const BASE_SPEED_MS = 110;
  const MIN_SPEED_MS = 40;

  let score = 0;
  let highScore = 0;
  let speed = BASE_SPEED_MS;
  let direction = { x: 1, y: 0 };
  let nextDirection = { x: 1, y: 0 };
  let snake = [{ x: 15, y: 15 }];
  let food = { x: 10, y: 10 };
  let gameActive = true;
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
    ctx.fillStyle = '#f7f1dc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#f9f2c5';
    ctx.fillRect(food.x * GRID, food.y * GRID, GRID, GRID);

    for (const [index, segment] of snake.entries()) {
      ctx.fillStyle = index === 0 ? '#22303c' : '#3d4855';
      ctx.fillRect(segment.x * GRID + 1, segment.y * GRID + 1, GRID - 2, GRID - 2);
    }
  }

  function stopLoop() {
    clearTimeout(timer);
    timer = null;
  }

  function showOverlay() {
    overlay.classList.add('visible');
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
    showOverlay();
    stopLoop();
  }

  function resetGame() {
    score = 0;
    speed = BASE_SPEED_MS;
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
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
    direction = nextDirection.x || nextDirection.y ? nextDirection : direction;
    if (!direction.x && !direction.y) {
      scheduleNext();
      return;
    }

    const head = {
      x: snake[0].x + direction.x,
      y: snake[0].y + direction.y,
    };

    if (head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
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
    if (!gameActive && key === 'r') {
      resetGame();
      return;
    }
    switch (key) {
      case 'w':
      case 'arrowup':
        setDirection({ x: 0, y: -1 });
        break;
      case 's':
      case 'arrowdown':
        setDirection({ x: 0, y: 1 });
        break;
      case 'a':
      case 'arrowleft':
        setDirection({ x: -1, y: 0 });
        break;
      case 'd':
      case 'arrowright':
        setDirection({ x: 1, y: 0 });
        break;
    }
  });

  restartButton.addEventListener('click', resetGame);

  setText();
  draw();
  scheduleNext();
});
