/* 
* @Author: Marte
* @Date:   2017-11-16 16:15:40
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-19 15:54:04
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
                    $ceiling.removeClass('ceilBg').find('p').removeClass('hide');
                    $('#upTop').css('bottom',20).attr('src','../img/mation15.gif').css('opacity',1).addClass('hide');
                }
            })
            var page = {
                title : '#mainTitle',
                cell : '#mainTips',
                main:'.goodsCont',
                idx:0,
                init(){
                    this.$title = $(this.title);
                    this.$cell = $(this.cell);
                    this.$main = $(this.main);
                    this.data = Cookies.get('goods');
                    var word = Cookies.get('word');
                    // 页面产品头部信息;
                    if(this.data){
                        
                        if(Array.isArray(JSON.parse(this.data))){
                            this.data = JSON.parse(this.data)[0];
                        }else{
                            this.data = JSON.parse(this.data);
                        }
                        this.$title.find('p').children('a').eq(1).text(`${word}>`);this.$title.find('p').children('a').eq(2).text(`${this.data.name}>`);
                        this.$title.find('p').find('span').find('em').text(this.data.num);
                        // 初始qty是1;
                        this.data.qty = 1;
                    }else{
                        return;
                    }
                    // 页面主体部分生成;
                    // 左边放大镜;s
                    // 页面下面的描述标题;
                    $('.listText').children('.goodsName').text(this.data.details);
                    var otherImg = this.data.otherImg.split(',');
                    // 放大镜大图小图以及页面底部大图生成;
                    otherImg.forEach((item,idx)=>{
                        var mainPic = $('<img/>').attr('src',item).css({
                            'display':'none',
                            'width':450,
                            'height':338
                        }).appendTo('.picBox')
                        var img = $('<img/>').attr('src',item).css({
                            'width':78,
                            'height':58
                        });
                        var bImg = $('<img/>').attr('src',item).css('margin-left',180).appendTo('.listText');
                        this.$main.find('.sImg').children().eq(idx).append(img);
                    })
                    // 初始化左边区域;
                    this.changeImg();
                    // 生成右边详情;
                    this.$goodCont = $('.conLeft');
                    $('.contBox').children('h2').text(this.data.details);
                    var cont = `<p>品牌:<span>${this.data.name}</span></p>
                                <p>产品型号:<span>${this.data.num}</span></p>
                                <p>新蛋价:<span>￥${this.data.oPrice}</span></p>
                                <p>促销价:<span class="newPrice">￥<em>${this.data.nPrice}</em></span></p>
                                <p class="serve">产品支持:<s></s></p>
                                <p class="qty">
                                    数量:
                                    <i class="sub">-</i>
                                    <span>1</span>
                                    <i class="add">+</i>
                                    <em>库存:有货</em>
                                </p>
                                <div class="conBtm">
                                    <button class="buy">立即购买</button>
                                    <button class="goCart">加入购物车</button>
                                    <p class="clearfix">
                                        <a href="javascript:;">加入收藏夹</a>
                                    </p>

                                </div>
                                <p>注意事项：东莞保税仓发货</p>

                            `;
                    this.$goodCont.html(cont);
                    if(this.data.serve == '7'){
                        $('.serve').find('s').css('color','#f00').text('支持7天无理由退换');
                    }else{
                         $('.serve').find('s').css('color','#f00').text('支持不无理由退换');
                    }
                    // button点击加入购物车事件;
                    this.$main.find('.goCart').click(()=>{
                        this.setCart();
                    });
                    this.$main.find('.buy').click(()=>{
                         this.setCart();
                         location.href = '../html/cart.html';
                    })

                    // qry++;
                    $('.qty').find('.sub').click((ev)=>{
                        this.data.qty--;
                        this.qtyChange();
                        event.preventDefault();
                    }).siblings('.add').click(()=>{
                        this.data.qty++;
                        this.qtyChange();
                        event.preventDefault();
                    })
                    var self = this;
                    // 点击小图切换;
                    $('.sImg').children('li').on('click',function(){
                        self.idx = $(this).index();
                        self.changeImg();
                    });
                    // 大图移入放大镜;
                    $('.picBox').children('img').on('mouseenter',function(){
                        var src = $('.picBox').children('img').eq(self.idx).attr('src');
                        console.log(this)
                        self.zoom(this,src);
                    })
                },
                zoom(ele,src){
                    // // 放大镜部分;
                    $('.picBox').hwZoom({
                        bWidth:450,
                        bHeight:380,
                        swidth:200,
                        sheight:200,
                        gap:30,
                        boxPic:'.picBox',
                        smPic:ele,
                        bigPic:src
                    })
                },
                changeImg(){
                    $('.picBox').children('img').eq(this.idx).css('display','block').siblings('img').css('display','none');
                    this.$main.find('.sImg').children().eq(this.idx).css('border-color','#f00').siblings('li').css('border-color','#ccc');
                },
                qtyChange(){
                    if(this.data.qty < 1){
                        this.data.qty = 1;
                    }
                    console.log(this.data)
                    $('.qty').find('span').text(Number(this.data.qty));
                },
                setCart(){
                    var left = $('.picBox').children('img').offset().left;
                    var top = $('.picBox').children('img').offset().top;
                    var newImg = $('.picBox').children('img').clone();
                    var maxTop = $('.cartTips').offset().top;
                    var maxLeft = $('.cartTips').offset().left;
                    newImg.css({
                        'position':'absolute',
                        'left':left,
                        'top':top
                    }).appendTo('body').stop().animate({
                        'top':maxTop,
                        'left':maxLeft,
                        'width':40,
                        'height':40
                    },()=>{
                        newImg[0].remove();
                    });
                    var cart = Cookies.get('cart');
                    if(cart){
                        this.cart = JSON.parse(cart);
                    }else{
                        this.cart = [];
                    }
                    var setC = true;
                    this.cart.forEach((item)=>{
                        if(this.data.id == item.id){
                            item.qty += Number(this.data.qty);
                            setC = false;
                        }
                    })
                    if(setC){
                        this.cart.push(this.data);
                    }
                    this.cart = JSON.stringify(this.cart);
                    Cookies.set('cart',this.cart,null,'/');
                }

            }
            page.init();
            
    })
})