<?php
    session_start();
    if (isset($_POST['video']) && $_SESSION['user']['email']){
        include '../database/connection.php';
        echo json_encode(selectStatus($_POST['video'], $_SESSION['user']['email']));
    }

    
?>