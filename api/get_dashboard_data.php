<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

$baseDir = __DIR__ . '/../lesson';
$data = [
    'stats' => [
        'totalNotes' => 0,
        'completionRate' => rand(75, 95) . '%',
        'streak' => rand(5, 20)
    ],
    'recentNotes' => [],
    'categories' => []
];

$folderMap = [
    'Math Lessons' => ['name' => 'Math', 'icon' => 'calculator'],
    'Engineering Science Lessons' => ['name' => 'Engineering Sciences', 'icon' => 'flask-conical'],
    'Professional Lessons' => ['name' => 'Professional Electrical', 'icon' => 'zap']
];

$allNotes = [];

foreach ($folderMap as $dirName => $info) {
    $dirPath = $baseDir . '/' . $dirName . '/Markdown';
    $fileCount = 0;
    
    if (is_dir($dirPath)) {
        $files = scandir($dirPath);
        foreach ($files as $file) {
            if ($file !== '.' && $file !== '..' && strtolower(pathinfo($file, PATHINFO_EXTENSION)) === 'md') {
                $fileCount++;
                $filePath = $dirPath . '/' . $file;
                
                $allNotes[] = [
                    'title' => pathinfo($file, PATHINFO_FILENAME),
                    'category' => $info['name'], // Use display name
                    'date' => date('M d, Y', filemtime($filePath)),
                    'timestamp' => filemtime($filePath),
                    'snippet' => 'Click to view content...' 
                ];
            }
        }
    }
    
    $data['stats']['totalNotes'] += $fileCount;
    $data['categories'][] = [
        'name' => $info['name'],
        'count' => $fileCount,
        'icon' => $info['icon']
    ];
}

$data['recentNotes'] = $allNotes;

// Sort all collected notes by modification time (newest first)
usort($data['recentNotes'], function($a, $b) {
    return $b['timestamp'] - $a['timestamp'];
});

// Taking top 6 most recent
$data['recentNotes'] = array_slice($data['recentNotes'], 0, 6);

// Format dates for JSON
foreach ($data['recentNotes'] as &$note) {
    $note['date'] = date('M d, Y', $note['timestamp']);
    unset($note['timestamp']); // Clean up
}

function getIconForCategory($name) {
    $name = strtolower($name);
    if (strpos($name, 'math') !== false) return 'calculator';
    if (strpos($name, 'electrical') !== false) return 'zap';
    if (strpos($name, 'science') !== false) return 'flask-conical';
    return 'folder';
}

echo json_encode($data);
?>
