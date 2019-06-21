
$(function () {
    var num = 0;
    var numz = 4;
    var backward = function () {
        numz--;
        if (numz > 0) {
            $(".backward span").html(numz);
        } else {
            $(".backward").hide();
            return;
        }
        setTimeout(backward, 500)
    };
    var ads = true;

    $('.guang').on('click', function (e) {
        e.stopPropagation();
    });
    window.styleReset = function () {
        $('#dialog5').addClass('hidden');
        $('#dialog5').remove();
        flag = true;
    };
    var flag = true;
    $('.hongbaoWrap').on('click','li',function () {
        if (!flag) {
            return
        }
        alertCommon('https://hdggcdn.bayimob.com/base_img_path_hdggadv/5596/1556702467636_支付宝640-300.gif','恭喜获得支付宝现金红包');
        closeBtn();
        flag = false;
    });


    var win1 = (parseInt($(".hongbaoWrap").width())) - 60;
    var add = function () {
        var hb = parseInt(Math.random() * (3 - 1) + 1);
        var Wh = parseInt(Math.random() * (70 - 30) + 20);
        var Left = parseInt(Math.random() * (win1 - 0) + 0);
        var rot = (parseInt(Math.random() * (45 - (-45)) - 45)) + "deg";
        if (ads == true) {
            num++;
            $(".hongbaoWrap").append("<li class='li" + num + "' ><a href='javascript:;'><img src='https://hdggcdn.bayimob.com/hdggstatic/moneyhb_" + hb + ".png'></a></li>");
            $(".li" + num).css({
                "left": Left,
            });
            $(".li" + num + " a img").css({
                "width": Wh,
                "transform": "rotate(" + rot + ")",
                "-webkit-transform": "rotate(" + rot + ")",
                "-ms-transform": "rotate(" + rot + ")",
                "-moz-transform": "rotate(" + rot + ")",
                "-webkit-transform": "rotate(" + rot + ")",
                "-o-transform": "rotate(" + rot + ")"
            });
            $(".li" + num).animate({
                'top': $(window).height() + 20
            }, 4800, function () {
                this.remove()
            });
        } else {
            $(".hongbaoWrap").empty();
            return;
        }
        setTimeout(add, 350)
    };

    $(".backward").show();
    setTimeout(backward, 100);
    setTimeout(function () {
        $('.guang').show();
    }, 1500);
    setTimeout(add, 1500);

    function alertCommon(imageUrl, advIntro) {
        var strs = '<div class="popShowPrize" id="dialog5" style="display: block; transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);"><div class="caiguang"></div><div class="m-box"></div><div class="showPrize-dialog modal-body"><div class="red-bg"><div class="card-bg""><img class="resAd" src="' + imageUrl + '"></div><div class="detail"><div class="topic">' + advIntro + '</div><div class="goto"></div></div></div><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span></div></div>'
        $('body').append(strs);
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
        flag = true;
    };
});
