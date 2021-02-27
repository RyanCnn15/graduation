$(function(){
    let pid = $(location).attr("search").substring(5);
    let uid = $.cookie("id")
    $.ajax({
        url:"../api/getDetails.php",
        data:{
            pid
        },
        success:function(res){
            res = JSON.parse(res);
            render(res);
        }
    })

    // 加入购物车点击事件
    $("#main").on("click",".add",function(){
        if(uid){
            $.ajax({
                url:"../api/addCar.php",
                data:{
                    uid,
                    pid
                },
                success:function(res){
                    if(res){
                        alert("添加成功")
                    }else{
                        alert("添加失败")
                    }
                }
            })
        }else{
            localStorage.setItem("url", `${$(location).attr("href")}`);
            $(location).attr("href","../login.html")
        }
    })

    // 立即查看购物车事件
    $("#main").on("click",".buy",function(){
        $(location).attr("href","../car.html")
    })

    function render(data){
        let tag = ""
        JSON.parse(data.tags).forEach(item => {
            tag +=`<span class="tag">${item}</span>`
        });
        html = `
            <div class="details-img">
                <img src="${data.img_url}" alt="">
            </div>
            <div class="details-info">
                <p class="title">${data.title}</p>
                <p class="desc">${data.desc}</p>
                <div class="tag-box">
                ${tag}
                </div>
                <div class="sale-box">
                    <div class="old-price" style="display: block;">
                        <label class="price-title">原价</label><span>￥${data.max_price}</span>
                    </div>
                    <div class="main-info">
                        <p class="new-price">
                            <label class="price-title">现价</label><span>￥<strong>${data.min_price}</strong></span>
                        </p>
                        <p class="sale-count">累计出售：38件</p>
                    </div>
                </div>
                <button class="add">加入购物车</button>
                <button class="buy">查看购物车</button>
            </div>
        `
        $(".details-top").html(html)
    }
})