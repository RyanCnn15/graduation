<?php
    $con = mysqli_connect("localhost","root","root","game");
    $uid = $_GET["uid"];
    if(!$con){
        die("数据库连接失败").mysqli_error($con);
    }
    $sql = "SELECT * FROM `order` WHERE `user_id`='$uid' ORDER BY `order_id` DESC ";
    $query = mysqli_query($con,$sql);
    $res = mysqli_fetch_assoc($query);
    $arr = array();
    while($res){
        $pid = $res['product_id'];
        $time = $res["create_time"];
        $num = $res["num"];
        $pQuery = mysqli_query($con,"SELECT * FROM `product` WHERE `product_id`='$pid' ");
        $pRes = mysqli_fetch_assoc($pQuery);
        $pRes["time"] = $time;
        $pRes["num"] = $num;
        array_push($arr,$pRes);
        $res = mysqli_fetch_assoc($query);
    }
    print_r(json_encode($arr,JSON_UNESCAPED_UNICODE));
?>