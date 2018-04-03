/**
 * Created by Administrator on 2018/4/3.
 */
window.lequ = window.lequ || {};
lequ.control = function (){
    $(".invite-tab .tab").on('click',function(){
        var _this = $(this).index();
        $(this).addClass('cur').siblings().removeClass('cur');
        $(".invite-content .invite").eq(_this).addClass('show').siblings().removeClass('show');
    });
}();