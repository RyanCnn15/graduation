<?php
    $con = mysqli_connect("localhost","root","root","game");
    $count = $_GET["count"]*20;
    if(!$con){
        die("数据库连接失败").mysqli_error($con);
    }
    $sql = "SELECT * FROM `product` LIMIT $count,20";
    $query = mysqli_query($con,$sql);
    $res = mysqli_fetch_assoc($query);
    $arr = array();
    while($res){
        array_push($arr,$res);
        $res = mysqli_fetch_assoc($query);
    }
    print_r(json_encode($arr,JSON_UNESCAPED_UNICODE));
?>