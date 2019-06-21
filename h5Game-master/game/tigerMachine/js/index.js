$(function(){
    var flag=false;
    var index=0;
    var TextNum1;
    var TextNum2;
    var TextNum3;
    $(".startBT").click(function () {
        if(!flag){
            flag=true;
            reset();
            letGo();
            setTimeout(function () {
                flag=false;
                alertCommon('https://hdggcdn.bayimob.com/base_img_path_hdggadv/5596/1556702467636_支付宝640-300.gif','恭喜获得支付宝现金红包');
                closeBtn();
            },4000);
            index++;
        }

    });

    function letGo(){
        TextNum1=parseInt(Math.random()*4);//随机数
        TextNum2=parseInt(Math.random()*4);
        TextNum3=parseInt(Math.random()*4);
        var num1=[-15,-105,-195,-285][TextNum1];//在这里随机
        var num2=[-285,-15,-105,-195][TextNum2];
        var num3=[-285,-15,-105,-195][TextNum3];
        $(".num-con1").animate({"top":-270},1000,"linear", function () {
            $(this).css("top",0).animate({"top":num1},1000,"linear");
        });

        $(".num-con2").animate({"top":-270},1000,"linear", function () {
            $(this).css("top",0).animate({"top":num2},1800,"linear");
        });

        $(".num-con3").animate({"top":-270},1000,"linear", function () {
            $(this).css("top",0).animate({"top":num3},1300,"linear");
        });

    }

    function reset(){
        $(".num-con1,.num-con2,.num-con3").css({"top":-10});
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
