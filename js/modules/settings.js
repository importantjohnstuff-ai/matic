
import { appState, saveState, getCategoryColor, getCategoryShortName } from './utils.js';

let currentEditingId = null;
let currentEditingDisplay = null;

export const SUB_CATEGORIES = {
    'Math': [
        'Advanced Math',
        'Calculator Techniques',
        'Differential Calculus',
        'Differential Equations',
        'Geometry',
        'Integral Calculus',
        'Minima/Maxima',
        'Numerical Methods',
        'Probability and Statistics',
        'Trigonometry',
        'Vector Analysis'
    ],
    'Engineering Sciences': [
        'Chemistry',
        'Economy',
        'Fluid Mechanics',
        'Mechanics',
        'Physics',
        'Strength of Materials',
        'Thermodynamics'
    ],
    'Professional': [
        'AC Circuits',
        'AC Machines',
        'DC Circuits',
        'DC Machines',
        'Electromagnetism',
        'Fault Analysis',
        'Illumination',
        'Polyphase Circuits',
        'Power Factor Correction',
        'Powerplants',
        'Transformers',
        'Transmission Lines'
    ]
};


export function setupSettingsView() {
    const container = document.getElementById('settings-view');
    if (!container) return;

    // Check if structure is already built
    if (container.querySelector('.settings-tabs')) return;

    // Build Basic Structure
    container.innerHTML = `
        <div class="dashboard-grid">
            <section class="welcome-section">
                <h2>Settings</h2>
                <p class="subtitle">Manage content and preferences.</p>

                <div class="settings-tabs" style="display: flex; gap: 20px; border-bottom: 1px solid var(--bg-accent); margin-bottom: 24px;">
                    <button class="tab-btn active" data-tab="question-settings" style="padding: 12px 24px; background: transparent; border: none; border-bottom: 2px solid var(--accent-color); color: var(--text-primary); cursor: pointer; font-weight: 500;">
                        Question List
                    </button>
                    <button class="tab-btn" data-tab="questionnaire-settings" style="padding: 12px 24px; background: transparent; border: none; border-bottom: 2px solid transparent; color: var(--text-muted); cursor: pointer; font-weight: 500;">
                        Questionnaire Settings
                    </button>
                    <button class="tab-btn" data-tab="notes-settings" style="padding: 12px 24px; background: transparent; border: none; border-bottom: 2px solid transparent; color: var(--text-muted); cursor: pointer; font-weight: 500;">
                        Notes Settings
                    </button>
                </div>

                <div id="settings-content" style="background: var(--bg-secondary); padding: 40px; border-radius: 16px; border: 1px solid var(--bg-accent);">
                    <!-- Content injected here -->
                </div>
            </section>
        </div>
    `;

    const tabs = container.querySelectorAll('.tab-btn');

    // Tab Switching Logic
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => {
                t.classList.remove('active');
                t.style.borderBottom = '2px solid transparent';
                t.style.color = 'var(--text-muted)';
            });
            tab.classList.add('active');
            tab.style.borderBottom = '2px solid var(--accent-color)';
            tab.style.color = 'var(--text-primary)';

            loadSettingsTab(tab.dataset.tab);
        });
    });

    // Default Load
    loadSettingsTab('question-settings');
    setupSubCategoryModal();
    setupCategoryModal();
    setupQuestionEditModal();
    setupAnswerModal();
}

function loadSettingsTab(tabName) {
    const contentArea = document.getElementById('settings-content');
    contentArea.innerHTML = '';

    if (tabName === 'question-settings') {
        renderQuestionList(contentArea);
    } else if (tabName === 'notes-settings') {
        renderAllocationUI(contentArea);
    } else if (tabName === 'questionnaire-settings') {
        renderQuestionnaireSettings(contentArea);
    }
}

