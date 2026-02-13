
import { appState, saveState } from './utils.js';
import { renderTopicsGrid } from './notes.js';

export function setupGlobalModals() {
    console.log("Setting up global modals...");

    // -- New Note Modal --
    const noteModal = document.getElementById('new-note-modal');
    const newNoteBtn = document.querySelector('.top-actions .primary-btn');

    // -- New Topic Modal --
    const topicModal = document.getElementById('new-topic-modal');
    const addTopicBtn = document.getElementById('add-topic-btn');

    // -- Common --
    const closeBtns = document.querySelectorAll('.close-modal');

    // 1. New Note Logic
    if (noteModal && newNoteBtn) {
        newNoteBtn.addEventListener('click', () => {
            console.log("Opening New Note Modal");
            noteModal.classList.add('active');
        });
    }

    // 2. New Topic Logic
    if (topicModal && addTopicBtn) {
        addTopicBtn.addEventListener('click', () => {
            console.log("Opening New Topic Modal");
            topicModal.classList.add('active');
            const input = document.getElementById('topic-name-input');
            if (input) setTimeout(() => input.focus(), 100);
        });

        // Save Topic Logic - Use replace logic to prevent dupe listeners
        const saveTopicBtn = document.getElementById('save-topic-btn');
        if (saveTopicBtn) {
            const newBtn = saveTopicBtn.cloneNode(true);
            saveTopicBtn.parentNode.replaceChild(newBtn, saveTopicBtn);

            newBtn.addEventListener('click', () => {
                const input = document.getElementById('topic-name-input');
                const topicName = input.value.trim();
                const currentCategory = document.getElementById('notes-view-title').textContent;

                if (topicName) {
                    if (!appState.topics[currentCategory]) {
                        appState.topics[currentCategory] = [];
                    }

                    if (!appState.topics[currentCategory].includes(topicName)) {
                        appState.topics[currentCategory].push(topicName);
                        saveState();
                        renderTopicsGrid(currentCategory);
                    } else {
                        alert('Topic already exists!');
                    }

                    topicModal.classList.remove('active');
                    input.value = '';
                } else {
                    alert('Please enter a topic name');
                }
            });
        }
    }

    // 3. Close Logic
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const openModal = btn.closest('.modal-overlay');
            if (openModal) openModal.classList.remove('active');
        });
    });

    // 4. Overlay Click Logic
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                overlay.classList.remove('active');
            }
        });
    });
}
