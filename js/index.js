$(function () {

    // 载入头部和底部
    $("#header").load("./header.html");
    $("#footer").load("./footer.html");

    // 获取PUBG
    $.ajax({
        url: "../api/getPubg.php",
        success: function (res) {
            res = JSON.parse(res);
            renderFour(res, ".pubg .content");
        }
    })

    // 获取限时特惠
    $.ajax({
        url: "../api/getPreferential.php",
        success: function (res) {
            res = JSON.parse(res);
            renderP(res);
        }
    })

    // 获取热门道具
    $.ajax({
        url: "../api/getHot.php",
        success: function (res) {
            res = JSON.parse(res);
            renderFour(res, ".hot .content");
        }
    })

    // 获取steam
    $.ajax({
        url: "../api/getSteam.php",
        success: function (res) {
            res = JSON.parse(res);
            renderFour(res, ".steam .content");
        }
    })

    // 游戏排序标题的点击事件
    $(".sort").on("click", ".hot,.asc,.desc", function (e) {
        $(".sort .header li").removeClass("active")
        $(e.target).addClass("active")
    })

    // 获取热销排序
    $.ajax({
        url: "../api/getSortHot.php",
        data: {
            count: 0
        },
        success: function (res) {
            res = JSON.parse(res);
            renderSort(res);
        }
    })

    // 热销排序的点击事件
    $(".sort .header .hot").on("click", function () {
        $(".sort .item").html("")
        $(".sort .more").off("click");
        $.ajax({
            url: "../api/getSortHot.php",
            data: {
                count: 0
            },
            success: function (res) {
                res = JSON.parse(res);
                renderSort(res);
            }
        })
        $(".sort .more").on("click", function () {
            moreCount += 1
            $.ajax({
                url: "../api/getSortHot.php",
                data: {
                    count: moreCount
                },
                success: function (res) {
                    res = JSON.parse(res);
                    renderSort(res);
                    console.log(moreCount);
                }
            })
        })
    })

    // 获取价格升序
    $(".sort .header .asc").on("click", function () {
        $(".sort .item").html("")
        $(".sort .more").off("click");
        $.ajax({
            url: "../api/getSortAsc.php",
            data: {
                count: 0
            },
            success: function (res) {
                res = JSON.parse(res);
                renderSort(res);
            }
        })
        $(".sort .more").on("click", function () {
            moreCount += 1
            $.ajax({
                url: "../api/getSortAsc.php",
                data: {
                    count: moreCount
                },
                success: function (res) {
                    res = JSON.parse(res);
                    renderSort(res);
                    console.log(moreCount);
                }
            })
        })
    })

    // 获取价格降序
    $(".sort .header .desc").on("click", function () {
        $(".sort .item").html("")
        $(".sort .more").off("click");
        $.ajax({
            url: "../api/getSortDesc.php",
            data: {
                count: 0
            },
            success: function (res) {
                res = JSON.parse(res);
                renderSort(res);
            }
        })
        $(".sort .more").on("click", function () {
            moreCount += 1
            $.ajax({
                url: "../api/getSortDesc.php",
                data: {
                    count: moreCount
                },
                success: function (res) {
                    res = JSON.parse(res);
                    renderSort(res);
                    console.log(moreCount);
                }
            })
        })
    })

    // 查看更多的点击事件
    let moreCount = 0
    $(".sort .more").on("click", function () {
        moreCount += 1
        $.ajax({
            url: "../api/getSortHot.php",
            data: {
                count: moreCount
            },
            success: function (res) {
                res = JSON.parse(res);
                renderSort(res);
            }
        })
    })

    // 通用四列载入函数
    function renderFour(data, ele) {
        html = `
            <li>
                <a href="" style="width:288px;height:260px;" pid=${data[0].product_id}>
                    <img src="${data[0].img_url}" alt="">
                </a>
            </li>
        `;
        for (let i = 1; i < 4; i++) {
            tag = JSON.parse(data[i].tags)[0];
            if (tag.length > 10) {
                tag = "不可退换";
            }
            html += `
                <li>
                    <a href="" pid=${data[i].product_id}>
                        <div class="cut-percent">-${(data[i].max_price/data[i].min_price*10).toFixed(0)}%</div>
                        <img src="${data[i].img_url}" alt="" style="width:280px;height:179px;">
                        <div class="info">
                            <p class="info-title">${data[i].title}</p>
                            <span class="min-price">￥<span class="price">${data[i].min_price}</span></span>
                            <span class="max-price">￥${data[i].max_price}</span>
                            <span class="info-tag">${tag}</span>
                        </div>
                    </a>
                </li>
            `;
        }
        $(ele).html(html)
    }

    // 限时特惠载入函数
    function renderP(data) {
        html = "";
        for (let i = 0; i <= 1; i++) {
            if (i < 2) {
                html += `
                    <li class="list1">
                        <a href="" pid=${data[i].product_id}>
                            <img src="${data[i].img_url}" alt="">
                            <p>${data[i].title}</p>
                            <div class="tag">${JSON.parse(data[i].tags)[0]}</div>
                            <div class="info">
                                <span class="cut-percent">-${(data[i].max_price/data[i].min_price*10).toFixed(0)}%</span>
                                <span class="min-price">￥<span class="price">${data[i].min_price}</span></span>
                                <span class="max-price">￥${data[i].max_price}</span>
                            </div>
                        </a>
                    </li>
                `;
            }
        }

        html += `<li class="list2">`;
        for (let i = 2; i <= 3; i++) {
            html += `
            <a href="" pid=${data[i].product_id}>
                <div class="cut-percent">-${(data[i].max_price/data[i].min_price*10).toFixed(0)}%</div>
                <img src="${data[i].img_url}"
                    alt="">
                <div class="info">
                    <p class="info-title">${data[i].title}</p>
                    <span class="max-price">￥${data[i].max_price}</span>
                    <span class="min-price">￥<span class="price">${data[i].min_price}</span></span>
                    <span class="info-tag">${JSON.parse(data[i].tags)[0]}</span>
                </div>
            </a>
        `;
        }
        html += `</li>`;

        html += `<li class="list2">`;
        for (let i = 4; i <= 5; i++) {
            html += `
            <a href="" pid=${data[i].product_id}>
                <div class="cut-percent">-${(data[i].max_price/data[i].min_price*10).toFixed(0)}%</div>
                <img src="${data[i].img_url}"
                    alt="">
                <div class="info">
                    <p class="info-title">${data[i].title}</p>
                    <span class="max-price">￥${data[i].max_price}</span>
                    <span class="min-price">￥<span class="price">${data[i].min_price}</span></span>
                    <span class="info-tag">${JSON.parse(data[i].tags)[0]}</span>
                </div>
            </a>
        `;
        }
        html += `</li>`;
        $(".preferential .content").html(html)
    }

    // 载入排序函数
    function renderSort(data) {
        if (data.length < 5) {
            $(".sort .more").html("没有更多了");
            $(".sort .more").off("click");
        }
        $(".sort .item").html();
        data.forEach(item => {
            let li = $("<li></li>");
            tag = ""
            JSON.parse(item.tags).forEach(t => {
                if(t.length<=50){
                    tag += `<span>${t}</span>`
                }else{
                    tag += `<span>不可退换</span>`
                }
            })
            li.html(`
                <a href="" pid=${item.product_id}>
                    <img src="${item.img_url}" alt="">
                    <div class="main-info">
                        <p class="title">${item.title}</p>
                        <p class="desc">${item.desc}</p>
                        <div class="tag">${tag}</div>
                    </div>
                    <div class="price-info">
                        <span class="cut-percent">-${(item.max_price/item.min_price*10).toFixed(0)}%</span>
                        <span class="max-price">￥${item.max_price}</span>
                        <span class="min-price">￥<span class="price">${item.min_price}</span></span>
                    </div>
                </a>
            `)
            $(".sort .item").append(li)
        })
    }

    // 轮播图点击事件
    $(".swiper-slide").on("click", "img", function () {
        $(location).attr("href", `../details.html?pid=${$(this).attr("pid")}`);
    })

    // 通用四列商品点击事件
    $(".part-four").on("click", "a", function (e) {
        e.preventDefault()
        console.log($(this).attr("pid"));
        $(location).attr("href", `../details.html?pid=${$(this).attr("pid")}`);
    })

    // 限时特惠商品点击事件
    $(".preferential").on("click", "a", function (e) {
        e.preventDefault()
        console.log($(this).attr("pid"));
        $(location).attr("href", `../details.html?pid=${$(this).attr("pid")}`);
    })

    // 游戏排序商品点击事件
    $(".sort .item").on("click", "a", function (e) {
        e.preventDefault()
        $(location).attr("href", `../details.html?pid=${$(this).attr("pid")}`);
    })


})