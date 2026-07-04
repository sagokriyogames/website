/* Sago Kriyo — site behaviors: theme switcher, achievements + toasts,
   pocket sudoku, mode chips, scroll reveals. Everything is progressive
   enhancement over static markup; localStorage access is fault-tolerant. */
(function () {
  "use strict";

  var SK = window.SK;

  function store(key, val) {
    try {
      if (val === undefined) return localStorage.getItem(key);
      if (val === null) localStorage.removeItem(key);
      else localStorage.setItem(key, val);
    } catch (e) { return null; }
    return null;
  }
  function readSet(key) {
    var raw = store(key);
    if (!raw) return [];
    try { return JSON.parse(raw) || []; } catch (e) { return []; }
  }
  function addToSet(key, v) {
    var s = readSet(key);
    if (s.indexOf(v) === -1) { s.push(v); store(key, JSON.stringify(s)); }
    return s;
  }

  /* ================= achievements =================
     Same data shape as the game's Achievements.DEFS. Ids shared with the
     game where the action matches. */
  var ACH = {
    first_merge:    { title: "First Merge",    detail: "Combine your first pair.",       icon: "✦" },
    reach_128:      { title: "Getting Warm",   detail: "Reach the 128 tile.",            icon: "◆" },
    reach_2048:     { title: "Infinity",       detail: "Reach the 2048 tile.",           icon: "∞", hidden: true },
    theme_explorer: { title: "Theme Explorer", detail: "Try three different themes.",    icon: "❖" },
    deep_diver:     { title: "Deep Diver",     detail: "Visit every section.",           icon: "❍" },
    mode_scholar:   { title: "Mode Scholar",   detail: "Peek at all nine modes.",        icon: "▣" },
    mini_solver:    { title: "Mini Solver",    detail: "Finish the pocket sudoku.",      icon: "✓" },
    steady_hand:    { title: "Steady Hand",    detail: "Visit on three different days.", icon: "◷", hidden: true }
  };

  var toastZone = null;
  var toastQueue = [];
  var toastBusy = false;

  function showToast(def) {
    if (!toastZone) return;
    toastQueue.push(def);
    if (!toastBusy) nextToast();
  }
  function nextToast() {
    var def = toastQueue.shift();
    if (!def) { toastBusy = false; return; }
    toastBusy = true;
    var el = document.createElement("div");
    el.className = "toast";
    el.innerHTML =
      '<div class="ach-icon">' + def.icon + "</div>" +
      '<div><span class="k">Achievement</span>' +
      '<div class="t">' + def.title + '</div>' +
      '<div class="d">' + def.detail + "</div></div>";
    toastZone.appendChild(el);
    setTimeout(function () {
      el.classList.add("toast--bye");
      setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
        nextToast();
      }, 300);
    }, 4000);
  }

  function unlocked() {
    var raw = store("sk:ach");
    try { return JSON.parse(raw) || {}; } catch (e) { return {}; }
  }
  function unlock(id) {
    var u = unlocked();
    if (u[id]) return;
    u[id] = Math.floor(Date.now() / 1000);
    store("sk:ach", JSON.stringify(u));
    var def = ACH[id];
    if (def) showToast(def);
    paintGallery();
  }

  function paintGallery() {
    var u = unlocked();
    var items = document.querySelectorAll("[data-ach]");
    for (var i = 0; i < items.length; i++) {
      var el = items[i];
      var id = el.getAttribute("data-ach");
      var def = ACH[id];
      if (!def) continue;
      var got = !!u[id];
      el.classList.toggle("ach--unlocked", got);
      el.classList.toggle("ach--locked", !got);
      var t = el.querySelector(".t"), d = el.querySelector(".d"), ic = el.querySelector(".ach-icon");
      if (def.hidden && !got) {
        if (t) t.textContent = "? ? ?";
        if (d) d.textContent = "Hidden — keep playing.";
        if (ic) ic.textContent = "?";
      } else {
        if (t) t.textContent = def.title;
        if (d) d.textContent = def.detail;
        if (ic) ic.textContent = def.icon;
      }
    }
  }

  /* ================= theme switcher ================= */
  function buildThemePopover() {
    var ctl = document.querySelector(".theme-ctl");
    if (!ctl) return;
    var btn = ctl.querySelector(".theme-btn");
    var pop = ctl.querySelector(".theme-pop");
    var label = btn.querySelector(".theme-name");
    var daily = SK.dailyThemeId();

    function chipFor(id) {
      var t = SK.THEMES.themes[id];
      var b = document.createElement("button");
      b.className = "theme-chip";
      b.type = "button";
      b.setAttribute("data-theme-id", id);
      b.setAttribute("aria-pressed", document.documentElement.dataset.theme === id ? "true" : "false");
      b.innerHTML =
        '<span class="dot" style="background:linear-gradient(135deg,' + t.bg + " 50%," + t.accent + ' 50%)"></span>' +
        "<span>" + t.name + "</span>" +
        (id === daily ? '<span class="day-mark" title="Today’s pick">◷</span>' : "");
      b.addEventListener("click", function () {
        SK.applyTheme(id);
        b.classList.remove("pop");
        void b.offsetWidth;
        b.classList.add("pop");
      });
      return b;
    }

    var dark = document.createElement("div"); dark.className = "theme-grid";
    var light = document.createElement("div"); light.className = "theme-grid";
    SK.THEMES.order.forEach(function (id) {
      (SK.THEMES.themes[id].light ? light : dark).appendChild(chipFor(id));
    });
    var hd = document.createElement("h4"); hd.textContent = "Dark";
    var hl = document.createElement("h4"); hl.textContent = "Light";
    pop.appendChild(hd); pop.appendChild(dark);
    pop.appendChild(hl); pop.appendChild(light);

    function syncUI() {
      var id = document.documentElement.dataset.theme;
      var t = SK.THEMES.themes[id];
      if (label && t) label.textContent = t.name;
      var chips = pop.querySelectorAll(".theme-chip");
      for (var i = 0; i < chips.length; i++) {
        chips[i].setAttribute("aria-pressed",
          chips[i].getAttribute("data-theme-id") === id ? "true" : "false");
      }
    }
    syncUI();

    document.addEventListener("sk:themechange", function () {
      syncUI();
      var tried = addToSet("sk:themesTried", document.documentElement.dataset.theme);
      if (tried.length >= 3) unlock("theme_explorer");
    });

    btn.addEventListener("click", function () {
      var open = pop.hasAttribute("hidden");
      if (open) { pop.removeAttribute("hidden"); btn.setAttribute("aria-expanded", "true"); }
      else { pop.setAttribute("hidden", ""); btn.setAttribute("aria-expanded", "false"); }
    });
    document.addEventListener("click", function (e) {
      if (!ctl.contains(e.target) && !pop.hasAttribute("hidden")) {
        pop.setAttribute("hidden", ""); btn.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !pop.hasAttribute("hidden")) {
        pop.setAttribute("hidden", ""); btn.setAttribute("aria-expanded", "false");
        btn.focus();
      }
    });
  }

  /* ================= pocket sudoku =================
     4×4, boxes are 2×2. Tap an empty cell to place the right number —
     a toy that teases the real game, not a test. */
  var SUDOKU_SOLUTION = [
    [1, 2, 3, 4],
    [3, 4, 1, 2],
    [2, 1, 4, 3],
    [4, 3, 2, 1]
  ];
  function buildSudoku() {
    var grid = document.querySelector(".sudoku-mini");
    if (!grid) return;
    var empties = grid.querySelectorAll("button[data-rc]");
    var left = empties.length;
    for (var i = 0; i < empties.length; i++) {
      (function (btn) {
        btn.addEventListener("click", function () {
          if (btn.classList.contains("filled")) return;
          var rc = btn.getAttribute("data-rc").split(",");
          btn.textContent = SUDOKU_SOLUTION[+rc[0]][+rc[1]];
          btn.classList.add("filled", "pop");
          btn.setAttribute("aria-label", "Filled with " + btn.textContent);
          left--;
          if (left === 0) {
            unlock("mini_solver");
            grid.classList.add("pop");
          }
        });
      })(empties[i]);
    }
  }

  /* ================= mode chips ================= */
  function buildModes() {
    var chips = document.querySelectorAll(".mode-chip");
    for (var i = 0; i < chips.length; i++) {
      (function (chip) {
        chip.addEventListener("click", function () {
          var pressed = chip.getAttribute("aria-pressed") === "true";
          chip.setAttribute("aria-pressed", pressed ? "false" : "true");
          var seen = addToSet("sk:modesSeen", chip.getAttribute("data-mode"));
          if (seen.length >= 9) unlock("mode_scholar");
        });
      })(chips[i]);
    }
    var seedEl = document.querySelector("[data-daily-seed]");
    if (seedEl) seedEl.textContent = "#" + SK.dailySeed();
  }

  /* ================= scroll reveals + section tracking ================= */
  function buildReveals() {
    var sections = document.querySelectorAll("main section[id]");
    var revealables = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      for (var i = 0; i < revealables.length; i++) revealables[i].classList.add("reveal--in");
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("reveal--in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    for (var j = 0; j < revealables.length; j++) io.observe(revealables[j]);

    var total = sections.length;
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var seen = addToSet("sk:seen", en.target.id);
        if (seen.length >= total) unlock("deep_diver");
      });
    }, { threshold: 0.4 });
    for (var k = 0; k < total; k++) so.observe(sections[k]);
  }

  /* ================= boot ================= */
  document.addEventListener("DOMContentLoaded", function () {
    toastZone = document.createElement("div");
    toastZone.className = "toast-zone";
    toastZone.setAttribute("role", "status");
    toastZone.setAttribute("aria-live", "polite");
    document.body.appendChild(toastZone);

    buildThemePopover();
    buildSudoku();
    buildModes();
    buildReveals();
    paintGallery();

    // hero board
    var boardEl = document.getElementById("hero-board");
    if (boardEl && SK.Game2048) {
      var game = SK.Game2048.mount(boardEl, {
        scoreEl: document.getElementById("hud-score"),
        bestEl: document.getElementById("hud-best")
      });
      var ng = document.getElementById("hud-new");
      if (ng) ng.addEventListener("click", function () { game.newGame(); });
    }

    // board-driven achievements
    document.addEventListener("sk:merge", function () { unlock("first_merge"); });
    document.addEventListener("sk:tile", function (e) {
      if (e.detail.value >= 128) unlock("reach_128");
      if (e.detail.value >= 2048) unlock("reach_2048");
    });

    // distinct-day visits
    var days = addToSet("sk:days", SK.dailySeed());
    if (days.length >= 3) unlock("steady_hand");

    var yr = document.getElementById("yr");
    if (yr) yr.textContent = String(new Date().getFullYear());
  });
})();
