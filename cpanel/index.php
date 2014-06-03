<?php
require_once 'config.php';
include 'template.class.php';
include 'db_mysql.class.php';
include 'items.class.php';
include 'Request.php';
include 'protector.php';

$items = new Items();
$template = new Template();
$template->lastItems = $items->getLastItems();
$template->display('index.html');

