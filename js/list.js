$(function () {
    $("#header").load("./header.html");
    $("#footer").load("./footer.html");

    let count = 0
    $.ajax({
        url: "../api/getList.php",
        data: {
            count
        },
        success: function (res) {
            res = JSON.parse(res);
            render(res);
        }
    });

    // 滚动条监听事件，滚动到底部自动加载新的商品
    $(window).scroll(function () {
        if ($(document).scrollTop() >= $(document).height() - $(window).height() - 100) {
            count += 1
            $.ajax({
                url: "../api/getList.php",
                data: {
                    count
                },
                success: function (res) {
                    res = JSON.parse(res);
                    render(res);
                }
            })
        }
    });

    $(".content").on("click","li",function(){
        $(location).attr("href",`../details.html?pid=${$(this).attr("pid")}`)
    })

    function render(data) {
        html = $(".content").html();
        data.forEach(item => {
            html += `
                <li pid=${item.product_id}>
                    <a href="javascript:">
                        <div class="cut-percent">-${(item.max_price/item.min_price*10).toFixed(0)}%</div>
                        <img src="${item.product_img_url}" alt="">
                        <div class="info">
                            <p class="info-title">${item.title}</p>
                            <span class="min-price">￥<span class="price">${item.min_price}</span></span>
                            <span class="max-price">￥${item.max_price}</span>
                        </div>
                    </a>
                </li>
            `;
        });
        $(".content").html(html)

    }
})