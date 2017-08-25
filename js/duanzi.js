$(function() {
    //	顶部固定定位
    $(".close").click(function(){

        $(".app").css("display","none");
        $(".list-container").css("margin-top","3.5rem");
    });

    // 菜单栏选择
    $("#page li").click(function(){
        $("#page li").removeClass("active");
        $(this).addClass("active");

    });
	
	//	固定定位滑入滑出
//	$(function() {
//		$(window).scroll(function() {
//			if($(window).scrollTop() > 300) {
//
//				$("nav").slideUp(400);
//			} else {
//				$("nav").slideDown(400);
//			}
//		});
//	});
	
	var a=0,b= 0,c=0;
    $(window).scroll(function(e){
        if(c==0){
            c=1;
            b = $(this).scrollTop();
            if(b<100) {
                $("nav").slideDown(400);
            }
            else if(a<=b){
               $("nav").slideUp(400);
            }
            else{
                 $("nav").slideDown(400);
            }
            setTimeout(function(){a = b;c=0;},100);
        }
    });
//	点击换一换更新

    // dropload
    $('.list-container').dropload({
        scrollArea : window,
        domUp : {
            domClass   : 'dropload-up',
            domRefresh : '<div class="dropload-refresh">下拉后刷新</div>',
            domUpdate  : '<div class="dropload-update">释放后刷新</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>正在加载新内容...</div>',
            domNoData  : '<div class="dropload-noData">暂时没有新数据</div>'
        },
        domDown : {
            domClass   : 'dropload-down',
            domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>正在加载新内容...</div>',
            domNoData  : '<div class="dropload-noData">暂时没有新数据</div>'
        },
        loadUpFn : function(me){
            console.log("up fn",pagetype);
            if(pagetype=='content') {
                // 每次数据加载完，必须重置
                me.resetload();
                // 解锁loadDownFn里锁定的情况
                me.unlock();
                return;
            }

            var url = $('.list-container').data('url');
            $.ajax({
                type: 'POST',
                url: url,
                dataType: 'json',
                success: function(data){

                    maxtime = data['info']['maxtime'];
                    var result = '';
                    //获取item的id的值  放到数组中
                    var ids = [];
                    $(".item").each(function(){
                        ids.push($(this).attr("id"));
                    });
                    for(var i = 0; i < data['list'].length; i++){
                        if($.inArray(data['list'][i]['id'].toString(), ids) == -1 ){
                            result +=  makeitem(data['list'][i]);
                        }
                    }
                    if(result!==""){
                        $('.drop-ul').html(result);
                    }
                    // 为了测试，延迟1秒加载
                    setTimeout(function(){
                        // 每次数据加载完，必须重置
                        me.resetload();
                        // 解锁loadDownFn里锁定的情况
                        me.unlock();
                        if(result!=="") {
                            me.noData(false);

                            var data = $('.drop-ul').html();

                            sessionStorage.setItem(location.href,data);
                            sessionStorage.setItem(location.href+"_max",maxtime);
                            parseitem();
                        }
                        else {
                            me.noData(true);
                        }
                    },300);
                },
                error: function(xhr, type){
                  //  alert('Ajax error!');
                    // 即使加载出错，也得重置
                    me.resetload();
                }
            });
        },
        loadDownFn : function(me){
            console.log("down fn");

            var load = false;

            if(pagetype != "content" && maxtime == 0) {
                var list = sessionStorage.getItem(location.href);
                if(list) {
                    $('.drop-ul').html(list);
                    load  = true;
                    me.resetload();
                    maxtime = sessionStorage.getItem(location.href + "_max");
                    console.log("load from session");
                }
            }

            if(load == false){
                var url = $('.list-container').data('url');
                if(pagetype=='content') {
                    url = url +'?id='+id+'&src_ch='+src_ch;
                    if(lastcid!=='') {
                        url = url + '&lastcid=' + lastcid;
                    }
                }
                else {
                   if(maxtime !== 0) {
                        url = url + '?maxtime='+maxtime;
                   }
                }
                // 拼接HTML
                $.ajax({
                    type: 'POST',
                    url: url,
                    dataType: 'json',
                    success: function(data){
                        var result = '';
                        var ids = [];
                        var info;
                        if(pagetype=='list') {
                            maxtime = data['info']['maxtime'];
                            //获取item的id的值  放到数组中
                            $(".item").each(function(){
                                ids.push($(this).attr("id"));
                            });
                            info = data['list'];
                        }
                        else if(pagetype=='content') {
                            if(data['lastcid']!==undefined) {
                                lastcid = data['lastcid'];
                            }
                            //获取item的id的值  放到数组中
                            $(".comment-list .comment-item").each(function(){
                                ids.push($(this).attr("id"));
                            });
                            info = data['data'];
                        }
                        if(info !== undefined) {
                            for(var i = 0; i < info.length; i++){
                                if($.inArray(info[i]['id'].toString(), ids) == -1 ){
                                    result +=  makeitem(info[i]);
                                }
                            }
                            $('.drop-ul').append(result);
                        }
                        // 为了测试，延迟1秒加载
                        setTimeout(function(){
                            // 每次数据加载完，必须重置
                            me.resetload();
                            // 解锁loadDownFn里锁定的情况
                            me.unlock();
                            if(result!=="") {
                                me.noData(false);
                                if(pagetype!='content') {
                                    var data = $('.drop-ul').html();
                                    sessionStorage.setItem(location.href,data);
                                    sessionStorage.setItem(location.href+"_max",maxtime);
                                }
                                parseitem();
                            }
                            else {
                                me.noData(true);
                            }
                        },300);
                    },
                    error: function(xhr, type){
                        //alert('Ajax error!');
                        // 即使加载出错，也得重置
                        me.resetload();
                    }
                });
            }
        },
        threshold : 100
    });


    //点击回到顶部
    $(".gotop").click(function () {
        var speed=200;//滑动的速度
        $('body,html').animate({ scrollTop: 0 }, speed);
        return false;
    });

    parseitem();

    if(pagetype !="content"){
        sessionStorage.setItem("prevpage",window.location.href);
    }
});


