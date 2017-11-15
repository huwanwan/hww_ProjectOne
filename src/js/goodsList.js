/* 
* @Author: Marte
* @Date:   2017-11-15 13:47:18
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-15 22:22:09
*/
requirejs(['config'],function(){
    requirejs(['jquery','comHtmljs'],function($,m){
        m.header();
        m.navTop();
        // m.navBtm()
        var timer;
        var timer1;
        $('#navBtm').load('../html/commonHtml.html .navB',function(){
            $(this).find('.navSec').addClass('hide');
            // h3标题移入移出;
            $('.navB').children('h3').on('mouseover',function(){
                timer = setTimeout(function(){
                    $('#navBtm').find('.navSec').removeClass('hide');
                },1000)
            }).on('mouseout',function(){
                clearTimeout(timer);
                timer = setTimeout(function(){
                    $('#navBtm').find('.navSec').addClass('hide');
                },1000)
            })
            var disTop;
            // 二级导航移入移出;
            $('.navSec').on('mouseenter','li',function(){
                clearTimeout(timer);
                $('.navSec').removeClass('hide');
                var setTop = ($(this).parents('.navSec').position().top)-$(this).outerHeight();
                $(this).siblings('li').css('backgroundColor','#F2F2F2');
                $(this).find('.navThird').css('display','block').css({'top':setTop}).parent().siblings().find('.navThird').css('display','none');



            }).on('mouseleave','li',function(){
                timer = setTimeout(function(){
                     $('.navSec').addClass('hide');
                },1000)
                $(this).siblings().css('backgroundColor','');
                    
            });
            // 三级导航移入移出;
            
        })
        // main部分;
        var disH = $('.listBox').children('li').eq(1).outerHeight();
        // 列表分类;
        $('.listBox').children('li').click(function(){
            var iCur = $(this).index();
            var eleHeight = $(this).parent().find('ul').eq(iCur).outerHeight() + disH;
            if($(this).outerHeight() > disH){
                eleHeight = disH;
            }
            $(this).stop().animate({
                                'height':eleHeight
                            }).siblings('li').stop().animate({
                                'height':disH
                            })
        })
    })
})