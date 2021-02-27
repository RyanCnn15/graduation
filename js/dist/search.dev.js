"use strict";

$(function () {
  $("#header").load("./header.html");
  $("#footer").load("./footer.html");
  var key = localStorage.getItem("key");
  $.ajax({
    url: "../api/search.php",
    data: {
      key: key
    },
    success: function success(res) {
      res = JSON.parse(res);
      console.log(res);
      render(res);
    }
  }); // 商品点击事件

  $(".content").on("click", "li", function () {
    $(location).attr("href", "../details.html?pid=".concat($(this).attr("pid")));
  }); // 页面渲染函数

  function render(data) {
    var html = $(".content").html();
    data.forEach(function (item) {
      html += "\n                <li pid=".concat(item.product_id, ">\n                    <a href=\"javascript:\">\n                        <div class=\"cut-percent\">-").concat((item.max_price / item.min_price * 10).toFixed(0), "%</div>\n                        <img src=\"").concat(item.product_img_url, "\" alt=\"\">\n                        <div class=\"info\">\n                            <p class=\"info-title\">").concat(item.title, "</p>\n                            <span class=\"min-price\">\uFFE5<span class=\"price\">").concat(item.min_price, "</span></span>\n                            <span class=\"max-price\">\uFFE5").concat(item.max_price, "</span>\n                        </div>\n                    </a>\n                </li>\n            ");
    });
    $(".content").html(html);
    $(".msg").html("\u641C\u7D22\u5173\u952E\u5B57\uFF1A\u201C<span>".concat(JSON.parse(key), "</span>\u201D\uFF0C\u5171<span>").concat(data.length, "</span>\u6761\u7ED3\u679C"));
  }
});