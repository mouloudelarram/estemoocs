<?php
    session_start();
    if (!isset($_SESSION['user']))
        header('location:./user/login.php');
    if (isset($_GET['logout'])){
        unset($_SESSION['user']);
        header('location:./user/login.php');
    }
    $_SESSION['user']['stack'] = array();
    if (isset($_GET['stack'])){
        if ($_GET['stack'] > 0){
            array_push($_SESSION['user']['stack'],$_GET['video']);
            for ($i=0; $i<$_GET['stack']+1;$i++){
                array_push($_SESSION['user']['stack'],$_GET['link'.$i]);
            }
        }
    } 
    include './database/connection.php';
    // if (isset($_GET['dislike']) && $_GET['dislike'] > 0){
    //     for ($i=0; $i<$_GET['dislike'];$i++){
    //         addVideo($_SESSION['user']['email'], $_GET['dislike'.$i], "dislike");
    //     }
    // }
    // if (isset($_GET['like']) && $_GET['like'] > 0){
    //     for ($i=0; $i<$_GET['like'];$i++){
    //         addVideo($_SESSION['user']['email'], $_GET['like'.$i], "like");
    //     }
    // }

    // if(isset($_GET['video']) && isset($_SESSION['user']['email']))
    // {
    //     if(checkIfVidLikes($_SESSION['user']['email'],$_GET['video'])==true) echo 'yep';
    // }
    // else echo 'nope';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/e57e8e8c45.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="style.css">
    <title>Moocs</title>
</head>
<body>
    <div class="App">
        <header>
            <img src="https://www.uca.ma/public/website/theme-2/img/logo.png" alt="ESTE" class="">
            <h3>ESTE MOOCS</h3>
            <div class="userData">
                <a href="./user/profile.php" class = "username"><h5><?php echo $_SESSION['user']['firstname'].".".$_SESSION['user']['lastname']?></h5></a>
                <a href="./index.php?logout=true" class = "logout"><h5>Log Out</h5></a>
                <div class="stack"><h5>Save</h5></div>
            <div>
        </header>
        <div class="main">
            <div class="list"> 
                <h3>Cours disponibles</h3>
                <div>
                    <div class="loading loading--full-height"></div>
                </div>
            </div>
            <div class="video">
                <div>
                    <h3>SOYEZ LE BIENVENU.</h3>
                    <video src="http://este.ovh/moocs/AI/Advanced%20Machine%20Learning%20Specialization/01-intro-to-deep-learning/01_introduction-to-optimization/01_specialization-promo/01_about-the-university.mp4" autoplay controls muted></video>
                    <div class="history">
                        <h4>&larr; go back</h4>
                        <div class="like_dislike">
                            <i class="fas fa-thumbs-up">1</i>
                            <i class="fas fa-thumbs-down">2</i>            
                        </div>
                    </div>
                    
                </div>  
            </div>
        </div>
    </div>
    <?php 
        if (!empty($_SESSION['user']['stack']))
            echo "<script src=\"stack.js\"></script>";
        else
            echo "<script src=\"./withOutStack.js\"></script>";
    ?>
    <script src="./script.js"></script>
</body>
</html>