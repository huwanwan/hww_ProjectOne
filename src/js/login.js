/* 
* @Author: Marte
* @Date:   2017-11-14 14:32:48
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-20 09:23:06
*/

requirejs(['config'],function(){
    requirejs(['jquery','comHtmljs','conmon'],function($,m){
        m.userH();
        m.footer();
        $('#welcomeArea').load('../html/commonHtml.html .userTop');
        // 验证用户名和密码;
        var uname;
        var pword;
        $('.username').focus(function(){
            $(this).css('color','#333');
        })
        $('.username').blur(function(){
            if(/^\w+$/.test(this.value)){
                uname = this.value;
                $('.error').addClass('hide');
            }else{
                $('.error').removeClass('hide').css('top',35);
                uname = false;
                this.focus();
            }           
        })
        $('.psd').blur(function(){
            $(this).css('color','#333');
            if(/^\S+\S$/.test(this.value)){
                pword = this.value;
                $('.error').addClass('hide');
            }else{
                $('.error').removeClass('hide').css({'top':94}).text('用户名和密码不符,请重新输入!');
                pword = false; 
                this.value = "";  
                $('.username').focus();
            }           
        })
        $('.loginBtn').click(function(){
            if(pword && uname){
                $.get('../api/login.php',{
                    'username':uname,
                    'password':pword
                },function(res){
                    if(res == 'right'){
                        var now = new Date();
                        now.setDate(now.getDate() + 5);
                        Cookies.set('user',encodeURI(uname),now,'/');
                        location.href = '../index.html';
                    }else{
                        $('.error').removeClass('hide').css('top',94).text('用户名和密码不符,请重新输入!');
                        return false;
                    }
                });
                return false;
            }else{
                return false;
            }
            
        })
   });
})