function renderQuestionnaireSettings(container) {
    // Ensure default settings exist if appState was wiped
    if (!appState.questionnaireSettings) {
        appState.questionnaireSettings = { font: 'Roboto', fontSize: '11pt', columns: 1, lineSpacing: 1.5 };
    }

    const settings = appState.questionnaireSettings;

    container.innerHTML = `
        <h3 style="margin-bottom: 20px;">Printable Output Settings</h3>
        <p style="color: var(--text-secondary); margin-bottom: 30px;">Customize how your generated questionnaires look when printed or saved as PDF.</p>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; max-width: 800px;">
            <!-- Font Family -->
            <div class="form-group">
                <label style="display: block; margin-bottom: 8px; font-weight: 500;">Font Family</label>
                <select id="q-font" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--bg-accent); background: var(--bg-primary); color: var(--text-primary);">
                    <option value="Roboto" ${settings.font === 'Roboto' ? 'selected' : ''}>Roboto (Modern Sans)</option>
                    <option value="'Times New Roman', Times, serif" ${settings.font.includes('Times') ? 'selected' : ''}>Times New Roman (Classic Serif)</option>
                    <option value="'Courier New', Courier, monospace" ${settings.font.includes('Courier') ? 'selected' : ''}>Courier New (Typewriter)</option>
                    <option value="Arial, sans-serif" ${settings.font.includes('Arial') ? 'selected' : ''}>Arial (Standard)</option>
                </select>
            </div>

            <!-- Font Size -->
            <div class="form-group">
                <label style="display: block; margin-bottom: 8px; font-weight: 500;">Font Size</label>
                <select id="q-size" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--bg-accent); background: var(--bg-primary); color: var(--text-primary);">
                    <option value="9pt" ${settings.fontSize === '9pt' ? 'selected' : ''}>Small (9pt)</option>
                    <option value="10pt" ${settings.fontSize === '10pt' ? 'selected' : ''}>Normal (10pt)</option>
                    <option value="11pt" ${settings.fontSize === '11pt' ? 'selected' : ''}>Large (11pt)</option>
                    <option value="12pt" ${settings.fontSize === '12pt' ? 'selected' : ''}>Extra Large (12pt)</option>
                </select>
            </div>

            <!-- Columns -->
            <div class="form-group">
                <label style="display: block; margin-bottom: 8px; font-weight: 500;">Layout Columns</label>
                <select id="q-cols" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--bg-accent); background: var(--bg-primary); color: var(--text-primary);">
                    <option value="1" ${settings.columns == 1 ? 'selected' : ''}>Single Column</option>
                    <option value="2" ${settings.columns == 2 ? 'selected' : ''}>Two Columns</option>
                </select>
            </div>

            <!-- Line Spacing -->
             <div class="form-group">
                <label style="display: block; margin-bottom: 8px; font-weight: 500;">Line Spacing</label>
                 <select id="q-spacing" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--bg-accent); background: var(--bg-primary); color: var(--text-primary);">
                    <option value="1.2" ${settings.lineSpacing == 1.2 ? 'selected' : ''}>Compact (1.2)</option>
                    <option value="1.5" ${settings.lineSpacing == 1.5 ? 'selected' : ''}>Standard (1.5)</option>
                    <option value="2" ${settings.lineSpacing == 2 ? 'selected' : ''}>Double (2.0)</option>
                </select>
            </div>
            
            <div style="grid-column: 1 / -1; margin-top: 20px;">
                <div style="background: var(--bg-primary); border: 1px dashed var(--bg-accent); padding: 20px; text-align: center; border-radius: 8px;">
                     <h4 style="margin-bottom: 10px;">Preview</h4>
                     <div id="preview-text" style="text-align: left; padding: 20px; border: 1px solid #ddd; background: #fff; color: #000; border-radius: 4px; height: 300px; overflow-y: auto;">
                        <div class="preview-item" style="break-inside: avoid; margin-bottom: 24px;">
                            <strong>1. Sample Question Text</strong><br>
                            This is how your question text will appear on the generated page. Check the readability and spacing.<br>
                            A) Option A<br>
                            B) Option B<br>
                            C) Option C<br>
                            D) Option D
                        </div>
                        <div class="preview-item" style="break-inside: avoid; margin-bottom: 24px;">
                            <strong>2. Another Question</strong><br>
                            Here is a second question to demonstrate how the layout looks when multiple items are stacked.<br>
                            A) Choice 1<br>
                            B) Choice 2<br>
                            C) Choice 3<br>
                            D) Choice 4
                        </div>
                        <div class="preview-item" style="break-inside: avoid; margin-bottom: 24px;">
                            <strong>3. Long Text Example</strong><br>
                            This question has a bit more description to verify how lines wrap within the columns. It helps to ensure that everything is legible under the current settings.<br>
                            A) True<br>
                            B) False
                        </div>
                        <div class="preview-item" style="break-inside: avoid; margin-bottom: 24px;">
                            <strong>4. Calculation Problem</strong><br>
                            Calculate the value of x if 2x + 5 = 15.<br>
                            A) 5<br>
                            B) 10<br>
                            C) 2<br>
                            D) 0
                        </div>
                     </div>
                </div>
            </div>
        </div>
    `;

    // Bind Events
    const inputs = ['q-font', 'q-size', 'q-cols', 'q-spacing'];
    inputs.forEach(id => {
        document.getElementById(id).addEventListener('change', () => {
            updateSettingsState();
            updatePreview();
        });
    });

    updatePreview(); // Initial render
}

function updateSettingsState() {
    appState.questionnaireSettings = {
        font: document.getElementById('q-font').value,
        fontSize: document.getElementById('q-size').value,
        columns: document.getElementById('q-cols').value,
        lineSpacing: document.getElementById('q-spacing').value
    };
    saveState();
}

function updatePreview() {
    const preview = document.getElementById('preview-text');
    const settings = appState.questionnaireSettings;

    preview.style.fontFamily = settings.font;
    preview.style.fontSize = settings.fontSize;
    preview.style.lineHeight = settings.lineSpacing;

    if (settings.columns > 1) {
        preview.style.columnCount = settings.columns;
        preview.style.columnGap = '20px';
    } else {
        preview.style.columnCount = 'auto';
        preview.style.columnGap = 'normal';
    }
}

// --- Question List Logic ---

