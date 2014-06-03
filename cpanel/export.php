<?php
header('Content-type', 'text/json');
require_once 'config.php';
include 'items.class.php';
include 'protector.php';

$items = new Items();
echo $items->export();