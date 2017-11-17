
requirejs(['config'],function(){
    requirejs(['jquery','comHtmljs','conmon'],function($,m){
        m.userH();
        m.footer();
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
        // 存下一个变量(手机号码,密码,邮箱),接收填写正确的手机号码,在step2的时候写入数据库;
        var phone;
        var psd;
        var email;
        // $.get(url,[data],[fn],[dataType]) // type:’get’
        $phone.blur(function(){
            var val = this.value;
            if(/^1[34578]{1}\d{9}$/.test(val)){
                $.get('../api/register.php',{'phone':val},(res)=>{
                    if(res === "has"){
                         $(this).siblings('.glyphicon-remove-sign').removeClass('hide').text('该手机已注册,请直接登录!').siblings('.glyphicon-ok-circle').addClass('hide');
                         $phone.focus();
                         nextStep.inp2 = false;
                    }else{
                        $(this).siblings('.glyphicon-ok-circle').removeClass('hide').siblings('.glyphicon-remove-sign').addClass('hide');
                        phone = val;
                        nextStep.inp1 = true;
                    }
                },'text')
            }else{
                $(this).siblings('.glyphicon-remove-sign').removeClass('hide').text('请输入正确的手机号码!').siblings('.glyphicon-ok-circle').addClass('hide');
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
        $('.message').click(function(){
            if(nextStep.inp1 && nextStep.inp2){
                $(this).addClass('hide').siblings('.mail').removeClass('hide');
                $('.mail').find('.glyphicon-remove-sign').text('已发送一条动态验证码短信，请查收。').removeClass('hide');
                $('.mail').siblings('.next').removeClass('hide').click(into);
                function into(){
                    var val = $('#mailCode')[0].value;
                    if(/^\d{6}$/.test(val)){
                        $('.regStep').children('img').css({
                            top:-75,
                            left:0
                        });
                        $('.regCont').children('.step1').addClass('hide').siblings('.step2').removeClass('hide');
                    }else{
                        $('.mail').find('span').removeClass('hide').click(function(){
                           $('.mail').find('.glyphicon-remove-sign').text('已发送一条动态验证码短信，请查收。').removeClass('hide');
                            $(this).addClass('hide');
                        });
                        $('.mail').find('.glyphicon-remove-sign').text('输入码有误!').removeClass('hide');

                        return false;
                    }
                }
                
            }else{
                if(!nextStep.inp1){
                    $phone[0].focus();
                }else{
                    $code[0].focus();
                }
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
                    'background':'#f02'
                }).siblings('.pos').addClass('hide');
            }else if((/^[0-9a-z]{8,}[\.\/\,\$]{2,}$/i).test(val) && val.length<=16){
                $('.padLen').removeClass('hide').css({
                    'width':90,
                    'background':'#58bc58'
                }).siblings('.pos').addClass('hide');

            }else if((/^[0-9a-z]{8,}$|^[0-9a-z]{7,}[\.\/\,\$]+$/i).test(val) && val.length<=16){
                $('.padLen').removeClass('hide').css({
                    'width':60,
                    'background':'#ccc'
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
                psd = val;
            }
        })
        $('.reg').click(function(){
            var check = $('.check').find('input')[0].checked;
            if(nextStep.inp1 && nextStep.inp2 && check){
                $.get('../api/register.php',{
                    'phone':phone,
                    'password':psd
                },function(res){
                     if(res === 'ok'){  
                        $('.regStep').children('img').css({
                            top:-150,
                            left:0
                        });
                        $('.regCont').children('.step2').addClass('hide').siblings('.step3').removeClass('hide');
                     }else{
                        $(this).siblings('.pos').removeClass('hide').siblings('.glyphicon-ok-circle').addClass('hide');
                     }             
                })
            }else{
                $('.check').removeClass('hide');
                return false;
            }
        })
        // 验证邮箱;
        $('.addEmail').find('input').blur(function(){
            var val = this.value;
            var reg = /^[a-z0-9][\w]{2,}\@[0-9a-z]{2,}(\.[a-z]{2,})+$/;
            if(reg.test(val)){
                email = val;
                nextStep.inpMail = true;
            }else{
                nextStep.inpMail = false;
                $(this).siblings('.glyphicon-ok-circle').addClass('hide').siblings('.glyphicon-remove-sign').removeClass('hide');
            }
        })
        $('.setMail').click(function(){
            if(nextStep.inpMail){
                $.get('../api/register.php',{
                    'phone':phone,
                    'email':email
                },function(res){
                    if(res === 'ok'){
                        $(this).siblings('.glyphicon-ok-circle').removeClass('hide').siblings('.glyphicon-remove-sign').addClass('hide');
                        location.href = '../index.html';
                    }
                })
            }
        })

    })
})