<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./system.css">
    <title>Log In</title>
</head>
<body>
    <header>
        <img src="https://www.uca.ma/public/website/theme-2/img/logo.png" alt="ESTE" class="">
        <h3>ESTE MOOCS</h3>
    </header>
    <form action="./login.php" method="get">
        <div class="option">
            <a href="" class="">Log In</a>
            <a href="./signup.php" class="signup">Sign Up</a>
        </div>
        <div class="main">
            <h1>Sign in to your account</h1>
            <h3 class="detail">the best platform to acquire new skills.</h3>
            <input name="email" type="email" value="<?php if (isset($_GET['email'])) echo $_GET['email'];?>" placeholder="Email Adresse" require/>
            <input name="password" type="password" placeholder="Password" require/>
            <h6>with an account you can like, save and Check courses.</h6>
            <button type="submit" name="submit">Sign In</button>
            <?php
                if (isset($_GET['email']) && isset($_GET['password'])){
                    
                    include '../database/connection.php';
                    
                    $table = checkIfExist($_GET['email'], $_GET['password']);
                    if (!empty($table)){
                        session_start();                         
                        $_SESSION['user'] = array(
                            "firstname" => $table[0]['firstname'],
                            "lastname"  => $table[0]['lastname'],
                            "email"     => $table[0]['email']
                        );
                        header('location:../');
                    }
                    else{
                        echo "<h3 class=\"error\">Please verify your information and try again !<h3>";
                    }
                }
            ?>
        </div>
    </form>
</body>
</html>
