
requirejs(['config'],function(){
    requirejs(['jquery'],function($){
        // load(url,[data],[callback]) 载入远程 HTML 文件代码并插入页面中。
        $('#header').load('http://localhost:9393/html/commonHtml.html .head',function(){
            $(this).find('.orders').on('mouseenter','li',function(){
                $(this).find('div').css({
                                        'display':'block',
                                        'z-index':2
                                    })
            }).on('mouseleave','li',function(){
                $(this).find('div').css('display','none');
            })
        });
        $('#navTop').load('http://localhost:9393/html/commonHtml.html .navT',function(){
            $(this).find('.search').focus(function(){
                $(this).attr('placeHolder','');
            }).blur(function(){
                $(this).attr('placeHolder','请输入您想要搜索的关键字');
            })
            $(this).find('button').click(function(){
                // http://www.newegg.cn/Search.aspx?keyword=%u624B%u673A
                // $.ajax(settings)

                // type:请求类型，默认GET
                // url:数据请求地址（API地址）
                // data:发送到服务器的数据对象，格式：{Key:value}。
                // success:请求成功时回调函数。
                // dataType:设定返回数据的格式，json, jsonp, text(默认), html, xml, script
                // async：是否为异步请求，默认true
                var val = $(this).prev('.search')[0].value;
                if($.trim(val) === ''){
                    return;
                }
                $.ajax({
                        'type':'post',
                        'url':'http://www.newegg.cn/Search.aspx?keyword=',
                        'data':{'keyword':val},
                        success:function(res){
                            console.log(res);
                        },
                        'dataType':'html'
                })
            })
        });
        $('#navBtm').load('http://localhost:9393/html/commonHtml.html .navB',function(){
            var timer;
            $(this).find('.navSec').removeClass('hide');
            $(this).find('.navList').on('mouseenter','li',function(){
                $(this).css({'backgroundColor':'#295DD7',opacity:0.3}).stop().animate({'opacity':1});
            }).on('mouseleave','li',function(){
                $(this).css({'backgroundColor':'','opacity':0.3}).stop().animate({'opacity':1});
            })
            $('.cartTips').on('mouseenter','li',function(){
                $(this).find('p').removeClass('hide');

            }).on('mouseleave','li',function(){
                $(this).find('p').addClass('hide');
            })
            var disTop;
            $('.navSec').on('mouseenter','li',function(){
                disTop = $(this).find('.navThird').position().top;
                console.log(disTop)
                var setTop = ($(this).parents('.navSec').position().top)-$(this).outerHeight();
                timer = setTimeout(()=>{
                    $(this).siblings().css('backgroundColor','#F2F2F2');
                    $(this).find('.navThird').css('display','block').stop().animate({'top':setTop}).parent().siblings().find('.navThird').css('display','none');
                },500)
            }).on('mouseleave','li',function(){
                    $(this).siblings().css('backgroundColor','');
                    clearTimeout(timer);
                    $(this).find('.navThird').css({'display':'none',
                                                    'top':0    
                                                });
            })
        });
        $('#userHead').load('http://localhost:9393/html/commonHtml.html .userH',function(){
            $(this).find('.orders').on('mouseenter','li',function(){
                $(this).find('div').css({
                                        'display':'block',
                                        'z-index':2
                                    })
            }).on('mouseleave','li',function(){
                $(this).find('div').css('display','none');
            })
        });
        $('#myLinks').load('../html/commonHtml.html .mylink'); 
        $('#footer').load('../html/commonHtml.html .foot');
    })
});

