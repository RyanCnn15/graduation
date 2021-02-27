<?php
    $con = mysqli_connect("localhost","root","root","game");
    $name = $_POST["name"];
    $pwd = md5($_POST["pwd"]);
    $tel = $_POST["tel"];
    $email = $_POST["email"];
    if(!$con){
        die("数据库连接失败").mysqli_error($con);
    }
    $sql = "SELECT * FROM `user` WHERE `user_name`='$name'";
    $query = mysqli_query($con,$sql);
    $res = mysqli_fetch_assoc($query);
    if($res){
        print_r(false);
    }else{
        mysqli_query($con,"INSERT INTO `user` VALUES(null,'$name','$pwd','$tel','$email')");
        print_r(true);
    }
    // $sql = "INSERT INTO `user` VALUES(null,'$name','$pwd','$tel','$email')";
    // print_r($sql);
    // $query = mysqli_query($con,$sql);
    // $res = mysqli_fetch_assoc($query);
    // $arr = array();
    // while($res){
    //     array_push($arr,$res);
    //     $res = mysqli_fetch_assoc($query);
    // }
    // print_r(json_encode($arr,JSON_UNESCAPED_UNICODE));
?>