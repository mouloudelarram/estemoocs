<?php

session_start();

if (!isset($_SESSION['user']))
header('location:./user/login.php');
if (isset($_GET['logout'])){
    unset($_SESSION['user']);
    header('location:./user/login.php');
    unset($_SESSION['user']['stack']);
}
if(isset($_SESSION['user']['stack'])) 
{
    $link = $_SESSION['user']['stack']['link'];
    $title = $_SESSION['user']['stack']['title'];
    
}else {
    //Ce lien est un video de bienvenu, il va être remplacé eventuellement
    $link="http://este.ovh/moocs/AI/Advanced%20Machine%20Learning%20Specialization/01-intro-to-deep-learning/01_introduction-to-optimization/01_specialization-promo/01_about-the-university.mp4";
    $title = "Soyez le bienvenue";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/e57e8e8c45.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="./src/style.css">
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
                <!-- <div class="stack"><h5>Save</h5></div> -->
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
                    <h3><?php echo $title?></h3>
                    <video src="<?php echo $link?>" autoplay controls muted></video>
                    <div class="history">
                        <h4>&larr; go back</h4>
                        <div class="like_dislike">
                            <i class="fas fa-thumbs-up"></i>
                            <i class="fas fa-thumbs-down"></i>            
                        </div>
                    </div>
                    
                </div>  
            </div>
        </div>
    </div>

    <script src="./tools/withOutStack.js"></script>   
    <script src="./tools/script.js"></script>
</body>
</html>