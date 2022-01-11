<?php
    try{
        $connection = new PDO("mysql:host=localhost;dbname=estemoocs","root","");
    }catch(PDOException $e){
        $e->getMessage();
    }

    function insertClient($firstname, $lastname, $email, $password){
        try{
            $request =  $GLOBALS['connection']->prepare("INSERT INTO USERS (firstname, lastname, email, password) VALUES(:FN, :LN, :EM, :PS)");
            $request->execute(['FN'=>$firstname, 'LN'=>$lastname, 'EM'=>$email, 'PS'=> $password]);
            return true;
        }catch(PDOException $e){
            $e->getMessage();
            return false;
        }
    }
    function deleteVid($email,$vid)
    {
        try{
            $request =  $GLOBALS['connection']->prepare("DELETE FROM TABLEVIDEO WHERE email=:EM AND name=:NA ");
            $request->execute(['EM'=>$email, 'NA'=>$vid]);
        }catch(PDOException $e){
            $e->getMessage();
        }
    }
    function alterVid($email,$vid,$vote)
    {
        try{
            $request =  $GLOBALS['connection']->prepare("UPDATE TABLEVIDEO SET status=:ST WHERE email=:EM AND name=:NA");
            $request->execute(['ST'=>$vote,'EM'=>$email, 'NA'=>$vid]);
        }catch(PDOException $e){
            $e->getMessage();
        }
    }
    function selectClient($firstname = "", $lastname ="", $email=""){
        try{
            $request =  $GLOBALS['connection']->prepare("SELECT * FROM USERS WHERE firstname = :FN OR lastname = :LN OR email = :EM;");
            $request->execute(['FN'=>$firstname, 'LN'=>$lastname, 'EM'=>$email]);
            return $request->fetchAll();
        }catch(PDOException $e){
            $e->getMessage();
        }
    }
    function checkIfExist($email, $password){
        try{
            $request = $GLOBALS['connection']->prepare("SELECT * FROM USERS WHERE email = :EM AND password = :PS");
            $request->execute(['EM'=>$email, 'PS'=>$password]);
            return $request->fetchAll();
        }catch(PDOException $e){
            $e->getMessage();
        }
    }
    function addVideo($email, $name, $status){
        try{
            $request =  $GLOBALS['connection']->prepare("INSERT INTO TABLEVIDEO (email, name, status) VALUES(:EM, :NA, :ST)");
            $request->execute(['EM'=>$email, 'NA'=>$name, 'ST'=>$status]);
            return true;
        }catch(PDOException $e){
            $e->getMessage();
            return false;
        }
    }
    function selectVideos($email){
        try{
            $request =  $GLOBALS['connection']->prepare("SELECT * FROM TABLEVIDEO WHERE email = :EM AND status = 'like';");
            $request->execute(['EM'=>$email]);
            return $request->fetchAll();
        }catch(PDOException $e){
            $e->getMessage();
        }
    }
    
?>