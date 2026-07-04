/* Sago Kriyo — theme data.
   ALL 33 palettes below are extracted verbatim from 2048 Infinity's theme
   resources (data/themes/*.tres), in the game's own manifest order
   (theme_ids.gd), with the game's category grouping (minimal / fun /
   aesthetic / premium). The website is themed by the exact colors the game
   ships. Loaded blocking in <head> so the boot script can paint the saved
   theme before first render. */
window.SK = window.SK || {};

SK.THEMES = {
  order: [
    "daybreak",
    "anime",
    "arcade",
    "arctic",
    "aurora",
    "autumn",
    "bioluminescence",
    "blood_moon",
    "candy_pop",
    "carnival",
    "coral_depths",
    "cosmic_nebula",
    "crystal_storm",
    "desert_midnight",
    "emerald",
    "firefly_night",
    "glacier_dawn",
    "kawaii",
    "lantern_festival",
    "moonlit_bamboo",
    "neon_blue",
    "obsidian",
    "ocean",
    "paper",
    "phantom_realm",
    "raining_gold",
    "raining_silver",
    "ruby",
    "sakura_pink",
    "shadow_fog",
    "space",
    "thunderstorm",
    "vaporwave"
  ],
  defaultDark: "obsidian",
  defaultLight: "daybreak",
  themes: {
    daybreak: {
      name: "Daybreak", category: "minimal", fx: "vivid", light: true,
      bg: "#cfcbec", surface: "#ffffff", surfaceAlt: "#e4e2f2",
      accent: "#6b5ced", accentSoft: "#9e8cf7",
      text: "#2a2d44", textMuted: "#767a8c",
      bgGrad: "#f5e2de", glow: "rgba(140,122,247,0.45)"
    },
    anime: {
      name: "Anime", category: "fun", fx: "playful", light: true,
      bg: "#edf2ff", surface: "#ffffff", surfaceAlt: "#e6ebff",
      accent: "#8c59f2", accentSoft: "#cc99ff",
      text: "#261f4c", textMuted: "#736b99",
      bgGrad: "#e0d6ff", glow: "rgba(140,89,242,0.4)"
    },
    arcade: {
      name: "Arcade", category: "fun", fx: "arcade", light: false,
      bg: "#0a0a12", surface: "#14141f", surfaceAlt: "#1c1c29",
      accent: "#ff386b", accentSoft: "#4cd9ff",
      text: "#f2f5ff", textMuted: "#9ea3bd",
      bgGrad: "#05050d", glow: "rgba(255,76,140,0.55)"
    },
    arctic: {
      name: "Arctic", category: "aesthetic", fx: "calm", light: true,
      bg: "#e0f0fa", surface: "#f5faff", surfaceAlt: "#d1e6f5",
      accent: "#2e85d1", accentSoft: "#7abdf0",
      text: "#1a2e47", textMuted: "#6685a3",
      bgGrad: "#c7e0f5", glow: "transparent"
    },
    aurora: {
      name: "Aurora", category: "aesthetic", fx: "living", light: false,
      bg: "#050a1a", surface: "#0a1429", surfaceAlt: "#0f1f38",
      accent: "#1fd19e", accentSoft: "#6bebbf",
      text: "#e0f5f0", textMuted: "#80ada3",
      bgGrad: "#03050f", glow: "rgba(31,209,158,0.52)"
    },
    autumn: {
      name: "Autumn", category: "aesthetic", fx: "playful", light: false,
      bg: "#331c0f", surface: "#452917", surfaceAlt: "#54331c",
      accent: "#f5852e", accentSoft: "#ffa84c",
      text: "#fae6cc", textMuted: "#bd9470",
      bgGrad: "#21120a", glow: "rgba(242,128,46,0.5)"
    },
    bioluminescence: {
      name: "Bioluminescence", category: "premium", fx: "living", light: false,
      bg: "#000a0f", surface: "#03141c", surfaceAlt: "#051c26",
      accent: "#33f2d9", accentSoft: "#73ffc7",
      text: "#d6faf5", textMuted: "#7ab8b2",
      bgGrad: "#000508", glow: "rgba(51,242,217,0.55)"
    },
    blood_moon: {
      name: "Blood Moon", category: "aesthetic", fx: "living", light: false,
      bg: "#14050a", surface: "#240d12", surfaceAlt: "#33141a",
      accent: "#e62e38", accentSoft: "#ff736b",
      text: "#f5e0e0", textMuted: "#a67a7a",
      bgGrad: "#0a0305", glow: "rgba(230,46,56,0.55)"
    },
    candy_pop: {
      name: "Candy Pop", category: "fun", fx: "arcade", light: true,
      bg: "#f5ebfa", surface: "#fff7fc", surfaceAlt: "#e6dbf0",
      accent: "#f057ad", accentSoft: "#ade0b8",
      text: "#3d2447", textMuted: "#8f7599",
      bgGrad: "#e6dbf5", glow: "transparent"
    },
    carnival: {
      name: "Carnival", category: "fun", fx: "arcade", light: false,
      bg: "#12081a", surface: "#1f0d29", surfaceAlt: "#291233",
      accent: "#ff4c66", accentSoft: "#ffcc4c",
      text: "#fcf0eb", textMuted: "#bd999e",
      bgGrad: "#08030f", glow: "rgba(255,115,102,0.55)"
    },
    coral_depths: {
      name: "Coral Depths", category: "premium", fx: "living", light: false,
      bg: "#050a17", surface: "#0a1426", surfaceAlt: "#0f1f38",
      accent: "#f266ad", accentSoft: "#61f5e0",
      text: "#ebf5ff", textMuted: "#85b2d1",
      bgGrad: "#0a1429", glow: "rgba(242,102,173,0.5)"
    },
    cosmic_nebula: {
      name: "Cosmic Nebula", category: "aesthetic", fx: "living", light: false,
      bg: "#0d051a", surface: "#1a0a2e", surfaceAlt: "#260f42",
      accent: "#f247b8", accentSoft: "#7ae0fa",
      text: "#f5e0ff", textMuted: "#9e80c7",
      bgGrad: "#05030f", glow: "rgba(242,71,184,0.55)"
    },
    crystal_storm: {
      name: "Crystal Storm", category: "premium", fx: "arcade", light: false,
      bg: "#080f1f", surface: "#0d1a33", surfaceAlt: "#142447",
      accent: "#99e0ff", accentSoft: "#61a3e0",
      text: "#e6f2ff", textMuted: "#85ade0",
      bgGrad: "#030814", glow: "rgba(153,224,255,0.45)"
    },
    desert_midnight: {
      name: "Desert Midnight", category: "premium", fx: "living", light: false,
      bg: "#0f0a24", surface: "#1a1438", surfaceAlt: "#261f52",
      accent: "#fad65c", accentSoft: "#fff0a8",
      text: "#faf0d6", textMuted: "#ad996b",
      bgGrad: "#1a143d", glow: "rgba(250,214,92,0.48)"
    },
    emerald: {
      name: "Emerald", category: "premium", fx: "playful", light: false,
      bg: "#030d08", surface: "#081a0f", surfaceAlt: "#0a2414",
      accent: "#1fd980", accentSoft: "#66faad",
      text: "#d9fae6", textMuted: "#80bd99",
      bgGrad: "#000503", glow: "rgba(31,217,128,0.55)"
    },
    firefly_night: {
      name: "Firefly Night", category: "aesthetic", fx: "playful", light: false,
      bg: "#0a120a", surface: "#121c12", surfaceAlt: "#1a261a",
      accent: "#e0c738", accentSoft: "#f5e67a",
      text: "#ebe6d1", textMuted: "#8f9470",
      bgGrad: "#050a05", glow: "rgba(224,199,56,0.5)"
    },
    glacier_dawn: {
      name: "Glacier Dawn", category: "premium", fx: "living", light: false,
      bg: "#0a0f26", surface: "#121c3d", surfaceAlt: "#1c2b57",
      accent: "#85e0ff", accentSoft: "#b8f0ff",
      text: "#e6f5ff", textMuted: "#85ade0",
      bgGrad: "#14244c", glow: "rgba(133,224,255,0.45)"
    },
    kawaii: {
      name: "Kawaii", category: "fun", fx: "playful", light: true,
      bg: "#fcf0fa", surface: "#ffffff", surfaceAlt: "#f7e8f7",
      accent: "#fa73b2", accentSoft: "#b89efa",
      text: "#4c2e47", textMuted: "#8a7085",
      bgGrad: "#f0ebff", glow: "rgba(255,140,199,0.4)"
    },
    lantern_festival: {
      name: "Lantern Festival", category: "fun", fx: "living", light: false,
      bg: "#12080a", surface: "#210f0f", surfaceAlt: "#2b1414",
      accent: "#f5a833", accentSoft: "#ff6b57",
      text: "#fcebd1", textMuted: "#c7997a",
      bgGrad: "#080305", glow: "rgba(255,153,61,0.55)"
    },
    moonlit_bamboo: {
      name: "Moonlit Bamboo", category: "premium", fx: "calm", light: false,
      bg: "#080f0a", surface: "#0f1a12", surfaceAlt: "#17261c",
      accent: "#ccfadb", accentSoft: "#9ee6b2",
      text: "#e0fae6", textMuted: "#80b28f",
      bgGrad: "#0f1f14", glow: "rgba(204,250,219,0.4)"
    },
    neon_blue: {
      name: "Neon Blue", category: "aesthetic", fx: "arcade", light: false,
      bg: "#0a0f24", surface: "#141c38", surfaceAlt: "#1f294c",
      accent: "#33b2ff", accentSoft: "#66d9ff",
      text: "#e0edff", textMuted: "#8ca6d1",
      bgGrad: "#050817", glow: "rgba(51,178,255,0.5)"
    },
    obsidian: {
      name: "Obsidian", category: "minimal", fx: "calm", light: false,
      bg: "#000000", surface: "#141414", surfaceAlt: "#212121",
      accent: "#2ee0ad", accentSoft: "#59f2c7",
      text: "#f2f2f2", textMuted: "#8c8c8c",
      bgGrad: "#000000", glow: "rgba(46,224,173,0.45)"
    },
    ocean: {
      name: "Ocean", category: "aesthetic", fx: "living", light: false,
      bg: "#0a2433", surface: "#0f3347", surfaceAlt: "#174259",
      accent: "#26b2bf", accentSoft: "#66d9e0",
      text: "#e0f5f7", textMuted: "#8cbdc7",
      bgGrad: "#051424", glow: "rgba(76,191,242,0.5)"
    },
    paper: {
      name: "Paper", category: "minimal", fx: "calm", light: true,
      bg: "#f7f5f0", surface: "#fffcf7", surfaceAlt: "#ebe8e3",
      accent: "#38529e", accentSoft: "#6b85c7",
      text: "#242429", textMuted: "#7a7a85",
      bgGrad: "#edebe6", glow: "transparent"
    },
    phantom_realm: {
      name: "Phantom Realm", category: "premium", fx: "living", light: false,
      bg: "#0a051a", surface: "#120a29", surfaceAlt: "#1a0f38",
      accent: "#eb2ee0", accentSoft: "#b224b8",
      text: "#f5e6ff", textMuted: "#9980cc",
      bgGrad: "#05030f", glow: "rgba(235,46,224,0.55)"
    },
    raining_gold: {
      name: "Raining Gold", category: "premium", fx: "playful", light: false,
      bg: "#000000", surface: "#0f0d05", surfaceAlt: "#1a1408",
      accent: "#ffcc1a", accentSoft: "#ffd638",
      text: "#faf0cc", textMuted: "#b8995c",
      bgGrad: "#000000", glow: "rgba(255,204,26,0.55)"
    },
    raining_silver: {
      name: "Raining Silver", category: "premium", fx: "playful", light: false,
      bg: "#000000", surface: "#0f0f12", surfaceAlt: "#1a1a1f",
      accent: "#d1dbeb", accentSoft: "#e0e6f2",
      text: "#ebedf5", textMuted: "#999ead",
      bgGrad: "#000000", glow: "rgba(209,219,235,0.4)"
    },
    ruby: {
      name: "Ruby", category: "premium", fx: "playful", light: false,
      bg: "#120308", surface: "#1f050d", surfaceAlt: "#290812",
      accent: "#f2295c", accentSoft: "#ff7394",
      text: "#fcdbe0", textMuted: "#c7808a",
      bgGrad: "#050003", glow: "rgba(242,41,92,0.55)"
    },
    sakura_pink: {
      name: "Sakura Pink", category: "aesthetic", fx: "playful", light: true,
      bg: "#fcedf2", surface: "#fff7fa", surfaceAlt: "#fae0eb",
      accent: "#f273a6", accentSoft: "#ffb2d1",
      text: "#592e42", textMuted: "#997385",
      bgGrad: "#fadbeb", glow: "transparent"
    },
    shadow_fog: {
      name: "Shadow Fog", category: "premium", fx: "living", light: false,
      bg: "#14171c", surface: "#1f212b", surfaceAlt: "#292e3b",
      accent: "#85b8f5", accentSoft: "#5780b8",
      text: "#dbe0f0", textMuted: "#8a94b2",
      bgGrad: "#0d0f14", glow: "rgba(133,184,245,0.35)"
    },
    space: {
      name: "Space", category: "aesthetic", fx: "living", light: false,
      bg: "#050512", surface: "#0f0f24", surfaceAlt: "#1a1a33",
      accent: "#8c73f2", accentSoft: "#b2a6ff",
      text: "#e0e0f5", textMuted: "#8c8cb2",
      bgGrad: "#000008", glow: "rgba(140,115,242,0.5)"
    },
    thunderstorm: {
      name: "Thunderstorm", category: "aesthetic", fx: "living", light: false,
      bg: "#0d0f1a", surface: "#171a26", surfaceAlt: "#212433",
      accent: "#bfe0ff", accentSoft: "#e0f2ff",
      text: "#e6edfa", textMuted: "#8591ad",
      bgGrad: "#050812", glow: "rgba(191,224,255,0.55)"
    },
    vaporwave: {
      name: "Vaporwave", category: "fun", fx: "arcade", light: false,
      bg: "#1f0a33", surface: "#331452", surfaceAlt: "#471f6b",
      accent: "#ff59bf", accentSoft: "#59f2f2",
      text: "#f2e0ff", textMuted: "#b294d1",
      bgGrad: "#400d4c", glow: "rgba(255,89,191,0.5)"
    }
  }
};

/* Theme ids grouped by the game's categories, preserving manifest order —
   mirrors ThemeManager.grouped_themes(). Returns [{category, ids}]. */
SK.groupedThemes = function () {
  var groups = {}, order = [];
  SK.THEMES.order.forEach(function (id) {
    var cat = SK.THEMES.themes[id].category;
    if (!groups[cat]) { groups[cat] = []; order.push(cat); }
    groups[cat].push(id);
  });
  return order.map(function (cat) { return { category: cat, ids: groups[cat] }; });
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
