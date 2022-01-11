<?php
    session_start();
    $_SESSION['user']['stack']['link'] = $_POST["lastVideoID"];
    $_SESSION['user']['stack']['title'] = $_POST["lastTitleVid"];
    echo $_POST["lastVideoID"];    
?> 