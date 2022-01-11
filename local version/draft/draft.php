<?php
///root.php
$root = "./mooc/";
function getData($address){
    $data = array();
    $list = scandir($address);
    
    foreach($list as $item)
    {
        if (strcmp($item,".") <> 0 && strcmp($item,"..") <> 0 ){
            /* foreach ($list as $r){
                ?>
                <pre>
                <?php print_r($r);?>
                </pre>
                <?php }; */
            
            if (is_dir($address.$item))
            $data[$item] = getData($address.$item."/");
        
        else
            $data[$item] = $item;
        
        }
    }
    return $data;
}

$datas =  getData($root);
/*
print_r($datas); */

echo json_encode($datas);




/* 
foreach ($datas as $r){
    ?>
    <pre>
    <?php print_r($r);?>
    </pre>
    <?php } */?>

<!-- index.php-->
<table>
    <th>
    <td>Cours</td>
    <td>Lien</td>
    </th>
    <?php
    $cours = "C:\Users\mouloud\Videos\M-learn";
        if(isset($_GET["cours"]))
        {
            $cours="C:\Users\mouloud\Videos\M-learn/".$_GET["cours"];
        }
        if(is_dir($cours ))
            $list =scandir($cours);
        else
            $list =scandir("C:\Users\mouloud\Videos\M-learn");
   
    foreach($list as $e)
    {
        echo '
        <tr>
        <td>'.$e.'</td>
        <td>
        <a href="index.php?cours='.$e.'">line</a>
        </td>
        </tr>
        ';
    }
    ?>
    </table>
<?php?>