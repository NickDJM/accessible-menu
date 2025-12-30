/**
 * @file
 * Extracts the most recent release section from CHANGELOG.md and writes it
 * to CURRENT_RELEASE.md.
 *
 * The extracted release title is normalized to a level-2 markdown heading
 * (`##`) to ensure consistent formatting for GitHub release notes.
 */

/* eslint-disable no-console */
/* global process */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHANGELOG_PATH = path.resolve(__dirname, "../CHANGELOG.md");
const CURRENT_RELEASE_PATH = path.resolve(__dirname, "../CURRENT_RELEASE.md");

/**
 * Matches level-2 or level-3 markdown headings containing a SemVer version,
 * including prerelease and build metadata.
 *
 * Examples:
 * - ### [4.2.2](...) (2025-05-27)
 * - ## [4.2.2-beta.1](...)
 *
 * @type {RegExp}
 */
const RELEASE_HEADING_RE =
  /^#{2,3}\s+\[(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?\][^\n]*$/gm;

/**
 * Normalizes Windows-style CRLF newlines to LF.
 *
 * @param {string} input
 * @return {string}
 */
function normalizeNewlines(input) {
  return input.replace(/\r\n/g, "\n");
}

/**
 * Forces the first markdown heading in a block to be a level-2 heading.
 *
 * @param {string} block - Extracted release block
 * @return {string} Block with normalized heading level
 */
function normalizeReleaseHeadingLevel(block) {
  return block.replace(/^#{2,3}\s+/m, "## ");
}

/**
 * Extracts the most recent release section from the changelog.
 *
 * Assumes the changelog is ordered newest → oldest.
 *
 * @param {string} changelog - Full changelog content
 * @return {string} Extracted latest release block
 *
 * @throws {Error} If no release headings are found
 */
function extractLatestRelease(changelog) {
  const text = normalizeNewlines(changelog);

  // Reset global RegExp state
  RELEASE_HEADING_RE.lastIndex = 0;

  const firstMatch = RELEASE_HEADING_RE.exec(text);
  if (!firstMatch) {
    throw new Error(
      "No release headings found. Expected a heading like '### [4.2.2](...) (YYYY-MM-DD)'."
    );
  }

  const startIndex = firstMatch.index;

  const secondMatch = RELEASE_HEADING_RE.exec(text);
  const endIndex = secondMatch ? secondMatch.index : text.length;

  const block = text.slice(startIndex, endIndex).trimEnd();

  return normalizeReleaseHeadingLevel(block) + "\n";
}

/**
 * Main execution entrypoint.
 *
 * @return {Promise<void>}
 */
async function main() {
  const changelog = await fs.readFile(CHANGELOG_PATH, "utf8");
  const latestRelease = extractLatestRelease(changelog);

  await fs.writeFile(CURRENT_RELEASE_PATH, latestRelease, "utf8");

  const firstLine = latestRelease.split("\n")[0]?.trim() ?? "";
  console.log(`Wrote CURRENT_RELEASE.md from latest section: ${firstLine}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exitCode = 1;
});
