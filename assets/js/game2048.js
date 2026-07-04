/* Sago Kriyo — playable 2048 hero board.
   The rules mirror the game's core/game_board.gd: 90/10 spawn of 2/4, spawn
   only after a move that changed the board, score gain = the merged tile's
   new value, one merge per tile per move, play continues after 2048.
   Rendering is DOM tiles positioned purely with transform:translate so
   slides ride the CSS transition; merge pops are a keyframe layered on the
   same transform via the --tf custom property. */
(function () {
  "use strict";

  var STORE_BOARD = "sk:board";
  var STORE_BEST = "sk:best";

  function store(key, val) {
    try {
      if (val === undefined) return localStorage.getItem(key);
      if (val === null) localStorage.removeItem(key);
      else localStorage.setItem(key, val);
    } catch (e) { return null; }
    return null;
  }

  function emit(name, detail) {
    document.dispatchEvent(new CustomEvent(name, { detail: detail || {} }));
  }

  var reducedMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function Game(boardEl, opts) {
    this.el = boardEl;
    this.size = 4;
    this.gap = 10;
    this.scoreEl = opts.scoreEl || null;
    this.bestEl = opts.bestEl || null;
    this.tileLayer = boardEl.querySelector(".tiles");
    this.overEl = null;
    this.cellSize = 0;
    this.reset(true);
    this._bind();
    this._measure();
    var saved = this._restore();
    if (!saved) this._start();
    this._paintScore();
  }

  Game.prototype.reset = function (cold) {
    this.grid = [];                 // grid[r][c] -> tile object | null
    for (var r = 0; r < this.size; r++) {
      var row = [];
      for (var c = 0; c < this.size; c++) row.push(null);
      this.grid.push(row);
    }
    this.score = 0;
    this.best = parseInt(store(STORE_BEST) || "0", 10) || 0;
    this.over = false;
    this.won = false;
    this.nextId = 1;
    if (!cold) {
      this.tileLayer.innerHTML = "";
      this._removeOverlay();
      this._persist();
      this._paintScore();
    }
  };

  Game.prototype.newGame = function () {
    this.reset(false);
    this._start();
    emit("sk:newgame");
  };

  Game.prototype._start = function () {
    this._spawn();
    this._spawn();
  };

  /* ---- geometry ---- */
  Game.prototype._measure = function () {
    var inner = this.el.clientWidth - 2 * this.gap - 2; /* padding + border */
    this.cellSize = (inner - (this.size - 1) * this.gap) / this.size;
    var self = this;
    this._eachTile(function (t) { self._place(t, true); });
  };

  Game.prototype._xy = function (r, c) {
    return [c * (this.cellSize + this.gap), r * (this.cellSize + this.gap)];
  };

  Game.prototype._place = function (t, instant) {
    var p = this._xy(t.r, t.c);
    var tf = "translate(" + p[0] + "px," + p[1] + "px)";
    if (instant) {
      t.el.style.transition = "none";
      t.el.style.transform = tf;
      t.el.style.setProperty("--tf", tf);
      // force reflow so the next move transitions again
      void t.el.offsetWidth;
      t.el.style.transition = "";
    } else {
      t.el.style.transform = tf;
      t.el.style.setProperty("--tf", tf);
    }
    t.el.style.width = this.cellSize + "px";
    t.el.style.height = this.cellSize + "px";
  };

  /* ---- tiles ---- */
  Game.prototype._styleTile = function (t) {
    var ramp = window.SK.TILE_RAMP;
    var s = ramp[t.value] || ramp[8192];
    t.el.style.background = s[0];
    t.el.style.color = s[1];
    var digits = String(t.value).length;
    var scale = digits >= 4 ? 0.30 : (digits === 3 ? 0.38 : 0.46);
    t.el.style.fontSize = Math.max(15, this.cellSize * scale) + "px";
    t.el.textContent = t.value;
  };

  Game.prototype._makeTile = function (r, c, value, fresh) {
    var el = document.createElement("div");
    el.className = "tile" + (fresh ? " tile--new" : "");
    var t = { id: this.nextId++, r: r, c: c, value: value, el: el, merged: false };
    this.grid[r][c] = t;
    this._styleTile(t);
    this.tileLayer.appendChild(el);
    this._place(t, true);
    if (fresh) {
      // the pop keyframes own `transform` while active; drop the class once
      // done so slides go back to transitioning the inline translate
      setTimeout(function () { el.classList.remove("tile--new"); }, 320);
    }
    return t;
  };

  Game.prototype._spawn = function () {
    var empty = [];
    for (var r = 0; r < this.size; r++)
      for (var c = 0; c < this.size; c++)
        if (!this.grid[r][c]) empty.push([r, c]);
    if (!empty.length) return null;
    var pos = empty[Math.floor(Math.random() * empty.length)];
    var value = Math.random() < 0.1 ? 4 : 2;   // the game's 90/10
    return this._makeTile(pos[0], pos[1], value, true);
  };

  Game.prototype._eachTile = function (fn) {
    for (var r = 0; r < this.size; r++)
      for (var c = 0; c < this.size; c++)
        if (this.grid[r][c]) fn(this.grid[r][c]);
  };

  /* ---- moving ---- */
  var VEC = { up: [-1, 0], down: [1, 0], left: [0, -1], right: [0, 1] };

  Game.prototype.move = function (dir) {
    if (this.over) return;
    var v = VEC[dir];
    if (!v) return;
    var self = this;
    var moved = false;

    this._eachTile(function (t) { t.merged = false; });

    // traversal from the far side toward the origin of movement
    var rs = [], cs = [], i;
    for (i = 0; i < this.size; i++) { rs.push(i); cs.push(i); }
    if (v[0] === 1) rs.reverse();
    if (v[1] === 1) cs.reverse();

    rs.forEach(function (r) {
      cs.forEach(function (c) {
        var t = self.grid[r][c];
        if (!t) return;
        var nr = r, nc = c;
        // walk to the farthest empty cell
        while (true) {
          var tr = nr + v[0], tc = nc + v[1];
          if (tr < 0 || tr >= self.size || tc < 0 || tc >= self.size) break;
          if (self.grid[tr][tc]) break;
          nr = tr; nc = tc;
        }
        var br = nr + v[0], bc = nc + v[1];
        var beyond = (br >= 0 && br < self.size && bc >= 0 && bc < self.size)
          ? self.grid[br][bc] : null;

        if (beyond && beyond.value === t.value && !beyond.merged && !t.merged) {
          // merge: t slides onto beyond, beyond doubles
          self.grid[r][c] = null;
          beyond.merged = true;
          beyond.value *= 2;
          self.score += beyond.value;          // score = the new value
          moved = true;
          self._slideInto(t, beyond);
        } else if (nr !== r || nc !== c) {
          self.grid[r][c] = null;
          self.grid[nr][nc] = t;
          t.r = nr; t.c = nc;
          self._place(t);
          moved = true;
        }
      });
    });

    if (!moved) return;

    if (this.score > this.best) {
      this.best = this.score;
      store(STORE_BEST, String(this.best));
    }
    this._paintScore();

    // spawn after the slide has visually settled (the game does the same beat)
    setTimeout(function () {
      self._spawn();
      self._persist();
      self._checkEnd();
    }, reducedMotion ? 0 : 95);
  };

  Game.prototype._slideInto = function (loser, winner) {
    var self = this;
    loser.r = winner.r; loser.c = winner.c;
    loser.el.style.zIndex = 1;
    this._place(loser);

    var finish = function () {
      if (!loser.el.parentNode) return;
      loser.el.parentNode.removeChild(loser.el);
      self._styleTile(winner);
      winner.el.classList.remove("tile--merged");
      void winner.el.offsetWidth;               // restart the pop if re-merging
      winner.el.classList.add("tile--merged");
      emit("sk:merge", { value: winner.value });
      emit("sk:tile", { value: winner.value });
      if (winner.value === 2048 && !self.won) {
        self.won = true;
        self.el.classList.add("board--won");
        emit("sk:win", {});
      }
    };
    if (reducedMotion) { finish(); return; }
    var done = false;
    var once = function () { if (!done) { done = true; finish(); } };
    loser.el.addEventListener("transitionend", once, { once: true });
    setTimeout(once, 220);   // transitionend can be swallowed — timeout backstop
  };

  Game.prototype._paintScore = function () {
    if (this.scoreEl) this.scoreEl.textContent = this.score.toLocaleString();
    if (this.bestEl) this.bestEl.textContent = this.best.toLocaleString();
  };

  /* ---- end states ---- */
  Game.prototype._movesLeft = function () {
    for (var r = 0; r < this.size; r++) {
      for (var c = 0; c < this.size; c++) {
        var t = this.grid[r][c];
        if (!t) return true;
        if (r + 1 < this.size && this.grid[r + 1][c] && this.grid[r + 1][c].value === t.value) return true;
        if (c + 1 < this.size && this.grid[r][c + 1] && this.grid[r][c + 1].value === t.value) return true;
      }
    }
    return false;
  };

  Game.prototype._checkEnd = function () {
    if (this._movesLeft()) return;
    this.over = true;
    store(STORE_BOARD, null);
    this._showOverlay();
    emit("sk:gameover", { score: this.score });
  };

  Game.prototype._showOverlay = function () {
    var self = this;
    var o = document.createElement("div");
    o.className = "board-over";
    o.innerHTML = '<h3>Game over</h3>' +
      '<div class="pill">Score ' + this.score.toLocaleString() + "</div>";
    var btn = document.createElement("button");
    btn.className = "btn btn--primary btn--small";
    btn.textContent = "New Game";
    btn.addEventListener("click", function () { self.newGame(); });
    o.appendChild(btn);
    this.el.appendChild(o);
    this.overEl = o;
  };

  Game.prototype._removeOverlay = function () {
    if (this.overEl && this.overEl.parentNode) this.overEl.parentNode.removeChild(this.overEl);
    this.overEl = null;
    this.el.classList.remove("board--won");
  };

  /* ---- persistence ---- */
  Game.prototype._persist = function () {
    var cells = [];
    for (var r = 0; r < this.size; r++) {
      var row = [];
      for (var c = 0; c < this.size; c++)
        row.push(this.grid[r][c] ? this.grid[r][c].value : 0);
      cells.push(row);
    }
    store(STORE_BOARD, JSON.stringify({ cells: cells, score: this.score, won: this.won }));
  };

  Game.prototype._restore = function () {
    var raw = store(STORE_BOARD);
    if (!raw) return false;
    var data;
    try { data = JSON.parse(raw); } catch (e) { return false; }
    if (!data || !data.cells || data.cells.length !== this.size) return false;
    var any = false;
    for (var r = 0; r < this.size; r++) {
      for (var c = 0; c < this.size; c++) {
        var v = data.cells[r][c];
        if (v > 0) { this._makeTile(r, c, v, false); any = true; }
      }
    }
    if (!any) return false;
    this.score = data.score || 0;
    this.won = !!data.won;
    if (this.won) this.el.classList.add("board--won");
    return true;
  };

  /* ---- input ---- */
  var KEYS = {
    ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right",
    w: "up", s: "down", a: "left", d: "right",
    W: "up", S: "down", A: "left", D: "right"
  };

  Game.prototype._bind = function () {
    var self = this;

    this.el.addEventListener("keydown", function (e) {
      var dir = KEYS[e.key];
      if (!dir) return;
      e.preventDefault();
      self.move(dir);
    });

    // play without focusing, but only while the board is mostly on screen
    // and only for arrow keys targeted at the page itself
    this.visible = false;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        self.visible = entries[0].isIntersecting;
      }, { threshold: 0.55 }).observe(this.el);
    }
    document.addEventListener("keydown", function (e) {
      if (!self.visible) return;
      if (e.target !== document.body) return;
      var dir = KEYS[e.key];
      if (!dir || !e.key.startsWith("Arrow")) return;
      e.preventDefault();
      self.move(dir);
    });

    // touch — pointer events; the board has touch-action:none
    var px = 0, py = 0, tracking = false;
    this.el.addEventListener("pointerdown", function (e) {
      tracking = true; px = e.clientX; py = e.clientY;
    });
    this.el.addEventListener("pointerup", function (e) {
      if (!tracking) return;
      tracking = false;
      var dx = e.clientX - px, dy = e.clientY - py;
      var ax = Math.abs(dx), ay = Math.abs(dy);
      if (Math.max(ax, ay) < 24) return;
      if (ax > 1.2 * ay) self.move(dx > 0 ? "right" : "left");
      else if (ay > 1.2 * ax) self.move(dy > 0 ? "down" : "up");
    });
    this.el.addEventListener("pointercancel", function () { tracking = false; });

    var rafId = null;
    window.addEventListener("resize", function () {
      if (rafId) return;
      rafId = requestAnimationFrame(function () {
        rafId = null;
        self._measure();
      });
    });
  };

  window.SK = window.SK || {};
  window.SK.Game2048 = {
    mount: function (boardEl, opts) { return new Game(boardEl, opts || {}); }
  };
})();
