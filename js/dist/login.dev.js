"use strict";

$(function () {
  $("#header").load("./header.html");
  $("#footer").load("./footer.html");
  var url = localStorage.getItem("url");
  var code = new GVerify({
    id: "code"
  });
  $("#uSub").on("click", function () {
    var name = $("#uName").val(),
        pwd = $("#uPwd").val(),
        // validate = code.validate($("#uCode").val());
    validate = 1;

    if (validate) {
      $.ajax({
        url: "../api/login.php",
        type: "post",
        data: {
          name: name,
          pwd: pwd
        },
        success: function success(res) {
          res = JSON.parse(res);

          if (res.flag == 1) {
            $("#mask").css("display", "block");
            $.cookie("name", res.name);
            $.cookie("id", res.id);
            localStorage.removeItem("url");
            setInterval(function () {
              $(location).attr("href", url);
            }, 1000);
          } else {
            alert("用户名或者密码错误！");
          }
        }
      });
      return false;
    } else {
      alert("验证码错误");
      return false;
    }
  });
});