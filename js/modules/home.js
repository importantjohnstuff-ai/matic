
import { openTopicViewer } from './notes.js';

export async function loadDashboardData() {
    // Check if running via file:// protocol
    if (window.location.protocol === 'file:') {
        // often harmless, proceed
    }

    try {
        const response = await fetch('data/dashboard_data.json');
        const data = await response.json();

        updateStats(data.stats);
        renderRecentNotes(data.recentNotes);
        renderCategories(data.categories);

        // Trigger animations after data load
        setTimeout(() => {
            document.querySelectorAll('.stat-info .value').forEach(el => {
                el.style.transition = 'all 0.5s ease-out';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        }, 100);

    } catch (error) {
        console.error("--- DASHBOARD LOADING ERROR ---", error);
        renderDashboardError();
    }
}

function updateStats(stats) {
    if (!stats) return;

    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        const label = card.querySelector('.label').textContent.trim();
        const valueEl = card.querySelector('.value');

        if (label.includes('Total Notes')) {
            valueEl.textContent = stats.totalNotes;
            // animateValue(valueEl, 0, stats.totalNotes, 1000); // Animation func not ported yet, simple set for now
        } else if (label.includes('Completion Rate')) {
            valueEl.textContent = stats.completionRate;
        } else if (label.includes('Streak')) {
            valueEl.textContent = stats.streak;
        }
    });
}

function mapCategoryKey(apiName) {
    const lower = apiName.toLowerCase();
    if (lower.includes('math')) return 'Math';
    if (lower.includes('science')) return 'Engineering Sciences and Applied Subjects';
    if (lower.includes('electrical') || lower.includes('professional')) return 'Professional Electrical Engineering';
    return apiName;
}

function renderRecentNotes(notes) {
    const grid = document.getElementById('recent-notes-grid');
    if (!grid) return;

    grid.innerHTML = '';

    if (!notes || notes.length === 0) {
        grid.innerHTML = '<p class="empty-state">No notes found. Start creating!</p>';
        return;
    }

    notes.forEach((note, index) => {
        const card = document.createElement('div');
        card.className = 'note-card';
        card.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
        card.style.opacity = '0'; // Initial state for animation

        // Determine color based on category
        let accentColor = 'var(--accent-color)';
        if (note.category.toLowerCase().includes('math')) accentColor = '#ec4899';
        else if (note.category.toLowerCase().includes('science')) accentColor = '#10b981';

        card.style.setProperty('--card-color', accentColor);

        card.innerHTML = `
            <div class="note-header">
                <span class="note-tag">${note.category}</span>
                <span class="note-date">${note.date}</span>
            </div>
            <h4>${note.title}</h4>
            <div class="note-snippet">${note.snippet || 'No preview available...'}</div>
        `;

        card.addEventListener('click', () => {
            const key = mapCategoryKey(note.category);
            openTopicViewer(note.title, key);
        });

        grid.appendChild(card);
    });
    if (window.lucide) lucide.createIcons();
}

function renderCategories(categories) {
    const container = document.querySelector('.categories-list');
    if (!container) return;

    container.innerHTML = '';
    if (!categories) return;

    categories.forEach((cat, index) => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1 + 0.3}s`; // Delayed start
        card.style.opacity = '0';

        // Color mapping
        let color = '#6366f1';
        const lowerName = cat.name.toLowerCase();
        if (lowerName.includes('math')) color = '#ec4899';
        else if (lowerName.includes('science')) color = '#10b981';
        else if (lowerName.includes('electrical') || lowerName.includes('professional')) color = '#8b5cf6';

        card.style.setProperty('--accent', color);

        card.innerHTML = `
            <i data-lucide="${cat.icon || 'folder'}"></i>
            <h4>${cat.name}</h4>
            <span>${cat.count} Files</span>
        `;

        // Make category cards clickable to navigate
        card.addEventListener('click', () => {
            const key = mapCategoryKey(cat.name);
            // Simulate navigation click
            const notesBtn = document.getElementById('notes-module-btn');
            if (notesBtn) notesBtn.click();

            // Wait for submenu to expand then click subitem
            setTimeout(() => {
                // Find sub-item with exact text matching key? No the nav items have text content.
                // Nav items: 'Math', 'Engineering Sciences and Applied Subjects', 'Professional Electrical Engineering'
                // Our keys match these perfectly.
                const subItems = document.querySelectorAll('.sub-item');
                subItems.forEach(item => {
                    if (item.textContent.trim() === key) item.click();
                });
            }, 100);
        });

        container.appendChild(card);
    });

    if (window.lucide) lucide.createIcons();
}


export function setupSearch() {
    const searchInput = document.querySelector('.search-container input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();

        // Filter Notes
        document.querySelectorAll('.note-card').forEach(card => {
            const title = card.querySelector('h4').textContent.toLowerCase();
            const tag = card.querySelector('.note-tag').textContent.toLowerCase();

            if (title.includes(term) || tag.includes(term)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Filter Categories
        document.querySelectorAll('.category-card').forEach(card => {
            const name = card.querySelector('h4').textContent.toLowerCase();
            if (name.includes(term)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

function renderFileProtocolError() {
    const el = document.getElementById('recent-notes-grid');
    if (el) {
        el.innerHTML = `
            <div class="error-message">
                <i data-lucide="server-off" style="color: var(--danger); width: 48px; height: 48px; margin-bottom: 16px;"></i>
                <h4 style="margin-bottom: 8px;">Server Not Accessible</h4>
                <p style="color: var(--text-muted); margin-bottom: 16px;">It looks like you opened the file directly (file://).</p>
                <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; font-family: monospace; font-size: 0.9em;">
                    Please open <strong>http://localhost/matic/index.html</strong>
                </div>
            </div>
        `;
        if (window.lucide) lucide.createIcons();
    }
}

function renderDashboardError() {
    const el = document.getElementById('recent-notes-grid');
    if (el) {
        el.innerHTML = `
            <div class="error-message">
                <i data-lucide="alert-circle"></i>
                <p>Failed to load data. Open console (F12) for details.</p>
            </div>
        `;
        if (window.lucide) lucide.createIcons();
    }
}
