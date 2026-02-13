<?php
header('Content-Type: application/json');

// Helper to normalize category
function normalizeCategory($cat) {
    if (!$cat) return 'Uncategorized';
    $cat = strtoupper(trim($cat));
    if (strpos($cat, 'MATH') !== false) return 'MATH';
    if (strpos($cat, 'ENGINEERING') !== false && strpos($cat, 'SCIENCE') !== false) return 'ENGINEERING SCIENCES';
    if (strpos($cat, 'PROFESSIONAL') !== false) return 'PROFESSIONAL ELECTRICAL ENGINEERING';
    return $cat;
}

// Stats containers
$stats = [
    'MATH' => [],
    'ENGINEERING SCIENCES' => [],
    'PROFESSIONAL ELECTRICAL ENGINEERING' => []
];

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
                    if (isset($q['category']) && isset($q['sub_category'])) {
                        $normCat = normalizeCategory($q['category']);
                        $subCat = trim($q['sub_category']);
                        
                        if (!isset($stats[$normCat])) {
                           // If new category appears (shouldn't if strictly typed, but safe fallback)
                           $stats[$normCat] = [];
                        }
                        
                        if (!isset($stats[$normCat][$subCat])) {
                            $stats[$normCat][$subCat] = 0;
                        }
                        $stats[$normCat][$subCat]++;
                    }
                }
            }
        }
    }
}

echo json_encode(['data' => $stats]);
?>
