<?php
    session_start();
    include '../database/connection.php';
    if (!empty(selectLikesVideos())){
        echo json_encode(selectLikesVideos());
    }
    else
        echo json_encode(null); 
    
    /* ajax */
    if (isset($_POST['video']) && isset($_POST['like'])){
        addVideo($_SESSION['user']['email'], $_POST['video'], $_POST['like']);
    }
?>