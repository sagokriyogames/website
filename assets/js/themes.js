/* Sago Kriyo — theme data.
   Every palette below is extracted verbatim from 2048 Infinity's theme
   resources (data/themes/*.tres in the game repo). The website is themed by
   the same colors the game ships. Loaded blocking in <head> so the boot
   script can paint the saved theme before first render. */
window.SK = window.SK || {};

SK.THEMES = {
  order: [
    "obsidian", "daybreak", "aurora", "neon_blue", "space",
    "raining_gold", "vaporwave", "paper", "sakura_pink", "candy_pop"
  ],
  defaultDark: "obsidian",
  defaultLight: "daybreak",
  themes: {
    obsidian: {
      name: "Obsidian", category: "minimal", fx: "calm", light: false,
      bg: "#000000", surface: "#141414", surfaceAlt: "#212121",
      accent: "#2ee0ad", accentSoft: "#59f2c7",
      text: "#f2f2f2", textMuted: "#8c8c8c",
      bgGrad: "#000000", glow: "rgba(46,224,173,.45)"
    },
    daybreak: {
      name: "Daybreak", category: "minimal", fx: "vivid", light: true,
      bg: "#cfcbec", surface: "#ffffff", surfaceAlt: "#e4e2f2",
      accent: "#6b5ced", accentSoft: "#9e8cf7",
      text: "#2a2d44", textMuted: "#767a8c",
      bgGrad: "#f5e2de", glow: "rgba(140,122,247,.45)"
    },
    aurora: {
      name: "Aurora", category: "aesthetic", fx: "living", light: false,
      bg: "#050a1a", surface: "#0a1429", surfaceAlt: "#0f1f38",
      accent: "#1fd19e", accentSoft: "#6bebbf",
      text: "#e0f5f0", textMuted: "#80ada3",
      bgGrad: "#03050f", glow: "rgba(31,209,158,.52)"
    },
    neon_blue: {
      name: "Neon Blue", category: "aesthetic", fx: "arcade", light: false,
      bg: "#0a0f24", surface: "#141c38", surfaceAlt: "#1f294c",
      accent: "#33b2ff", accentSoft: "#66d9ff",
      text: "#e0edff", textMuted: "#8ca6d1",
      bgGrad: "#050817", glow: "rgba(51,178,255,.5)"
    },
    space: {
      name: "Space", category: "aesthetic", fx: "living", light: false,
      bg: "#050512", surface: "#0f0f24", surfaceAlt: "#1a1a33",
      accent: "#8c73f2", accentSoft: "#b2a6ff",
      text: "#e0e0f5", textMuted: "#8c8cb2",
      bgGrad: "#000008", glow: "rgba(140,115,242,.5)"
    },
    raining_gold: {
      name: "Raining Gold", category: "premium", fx: "playful", light: false,
      bg: "#000000", surface: "#0f0d05", surfaceAlt: "#1a1408",
      accent: "#ffcc1a", accentSoft: "#ffd638",
      text: "#faf0cc", textMuted: "#b8995c",
      bgGrad: "#000000", glow: "rgba(255,204,26,.55)"
    },
    vaporwave: {
      name: "Vaporwave", category: "fun", fx: "arcade", light: false,
      bg: "#1f0a33", surface: "#331452", surfaceAlt: "#471f6b",
      accent: "#ff59bf", accentSoft: "#59f2f2",
      text: "#f2e0ff", textMuted: "#b294d1",
      bgGrad: "#400d4c", glow: "rgba(255,89,191,.5)"
    },
    paper: {
      name: "Paper", category: "minimal", fx: "calm", light: true,
      bg: "#f7f5f0", surface: "#fffcf7", surfaceAlt: "#ebe8e3",
      accent: "#38529e", accentSoft: "#6b85c7",
      text: "#242429", textMuted: "#7a7a85",
      bgGrad: "#edebe6", glow: "transparent"
    },
    sakura_pink: {
      name: "Sakura Pink", category: "aesthetic", fx: "playful", light: true,
      bg: "#fcedf2", surface: "#fff7fa", surfaceAlt: "#fae0eb",
      accent: "#f273a6", accentSoft: "#ffb2d1",
      text: "#592e42", textMuted: "#997385",
      bgGrad: "#fadbeb", glow: "transparent"
    },
    candy_pop: {
      name: "Candy Pop", category: "fun", fx: "arcade", light: true,
      bg: "#f5ebfa", surface: "#fff7fc", surfaceAlt: "#e6dbf0",
      accent: "#f057ad", accentSoft: "#ade0b8",
      text: "#3d2447", textMuted: "#8f7599",
      bgGrad: "#e6dbf5", glow: "transparent"
    }
  }
};

