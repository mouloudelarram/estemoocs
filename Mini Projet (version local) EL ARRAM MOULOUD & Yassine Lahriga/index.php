

<!-- link project =>  http://elarram.rf.gd/este/  -->


<?php
    /*mail("maoiloud2002@gmail.com","php test","hi five form me ");*/
    session_start();
    if (!isset($_SESSION['user']['email']))
        header('location:./user/login.php');
    if (isset($_GET['logout'])){
        unset($_SESSION['user']);
        header('location:./user/login.php');
    }
    if (isset($_POST['stack'])){
        if ($_POST['stack'] > 0){
            $_SESSION['user']['stack'] = array();
            array_push($_SESSION['user']['stack'],$_POST['video']);
            for ($i=0; $i<$_POST['stack'];$i++){
                array_push($_SESSION['user']['stack'],$_POST['link'.$i]);
            }
        }
    } 
    if ($_SESSION['user']['email'] != "Anonymous"){
        include './database/connection.php';
        if (isset($_GET['dislike']) && $_GET['dislike'] > 0){
            for ($i=0; $i<$_GET['dislike'];$i++){
                addVideo($_SESSION['user']['email'], $_GET['dislike'.$i], "dislike");
            }
        }
        if (isset($_GET['like']) && $_GET['like'] > 0){
            for ($i=0; $i<$_GET['like'];$i++){
                addVideo($_SESSION['user']['email'], $_GET['like'.$i], "like");
            }
        }
        $_SESSION['user']['videos'] =  selectVideos($_SESSION['user']['email']);
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/e57e8e8c45.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="./tools/style.css">
    <title>Moocs</title>
</head>
<body>
    <div class="App">
        <header>
            <img src="https://www.uca.ma/public/website/theme-2/img/logo.png" alt="ESTE" class="">
            <!-- <h3>ESTE MOOCS</h3> -->
            <div class="userData">
                <a href="./user/profile.php" class = "username"><h5><?php echo $_SESSION['user']['firstname'].".".$_SESSION['user']['lastname']?></h5></a>
                <a href="./index.php?logout=true" class = "logout"><h5>Log Out</h5></a>
            <div>
        </header>
        <div class="main">
            <div class="list"> 
                <h3>ESTE MOOCS</h3>
                <div>
                    <div class="loading loading--full-height"></div>
                </div>
            </div>
            <div class="video">
                <div>
                    <h3>Welcome.</h3>
                    <video src="./M-learn/UDACITY-LEARN/full-Stack  Development Track/PYTHON-VIDEO/Python-3/1 - Python_ Welcome to strings & lists.mp4" autoplay controls muted></video>
                    <div class="history">
                        <h4>&larr; go back</h4>
                        <div class="like_dislike">
                            <i class="fas fa-thumbs-up"></i><h6>0</h6>
                            <i class="fas fa-thumbs-down"></i><h6>0</h6>        
                        </div>
                    </div>
                    
                </div>  
            </div>
        </div>
    </div>
    <script src="./tools/videos.js"></script>
    <script src="./tools/script.js"></script>
    <?php 
        if (!empty($_SESSION['user']['stack']))
            echo "<script src=\"./tools/stack.js\"></script>";
        else
            echo "<script src=\"./tools/withOutStack.js\"></script>";
    ?>    
</body>
</html>