const fs = require('fs');
const path = require('path');

// Configuration
const LESSON_DIR = path.join(__dirname, 'lesson');
const QUESTION_DIR = path.join(__dirname, 'questionbank');
const OUTPUT_DIR = path.join(__dirname, 'data');

// Helper: Ensure output dir exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
}

// ---------------------------------------------------------
// 1. Generate questions.json
// ---------------------------------------------------------
console.log('Generating questions.json...');
const allQuestions = [];

function scanQuestions(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            scanQuestions(fullPath);
        } else if (file.endsWith('.json')) {
            try {
                const content = fs.readFileSync(fullPath, 'utf8');
                const json = JSON.parse(content);
                if (Array.isArray(json)) {
                    json.forEach(q => {
                        // Normalize keys
                        const category = q.category || q.Category || 'Uncategorized';
                        const subCategory = q.sub_category || q['Sub Category'] || 'General';
                        const question = q.question || q.Question || '';
                        const answer = q.answer || q.Answer || '';
                        const options = q.options || q.Options || {};
                        const id = q.id;

                        if (id) {
                            allQuestions.push({
                                id,
                                category: normalizeCategory(category),
                                sub_category: subCategory,
                                question_text: question,
                                options,
                                answer
                            });
                        }
                    });
                }
            } catch (e) {
                console.error(`Error parsing ${file}:`, e.message);
            }
        }
    });
}

function normalizeCategory(cat) {
    const upper = cat.trim().toUpperCase();
    if (upper.includes('MATH')) return 'Math';
    if (upper.includes('ENGINEERING') && upper.includes('SCIENCE')) return 'Engineering Sciences';
    if (upper.includes('PROFESSIONAL')) return 'Professional';
    return cat.trim();
}

scanQuestions(QUESTION_DIR);
// Sort by ID
allQuestions.sort((a, b) => a.id - b.id);

fs.writeFileSync(path.join(OUTPUT_DIR, 'questions.json'), JSON.stringify({ data: allQuestions }, null, 2));
console.log(`Saved ${allQuestions.length} questions to data/questions.json`);


// ---------------------------------------------------------
// 2. Generate lessons.json
// ---------------------------------------------------------
console.log('Generating lessons.json...');
const lessons = {
    'Math': [],
    'Engineering Sciences': [],
    'Professional': []
};

// Map based on folder names
const folderMap = {
    'Math Lessons': 'Math',
    'Engineering Science Lessons': 'Engineering Sciences',
    'Professional Lessons': 'Professional'
};

Object.keys(folderMap).forEach(folderName => {
    const categoryName = folderMap[folderName];
    const dirPath = path.join(LESSON_DIR, folderName); // Files are directly in the folder

    if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);
        files.forEach(file => {
            if (file.endsWith('.md')) {
                const fullPath = path.join(dirPath, file);
                const stat = fs.statSync(fullPath);

                lessons[categoryName].push({
                    name: file,
                    path: `lesson/${folderName}/${file}`, // Correct path
                    size: stat.size,
                    timestamp: stat.mtimeMs,
                    date: new Date(stat.mtimeMs).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                });
            }
        });
    }
});

fs.writeFileSync(path.join(OUTPUT_DIR, 'lessons.json'), JSON.stringify({ files: lessons }, null, 2));


// ---------------------------------------------------------
// 3. Generate dashboard_data.json
// ---------------------------------------------------------
console.log('Generating dashboard_data.json...');

// Calculate stats
let totalNotes = 0;
const allNotesArray = [];

Object.keys(lessons).forEach(cat => {
    lessons[cat].forEach(note => {
        totalNotes++;
        allNotesArray.push({
            title: note.name.replace('.md', ''),
            category: cat,
            date: note.date,
            timestamp: note.timestamp,
            snippet: 'Click to view content...',
            path: note.path // Adding path for convenience
        });
    });
});

// Sort recent notes
allNotesArray.sort((a, b) => b.timestamp - a.timestamp);
const recentNotes = allNotesArray.slice(0, 6);

const dashboardData = {
    stats: {
        totalNotes: totalNotes,
        completionRate: '85%', // Hardcoded as per original PHP logic (random/dummy)
        streak: 12
    },
    recentNotes: recentNotes,
    categories: [
        { name: 'Math', count: lessons['Math'].length, icon: 'calculator' },
        { name: 'Engineering Sciences', count: lessons['Engineering Sciences'].length, icon: 'flask-conical' },
        { name: 'Professional Electrical', count: lessons['Professional'].length, icon: 'zap' }
    ]
};

fs.writeFileSync(path.join(OUTPUT_DIR, 'dashboard_data.json'), JSON.stringify(dashboardData, null, 2));
console.log('Data generation complete.');
