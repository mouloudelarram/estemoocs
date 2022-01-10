<?php
session_start();
try{
    $connection = new PDO("mysql:host=localhost;dbname=estemoocs","root","");
    $request =  $GLOBALS['connection']->prepare("SELECT status FROM TABLEVIDEO WHERE email = :EM AND name = :NA ;");
}catch(PDOException $e){
    $e->getMessage();
}
function checkIfVidLiked($email,$name)
{
    try{
        $GLOBALS['request']->execute(['EM'=>$email,'NA'=>$name]);
        $res = $GLOBALS['request']->fetchAll();
        if(count($res)>0) 
        {   
            return $res[0]["status"];
        }
        else return "nope";
    }catch(PDOException $e)
    {
        $e->getMessage();
    }
}
include './database/connection.php';

    
if (isset($_POST['vote'])){
    if(checkIfVidLiked($_SESSION['user']['email'],$_POST["video"])==="nope")
    {
        addVideo($_SESSION['user']['email'], $_POST["video"], $_POST['vote']);
        unset($_POST['vote']);
        unset($_POST["video"]);
    }else if(checkIfVidLiked($_SESSION['user']['email'],$_POST["video"])===$_POST['vote'])
    {
        deleteVid($_SESSION['user']['email'],$_POST["video"]);
        unset($_POST['vote']);
        unset($_POST["video"]);
    }else{
        if($_POST['vote']==="like")
        {
            alterVid($_SESSION['user']['email'],$_POST["video"],"like");
            unset($_POST['vote']);
            unset($_POST["video"]);
        }else{
            alterVid($_SESSION['user']['email'],$_POST["video"],"dislike");
            unset($_POST['vote']);
            unset($_POST["video"]);
        }
    }

}


if(isset($_POST["video"]))
{
    echo checkIfVidLiked($_SESSION['user']['email'],$_POST["video"]);
    unset($_POST["video"]);
}
?>