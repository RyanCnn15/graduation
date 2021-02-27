<?php
    $con = mysqli_connect("localhost","root","root","game");
    $name = $_POST["name"];
    $pwd = md5($_POST["pwd"]);
    if(!$con){
        die("数据库连接失败").mysqli_error($con);
    }
    $sql = "SELECT * FROM `user` WHERE `user_name` = '$name' AND `user_password`='$pwd'";
    $query = mysqli_query($con,$sql);
    $res = mysqli_fetch_assoc($query);
    $arr = array();
    if($res){
        $arr = array("id"=>$res["user_id"],"name"=>$res["user_name"],"flag"=>1);
    }
    print_r(json_encode($arr,JSON_UNESCAPED_UNICODE));
?>