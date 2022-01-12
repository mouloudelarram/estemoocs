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
            <input name="email" type="email"  value="<?php if (isset($_GET['email'])) echo $_GET['email'];?>" placeholder="Email Adresse" required/>
            <input name="password" type="password"  placeholder="Password" required/>
            <h6 class="ForgotPassword">Forgot your password?</h6>
            <h6>with an account you can like, save and Check courses.</h6>
            <button type="submit" name="submit">Sign In</button>
            <div class="Anonymous">
                <h5>You will not be able to save, like or dislike videos!</h5>
                <a href="./login.php?Anonymous=Anonymous">
                    <h5>
                    Just Take a look &rarr; 
                    </h5>
                </a>
            </div>
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
                if (isset($_GET['Anonymous'])){
                    session_start();                         
                        $_SESSION['user'] = array(
                            "firstname" => "Anonymous",
                            "lastname"  => "Anonymous",
                            "email"     => "Anonymous"
                        );
                        header('location:../');
                }
            ?>
        </div>
    </form>
    
    <script src="login.js"></script>
</body>
</html>
