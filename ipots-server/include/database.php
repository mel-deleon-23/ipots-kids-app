<?php

$connect = mysqli_connect( 
    "localhost", // Host
    "root", // Username
    "root", // Password
    "ipots-db" // Database
);

mysqli_set_charset( $connect, 'UTF8' );