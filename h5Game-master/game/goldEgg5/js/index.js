$(function(){
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 4.5,
        spaceBetween: 10,
        freeMode: true
    });
    $('body').find('.swiper-slide:last-child').css({'width': '1px', 'margin-right': '1px'});

    var totalTime = 8;
    var useTime = 0;
    var index = null;
    var dian = true;
    var distants = [
        {'right': '6rem', 'top': '11rem'},
        {'right': '11rem', 'top': '10rem'},
        {'right': '0rem', 'top': '10rem'}
    ];
    $('.starta').on('click', function () {
        if($(this).parent().hasClass('eggbreak'))return;
        if (!dian) {
            return;
        }
        index = $('.xiangziBox .starta').index($(this));
        $('.chuizi').animate(distants[index]);
        setTimeout(function () {
            $('.xiangziBox').children().eq(index).addClass('ddong').addClass('eggbreak');
        }, 1500);
        dian = false;
        setTimeout(function () {
            alertCommon('https://hdggcdn.bayimob.com/base_img_path_hdggadv/5596/1556702467636_支付宝640-300.gif','恭喜获得支付宝现金红包');
            closeBtn();
            dian = true;
        }, 1600);
    });

    function alertCommon(imageUrl, advIntro) {
        var strs = '<div class="popShowPrize" id="dialog5" style="display: block; transform-origin: 0 0 0; opacity: 1; transform: scale(1, 1);"><div class="caiguang"></div><div class="m-box"></div><div class="showPrize-dialog modal-body"><div class="red-bg"><div class="card-bg"><img class="resAd" src="' + imageUrl + '"></div><div class="detail"><div class="goto"></div></div></div><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span></div></div>'
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
        $('.xiangziBox').children().eq(index).removeClass('ddong');
        $('#dialog5').addClass('hidden');
        $('.chuizi').animate({'right': '0.5rem', 'top': '9rem'});
        $('#dialog5').remove();
        if($('.xiangziBox').children('.eggbreak').length == 3){
            $('.xiangziBox').find('.egg').addClass('animation');
            var timer = setTimeout(function () {
                $('.xiangziBox').children().removeClass('eggbreak');
                setTimeout(function () {
                    $('.xiangziBox').find('.egg').removeClass('animation');
                    clearTimeout(timer);
                }, 700);
            }, 700);

        }
    }
});
