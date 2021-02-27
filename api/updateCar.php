<?php
    $con = mysqli_connect("localhost", "root", "root", "game");
    $uid = $_GET["uid"];
    $pid = $_GET["pid"];
    $num = $_GET["num"];
    $type = $_GET["type"];
    if (!$con) {
        die("数据库连接失败") . mysqli_error($con);
    }
    if ($type == "reduce" || $type == "add") {
        mysqli_query($con, "UPDATE  `car` SET `car_num`='$num' WHERE `user_id` = '$uid' AND `product_id`='$pid'");
    }
    if($type == "del"){
        mysqli_query($con, "DELETE FROM `car` WHERE `user_id` = '$uid' AND `product_id`='$pid'");
    }
?>
