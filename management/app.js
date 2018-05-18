window.lequ = window.lequ || {};
lequ.locale = lequ.locale ||{};

lequ.admin = {
    initSidebar:function(data){

    },
    postData:function(url){
        $.ajax({
            type: 'POST',
            url: url,
            dataType: 'json',
            headers: {
                'X-CSRF-TOKEN': $('input[name="_token"]').val()
            },
            success: function(data){
                console.log("success",data);
                if(data['ret']==0) {
                    if(data.hasOwnProperty('charts')) {
                        refresh(data['charts']);
                    }
                }
            },
            error: function (request, status, error) {
                console.log(request.status + ", " + status + ", " + error);
            }
        });
    }
}

lequ.locale.chartist = {
    color:['ct-color-a','ct-color-b','ct-color-c','ct-color-d','ct-color-e','ct-color-f','ct-color-g','ct-color-h',
        'ct-color-i','ct-color-j','ct-color-k','ct-color-l','ct-color-m','ct-color-n','ct-color-o'],
    options:{
        line: {
            showArea: false,
            height: "245px",
            low:0,
            lineSmooth: Chartist.Interpolation.simple({
                divisor: 5
            }),
            axisX: {
                showGrid: false,
                labelInterpolationFnc: function(value, index) {
                    return index % 2 === 0 ?  value : null;
                }
            },
            onlyInteger: false,
            showLine: true,
            showPoint: false
        },
        bar:{
            axisX: {
                showGrid: false
            },
            axisY: {
                onlyInteger: true
            },
            height: "245px"
        }
    },
    responsiveOptions:{
        line: [
            ['screen and (max-width: 640px)', {
                showGrid: false,
                showPoint: false,
                axisX: {
                    labelInterpolationFnc: function(value, index) {
                        if(index % 4 === 0){
                            ret = value.split(":");
                            return ret[0] +"\r\n"+ret[1];
                        }
                        else return null;
                    }
                }
            }]
        ]
    }
};
