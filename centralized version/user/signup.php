<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./system.css">
    <title>Sign Up</title>
</head>
<body>
    <header>
        <img src="https://www.uca.ma/public/website/theme-2/img/logo.png" alt="ESTE" class="">
        <h3>ESTE MOOCS</h3>
    </header>
    <form action="./signup.php" method="get">
        <div class="option">
            <a href="./login.php"  class="login">Log In</a>
            <a class="">Sign Up</a></div>
        <div class="main">
                <h1>Create your account</h1>
                <h3 class="detail">the best platform to acquire new skills.</h3>
                <input name="firstname" type="text" value="<?php if (isset($_GET['firstname'])) echo $_GET['firstname'];?>"  placeholder="First Name" require/>
                <input name="lastname" type="text" value="<?php if (isset($_GET['lastname'])) echo $_GET['lastname'];?>"  placeholder="Last Name" require/>
                <input name="email" type="email" value="<?php if (isset($_GET['email'])) echo $_GET['email'];?>"  placeholder="Email Adresse" require/>
                <input name="password" type="password" placeholder="Password" require/>
                <h6>with an account you can like, save and Check courses.</h6>
                <button type="submit" name="submit">Sign Up</button>
                <?php
                    if (isset($_GET['email']) && isset($_GET['password']) && isset($_GET['firstname']) && isset($_GET['lastname'])){
                        include '../database/connection.php';            
                        if (insertClient($_GET['firstname'], $_GET['lastname'], $_GET['email'], $_GET['password'])){
                            session_start();
                            $_SESSION['user'] = array(
                                "firstname" => $_GET['firstname'],
                                "lastname"  => $_GET['lastname'],
                                "email"     => $_GET['email']
                            );
                            header('location:../');
                        }
                        else{
                            echo "<h3 class=\"error\">Please verify your information and try again, Maybe the email already exists !<h3>";
                        }
                    }
                ?>
        </div>
    </form>
</body>
</html>
