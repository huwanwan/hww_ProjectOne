

// requirejs(['config'],function(){
//     requirejs(['jquery','jqueryUI','carousel','bootstrap'],function(){
//         $('#welcomeArea').load('../html/commonHtml.html .userTop',function(){
//             console.log(this);
//             $(this).find('h2').text('新用户注册');
//         });
//     })
// })
(function(){
    jQuery(function($){
        $('#welcomeArea').load('../html/commonHtml.html .userTop',function(){
            console.log(this);
            $(this).find('h2').text('新用户注册');
        });
        // 验证手机号码;
        $('#phoneNum').blur(function(){
               
        })
    });
})();