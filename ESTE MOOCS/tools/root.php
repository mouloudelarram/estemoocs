<?php
$root = $_POST["nextLink"];
function getData($address){
    $data = array();
    $list = scandir($address);
    foreach($list as $item)
    {
        if (strcmp($item,".") <> 0 && strcmp($item,"..") <> 0 )
        {
            if (is_file($address."/".$item))
            {

                if(!strcasecmp((strtolower(substr($address."/".$item, -4))),'.mp4'))
                {
                    $data[$item] = $item;
                }
            }else
            {
                $data[$item] = getData($address."/".$item);       
            }      
            
        }

    }
    return $data;
}

 $root = getData($root);
 echo json_encode($root);
?>