requirejs(['config'],function(){
    requirejs(['jquery','conmon','comHtmljs'],function($,m){
        $('#welcomeArea').load('../html/commonHtml.html .userTop',function(){
            $(this).find('h2').text('新用户注册');
        });

        var $phone = $('#phoneNum');
        var $code = $('#code');
        // 生成随机4位验证码;
        var arrCode = [];
        for(var i = 48;i < 122;i++){
            if(i >= 48 && i <= 57){
               arrCode.push(String.fromCharCode(i));
            }else if(i >= 97 && i <= 122){
                arrCode.push(String.fromCharCode(i));
            }else if(i >= 65 && i <= 90){
                arrCode.push(String.fromCharCode(i));
            }
        }
        createCode(arrCode,getCode);
        function createCode(arrCode,fn){
            var len = arrCode.length;
            var resCode = '';
            for(var i = 0;i < 4;i++){
                resCode += arrCode[Math.round(Math.random()*(arrCode.length-1))];
            }
            fn(resCode);
        }
        function getCode(res){
            var rgb = randomColor();
            $code.siblings('span').text(res).css('color',rgb).siblings('a').click(function(){
                createCode(arrCode,getCode);
            });
        }
        var nextStep = {
            inp1:false,
            inp2:false,
            inpMail:false
        }
        // 验证手机号码;
        $phone.blur(function(){
            var val = this.value;
            if(/^1[34578]{1}\d{9}$/.test(val)){
                $(this).siblings('.glyphicon-ok-circle').removeClass('hide').siblings('.glyphicon-remove-sign').addClass('hide');
                nextStep.inp1 = true;
            }else{
                $(this).siblings('.glyphicon-remove-sign').removeClass('hide').siblings('.glyphicon-ok-circle').addClass('hide');
                nextStep.inp2 = false;
            }  
            
        });
        // 验证验证码;
        $code.blur(function(){
            var val = this.value;
            // 设置正则,不区分大小写;
            var code = $(this).siblings('span').text().toLowerCase();
            var reg = new RegExp(code,'i');
            if(reg.test(val)){
                $(this).siblings('.glyphicon-ok-circle').removeClass('hide').siblings('span').hide().siblings('a').hide();
                $(this).parents('p').next('.notOk').addClass('hide');
                nextStep.inp2 = true;
            }else{
                createCode(arrCode,getCode);    
                $(this).parents('p').next('.notOk').removeClass('hide');
                nextStep.inp2 = false;
            }
        })
        $('button').click(function(){
            if(nextStep.inp1 && nextStep.inp2){
                $('.regStep').children('img').css({
                    top:-75,
                    left:0
                });
                $('.regCont').children('.step1').addClass('hide').siblings('.step2').removeClass('hide');
            }else{
                return false;
            }
        })
        // 验证登录密码;
        $('#logPsd').blur(function(){
            var val = this.value;
            nextStep.inp1 = true;
            if((/^\d{8,16}|[a-z]{8,16}$/i).test(val)){
                $('.padLen').removeClass('hide').css({
                    'width':30,
                    'background':'green'
                }).siblings('.pos').addClass('hide');
            }else if((/^[0-9a-z]{8,}[\.\/\,\$]{2,}$/i).test(val) && val.length<=16){
                console.log(val)
                $('.padLen').removeClass('hide').css({
                    'width':90,
                    'background':'#F55B17'
                }).siblings('.pos').addClass('hide');

            }else if((/^[0-9a-z]{8,}$|^[0-9a-z]{7,}[\.\/\,\$]+$/i).test(val) && val.length<=16){
                $('.padLen').removeClass('hide').css({
                    'width':60,
                    'background':'#765283'
                }).siblings('.pos').addClass('hide');
            }else{
                $('.padLen').addClass('hide').siblings('.pos').removeClass('hide');
                nextStep.inp1 = false;
            }
        })
        //验证两次密码是否一致; 
        $('#rePsd').blur(function(){
            var val = this.value;
            if(val !== $('#logPsd')[0].value){
                $(this).siblings('.pos').removeClass('hide').siblings('.glyphicon-ok-circle').addClass('hide');
                nextStep.inp2 = false;
            }else{
                $(this).siblings('.glyphicon-ok-circle').removeClass('hide').siblings('.pos').addClass('hide');
                nextStep.inp2 = true;
            }
        })
        $('button').click(function(){
            var check = $('.check').find('input')[0].checked;
            if(nextStep.inp1 && nextStep.inp2 && check){
                $('.regStep').children('img').css({
                    top:-150,
                    left:0
                });
                $('.regCont').children('.step2').addClass('hide').siblings('.step3').removeClass('hide');
            }else{
                return false;
            }
        })
        // 验证邮箱;
        $('.addEmail').find('input').blur(function(){
            var val = this.value;
            var reg = /^[a-z0-9][\w]{2,}\@[0-9a-z]{2,}(\.[a-z]{2,})+$/;
            if(reg.test(val)){
                $(this).siblings('.glyphicon-ok-circle').removeClass('hide').siblings('.glyphicon-remove-sign').addClass('hide');
                nextStep.inpMail = true;
            }else{
                nextStep.inpMail = false;
                $(this).siblings('.glyphicon-ok-circle').addClass('hide').siblings('.glyphicon-remove-sign').removeClass('hide');
            }
        })

    })
})