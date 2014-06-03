<?php
require_once 'config.php';
include 'items.class.php';
include 'Request.php';

$userId = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($userId > 0) {
    $items = new Items();
    $items->getUserById($userId);
}