async function renderQuestionList(container) {
    console.log("Initializing Question List...");
    container.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <i data-lucide="loader-2" class="spin"></i> Loading Questions...
        </div>
    `;
    if (window.lucide) lucide.createIcons();

    try {
        const response = await fetch('data/questions.json');

        if (!response.ok) {
            throw new Error(`Server returned ${response.status}: ${response.statusText}`);
        }

        const data = await response.json(); // generator wrapped in {data: []}
        const questions = data.data;
        console.log(`Loaded ${questions.length} questions from API.`);

        if (!questions || questions.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-muted);">No questions found.</p>';
            return;
        }

        // Clear Loading Indicator
        container.innerHTML = '';

        // Render Stats Tables
        renderQuestionStats(container, questions);

        // Initialize table container with structure
        const tableContainer = document.createElement('div');
        tableContainer.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; margin-top: 40px; border-top: 1px solid var(--bg-accent); padding-top: 30px;">
                <h3>All Questions (${questions.length})</h3>
                <input type="text" id="q-search" placeholder="Filter questions..." style="padding: 8px 12px; border-radius: 6px; border: 1px solid var(--bg-accent); background: var(--bg-primary); color: var(--text-primary); min-width: 250px;">
            </div>
            <div style="max-height: 600px; overflow-y: auto; border: 1px solid var(--bg-accent); border-radius: 8px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; table-layout: fixed;">
                    <thead style="background: var(--bg-accent); position: sticky; top: 0; z-index: 10;">
                        <tr>
                            <th style="padding: 12px; text-align: left; width: 60px;">ID</th>
                            <th style="padding: 12px; text-align: left; width: 220px;">Category</th>
                            <th style="padding: 12px; text-align: left; width: 200px;">Sub-Category</th>
                            <th style="padding: 12px; text-align: center; width: 80px;">Answer</th>
                            <th style="padding: 12px; text-align: left;">Question Preview</th>
                            <th style="padding: 12px; text-align: center; width: 80px;">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="q-table-body">
                        <!-- Rows injected via JS -->
                    </tbody>
                </table>
            </div>
        `;

        // Append table container to DOM FIRST
        container.appendChild(tableContainer);

        // NOW select the tbody from the DOM
        const tbody = document.getElementById('q-table-body');
        const fragment = document.createDocumentFragment();

        questions.forEach(q => {
            const tr = document.createElement('tr');
            tr.style.borderBottom = '1px solid var(--bg-accent)';
            tr.innerHTML = `
                <td style="padding: 12px; color: var(--text-muted); font-family: monospace;">#${q.id}</td>
                <td style="padding: 12px;">
                    <div class="editable-cell" data-id="${q.id}" data-field="category">
                        <div class="display-val">
                           <span title="${q.category}" style="
                                display: inline-flex; 
                                align-items: center; 
                                background-color: ${getCategoryColor(q.category)}; 
                                color: white; 
                                padding: 6px 12px; 
                                border-radius: 20px; 
                                font-size: 0.85rem; 
                                font-weight: 600; 
                                cursor: pointer;
                                box-shadow: 0 1px 2px rgba(0,0,0,0.1);
                            ">
                                ${getCategoryShortName(q.category)} 
                                <i data-lucide="edit-2" style="width:14px; height:14px; margin-left:6px; opacity:0.9;"></i>
                            </span>
                        </div>
                        <select class="edit-input" style="display:none; padding: 6px; border-radius: 6px; border: 1px solid var(--primary); background: var(--bg-primary); color: var(--text-primary);">
                            <option value="MATH">Math</option>
                            <option value="ENGINEERING SCIENCES">Engineering Sciences</option>
                            <option value="PROFESSIONAL ELECTRICAL ENGINEERING">Professional</option>
                        </select>
                    </div>
                </td>
                <td style="padding: 12px;">
                        <div class="editable-cell" data-id="${q.id}" data-field="sub_category">
                        <div class="display-val" style="
                            cursor: pointer; 
                            display: inline-flex; 
                            align-items: center; 
                            gap: 8px; 
                            padding: 4px 8px; 
                            border-radius: 6px; 
                            transition: background 0.2s;
                        " onmouseover="this.style.background='var(--bg-accent)'" onmouseout="this.style.background='transparent'">
                            <span style="font-weight: 500;">${q.sub_category}</span> 
                            <i data-lucide="edit-2" style="width:14px; height:14px; opacity:0.4;"></i>
                        </div>
                    </div>
                </td>
                <td class="answer-cell-trigger" data-id="${q.id}" style="padding: 12px; text-align: center; font-weight: bold; color: var(--text-primary); text-transform: uppercase; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.color='var(--accent-color)'; this.style.backgroundColor='var(--bg-accent)'" onmouseout="this.style.color='var(--text-primary)'; this.style.backgroundColor='transparent'" title="Click to Change Answer">
                    ${q.answer || '-'}
                </td>
                <td style="padding: 12px; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${q.question_text}</td>
                <td style="padding: 12px; text-align: center;">
                    <button class="icon-btn edit-question-btn" data-id="${q.id}" style="padding: 6px; background: transparent; border: 1px solid var(--bg-accent); border-radius: 6px; cursor: pointer; color: var(--text-secondary); transition: all 0.2s;" onmouseover="this.style.color='var(--accent-color)'; this.style.borderColor='var(--accent-color)'" onmouseout="this.style.color='var(--text-secondary)'; this.style.borderColor='var(--bg-accent)'">
                        <i data-lucide="file-edit" style="width: 16px; height: 16px;"></i>
                    </button>
                </td>
            `;
            fragment.appendChild(tr);
        });

        tbody.appendChild(fragment);

        if (window.lucide) lucide.createIcons();

        // Bind Edit Buttons (Scope to tableContainer to avoid full doc scan if needed, but container is safer)
        tableContainer.querySelectorAll('.edit-question-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent row click if any
                openQuestionEditModal(btn.dataset.id);
            });
        });

        // Bind Answer Cells
        tableContainer.querySelectorAll('.answer-cell-trigger').forEach(cell => {
            cell.addEventListener('click', () => {
                openAnswerModal(cell.dataset.id);
            });
        });

        // Search Filter Logic
        const searchInput = document.getElementById('q-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const term = e.target.value.toLowerCase();
                const rows = tbody.querySelectorAll('tr');
                rows.forEach(row => {
                    const text = row.innerText.toLowerCase();
                    row.style.display = text.includes(term) ? '' : 'none';
                });
            });
        }

        // Inline Editing Logic
        attachInlineEditingHandlers(tableContainer);

    } catch (err) {
        console.error(err);
        container.innerHTML = `<p class="error-message">Error loading questions: ${err.message}</p>`;
    }
}

