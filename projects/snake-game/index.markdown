---
layout: page
title: "Snake Game"
permalink: /projects/snake-game/
excerpt: "A browser-friendly Snake game built with HTML5 canvas and JavaScript."
comments: false
---

<div class="snake-game-shell">
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
.snake-game-shell {
  max-width: 680px;
  margin: 0 auto;
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
