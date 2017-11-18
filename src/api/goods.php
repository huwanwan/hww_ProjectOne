<?php
/**
 * @Author: Marte
 * @Date:   2017-11-18 19:14:56
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-11-18 19:19:15
 */
    include 'comPHP.php';
    $id = isset($_GET['id']) ? $_GET['id'] : "";

    $sql = "select * from goodslist where id=$id";
    $result = $cont->query($sql);
    if($result->num_rows>0){
        $res = $result->fetch_all(MYSQLI_ASSOC);
        $result->free();
        echo json_encode($res,JSON_UNESCAPED_UNICODE);
    }
    $cont->close();
?>