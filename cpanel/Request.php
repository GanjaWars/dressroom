<?php
class Request {

    /**
     * @var string Хранит в себе контент текущей страницы
     */
    public $content = '';

    /**
     * @var string Путь до куки-файла
     */
//    private $cookie = './cookie.txt';

    /**
     * @__constructor
     */
    public function __constructor() {
        return false;
    }

    private function _sendRequest($method, $url, $params = array()) {
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//        curl_setopt($ch, CURLOPT_COOKIEJAR, $this->cookie);
//        curl_setopt($ch, CURLOPT_COOKIEFILE, $this->cookie);
        curl_setopt($ch, CURLOPT_REFERER, 'http://www.ganjawars.ru');
        if ($method == 'POST') {
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
        }
        $this->content = curl_exec($ch);
        $this->content = iconv('cp1251', 'utf-8', $this->content);
        curl_close($ch);

        return $this->content;
    }

    public function get($url, $timeout = false) {
        if ($timeout) {
            sleep($timeout);
        }

        return $this->_sendRequest('GET', $url);
    }

    public function post($url, $params, $timeout = false) {

        if ($timeout) {
            sleep($timeout);
        }

        return $this->_sendRequest('POST', $url, $params);
    }
}
