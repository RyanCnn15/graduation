<?php
    $con = mysqli_connect("localhost","root","root","game");
    $key = $_GET["key"];
    $key = json_decode($key);
    if(!$con){
        die("数据库连接失败").mysqli_error($con);
    }

    // 拼接查询规则
    for($i=0;$i<count($key);$i++){
        if($key[$i]!=""){
            $reg = $reg.$key[$i]."|";
        }
    }
    $reg = substr($reg,0,strlen($reg)-1);

    // 查询数据库
    $sql = "SELECT * FROM `product` WHERE CONCAT_WS(`title`,`desc`,`tags`) REGEXP '$reg'";
    $query = mysqli_query($con,$sql);
    $res = mysqli_fetch_assoc($query);
    $arr = array();
    while($res){
        array_push($arr,$res);
        $res = mysqli_fetch_assoc($query);
    }
    print_r(json_encode($arr,JSON_UNESCAPED_UNICODE));
?>