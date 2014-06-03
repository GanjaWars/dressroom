<?php
require_once 'config.php';
include 'template.class.php';
include 'items.class.php';
include 'Request.php';
include 'protector.php';

$items = new Items();
$template = new Template();
$template->lastItems = $items->getLastItems();
$template->display('index.html');