/* The game's vivid tile ramp (_VIVID_RAMP in theme_manager.gd) with numeral
   ink precomputed by the game's rule: dark ink #17140D when the tile is
   brighter than luminance .58, else white. */
SK.TILE_RAMP = {
  2:    ["#eef0fa", "#17140d"],
  4:    ["#dee2f2", "#17140d"],
  8:    ["#f4c13e", "#17140d"],
  16:   ["#f2933c", "#17140d"],
  32:   ["#4d8df0", "#ffffff"],
  64:   ["#5b57e0", "#ffffff"],
  128:  ["#7b6cf6", "#ffffff"],
  256:  ["#9b5be0", "#ffffff"],
  512:  ["#c24fd0", "#ffffff"],
  1024: ["#e0529c", "#ffffff"],
  2048: ["#f0568c", "#ffffff"],
  4096: ["#36c7b8", "#ffffff"],
  8192: ["#8b5be0", "#ffffff"]
};

/* Same seed formula as the game's Daily Challenge (GameModes.daily_seed):
   everyone gets the same "board number" — and the same featured theme. */
SK.dailySeed = function () {
  var d = new Date();
  return d.getUTCFullYear() * 10000 + (d.getUTCMonth() + 1) * 100 + d.getUTCDate();
};
SK.dailyThemeId = function () {
  return SK.THEMES.order[SK.dailySeed() % SK.THEMES.order.length];
};

/* ---- color helpers (mirror ThemeManager._map_theme derivations) ---- */
SK.hexToRgb = function (hex) {
  var h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
};
SK.rgba = function (hex, a) {
  var c = SK.hexToRgb(hex);
  return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a + ")";
};
SK.lerpHex = function (a, b, t) {
  var ca = SK.hexToRgb(a), cb = SK.hexToRgb(b);
  var m = ca.map(function (v, i) { return Math.round(v + (cb[i] - v) * t); });
  return "rgb(" + m[0] + "," + m[1] + "," + m[2] + ")";
};

/* Apply a palette as CSS custom properties. Kept here (not main.js) so the
   inline boot script in <head> can theme the page pre-paint. */
SK.applyTheme = function (id) {
  var t = SK.THEMES.themes[id];
  if (!t) { id = SK.THEMES.defaultDark; t = SK.THEMES.themes[id]; }
  var r = document.documentElement, s = r.style;
  s.setProperty("--bg", t.bg);
  s.setProperty("--bg-grad", t.bgGrad);
  s.setProperty("--surface", t.surface);
  s.setProperty("--surface-alt", t.surfaceAlt);
  s.setProperty("--accent", t.accent);
  s.setProperty("--accent-soft", t.accentSoft);
  s.setProperty("--accent-16", SK.rgba(t.accent, 0.16));
  s.setProperty("--text", t.text);
  s.setProperty("--text-dim", t.textMuted);
  s.setProperty("--text-faint", SK.lerpHex(t.textMuted, t.bg, 0.45));
  s.setProperty("--glow", t.glow);
  /* glass + stroke follow the game's is_light branch */
  if (t.light) {
    s.setProperty("--glass", "rgba(255,255,255,.66)");
    s.setProperty("--stroke", SK.rgba(t.text, 0.10));
    s.setProperty("--shadow", SK.rgba(t.text, 0.16));
  } else {
    s.setProperty("--glass", SK.rgba(t.text, 0.05));
    s.setProperty("--stroke", SK.rgba(t.text, 0.10));
    s.setProperty("--shadow", "rgba(0,0,0,.5)");
  }
  /* warm "achievement" gold, blended per theme like the game */
  s.setProperty("--gold", SK.lerpHex(t.accent, "#e7c56b", 0.6));
  r.dataset.theme = id;
  if (t.light) { r.dataset.light = ""; } else { delete r.dataset.light; }
  r.style.colorScheme = t.light ? "light" : "dark";
  var metas = document.querySelectorAll('meta[name="theme-color"]');
  for (var i = 0; i < metas.length; i++) { metas[i].setAttribute("content", t.bg); }
  try { localStorage.setItem("sk:theme", id); } catch (e) { /* private mode */ }
  document.dispatchEvent(new CustomEvent("sk:themechange", { detail: { id: id, theme: t } }));
};

/* Boot: saved theme > OS preference. Called inline from <head>. */
SK.bootTheme = function () {
  var id = null;
  try { id = localStorage.getItem("sk:theme"); } catch (e) {}
  if (!id || !SK.THEMES.themes[id]) {
    var light = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    id = light ? SK.THEMES.defaultLight : SK.THEMES.defaultDark;
  }
  SK.applyTheme(id);
};
