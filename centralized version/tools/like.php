<?php
    include '../database/connection.php';
    if (!empty(selectLikesVideos())){
        echo json_encode(selectLikesVideos());
    }
    else
        echo json_encode(null);    
?>