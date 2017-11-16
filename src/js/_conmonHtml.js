//本模块依赖jquery

define(['jquery'],function($){
    return {
        header:function(){
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
        },
        navTop:function(){
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
// requirejs(['config'],function(){
//     requirejs(['jquery'],function($){
//         // load(url,[data],[callback]) 载入远程 HTML 文件代码并插入页面中。
        
        
        
        
        
        
//     })
// });