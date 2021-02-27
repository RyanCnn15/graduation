<?php
    $con = mysqli_connect("localhost","root","root","game");
    $id = $_GET["uid"];
    if(!$con){
        die("数据库连接失败").mysqli_error($con);
    }
    $sql = "SELECT * FROM `car`  WHERE `user_id` = '$id' ORDER BY `car_id` ASC";
    $query = mysqli_query($con,$sql);
    $res = mysqli_fetch_assoc($query);
    $arr = array();
    while($res){
        $pid = $res["product_id"];
        $num = $res["car_num"];
        $pQuery = mysqli_query($con,"SELECT * FROM `product` WHERE `product_id`='$pid' ");
        $pInfo = mysqli_fetch_assoc($pQuery);
        $pInfo["num"] = $num;
        $pInfo["checked"] = false;
        array_push($arr,$pInfo);
        $res = mysqli_fetch_assoc($query);
    }
    print_r(json_encode($arr,JSON_UNESCAPED_UNICODE));
?>