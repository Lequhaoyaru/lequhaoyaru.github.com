$(function(){
    var danindex = 0;
    var dansuiSwitch = true;
    var suiArr = null;
    jindanAnimation('beat', '.full', 1000);
    var zaload = true;
    $('#danlist .full').on('click', function() {

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
            /*hdgg.storage.set('sui', suiArr);*/
        }
        dansuiSwitch = false;
        obj.removeClass('full').removeClass('beat');
        zaload = false;
        $(".chuizi").animate({
            top: eggOffset.top - 60,
            right: left - 140
        }, 800, function() {

            $(".chuizi").addClass('jiaoshui')
            $('.shui').css('display', 'block')
            setTimeout(function() {
                $(".jiaoshui").css({
                    '-webkit-transform': 'rotate(-20deg)',
                    'transform': 'rotate(-20deg)',
                    '-ms-transform': 'rotate(-20deg)',
                    '-moz-tranform': 'rotate(-20deg)'
                })
                obj.addClass('eggbreak');
                console.log(obj.attr('id') + 'ttttt')
                switch (obj.attr('id')) {
                    case '2':
                        setTimeout(function() {
                            $('.hongbaoyu').show().css({
                                'left': '5.2rem',
                                'top':'7rem'
                            })


                            setTimeout(function() {
                                $('.hongbaoyu').hide()
                            }, 1600)
                        }, 1200)

                        break;
                    case '3':
                        setTimeout(function() {
                            $('.hongbaoyu').show().css({
                                'left': '10.2rem',
                                'top':'7rem'
                            })


                            setTimeout(function() {
                                $('.hongbaoyu').hide()
                            }, 1600)
                        }, 800)

                        break;
                    case '4':
                        setTimeout(function() {
                            $('.hongbaoyu').show().css({
                                'left': '0rem',
                                'top':'12rem'
                            })
                            setTimeout(function() {
                                $('.hongbaoyu').hide()
                            }, 1600)
                        }, 800)

                        break;
                    case '5':
                        setTimeout(function() {
                            $('.hongbaoyu').show().css({
                                'left': '5.2rem',
                                'top':'12rem'
                            })
                            setTimeout(function() {
                                $('.hongbaoyu').hide()

                            }, 1600)
                        }, 800)

                        break;
                    case '6':
                        setTimeout(function() {
                            $('.hongbaoyu').show().css({
                                'left': '10.2rem',
                                'top':'12rem'
                            })
                            setTimeout(function() {
                                $('.hongbaoyu').hide()
                            }, 1600)
                        }, 800)

                        break;
                    case '7':
                        setTimeout(function() {
                            $('.hongbaoyu').show().css({
                                'left': '0rem',
                                'top':'16.8rem'
                            })
                            setTimeout(function() {
                                $('.hongbaoyu').hide()
                            }, 1600)
                        }, 800)

                        break;
                    case '8':
                        setTimeout(function() {
                            $('.hongbaoyu').show().css({
                                'left': '5.2rem',
                                'top':'16.8rem'
                            })
                            setTimeout(function() {
                                $('.hongbaoyu').hide()
                            }, 1600)
                        }, 800)

                        break;
                    case '9':
                        setTimeout(function() {

                            $('.hongbaoyu').show().css({
                                'left': '10.2rem',
                                'top':'16.8rem'
                            })
                            setTimeout(function() {
                                $('.hongbaoyu').hide()

                            }, 1600)
                        }, 800)

                        break;

                }
            }, 410)



            setTimeout(function() {
                $('.shui').css('display', 'none')
                $(".jiaoshui").css('-webkit-transform', 'rotate(0deg)')
                $(".chuizi").removeClass('jiaoshui')
                $(".chuizi").animate({
                    top: '7.0rem',
                    right: '0.4rem'
                }, 600)

            }, 1500)
            setTimeout(function() {
                alertCommon('https://hdggcdn.bayimob.com/base_img_path_hdggadv/5596/1556702467636_支付宝640-300.gif','恭喜获得支付宝现金红包');
                closeBtn();
                zaload = true;
            }, 1700);

            danindex = 0;
        });
    })
    $('body').on('click', '.m-close,.close-btn', function() {
        dansuiSwitch = true;
    })

    function jindanAnimation(aniClass, son, time) {
        var eggint = setInterval(function() {
            if (dansuiSwitch == true) {
                danindex = danindex == $('#danlist').find('.full').length ? 0 : danindex;
                // $('#danlist').find('.full').eq(danindex).addClass(aniClass).siblings(son).removeClass(aniClass);
                $('#danlist').find('.full').addClass('leftAndright')
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
        var strs =
            '<div class="popShowPrize" id="dialog5" style="display: block; transform-origin:0rem 0rem 0rem; opacity: 1; transform: scale(1, 1);"><div class="titles"></div><div class="leftHua"></div><div class="rightHua"></div><div class="caiguang"></div><div class="showPrize-dialog modal-body"><div class="red-bg"><div class="card-bg""><img class="resAd" src="' +imageUrl + '"></div><div class="detail"><div class="topic">' + advIntro +'</div><div class="goto"></div></div></div><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span></div></div>'
        $('body').append(strs);
        setTimeout(function() {
            $('.leftHua').animate({
                'left': '0rem'
            }, 400)
            $('.rightHua').animate({
                'right': '0rem'
            }, 400),
                $('.titles,.caiguang').css('display', 'block')

        }, 500)
        setTimeout(function() {
            $('#dialog5').append('<span id="close" class="close-btn closetc iconfont"></span>');
        }, 1500)
    }

    function closeBtn(res) {
        $('#dialog5').on('click', '.close-btn', function() {

            /*res.close();*/
            window.styleReset();
        })
    }
    window.styleReset = function() {
        $('#dialog5').addClass('hidden');
        $('#dialog5').remove();
    }
});
