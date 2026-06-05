---
layout: project
title: All Projects
excerpt: "A List of Projects"
comments: false
---

<div class="project-card">
  <h2><a class="zoombtn" href="{{ '/projects/snake-game/' | relative_url }}">Snake Game</a></h2>
  <p>A browser-friendly Snake game built with HTML5 canvas and JavaScript.</p>
  <a class="btn zoombtn" href="{{ '/projects/snake-game/' | relative_url }}">Play now</a>
</div>

<div class="snake-game-shell">
  <p class="snake-instructions">Use arrow keys or WASD to move. The game starts automatically.</p>
  <div class="snake-game-status">
    <span id="snakeScore">Score: 0</span>
    <span id="snakeHighScore">High Score: 0</span>
  </div>
  <div class="snake-game-board">
    <canvas id="snakeCanvas" width="600" height="600"></canvas>
    <div id="snakeOverlay" class="snake-overlay">
      <div class="snake-overlay-card">
        <h2>Game Over</h2>
        <p>Press <strong>R</strong> or click restart to play again.</p>
        <button id="snakeRestart" class="snake-button">Restart</button>
      </div>
    </div>
  </div>
</div>

<style>
.project-card {
  background: rgba(255,255,255,0.95);
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 24px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
}
.project-card h2 {
  margin-top: 0;
}
.project-card p {
  margin: 14px 0 18px;
  max-width: 680px;
}
.snake-instructions {
  margin: 0 0 18px;
  color: #47515d;
  max-width: 680px;
}
.snake-game-shell {
  max-width: 680px;
  margin: 0 auto 32px;
}
.snake-game-status {
  display: flex;
  justify-content: space-between;
  color: #2b303a;
  font-weight: bold;
  margin-bottom: 14px;
}
.snake-game-board {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 18px 40px rgba(0,0,0,0.15);
  border-radius: 16px;
  overflow: hidden;
}
#snakeCanvas {
  display: block;
  width: 100%;
  background: #f7f1dc;
}
.snake-overlay {
  position: absolute;
  inset: 0;
  background: rgba(33, 40, 52, 0.65);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease;
}
.snake-overlay.visible {
  opacity: 1;
  visibility: visible;
}
.snake-overlay-card {
  background: #ffffff;
  border-radius: 18px;
  padding: 24px 26px;
  text-align: center;
  max-width: 320px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.18);
}
.snake-overlay-card h2 {
  margin: 0 0 10px;
  font-size: 28px;
  color: #1f2b39;
}
.snake-overlay-card p {
  margin: 0 0 18px;
  color: #45505f;
  line-height: 1.5;
}
.snake-button {
  display: inline-block;
  border: none;
  background: #84c67a;
  color: #10210b;
  padding: 12px 26px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
}
.snake-button:hover {
  transform: translateY(-1px);
}
</style>

<script src="{{ '/assets/js/snake-game.js' | relative_url }}"></script>

