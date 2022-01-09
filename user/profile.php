<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./profile.css">
    <title>My videos</title>
</head>
<body>
    <header>
            <img src="https://www.uca.ma/public/website/theme-2/img/logo.png" alt="ESTE" class="">
            <h3>ESTE MOOCS</h3>
            <div class="userData">
                <h5><?php echo $_SESSION['user']['firstname'].".".$_SESSION['user']['lastname']?></h5>
                <h5><?php echo $_SESSION['user']['email']?></h5>
                <a href="../index.php?logout=true"><h5>Log Out</h5></a>
            <div>
    </header>
    <div class="videos">
        <?php
            include '../database/connection.php';
            $tabelVideos =  selectVideos($_SESSION['user']['email']);
            foreach($tabelVideos as $item ){
                $title = str_replace("http://este.ovh/moocs/","",$item['name']);
                $title = str_replace(".mp4","",$title);
                $title = str_replace("//"," &rarr; ",$title);
                echo "
                <div class=\"item\">
                    <div class=\"video\">
                        <video src=\"".$item['name']."\" autoplay controls muted></video>
                    </div>
                    <div class=\"title\">
                        ".$title.".
                    </div>
                </div>
                ";
            }
        ?>
    </div>
    <script src="./login.js"></script>
</body>
</html>