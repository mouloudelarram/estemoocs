<?php
    session_start();
    if (isset($_SESSION['user']['videos'])){
        echo json_encode($_SESSION['user']['videos']);
    }
    else
        echo json_encode(null);    
?>