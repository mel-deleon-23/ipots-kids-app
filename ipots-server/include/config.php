<?php
// Check if a session is already started
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
// session_start();

header( 'Content-type: text/html; charset=utf-8' );