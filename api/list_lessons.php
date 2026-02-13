<?php
header('Content-Type: application/json');

// Get category from query param
$category = isset($_GET['category']) ? $_GET['category'] : '';

// Map short names/IDs to actual folder names
$folderMap = [
    'Math' => 'Math Lessons',
    'Engineering Sciences' => 'Engineering Science Lessons', 
    'Professional' => 'Professional Lessons'
];

// Normalize input or direct mapping
$targetFolder = '';
foreach ($folderMap as $key => $val) {
    if (stripos($category, $key) !== false) {
        $targetFolder = $val;
        break;
    }
}

if (!$targetFolder) {
    echo json_encode(['error' => 'Invalid or missing category']);
    exit;
}

// Adjust baseDir to look inside the 'Markdown' subdirectory
// Check in main folder first
$baseDirs = [];
$baseDirs[] = '../lesson/' . $targetFolder;
$baseDirs[] = '../lesson/' . $targetFolder . '/Markdown';

$files = [];

foreach ($baseDirs as $dir) {
    if (is_dir($dir)) {
        $scanned = scandir($dir);
        foreach ($scanned as $file) {
            if ($file !== '.' && $file !== '..') {
                $filePath = $dir . '/' . $file;
                if (is_file($filePath) && strtolower(pathinfo($file, PATHINFO_EXTENSION)) === 'md') {
                    // Avoid duplicates if file exists in both? Usually preference for Markdown subfolder
                    // But for simplicity, list all.
                    // Actually, let's key by name to avoid duplicates
                    $files[$file] = [
                        'name' => $file,
                        'path' => $filePath,
                        'size' => filesize($filePath)
                    ];
                }
            }
        }
    }
}

// Re-index array
$files = array_values($files);

echo json_encode(['files' => $files]);
?>
