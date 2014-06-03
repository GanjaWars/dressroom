<?php
require_once 'cpanel/config.php';
include 'cpanel/items.class.php';
header('Content-type', 'text/json');

$data = isset($_POST['data']) ? $_POST['data'] : '';
try {
    $items = new Items();
    $link = $items->saveData($data);
    echo json_encode(array('status' => 'success', 'link' => $link));
} catch (Exception $e) {
    echo json_encode(array('status' => 'error'));
}
