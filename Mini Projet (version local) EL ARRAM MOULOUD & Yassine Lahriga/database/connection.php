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
    function checkIfVideoExist($email, $name){
        try{
            $request = $GLOBALS['connection']->prepare("SELECT * FROM TABLEVIDEO WHERE email = :EM AND name = :NA");
            $request->execute(['EM'=>$email, 'NA'=>$name]);
            return $request->fetchAll();
        }catch(PDOException $e){
            $e->getMessage();
        }
    }
    function addVideo($email, $name, $status){
        try{
            if (empty(checkIfVideoExist($email,$name))){
                $request =  $GLOBALS['connection']->prepare("INSERT INTO TABLEVIDEO (email, name, status) VALUES(:EM, :NA, :ST)");
                $request->execute(['EM'=>$email, 'NA'=>$name, 'ST'=>$status]);
            }
            else{
                $req = $GLOBALS['connection']->prepare('UPDATE TABLEVIDEO SET  status= :ST WHERE email = :EM AND name = :NA');
                $req->execute(['EM'=>$email,'ST'=>$status, 'NA'=>$name]);
            }
            return true;
        }catch(PDOException $e){
            $e->getMessage();
            return false;
        }
    }
    function selectVideos($email){
        try{
            $request =  $GLOBALS['connection']->prepare("SELECT * FROM TABLEVIDEO WHERE email = :EM");
            $request->execute(['EM'=>$email]);
            return $request->fetchAll();
        }catch(PDOException $e){
            $e->getMessage();
        }
    }
    function selectLikesVideos(){
        try{
            $request =  $GLOBALS['connection']->prepare("SELECT DISTINCT name, COUNT(status) AS 'like' FROM tablevideo WHERE status = 'like' GROUP BY name");
            $request->execute();
            return $request->fetchAll();
        }catch(PDOException $e){
            $e->getMessage();
        }
    }
    function selectDisLikesVideos(){
        try{
            $request =  $GLOBALS['connection']->prepare("SELECT DISTINCT name, COUNT(status) AS 'dislike' FROM tablevideo WHERE status = 'dislike' GROUP BY name");
            $request->execute();
            return $request->fetchAll();
        }catch(PDOException $e){
            $e->getMessage();
        }
    }
    function selectVideo($name){
        try{
            $request =  $GLOBALS['connection']->prepare("SELECT DISTINCT T.name , L.likes, DL.dislikes FROM tablevideo T, 
                (SELECT COUNT(*) AS 'likes', name FROM tablevideo WHERE status = 'like' AND name= :NA) L,
                (SELECT COUNT(*) AS 'dislikes', name FROM tablevideo WHERE status = 'dislike' AND name =:NA) DL 
                WHERE T.name = :NA LIMIT 1");
            $request->execute(['NA'=>$name]);
            return $request->fetchAll();
        }catch(PDOException $e){
            $e->getMessage();
        }
    }
    function selectStatus($name, $email){
        try{
            $request =  $GLOBALS['connection']->prepare("SELECT status FROM tablevideo WHERE name =:NA AND email = :EM");
            $request->execute(['NA'=>$name, 'EM'=>$email]);
            return $request->fetchAll();
        }catch(PDOException $e){
            $e->getMessage();
        }
    }
?>