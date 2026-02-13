
import { renderQuestionStats, SUB_CATEGORIES } from './settings.js';
import { appState } from './utils.js';

let allQuestions = [];
let isGeneratorMode = false;

export async function setupQuestionBankView(container) {
    container.innerHTML = `
        <div style="padding: 40px; max-width: 1200px; margin: 0 auto;">
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <h2>Question Bank</h2>
                <button id="toggle-generator-btn" class="primary-btn" style="display: flex; gap: 8px; align-items: center;">
                    <i data-lucide="file-plus-2"></i> Generate Test
                </button>
            </div>

            <!-- Stats Section (Main Content) -->
            <div id="q-bank-stats-section">
                <div id="q-bank-stats-container">
                    <div style="text-align: center; padding: 20px;">
                        <i data-lucide="loader-2" class="spin"></i> Loading data...
                    </div>
                </div>
            </div>

            <!-- Generator Control Bar (Floating or bottom) -->
            <div id="generator-controls" style="display: none; position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); background: var(--bg-secondary); padding: 16px 24px; border-radius: 50px; border: 1px solid var(--accent-color); box-shadow: 0 10px 25px rgba(0,0,0,0.2); z-index: 100; align-items: center; gap: 16px;">
                <span style="font-weight: 600; font-size: 0.95rem;">Test Generator</span>
                <div style="height: 20px; width: 1px; background: var(--bg-accent);"></div>
                
                <div style="display: flex; align-items: center; gap: 8px;">
                    <label style="font-size: 0.9rem;">Items:</label>
                    <input type="number" id="test-q-count" value="50" min="1" max="500" style="width: 70px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--bg-accent);">
                </div>

                <button id="generate-test-run-btn" class="primary-btn" style="padding: 8px 20px; font-size: 0.9rem; border-radius: 20px;">
                    Generate
                </button>
                <div id="gen-result-placeholder" style="display:none; font-size:0.8rem; color: var(--accent-color); margin-left: 8px;">
                     <i data-lucide="check" style="width:14px; height:14px;"></i> Done
                </div>
            </div>

        </div>
    `;

    if (window.lucide) lucide.createIcons();

    // Bind Toggle Button
    const toggleBtn = document.getElementById('toggle-generator-btn');
    toggleBtn.addEventListener('click', () => {
        isGeneratorMode = !isGeneratorMode;
        updateViewMode(toggleBtn);
    });

    // Bind Generate Run Button
    document.getElementById('generate-test-run-btn').addEventListener('click', handleGenerateTest);

    // Initial Data Load
    await loadData();
}

async function loadData() {
    const statsContainer = document.getElementById('q-bank-stats-container');
    try {
        const res = await fetch('data/questions.json');
        if (!res.ok) throw new Error("Failed to load questions");

        const json = await res.json();
        allQuestions = json.data || [];

        updateStatsRender();

    } catch (e) {
        console.error(e);
        if (statsContainer) statsContainer.innerHTML = '<p class="error-message">Failed to load statistics.</p>';
    }
}

function updateViewMode(btn) {
    const controls = document.getElementById('generator-controls');

    if (isGeneratorMode) {
        btn.innerHTML = '<i data-lucide="x"></i> Cancel Generator';
        btn.style.background = 'var(--bg-accent)';
        btn.style.color = 'var(--text-primary)';
        controls.style.display = 'flex';
    } else {
        btn.innerHTML = '<i data-lucide="file-plus-2"></i> Generate Test';
        btn.style.background = ''; // Revert to class style
        btn.style.color = '';
        controls.style.display = 'none';

        // Clear result
        const placeholder = document.getElementById('gen-result-placeholder');
        if (placeholder) placeholder.style.display = 'none';
    }

    if (window.lucide) lucide.createIcons();

    // Re-render stats with or without checkboxes
    updateStatsRender();
}

function updateStatsRender() {
    const statsContainer = document.getElementById('q-bank-stats-container');
    if (!statsContainer) return;

    statsContainer.innerHTML = '';
    renderQuestionStats(statsContainer, allQuestions, { selectable: isGeneratorMode });
}

