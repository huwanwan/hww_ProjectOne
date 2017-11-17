<?php
/**
 * @Author: Marte
 * @Date:   2017-11-17 16:02:12
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-11-17 16:24:47
 */
    $servername = 'localhost';
    $username = 'root';
    $password = '';
    $database = 'xindan';
    //建立与数据库的连接; 
    $cont = new mysqli($servername,$username,$password,$database);
    // 检测是否连接成功;
    if($cont->connect_errno){
        die("连接失败".$connect_errno);
    }
    // 转成utf-8码;
    $cont->set_charset("utf8");
?>