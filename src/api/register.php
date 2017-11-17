<?php
/**
 * @Author: Marte
 * @Date:   2017-11-17 15:14:14
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-11-17 19:23:17
 */
    // 引入其它的php文件;
    include "comPHP.php";
    // 获取前端传来的数据参数;
    $phoneNum = isset($_GET['phone']) ? $_GET['phone'] : "";
    $password = isset($_GET['password']) ? $_GET['password'] : "";
    $username = isset($_GET['phone']) ? $_GET['phone'] : ""; 
    $email = isset($_GET['email']) ? $_GET['email'] : ""; 
    if($email != ""){
            // update 表名 set 字段名 = 要更改的信息，字段名2 = 要更改的信息
// where (如果指定记录，即配合 where 子句)搜索where是直接判断查找数据库中的num是不是等于参数num;
            $sql = "update user set email='$email' where phoneNum='$phoneNum'";
            $result = $cont->query($sql);
            if($result){
                echo "ok";
            }else{
                echo "Error: " .$sql ."<br>" .$cont->error; 
            };
    }else if($password != ""){
        // 加密;
        $password = md5($password);
        // 编写sql语句,将手机号码和密码写入数据库;
        $sql = "insert into user(username,password,phoneNum,email)values('$username','$password','$phoneNum','$email')";
        // 执行语句;
        $result = $cont->query($sql);
        // 判断是否写入成功;
        if($result){
            echo "ok";
        }else{
            // 输出失败;
            echo "Error: " .$sql ."<br>" .$cont->error; 
        }
        $cont->close();
    }else{
        // 编写sql语句;查询user表里的phoneNum是否有phone,返回布尔值;
        $sql = "select phoneNum from user where phoneNum='$phoneNum'";
        // 执行语句;
        $result = $cont->query($sql);

        // num_rows查询数据集里的数目;
        if($result->num_rows>0){
            // 如果数据库中有该数据,则返回has,并释放内存;
            $result->free();
            echo "has";
        }else{ 
           echo "hasn't" ;
        }

        $cont->close();
    }

?>