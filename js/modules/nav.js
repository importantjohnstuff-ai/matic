import { setupSettingsView } from './settings.js';
import { setupQuestionBankView } from './question_bank.js';
import { renderTopicsGrid } from './notes.js';
import { loadDashboardData } from './home.js';

export function setupSidebarToggle() {
    // ... existing sidebar logic ...
    const toggleBtn = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }

    // Module Collapse/Expand Logic
    const notesBtn = document.getElementById('notes-module-btn');
    if (notesBtn) {
        notesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const parent = notesBtn.closest('.nav-group');
            if (parent) {
                parent.classList.toggle('active');
            }
        });
    }
}

export function setupNavigation() {
    console.log("Setting up navigation...");

    // -- Selectors --
    const dashboardBtn = document.getElementById('dashboard-nav-btn');
    const settingsBtn = document.getElementById('settings-nav-btn');
    const questionBankBtn = document.getElementById('question-bank-nav-btn');
    const notesSubItems = document.querySelectorAll('#notes-sub-menu .sub-item');

    // -- View Containers --
    const views = {
        'dashboard': document.getElementById('dashboard-view'),
        'settings': document.getElementById('settings-view'),
        'question-bank': document.getElementById('question-bank-view'),
        'notes': document.getElementById('notes-view')
    };

    // Ensure critical views exist
    if (!views['dashboard'] || !views['settings']) {
        console.error("Critical views missing:", views);
        return;
    }

    // -- Helper Function to Switch View --
    async function switchView(viewName, titleContext = null) {
        console.log("Switching view to:", viewName);

        // 1. Hide all views
        Object.values(views).forEach(el => {
            if (el) el.style.display = 'none';
        });

        // 2. Deactivate all nav items (main items)
        dashboardBtn?.classList.remove('active');
        settingsBtn?.classList.remove('active');
        questionBankBtn?.classList.remove('active');
        notesSubItems.forEach(item => item.classList.remove('active'));

        // 3. Show selected view
        if (views[viewName]) {
            views[viewName].style.display = 'block';
        }

        // 4. Update Active Nav State & Specific Logic
        if (viewName === 'dashboard') {
            dashboardBtn?.classList.add('active');
        }
        else if (viewName === 'settings') {
            settingsBtn?.classList.add('active');
            setupSettingsView();
        }
        else if (viewName === 'question-bank') {
            questionBankBtn?.classList.add('active');

            // Load Question Bank View
            const container = views['question-bank'];
            if (container) {
                setupQuestionBankView(container);
            }
        }
        else if (viewName === 'notes') {
            // Update title based on selection
            const titleEl = document.getElementById('notes-view-title');
            if (titleEl && titleContext) {
                titleEl.textContent = titleContext;
                renderTopicsGrid(titleContext);
            }
        }
    }

    // -- Event Listeners --

    // Dashboard
    if (dashboardBtn) {
        dashboardBtn.addEventListener('click', (e) => {
            e.preventDefault();
            switchView('dashboard');
        });
    }

    // Settings
    if (settingsBtn) {
        settingsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            switchView('settings');
        });
    }

    // Question Bank
    if (questionBankBtn) {
        questionBankBtn.addEventListener('click', (e) => {
            e.preventDefault();
            switchView('question-bank');
        });
    }

    // Notes Sub-items
    notesSubItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            // Highlight this sub-item
            notesSubItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Switch to notes view with category name
            switchView('notes', item.textContent.trim());
        });
    });
}