export function renderQuestionStats(container, questions, options = {}) {
    // Initialize counts for categories
    const categoryCounts = {
        'Math': {},
        'Engineering Sciences': {},
        'Professional': {}
    };

    // Pre-populate sub-categories with 0
    Object.keys(SUB_CATEGORIES).forEach(cat => {
        SUB_CATEGORIES[cat].forEach(sub => {
            categoryCounts[cat][sub] = 0;
        });
    });

    questions.forEach(q => {
        let cat = q.category;

        // Normalize Category
        if (cat === 'MATH') cat = 'Math';
        else if (cat === 'ENGINEERING SCIENCES') cat = 'Engineering Sciences';
        else if (cat === 'PROFESSIONAL ELECTRICAL ENGINEERING') cat = 'Professional';

        // Count Sub-Category
        if (categoryCounts[cat] && q.sub_category) {
            // Find best match if exact match fails? No, user wants specific list.
            if (categoryCounts[cat].hasOwnProperty(q.sub_category)) {
                categoryCounts[cat][q.sub_category]++;
            }
        }
    });

    // Generate HTML for stats
    const statsSection = document.createElement('div');
    statsSection.style.marginBottom = '20px';

    statsSection.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
            ${generateStatTable('Math', '#ec4899', categoryCounts['Math'], options)}
            ${generateStatTable('Engineering Sciences', '#10b981', categoryCounts['Engineering Sciences'], options)}
            ${generateStatTable('Professional', '#8b5cf6', categoryCounts['Professional'], options)}
        </div>
    `;

    container.appendChild(statsSection);
}

function generateStatTable(title, color, data, options = {}) {
    let rows = '';

    // Convert to array, sort? Or keep defined order?
    // Let's keep the order defined in SUB_CATEGORIES for consistency
    const order = SUB_CATEGORIES[title] || [];

    order.forEach(sub => {
        const count = data[sub] || 0;
        let cellContent = sub;

        if (options.selectable) {
            cellContent = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <input type="checkbox" class="subtopic-checkbox" value="${sub}" data-category="${title}" 
                           style="width: 16px; height: 16px; accent-color: ${color}; cursor: pointer;">
                    <span>${sub}</span>
                </div>
            `;
        }

        rows += `
            <tr style="border-bottom: 1px solid var(--bg-accent);">
                <td style="padding: 10px 16px; color: var(--text-secondary); font-size: 0.9rem;">${cellContent}</td>
                <td style="padding: 10px 16px; text-align: right; font-weight: 600; color: var(--text-primary);">${count}</td>
            </tr>
        `;
    });

    return `
        <div class="stat-col" style="background: var(--bg-primary); border: 1px solid var(--bg-accent); border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <div style="background: ${color}15; padding: 16px; border-bottom: 2px solid ${color};">
                <h4 style="color: ${color}; margin: 0; font-size: 1.1rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                    ${title}
                </h4>
            </div>
            <table style="width: 100%; border-collapse: collapse;">
                <tbody>
                    ${rows}
                </tbody>
            </table>
        </div>
    `;
}

function attachInlineEditingHandlers(container) {
    container.querySelectorAll('.editable-cell').forEach(cell => {
        const display = cell.querySelector('.display-val');
        const field = cell.dataset.field;
        const id = cell.dataset.id;

        // Ensure inputs are hidden as we use modals now
        const input = cell.querySelector('.edit-input');
        if (input) input.style.display = 'none';

        // Click to Edit
        display.addEventListener('click', () => {
            if (field === 'sub_category') {
                openSubCategoryModal(id, display);
            } else if (field === 'category') {
                openCategoryModal(id, display);
            }
        });
    });
}


// --- Modal Logic ---

function setupCategoryModal() {
    if (!document.getElementById('cat-modal')) {
        const modal = document.createElement('div');
        modal.id = 'cat-modal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal" style="max-width: 400px;">
                <div class="modal-header">
                    <h3>Select Category</h3>
                    <button class="icon-btn close-modal"><i data-lucide="x"></i></button>
                </div>
                <div class="modal-body">
                    <div class="cat-list-container" style="display: flex; flex-direction: column; gap: 8px;">
                        <button class="cat-btn" data-val="MATH" style="display:flex; align-items:center; gap:12px; padding:12px; border:1px solid transparent; border-radius:8px; background:var(--bg-primary); cursor:pointer; color:var(--text-primary); text-align:left; transition: all 0.2s;">
                            <span style="width:12px; height:12px; border-radius:50%; background:#ec4899;"></span>
                            <div style="display:flex; flex-direction:column;">
                                <span style="font-weight:600;">Math</span>
                                <span style="font-size:0.8rem; color:var(--text-muted);">Mathematics</span>
                            </div>
                        </button>
                        <button class="cat-btn" data-val="ENGINEERING SCIENCES" style="display:flex; align-items:center; gap:12px; padding:12px; border:1px solid transparent; border-radius:8px; background:var(--bg-primary); cursor:pointer; color:var(--text-primary); text-align:left; transition: all 0.2s;">
                             <span style="width:12px; height:12px; border-radius:50%; background:#10b981;"></span>
                             <div style="display:flex; flex-direction:column;">
                                <span style="font-weight:600;">Engineering Sci</span>
                                <span style="font-size:0.8rem; color:var(--text-muted);">Engineering Sciences and Allied Subjects</span>
                            </div>
                        </button>
                        <button class="cat-btn" data-val="PROFESSIONAL ELECTRICAL ENGINEERING" style="display:flex; align-items:center; gap:12px; padding:12px; border:1px solid transparent; border-radius:8px; background:var(--bg-primary); cursor:pointer; color:var(--text-primary); text-align:left; transition: all 0.2s;">
                             <span style="width:12px; height:12px; border-radius:50%; background:#8b5cf6;"></span>
                             <div style="display:flex; flex-direction:column;">
                                <span style="font-weight:600;">Professional</span>
                                <span style="font-size:0.8rem; color:var(--text-muted);">Professional Electrical Engineering</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Event Delegation for buttons
        modal.querySelectorAll('.cat-btn').forEach(btn => {
            btn.onmouseover = () => btn.style.background = 'var(--bg-accent)';
            btn.onmouseout = () => btn.style.background = 'var(--bg-primary)';
            btn.onclick = () => selectCategory(btn.dataset.val);
        });

        // Close logic
        modal.querySelector('.close-modal').onclick = () => modal.classList.remove('active');
        modal.onclick = (e) => { if (e.target === modal) modal.classList.remove('active'); };
        if (window.lucide) lucide.createIcons();
    }
}

