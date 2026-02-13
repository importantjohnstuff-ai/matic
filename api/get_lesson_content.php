<?php
header('Content-Type: application/json');

$category = isset($_GET['category']) ? $_GET['category'] : '';
$filename = isset($_GET['file']) ? $_GET['file'] : '';

if (!$category || !$filename) {
    echo json_encode(['error' => 'Missing category or filename']);
    exit;
}

// Map categories to folders
$folderMap = [
    'Math' => 'Math Lessons',
    'Engineering Sciences' => 'Engineering Science Lessons', 
    'Professional' => 'Professional Lessons'
];

$targetFolder = '';
foreach ($folderMap as $key => $val) {
    if (stripos($category, $key) !== false) {
        $targetFolder = $val;
        break;
    }
}

if (!$targetFolder) {
    echo json_encode(['error' => 'Invalid category']);
    exit;
}

// Construct path to Markdown directory
// Construct path to Markdown directory
$baseDir = '../lesson/' . $targetFolder . '/Markdown';

// Fallback: If Markdown folder doesn't exist, check parent folder
if (!is_dir($baseDir)) {
    $baseDir = '../lesson/' . $targetFolder;
}

$filePath = $baseDir . '/' . basename($filename); // basename prevents directory traversal

if (!file_exists($filePath)) {
    // Try without extension if missing? No, user requested specific file.
    // Try checking the other location?
    // If we checked Markdown and failed, maybe check parent?
    // The logic above sets baseDir which is then used for filePath.
    // But what if the file is in parent but Markdown dir EXISTS (but empty/diff files)?
    // Let's check both possibilities.
    
    $pathInMarkdown = '../lesson/' . $targetFolder . '/Markdown/' . basename($filename);
    $pathInParent = '../lesson/' . $targetFolder . '/' . basename($filename);
    
    if (file_exists($pathInMarkdown)) {
        $filePath = $pathInMarkdown;
    } elseif (file_exists($pathInParent)) {
        $filePath = $pathInParent;
    } else {
        echo json_encode(['error' => 'File not found: ' . $filename . ' in ' . $targetFolder]);
        exit;
    }
}

$content = file_get_contents($filePath);

// Simple markdown to HTML conversion (Very basic)
// Convert headers
$content = preg_replace('/^# (.*$)/m', '<h1>$1</h1>', $content);
$content = preg_replace('/^## (.*$)/m', '<h2>$1</h2>', $content);
$content = preg_replace('/^### (.*$)/m', '3<h3>$1</h3>', $content);
// Convert bold
$content = preg_replace('/\*\*(.*?)\*\*/', '<strong>$1</strong>', $content);
// Convert italic
$content = preg_replace('/\*(.*?)\*/', '<em>$1</em>', $content);
// Convert lists
$content = preg_replace('/^\* (.*$)/m', '<ul><li>$1</li></ul>', $content);
$content = preg_replace('/<\/ul>\s*<ul>/', '', $content); // Merge adjacent lists
// Convert paragraphs (double newline)
$content = preg_replace('/\n\n/', '<br><br>', $content);
// Convert tables (basic)
// This is complex regex without specialized library, skipping fully robust table parsing for now, 
// just wrapping in pre for complex blocks if detection fails?
// Let's rely on simple text replacement for now. The user asked to "view the markdowns".
// Maybe raw markdown is fine? Or minimal parsing.

// Ideally we'd use a library like Parsedown, but we can't install packages easily.
// The regex above handles headers and basic formatting.

echo json_encode(['content' => $content, 'raw' => file_get_contents($filePath)]);
?>
