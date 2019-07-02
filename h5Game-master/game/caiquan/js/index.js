$(function(){
   var $Top = $(".top img"),
       $Down = $(".down img"),
       $start = $(".active ul li"),
       data = {count: 8},
       imgArr = ['./image/shitou1.png','./image/jianzi1.png','./image/bu1.png'],
       timer = null,timer1 = null,
       bool = true,
       $mask = $("#mask"),
       $winning = $(".winning"),
       times = 5;
       $("#time").html(times<10?'0'+times:times);

       $start.on('click',function(){
           if (!bool) return;
           if (data.count <= 0) {
               alert("没有次数了");
               return;
           }
           bool = false;
           data.count--;
           $("#countZa").html(data.count);
           $(this).addClass("light");
           var p1Point = $(this).attr("point");
           var _index=0;
           timer = setInterval(function(){
               $Top.attr('src',imgArr[(_index++)%3]);
               $Down.attr('src',imgArr[(_index++)%3]);
           },300);
           timer1 = setInterval(function(){
               times--;
               $("#time").html(times<10?'0'+times:times);
               if(times <= 0) {
                   clearInterval(timer1);
                   clearInterval(timer);
                   var p2Point = parseInt(Math.random()*3);
                   $Top.attr('src',imgArr[p2Point]);
                   $Down.attr('src',imgArr[p1Point]);
                   var differ = verdict(p1Point,p2Point);
                   switch(differ){
                       case 1:
                           win("win");
                           break;
                       case -1:
                           win("lose");
                           break;
                       default:
                           win("ping");
                   }
               }
           },1000);

       });

       function verdict(p1Point,p2Point){
           var differ = p1Point - p2Point;
           if(differ == 0){
               return 0;
           }else if(differ == -1||differ == 2){
               return 1; //玩家赢了
           }else {
               return -1; //电脑赢了
           }
       }
       function win(className) {
            //遮罩层显示
            $mask.show();
            $winning.addClass(className).addClass("reback");
            //关闭弹出层
            $("#close,.okBtn").click(function () {
                bool = true;
                $mask.hide();
                $start.removeClass("light");
                $winning.removeClass("reback").removeClass("win").removeClass("lose").removeClass("ping");
                times = 5;
                $("#time").html(times<10?'0'+times:times);
            });

        }

});
