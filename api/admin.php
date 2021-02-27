<?php
    $con = mysqli_connect("localhost","root","root","game");
    $table = $_GET["table"];
    $type = $_GET["type"];
    if(!$con){
        die("数据库连接失败").mysqli_error($con);
    }

    $arr = array();
    if($table == "user"){
        if($type == "get"){
            $query = mysqli_query($con,"SELECT * FROM `$table` LIMIT 0,5");
            $res = mysqli_fetch_assoc($query);
            while($res){
                $res["checked"] = false;
                array_push($arr,$res);
                $res = mysqli_fetch_assoc($query);
            }
            print_r(json_encode($arr,JSON_UNESCAPED_UNICODE));
        }
    }

    
?>