/* 
* @Author: Marte
* @Date:   2017-11-15 13:47:18
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-16 16:22:42
*/
requirejs(['config'],function(){
    requirejs(['jquery','comHtmljs'],function($,m){
        m.header();
        m.navTop();
        m.links();
        m.footer();
        m.hideHead();
        // $('#navBtm').load('../html/commonHtml.html .navB',function(){
        //     // 当前页面的二级导航隐藏;
        //     $('.navfirst').find('.navSec').addClass('hide');
        //     // 移入一级导航li时,延迟显示二级导航;
        //     $('.navfirst').on('mouseover','li',function(){
        //         this.timer = setTimeout(()=>{
        //             $(this).children('.navSec').removeClass('hide');
        //         },1000)
        //     }).on('mouseout','li',function(){
        //         // 移出一级导航不到1秒时,关闭显示的延时器;
        //         clearTimeout(this.timer);
        //         // 延迟关闭二级导航
        //         this.timer = setTimeout(()=>{
        //             $(this).children('.navSec').addClass('hide');
        //         },1000)
        //     })
        //     // 移入二级导航的li时,先关闭移出一级导航的延时器;

        //     $('.navSec').children('li').on('mouseover',function(ev){
        //         clearTimeout($('.navfirst').children('li')[0].timer)
        //             // 当前li外的其它兄弟li,颜色改变;
        //             var setTop  = $(this).position().top;
        //             $(this).siblings('li').css('backgroundColor','#F2F2F2').find('.navThird').css('display','none');
        //             // 当前li下的三级导航显示,并动画到指定位置;
        //             $(this).find('.navThird').css({'display':'block','top':-setTop});
               
        //     }).on('mouseout',function(){
        //         $(this).parent().children('li').css('backgroundColor','#fff').find('.navThird').css({'display':'none',
        //                                             'top':0  
        //                                         });
        //         this.timer = setTimeout(()=>{
        //             $(this).parents('.navSec').addClass('hide');
        //         },500)
        //     })
            
        // })
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

        // 比较加入购物车;
        var maxTop = $('.contrastGoods').children('ul').position().top + $('.contrastGoods').children('ul').outerHeight() ;
        var idx = 0;
        var pos = {};
        var len = $('.contrastGoods').children('ul').children().length;
        $('.fairly').click(function(){             
            if(idx >= len){
                alert(`每次最多只能选择$(len)种商品进行比较!`);
            }
            if($(this).attr('onOff') === 'on'){
                $(this).css('border-color','#F0F0F0').attr('onOff','off');
                console.log($('.contrastGoods').children('ul').children('li').eq(idx-1))
                $('.contrastGoods').children('ul').children('li').eq(idx-1).html(idx);
                idx--;
                return;
            }
            $(this).css('border-color','#F7661F').attr('onOff','on');

            var maxLeft = $('.contrastGoods').children('ul').children('li').eq(idx).position().left;
            pos.left = $(this).parents('li').children('img').position().left;
            pos.top = $(this).parents('li').children('img').position().top;

            var $newPic = $(this).parents('li').children('img').clone().css({
                'left':pos.left,
                'top':pos.top
            });
            $('body').append($newPic);
            $newPic.stop().animate({
                'top':maxTop,
                'left':maxLeft,
                'width':42,
                'height':40
            },function(){
                var cloneImg = $newPic.clone();
                $newPic.remove();
                $('.contrastGoods').children('ul').children('li').eq(idx).text('').append(cloneImg);
                idx++;
            })        
        })
        $('.clearAll').click(function(){
           for(var i = 0;i < len;i++){
                (function(i){
                    $('.contrastGoods').children('ul').children('li').eq(i).html(i+1);
                })(i);
           }
        })
        $(window).scroll(function(){
            var top = $(window).scrollTop();
            var isImg = $('.contrastGoods').children('ul').find('img').length;
            if(top > maxTop && isImg > 0){
                $('.contrastGoods').addClass('scrollT').find('img').addClass('notPos');
            }else{
                $('.contrastGoods').removeClass('scrollT').removeClass('notPos');
            }
        })
    })
})