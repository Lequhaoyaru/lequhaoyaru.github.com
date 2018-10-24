$(function() {
    $("#content").load(function(){
        if($('input[name="_token"]').length > 0){
            var ticker = setInterval(function() {
                clearInterval(ticker);
                var options = {
                    type: "POST",
                    url: $('input[name="_hash"]').val(),
                    headers: {
                        'X-CSRF-TOKEN': $('input[name="_token"]').val()
                    },
                    success: function(data) {},
                    error: function (request, status, error) {
                        console.log(request.status + ", " + status + ", " + error);
                    }
                };
                jQuery.ajax(options);
            },
            5000);
        }
    });
    if($("#content").height()<800){
        $("#spread").css("display","none");
    }
});


function closeheader(){
    $(".header").slideUp(500);
    $("#content").css("padding-top","0px");
}
function spread(target){
    $(target).css("display","none");
    $("#content").css("maxHeight","none");
}

function createImgEle(data,type){
    console.log(data[type]);
    $("a[href^='bytedance']").each(function(index){
        var _this = this;
        /*$(_this).attr('href','javascript:native_call(JSON.stringify({cmd:204,data:JSON.stringify('+index+')}));');*/
        var i=0;
        if(data[type][index]['url_list']){
            var imgEle = $('<img class="lazy"/>');
            imgEle.attr("data-original",data[type][index]["url_list"][0]["url"]);
            imgEle.attr("src",data[type][index]["url_list"][1]["url"]);
            $(_this).append(imgEle);
        }
    });
}


//base64加密、解密
function Base64() {

    // private property
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }

    // public method for decoding
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }

    // private method for UTF-8 encoding
    _utf8_encode = function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    // private method for UTF-8 decoding
    _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while ( i < utftext.length ) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}

//创建video标签
function createVideoEle(videoSrc){
    var base = new Base64();
    $(".custom-video").css({"position":"relative","width":"100%"});
    var data = $(".custom-video").data();
    var videoEle = $('<video id="media" controls="controls"></video>').attr("poster",data.poster).css({"width":"100%"}).attr("src",base.decode(videoSrc));
    $(".custom-video").append($(videoEle));

}
//获取video的地址
function getVideoSource(video_id){
    var videoSource = {};
    var hosts = ['http://ib.365yg.com','http://is.snssdk.com'];
    //Math.round(Math.random())  随机取0或1
    var host = hosts[Math.round(Math.random())];
    var url = "/video/urls/v/1/toutiao/mp4/"+video_id+"?r="+Math.random()*89999999999999999+10000000000000000;
    var crc = CRC32.str(url);

    var invite = {
        type: "GET",
        url: host+url+"&s="+crc,
        dataType: 'jsonp',
        crossDomain: true,
        success: function (data) {
            if(data.code == 0){
                console.log('videoSource',data.data);
                console.log('videoSource1',data.data["video_list"]["video_1"]["main_url"]);
                createVideoEle(data.data["video_list"]["video_1"]["main_url"]);
            }

        },
        error: function (request, status, error) {
            console.log(request.status + ", " + status + ", " + error);
        }
    };
    jQuery.ajax(invite);
}