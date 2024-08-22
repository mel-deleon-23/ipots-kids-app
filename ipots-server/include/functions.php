<?php

// Ensure functions are only defined once
if (!function_exists('curl_get_contents')) {
    function curl_get_contents($url) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        $data = curl_exec($ch);
        curl_close($ch);
        return $data;
    }
}

if (!function_exists('pre')) {
    function pre($data) {
        echo '<pre>';
        print_r($data);
        echo '</pre>';
    }
}

if (!function_exists('secure')) {
    function secure() {
        if (!isset($_SESSION['id'])) {
            header('Location: /');
            die();
        }
    }
}

if (!function_exists('set_message')) {
    function set_message($message) {
        $_SESSION['message'] = $message;
    }
}

if (!function_exists('get_message')) {
    function get_message() {
        if (isset($_SESSION['message'])) {
            echo '<p style="padding: 0 1%;" class="error">
                <i class="fas fa-exclamation-circle"></i> 
                '.$_SESSION['message'].'
              </p>
              <hr>';
            unset($_SESSION['message']);
        }
    }
}