// make.fun entry: Make the AI Judge Laugh, Office Jokes
// Writes one original one-line office joke to /output/entry.txt.
// The grader sets MAKEFUN_OUTPUT_DIR; locally it defaults to ./output.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke. Original, written for this entry: a standing desk is the
// office's favourite wellness prop, and the punchline is that the job
// itself does not change, only the posture and the knees do.
const JOKE =
  "I finally got a standing desk, which means I now do the exact same nothing, only taller and with worse knees.";

const MAX_CHARS = 199;
const MIN_CHARS = 1;

// Resolve the output directory the way the grader expects it.
function resolveOutputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv && fromEnv.trim().length > 0) {
    return fromEnv.trim();
  }
  return join(process.cwd(), "output");
}

// Validate the joke against the gate before anything is written:
// one single line, 1 to 199 characters, not only whitespace, and no
// trailing newline or stray control characters hiding inside it.
function validateJoke(joke: string): string[] {
  const problems: string[] = [];

  if (joke.length < MIN_CHARS) {
    problems.push(`joke is empty (length ${joke.length})`);
  }
  if (joke.length > MAX_CHARS) {
    problems.push(
      `joke is ${joke.length} characters, over the ${MAX_CHARS} limit`,
    );
  }
  if (joke.trim().length === 0) {
    problems.push("joke is only whitespace");
  }
  if (joke.includes("\n") || joke.includes("\r")) {
    problems.push("joke spans more than one line");
  }
  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(joke)) {
    problems.push("joke contains control characters");
  }
  if (joke !== joke.trim()) {
    problems.push("joke has leading or trailing whitespace");
  }
  return problems;
}

function main(): void {
  const problems = validateJoke(JOKE);
  if (problems.length > 0) {
    for (const problem of problems) {
      console.error(`VALIDATION FAILED: ${problem}`);
    }
    process.exit(1);
  }

  const outputDir = resolveOutputDir();
  const outputPath = join(outputDir, "entry.txt");

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputPath, JOKE, { encoding: "utf8" });

  // Read-back self-check: re-read the file we just wrote and verify
  // it is byte-for-byte the joke, with the exact character count the
  // gate will measure. Never trust the write without checking it.
  const written = readFileSync(outputPath, { encoding: "utf8" });
  const byteLength = Buffer.byteLength(written, "utf8");
  const checks: Array<[string, boolean]> = [
    ["matches the joke exactly", written === JOKE],
    ["single line", !written.includes("\n") && !written.includes("\r")],
    ["no trailing newline", !written.endsWith("\n")],
    [
      `length ${written.length} within 1-${MAX_CHARS}`,
      written.length >= MIN_CHARS && written.length <= MAX_CHARS,
    ],
    ["non-whitespace content", written.trim().length > 0],
  ];

  const failed = checks.filter(([, ok]) => !ok);
  console.log("--- entry verification ---");
  console.log(`output: ${outputPath}`);
  console.log(`joke: ${written}`);
  console.log(`characters: ${written.length}`);
  console.log(`bytes (UTF-8): ${byteLength}`);
  for (const [label, ok] of checks) {
    console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
  }
  console.log("--------------------------");

  if (failed.length > 0) {
    console.error(
      `SELF-CHECK FAILED: ${failed.length} check(s) failed, see above.`,
    );
    process.exit(1);
  }

  console.log("OK: entry.txt written and verified.");
}

main();
