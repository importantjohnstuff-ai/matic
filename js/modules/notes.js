
import { appState, saveState } from './utils.js';

export function renderTopicsGrid(categoryName) {
    const grid = document.getElementById('topics-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const topics = appState.topics[categoryName] || [];

    if (topics.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 200px;">
                <i data-lucide="folder-plus" style="opacity: 0.5; width: 48px; height: 48px; margin-bottom: 16px;"></i>
                <p>No topics yet. Click "Add Topic" to create one.</p>
            </div>
        `;
    } else {
        topics.forEach(topic => addTopicToGrid(topic, categoryName));
    }
    if (window.lucide) lucide.createIcons();
}

function addTopicToGrid(topicName, categoryName) {
    const grid = document.getElementById('topics-grid');
    if (!grid) return;

    // Remove empty state if present
    const emptyState = grid.querySelector('.empty-state');
    if (emptyState) emptyState.remove();

    const card = document.createElement('div');
    card.className = 'category-card';
    card.style.animation = 'fadeInUp 0.3s ease-out forwards';
    card.style.position = 'relative'; // For positioning delete btn

    const colors = ['#ec4899', '#8b5cf6', '#10b981', '#f59e0b', '#3b82f6'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    card.style.setProperty('--accent', randomColor);

    card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; width: 100%;">
            <i data-lucide="folder" style="color: ${randomColor}"></i>
             <button class="delete-topic-btn icon-btn-ghost" style="padding: 4px; color: var(--text-muted); width: 24px; height: 24px;" title="Delete Topic">
                <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
            </button>
        </div>
        <h4 style="margin-top: 12px;">${topicName}</h4>
        <span>${(appState.allocations[`${categoryName}/${topicName}`] || []).length} Files</span>
    `;

    // Bind Delete
    const deleteBtn = card.querySelector('.delete-topic-btn');
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent opening topic if we add that later

        if (confirm(`Are you sure you want to delete the topic "${topicName}"?`)) {
            // Update State
            const index = appState.topics[categoryName].indexOf(topicName);
            if (index > -1) {
                appState.topics[categoryName].splice(index, 1);
                saveState();

                // Remove from UI
                card.remove();

                // Show empty state if needed
                if (appState.topics[categoryName].length === 0) {
                    renderTopicsGrid(categoryName);
                }
            }
        }
    });

    // Add click handler to open viewer
    card.addEventListener('click', () => {
        openTopicViewer(topicName, categoryName);
    });

    grid.appendChild(card);
}

// --- Topic Viewer Logic ---

