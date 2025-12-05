<?php 
$con = 123;
$hash = password_hash($con, PASSWORD_BCRYPT);
echo $hash;

?>