$(function () {
    $("#header").load("./header.html");
    $("#footer").load("./footer.html");

    let uid = $.cookie("id");
    let dataLocal;

    // 获取订单数据
    $.ajax({
        url: "../api/getOrder.php",
        async: false,
        data: {
            uid
        },
        success: function (res) {
            dataLocal = JSON.parse(res);
        }
    })

    // 购物车渲染函数
    function render() {
        let html = "";
        dataLocal.forEach(item => {
            let input = '<input type="checkbox" name="" id="">'
            if (item.checked) {
                input = '<input type="checkbox" name="" id="" checked="true">'
            }
            html += `
                <tr pid="${item.product_id}">
                    <td class="column1">
                        <img src="${item.img_url}"
                            alt="">
                        <p>${item.title}</p>
                    </td>
                    <td class="column2">
                        <span class="price">￥${item.min_price}</span>
                    </td>
                    <td class="column3">
                        <span>${item.num}</span>
                    </td>
                    <td class="column4">
                        <span class="price">￥${item.min_price*item.num}</span>
                    </td>
                    <td class="column5">
                        ${item.time.substring(0,19)}
                    </td>
                </tr>
            `;
        });
        $(".tb").html(html);
    }

    render();
    calculation()
})