function handleGenerateTest() {
    const countInput = document.getElementById('test-q-count');
    const count = parseInt(countInput.value) || 50;

    // Checkboxes are now inside the stats tables
    const checkboxes = document.querySelectorAll('.subtopic-checkbox:checked');
    const selectedSubs = Array.from(checkboxes).map(cb => cb.value);

    // Filter Questions
    let pool = allQuestions.filter(q => selectedSubs.includes(q.sub_category));

    // User validation
    if (selectedSubs.length === 0) {
        alert("Please select at least one subtopic from the list.");
        return;
    }

    if (pool.length === 0) {
        alert("No questions found for the selected subtopics.");
        return;
    }

    if (pool.length < count) {
        if (!confirm(`Only ${pool.length} questions available for these topics. Generate test with all of them?`)) {
            return;
        }
    }

    // Shuffle and Slice
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    const testSet = pool.slice(0, count);

    // Generate Outputs
    generateTestOutputs(testSet);
}

function generateTestOutputs(questions) {
    const resultDiv = document.getElementById('gen-result-placeholder');
    if (resultDiv) {
        resultDiv.style.display = 'inline-block';
        setTimeout(() => resultDiv.style.display = 'none', 3000);
    }

    // Show Modal or Auto-open?
    // Let's create a temporary modal or just open the windows directly.
    // The previous design had buttons to open. 
    // Since we are in a floating bar, space is limited. 
    // Let's modify the floating bar to show "Open Q / Open Key" buttons after generation? 
    // Or just open them immediately? "Open Questionnaire" might be blocked by popups if triggered async, but click is sync here.

    // Let's replace the "Generate" button temporarily with "Download" buttons or add them.
    // simpler: Just open a small modal with the 2 buttons.

    openDownloadModal(questions);
}

function openDownloadModal(questions) {
    // Determine existing modal container or create one
    // We can reuse the Question Edit modal logic or simple alert.
    // Better: Create a custom overlay.

    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.5); z-index: 2000; display: flex;
        justify-content: center; align-items: center;
    `;

    overlay.innerHTML = `
        <div style="background: var(--bg-secondary); padding: 32px; border-radius: 12px; border: 1px solid var(--bg-accent); box-shadow: 0 10px 30px rgba(0,0,0,0.2); text-align: center; max-width: 400px; width: 90%;">
            <div style="margin-bottom: 24px;">
                <div style="background: var(--bg-accent); width: 60px; height: 60px; border-radius: 30px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                    <i data-lucide="check-circle-2" style="width: 30px; height: 30px; color: var(--accent-color);"></i>
                </div>
                <h3 style="margin-bottom: 8px;">Test Generated!</h3>
                <p style="color: var(--text-secondary);">${questions.length} questions ready.</p>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 12px;">
                 <button id="dl-q-btn" class="primary-btn" style="width: 100%; justify-content: center; gap: 8px;">
                    <i data-lucide="printer"></i> Open Questionnaire
                 </button>
                 <button id="dl-k-btn" class="secondary-btn" style="width: 100%; justify-content: center; gap: 8px; background: transparent; border: 1px solid var(--bg-accent); color: var(--text-primary);">
                    <i data-lucide="key"></i> Open Answer Key
                 </button>
                 <button id="close-dl-modal" style="margin-top: 12px; background: none; border: none; color: var(--text-muted); cursor: pointer; text-decoration: underline;">
                    Close
                 </button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
    if (window.lucide) lucide.createIcons();

    overlay.querySelector('#dl-q-btn').onclick = () => openPrintable(questions, 'questionnaire');
    overlay.querySelector('#dl-k-btn').onclick = () => openPrintable(questions, 'key');
    overlay.querySelector('#close-dl-modal').onclick = () => document.body.removeChild(overlay);
}

