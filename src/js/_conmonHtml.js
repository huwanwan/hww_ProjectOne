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
                var disTop;
                $('.navSec').children('li').on('mouseenter',function(){
                    disTop = $(this).find('.navThird').position().top;
                    var setTop = ($(this).parents('.navSec').position().top)-$(this).outerHeight();
                    timer = setTimeout(()=>{
                        $(this).siblings().css('backgroundColor','#F2F2F2');
                        $(this).find('.navThird').css('display','block').stop().animate({'top':setTop}).parent().siblings().find('.navThird').css('display','none');
                    },500)
                }).siblings('li').on('mouseleave',function(){
                        $(this).siblings().css('backgroundColor','');
                        clearTimeout(timer);
                        $(this).find('.navThird').css({'display':'none',
                                                        'top':0    
                                                    });
                })
            });
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