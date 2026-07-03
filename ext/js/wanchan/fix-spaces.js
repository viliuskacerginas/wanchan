/*
 * Copyright (C) 2026       Vilius Kačerginas
 * Copyright (C) 2023-2025  Yomitan Authors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/*
 * Fix Missing Spaces in Translations
 *
 * Usage: node ext/js/wanchan/fix-spaces.js
 */

import {JSDOM} from 'jsdom';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEXT_SWAPPER_PATH = path.resolve(__dirname, 'text-swapper.js');
const SOURCE_DIR = path.resolve(__dirname, '../../'); // ext directory

// Attributes to scan (must match extract-strings.js and text-swapper.js)
const TARGET_ATTRIBUTES = ['placeholder', 'title', 'alt', 'aria-label', 'value'];
const IGNORE_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'LINK', 'META']);

/**
 * recursively finds all files with specific extension
 * @param dir
 * @param ext
 */
function getAllFiles(dir, ext) {
    let results = [];
    if (!fs.existsSync(dir)) { return results; }

    const list = fs.readdirSync(dir);
    for (const file of list) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllFiles(filePath, ext));
        } else {
            if (filePath.endsWith(ext)) {
                results.push(filePath);
            }
        }
    }
    return results;
}

/**
 * Extract distinct text nodes and attribute values from HTML file, keeping original whitespace.
 * @param filePath
 */
function extractRawStrings(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const dom = new JSDOM(content);
    const doc = dom.window.document;
    const foundStrings = []; // Array of strings (duplicates allowed as they appear in different contexts)

    /**
     *
     * @param text
     */
    function processText(text) {
        if (!text) { return; }
        // Normalize internal whitespace to single spaces, but KEEP leading/trailing
        // This regex replaces any sequence of whitespace with a single space,
        // effectively collapsing internal whitespace.
        // However, we need to be careful not to collapse leading/trailing spaces into the internal ones
        // if they are just newlines/tabs.
        // The goal is: "  See  \n  More " -> " See More " (if we assume HTML rendering rules roughly)
        // But the user request is specific about missing spaces around elements.
        // Let's use a simpler normalization: replace all whitespace chars with space, then collapse multiple spaces.
        // BUT, we want to detect if the string *should* have leading/trailing space.

        let normalized = text.replace(/[\n\r\t]/g, ' '); // Replace newlines/tabs with space

        // Collapse multiple spaces
        // We do this carefully: '  A   B  ' -> ' A B '
        normalized = normalized.replace(/\s+/g, ' ');

        // If the resulting string contains only whitespace, ignore it unless it's a significant spacer (unlikely for translation)
        if (!normalized.trim()) { return; }

        foundStrings.push(normalized);
    }

    /**
     *
     * @param node
     */
    function traverse(node) {
        if (IGNORE_TAGS.has(node.nodeName)) { return; }

        if (node.nodeType === 3) { // TEXT_NODE
            processText(node.nodeValue);
        }

        if (node.nodeType === 1) { // ELEMENT_NODE
            for (const attr of TARGET_ATTRIBUTES) {
                if (node.hasAttribute(attr)) {
                    if (attr === 'value') {
                        if (node.tagName === 'INPUT' && ['button', 'submit', 'reset'].includes(node.getAttribute('type'))) {
                            processText(node.getAttribute(attr));
                        }
                    } else {
                        processText(node.getAttribute(attr));
                    }
                }
            }
        }

        for (let i = 0; i < node.childNodes.length; i++) {
            traverse(node.childNodes[i]);
        }
    }

    traverse(doc.body);
    if (doc.title) { processText(doc.title); }

    return foundStrings;
}

/**
 * Main
 */
