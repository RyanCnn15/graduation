"use strict";

$(function () {
  // 载入头部和底部
  $("#header").load("./header.html");
  $("#footer").load("./footer.html"); // 获取PUBG

  $.ajax({
    url: "../api/getPubg.php",
    success: function success(res) {
      res = JSON.parse(res);
      renderFour(res, ".pubg .content");
    }
  }); // 获取限时特惠

  $.ajax({
    url: "../api/getPreferential.php",
    success: function success(res) {
      res = JSON.parse(res);
      renderP(res);
    }
  }); // 获取热门道具

  $.ajax({
    url: "../api/getHot.php",
    success: function success(res) {
      res = JSON.parse(res);
      renderFour(res, ".hot .content");
    }
  }); // 获取steam

  $.ajax({
    url: "../api/getSteam.php",
    success: function success(res) {
      res = JSON.parse(res);
      renderFour(res, ".steam .content");
    }
  }); // 游戏排序标题的点击事件

  $(".sort").on("click", ".hot,.asc,.desc", function (e) {
    $(".sort .header li").removeClass("active");
    $(e.target).addClass("active");
  }); // 获取热销排序

  $.ajax({
    url: "../api/getSortHot.php",
    data: {
      count: 0
    },
    success: function success(res) {
      res = JSON.parse(res);
      renderSort(res);
    }
  }); // 热销排序的点击事件

  $(".sort .header .hot").on("click", function () {
    $(".sort .item").html("");
    $(".sort .more").off("click");
    $.ajax({
      url: "../api/getSortHot.php",
      data: {
        count: 0
      },
      success: function success(res) {
        res = JSON.parse(res);
        renderSort(res);
      }
    });
    $(".sort .more").on("click", function () {
      moreCount += 1;
      $.ajax({
        url: "../api/getSortHot.php",
        data: {
          count: moreCount
        },
        success: function success(res) {
          res = JSON.parse(res);
          renderSort(res);
          console.log(moreCount);
        }
      });
    });
  }); // 获取价格升序

  $(".sort .header .asc").on("click", function () {
    $(".sort .item").html("");
    $(".sort .more").off("click");
    $.ajax({
      url: "../api/getSortAsc.php",
      data: {
        count: 0
      },
      success: function success(res) {
        res = JSON.parse(res);
        renderSort(res);
      }
    });
    $(".sort .more").on("click", function () {
      moreCount += 1;
      $.ajax({
        url: "../api/getSortAsc.php",
        data: {
          count: moreCount
        },
        success: function success(res) {
          res = JSON.parse(res);
          renderSort(res);
          console.log(moreCount);
        }
      });
    });
  }); // 获取价格降序

  $(".sort .header .desc").on("click", function () {
    $(".sort .item").html("");
    $(".sort .more").off("click");
    $.ajax({
      url: "../api/getSortDesc.php",
      data: {
        count: 0
      },
      success: function success(res) {
        res = JSON.parse(res);
        renderSort(res);
      }
    });
    $(".sort .more").on("click", function () {
      moreCount += 1;
      $.ajax({
        url: "../api/getSortDesc.php",
        data: {
          count: moreCount
        },
        success: function success(res) {
          res = JSON.parse(res);
          renderSort(res);
          console.log(moreCount);
        }
      });
    });
  }); // 查看更多的点击事件

  var moreCount = 0;
  $(".sort .more").on("click", function () {
    moreCount += 1;
    $.ajax({
      url: "../api/getSortHot.php",
      data: {
        count: moreCount
      },
      success: function success(res) {
        res = JSON.parse(res);
        renderSort(res);
      }
    });
  }); // 通用四列载入函数

  function renderFour(data, ele) {
    html = "\n            <li>\n                <a href=\"\" style=\"width:288px;height:260px;\" pid=".concat(data[0].product_id, ">\n                    <img src=\"").concat(data[0].img_url, "\" alt=\"\">\n                </a>\n            </li>\n        ");

    for (var i = 1; i < 4; i++) {
      tag = JSON.parse(data[i].tags)[0];

      if (tag.length > 10) {
        tag = "不可退换";
      }

      html += "\n                <li>\n                    <a href=\"\" pid=".concat(data[i].product_id, ">\n                        <div class=\"cut-percent\">-").concat((data[i].max_price / data[i].min_price * 10).toFixed(0), "%</div>\n                        <img src=\"").concat(data[i].img_url, "\" alt=\"\" style=\"width:280px;height:179px;\">\n                        <div class=\"info\">\n                            <p class=\"info-title\">").concat(data[i].title, "</p>\n                            <span class=\"min-price\">\uFFE5<span class=\"price\">").concat(data[i].min_price, "</span></span>\n                            <span class=\"max-price\">\uFFE5").concat(data[i].max_price, "</span>\n                            <span class=\"info-tag\">").concat(tag, "</span>\n                        </div>\n                    </a>\n                </li>\n            ");
    }

    $(ele).html(html);
  } // 限时特惠载入函数


  function renderP(data) {
    html = "";

    for (var i = 0; i <= 1; i++) {
      if (i < 2) {
        html += "\n                    <li class=\"list1\">\n                        <a href=\"\" pid=".concat(data[i].product_id, ">\n                            <img src=\"").concat(data[i].img_url, "\" alt=\"\">\n                            <p>").concat(data[i].title, "</p>\n                            <div class=\"tag\">").concat(JSON.parse(data[i].tags)[0], "</div>\n                            <div class=\"info\">\n                                <span class=\"cut-percent\">-").concat((data[i].max_price / data[i].min_price * 10).toFixed(0), "%</span>\n                                <span class=\"min-price\">\uFFE5<span class=\"price\">").concat(data[i].min_price, "</span></span>\n                                <span class=\"max-price\">\uFFE5").concat(data[i].max_price, "</span>\n                            </div>\n                        </a>\n                    </li>\n                ");
      }
    }

    html += "<li class=\"list2\">";

    for (var _i = 2; _i <= 3; _i++) {
      html += "\n            <a href=\"\" pid=".concat(data[_i].product_id, ">\n                <div class=\"cut-percent\">-").concat((data[_i].max_price / data[_i].min_price * 10).toFixed(0), "%</div>\n                <img src=\"").concat(data[_i].img_url, "\"\n                    alt=\"\">\n                <div class=\"info\">\n                    <p class=\"info-title\">").concat(data[_i].title, "</p>\n                    <span class=\"max-price\">\uFFE5").concat(data[_i].max_price, "</span>\n                    <span class=\"min-price\">\uFFE5<span class=\"price\">").concat(data[_i].min_price, "</span></span>\n                    <span class=\"info-tag\">").concat(JSON.parse(data[_i].tags)[0], "</span>\n                </div>\n            </a>\n        ");
    }

    html += "</li>";
    html += "<li class=\"list2\">";

    for (var _i2 = 4; _i2 <= 5; _i2++) {
      html += "\n            <a href=\"\" pid=".concat(data[_i2].product_id, ">\n                <div class=\"cut-percent\">-").concat((data[_i2].max_price / data[_i2].min_price * 10).toFixed(0), "%</div>\n                <img src=\"").concat(data[_i2].img_url, "\"\n                    alt=\"\">\n                <div class=\"info\">\n                    <p class=\"info-title\">").concat(data[_i2].title, "</p>\n                    <span class=\"max-price\">\uFFE5").concat(data[_i2].max_price, "</span>\n                    <span class=\"min-price\">\uFFE5<span class=\"price\">").concat(data[_i2].min_price, "</span></span>\n                    <span class=\"info-tag\">").concat(JSON.parse(data[_i2].tags)[0], "</span>\n                </div>\n            </a>\n        ");
    }

    html += "</li>";
    $(".preferential .content").html(html);
  } // 载入排序函数


  function renderSort(data) {
    if (data.length < 5) {
      $(".sort .more").html("没有更多了");
      $(".sort .more").off("click");
    }

    $(".sort .item").html();
    data.forEach(function (item) {
      var li = $("<li></li>");
      tag = "";
      JSON.parse(item.tags).forEach(function (t) {
        if (t.length <= 50) {
          tag += "<span>".concat(t, "</span>");
        } else {
          tag += "<span>\u4E0D\u53EF\u9000\u6362</span>";
        }
      });
      li.html("\n                <a href=\"\" pid=".concat(item.product_id, ">\n                    <img src=\"").concat(item.img_url, "\" alt=\"\">\n                    <div class=\"main-info\">\n                        <p class=\"title\">").concat(item.title, "</p>\n                        <p class=\"desc\">").concat(item.desc, "</p>\n                        <div class=\"tag\">").concat(tag, "</div>\n                    </div>\n                    <div class=\"price-info\">\n                        <span class=\"cut-percent\">-").concat((item.max_price / item.min_price * 10).toFixed(0), "%</span>\n                        <span class=\"max-price\">\uFFE5").concat(item.max_price, "</span>\n                        <span class=\"min-price\">\uFFE5<span class=\"price\">").concat(item.min_price, "</span></span>\n                    </div>\n                </a>\n            "));
      $(".sort .item").append(li);
    });
  } // 轮播图点击事件


  $(".swiper-slide").on("click", "img", function () {
    $(location).attr("href", "../details.html?pid=".concat($(this).attr("pid")));
  }); // 通用四列商品点击事件

  $(".part-four").on("click", "a", function (e) {
    e.preventDefault();
    console.log($(this).attr("pid"));
    $(location).attr("href", "../details.html?pid=".concat($(this).attr("pid")));
  }); // 限时特惠商品点击事件

  $(".preferential").on("click", "a", function (e) {
    e.preventDefault();
    console.log($(this).attr("pid"));
    $(location).attr("href", "../details.html?pid=".concat($(this).attr("pid")));
  }); // 游戏排序商品点击事件

  $(".sort .item").on("click", "a", function (e) {
    e.preventDefault();
    $(location).attr("href", "../details.html?pid=".concat($(this).attr("pid")));
  });
});