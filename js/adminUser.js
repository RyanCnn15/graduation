$(function () {
    let data = [];
    // 添加按钮点击事件
    $(".opt").on("click", ".add", function () {
        $(".mask").css("display", "block")
    })
    // 批量删除按钮点击事件
    $(".opt").on("click", ".delA", function () {
        alert(2)
    })
    // 取消按钮点击事件
    $(".mask").on("click", ".cancel", function () {
        $(this).parents(".mask").css("display", "none")
    })
    // 提交按钮点击事件
    $(".mask").on("click", ".sub", function () {
        if ($("#uName").val() && $("#uPwd").val() && $("#uTel").val() && $("#uEmail").val()) {
            $(this).parents(".mask").css("display", "none")
            $("#uName").val('')
            $("#uPwd").val('')
            $("#uTel").val('')
            $("#uEmail").val('')
        } else {
            alert("有字段未填写")
        }
    })
    $.ajax({
        url: "../api/admin.php",
        async: false,
        data: {
            page: 1,
            num: 10,
            table:"user",
            type: "get"
        },
        success: function (res) {
            data = JSON.parse(res)
            render()
        }
    })

    // 全选按钮点击事件
    $(".th").on("click", "input",function(){
        data.forEach(item=>{
            item.checked = $(this).prop("checked")
        })
        render()
    })
    // 单选按钮点击事件
    $(".tb").on("click", "input",function(){
        let uid = $(this).parents("tr").attr("uid");
        data.forEach(item=>{
            if(item.user_id == uid){
                item.checked = $(this).prop("checked")
            }
        })
        render()
    })
    function render() {
        let html = "";
        $(".tb").html("");
        data.forEach(item => {
            let checked ='<input type="checkbox" name="" id="">'; 
            if(item.checked){
                checked = '<input type="checkbox" name="" id="" checked>'
            }
            html += `
                <tr uid ="${item.user_id}">
                    <td>
                        ${checked}
                    </td>
                    <td>${item.user_id}</td>
                    <td>${item.user_name}</td>
                    <td>${item.user_password}</td>
                    <td>${item.user_tel}</td>
                    <td>${item.user_email}</td>
                    <td>
                        <button class="del">删除</button>
                    </td>
                </tr>
                `;
        })
        $(".tb").html(html);
    }

    $('.page').pagination({
        // 总页数
        pageCount:80,
        // 数据总条数
        totalData:21000,
        // 当前页数
        // current:,
        // 每页显示的条数
        // showData
        // 上一页节点内容
        // prevContent
        // 下一页节点内容
        // nextContent
        // 固定页码按钮数量
        mode:"fixed",
        // 显示的页数
        count:9,
        // 开启首页和末页
        coping:true,
        // 首页节点内容
        homePage:"首页",
        // 尾页节点内容
        endPage:"尾页",
        // 开启跳转
        jump:true,
        callback:function(api){
            console.log(api.getCurrent());
        }
    });
})