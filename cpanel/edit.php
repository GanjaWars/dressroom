<?php
require_once 'config.php';
include 'template.class.php';
include 'items.class.php';
include 'protector.php';

$template = new Template();
$items = new Items();
$template->itemsMap = $items->getMap();
if (!empty($_POST)) {
    $status = $items->save($_POST);
    header('Location: add.php?status=success');
} else if (isset($_GET['id'])) {
    $item = $items->getById($_GET['id']);
    if (empty($item)) {
        header('Location: add.php');
    }
    $template->item = $item;
}
$template->status = isset($_GET['status']) ? $_GET['status'] : '';
$template->display('add.html');