$(function(){
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 4.5,
        spaceBetween: 10,
        freeMode: true
    });
    $('body').find('.swiper-slide:last-child').css({'width': '1px', 'margin-right': '1px'});

    var totalTime = 8;
    var useTime = 0;
    var $first = null;
    var $second = null;
    var $third = null;
    var dian = true;
    $('.starta,.xiangziBox').on('click', function () {
        if (!dian) {
            return;
        }
        $('.chuizi').animate({'right': '3.9rem', 'top': '9.25rem'});
        setTimeout(function () {
            $first = $($('.xiangziBox').children()).eq(0);
            $second = $($('.xiangziBox').children()).eq(1);
            $third = $($('.xiangziBox').children()).eq(2);
            $first.addClass('ddong');
            $first.addClass('eggbreak');
        }, 1500);
        $('.DB_guide').hide();
        dian = false;
        $('.starta').addClass('startb');
        setTimeout(function () {
            alertCommon('https://hdggcdn.bayimob.com/base_img_path_hdggadv/5596/1556702467636_支付宝640-300.gif','恭喜获得支付宝现金红包');
            closeBtn();
            $('.starta').removeClass('startb');
            dian = true;
        }, 1600);
    });

    function alertCommon(imageUrl, advIntro) {
        var strs = '<div class="popShowPrize" id="dialog5" style="display: block; transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);"><div class="caiguang"></div><div class="m-box"></div><div class="showPrize-dialog modal-body"><div class="red-bg"><div class="card-bg""><img class="resAd" src="' + imageUrl + '"></div><div class="detail"><div class="topic">' + advIntro + '</div><div class="goto"></div></div></div><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span></div></div>'
        $('body').append(strs);
        setTimeout(function () {
            $('#dialog5').append('<span id="close" class="close-btn closetc iconfont"></span>');
        }, 1500)
    }
    function closeBtn(res) {
        $('#dialog5').on('click', '.m-close,.close-btn', function () {
            window.styleReset();
        })
    }
    window.styleReset = function () {
        $('.DB_guide').show();
        $first.addClass('ddong');
        $('#dialog5').addClass('hidden');
        $first.removeClass('ddong');
        $('.chuizi').animate({'right': '0.9rem', 'top': '9rem'});
        setTimeout(function () {
            $first.animate({
                "left": "9%",
                "top": "11.5rem",
                "width": "9.1rem",
                "height": "10.5rem",
                "z-index": '0',
                "background-size": '90%'
            }, 100);
        }, 200);
        setTimeout(function () {
            $second.animate({
                "left": "45%",
                "top": "12.5rem",
                "width": "9.1rem",
                "height": "9.8rem",
                "background-size": '90%'
            }, 100);
        }, 300);
        setTimeout(function () {
            $third.animate({
                "left": "25%",
                "top": "11.3rem",
                "width": "9.1rem",
                "height": "10.5rem",
                "z-index": '2',
                "background-size": '100%'
            }, 150);
        }, 100);
        $third.insertBefore($first);
        $($('.xiangziBox').children()).eq(1);
        $($('.xiangziBox').children()).eq(0).removeClass('eggbreak');
        $($('.xiangziBox').children()).eq(2).removeClass('eggbreak');
        $('#dialog5').remove();
        $('.DB_guide').show();
    }
});
