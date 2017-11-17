<?php
/**
 * @Author: Marte
 * @Date:   2017-11-17 18:51:46
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-11-17 19:29:54
 */
    include './comPHP.php';
    $username = isset($_GET['username']) ? $_GET['username'] : "";
    $password = isset($_GET['password']) ? $_GET['password'] : "";
    $password = md5($password);
    if($username != "" && $password != ""){
        // 在数据库中的所有的数据中去匹配密码和名字;
        $sql = "select * from user where password='$password' and username='$username'";
        // 执行语句;
        $result = $cont->query($sql);
        // 如果有匹配到的数据,则返回right;
        if($result->num_rows>0){
            echo 'right';
        }else{
            echo 'fail';
        }
        $result->free();
        $cont->close();
    }else{
        echo "no data";
    }
?>