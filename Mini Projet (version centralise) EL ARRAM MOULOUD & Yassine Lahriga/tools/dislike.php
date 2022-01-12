<?php
    session_start();
    include '../database/connection.php';
    if (!empty(selectDisLikesVideos())){
        echo json_encode(selectDisLikesVideos());
    }
    else
        echo json_encode(null);    
     /* ajax */
    if (isset($_POST['video']) && isset($_POST['dislike'])){
        addVideo($_SESSION['user']['email'], $_POST['video'], $_POST['dislike']);
    }
?>