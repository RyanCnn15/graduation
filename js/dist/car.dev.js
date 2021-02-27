"use strict";

$(function () {
  $("#header").load("./header.html");
  $("#footer").load("./footer.html");
  var uid = $.cookie("id");
  var dataLocal; // 获取购物车数据

  $.ajax({
    url: "../api/getCar.php",
    async: false,
    data: {
      uid: uid
    },
    success: function success(res) {
      dataLocal = JSON.parse(res);
    }
  }); // 减少商品数量点击事件

  $(".tb").on("click", ".reduce", function () {
    var num = $(this).next().text() * 1 - 1;
    var pid = $(this).parents("tr").attr("pid");

    if (num < 1) {
      num = 1;
      alert("不能再减少了！");
      return;
    }

    $.ajax({
      url: "../api/updateCar.php",
      data: {
        uid: uid,
        pid: pid,
        num: num,
        type: "reduce"
      },
      success: function success() {
        dataLocal.forEach(function (item) {
          if (item.product_id == pid) {
            item.num = num;
          }
        });
        render();
        calculation();
      },
      error: function error() {
        alert("商品数量修改错误,点击确定刷新页面！");
        location.reload();
      }
    });
  }); // 增加商品数量点击事件

  $(".tb").on("click", ".add", function () {
    var num = $(this).prev().text() * 1 + 1;
    var pid = $(this).parents("tr").attr("pid");

    if (num > 999) {
      num = 999;
      alert("不能再增加了！");
      return;
    }

    $.ajax({
      url: "../api/updateCar.php",
      data: {
        uid: uid,
        pid: pid,
        num: num,
        type: "add"
      },
      success: function success() {
        dataLocal.forEach(function (item) {
          if (item.product_id == pid) {
            item.num = num;
          }
        });
        render();
        calculation();
      },
      error: function error() {
        alert("商品数量修改错误,点击确定刷新页面！");
        location.reload();
      }
    });
  }); // 删除按钮点击事件

  $(".tb").on("click", ".del", function () {
    var pid = $(this).parents("tr").attr("pid");
    $.ajax({
      url: "../api/updateCar.php",
      data: {
        uid: uid,
        pid: pid,
        type: "del"
      },
      success: function success() {
        dataLocal.forEach(function (item, index, arr) {
          if (item.product_id == pid) {
            arr.splice(index, 1);
          }
        });
        render();
        calculation();
      }
    });
  }); // 单选按钮点击事件

  $(".tb").on("click", "input", function () {
    var pid = $(this).parents("tr").attr("pid");
    dataLocal.forEach(function (item) {
      if (item.product_id == pid) {
        item.checked = !item.checked;
      }
    });
    calculation();
  }); // 全选按钮点击事件

  $(".th").on("click", "input", function () {
    var _this = this;

    dataLocal.forEach(function (item) {
      item.checked = $(_this).prop("checked");
    });
    render();
    calculation();
  }); // 结算按钮点击事件

  $(".tf").on("click", "button", function () {
    var flag = true;
    var d = [];
    dataLocal.forEach(function (item) {
      if (item.checked) {
        flag = false;
        d.push(item);
      }
    });
    d = JSON.stringify(d);

    if (flag) {
      alert("您未选择任何商品！");
    } else {
      $.ajax({
        url: "../api/payCar.php",
        data: {
          uid: uid,
          data: d
        },
        success: function success() {
          $("#mask").css("display", "block");
          setInterval(function () {
            location.href = location.href;
          }, 1000);
        }
      });
    }
  }); // 购物车渲染函数

  function render() {
    var html = "";
    dataLocal.forEach(function (item) {
      var input = '<input type="checkbox" name="" id="">';

      if (item.checked) {
        input = '<input type="checkbox" name="" id="" checked="true">';
      }

      html += "\n                <tr pid=\"".concat(item.product_id, "\">\n                    <td class=\"check\">\n                        ").concat(input, "\n                    </td>\n                    <td class=\"column1\">\n                        <img src=\"").concat(item.img_url, "\"\n                            alt=\"\">\n                        <p>").concat(item.title, "</p>\n                    </td>\n                    <td class=\"column2\">\n                        <span class=\"price\">\uFFE5").concat(item.min_price, "</span>\n                    </td>\n                    <td class=\"column3\">\n                        <button class=\"reduce\">-</button>\n                        <span>").concat(item.num, "</span>\n                        <button class=\"add\">+</button>\n                    </td>\n                    <td class=\"column4\">\n                        <span class=\"price\">\uFFE5").concat(item.min_price * item.num, "</span>\n                    </td>\n                    <td class=\"column5\">\n                        <button class=\"del\">\u5220\u9664</button>\n                    </td>\n                </tr>\n            ");
    });
    $(".tb").html(html);
  } // 计算总价函数


  function calculation() {
    var price = 0;
    var num = 0;
    dataLocal.forEach(function (item) {
      if (item.checked) {
        price += item.num * item.min_price;
        num += 1;
      }
    });
    var html = "\n            <tr>\n                <td class=\"price-info\" colspan=\"4\">\n                    \u5171\u9009\u4E2D<span class=\"num\">".concat(num, "</span>\u4EF6\u5546\u54C1\uFF0C\u5408\u8BA1<span class=\"price\">\uFFE5").concat(price, "</span>\n                </td>\n                <td class=\"payment\" colspan=\"2\">\n                    <button>\u7ED3\u7B97</button>\n                </td>\n            </tr>\n        ");
    $(".tf").html(html);
  }

  render();
  calculation();
});