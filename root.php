<?php 
    if (isset($_GET['root']))
        $root = $_GET['root'];
    else
        $root = "http://este.ovh/moocs/";

    function getData($address){
        $data = array();
        $contents = file_get_contents(unparse_url($address));
        //create a DOM based off of the string from the html table
        $DOM = new DOMDocument;
        $DOM->loadHTML($contents);
        //get all link
        $tds = $DOM->getElementsByTagName('a');
        foreach($tds as $e){
            if (strcmp($e->nodeValue,"Name") && strcmp($e->nodeValue,"Last modified") && strcmp($e->nodeValue,"Size") && strcmp($e->nodeValue,"Description") && strcmp($e->nodeValue,"Parent Directory")  && !strpos($e->nodeValue,"&")){
                $data[$e->nodeValue] = $e->nodeValue;
            }                
        }
        return $data;
    }
        
    function unparse_url($parsed_url) {
        $scheme   = isset($parsed_url['scheme']) ? $parsed_url['scheme'] . '://' : '';
        $host     = isset($parsed_url['host']) ? $parsed_url['host'] : '';
        $port     = isset($parsed_url['port']) ? ':' . $parsed_url['port'] : '';
        $user     = isset($parsed_url['user']) ? $parsed_url['user'] : '';
        $pass     = isset($parsed_url['pass']) ? ':' . $parsed_url['pass']  : '';
        $pass     = ($user || $pass) ? "$pass@" : '';
        $path     = isset($parsed_url['path']) ? $parsed_url['path'] : '';
        $query    = isset($parsed_url['query']) ? '?' . $parsed_url['query'] : '';
        $fragment = isset($parsed_url['fragment']) ? '#' . $parsed_url['fragment'] : '';
        return "$scheme$user$pass$host$port$path$query$fragment";
    }
    $str =  str_replace(" ","%20",$root);
    echo json_encode(getData(parse_url($str)));
?>

