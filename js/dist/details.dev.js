"use strict";

$(function () {
  var pid = $(location).attr("search").substring(5);
  var uid = $.cookie("id");
  $.ajax({
    url: "../api/getDetails.php",
    data: {
      pid: pid
    },
    success: function success(res) {
      res = JSON.parse(res);
      render(res);
    }
  }); // 加入购物车点击事件

  $("#main").on("click", ".add", function () {
    if (uid) {
      $.ajax({
        url: "../api/addCar.php",
        data: {
          uid: uid,
          pid: pid
        },
        success: function success(res) {
          if (res) {
            alert("添加成功");
          } else {
            alert("添加失败");
          }
        }
      });
    } else {
      localStorage.setItem("url", "".concat($(location).attr("href")));
      $(location).attr("href", "../login.html");
    }
  }); // 立即查看购物车事件

  $("#main").on("click", ".buy", function () {
    $(location).attr("href", "../car.html");
  });

  function render(data) {
    var tag = "";
    JSON.parse(data.tags).forEach(function (item) {
      tag += "<span class=\"tag\">".concat(item, "</span>");
    });
    html = "\n            <div class=\"details-img\">\n                <img src=\"".concat(data.img_url, "\" alt=\"\">\n            </div>\n            <div class=\"details-info\">\n                <p class=\"title\">").concat(data.title, "</p>\n                <p class=\"desc\">").concat(data.desc, "</p>\n                <div class=\"tag-box\">\n                ").concat(tag, "\n                </div>\n                <div class=\"sale-box\">\n                    <div class=\"old-price\" style=\"display: block;\">\n                        <label class=\"price-title\">\u539F\u4EF7</label><span>\uFFE5").concat(data.max_price, "</span>\n                    </div>\n                    <div class=\"main-info\">\n                        <p class=\"new-price\">\n                            <label class=\"price-title\">\u73B0\u4EF7</label><span>\uFFE5<strong>").concat(data.min_price, "</strong></span>\n                        </p>\n                        <p class=\"sale-count\">\u7D2F\u8BA1\u51FA\u552E\uFF1A38\u4EF6</p>\n                    </div>\n                </div>\n                <button class=\"add\">\u52A0\u5165\u8D2D\u7269\u8F66</button>\n                <button class=\"buy\">\u67E5\u770B\u8D2D\u7269\u8F66</button>\n            </div>\n        ");
    $(".details-top").html(html);
  }
});