async function selectCategory(value) {
    if (!currentEditingId) return;

    const modal = document.getElementById('cat-modal');
    modal.classList.remove('active');

    // Capture current state for rollback
    const originalContent = currentEditingDisplay.innerHTML;

    // 1. Instant Optimistic Update with HARDCODED SVG (No processing delay)
    const editIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-edit-2" style="margin-left:6px; opacity:0.9;"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>`;

    currentEditingDisplay.innerHTML = `
        <span title="${value}" style="
            display: inline-flex; 
            align-items: center; 
            background-color: ${getCategoryColor(value)}; 
            color: white; 
            padding: 6px 12px; 
            border-radius: 20px; 
            font-size: 0.85rem; 
            font-weight: 600; 
            cursor: pointer;
            box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        ">
            ${getCategoryShortName(value)} 
            ${editIconSvg}
        </span>`;

    // 2. Defer Background Save (Mocked)
    setTimeout(() => {
        // Mock Success
        console.log("Mock saved category:", value);
    }, 50);
}

function openCategoryModal(id, displayElement) {
    currentEditingId = id;
    currentEditingDisplay = displayElement;
    document.getElementById('cat-modal').classList.add('active');
}

function setupSubCategoryModal() {
    // Inject Modal HTML if not exists
    if (!document.getElementById('sub-cat-modal')) {
        const modal = document.createElement('div');
        modal.id = 'sub-cat-modal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3>Select Sub-Category</h3>
                    <button class="icon-btn close-modal"><i data-lucide="x"></i></button>
                </div>
                <div class="modal-body">
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
                        <div class="sub-cat-col">
                            <h4 style="color: #ec4899; margin-bottom:12px; border-bottom: 2px solid #ec4899; padding-bottom: 4px;">Math</h4>
                            <div class="sub-cat-list" data-cat="Math"></div>
                        </div>
                        <div class="sub-cat-col">
                            <h4 style="color: #10b981; margin-bottom:12px; border-bottom: 2px solid #10b981; padding-bottom: 4px;">Engineering Sciences</h4>
                            <div class="sub-cat-list" data-cat="Engineering Sciences"></div>
                        </div>
                        <div class="sub-cat-col">
                            <h4 style="color: #8b5cf6; margin-bottom:12px; border-bottom: 2px solid #8b5cf6; padding-bottom: 4px;">Professional</h4>
                            <div class="sub-cat-list" data-cat="Professional"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Populate Lists
        const lists = modal.querySelectorAll('.sub-cat-list');
        lists.forEach(list => {
            const cat = list.dataset.cat;
            const items = SUB_CATEGORIES[cat];
            if (items) {
                items.forEach(item => {
                    const btn = document.createElement('button');
                    btn.textContent = item;
                    btn.style.cssText = 'display:block; width:100%; text-align:left; padding:8px; margin-bottom:4px; border:1px solid transparent; border-radius:4px; background:var(--bg-primary); cursor:pointer; color:var(--text-secondary); font-size:0.9rem;';
                    btn.onmouseover = () => btn.style.background = 'var(--bg-accent)';
                    btn.onmouseout = () => btn.style.background = 'var(--bg-primary)';
                    btn.onclick = () => selectSubCategory(item);
                    list.appendChild(btn);
                });
            }
        });

        // Close logic
        modal.querySelector('.close-modal').onclick = () => modal.classList.remove('active');
        modal.onclick = (e) => { if (e.target === modal) modal.classList.remove('active'); };
        if (window.lucide) lucide.createIcons();
    }
}

function openSubCategoryModal(id, displayElement) {
    currentEditingId = id;
    currentEditingDisplay = displayElement;
    document.getElementById('sub-cat-modal').classList.add('active');
}

async function selectSubCategory(value) {
    if (!currentEditingId) return;

    const modal = document.getElementById('sub-cat-modal');
    modal.classList.remove('active');

    // Capture current state for rollback
    const originalContent = currentEditingDisplay.innerHTML;

    // 1. Instant Optimistic Update with RAW SVG (No JS processing delay)
    // Using a raw SVG string for 'edit-2' to avoid calling lucide.createIcons()
    const editIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-edit-2" style="width:14px; height:14px; opacity:0.4;"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>`;

    currentEditingDisplay.innerHTML = `
        <span style="font-weight: 500;">${value}</span> 
        ${editIconSvg}
    `;

    // REMOVED: lucide.createIcons call which was causing the freeze

    // 2. Background Save (Mocked)
    setTimeout(() => {
        console.log("Mock saved sub-category:", value);
    }, 50);
}



// --- Allocation UI Logic ---

