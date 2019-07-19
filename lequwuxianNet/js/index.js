$(function(){
    var mySwiper = new Swiper('#banner',{
        loop: true,
        speed:600,
        grabCursor : true,
        parallax:true,
        autoplay:{
            delay: 3000,
            //loop无效  stopOnLastSlide: true,
        },
        pagination: {
            el:'.swiper-pagination',
            clickable :true,
        },
        /*navigation: {
            nextEl: '.arrow-right',
            prevEl: '.arrow-left',
        },*/
    });
    $('.parallax-window').parallax();

    var $services = $(".service li");
    var $partners = $(".partner ul li");
    $(document).on("scroll",function(){
        var scrollTop = $(document).scrollTop();
        console.log(scrollTop);
        if(scrollTop >= 900){
            if(!$services.hasClass("animated")){
                $services.addClass("animated");
                $services.eq(0).addClass("fadeInDown");
                $services.eq(1).addClass("fadeInUp");
                $services.eq(2).addClass("fadeInDown");

            }
        }
        if(scrollTop >= 3400){
            if(!$partners.hasClass("animated")){
                $partners.addClass("animated").addClass("fadeInUp");
            }
        }
    })
});
