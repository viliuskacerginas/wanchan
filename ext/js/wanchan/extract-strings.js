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
 * HTML String Extractor
 * Scans the 'ext' directory for HTML files, extracts visible text and specific attributes,
 * and generates a JSON file for localization.
 *
 * Usage: node dev/bin/extract-strings.js [output-file.json]
 */

import {JSDOM} from 'jsdom';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SOURCE_DIR = path.resolve(__dirname, '../../ext'); // Assuming script is in dev/bin
const OUTPUT_FILE = process.argv[2] || path.resolve(__dirname, '../../extracted-strings.json');

// Attributes to scan
const TARGET_ATTRIBUTES = ['placeholder', 'title', 'alt', 'aria-label', 'value'];
// Tags to ignore content from
const IGNORE_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'LINK', 'META']);

/**
 * recursively finds all files with specific extension
 * @param {string} dir
 * @param {string} ext
 * @returns {string[]}
 */
function getAllFiles(dir, ext) {
    let results = [];
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
 * Extracts strings from a single HTML file
 * @param {string} filePath
 * @returns {Set<string>}
 */
function extractStringsFromFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const dom = new JSDOM(content);
    const doc = dom.window.document;
    const foundStrings = new Set(); // Use Set to avoid duplicates within file immediately

    // Helper to process text
    /**
     *
     * @param text
     */
    function processText(text) {
        if (!text) { return; }

        // Remove excessive whitespace
        const cleanText = text.replace(/\s+/g, ' ').trim();

        // Filter out empty strings, pure numbers/symbols, or template placeholders if simple
        if (cleanText.length === 0) { return; }
        // Optional: Filter out pure numbers or simple punctuation
        if (/^[\d\s\p{P}]+$/u.test(cleanText)) { return; }

        foundStrings.add(cleanText);
    }

    // traverse
    /**
     *
     * @param node
     */
    function traverse(node) {
        if (IGNORE_TAGS.has(node.nodeName)) { return; }

        // Text Nodes
        if (node.nodeType === 3) { // TEXT_NODE
            processText(node.nodeValue);
        }

        // Element Nodes (Attributes)
        if (node.nodeType === 1) { // ELEMENT_NODE
            for (const attr of TARGET_ATTRIBUTES) {
                if (node.hasAttribute(attr)) {
                    // Special case for input[type="button"|"submit"|"reset"] for 'value' attribute
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

        // Recursion
        for (let i = 0; i < node.childNodes.length; i++) {
            traverse(node.childNodes[i]);
        }
    }

    traverse(doc.body); // Start from body, usually sufficient for visible text
    // Also check title in head
    if (doc.title) {
        processText(doc.title);
    }

    return foundStrings;
}

/**
 *
 */
function main() {
    console.log(`Scanning directory: ${SOURCE_DIR}`);
    const htmlFiles = getAllFiles(SOURCE_DIR, '.html');

    const output = {};
    let totalStrings = 0;

    for (const file of htmlFiles) {
        const relativePath = path.relative(SOURCE_DIR, file).replace(/\\/g, '/'); // Normalize path for JSON keys
        console.log(`Processing: ${relativePath}`);

        const strings = extractStringsFromFile(file);

        if (strings.size > 0) {
            output[`ext/${relativePath}`] = {}; // Prefix with ext/ for clarity as per user context

            // Sort keys alphabetically for cleaner output
            const sortedStrings = [...strings].sort();

            for (const str of sortedStrings) {
                output[`ext/${relativePath}`][str] = '';
            }
            totalStrings += strings.size;
        }
    }

    const jsonContent = JSON.stringify(output, null, 4);
    fs.writeFileSync(OUTPUT_FILE, jsonContent, 'utf8');

    console.log('\nExtraction complete!');
    console.log(`- Files scanned: ${htmlFiles.length}`);
    console.log(`- Unique strings found: ${totalStrings}`);
    console.log(`- Output written to: ${OUTPUT_FILE}`);
}

main();
