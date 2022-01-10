<?php
    include '../database/connection.php';
    if (!empty(selectDisLikesVideos())){
        echo json_encode(selectDisLikesVideos());
    }
    else
        echo json_encode(null);    
?>