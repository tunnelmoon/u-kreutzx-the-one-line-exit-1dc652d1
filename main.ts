import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line resignation letter: a barista quits because even the
// espresso machine got a raise before they did.
const LINE =
  "I hereby resign: the espresso machine got a raise before I did.";

// Count characters as code points, not UTF-16 units, so the gate's
// 1-140 character limit is checked the way the scorer counts it.
const charCount = Array.from(LINE).length;

if (charCount < 1 || charCount > 140) {
  throw new Error(`entry must be 1-140 characters, got ${charCount}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Round-trip check: what landed on disk must be exactly the line.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("round-trip mismatch: entry.txt differs from the line");
}
