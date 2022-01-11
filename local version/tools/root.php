<?php
$root = "../M-learn/";
function getData($address){
    $data = array();
    $list = scandir($address);
    foreach($list as $item)
    {
        if (strcmp($item,".") <> 0 && strcmp($item,"..") <> 0 && !strpos($item,"&")){
            if (is_dir($address.$item))
                $data[$item] = getData($address.$item."/");
            else{
                $file = substr($item, -4);
                if(!strcasecmp((strtolower($file)),'.mp4')){
                    $data[$item] = $item;
                }
            }      
        }
    }
    return $data;
}
echo json_encode(getData($root));
?>