//本模块依赖jquery

define(['jquery','conmon'],function($){
    return {
        header:function(){
            $('#header').load('http://localhost:9393/html/commonHtml.html .head',function(){
                var userN = Cookies.get('user');
                if(userN){
                    var cont = `亲爱的用户<strong>${userN}</strong> <a href="javascript:;">安全退出</a>`;
                    $('.login').addClass('hide').siblings('.userName').html(cont).removeClass('hide');
                    $('.userName').find('a').click(function(){
                        Cookies.remove('user','/');
                        location.reload();
                    })
                    $(this).find('.orders').on('mouseenter','li',function(){
                        $(this).find('.orderCont').css({
                                                'display':'block',
                                                'z-index':2
                                            })
                    }).on('mouseleave','li',function(){
                        $(this).find('.orderCont').css('display','none');
                    });
                    $('.customer').on('mouseenter',function(){
                        $(this).find('.phoneNum').css({
                                                'display':'block',
                                                'z-index':2
                                            });
                    }).on('mouseleave',function(){
                        $(this).find('.phoneNum').css({
                                                'display':'none'
                                            });
                    });
                }else{
                    $('.login').removeClass('hide').siblings('.userName').addClass('hide');
                    $(this).find('.orders').on('mouseenter','li',function(){
                        $(this).find('div').css({
                                                'display':'block',
                                                'z-index':2
                                            })
                    }).on('mouseleave','li',function(){
                        $(this).find('div').css('display','none');
                    })
                }
            });
        },
        navTop:function(){
            $('#navTop').load('http://localhost:9393/html/commonHtml.html .navT',function(){
                $(this).find('.search').focus(function(){
                    $(this).attr('placeHolder','');
                }).blur(function(){
                    $(this).attr('placeHolder','请输入您想要搜索的关键字');
                })
                $(this).find('button').click(function(){
                    var val = $(this).prev('.search')[0].value;
                    if($.trim(val) === ''){
                        return;
                    }else{
                        Cookies.set('word',val,null,'/');
                        location.href = '../html/goodslist.html';
                    }  
                })
                $(this).find('a').click(function(){
                    var word = $(this).text();
                    Cookies.set('word',word,null,'/');
                    location.href = '../html/goodslist.html';
                })
            });
        },
        navBtm:function(){
             $('#navBtm').load('http://localhost:9393/html/commonHtml.html .navB',function(){
                var timer;
                $(this).find('.navSec').removeClass('hide');
                $(this).find('.navList').on('mouseenter','li',function(){
                    $(this).css({'backgroundColor':'#295DD7',opacity:0.3}).stop().animate({'opacity':1});
                }).on('mouseleave','li',function(){
                    $(this).css({'backgroundColor':'','opacity':0.3}).stop().animate({'opacity':1});
                })
                var userN = Cookies.get('user');
                if(userN){
                   $('.cartTips').find('p').eq(1).html('您收藏的商品暂无动态提醒!');
                }else{
                    var cont = '请<a href="login.html">登录</a>后查看';
                    $('.cartTips').find('p').eq(1).html(cont);
                }
                $('.cartTips').on('mouseenter','li',function(){
                    $(this).find('p').removeClass('hide');

                }).on('mouseleave','li',function(){
                    $(this).find('p').addClass('hide');
                })
                $('.navSec').children('li').on('mouseover',function(ev){
                    clearTimeout($('.navfirst').children('li')[0].timer)
                        // 当前li外的其它兄弟li,颜色改变;
                        var setTop  = $(this).position().top;
                        $(this).siblings('li').css('backgroundColor','#F2F2F2').find('.navThird').css('display','none');
                        // 当前li下的三级导航显示,并动画到指定位置;
                        $(this).find('.navThird').css({'display':'block','top':-setTop});
                   
                }).on('mouseout',function(){
                    $(this).parent().children('li').css('backgroundColor','#fff').find('.navThird').css({'display':'none',
                                                        'top':0  
                                                    });
            
                })     
                $(this).find('a').click(function(){
                    var word = $(this).text();
                    Cookies.set('word',word,null,'/');
                    location.href = '../html/goodslist.html';
                })
            });
        },
        hideHead:function(){
            $('#navBtm').load('../html/commonHtml.html .navB',function(){
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
                // 当前页面的二级导航隐藏;
                $('.navfirst').find('.navSec').addClass('hide');
                // 移入一级导航li时,延迟显示二级导航;
                $('.navfirst').on('mouseover','li',function(){
                    this.timer = setTimeout(()=>{
                        $(this).children('.navSec').removeClass('hide');
                    },1000)
                }).on('mouseout','li',function(){
                    // 移出一级导航不到1秒时,关闭显示的延时器;
                    clearTimeout(this.timer);
                    // 延迟关闭二级导航
                    this.timer = setTimeout(()=>{
                        $(this).children('.navSec').addClass('hide');
                    },1000)
                })
                // 移入二级导航的li时,先关闭移出一级导航的延时器;

                $('.navSec').children('li').on('mouseover',function(ev){
                    clearTimeout($('.navfirst').children('li')[0].timer)
                        // 当前li外的其它兄弟li,颜色改变;
                        var setTop  = $(this).position().top;
                        $(this).siblings('li').css('backgroundColor','#F2F2F2').find('.navThird').css('display','none');
                        // 当前li下的三级导航显示,并动画到指定位置;
                        $(this).find('.navThird').css({'display':'block','top':-setTop});
                   
                }).on('mouseout',function(){
                    $(this).parent().children('li').css('backgroundColor','#fff').find('.navThird').css({'display':'none',
                                                        'top':0  
                                                    });
                    this.timer = setTimeout(()=>{
                        $(this).parents('.navSec').addClass('hide');
                    },500)
                })
                
            })
        },
        userH:function(){
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
        },
        links:function(){
            $('#myLinks').load('../html/commonHtml.html .mylink'); 
        },
        footer:function(){
            $('#footer').load('../html/commonHtml.html .foot');
        }
    }
})