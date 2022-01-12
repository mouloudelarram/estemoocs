<?php
    if (isset($_POST['video'])){
        include '../database/connection.php';
        echo json_encode(selectVideo($_POST['video']));
    }
?>