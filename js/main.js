
import { initState } from './modules/utils.js';
import { setupSidebarToggle, setupNavigation } from './modules/nav.js';
import { loadDashboardData, setupSearch } from './modules/home.js';
import { setupGlobalModals } from './modules/modals.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("Initializing Matic App...");

    // 1. Initialize State
    initState();

    // 2. Setup Navigation & Layout
    setupSidebarToggle();
    setupNavigation();

    // 3. Setup Modals
    setupGlobalModals();

    // 4. Load Dashboard Data
    loadDashboardData();
    setupSearch();

    // 5. Initial Icon Render
    if (window.lucide) {
        lucide.createIcons();
    }
});
