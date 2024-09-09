<?php

$connect  = mysqli_connect('localhost','root','root','iPOTS');
if(!$connect){
die("Connection Failed".mysqli_connect_error());
}

mysqli_set_charset( $connect, 'UTF8' );
?>