<?php
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing ID']);
    exit;
}

$id = intval($input['id']);
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
                        // Merge/Update fields
                        // We update only what is sent, or replace all editable fields?
                        // Let's replace the main ones provided in input.
                        
                        if (isset($input['question'])) $q['question'] = $input['question'];
                        if (isset($input['category'])) $q['category'] = $input['category'];
                        if (isset($input['sub_category'])) $q['sub_category'] = $input['sub_category'];
                        if (isset($input['answer'])) $q['answer'] = $input['answer'];
                        if (isset($input['options']) && is_array($input['options'])) $q['options'] = $input['options'];
                        
                        // Optional: update correct_answer_text if provided, else sync it
                        if (isset($input['correct_answer_text'])) {
                            $q['correct_answer_text'] = $input['correct_answer_text'];
                        } else if (isset($q['options'][$q['answer']])) {
                             // Auto-sync if not provided but answer/options changed
                             $q['correct_answer_text'] = $q['options'][$q['answer']];
                        }

                        $modified = true;
                        $found = true;
                        break; 
                    }
                }
                unset($q); 
                
                if ($modified) {
                    if (file_put_contents($path, json_encode($json, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
                         echo json_encode(['success' => true]);
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
