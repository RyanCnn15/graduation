$(function () {
    $("#header").load("./header.html");
    $("#footer").load("./footer.html");
    let key = localStorage.getItem("key");
    $.ajax({
        url: "../api/search.php",
        data: {
            key
        },
        success: function (res) {
            res = JSON.parse(res)
            console.log(res);
            render(res)
        }
    })

    // 商品点击事件
    $(".content").on("click","li",function(){
        $(location).attr("href",`../details.html?pid=${$(this).attr("pid")}`)
    })

    // 页面渲染函数
    function render(data) {
        let html = $(".content").html();
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
        $(".msg").html(`搜索关键字：“<span>${JSON.parse(key)}</span>”，共<span>${data.length}</span>条结果`)
    }
})