function openPrintable(questions, type) {
    const title = "Generated Test";
    const date = new Date().toLocaleDateString();

    let content = '';

    if (type === 'questionnaire') {
        content = questions.map((q, i) => {
            const opts = q.options || {};
            // Handle both uppercase and lowercase keys
            const a = opts.a || opts.A || '';
            const b = opts.b || opts.B || '';
            const c = opts.c || opts.C || '';
            const d = opts.d || opts.D || '';

            // Escape/Prepare text for Markdown/Math
            // Note: We will use a script in the generated HTML to render this using Marked + MathJax
            // We'll wrap format strings in a way that preserves them.

            return `
            <div class="question-item" style="margin-bottom: 24px; break-inside: avoid; page-break-inside: avoid;">
                <div class="q-text" style="font-weight: bold; margin-bottom: 8px;">
                    <span class="q-num">${i + 1}.</span> 
                    <div class="markdown-content" style="display:inline-block; vertical-align:top;">${q.question_text || 'Question text missing'}</div>
                </div>
                <div style="margin-left: 20px;">
                    <div class="option-row"><span class="opt-label">A)</span> <div class="markdown-content" style="display:inline-block;">${a}</div></div>
                    <div class="option-row"><span class="opt-label">B)</span> <div class="markdown-content" style="display:inline-block;">${b}</div></div>
                    <div class="option-row"><span class="opt-label">C)</span> <div class="markdown-content" style="display:inline-block;">${c}</div></div>
                    <div class="option-row"><span class="opt-label">D)</span> <div class="markdown-content" style="display:inline-block;">${d}</div></div>
                </div>
            </div>
            `;
        }).join('');
    } else {
        content = `
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 12px;">
                ${questions.map((q, i) => `
                    <div style="padding: 4px; border-bottom: 1px solid #eee;">
                        <strong>${i + 1}.</strong> ${q.answer ? q.answer.toUpperCase() : '-'}
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Get settings or defaults
    const settings = appState.questionnaireSettings || { font: 'Roboto', fontSize: '11pt', columns: 1, lineSpacing: 1.5 };

    // CSS Column Logic
    const columnStyle = settings.columns > 1
        ? `column-count: ${settings.columns}; column-gap: 40px;`
        : '';

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${title} - ${type === 'key' ? 'Answer Key' : 'Questionnaire'}</title>
            <meta charset="UTF-8">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
                
                body { 
                    font-family: ${settings.font}, sans-serif; 
                    font-size: ${settings.fontSize};
                    line-height: ${settings.lineSpacing};
                    padding: 40px; 
                    color: #333; 
                    max-width: ${settings.columns > 1 ? '100%' : '900px'}; 
                    margin: 0 auto; 
                }
                h1 { text-align: center; margin-bottom: 10px; }
                .meta { text-align: center; color: #666; margin-bottom: 40px; border-bottom: 1px solid #eee; padding-bottom: 20px;}
                
                #content-area {
                    ${columnStyle}
                }
                
                .question-item { 
                    margin-bottom: ${parseInt(settings.fontSize) * 1.5}px; 
                    break-inside: avoid; 
                    page-break-inside: avoid;
                    display: inline-block; /* Helps with column breaking */
                    width: 100%;
                }
                
                .option-row { margin-bottom: 6px; display: flex; gap: 8px; }
                .opt-label { font-weight: 600; min-width: 25px; }
                
                /* Markdown Styling Defaults */
                .markdown-content p { margin: 0; display: inline; } 
                .markdown-content img { max-width: 100%; height: auto; }
                
                @media print {
                    button { display: none; }
                    body { padding: 0; max-width: 100%; }
                    .question-item { break-inside: avoid; }
                }
            </style>
            
            <!-- Marked for Markdown -->
            <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
            
            <!-- MathJax for LaTeX -->
            <script>
            window.MathJax = {
              tex: {
                inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
                displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']]
              },
              svg: {
                fontCache: 'global'
              }
            };
            </script>
            <script type="text/javascript" id="MathJax-script" async
              src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js">
            </script>
        </head>
        <body>
            <h1>${title}</h1>
            <div class="meta">${type === 'key' ? 'ANSWER KEY' : 'QUESTIONNAIRE'} • ${date} • ${questions.length} Items</div>
            <div style="margin-bottom: 20px; text-align: right;">
                <button onclick="window.print()" style="padding: 10px 20px; cursor: pointer; background: #000; color: #fff; border: none; border-radius: 4px;">Print / Save as PDF</button>
            </div>
            
            <div id="content-area">
                ${content}
            </div>

            <script>
                // Render Markdown after load
                document.addEventListener('DOMContentLoaded', () => {
                    const elements = document.querySelectorAll('.markdown-content');
                    elements.forEach(el => {
                        // Parse Markdown
                        let md = el.innerHTML;
                        // Unescape HTML entities if needed (basic)
                        md = md.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
                        
                        el.innerHTML = marked.parse(md);
                    });
                    
                    // MathJax will auto-run, or we can force it if needed
                    // if(window.MathJax) MathJax.typesetPromise();
                });
            </script>
        </body>
        </html>
    `;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
}
