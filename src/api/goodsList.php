<?php
/**
 * @Author: Marte
 * @Date:   2017-11-18 14:05:02
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-11-18 22:08:59
 */
  include 'comPHP.php';
  $word = isset($_GET['word']) ? $_GET['word'] : "";
  $page = isset($_GET['page']) ? $_GET['page'] : 1;
  $qty = isset($_GET['qty']) ? $_GET['qty'] : 16;
  $max = isset($_GET['max']) ? $_GET['max'] : "";
  $min = isset($_GET['min']) ? $_GET['min'] : "";
  $ty = isset($_GET['ty']) ? $_GET['ty'] : "";
  $price = isset($_GET['price']) ? $_GET['price'] : "";
  $type = isset($_GET['type']) ? $_GET['type'] : ""; 
  $name = isset($_GET['name']) ? $_GET['name'] : ""; 
  // $asc = isset($_GET['asc']) ? $_GET['asc'] : "";
  $sql = "select * from goodslist where details Like '%$word%'";
  if($max && $min){
    $sql.="and nPrice between $min and $max";
  }else if($ty === 'desc'){
    $sql.="order by view desc";
  }else if($ty === 'asc'){
    $sql.="order by view asc";
  }else if($type == 'asc'){
    $sql="select * from goodslist where details Like '%$word%' order by nPrice asc";
  }else if($type == 'desc'){
    $sql="select * from goodslist where details Like '%$word%'order by nPrice desc";
  }else if($name){
    $sql.="and name='$name'";
  }
  $result = $cont->query($sql);
  if($result->num_rows == 0){
    $sql = "select * from goodslist where gener Like '%$word%'";
    $result = $cont->query($sql);
  }
  $res = $result->fetch_all(MYSQLI_ASSOC);
  $result->free();
  $arr = array(
    'data'=>array_slice($res,($page-1)*$qty,$qty),
    'total'=>count($res)
  );
  echo json_encode($arr,JSON_UNESCAPED_UNICODE);
  $cont->close();
?>