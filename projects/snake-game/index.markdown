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
    <div id="snakeOverlay" class="snake-overlay visible">
      <div class="snake-overlay-card">
        <h2 id="snakeOverlayTitle">Ready to play?</h2>
        <p id="snakeOverlayMessage">Press Start or use arrow keys/WASD to begin.</p>
        <button id="snakeStart" class="snake-button">Start</button>
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
  color: #2f4f6d;
  font-weight: 700;
  margin-bottom: 14px;
}
.snake-game-board {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 20px 50px rgba(0,0,0,0.08);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(99, 130, 171, 0.15);
}
#snakeCanvas {
  display: block;
  width: 100%;
  background: #eef7ff;
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
  background: #f6fbff;
  border-radius: 20px;
  padding: 26px 28px;
  text-align: center;
  max-width: 340px;
  box-shadow: 0 22px 55px rgba(118, 143, 173, 0.16);
}
.snake-overlay-card h2 {
  margin: 0 0 10px;
  font-size: 30px;
  color: #1d3f5c;
}
.snake-overlay-card p {
  margin: 0 0 18px;
  color: #456073;
  line-height: 1.6;
}
.snake-button {
  display: inline-block;
  border: none;
  background: #5a92c1;
  color: #ffffff;
  padding: 14px 30px;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 12px 25px rgba(30, 86, 129, 0.18);
}
.snake-button:hover {
  transform: translateY(-1px);
}
</style>
