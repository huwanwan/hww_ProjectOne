<?php
/**
 * @Author: Marte
 * @Date:   2017-11-18 08:49:56
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-11-18 19:14:29
 */
    include 'comPHP.php';
    $gener = isset($_GET['gener']) ? $_GET['gener'] : "";
    $name = isset($_GET['name']) ? $_GET['name'] : "";
    $No = isset($_GET['No']) ? $_GET['No'] : "";
    $view = isset($_GET['view']) ? $_GET['view'] : "";
    $Price = isset($_GET['price']) ? $_GET['price'] : "";
    $asc = isset($_GET['asc']) ? $_GET['asc'] : "";
    $sql = "select * from goodslist where gener LIKE '%$gener%'";
    // 查找带有关键字genger的数据,
    if($view){
        $sql.=" order by view desc";
    }else if($Price){
        $sql.=" order by nPrice desc";
    }else if($asc){
        $sql.=" order by nPrice asc";
    }else if($name){
        $sql = "select * from goodslist where name LIKE '%$name%'";
    }
    $result = $cont->query($sql);
    $row = $result->fetch_all(MYSQLI_ASSOC);
    $result->free();
    // 截取数据;
    $res = array_slice($row,0,$No);
    // var_dump($res);
    echo json_encode($res,JSON_UNESCAPED_UNICODE);
    $cont->close();
?>
