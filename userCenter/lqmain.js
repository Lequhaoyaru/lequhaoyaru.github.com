/**
 * Created by Administrator on 2018/4/3.
 */
window.lequ = window.lequ || {};
lequ.control = function (){
    var that = {};
    $(".invite-tab .tab").on('click',function(){
        var _this = $(this).index();
        $(this).addClass('cur').siblings().removeClass('cur');
        $(".invite-content .invite").eq(_this).addClass('show').siblings().removeClass('show');
    });

    $(".problem-content li").on('click',function(){
        if($(this).hasClass('show')){
            $(this).removeClass('show');
        }else{
            $(this).addClass('show');
        }
    });

    $(".problems>a").on('click',function(){
        var index = $(this).index();
        $(this).addClass("cur").siblings().removeClass("cur");
        //$(this).offset().top - $(document).scrollTop();
        //console.log($(".title").outerHeight()+$(".problems").outerHeight());
        var scrollTop = $(".problem-title").eq(index).offset().top - ($(".title").outerHeight()+$(".problems").outerHeight());
        /*$(document).scroll(scrollTop);*/
        $("body,html").stop().animate({scrollTop:scrollTop},200);
    });


    return that;
}();