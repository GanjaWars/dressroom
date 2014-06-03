<?php
if (!isset($_SERVER['PHP_AUTH_USER'])) {
    header('WWW-Authenticate: Basic realm="Hello, stranger!"');
    header('HTTP/1.0 401 Unauthorized');
    echo ':-)';
    exit;
} else if ($_SERVER['PHP_AUTH_USER'] != 'ADMIN' || $_SERVER['PHP_AUTH_PW'] != 'PASSWORD') {
    echo 'nu-nu...';
    exit;
}