async function main() {
    console.log('Reading text-swapper.js...');
    const swapperContent = fs.readFileSync(TEXT_SWAPPER_PATH, 'utf8');

    // Extract the TRANSLATIONS object regex
    // We assume the structure is `const TRANSLATIONS = { ... };`
    const translationsRegex = /const TRANSLATIONS = \{([\s\S]*?)\};/;
    const match = translationsRegex.exec(swapperContent);
    if (!match) {
        console.error('Could not find TRANSLATIONS object in text-swapper.js');
        return;
    }

    // Parse the existing translations into a Map
    // We'll use a crude parser or eval for this one-off script, but eval is safer here if we trust local content.
    // However, to modify it in place preserving comments is hard.
    // Strategy:
    // 1. Scan HTML files to build a map of Trimmed -> Raw(with spaces)
    // 2. Iterate line by line of text-swapper.js.
    // 3. For each line that looks like 'Key': 'Value', extract Key.
    // 4. Trim Key. lookup in our HTML map.
    // 5. If HTML map has a version with spaces, and it differs from Key:
    //    - Reconstruct the line with the untrimmed Key.
    //    - Add corresponding spaces to the Value.

    console.log('Scanning HTML files for raw strings...');
    const htmlFiles = getAllFiles(SOURCE_DIR, '.html');

    // Map of TrimmedString -> Set of potentially different variations with spaces
    // e.g. "Instruction" -> [" Instruction", "Instruction "]
    // In valid HTML, " Instruction" and "Instruction" usually mean the same if block level, but inline?
    // The user says "text that included </a> with href or </em> ... all lost space".
    // This implies we need to find the specific variant used in that context.
    const trimmedToRawMap = new Map();

    for (const file of htmlFiles) {
        const rawStrings = extractRawStrings(file);
        for (const raw of rawStrings) {
            const trimmed = raw.trim();
            if (trimmed.length === 0) { continue; }

            if (!trimmedToRawMap.has(trimmed)) {
                trimmedToRawMap.set(trimmed, new Set());
            }
            trimmedToRawMap.get(trimmed).add(raw);
        }
    }

    console.log(`Found ${trimmedToRawMap.size} unique trimmed strings in HTML.`);

    // Read text-swapper.js lines
    const lines = swapperContent.split('\n');
    const newLines = [];
    let modificationCount = 0;

    // Regex to match lines like: 'Key': 'Value',
    // Supports single quotes for now as seen in file. Use a fairly permissive regex.
    const keyValRegex = /^\s*(['"])((?:\\.|[^\\])*?)\1\s*:\s*(['"])((?:\\.|[^\\])*?)\3(,)?\s*$/;

    for (const line of lines) {
        // Only attempt to process lines inside the TRANSLATIONS object block if needed,
        // but for simplicity check if line matches the pattern.
        const kvMatch = keyValRegex.exec(line);

        if (kvMatch) {
            const quote = kvMatch[1]; // ' or "
            const key = kvMatch[2]; // Key content
            const valQuote = kvMatch[3];
            const val = kvMatch[4]; // Value description
            const comma = kvMatch[5] || '';

            const trimmedKey = key.trim();

            // Check if we have raw variants
            const rawVariants = trimmedToRawMap.get(trimmedKey);

            if (rawVariants) {
                // Find the "most spacious" variant or the one that matters?
                // If there are multiple variants (e.g. "Foo" and " Foo "), we have a conflict.
                // However, usually translations are 1:1.
                // If we find ANY variant that has leading/trailing space, we should likely update the key to match it,
                // AND update the value to match.

                // Let's pick the variant with the most surrounding space as the target?
                // Or if there are multiple, maybe we need multiple entries? (Not supported by simple 1:1 map easily w/o context)
                // For now, let's assume one dominant variant or just take the one with spaces.

                let targetRaw = trimmedKey;
                for (const variant of rawVariants) {
                    if (variant.length > targetRaw.length) {
                        targetRaw = variant;
                    }
                }

                if (targetRaw !== key) {
                    // Check if it's just a difference of quotes or something we don't want to touch?
                    // No, targetRaw comes from HTML, key comes from file.

                    // We want to set the key to targetRaw.
                    // And we want to apply the SAME surrounding spaces to the value.

                    const prefixLen = targetRaw.match(/^\s*/)[0].length;
                    const suffixLen = targetRaw.match(/\s*$/)[0].length;

                    const prefix = ' '.repeat(prefixLen);
                    const suffix = ' '.repeat(suffixLen);

                    // Helper to trim carefully (don't trim everything if value relies on internal formatting,
                    // but for this task we assume we are just restoring lost surrounding whitespace)
                    // If the value was already modified, it might have spaces.
                    const trimmedVal = val.trim();

                    const newKey = targetRaw.replace(/'/g, "\\'");
                    const newVal = (prefix + trimmedVal + suffix).replace(/'/g, "\\'");

                    // Rebuild line
                    const indent = line.match(/^\s*/)[0];

                    // Only update if actually different to what we are about to write
                    // (This check prevents infinite loop if we are just re-formatting identical content)
                    if (newKey !== key || newVal !== val) {
                        newLines.push(`${indent}'${newKey}': '${newVal}'${comma}`);
                        modificationCount++;
                        continue;
                    }
                }
            }
        }
        newLines.push(line);
    }

    if (modificationCount > 0) {
        console.log(`Applied ${modificationCount} fixes.`);
        fs.writeFileSync(TEXT_SWAPPER_PATH, newLines.join('\n'), 'utf8');
        console.log('Updated text-swapper.js');
    } else {
        console.log('No changes needed.');
    }
}

main();
