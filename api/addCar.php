<?php
    $con = mysqli_connect("localhost","root","root","game");
    $uid = $_GET["uid"];
    $pid = $_GET["pid"];
    if(!$con){
        die("数据库连接失败").mysqli_error($con);
    }
    $sql = "SELECT * FROM `car` WHERE `user_id`='$uid' AND `product_id`='$pid'";
    $query = mysqli_query($con,$sql);
    $res = mysqli_fetch_assoc($query);
    if($res){
        $num = $res["car_num"]+1;
        mysqli_query($con,"UPDATE `car` SET `car_num`='$num' WHERE `user_id`='$uid' AND `product_id`='$pid'");
        print_r(1);
    }else{
        mysqli_query($con,"INSERT INTO `car` VALUES(null,'$uid','$pid',1) ");
        print_r(1);
    }
?>