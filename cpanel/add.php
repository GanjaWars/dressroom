<?php
require_once 'config.php';
include 'template.class.php';
include 'items.class.php';
include 'protector.php';

$template = new Template();
$items = new Items();
$template->itemsMap = $items->getMap();
if (!empty($_POST)) {
    $status = $items->add($_POST);
    header('Location: add.php?status=success');
}
$template->status = isset($_GET['status']) ? $_GET['status'] : '';
$template->display('add.html');