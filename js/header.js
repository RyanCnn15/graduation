$(function () {
    let href = window.location.pathname.substr(1)
    $(".nav li a").each(function () {
        let url = $(this).attr("href");
        if (href == url) {
            $(this).parents("li").addClass("active")
        } else {
            $(this).parents("li").removeClass("active")
        }
    })
    $(".header .search #search-in").on("keydown ", function (e) {
        if (e.keyCode == 13) {
            let reg = /\s+/
            let key = $(this).val();
            key = key.split(reg)
            console.log(key)
            key = JSON.stringify(key)
            localStorage.setItem("key", key);
            $(location).attr("href", "../search.html")
        }
    })
    $(".header .search #search-btn").on("click", function () {
        let reg = /\s+/
        let key = $(this).prev().val();
        key = key.split(reg)
        if(key!=""){
            console.log(key)
            key = JSON.stringify(key)
            localStorage.setItem("key", key);
            $(location).attr("href", "../search.html")
        }
    })
    $(".login").click(function(){
        localStorage.setItem("url",location.href)
    })
    if ($.cookie("id")) {
        $(".login").text( "我的")
        $(".login").click(function(e){
            e.preventDefault()
            $(".userInfo").toggle("active")
        })
        $(".userInfo").on("click",".car",function(){
            $(location).attr("href","../car.html")
        })
        $(".userInfo").on("click",".order",function(){
            $(location).attr("href","../order.html")
        })
        $(".userInfo").on("click",".out",function(){
            // e.stopPropagation()
            $.removeCookie("name")
            $.removeCookie("id")
            alert("注销成功")
            location.href = location.href
        })
    }
})