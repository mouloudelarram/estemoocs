<?php
    session_start();
    if (isset($_SESSION['user']['stack'])){
        echo json_encode($_SESSION['user']['stack']);
    }
    else
        echo json_encode(null);    
?>