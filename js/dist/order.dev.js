"use strict";

$(function () {
  $("#header").load("./header.html");
  $("#footer").load("./footer.html");
  var uid = $.cookie("id");
  var dataLocal; // 获取订单数据

  $.ajax({
    url: "../api/getOrder.php",
    async: false,
    data: {
      uid: uid
    },
    success: function success(res) {
      dataLocal = JSON.parse(res);
    }
  }); // 购物车渲染函数

  function render() {
    var html = "";
    dataLocal.forEach(function (item) {
      var input = '<input type="checkbox" name="" id="">';

      if (item.checked) {
        input = '<input type="checkbox" name="" id="" checked="true">';
      }

      html += "\n                <tr pid=\"".concat(item.product_id, "\">\n                    <td class=\"column1\">\n                        <img src=\"").concat(item.img_url, "\"\n                            alt=\"\">\n                        <p>").concat(item.title, "</p>\n                    </td>\n                    <td class=\"column2\">\n                        <span class=\"price\">\uFFE5").concat(item.min_price, "</span>\n                    </td>\n                    <td class=\"column3\">\n                        <span>").concat(item.num, "</span>\n                    </td>\n                    <td class=\"column4\">\n                        <span class=\"price\">\uFFE5").concat(item.min_price * item.num, "</span>\n                    </td>\n                    <td class=\"column5\">\n                        ").concat(item.time.substring(0, 19), "\n                    </td>\n                </tr>\n            ");
    });
    $(".tb").html(html);
  }

  render();
  calculation();
});