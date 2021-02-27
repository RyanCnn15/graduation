"use strict";

$(function () {
  var data = []; // 添加按钮点击事件

  $(".opt").on("click", ".add", function () {
    $(".mask").css("display", "block");
  }); // 批量删除按钮点击事件

  $(".opt").on("click", ".delA", function () {
    alert(2);
  }); // 取消按钮点击事件

  $(".mask").on("click", ".cancel", function () {
    $(this).parents(".mask").css("display", "none");
  }); // 提交按钮点击事件

  $(".mask").on("click", ".sub", function () {
    if ($("#uName").val() && $("#uPwd").val() && $("#uTel").val() && $("#uEmail").val()) {
      $(this).parents(".mask").css("display", "none");
      $("#uName").val('');
      $("#uPwd").val('');
      $("#uTel").val('');
      $("#uEmail").val('');
    } else {
      alert("有字段未填写");
    }
  });
  $.ajax({
    url: "../api/admin.php",
    async: false,
    data: {
      page: 1,
      num: 10,
      table: "user",
      type: "get"
    },
    success: function success(res) {
      data = JSON.parse(res);
      render();
    }
  }); // 全选按钮点击事件

  $(".th").on("click", "input", function () {
    var _this = this;

    data.forEach(function (item) {
      item.checked = $(_this).prop("checked");
    });
    render();
  }); // 单选按钮点击事件

  $(".tb").on("click", "input", function () {
    var _this2 = this;

    var uid = $(this).parents("tr").attr("uid");
    data.forEach(function (item) {
      if (item.user_id == uid) {
        item.checked = $(_this2).prop("checked");
      }
    });
    render();
  });

  function render() {
    var html = "";
    $(".tb").html("");
    data.forEach(function (item) {
      var checked = '<input type="checkbox" name="" id="">';

      if (item.checked) {
        checked = '<input type="checkbox" name="" id="" checked>';
      }

      html += "\n                <tr uid =\"".concat(item.user_id, "\">\n                    <td>\n                        ").concat(checked, "\n                    </td>\n                    <td>").concat(item.user_id, "</td>\n                    <td>").concat(item.user_name, "</td>\n                    <td>").concat(item.user_password, "</td>\n                    <td>").concat(item.user_tel, "</td>\n                    <td>").concat(item.user_email, "</td>\n                    <td>\n                        <button class=\"del\">\u5220\u9664</button>\n                    </td>\n                </tr>\n                ");
    });
    $(".tb").html(html);
  }

  $('.page').pagination({
    // 总页数
    pageCount: 80,
    // 数据总条数
    totalData: 21000,
    // 当前页数
    // current:,
    // 每页显示的条数
    // showData
    // 上一页节点内容
    // prevContent
    // 下一页节点内容
    // nextContent
    // 固定页码按钮数量
    mode: "fixed",
    // 显示的页数
    count: 9,
    // 开启首页和末页
    coping: true,
    // 首页节点内容
    homePage: "首页",
    // 尾页节点内容
    endPage: "尾页",
    // 开启跳转
    jump: true,
    callback: function callback(api) {
      console.log(api.getCurrent());
    }
  });
});