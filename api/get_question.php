<?php
header('Content-Type: application/json');

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid ID']);
    exit;
}

$dir = '../questionbank';

if (is_dir($dir)) {
    $files = scandir($dir);
    foreach ($files as $file) {
        if ($file === '.' || $file === '..') continue;
        
        $path = $dir . '/' . $file;
        if (is_file($path) && pathinfo($path, PATHINFO_EXTENSION) === 'json') {
            $content = file_get_contents($path);
            $json = json_decode($content, true);
            
            if (is_array($json)) {
                foreach ($json as $q) {
                    if (isset($q['id']) && intval($q['id']) === $id) {
                        echo json_encode(['data' => $q]);
                        exit;
                    }
                }
            }
        }
    }
}

http_response_code(404);
echo json_encode(['error' => 'Question not found']);
?>
