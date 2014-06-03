<?php
error_reporting(E_ALL & ~E_DEPRECATED);

require_once 'DbSimple/Generic.php';


function replace_unicode_escape_sequence($match) {
    return mb_convert_encoding(pack('H*', $match[1]), 'UTF-8', 'UCS-2BE');
}