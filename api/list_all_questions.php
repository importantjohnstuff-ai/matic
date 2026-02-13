<?php
header('Content-Type: application/json');

ini_set('memory_limit', '256M');
ini_set('max_execution_time', 120);

// Helper to normalize category
// Helper to normalize category - SIMPLIFIED
function normalizeCategory($cat) {
    if (empty($cat)) return 'Uncategorized';
    
    $trimmed = trim($cat);
    $upperCat = strtoupper($trimmed);
    
    // Strict matching for known types to standardizing them
    if (strpos($upperCat, 'MATH') !== false) return 'MATH';
    if (strpos($upperCat, 'ENGINEERING') !== false && strpos($upperCat, 'SCIENCE') !== false) return 'ENGINEERING SCIENCES';
    if (strpos($upperCat, 'PROFESSIONAL') !== false) return 'PROFESSIONAL ELECTRICAL ENGINEERING';
    
    // Fallback: Return the raw trimmed category instead of 'Uncategorized' default
    // This ensures we catch categories that might be slightly different or valid but unknown
    return $trimmed; 
}

// Helper to sanitize UTF-8
function safe_utf8_encode($string) {
    return mb_convert_encoding($string, 'UTF-8', 'UTF-8');
}

$dir = '../questionbank';
$allQuestions = [];

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
                    if (isset($q['id']) && (isset($q['category']) || isset($q['Category']))) {
                        // Normalize keys
                        $rawCat = $q['category'] ?? $q['Category'] ?? '';
                        $subCat = $q['sub_category'] ?? $q['Sub Category'] ?? 'General';
                        $qText = $q['question'] ?? $q['Question'] ?? '';
                        $ans = $q['answer'] ?? $q['Answer'] ?? '';
                        $opts = $q['options'] ?? $q['Options'] ?? [];

                        $normCat = normalizeCategory($rawCat);
                        
                        $allQuestions[] = [
                            'id' => $q['id'],
                            'category' => $normCat,
                            'sub_category' => safe_utf8_encode($subCat),
                            'question_text' => safe_utf8_encode($qText), // No truncation
                            'options' => $opts,
                            'answer' => $ans
                        ];
                    }
                }
            }
        }
    }
}

// Optional: Sort by ID
usort($allQuestions, function($a, $b) {
    return $a['id'] - $b['id'];
});

$output = json_encode(['data' => $allQuestions], JSON_INVALID_UTF8_SUBSTITUTE);

if ($output === false) {
    http_response_code(500);
    echo json_encode(['error' => 'JSON encoding failed: ' . json_last_error_msg()]);
} else {
    echo $output;
}
?>
