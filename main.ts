// ai-excited-01 entry: "Catching a Falling Star".
//
// The image is the entry: a tiny figure on a cliff edge catching a falling
// star as it streaks down as a gold-white comet. This program just places
// the finished image where the grader looks for it.
//
// Node 22, standard library only, no network. Run locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const source = new URL('./entry.png', import.meta.url);
const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The grader hands us a fresh, empty /output, but make the directory
// ourselves too so a local run never fails on a missing folder.
mkdirSync(targetDir, { recursive: true });
const target = join(targetDir, 'entry.png');
copyFileSync(source, target);

// Fail loudly instead of silently handing the judge a truncated file.
const sourceBytes = statSync(source).size;
const targetBytes = statSync(target).size;
if (sourceBytes !== targetBytes) {
  throw new Error(`entry.png copy mismatch: ${targetBytes} of ${sourceBytes} bytes`);
}
console.log(`wrote ${target} (${targetBytes} bytes)`);
