<?php
    $con = mysqli_connect("localhost","root","root","game");
    $pid = $_GET["pid"];
    if(!$con){
        die("数据库连接失败").mysqli_error($con);
    }
    $sql = "SELECT * FROM `product` WHERE `product_id` = '$pid'";
    $query = mysqli_query($con,$sql);
    $res = mysqli_fetch_assoc($query);
    print_r(json_encode($res,JSON_UNESCAPED_UNICODE));
?>