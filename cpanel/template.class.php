<?php
class Template {
    public $dir = 'templates/';
    public function __construct() {
    	$this->dir = 'templates/';
    }
    public function display($file) {
        $template = $this;
        $filename = $this->dir . $file;
        if (file_exists($filename)) {
            include $filename;
        } else {
            die("Template error: Can't find \"{$filename}\"");
        }
    }
}
?>