function renderAllocationUI(container) {
    container.innerHTML = `
        <div class="allocation-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; text-align: left;">
            <div>
                <h3 style="margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
                    <i data-lucide="file-stack" style="color: var(--text-secondary);"></i> Unallocated Files
                </h3>
                
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-size: 0.9rem; color: var(--text-muted);">Select Source Category</label>
                    <select id="allocation-source-cat" style="width: 100%; padding: 10px; background: var(--bg-primary); border: 1px solid var(--bg-accent); border-radius: 8px; color: var(--text-primary);">
                        <option value="" disabled selected>Choose a category...</option>
                        <option value="Math">Math</option>
                        <option value="Engineering Sciences and Applied Subjects">Engineering Sciences and Applied Subjects</option>
                        <option value="Professional Electrical Engineering">Professional Electrical Engineering</option>
                    </select>
                </div>

                <div id="file-list" style="height: 300px; overflow-y: auto; background: var(--bg-primary); border: 1px solid var(--bg-accent); border-radius: 8px; padding: 12px;">
                    <p style="text-align: center; color: var(--text-muted); padding: 20px;">Select a category to load files.</p>
                </div>
            </div>

            <div>
                <h3 style="margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
                    <i data-lucide="folder-input" style="color: var(--text-secondary);"></i> Target Topic
                </h3>

                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-size: 0.9rem; color: var(--text-muted);">Select Target Topic</label>
                    <select id="allocation-target-topic" disabled style="width: 100%; padding: 10px; background: var(--bg-primary); border: 1px solid var(--bg-accent); border-radius: 8px; color: var(--text-primary); opacity: 0.5;">
                        <option value="" disabled selected>Choose a topic...</option>
                    </select>
                </div>

                <div style="background: var(--bg-primary); border: 1px dashed var(--bg-accent); border-radius: 8px; padding: 24px; text-align: center; height: 300px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                    <p id="selection-summary" style="color: var(--text-muted); margin-bottom: 24px;">Select a file and a topic to allocate.</p>
                    <button id="allocate-btn" class="primary-btn" disabled style="opacity: 0.5; width: auto;">
                        Allocate File
                    </button>
                    <p id="allocation-scuccess-msg" style="color: var(--success); font-size: 0.9rem; margin-top: 16px; display: none;">Allocated successfully!</p>
                </div>
            </div>
        </div>
    `;
    if (window.lucide) lucide.createIcons();

    const sourceSelect = document.getElementById('allocation-source-cat');
    const topicSelect = document.getElementById('allocation-target-topic');
    const fileListEl = document.getElementById('file-list');
    const allocateBtn = document.getElementById('allocate-btn');
    const summaryText = document.getElementById('selection-summary');
    const successMsg = document.getElementById('allocation-scuccess-msg');

    let selectedFile = null;

    sourceSelect.addEventListener('change', async (e) => {
        const categoryVal = e.target.value;
        const displayCategory = e.target.options[e.target.selectedIndex].text;

        fileListEl.innerHTML = '<div style="text-align: center; padding: 20px;">Loading...</div>';
        try {
            const res = await fetch('data/lessons.json');
            const json = await res.json();

            // Map long names to keys
            let key = 'Math';
            if (categoryVal.includes('Engineering')) key = 'Engineering Sciences';
            if (categoryVal.includes('Professional')) key = 'Professional';

            const files = json.files[key] || [];

            if (files.length > 0) {
                fileListEl.innerHTML = '';
                files.forEach(file => {
                    const item = document.createElement('div');
                    item.style.cssText = 'padding: 8px; border-bottom: 1px solid var(--bg-accent); cursor: pointer; border-radius: 4px; display: flex; align-items: center; gap: 8px; font-size: 0.9rem;';
                    item.innerHTML = `<i data-lucide="file-text" style="width: 16px; height: 16px;"></i> ${file.name}`;

                    item.addEventListener('click', () => {
                        Array.from(fileListEl.children).forEach(c => c.style.background = 'transparent');
                        item.style.background = 'rgba(99, 102, 241, 0.1)';
                        selectedFile = file.name;
                        updateSummary();
                    });

                    fileListEl.appendChild(item);
                });
                if (window.lucide) lucide.createIcons();
            } else {
                fileListEl.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 20px;">No files found in this category.</p>';
            }

        } catch (err) {
            console.error(err);
            fileListEl.innerHTML = '<p style="text-align: center; color: var(--danger); padding: 20px;">Error loading files.</p>';
        }

        let storageKey = displayCategory;
        const topics = appState.topics[storageKey] || [];

        topicSelect.innerHTML = '<option value="" disabled selected>Choose a topic...</option>';
        if (topics.length > 0) {
            topicSelect.disabled = false;
            topicSelect.style.opacity = '1';
            topics.forEach(t => {
                const opt = document.createElement('option');
                opt.value = t;
                opt.textContent = t;
                topicSelect.appendChild(opt);
            });
        } else {
            topicSelect.disabled = true;
            topicSelect.style.opacity = '0.5';
            const opt = document.createElement('option');
            opt.textContent = "No topics found";
            topicSelect.appendChild(opt);
        }
    });

    topicSelect.addEventListener('change', updateSummary);

    function updateSummary() {
        const topic = topicSelect.value;
        if (selectedFile && topic) {
            summaryText.innerHTML = `Allocating <strong>${selectedFile}</strong> <br> to <br> <strong>${topic}</strong>`;
            allocateBtn.disabled = false;
            allocateBtn.style.opacity = '1';
        } else {
            summaryText.textContent = "Select a file and a topic to allocate.";
            allocateBtn.disabled = true;
            allocateBtn.style.opacity = '0.5';
        }
    }

    allocateBtn.addEventListener('click', () => {
        const category = sourceSelect.options[sourceSelect.selectedIndex].text;
        const topic = topicSelect.value;
        const key = `${category}/${topic}`;

        if (!appState.allocations[key]) appState.allocations[key] = [];

        if (!appState.allocations[key].includes(selectedFile)) {
            appState.allocations[key].push(selectedFile);
            saveState();
            successMsg.style.display = 'block';
            setTimeout(() => { successMsg.style.display = 'none'; }, 3000);
        } else {
            alert('File already allocated to this topic.');
        }
    });
}


// --- Question Edit Modal ---

