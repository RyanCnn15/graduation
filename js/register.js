$(function () {
    // 载入头部和底部
    $("#header").load("./header.html");
    $("#footer").load("./footer.html");

    $("#register-from").validate({
        rules: {
            uName: {
                required: true,
                uName: true
            },
            uPwd: {
                required: true,
                uPwd: true
            },
            rePwd: {
                required: true,
                equalTo: "#uPwd"
            },
            uTel: {
                required: true,
                uTel: true
            },
            uEmail: {
                required: true,
                email: true
            },
            uServer: {
                required: true
            }
        },
        messages: {
            uName: {
                required: "请填写用户名"
            },
            uPwd: {
                required: "请输入密码"
            },
            rePwd: {
                required: "请再次输入密码"
            },
            uTel: {
                required: "请输入手机号码"
            },
            uEmail: {
                required: "请输入邮箱",
                email: "请输入正确的邮箱"
            },
            uServer: {
                required: ""
            }
        },
        submitHandler: function () {
            $.ajax({
                url: "../api/register.php",
                type: "post",
                data: {
                    name: $("#uName").val(),
                    pwd: $("#uPwd").val(),
                    tel: $("#uTel").val(),
                    email: $("#uEmail").val()
                },
                success: function (res) {
                    if (res) {
                        $("#mask").css("display", "block")
                        setInterval(function () {
                            $(location).attr("href", "../login.html")
                        }, 1000)
                    } else {
                        alert("注册失败,用户名已存在！")
                    }
                }
            })
        }
    });

})