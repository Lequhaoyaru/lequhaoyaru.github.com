$(function(){
    var $mask = $("#mask"),
        $winning = $(".winning"),
        $btn = $("#startBtn"),//游戏按钮
        $hook = $("#hook"),
        $hookWidth = $hook.width(), //钩子
        data = {count: 8},//次数
        rem = 75,
        bool = true,
        times,
        $behindList = $(".behind li"),
        $behindListPig = $(".behind li img"),
        $frontList = $(".front li"),
        $frontListPig = $(".front li img"),
        $pigWidth = $behindListPig.eq(0).width(),
        $behindLefts = function(){
            var $array = [];
            for (var i = 0; i < $behindListPig.length; i++) {
                $array.push($behindListPig.eq(i).position().left + $pigWidth/2);
            }
            return $array;
        }(),
        $frontLefts = function(){
            var $array = [];
            for (var i = 0; i < $frontListPig.length; i++) {
                $array.push($frontListPig.eq(i).position().left + $pigWidth/2);
            }
            return $array;
        }();
    $behindList.css("width", ($(".behind ul").width())*0.3333 + "px");
    $frontList.css("width", ($(".front ul").width())*0.3333 + "px");
    $btn.on('click',function(){
        if (!bool) return;
        if (data.count <= 0) {
            alert("没有次数了");
            return;
        }
        bool = false;
        data.count--;
        $("#countZa").html(data.count);
        var random = parseInt(Math.random() * 675 + 225);//130 - 620之间随机，因为这两个值是左右边界
        $(".left,.right").addClass("up");//张开钩子

        $hook.animate({left: random / rem + "rem"}, 1000);//左右值
        clearTimeout(times);
        if (random%2 == 1) {//上面
            $hook.animate({top: "-3.6rem"}, 1000);
            times = setTimeout(function () {
                var index = reback($behindLefts);
                !$hook.find("img").length && $hook.append($behindListPig.eq(index));//如果未抓取到福袋才抓取

                $hook.animate({top: "-6.3rem"}, 1000, function () {
                    win();
                    $behindList.eq(index).append($behindListPig.eq(index));//把福袋放回原位
                    index = undefined;
                });
            }, 2000);

        } else {//下面
            $hook.animate({top: "-0.6rem"}, 1000);
            times = setTimeout(function () {
                var index = reback($frontLefts);
                !$hook.find("img").length && $hook.append($frontListPig.eq(index));//如果未抓取到福袋才抓取
                $hook.animate({top: "-6.3rem"}, 1000, function () {
                    win();
                    $frontList.eq(index).append($frontListPig.eq(index));//把福袋放回原位
                    index = undefined;
                });
            }, 2000);
        }
    });

    function reback(array){
        var cerNum = $hook.position().left;
        var index = 0;
        var dValue = Math.abs(cerNum - array[0]);
        for(var i = 0;i < array.length;i++) {
            if(dValue > Math.abs(cerNum - array[i])){
                dValue = Math.abs(cerNum - array[i]);
                index = i;
            }
        }
        return index;
    };

    function win() {
        //遮罩层显示
        $mask.show();
        $winning.addClass("reback");
        //关闭弹出层
        $("#close").click(function () {
            bool = true;
            $(".left,.right").removeClass("up");
            $hook.animate({left:"50%"},0);
            $mask.hide();
            $winning.removeClass("reback");
        });

    }
});
