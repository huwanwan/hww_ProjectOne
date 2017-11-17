/* 
* @Author: Marte
* @Date:   2017-11-16 16:15:40
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-17 09:54:49
*/

requirejs(['config'],function(){
    requirejs(['jquery','comHtmljs','conmon','zoom'],function($,m,mustJs){
            m.header();
            m.navTop();
            m.hideHead();
            m.links();
            m.footer();
            // 当滚动大于300的时候点击回到顶部 
            var $ceiling = $('#mainTips');
            var upTop = $ceiling.offset().top;
            $(window).scroll(function(){
                if($(this).scrollTop() > upTop){
                    $ceiling.find('p').addClass('hide');
                    $ceiling.addClass('ceilBg').stop().animate({
                        'opacity':1
                    });
                    $('#upTop').removeClass('hide').on('mouseover',function(){
                        $(this).find('img').attr('src','../img/mation14.gif');
                    }).on('mouseout',function(){
                        $(this).find('img').attr('src','../img/mation15.gif');
                    }).click(function(){
                        $(this).find('img').attr('src','../img/mation16.gif');
                        var up = $('body')[0].scrollHeight - $(this).outerHeight();
                        $(this).find('img').attr('src','../img/mation13.gif');
                        $(this).stop().animate({'bottom':up,'opacity':0},1000)
                        $('html,body').stop().animate({
                            scrollTop:0
                        },1000);
                    })
                }else if($(this).scrollTop() <= upTop){
                    $ceiling.css('opacity',0.2).removeClass('ceilBg').find('p').removeClass('hide');
                    $('#upTop').css('bottom',20).attr('src','../img/mation15.gif').css('opacity',1).addClass('hide');
                }
            })
            // // 放大镜部分;
            // $('.picBox').hwZoom({
            //     bWidth:449,
            //     bHeight:400,
            //     swidth:200,
            //     sheight:200,
            //     gap:30,
            //     'src':'../img/pic134.jpg',
            //     'bigPic':'../img/big11.jpg'
            // })
    })
})