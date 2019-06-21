/**
 * Created by Administrator on 2019/6/21.
 */
$(function(){
    var dian = true;
    var haveTime = true;
    var img_bao = "";
    var bbb = function () {
        img_bao = "https://hdggcdn.bayimob.com/hdggstatic/chehongbao/redbag3.gif?v=" + Date.now();
        var changeImg = new Image();
        changeImg.src = img_bao
    }
    bbb();
    $('.starta').on('click', function () {
        if (haveTime) {
            /*hdgg.storage.set('agoTime', new Date(new Date().toLocaleDateString()).getTime() / 1 + 86400000);*/
            haveTime = false;
        }
        if (!dian) {
            return;
        }
        /*var startC = hdgg.start();
         if (startC < 0) {
         return;
         }*/
        dian = false;
        $('.starta').hide();
        $('.DB_guide').hide();
        $('.xiangzi').addClass('add_chai_gif').css('background-image', 'url(' + img_bao + ')');
        setTimeout(function () {
            alertCommon('https://hdggcdn.bayimob.com/base_img_path_hdggadv/5596/1556702467636_支付宝640-300.gif','恭喜获得支付宝现金红包');
            closeBtn();
        }, 800);
    });

    function alertCommon(imageUrl, advIntro) {
        var strs = '<div class="popShowPrize" id="dialog5" style="display: block; transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);"><div class="caiguang"></div><div class="m-box"></div><div class="showPrize-dialog modal-body"><div class="dings"><div class="card-bg"><img src="' + imageUrl + '"></div><div class="title2"></div><div class="red-bg1"></div><div class="red-bg2"></div><div class="red-txt"></div><div class="detail"><div class="topic">' + advIntro + '</div><div class="goto"></div></div><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span><span class="ribbon"></span></div></div></div>'
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
        dian = true;
        $('.xiangzi').removeClass('add_chai_gif').css('background-image', 'url(image/redbag1.png)');
        $('.DB_guide').show();
        $('.starta').show();
        bbb();
    }
});