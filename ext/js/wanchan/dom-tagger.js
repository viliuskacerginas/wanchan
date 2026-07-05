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

    const targets = document.querySelectorAll('.heading-container-left h2[id]');

    for (const h2 of targets) {
        const id = h2.id;
        const className = `${id}-main-settings`;
        let targetAFound = false;
        let targetBFound = false;
        let targetCFound = false;

        // Target A: Header Container (or its Wrapper)
        let targetA = h2.closest('.heading-container');
        if (targetA) {
            // Initial check for settings group sibling
            let sibling = targetA.nextElementSibling;

            // Refined Search: If direct sibling isn't the group, check parent's sibling
            if (!sibling || !sibling.classList.contains('settings-group')) {
                const parent = targetA.parentElement;
                if (parent) {
                    const parentSibling = parent.nextElementSibling;
                    if (parentSibling && parentSibling.classList.contains('settings-group')) {
                        // Logic Update: Target A becomes the Wrapper Div
                        targetA = parent;
                        sibling = parentSibling;
                    }
                }
            }

            // Apply class to Target A (Header Container or Wrapper)
            targetA.classList.add(className);
            targetAFound = true;

            // Target B: Settings Group
            if (sibling && sibling.classList.contains('settings-group')) {
                sibling.classList.add(className);
                targetBFound = true;
            }
        }

        // Target C: Sidebar Link
        const targetC = document.querySelector(`a[href="#${id}"]`);
        if (targetC) {
            targetC.classList.add(className);
            targetCFound = true;
        }


    }
});
