
// State Management
// State Management
export const appState = {
    topics: {
        'Math': [
            'Calculator Technique',
            'Differential Calculus',
            'Integral Calculus',
            'Geometry',
            'Trignometry',
            'Differential Equation',
            'Advanced Math',
            'Probability and Statistics',
            'Vector Analysis',
            'Minima/Maxima',
            'Numerical Methods',
            'Laplace Transform'
        ],
        'Engineering Sciences and Applied Subjects': [
            'Chemistry',
            'Physics',
            'Thermodynamics',
            'Fluid Mechanics',
            'Mechanics',
            'Strength of Materials',
            'Economy'
        ],
        'Professional Electrical Engineering': [
            'DC Circuits',
            'AC Circuits',
            'DC Machines',
            'AC Machines',
            'Transformers',
            'Electromagnetism',
            'Transmission Lines',
            'Powerplants',
            'Fault Analysis',
            'Illumination',
            'Power Factor Correction'
        ]
    },
    allocations: {},
    questionnaireSettings: {
        font: 'Roboto',
        fontSize: '11pt',
        columns: 1,
        lineSpacing: 1.5
    }
};

// Safe storage initialization
export function initState() {
    try {
        const storedTopics = localStorage.getItem('matic_topics');
        if (storedTopics) {
            const parsed = JSON.parse(storedTopics);
            // Only overwrite if we have actual data, otherwise keep defaults
            // Or better: Merge defaults with stored to ensure new categories appear
            if (Object.keys(parsed).length > 0) {
                // Check if we are missing the main categories (e.g. first run with new defaults)
                // If the user has some topics but not the new structure, we might want to merge.
                // For now, let's just ensure our hardcoded defaults are used if the stored object is empty or malformed.
                appState.topics = { ...appState.topics, ...parsed };

                // Force-set the curriculum topics to ensure they match the latest requirements
                // This overrides local storage for these specific categories to update the curriculum
                appState.topics['Math'] = [
                    'Calculator Technique', 'Differential Calculus', 'Integral Calculus', 'Geometry', 'Trignometry',
                    'Differential Equation', 'Advanced Math', 'Probability and Statistics', 'Vector Analysis',
                    'Minima/Maxima', 'Numerical Methods', 'Laplace Transform'
                ];

                appState.topics['Engineering Sciences and Applied Subjects'] = [
                    'Chemistry', 'Physics', 'Thermodynamics', 'Fluid Mechanics', 'Mechanics',
                    'Strength of Materials', 'Economy'
                ];

                appState.topics['Professional Electrical Engineering'] = [
                    'DC Circuits', 'AC Circuits', 'DC Machines', 'AC Machines', 'Transformers',
                    'Electromagnetism', 'Transmission Lines', 'Powerplants', 'Fault Analysis',
                    'Illumination', 'Power Factor Correction'
                ];
            }
        }

        const storedAllocations = localStorage.getItem('matic_allocations');
        if (storedAllocations) {
            appState.allocations = JSON.parse(storedAllocations);
        }

        // Auto-Allocate Core Lessons if missing
        // This ensures the user sees their markdown files immediately without manual setup
        const categories = [
            'Math',
            'Engineering Sciences and Applied Subjects',
            'Professional Electrical Engineering'
        ];

        let hasUpdates = false;
        categories.forEach(cat => {
            const topics = appState.topics[cat] || [];
            topics.forEach(topic => {
                const key = `${cat}/${topic}`;
                // If no files allocated, try default matching file
                if (!appState.allocations[key] || appState.allocations[key].length === 0) {
                    appState.allocations[key] = [`${topic}.md`];
                    hasUpdates = true;
                }
            });
        });

        if (hasUpdates) {
            // We don't saveState() here to avoid overwriting user preferences permanently on first load if they unwanted it?
            // Actually, saving it is better UX so it persists.
            saveState();
        }

        const storedQSettings = localStorage.getItem('matic_q_settings');
        if (storedQSettings) appState.questionnaireSettings = JSON.parse(storedQSettings);
    } catch (e) {
        console.warn("LocalStorage access denied or failed. State will not persist.", e);
        // Fallback: Proceed with defaults and auto-allocation
        const categories = ['Math', 'Engineering Sciences and Applied Subjects', 'Professional Electrical Engineering'];
        categories.forEach(cat => {
            const topics = appState.topics[cat] || [];
            topics.forEach(topic => {
                const key = `${cat}/${topic}`;
                if (!appState.allocations[key]) {
                    appState.allocations[key] = [`${topic}.md`];
                }
            });
        });
    }
}

export function saveState() {
    try {
        localStorage.setItem('matic_topics', JSON.stringify(appState.topics));
        localStorage.setItem('matic_allocations', JSON.stringify(appState.allocations));
        localStorage.setItem('matic_q_settings', JSON.stringify(appState.questionnaireSettings));
    } catch (e) {
        console.warn("Failed to save state to LocalStorage.", e);
    }
}

// Category Helpers
export function getCategoryColor(cat) {
    if (!cat) return '#64748b';
    const c = cat.toUpperCase();
    if (c.includes('MATH')) return '#ec4899';
    if (c.includes('PROFESSIONAL')) return '#8b5cf6';
    if (c.includes('ENGINEERING')) return '#10b981';
    return '#64748b'; // Default gray
}

export function getCategoryShortName(cat) {
    if (!cat || cat === 'Uncategorized') return 'General';
    const c = cat.toUpperCase();
    if (c.includes('PROFESSIONAL')) return 'Professional';
    if (c.includes('ENGINEERING')) return 'Engineering Sci';
    if (c.includes('MATH')) return 'Math';
    return cat;
}