function setupQuestionEditModal() {
    if (document.getElementById('q-edit-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'q-edit-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal" style="width: 600px; max-width: 90vw;">
            <div class="modal-header">
                <h3>Edit Question #<span id="edit-q-id"></span></h3>
                <button class="icon-btn close-modal"><i data-lucide="x"></i></button>
            </div>
            <div class="modal-body">
                <div class="form-group" style="margin-bottom: 16px;">
                    <label style="display:block; margin-bottom: 6px; font-weight: 500;">Question Text</label>
                    <textarea id="edit-q-text" rows="4" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid var(--bg-accent); background: var(--bg-primary); color: var(--text-primary); resize: vertical;"></textarea>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                    <div>
                        <label style="display:block; margin-bottom: 6px; font-weight: 500;">Option A</label>
                        <textarea id="edit-opt-a" rows="2" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--bg-accent); background: var(--bg-primary); color: var(--text-primary);"></textarea>
                    </div>
                    <div>
                        <label style="display:block; margin-bottom: 6px; font-weight: 500;">Option B</label>
                        <textarea id="edit-opt-b" rows="2" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--bg-accent); background: var(--bg-primary); color: var(--text-primary);"></textarea>
                    </div>
                    <div>
                        <label style="display:block; margin-bottom: 6px; font-weight: 500;">Option C</label>
                        <textarea id="edit-opt-c" rows="2" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--bg-accent); background: var(--bg-primary); color: var(--text-primary);"></textarea>
                    </div>
                    <div>
                        <label style="display:block; margin-bottom: 6px; font-weight: 500;">Option D</label>
                        <textarea id="edit-opt-d" rows="2" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--bg-accent); background: var(--bg-primary); color: var(--text-primary);"></textarea>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 24px;">
                    <div>
                        <label style="display:block; margin-bottom: 6px; font-weight: 500;">Correct Answer</label>
                        <select id="edit-q-ans" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid var(--bg-accent); background: var(--bg-primary); color: var(--text-primary);">
                            <option value="a">A</option>
                            <option value="b">B</option>
                            <option value="c">C</option>
                            <option value="d">D</option>
                        </select>
                    </div>
                    <div>
                        <label style="display:block; margin-bottom: 6px; font-weight: 500;">Category</label>
                        <select id="edit-q-cat" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid var(--bg-accent); background: var(--bg-primary); color: var(--text-primary);">
                             <option value="MATH">Math</option>
                             <option value="ENGINEERING SCIENCES">Engineering Sciences</option>
                             <option value="PROFESSIONAL ELECTRICAL ENGINEERING">Professional</option>
                        </select>
                    </div>
                    <div>
                        <label style="display:block; margin-bottom: 6px; font-weight: 500;">Sub-Category</label>
                        <input list="sub-cat-list-edit" id="edit-q-sub" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid var(--bg-accent); background: var(--bg-primary); color: var(--text-primary);">
                        <datalist id="sub-cat-list-edit">
                            <!-- Populated dynamically -->
                        </datalist>
                    </div>
                </div>

                <div style="text-align: right;">
                    <button class="primary-btn" id="save-q-edit-btn" style="padding: 10px 24px;">Save Changes</button>
                    <span id="edit-status-msg" style="margin-right: 12px; font-size: 0.9rem;"></span>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Populate Datalist
    const dl = document.getElementById('sub-cat-list-edit');
    Object.values(SUB_CATEGORIES).flat().forEach(sub => {
        const op = document.createElement('option');
        op.value = sub;
        dl.appendChild(op);
    });

    // Event Listeners
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => modal.classList.remove('active');
    modal.onclick = (e) => { if (e.target === modal) modal.classList.remove('active'); };

    document.getElementById('save-q-edit-btn').onclick = saveQuestionEdit;

    if (window.lucide) lucide.createIcons();
}

async function openQuestionEditModal(id) {
    const modal = document.getElementById('q-edit-modal');
    const status = document.getElementById('edit-status-msg');

    // Clear previous values or show loading
    document.getElementById('edit-q-text').value = 'Loading...';
    status.innerText = '';

    modal.classList.add('active');
    document.getElementById('edit-q-id').innerText = id;

    try {
        const res = await fetch('data/questions.json');
        if (!res.ok) throw new Error("Failed to fetch questions");
        const json = await res.json();
        const data = json.data.find(q => q.id == id);

        if (!data) throw new Error("Question not found");

        // Populate Fields
        document.getElementById('edit-q-text').value = data.question || '';
        document.getElementById('edit-opt-a').value = data.options?.a || '';
        document.getElementById('edit-opt-b').value = data.options?.b || '';
        document.getElementById('edit-opt-c').value = data.options?.c || '';
        document.getElementById('edit-opt-d').value = data.options?.d || '';

        document.getElementById('edit-q-ans').value = data.answer || 'a';
        document.getElementById('edit-q-cat').value = data.category || 'MATH';
        document.getElementById('edit-q-sub').value = data.sub_category || '';

        // Store ID on the save button for easy access
        document.getElementById('save-q-edit-btn').dataset.id = id;

    } catch (e) {
        console.error(e);
        document.getElementById('edit-q-text').value = 'Error loading question.';
    }
}

async function saveQuestionEdit() {
    const btn = document.getElementById('save-q-edit-btn');
    const id = btn.dataset.id;
    const status = document.getElementById('edit-status-msg');

    if (!id) return;

    // Gather Data
    const payload = {
        id: id,
        question: document.getElementById('edit-q-text').value,
        options: {
            a: document.getElementById('edit-opt-a').value,
            b: document.getElementById('edit-opt-b').value,
            c: document.getElementById('edit-opt-c').value,
            d: document.getElementById('edit-opt-d').value,
        },
        answer: document.getElementById('edit-q-ans').value,
        category: document.getElementById('edit-q-cat').value,
        sub_category: document.getElementById('edit-q-sub').value
    };

    status.innerText = 'Saving...';
    status.style.color = 'var(--text-muted)';
    btn.disabled = true;

    // Mock Success for Static Version
    setTimeout(() => {
        status.innerText = 'Saved (Mock)!';
        status.style.color = 'var(--success)';

        // Refresh List to show changes (Wait a bit then refresh)
        setTimeout(() => {
            const modal = document.getElementById('q-edit-modal');
            modal.classList.remove('active');
            btn.disabled = false;
            status.innerText = '';

            // Reload the table
            const contentArea = document.getElementById('settings-content');
            if (contentArea) renderQuestionList(contentArea);

        }, 800);
    }, 500);
}


