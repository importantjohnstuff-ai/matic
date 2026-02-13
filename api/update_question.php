<?php
header('Content-Type: application/json');

// Helper to normalize category
// Helper to normalize category
function normalizeCategory($cat) {
    if (empty($cat)) return '';
    
    $trimmed = trim($cat);
    $upperCat = strtoupper($trimmed);

    if (strpos($upperCat, 'MATH') !== false) return 'MATH';
    if (strpos($upperCat, 'ENGINEERING') !== false && strpos($upperCat, 'SCIENCE') !== false) return 'ENGINEERING SCIENCES';
    if (strpos($upperCat, 'PROFESSIONAL') !== false) return 'PROFESSIONAL ELECTRICAL ENGINEERING';
    
    // Fallback: return trimmed original if no match
    return $trimmed;
}

// 1. Get Input Data
$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['id']) || !isset($input['field']) || !isset($input['value'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing id, field, or value']);
    exit;
}

$id = intval($input['id']);
$field = $input['field'];
$newValue = trim($input['value']);

// Validate field
if (!in_array($field, ['category', 'sub_category'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid field']);
    exit;
}

// If updating category, normalize if it matches known types
if ($field === 'category') {
    $norm = normalizeCategory($newValue);
    if ($norm) $newValue = $norm; // Use normalized if found, else custom
}

$dir = '../questionbank';
$found = false;

if (is_dir($dir)) {
    $files = scandir($dir);
    
    foreach ($files as $file) {
        if ($file === '.' || $file === '..') continue;
        
        $path = $dir . '/' . $file;
        if (is_file($path) && pathinfo($path, PATHINFO_EXTENSION) === 'json') {
            $content = file_get_contents($path);
            $json = json_decode($content, true);
            $modified = false;
            
            if (is_array($json)) {
                foreach ($json as &$q) {
                    if (isset($q['id']) && intval($q['id']) === $id) {
                        $q[$field] = $newValue;
                        $modified = true;
                        $found = true;
                        break; 
                    }
                }
                unset($q); // Break reference
                
                if ($modified) {
                    // Write back to file
                    if (file_put_contents($path, json_encode($json, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
                         echo json_encode(['success' => true, 'id' => $id, 'new_value' => $newValue]);
                    } else {
                         http_response_code(500);
                         echo json_encode(['error' => 'Failed to write to file']);
                    }
                    exit;
                }
            }
        }
    }
}

if (!$found) {
    http_response_code(404);
    echo json_encode(['error' => 'Question ID not found']);
}
?>
