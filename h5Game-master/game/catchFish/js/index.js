startFloat();
function startFloat() {
    var i, h, t, s = 375 * window.remscale || document.documentElement.clientWidth || document.body.clientWidth,
        e = Math.ceil(3 * Math.random());

    i = 'image/bao.png',
        t = 'image/bi.png',
        h = 'image/pao.png',
        $(".floats").append(2 == e ? '<div class="float item row' + e + '" data-type="bottle"><img src="' + i + '"/></div>' : '<div class="float item row' + e + '" data-type="chest"><img src="' + t + '"/></div>');
    var a = s + "px,0,0";
    if(e==2) {
        $('#showping').attr('src','image/bao.png')
    }else {
        $('#showping').attr('src','image/bi.png')
    }
    $(".float").last().animate({
        left: "18.75rem"
    }, 5e3, "linear", function () {
        $(this).remove()
    }),
        timer = setTimeout(function () {
            startFloat()
        }.bind(this), 1200)
}

function clickStart() {
    var startC = 8;
    var hideYu = true;
    if (startC < 0) {
        return;//没有抽奖机会了
    }
    $('.start').hide();
    $('.DB_guide').hide();
    $('.fish-container').addClass('ani-pole');
    setTimeout(function () {
        $('#showping').show();
        var leftg = $('.fishnet').offset().left;
        var topg = $('.fishnet').offset().top;
        var solos = $('.floats').find('div');

        var indexda = '';
        for (var i = 0; i < solos.length; i++) {
            var middleX = solos.eq(i).offset().left;

            if (middleX > 100 && middleX < 165) {
                indexda = solos.eq(i).attr('indexdata');
                if (hideYu == true) {
                    solos.eq(i).hide();
                    hideYu == false;
                }

            }
        }
    }, 500);
    setTimeout(function () {
        $(".popShowPrize").css('display','block');
        alertCommon('https://hdggcdn.bayimob.com/base_img_path_hdggadv/5596/1556702467636_支付宝640-300.gif','恭喜获得支付宝现金红包');
        closeBtn();
        hideYu == true;
        $('.start').show();
        $('.DB_guide').show();
        $('#showping').hide();
        $('.fish-container').removeClass('ani-pole');
    }, 1000)

}

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
        $('#dialog5').addClass('hidden');
        $('#dialog5').remove();
    })
}
