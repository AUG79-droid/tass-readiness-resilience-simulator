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
