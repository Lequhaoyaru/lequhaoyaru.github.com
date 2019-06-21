$(function(){
    var danindex = 0;
    var dansuiSwitch = true;
    var suiArr = null;
    jindanAnimation('beat', '.full', 1000);
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 1.5,
        spaceBetween: 0,
        freeMode: true
    });

    var zaload = true;
    $('#danlist .full').on('click', function () {
        if (zaload == false) {
            return;
        }
        var obj = $(this);

        if (obj.hasClass('eggbreak')) {
            return;
        }

        var eggOffset = $(this).offset();
        var eggWidth = $(this).width();
        var windowWidth = $(window).width();
        var left = windowWidth - eggWidth - eggOffset.left;
        var count = $('#countZa').text();
        /*var startC = hdgg.start();*/
        var index = $(this).index();
        /*if (startC < 0) {
         return;
         }*/
        if (count == 0) {
            return;
        }
        if (suiArr instanceof Array) {
            suiArr.push(index);
            hdgg.storage.set('sui', suiArr);
        }
        dansuiSwitch = false;
        obj.removeClass('full').removeClass('beat');
        zaload = false;
        $(".chuizi").animate({top: eggOffset.top - 30, right: left - 30}, 1200, function () {
            obj.addClass('eggbreak');
            setTimeout(function () {
                $(".chuizi").css({top: '10.0rem', right: 0})
            }, 1100)
            setTimeout(function () {
                alertCommon('https://hdggcdn.bayimob.com/base_img_path_hdggadv/5596/1556702467636_支付宝640-300.gif','恭喜获得支付宝现金红包');
                closeBtn();
                zaload = true;
            }, 1200);
            danindex = 0;
        });
    })

    function jindanAnimation(aniClass, son, time) {
        var eggint = setInterval(function () {
            if (dansuiSwitch == true) {
                danindex = danindex == $('#danlist').find('.full').length ? 0 : danindex;
                $('#danlist').find('.full').eq(danindex).addClass(aniClass).siblings(son).removeClass(aniClass);
                danindex++;
            } else {
                $('#danlist').find('.full').removeClass(aniClass);
            }
            if ($('#danlist').find('.full').length == 1) {
                $('#danlist').find('.full').removeClass(aniClass).addClass('beat1');
            }


        }, time);
    }
    function alertCommon(imageUrl, advIntro) {
        var strs = '<div class="popShowPrize" id="dialog5" style="display: block; transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);"><div class="titles"></div><div class="leftHua"></div><div class="rightHua"></div><div class="caiguang"></div><div class="showPrize-dialog modal-body"><div class="red-bg"><div class="card-bg"><img class="resAd" src="' + imageUrl + '"></div><div class="detail"><div class="topic">' + advIntro + '</div><div class="goto"></div></div></div><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span></div></div>'
        $('body').append(strs);
        setTimeout(function () {
            $('.leftHua').animate({'left': '0rem'}, 400)
            $('.rightHua').animate({'right': '0rem'}, 400),
                $('.titles,.caiguang').css('display', 'block')

        }, 500)
        setTimeout(function () {
            $('#dialog5').append('<span id="close" class="close-btn closetc iconfont"></span>');
        }, 1500)
    }
    function closeBtn(res) {
        $('#dialog5').on('click', '.close-btn', function () {
            /*res.close();*/
            window.styleReset();
        })
    }
    window.styleReset = function () {
        $('#dialog5').addClass('hidden');
        $('#dialog5').remove();
    }
});
