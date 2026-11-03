const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..", "js");
const i18n = fs.readFileSync(path.join(root, "i18n.js"), "utf8");
const keys = new Set([...i18n.matchAll(/"([^"]+)"\s*:/g)].map((match) => match[1]));
const candidates = new Set();

for (const file of fs.readdirSync(root).filter((name) => /^functions-\d+\.js$/.test(name))) {
  const source = fs.readFileSync(path.join(root, file), "utf8");
  for (const template of source.matchAll(/`([\s\S]*?)`/g)) {
    for (const match of template[1].matchAll(/>([^<>{}]+)</g)) {
      const value = match[1].replace(/\s+/g, " ").trim();
      if (value && !value.includes("${") && /[A-Za-z]{2}/.test(value)) candidates.add(value);
    }
  }
  for (const match of source.matchAll(/(?:label|verb|question|guide|title|body|copy|objective|challenge|kicker|aria-label)\s*:\s*['"]([^'"]+)['"]/g)) {
    const value = match[1].trim();
    if (/[A-Za-z]{2}/.test(value)) candidates.add(value);
  }
}

const allow = new Set([
  "default", "idle", "thinking", "celebrate", "operational", "investigation", "investment",
  "complete", "correct", "learning", "capability", "A", "B", "C", "D",
  ": the ability to maintain operational capability while improving lifecycle use, resilience, sourcing awareness and process quality over time."
]);
const missing = [...candidates]
  .filter((value) => !keys.has(value) && !allow.has(value))
  .filter((value) => !/[=;{}]/.test(value) && value.length < 420)
  .sort();

if (missing.length) {
  console.error(`Missing Spanish UI candidates (${missing.length}):`);
  console.error(missing.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Spanish UI audit passed (${candidates.size} visible strings checked).`);
}


// Each landing mission subtitle has two independently translated terms.
const missionCardSource = fs.readFileSync(path.join(root, "functions-01.js"), "utf8");
const missionTerms = ["Lifecycle thinking", "Repair vs replace", "Process flow", "Circularity", "Biodiversity sourcing", "Resilience", "Life extension", "Engineering loop", "Integrated thinking", "Trade-offs"];
const missingMissionTerms = missionTerms.filter(term => !keys.has(term));
const missionSubtitleBroken = !missionCardSource.includes("<p><span>${m[2]}</span><span aria-hidden=\"true\"> · </span><span>${m[3]}</span></p>");
if (missingMissionTerms.length || missionSubtitleBroken) {
  if (missingMissionTerms.length) console.error("Missing landing subtitle translations:", missingMissionTerms.join(", "));
  if (missionSubtitleBroken) console.error("Landing subtitles must keep each translated term separate.");
  process.exitCode = 1;
}

// Explicitly cover runtime-generated tutorial labels and metric deltas.
// A static HTML-only scan cannot detect these assembled strings.
const expectedUIKeys = [
  "SUSTAINABILITY OPS // MISSION SIMULATOR",
  "Next",
  "Enter control room",
  "Close briefing",
  "Readiness",
  "Local buffer",
  "Shared buffer",
  "Stock resilience",
  "OPTION",
  "SELECTED",
  "Minimise ORA",
  "Repair loop",
  "Flow efficiency",
  "Avoided replacement",
  "Governance",
  "Traceability"
];
const missingRuntimeKeys = expectedUIKeys.filter((key) => !keys.has(key));
const missingStepRule = !(i18n.includes("PASO $1 DE $2") && i18n.includes("/^STEP ("));
const missingTipRule = !(i18n.includes("CONSEJO $1 / $2") && i18n.includes("/^TIP"));
const missingPhaseRule = !i18n.includes("RESPOND|INVESTIGATE|IMPROVE");
const missingImageAltTranslation = !i18n.includes('"aria-label","title","placeholder","alt"');

// Flag unreadable CSS font-size declarations, including font shorthands.
const stylesRoot = path.join(__dirname, "..", "css");
const tinyTypography = [];
for (const file of fs.readdirSync(stylesRoot).filter(name => /^styles-\d+\.css$/.test(name))) {
  const css = fs.readFileSync(path.join(stylesRoot, file), "utf8");
  for (const declaration of css.matchAll(/font(?:-size)?\s*:\s*([^;}\n]+)/gi)) {
    for (const size of declaration[1].matchAll(/(?<![\d.])(\d+(?:\.\d+)?)(px|rem)\b/gi)) {
      const value = Number(size[1]);
      if ((size[2].toLowerCase() === "px" && value < 14) ||
          (size[2].toLowerCase() === "rem" && value < 0.875)) {
        tinyTypography.push(file + ": " + declaration[0].trim());
      }
    }
  }
}
if (missingRuntimeKeys.length || missingStepRule || missingTipRule || missingPhaseRule || missingImageAltTranslation || tinyTypography.length) {
  if (missingRuntimeKeys.length) console.error("Missing dynamic Spanish UI keys:", missingRuntimeKeys.join(", "));
  if (missingStepRule) console.error("Missing translation for STEP n OF n.");
  if (missingTipRule) console.error("Missing dynamic ORA tip counter translation.");
  if (missingPhaseRule) console.error("Missing numbered decision-phase translation.");
  if (missingImageAltTranslation) console.error("Missing image alt attribute translation.");
  if (tinyTypography.length) console.error("Unreadable typography below 14px:", tinyTypography.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Dynamic Spanish UI keys and 14px minimum typography verified.");
}
