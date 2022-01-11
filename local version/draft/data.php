<?php

    
    
    function getData(){
        $tableDatas = array();
        $dataFile = fopen("http://este.ovh/moocs/","r");
        while(!feof($dataFile)){
            $lienData = fgets($dataFile);
            $File = fopen("./data.txt","a");
            fwrite($File, $lienData );
            $tableData = explode("<tr><td valign=\"top\"><img src=\"/icons/folder.gif\" alt=\"[DIR]\"></td><td><a href=\"", $lienData);
            array_push($tableDatas, $tableData);
        }
        fclose($dataFile);
        return $tableDatas;
    }
    print_r(getData());
?>