// --- Answer Selection Modal ---

function setupAnswerModal() {
    if (document.getElementById('ans-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'ans-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal" style="width: 500px;">
            <div class="modal-header">
                <h3>Select Correct Answer</h3>
                <button class="icon-btn close-modal"><i data-lucide="x"></i></button>
            </div>
            <div class="modal-body">
                <div id="ans-modal-loading" style="text-align:center; padding:20px; display:none;">
                    <i data-lucide="loader-2" class="spin"></i> Loading...
                </div>
                
                <div id="ans-modal-content" style="display:none;">
                    <p id="ans-q-text" style="font-weight: 500; margin-bottom: 20px; color: var(--text-primary);"></p>
                    
                    <div id="ans-options-list" style="display: flex; flex-direction: column; gap: 10px;">
                        <!-- Options injected here -->
                    </div>

                    <div style="margin-top: 24px; text-align: right;">
                        <span id="ans-status-msg" style="margin-right: 12px; font-size: 0.9rem;"></span>
                        <button class="primary-btn" id="save-ans-btn" disabled>Save Answer</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => modal.classList.remove('active');
    modal.onclick = (e) => { if (e.target === modal) modal.classList.remove('active'); };

    document.getElementById('save-ans-btn').onclick = saveAnswer;

    if (window.lucide) lucide.createIcons();
}

let currentAnswerId = null;
let selectedAnswerVal = null;

async function openAnswerModal(id) {
    currentAnswerId = id;
    selectedAnswerVal = null;

    const modal = document.getElementById('ans-modal');
    const loading = document.getElementById('ans-modal-loading');
    const content = document.getElementById('ans-modal-content');
    const status = document.getElementById('ans-status-msg');
    const list = document.getElementById('ans-options-list');
    const saveBtn = document.getElementById('save-ans-btn');

    modal.classList.add('active');
    loading.style.display = 'block';
    content.style.display = 'none';
    status.innerText = '';
    saveBtn.disabled = true;
    list.innerHTML = '';

    try {
        const res = await fetch(`api/get_question.php?id=${id}`);
        if (!res.ok) throw new Error("Failed");
        const json = await res.json();
        const data = json.data;

        document.getElementById('ans-q-text').textContent = data.question;

        // Render Options
        ['a', 'b', 'c', 'd'].forEach(optKey => {
            const optText = data.options[optKey];
            if (!optText) return;

            const div = document.createElement('div');
            div.className = 'ans-option-item';

            // Initial Style
            const isCurrent = (data.answer === optKey);
            if (isCurrent) selectedAnswerVal = optKey; // Default selection

            div.innerHTML = `
                <div class="radio-circle" style="
                    width: 18px; 
                    height: 18px; 
                    border-radius: 50%; 
                    border: 2px solid ${isCurrent ? 'var(--accent-color)' : 'var(--text-muted)'};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 12px;
                ">
                    ${isCurrent ? '<div style="width: 10px; height: 10px; background: var(--accent-color); border-radius: 50%;"></div>' : ''}
                </div>
                <div style="flex:1; display:flex; align-items:center; gap:8px;">
                    <span style="font-weight: 600; text-transform: uppercase; color: var(--text-muted); width: 20px;">${optKey.toUpperCase()}</span>
                    <span style="color: var(--text-primary);">${optText}</span>
                </div>
            `;

            div.style.cssText = `
                padding: 12px; 
                border: 1px solid ${isCurrent ? 'var(--accent-color)' : 'var(--bg-accent)'}; 
                border-radius: 8px; 
                cursor: pointer; 
                display: flex; 
                align-items: center; 
                transition: all 0.2s;
                background: ${isCurrent ? 'var(--bg-accent)' : 'transparent'};
            `;

            div.addEventListener('click', () => {
                // Deselect others
                list.querySelectorAll('.ans-option-item').forEach(el => {
                    el.style.borderColor = 'var(--bg-accent)';
                    el.style.background = 'transparent';
                    el.querySelector('.radio-circle').style.borderColor = 'var(--text-muted)';
                    el.querySelector('.radio-circle').innerHTML = '';
                });

                // Select this
                div.style.borderColor = 'var(--accent-color)';
                div.style.background = 'var(--bg-accent)';
                div.querySelector('.radio-circle').style.borderColor = 'var(--accent-color)';
                div.querySelector('.radio-circle').innerHTML = '<div style="width: 10px; height: 10px; background: var(--accent-color); border-radius: 50%;"></div>';

                selectedAnswerVal = optKey;
                saveBtn.disabled = false;
            });

            list.appendChild(div);
        });

        loading.style.display = 'none';
        content.style.display = 'block';
        if (window.lucide) lucide.createIcons();

    } catch (e) {
        console.error(e);
        loading.innerHTML = '<span style="color: var(--danger);">Failed to load question.</span>';
    }
}

async function saveAnswer() {
    if (!currentAnswerId || !selectedAnswerVal) return;

    const btn = document.getElementById('save-ans-btn');
    const status = document.getElementById('ans-status-msg');
    const modal = document.getElementById('ans-modal');

    status.innerText = 'Saving...';
    status.style.color = 'var(--text-muted)';
    btn.disabled = true;

    // Mock Success for Static
    setTimeout(() => {
        status.innerText = 'Saved (Mock)!';
        status.style.color = 'var(--success)';

        setTimeout(() => {
            modal.classList.remove('active');
            btn.disabled = false;
            status.innerText = '';

            // Refresh grid
            const contentArea = document.getElementById('settings-content');
            if (contentArea) renderQuestionList(contentArea);
        }, 500);

    }, 500);
}
