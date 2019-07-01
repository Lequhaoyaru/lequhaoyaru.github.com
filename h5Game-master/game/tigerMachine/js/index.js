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
                alertCommon('https://hdggcdn.bayimob.com/base_img_path_hdggadv/5596/1556702467636_支付宝640-300.gif');
                closeBtn();
            },4000);
            index++;
        }

    });

    function letGo(){
        TextNum1=parseInt(Math.random()*4);//随机数
        TextNum2=parseInt(Math.random()*4);
        TextNum3=parseInt(Math.random()*4);
        var num1=[-10,-105,-200,-290][TextNum1];//在这里随机
        var num2=[-290,-10,-105,-200][TextNum2];
        var num3=[-290,-10,-105,-200][TextNum3];
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
    function alertCommon(imageUrl) {
        var strs =
            `<div class="popShowPrize" id="dialog" style="display: block; transform-origin:0 0 0; opacity: 1; transform: scale(1, 1);">
            <div class="showPrize-dialog">
            <div class="cardBg">
            <img src="`+imageUrl+`" alt="" class="resAd">
            </div>
            <div class="receiveBtn"></div>
            <div class="closeBtn"></div>
            </div>
            </div>`;
        $('body').append(strs);
    }

    function closeBtn(res) {
        $('#dialog').on('click', '.closeBtn', function() {
            /*res.close();*/
            window.styleReset();
        })
    }
    window.styleReset = function() {
        $('#dialog').addClass('hidden');
        $('#dialog').remove();
    }
});
