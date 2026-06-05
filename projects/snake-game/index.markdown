---
layout: page
title: "Snake Game"
permalink: /projects/snake-game/
excerpt: "A browser-friendly Snake game built with HTML5 canvas and JavaScript."
comments: false
---

<div class="snake-game-shell">
  <div class="snake-game-status">
    <span id="snakePlayerLabel">Player: —</span>
    <span id="snakeScore">Score: 0</span>
    <span id="snakeHighScore">High Score: 0</span>
  </div>
  <div class="snake-game-board">
    <canvas id="snakeCanvas" width="600" height="600"></canvas>
    <div id="snakeOverlay" class="snake-overlay visible">
      <div class="snake-overlay-card">
        <h2 id="snakeOverlayTitle">Enter your 3-character nickname</h2>
        <p id="snakeOverlayMessage">Your score will be saved with a 3-character name.</p>
        <input id="snakeNicknameInput" class="snake-input" maxlength="3" placeholder="ABC" autocomplete="off" />
        <div id="snakeNicknameError" class="snake-error"></div>
        <div id="snakeNicknameSaved" class="snake-saved-name" hidden>
          Nickname saved: <strong id="snakeNicknameDisplay"></strong>
        </div>
        <button id="snakeStart" class="snake-button">Start</button>
      </div>
    </div>
  </div>
</div>

<div class="snake-scoreboard">
  <div class="snake-scoreboard-header">
    <h3>Leaderboard</h3>
    <span class="snake-scoreboard-note">Saved in your browser</span>
  </div>
  <ul id="snakeLeaderboard" class="snake-leaderboard-list">
    <li class="snake-leaderboard-empty">No scores yet. Play to save your first score.</li>
  </ul>
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
.snake-input {
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto 12px;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid rgba(74, 121, 160, 0.3);
  background: #eef7ff;
  color: #1d3f5c;
  font-size: 18px;
  text-align: center;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}
.snake-error {
  min-height: 18px;
  margin-bottom: 16px;
  color: #b63c47;
  font-size: 14px;
}
.snake-saved-name {
  margin-bottom: 16px;
  padding: 12px 14px;
  border-radius: 12px;
  background: rgba(90, 146, 193, 0.12);
  color: #1d3f5c;
  font-weight: 700;
}
.snake-scoreboard {
  max-width: 680px;
  margin: 24px auto 0;
  padding: 18px 22px;
  background: #f8fbff;
  border: 1px solid rgba(90, 146, 193, 0.16);
  border-radius: 18px;
}
.snake-scoreboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.snake-scoreboard-header h3 {
  margin: 0;
  font-size: 22px;
  color: #1d3f5c;
}
.snake-scoreboard-note {
  color: #5a7a98;
  font-size: 14px;
}
.snake-leaderboard-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.snake-leaderboard-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid rgba(84, 144, 201, 0.12);
  margin-bottom: 10px;
  color: #2f4f6d;
}
.snake-leaderboard-list li:last-child {
  margin-bottom: 0;
}
.snake-leaderboard-empty {
  padding: 14px;
  color: #5a7a98;
  background: rgba(90, 146, 193, 0.06);
  text-align: center;
}
</style>
