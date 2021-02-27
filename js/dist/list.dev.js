"use strict";

$(function () {
  $("#header").load("./header.html");
  $("#footer").load("./footer.html");
  var count = 0;
  $.ajax({
    url: "../api/getList.php",
    data: {
      count: count
    },
    success: function success(res) {
      res = JSON.parse(res);
      render(res);
    }
  }); // 滚动条监听事件，滚动到底部自动加载新的商品

  $(window).scroll(function () {
    if ($(document).scrollTop() >= $(document).height() - $(window).height() - 100) {
      count += 1;
      $.ajax({
        url: "../api/getList.php",
        data: {
          count: count
        },
        success: function success(res) {
          res = JSON.parse(res);
          render(res);
        }
      });
    }
  });
  $(".content").on("click", "li", function () {
    $(location).attr("href", "../details.html?pid=".concat($(this).attr("pid")));
  });

  function render(data) {
    html = $(".content").html();
    data.forEach(function (item) {
      html += "\n                <li pid=".concat(item.product_id, ">\n                    <a href=\"javascript:\">\n                        <div class=\"cut-percent\">-").concat((item.max_price / item.min_price * 10).toFixed(0), "%</div>\n                        <img src=\"").concat(item.product_img_url, "\" alt=\"\">\n                        <div class=\"info\">\n                            <p class=\"info-title\">").concat(item.title, "</p>\n                            <span class=\"min-price\">\uFFE5<span class=\"price\">").concat(item.min_price, "</span></span>\n                            <span class=\"max-price\">\uFFE5").concat(item.max_price, "</span>\n                        </div>\n                    </a>\n                </li>\n            ");
    });
    $(".content").html(html);
  }
});