<?php
    $con = mysqli_connect("localhost","root","root","game");
    $uid = $_GET["uid"];
    $data = $_GET["data"];
    $data = json_decode($data);
    if(!$con){
        die("数据库连接失败").mysqli_error($con);
    }
    for($i=0;$i<count($data);$i++){
        $pid = $data[$i]->product_id;
        $num = $data[$i]->num;
        // 将商品信息插入订单
        mysqli_query($con,"INSERT INTO `order` VALUES(null,'$uid','$pid','$num',null)");
        // 删除购物车相应商品
        mysqli_query($con,"DELETE FROM `car` WHERE `user_id`='$uid' AND `product_id`='$pid'");
    }
?>