function setupTopicViewer() {
    if (document.getElementById('topic-viewer-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'topic-viewer-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal dialog-modal" style="width: 90vw; height: 85vh; max-width: 1200px; display: flex; flex-direction: column; padding: 0; overflow: hidden;">
            <div class="modal-header" style="flex-shrink: 0; padding: 16px 24px; border-bottom: 1px solid var(--bg-accent);">
                <h3 id="topic-viewer-title" style="margin: 0;">Topic Name</h3>
                <button class="icon-btn-ghost close-modal"><i data-lucide="x"></i></button>
            </div>
            <div class="modal-body" style="flex: 1; display: flex; overflow: hidden; padding: 0;">
                <div id="topic-file-list" style="width: 280px; flex-shrink: 0; border-right: 1px solid var(--bg-accent); overflow-y: auto; background: var(--bg-secondary);">
                    <!-- File list items -->
                </div>
                <div id="topic-file-content" style="flex: 1; overflow-y: auto; padding: 40px; background: var(--bg-primary);">
                    <div class="empty-state" style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--text-muted);">
                        <i data-lucide="file-text" style="width: 48px; height: 48px; margin-bottom: 16px; opacity: 0.2;"></i>
                        <p>Select a file to view its content</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Close logic
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => modal.classList.remove('active');
    modal.onclick = (e) => {
        if (e.target === modal) modal.classList.remove('active');
    };

    if (window.lucide) lucide.createIcons();
}

export async function openTopicViewer(topic, category) {
    setupTopicViewer();
    const modal = document.getElementById('topic-viewer-modal');
    const titleEl = document.getElementById('topic-viewer-title');
    const listEl = document.getElementById('topic-file-list');
    const contentEl = document.getElementById('topic-file-content');

    titleEl.textContent = topic;
    listEl.innerHTML = '';
    contentEl.innerHTML = `
        <div class="empty-state" style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--text-muted);">
            <i data-lucide="file-text" style="width: 48px; height: 48px; margin-bottom: 16px; opacity: 0.2;"></i>
            <p>Select a file to view its content</p>
        </div>
    `;

    // Construct Allocation Key
    // Note: The key format in settings.js is `${category}/${topic}`.
    // However, category names might have slashes? Usually not in this app.
    // Let's assume standard format.
    const key = `${category}/${topic}`;
    const files = appState.allocations[key] || [];

    if (files.length === 0) {
        listEl.innerHTML = `
            <div style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
                No files allocated to this topic yet.
                <br><br>
                <button class="secondary-btn" onclick="document.getElementById('settings-nav-btn').click(); document.querySelector('[data-tab=notes-settings]').click(); document.getElementById('topic-viewer-modal').classList.remove('active');" style="font-size: 0.8rem;">
                    Go to Settings to Allocate
                </button>
            </div>
        `;
    } else {
        files.forEach(fileName => {
            const btn = document.createElement('button');
            btn.className = 'file-list-item';
            btn.style.cssText = `
                display: flex; 
                align-items: center; 
                gap: 10px; 
                width: 100%; 
                padding: 12px 16px; 
                border: none; 
                background: transparent; 
                text-align: left; 
                cursor: pointer; 
                color: var(--text-primary); 
                border-bottom: 1px solid var(--bg-accent);
                transition: background 0.2s;
            `;
            btn.innerHTML = `
                <i data-lucide="file" style="width: 16px; height: 16px; color: var(--text-secondary);"></i>
                <span style="font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${fileName}</span>
            `;

            btn.onmouseover = () => { if (!btn.classList.contains('active')) btn.style.background = 'var(--bg-accent)'; };
            btn.onmouseout = () => { if (!btn.classList.contains('active')) btn.style.background = 'transparent'; };

            btn.onclick = () => {
                // Highlight active
                listEl.querySelectorAll('.file-list-item').forEach(b => {
                    b.classList.remove('active');
                    b.style.background = 'transparent';
                    b.style.fontWeight = 'normal';
                });
                btn.classList.add('active');
                btn.style.background = 'var(--bg-accent)';
                btn.style.fontWeight = '500';

                // Load Content
                loadLessonContent(category, fileName, contentEl);
            };

            listEl.appendChild(btn);
        });

        // Auto-select first file
        const firstBtn = listEl.querySelector('.file-list-item');
        if (firstBtn) firstBtn.click();
    }

    if (window.lucide) lucide.createIcons();
    modal.classList.add('active');
}

// Local cache for lessons registry
let lessonRegistry = null;

async function ensureLessonRegistry() {
    if (lessonRegistry) return;
    try {
        const res = await fetch('data/lessons.json');
        if (res.ok) {
            lessonRegistry = await res.json();
            console.log("Lesson registry loaded:", lessonRegistry);
        }
    } catch (e) {
        console.warn('Failed to load lesson registry:', e);
        lessonRegistry = { files: {} }; // Empty fallback
    }
}

function findFilePathInRegistry(fileName) {
    if (!lessonRegistry || !lessonRegistry.files) return null;
    for (const cat in lessonRegistry.files) {
        const files = lessonRegistry.files[cat];
        const match = files.find(f => f.name === fileName);
        if (match) return match.path;
    }
    return null;
}

function getCategoryFolder(category) {
    if (category.includes('Math')) return 'Math Lessons';
    // Check Professional first to avoid "Engineering" keyword inside "Professional Electrical Engineering" triggering the wrong folder
    if (category.includes('Professional') || category.includes('Electrical')) return 'Professional Lessons';
    if (category.includes('Engineering') || category.includes('Science')) return 'Engineering Science Lessons';
    return 'Math Lessons'; // Default
}

async function loadLessonContent(category, fileName, container) {
    container.innerHTML = `
        <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--text-muted);">
            <i data-lucide="loader-2" class="spin" style="width: 32px; height: 32px; margin-bottom: 16px;"></i>
            <p>Loading content...</p>
        </div>
    `;
    if (window.lucide) lucide.createIcons();

    try {
        await ensureLessonRegistry();

        // 1. Try to find the exact path from registry
        let url = findFilePathInRegistry(fileName);
        let res;

        if (url) {
            console.log(`Found path in registry: ${url}`);
            res = await fetch(url);
        } else {
            // 2. Fallback to folder guessing if registry lookup fails
            const folder = getCategoryFolder(category);
            url = `lesson/${folder}/${encodeURIComponent(fileName)}`;
            res = await fetch(url);
        }

        if (!res.ok) {
            // 3. Fallback: Try root lesson folder
            console.warn(`Lesson not found at ${url}, checking root 'lesson/'...`);
            url = `lesson/${encodeURIComponent(fileName)}`;
            res = await fetch(url);
        }

        if (!res.ok) {
            // 4. Fallback: Check other category folders
            const otherFolders = ['Math Lessons', 'Engineering Science Lessons', 'Professional Lessons'];
            const currentFolder = getCategoryFolder(category);

            for (const otherFolder of otherFolders) {
                if (otherFolder === currentFolder) continue;
                const otherUrl = `lesson/${otherFolder}/${encodeURIComponent(fileName)}`;
                const otherRes = await fetch(otherUrl);
                if (otherRes.ok) {
                    console.log(`Lesson found in ${otherFolder}`);
                    res = otherRes;
                    break;
                }
            }
        }

        if (!res || !res.ok) throw new Error("File not found");

        let text = await res.text();

        // Sanitize for KaTeX (replace en-dashes/em-dashes with hyphens to prevent unicode errors)
        text = text.replace(/–/g, '-').replace(/—/g, '-');

        // Render Markdown using marked.js if available
        let renderedContent = '';
        if (window.marked) {
            renderedContent = window.marked.parse(text);
        } else {
            renderedContent = text || '<p>No content available.</p>';
        }

        container.innerHTML = `
            <div class="markdown-preview markdown-body" style="max-width: 800px; margin: 0 auto; line-height: 1.6; color: var(--text-primary);">
                ${renderedContent}
            </div>
        `;

        // Render Math with KaTeX
        if (window.renderMathInElement) {
            window.renderMathInElement(container, {
                delimiters: [
                    { left: '$$', right: '$$', display: true },
                    { left: '$', right: '$', display: false },
                    { left: '\\(', right: '\\)', display: false },
                    { left: '\\[', right: '\\]', display: true }
                ],
                throwOnError: false
            });
        }

    } catch (err) {
        console.error(err);
        container.innerHTML = `
            <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--danger);">
                <i data-lucide="alert-circle" style="width: 48px; height: 48px; margin-bottom: 16px;"></i>
                <p>Error loading file: ${err.message}</p>
            </div>
        `;
        if (window.lucide) lucide.createIcons();
    }
}
