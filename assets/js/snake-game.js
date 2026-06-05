document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('snakeCanvas');
  const ctx = canvas.getContext('2d');
  const scoreEl = document.getElementById('snakeScore');
  const highScoreEl = document.getElementById('snakeHighScore');
  const overlay = document.getElementById('snakeOverlay');
  const overlayTitle = document.getElementById('snakeOverlayTitle');
  const overlayMessage = document.getElementById('snakeOverlayMessage');
  const nicknameInput = document.getElementById('snakeNicknameInput');
  const nicknameError = document.getElementById('snakeNicknameError');
  const nicknameSaved = document.getElementById('snakeNicknameSaved');
  const nicknameDisplay = document.getElementById('snakeNicknameDisplay');
  const playerLabel = document.getElementById('snakePlayerLabel');
  const startButton = document.getElementById('snakeStart');
  const leaderboardEl = document.getElementById('snakeLeaderboard');

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
  let currentPlayer = '';

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
      overlayTitle.textContent = 'Enter your 3-character nickname';
      overlayMessage.textContent = 'Your score will be saved with a 3-character name.';
      startButton.textContent = 'Start';
      nicknameInput.hidden = false;
      nicknameError.hidden = false;
      nicknameSaved.hidden = true;
    } else {
      overlayTitle.textContent = 'Game Over';
      overlayMessage.textContent = currentPlayer
        ? `Player ${currentPlayer} score saved. Press Restart to play again.`
        : 'Game over. Press Restart to play again.';
      startButton.textContent = 'Restart';
      nicknameInput.hidden = true;
      nicknameError.hidden = true;
      nicknameSaved.hidden = false;
    }
  }

  function hideOverlay() {
    overlay.classList.remove('visible');
  }

  function sanitizeNickname(value) {
    return String(value || '').trim().toUpperCase();
  }

  function validateNickname(name) {
    return /^[A-Z0-9]{3}$/.test(name);
  }

  function updateNicknameError(message) {
    nicknameError.textContent = message;
  }

  function showNicknameSaved(name) {
    nicknameInput.hidden = true;
    nicknameError.hidden = true;
    nicknameSaved.hidden = false;
    nicknameDisplay.textContent = name;
    playerLabel.textContent = `Player: ${name}`;
  }

  function loadLeaderboard() {
    try {
      return JSON.parse(localStorage.getItem('snakeLeaderboard') || '[]');
    } catch (_) {
      return [];
    }
  }

  function saveLeaderboard(list) {
    localStorage.setItem('snakeLeaderboard', JSON.stringify(list));
  }

  function renderLeaderboard() {
    const leaderboard = loadLeaderboard();
    leaderboardEl.innerHTML = '';

    if (!leaderboard.length) {
      const emptyItem = document.createElement('li');
      emptyItem.className = 'snake-leaderboard-empty';
      emptyItem.textContent = 'No scores yet. Play to save your first score.';
      leaderboardEl.appendChild(emptyItem);
      return;
    }

    leaderboard.forEach(entry => {
      const item = document.createElement('li');
      const nameSpan = document.createElement('span');
      const scoreStrong = document.createElement('strong');

      nameSpan.textContent = entry.name;
      scoreStrong.textContent = entry.score;

      item.appendChild(nameSpan);
      item.appendChild(scoreStrong);
      leaderboardEl.appendChild(item);
    });
  }

  function getStoredNickname() {
    return sanitizeNickname(localStorage.getItem('snakeNickname'));
  }

  function setStoredNickname(name) {
    localStorage.setItem('snakeNickname', name);
  }

  function loadHighScoreFromLeaderboard() {
    const leaderboard = loadLeaderboard();
    return leaderboard.length ? Math.max(...leaderboard.map(entry => entry.score)) : 0;
  }

  function recordScore() {
    if (score <= 0 || !currentPlayer) return;

    const leaderboard = loadLeaderboard();
    leaderboard.push({
      name: currentPlayer,
      score,
      created: new Date().toISOString(),
    });

    leaderboard.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.created.localeCompare(b.created);
    });

    saveLeaderboard(leaderboard.slice(0, 10));
    highScore = loadHighScoreFromLeaderboard();
  }

  function attemptStart(directionHint) {
    const nickname = sanitizeNickname(nicknameInput.value || getStoredNickname());

    if (!validateNickname(nickname)) {
      updateNicknameError('Please enter exactly 3 letters or digits.');
      return false;
    }

    currentPlayer = nickname;
    setStoredNickname(currentPlayer);
    updateNicknameError('');
    showNicknameSaved(currentPlayer);

    if (directionHint) {
      nextDirection = directionHint;
    }

    startGame();
    return true;
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

  function gameOver() {
    gameActive = false;
    if (score > highScore) {
      highScore = score;
    }
    recordScore();
    setText();
    renderLeaderboard();
    updateOverlay('gameover');
    stopLoop();
  }

  document.addEventListener('keydown', event => {
    if (document.activeElement === nicknameInput) return;

    const key = event.key.toLowerCase();
    const directionMap = {
      w: { x: 0, y: -1 },
      arrowup: { x: 0, y: -1 },
      s: { x: 0, y: 1 },
      arrowdown: { x: 0, y: 1 },
      a: { x: -1, y: 0 },
      arrowleft: { x: -1, y: 0 },
      d: { x: 1, y: 0 },
      arrowright: { x: 1, y: 0 },
    };

    if (!gameActive) {
      if (directionMap[key]) {
        setDirection(directionMap[key]);
      }
      return;
    }

    if (directionMap[key]) {
      setDirection(directionMap[key]);
    }
  });

  startButton.addEventListener('click', () => attemptStart());

  const storedNickname = getStoredNickname();
  if (storedNickname) {
    nicknameInput.value = storedNickname;
  }

  highScore = loadHighScoreFromLeaderboard();
  setText();
  renderLeaderboard();
  updateOverlay('start');
  draw();
});