var ua = get_ua();
var initPhotoSwipeFromDOM = function(gallerySelector) {
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {
            figureEl = thumbElements[i];

            if(figureEl.nodeType !== 1) {
                continue;
            }
            linkEl = figureEl.children[0];
            size = linkEl.getAttribute('data-size').split('x');
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };
            if(figureEl.children.length > 1) {
                item.title = figureEl.children[1].innerHTML;
            }
            if(linkEl.children.length > 0) {
                item.msrc = linkEl.children[0].getAttribute('src');
            }
            item.el = figureEl;
            items.push(item);
        }

        return items;
    };

    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        var eTarget = e.target || e.srcElement;
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });
        if(!clickedListItem) {
            return;
        }

        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) {
                continue;
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }

        if(index >= 0) {
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
            params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');
            if(pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;
        items = parseThumbnailElements(galleryElement);
        options = {
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
            getThumbBoundsFn: function(index) {
                var thumbnail = items[index].el.getElementsByTagName('img')[0],
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();
                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }

        };

        if(fromURL) {
            if(options.galleryPIDs) {
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        if( isNaN(options.index) ) {
            return;
        }

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};

function parseitem(){
    //	多图的高度处理
    initPhotoSwipeFromDOM('.my-gallery');
    //	视频播放
    $(".poster-page").each(function(){
        var url = $(this).data("url");
        var type = $(this).data("type");
        if(type!=1) {
            $(this).unbind("click");
            $(this).click(function(){
                $(this).css("display","none");
                $(".poster-page").not(this).css("display","block");
                $(this).next("div").next("div").prepend("<video class='upload-video'autoplay='true' webkit-playsinline='true'  src='"+url+"' type='video/mp4' controls='true'></video>");
                $(".poster-page").not(this).next("div").next("div").children().remove();
                var videoh = $(this).height();
                $(this).next("div").next("div").css("height",""+videoh+"px");
                $(".poster-page").not(this).next("div").next("div").removeAttr("style");
                $(".upload-video").trigger("play");
                /*视频结束*/
                $(this).next("div").next("div").find('.upload-video').bind('ended', function(){
                    $(this).css("display","none");
                    $(this).parent().prev().prev().css("display","block");
                    $(this).parent().prev().prev().find(".replay-mask").css("display","block")
                    $(this).parent().removeAttr("style");
                    $(this).remove();
                })
            });
            $(".upload-video").trigger("pause");
        }
        else {
            if(ua.bIsWindows) {
                $(this).unbind("click");
                $(this).click(function(){
                    $(".poster-page").not(this).css("display","block");
                    $(".poster-page").not(this).next("div").next("div").children().remove();
                    $(".poster-page").not(this).next("div").next("div").removeAttr("style");
                    $(this).next("div").next("div").prepend("<iframe id='video' frameborder='no' scrolling='no' marginwidth='0' marginheight='0' style='display: none;'></iframe>");
                    var videoh = $(this).height();
                    $("#video").attr('style' , 'border: 0px;height:'+videoh+'px;'); //如过不出样式可用注释内容试试。
                    $("#video").attr("src", player+"?src="+url);
                    $("#video").css("display", "block");
                    $(this).css("display","none");
                });
            }
            else if(ua.bIsIpad || ua.bIsIphoneOs)
            {
                if(ua.bIsSafari||ua.bIsWX) {
                    $(this).unbind("click");
                    $(this).click(function(){
                        redirect(player+"?src="+url,true);
                    });
                }
                else {
                    $(this).unbind("click");
                    $(this).click(function(){
                        $(".poster-page").not(this).css("display","block");
                        $(".poster-page").not(this).next("div").next("div").children().remove();
                        $(".poster-page").not(this).next("div").next("div").removeAttr("style");
                        $(this).next("div").next("div").prepend("<iframe id='video' frameborder='no' scrolling='no' marginwidth='0' marginheight='0' style='display: none;'></iframe>");
                        var videoh = $(this).height();
                        $("#video").attr('style' , 'border: 0px;height:'+videoh+'px;'); //如过不出样式可用注释内容试试。
                        $("#video").attr("src", player+"?src="+url);
                        $("#video").css("display", "block");
                        $(this).css("display","none");
                    });
                }
            }
            else
            {
                $(this).unbind("click");
                $(this).click(function(){
                    redirect(url,true);
                });
            }
        }
    });

    //  点赞
    $(".digg span").unbind("click");
    $(".digg span").click(function(){
        var url = $(this).data("url");
        var span = $(this);
        if(url !== undefined) {
            $.ajax({
                type:"POST",
                dateTyoe:"json",
                url:url,
                data:$("textarea").val(),
                success:function(data){
                    handleResponse(data,span,true);
                }
            })
        }
    })
    //  踩
    $(".bury span").unbind("click");
    $(".bury span").click(function(){
        var url = $(this).data("url");
        var span = $(this);
        $.ajax({
            type:"POST",
            dateTyoe:"json",
            url:url,
            data:$("textarea").val(),
            success:function(data){
                handleResponse(data,span,false);
            }
        });
    });

    //图片长图的处理
    $(".if-long").each(function(){
        var _this=$(this);
        if(_this.height() > 900){
            _this.parent().parent().css("height","500px");
            _this.parent().parent().css("overflow","hidden");
            _this.parent().next().css("display","block");
        }
        else {
            _this.unbind("load");
            _this.load(function(){
                if(_this.height() > 900){
                    _this.parent().parent().css("height","500px");
                    _this.parent().parent().css("overflow","hidden");
                    _this.parent().next().css("display","block");
                }
            });
        }
    });
    //点击取消分享
    $("#cancel").click(function(){
        $(".share-container").css("display","none");
    });

    //分享
    $(".share-item").unbind("click");
    $(".share-item").click(function(){
        console.log("share-item click");
        $(".share-container").css("display","block");
        var desc = $(this).parents(".footer").siblings(".content").find(".J-keyword").html();
        var pic_src = $(this).parents(".footer").siblings(".content").find(".img-wrapper").find("img").attr("src");
        var url = $(this).parents(".footer").siblings(".content").find("a").attr("href");

        var nativeShare = new NativeShare();
        var shareData = {
            title: '段子手',
            desc: desc,
            // 如果是微信该link的域名必须要在微信后台配置的安全域名之内的。
            link: url,
            icon: 'http://m.mlequ.net/img/icon.png',
            // 不要过于依赖以下两个回调，很多浏览器是不支持的
            success: function() {
                alert('success')
            },
            fail: function() {
                alert('fail')
            }
        };
        nativeShare.setShareData(shareData);

        function call(command) {
            try {
                nativeShare.call(command);
                $(".share-container").css("display","none");
            } catch (err) {
                // 如果不支持，你可以在这里做降级处理
                alert(err.message);
                $(".share-container").css("display","none");
            }
        }$(".share-container ul li>a").unbind("click");
        $(".share-container ul li>a").click(function(){
            var appName = $(this).data("app");
            call(appName);
        })
    });


    $("img.lazy").lazyload({
        placeholder : "/img/loading2.gif",
        effect: "fadeIn",
        threshold : 100
    });
}

function redirect(link,his){
    if(his) {
        window.history.pushState(null,null,window.location.href);
    }
    var arg ='\u003cscript\u003etop.location.replace("'+link+'")\u003c/script\u003e';
    var iframe = document.createElement('iframe');
    iframe.id = "videoframe";
    iframe.src='javascript:window.name;';
    //iframe.src = link;
    iframe.name=arg;
    document.body.appendChild(iframe);
}



function handleResponse(data,span,cai){
    if(data['code']==0){
        if(cai) {
            span.css("background-image","url(/img/dianzan_b.png)");
        }
        else {
            span.css("background-image","url(/img/cai_b.png)");
        }
        span.css("color","#ffc200");
        var num = parseInt(span.text());
        num++;
        span.text(num);
        span.removeData("url");
    }
}

function makeitem(item){
   var ret = '';
   if(pagetype=='list') {
   var hot="";
   if(item['ding']>=5000||item['repost']>=200) {
       hot = '<div class="msg_logo logo_hot"><img  src="/img/hot.png"/></div>';
   }
   else{
       var timestamp = ((new Date()).getTime() - 86400000)/1000;
       var create = Date.parse(item['created_at'])/1000;
       if(create>timestamp){
           hot = '<div class="msg_logo logo_new"><img  src="/img/new.png"/></div>';
       }
   }
   ret = '<li class="item" id="'+ item['id'] + '">'+hot +'<div class="header"><a class="users">' +
                '<img  class="avatar fl"  src="'+ item['profile_image']+'" alt="" onerror="this.style.display=\'none\';this.src=\'/img/head.jpg\';this.onload=function(){this.style.display=\'\';}">'+
                    '<span class="author-name fl">'+ (item['name']?item['name']:'匿名用户')+'</span></a></div><div class="content">' +
                '<div class="text-wrapper"><a href="'+home+'/content/'+item['src_ch']+'/'+item['id']+'">' +
                       '<p class="J-keyword">'+item['text']+'</p></a></div>';

            if(  item['videouri'] !== null && item['videouri'] !== undefined && item['videouri'] !== '' ) {
                ret = ret +'<div class="video-container">' +
                    '<div class="poster-page"  data-url="'+item['videouri']+'" data-play="/play" data-type="'+item['src_ch']+'">' +
                        '<a class="poster-link" ><div class="wrapper img-wrapper">' +
                                '<img class="lazy poster" alt="视频展示图片"  src="'+item['image2']+'" >'+
                                    '<div class="play-btn"></div><div class="desc ">' +
                                        '<p class="play-count fl"><span>'+item['playcount']+'</span>次播放</p>' +
                                        '<p class="duration fr">'+item['videotime']+'秒</p></div><div class="replay-mask"><p class="video-mask"></p>' +
                                        '<div class="replay-box"><span class="replay-btn">重播</span><span class="replay-download">更多精彩视频</span>' +
                        '</div></div></div></a></div><div class="video-loading"></div><div class="player-container" ></div></div>';
            }
            else if(item['image_list'] !== null && item['image_list'] !== undefined && item['image_list'] !== '' && item['image_list'].length>0) {
                ret = ret +'<section class="media"><div class="my-gallery media-imgs" itemscope>';
                for(var i=0;i<item['thumb_list'].length;i++) {
                ret = ret +'<figure itemprop="associatedMedia" itemscope class="media-img">' +
                    '<a href="'+item['image_list'][i]['url']+'" itemprop="contentUrl" data-size="'+item['image_list'][i]['width']+'x'+item['image_list'][i]['height']+'">'+
                        '<img src="'+item['thumb_list'][i]['url']+'" itemprop="thumbnail" /></a></figure>';
                }
                ret = ret +'</div><div class="pswp" tabindex="-1" role="dialog" aria-hidden="true"><div class="pswp__bg"></div>' +
                    '<div class="pswp__scroll-wrap"><div class="pswp__container"><div class="pswp__item"></div><div class="pswp__item"></div>'+
                    '<div class="pswp__item"></div></div><div class="pswp__ui pswp__ui--hidden"><div class="pswp__top-bar">'+
                    '<div class="pswp__counter"></div><button class="pswp__button pswp__button--close" title="Close (Esc)"></button>'+
                    '<button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button><div class="pswp__preloader">'+
                    '<div class="pswp__preloader__icn"><div class="pswp__preloader__cut"><div class="pswp__preloader__donut"></div>'+
                    '</div></div></div></div><div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">'+
                    '<div class="pswp__share-tooltip"></div></div><button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>'+
                    '<button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button><div class="pswp__caption">'+
                    '<div class="pswp__caption__center"></div></div></div></div></div></section>';
            }
            else if(item['image2'] !== null && item['image2'] !== undefined && item['image2'] !== '') {
                ret = ret + '<div class="img-wrapper-outer "><div class="img-wrapper">' + (item['is_gif']==1?'<div class="gif_logo"><img src="/img/gif.png"/></div>':'')+
                    '<a href="/m/content/'+item['src_ch']+'/'+item['id']+'">' +
                '<img class="upload-img if-long lazy" data-original="'+item['image2']+'" alt="" ></a>' +
                '<div class="long-img-bg"><a href="/m/content/'+item['src_ch']+'/'+item['id']+'"><span>点击查看长图</span></a>' +
                '</div></div></div>';
            }
            ret = ret + '</div>';

            if(item['top_cmt'] !== null && item['top_cmt'] !== undefined && item['top_cmt'] !== '' && item['top_cmt'].length >0) {
                ret = ret + '<div class="best-comments"><div class="header"><span>神评论</span></div>' +
                        '<ul>';
                $.each(item['top_cmt'], function(index, top_cmt, array) {
                    //console.log(arr[index]==val);  // ==> true
                    ret = ret + '<li><div><a><img class="avatar fl"  src="'+top_cmt['user']['profile_image'] +'" alt="" onerror="this.style.display=\'none\';this.src=\'/img/head.jpg\';this.onload=function(){this.style.display=\'\';}">' +
                                '<span class="name">'+top_cmt['user']['username']+'</span></a>' +
                                '<span class="digg digg-comment ">'+top_cmt['like_count']+'</span></div><div>' +
                                '<p>'+top_cmt['content']+'</p></div></li>';
                });
                ret = ret + '</ul></div>';
            }
                        <!--赞  踩  评论  转发-->
            ret = ret + '<div class="footer"><ul class="act-list "><li class="digg-item"><a  class="action-btn digg  ">' +
                  '<span  class="action-count">'+(item['ding']<=10000?item['ding']:((item['ding']/10000).toFixed(1)+'万'))+'</span></a></li><li class="bury-item"><a  class="action-btn bury">' +
                  '<span class="action-count">'+item['cai']+'</span></a></li><li class="comment-item">' +
                  '<a  class="action-btn  comment " href="/m/content/'+item['src_ch']+'/'+item['id']+'">' +
                  '<span  class="J-comments-count action-count">'+item['comment']+'</span></a></li>' +
                  '<li class="share-item"><a  class="action-btn "><span class="share action-count">'+item['repost']+
                  '</span></a></li></ul></div></li>';

    }
   else if(pagetype == 'content') {
        ret = '<li class="comment-item" id="'+item['id']+'"><div class="comment-wrapper"><div class="header"><a>' +
                   '<img class="avatar" src="'+item['user']['profile_image'] +'" alt="" onerror="this.style.display=\'none\';this.src=\'/img/head.jpg\';this.onload=function(){this.style.display=\'\';}">' +
                   '<div class="name-time-wrapper"><p class="name">'+item['user']['username']+'</p></div></a><div class="digg digg-comment" >'+ item['like_count']+'</div>' +
                   '</div><p class="content">'+item['content']+'</p></div></li>';
    }
    return ret;
}

function openapp(){
    if(ua.bIsIpad || ua.bIsIphoneOs) {
        window.location = "duanzishouapp:open";
        setTimeout(
            function(){
                window.location="itms-apps://itunes.apple.com/cn/app/qq-2011/id1264501441?mt=8";
            }, 30);
    }
    else {
        window.location = home;
    }
}

function goback(){
    var prevpage = sessionStorage.getItem("prevpage");
    if(prevpage){
        window.history.back();
    }else{
        window.location.href = prev;
    }
}

function get_ua() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var a={};
    a.bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    a.bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    a.bIsMidp = sUserAgent.match(/midp/i) == "midp";
    a.bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    a.bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    a.bIsAndroid = sUserAgent.match(/android/i) == "android";
    a.bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    a.bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    a.bIsWX=sUserAgent.match(/MicroMessenger/i)=="micromessenger";
    a.bIsWindows = sUserAgent.match(/Win/i)=="win";
    a.bIsSafari = (sUserAgent.match(/Safari/i)=="safari") && (sUserAgent.match(/MQQBrowser/i)!="mqqbrowser");
    return a;
}



