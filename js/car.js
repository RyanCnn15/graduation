$(function () {
    $("#header").load("./header.html");
    $("#footer").load("./footer.html");

    let uid = $.cookie("id");
    let dataLocal;

    // 获取购物车数据
    $.ajax({
        url: "../api/getCar.php",
        async: false,
        data: {
            uid
        },
        success: function (res) {
            dataLocal = JSON.parse(res);
        }
    })
    // 减少商品数量点击事件
    $(".tb").on("click", ".reduce", function () {
        let num = $(this).next().text() * 1 - 1;
        let pid = $(this).parents("tr").attr("pid");
        if (num < 1) {
            num = 1
            alert("不能再减少了！")
            return
        }
        $.ajax({
            url: "../api/updateCar.php",
            data: {
                uid,
                pid,
                num,
                type: "reduce"
            },
            success: function () {
                dataLocal.forEach(item => {
                    if (item.product_id == pid) {
                        item.num = num
                    }
                })
                render()
                calculation()
            },
            error: function () {
                alert("商品数量修改错误,点击确定刷新页面！");
                location.reload()
            }
        })
    })

    // 增加商品数量点击事件
    $(".tb").on("click", ".add", function () {
        let num = $(this).prev().text() * 1 + 1;
        let pid = $(this).parents("tr").attr("pid");
        if (num > 999) {
            num = 999
            alert("不能再增加了！")
            return
        }
        $.ajax({
            url: "../api/updateCar.php",
            data: {
                uid,
                pid,
                num,
                type: "add"
            },
            success: function () {
                dataLocal.forEach(item => {
                    if (item.product_id == pid) {
                        item.num = num
                    }
                })
                render()
                calculation()
            },
            error: function () {
                alert("商品数量修改错误,点击确定刷新页面！");
                location.reload()
            }
        })
    })

    // 删除按钮点击事件
    $(".tb").on("click", ".del", function () {
        let pid = $(this).parents("tr").attr("pid");
        $.ajax({
            url: "../api/updateCar.php",
            data: {
                uid,
                pid,
                type: "del"
            },
            success: function () {
                dataLocal.forEach((item, index, arr) => {
                    if (item.product_id == pid) {
                        arr.splice(index, 1);
                    }
                })
                render()
                calculation()
            }
        })
    })

    // 单选按钮点击事件
    $(".tb").on("click", "input", function () {
        let pid = $(this).parents("tr").attr("pid");
        dataLocal.forEach(item => {
            if (item.product_id == pid) {
                item.checked = !item.checked
            }
        })
        calculation()
    })

    // 全选按钮点击事件
    $(".th").on("click", "input", function () {
        dataLocal.forEach(item => {
            item.checked = $(this).prop("checked")
        })
        render()
        calculation()
    })

    // 结算按钮点击事件
    $(".tf").on("click", "button", function () {
        let flag = true;
        let d = []
        dataLocal.forEach(item => {
            if (item.checked) {
                flag = false
                d.push(item)
            }
        })
        d = JSON.stringify(d)
        if (flag) {
            alert("您未选择任何商品！")
        } else {
            $.ajax({
                url: "../api/payCar.php",
                data: {
                    uid,
                    data: d
                },
                success: function () {
                    $("#mask").css("display", "block")
                    setInterval(function () {
                        location.href = location.href
                    }, 1000)
                }
            })
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
                    <td class="check">
                        ${input}
                    </td>
                    <td class="column1">
                        <img src="${item.img_url}"
                            alt="">
                        <p>${item.title}</p>
                    </td>
                    <td class="column2">
                        <span class="price">￥${item.min_price}</span>
                    </td>
                    <td class="column3">
                        <button class="reduce">-</button>
                        <span>${item.num}</span>
                        <button class="add">+</button>
                    </td>
                    <td class="column4">
                        <span class="price">￥${item.min_price*item.num}</span>
                    </td>
                    <td class="column5">
                        <button class="del">删除</button>
                    </td>
                </tr>
            `;
        });
        $(".tb").html(html);
    }

    // 计算总价函数
    function calculation() {
        let price = 0
        let num = 0
        dataLocal.forEach(item => {
            if (item.checked) {
                price += item.num * item.min_price
                num += 1
            }
        })
        let html = `
            <tr>
                <td class="price-info" colspan="4">
                    共选中<span class="num">${num}</span>件商品，合计<span class="price">￥${price}</span>
                </td>
                <td class="payment" colspan="2">
                    <button>结算</button>
                </td>
            </tr>
        `
        $(".tf").html(html)
    }

    render();
    calculation()
})