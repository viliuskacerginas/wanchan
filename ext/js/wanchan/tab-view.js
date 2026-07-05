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


document.addEventListener('DOMContentLoaded', () => {
    const DEV_MODE = true;
    const DEFAULT_TAB = 'dictionaries';
    const ALWAYS_VISIBLE = new Set(['accessibility', 'security']);
    const HIDDEN_CLASS = 'wanchan-tab-hidden';
    const TRANSPARENT_CLASS = 'wanchan-tab-transparent';
    const ACTIVE_CLASS = 'active';
    const TRANSITION_DURATION = 250; // ms

    // Map to store tab ID -> array of DOM elements
    const tabMap = new Map();
    // Map to store tab ID -> sidebar link element
    const linkMap = new Map();
    // Array to store always visible elements (accessibility/security)
    let commonElements = [];

    let currentTab = null;
    let isTransitioning = false;

    /**
     * Helper to find heading container and settings group for an ID
     * @param {string} id Section ID
     * @returns {HTMLElement[]} Array of elements
     */
    function findElementsForId(id) {
        const h2 = document.querySelector(`h2[id="${id}"]`);
        if (!h2) { return []; }

        const headingContainer = h2.closest('.heading-container');
        const elements = [];

        if (headingContainer) {
            let targetContainer = headingContainer;
            const parent = headingContainer.parentElement;
            let settingsGroup = headingContainer.nextElementSibling;

            if ((!settingsGroup || !settingsGroup.classList.contains('settings-group')) && parent && parent !== document.querySelector('.content-center')) {
                const parentSibling = parent.nextElementSibling;
                if (parentSibling && parentSibling.classList.contains('settings-group')) {
                    targetContainer = parent;
                    settingsGroup = parentSibling;
                }
            }

            elements.push(targetContainer);
            if (settingsGroup && settingsGroup.classList.contains('settings-group')) {
                elements.push(settingsGroup);
            }
        }
        return elements;
    }

    /**
     * Mapping Phase: Build the tab map from sidebar links
     */
    function buildTabMap() {
        const sidebarBody = document.querySelector('.sidebar-body');
        if (!sidebarBody) { return false; }

        const links = sidebarBody.querySelectorAll('a[href^="#"]');

        for (const link of links) {
            const href = link.getAttribute('href');
            if (!href || href.length <= 1) { continue; }

            const id = href.substring(1);

            // Skip always-visible sections for tab map, but collect them later
            if (ALWAYS_VISIBLE.has(id)) { continue; }

            const elements = findElementsForId(id);
            if (elements.length > 0) {
                tabMap.set(id, elements);
                linkMap.set(id, link);
            }
        }

        // Collect Common Elements (Always Visible)
        for (const id of ALWAYS_VISIBLE) {
            const elements = findElementsForId(id);
            if (elements.length > 0) {
                commonElements = commonElements.concat(elements);
            }
        }

        return tabMap.size > 0;
    }

    /**
     * Hide all tab elements except the specified tab
     * @param {string|null} exceptTabId Tab ID to keep visible
     */
    function hideAllTabs(exceptTabId = null) {
        for (const [tabId, elements] of tabMap.entries()) {
            if (tabId === exceptTabId) { continue; }
            for (const element of elements) {
                element.classList.add(HIDDEN_CLASS);
                element.classList.remove(TRANSPARENT_CLASS);
            }
        }
        // Ensure common elements are visible
        for (const element of commonElements) {
            element.classList.remove(HIDDEN_CLASS);
            element.classList.remove(TRANSPARENT_CLASS);
        }
    }

    /**
     * Update active state on sidebar links
     * @param {string} tabId Tab ID to set as active
     */
    function updateActiveLink(tabId) {
        for (const link of linkMap.values()) {
            link.classList.remove(ACTIVE_CLASS);
        }
        const link = linkMap.get(tabId);
        if (link) {
            link.classList.add(ACTIVE_CLASS);
        }
    }

    /**
     * Switch to the specified tab with phased transition
     * @param {string} tabId Tab ID to switch to
     */
    function switchToTab(tabId) {
        if (!tabMap.has(tabId) || isTransitioning || currentTab === tabId) { return; }

        isTransitioning = true;
        const oldTabElements = currentTab ? tabMap.get(currentTab) : [];
        const newTabElements = tabMap.get(tabId);

        // Phase 1: Fade Out
        // Fade out current tab content AND common elements
        const fadeOutElements = [...(oldTabElements || []), ...commonElements];

        for (const element of fadeOutElements) {
            element.classList.add(TRANSPARENT_CLASS);
        }

        // Wait for Fade Out
        setTimeout(() => {
            // Phase 2: Swap Content
            // Hide old tab
            if (oldTabElements) {
                for (const element of oldTabElements) {
                    element.classList.add(HIDDEN_CLASS);
                }
            }

            // Prepare new tab (visible but transparent)
            if (newTabElements) {
                for (const element of newTabElements) {
                    element.classList.remove(HIDDEN_CLASS);
                    element.classList.add(TRANSPARENT_CLASS); // Ensure it starts transparent
                }
            }

            // Common elements are already visible and currently transparent

            // Update state
            currentTab = tabId;
            updateActiveLink(tabId);

            // Trigger Reflow

            void document.body.offsetWidth;

            // Phase 3: Fade In
            const fadeInElements = [...(newTabElements || []), ...commonElements];

            requestAnimationFrame(() => {
                for (const element of fadeInElements) {
                    element.classList.remove(TRANSPARENT_CLASS);
                }

                // Reset transition lock
                setTimeout(() => {
                    isTransitioning = false;
                }, TRANSITION_DURATION);
            });
        }, TRANSITION_DURATION);
    }


    /**
     * Set up click handlers for sidebar links
     */
    function setupClickHandlers() {
        for (const [tabId, link] of linkMap.entries()) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                switchToTab(tabId);
            });
        }
    }

    /**
     * Initialize the tab view system
     */
    function init() {
        const sidebarBody = document.querySelector('.sidebar .sidebar-body');
        const sidebarBottom = document.querySelector('.sidebar .sidebar-bottom');
        if (sidebarBody && sidebarBottom) {
            sidebarBody.appendChild(sidebarBottom);
        }

        if (sidebarBody) {
            const selectors = [
                'a[href="#profile"]',
                'a[href*="#text-parsing"]',
                'a[href*="#clipboard"]',
                'a[href="#shortcuts"]',
                'a[href="#backup"]'
            ];
            for (const selector of selectors) {
                const elements = sidebarBody.querySelectorAll(selector);
                for (const el of elements) {
                    el.classList.add('advanced-only');
                }
            }
        }

        if (!buildTabMap()) { return; }

        hideAllTabs(DEFAULT_TAB);
        updateActiveLink(DEFAULT_TAB);
        currentTab = DEFAULT_TAB;
        setupClickHandlers();
    }

    // Run initialization
    init();
});
