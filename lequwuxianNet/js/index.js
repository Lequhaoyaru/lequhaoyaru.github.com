$(function(){
    $('.parallax-window').parallax();


    var $services = $(".service li");
    var $partners = $(".partner ul li");
    var $servicesTop = $(".service").offset().top;
    var $partnersTop = $(".partner ul").offset().top;
    var $Height = $(window).height();
    var $Width = $(window).width();

    $(document).on("scroll",slide);
    slide();
    function slide(){
        var scrollTop = $(document).scrollTop();
        if($servicesTop - scrollTop <= $Height){
            if(!$services.hasClass("animated")){
                $services.addClass("animated");
                $services.eq(0).addClass("fadeInDown");
                $services.eq(1).addClass("fadeInUp");
                $services.eq(2).addClass("fadeInDown");

            }
        }
        if($partnersTop - scrollTop <= $Height){
            if(!$partners.hasClass("animated")){
                $partners.addClass("animated").addClass("fadeInUp");
            }
        }
    }
});
