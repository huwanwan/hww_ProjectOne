/* 
* @Author: Marte
* @Date:   2017-11-15 13:47:18
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-18 22:17:23
*/
requirejs(['config'],function(){
    requirejs(['jquery','comHtmljs'],function($,m){
        m.header();
        m.navTop();
        m.links();
        m.footer();
        m.hideHead();
        // main部分商品生成;
        var word = Cookies.get('word');
        if(word != ''){
            $.get('../api/goodsList.php',{'word':word},function(res){
                
                if(res.total === 0){

                    var p = $('<p/>').addClass('noGoods').text('对不起,暂无该类商品!').appendTo($('.goods'));
                }
                // 遍历商品名字,set去重转成数组;
                var gener = [];
                res.data.forEach((item)=>{
                    gener.push(item.name);
                })
                gener = [...(new Set(gener))];
                // 写入页面;
                for(var i = 0;i < gener.length;i++){
                    var $div = $('<div/>');
                    var $a = $('<a/>').attr('src','../html/goodslist.html').text(gener[i]).appendTo($div);
                    $('.filter1').append($div);
                }
                var price = [];
                res.data.forEach((item)=>{
                    price.push(item.nPrice);
                })
                price = [...(new Set(price))];
                var minP = Math.min.apply(null,price);
                if(minP > 1000){
                    for(var i = 0;i < 3;i++){
                        var start = i * 1000;
                        var end = i+1 * 1000;
                        var $div = $('<div/>');
                        var $a = $('<a/>').attr('src','../html/goodslist.html').text(`${start} - ${end}`).appendTo($div);
                        $('.otherPrice').before($div);
                    }
                }else{
                    for(var i = 0;i < 3;i++){
                        var start = i * 100;
                        var end = (i+1) * 100;
                        var $div = $('<div/>');
                        var $a = $('<a/>').attr('src','../html/goodslist.html').text(`${start} - ${end}`).appendTo($div);
                        $('.otherPrice').before($div);
                    }
                }
                function createGoods(opt){
                    this.opt = opt.data;
                    this.total = opt.total;
                    this.page = opt.total/16 > 1 ? Math.ceil(opt.total/16) : 1;
                    this.idx = 1;
                    this.init();
                }
                createGoods.prototype = {
                    constructor:'createGoods',
                    init(){
                        $pageUp = $('.goodsFilter').find('.page');
                        $pageDown = $('.goods').find('.page');
                       
                        this.maxTop = $('.contrastGoods').children('ul').offset().top;
                        // 当前高亮;
                        $pageDown.find('s').eq(0).css('fontWeight','bold');
                        // 生成数据
                        this.create();
                        this.Maxidx = 0;
                        this.ulPos = {};
                        this.ulLen = $('.contrastGoods').children('ul').children().length;
                        //下一页;
                        $('.page').find('.next').click(()=>{
                            this.idx++;
                            this.pageClick();
                            event.preventDefault();
                        })
                        // 上一页;
                        $('.page').find('.prev').click(()=>{
                            this.idx--;
                            this.pageClick();
                            event.preventDefault();
                        })
                        var self = this;
                        // 页码点击;
                        $pageDown.find('s').click(function(){
                            self.idx = $(this).text();
                            self.pageClick();
                            event.preventDefault();
                        })
                        // 显示输入页码;
                        $pageDown.find('.write').click(function(){
                            $(this).addClass('hide').siblings('input').removeClass('hide').siblings('button').removeClass('hide');
                        });
                        // 输入页码;
                        $pageDown.find('button').click(function(){
                            var val = $(this).siblings('input')[0].value;
                            val = $.trim(val);
                            if(val > 0 && val < self.page){
                                self.idx = val;
                                self.pageClick();
                            }else{
                                $(this).addClass('hide').siblings('input').addClass('hide').siblings('.write').removeClass('hide');
                            }
                        })
                        // 点击比较飞入ul;
                         // 比较加入购物车;
        
                        $('.fairly').click(function(){
                            console.log(this)
                            self.goFilter(this);
                        })
                        $('.clearAll').click(function(){
                            self.clearGoods();
                        })
                        $(window).scroll(function(){
                            var top = $(window).scrollTop();
                            var isImg = $('.contrastGoods').children('ul').find('img').length;
                            if(top > self.maxTop && isImg > 0){
                                $('.contrastGoods').addClass('scrollT').find('img').css('position','static');
                            }else{
                                $('.contrastGoods').removeClass('scrollT').find('img');
                            }
                        })
                        // 点击品牌筛选;
                        $('.filter1').find('a').click(function(){
                            var word = $(this).text();
                            self.filter1(word);
                        });
                        // 点击价格筛选;
                        $('.filter2').find('a').click(function(){
                            var val = $(this).text().split('-');
                            self.filter2(val[0],val[1]);
                        })
                        // 输入筛选;
                        $('.otherPrice').find('button').click(function(){
                            var min = $('.otherPrice').children('input')[0].value;
                            var max = $('.otherPrice').children('input')[1].value;
                            self.filter2(min,max);
                        });
                        this.onOff = 'on';
                        // 访问量排序;
                        $('.inserT').find('a').eq(0).click(function(){
                            if(self.onOff == 'on'){
                                 self.view(word,'desc');
                                 self.onOff = 'off';
                            }else{
                                 self.view(word,'asc');
                                 self.onOff = 'on';
                            }
                            
                        })
                        // 价格排序;
                        $('.inserT').find('a').eq(1).click(function(){
                            if(self.onOff == 'on'){
                                 self.upPrice(word,'desc');
                                 self.onOff = 'off';
                            }else{
                                 self.upPrice(word,'asc');
                                 self.onOff = 'on';
                            }

                        })
                        // 结果中搜索;
                        $('.default').find('button').click(function(){
                            var val = $('.default').find('input')[0].value;
                            console.log(val)
                            self.getDefault(word,val);
                        })
                    },
                    view(word,type){
                        // 重新请求数据;
                        $.get('../api/goodsList.php',{
                            'word':word,
                            'ty':type
                        },(res)=>{
                            console.log(res)
                            this.opt = res.data;
                            this.total = res.total;
                            this.page = res.total/16 > 1 ? Math.ceil(res.total/16) : 1;
                            this.idx = 1;
                            this.create();
                        },'json');
                    },
                    upPrice(word,type){
                        // 重新请求数据;
                        console.log(type)
                        $.get('../api/goodsList.php',{
                            'word':word,
                            'type':type
                        },(res)=>{
                            this.opt = res.data;
                            this.total = res.total;
                            this.page = res.total/16 > 1 ? Math.ceil(res.total/16) : 1;
                            this.idx = 1;
                            this.create();
                        },'json');
                    },
                    getDefault(word,val){
                        // 重新请求数据;
                        $.get('../api/goodsList.php',{
                            'word':word,
                            'name':val
                        },(res)=>{
                            this.opt = res.data;
                            this.total = res.total;
                            this.page = res.total/16 > 1 ? Math.ceil(res.total/16) : 1;
                            this.idx = 1;
                            this.create();
                        },'json');
                    },
                    filter1(word){
                        // 重新请求数据;
                        $.get('../api/goodsList.php',{
                            'word':word
                        },(res)=>{
                            this.opt = res.data;
                            this.total = res.total;
                            this.page = res.total/16 > 1 ? Math.ceil(res.total/16) : 1;
                            this.idx = 1;
                            this.create();
                        },'json');
                    },
                    filter2(min,max){
                        // 重新请求数据;
                        $.get('../api/goodsList.php',{
                            'min':min,
                            'max':max,
                            'word':word
                        },(res)=>{
                            this.opt = res.data;
                            this.total = res.total;
                            this.page = res.total/16 > 1 ? Math.ceil(res.total/16) : 1;
                            this.idx = 1;
                            this.create();
                        },'json');
                    },
                    create(){  
                        // 上面生成page;
                        $pageUp.find('em').text(this.total);
                        $pageUp.find('s').text(`${this.idx}/${this.page}`);
                        // 下面生成page;
                        $pageDown.find('strong').text(this.total);
                        $pageDown.find('s').remove();
                        for(var i = 0;i < this.page;i++){
                            var $s = $('<s/>').text(i+1).addClass('iCurPage');
                            $pageDown.find('.next').before($s);
                        }
                        var cont = this.opt.map((item)=>{
                                return `<li data-id=${item.id}>
                                        <img src="${item.imgUrl}" alt="" />
                                        <p class="cont">
                                            <a>${item.details}</a>
                                        </p>
                                        <span class="other">${item.name}</span>
                                        <p class="hits">
                                            <img  src="../img/dandan.gif" width="60" />
                                        </p>
                                        <p class="price">
                                            <span>￥${item.oPrice}</span>
                                            ￥${item.nPrice}
                                        </p>
                                        <p class="click">
                                            <a class="buy" href="../html/cart.html">购买</a>
                                            <a class="collect" href="javascript:;">收藏</a>
                                            <a class="fairly" href="javascript:;">比较</a>
                                        </p>
                                </li>`;

                        }).join('');
                        $('.goods').find('ul').html(cont);
                        for(var i = 0;i < this.opt.length;i++){
                            if(this.opt[i].serve == '7'){
                                var $seven = $('<p/>').addClass('seven');
                                var $i = $('<i/>').appendTo($seven);
                                $('.goods').find('li').eq(i).children('img').after($seven);

                            }else{
                                var $seven = $('<p/>').addClass('seven');
                                $('.goods').find('li').eq(i).children('img').after($seven);
                            }
                        }
                        var self = this;
                        this.cartList = [];
                        if(Cookies.get('cart')){
                            this.cartList.push(Cookies.get('cart'));
                        }
                        $('li').find('a').click(function(){
                            if($(this).parents('.click')){
                                return ;
                            }
                            var dataId = $(this).parents('li').attr('data-id');
                            self.setCookie(dataId);
                           
                        });
                        $('.buy').click(function(){
                            var dataId = $(this).parents('li').attr('data-id');
                            self.setCart(dataId);
                        })
                    },
                    setCookie(dataId){
                        $.get('../api/goods.php',{'id':dataId},function(res){
                            Cookies.set('goods',res,null,'/');
                            location.href = '../html/dataList.html';
                        },'json')
                    }, 
                    setCart(dataId){
                        $.get('../api/goods.php',{'id':dataId},(res)=>{
                            this.cartList.push(res);
                            Cookies.set('cart',this.cartList,null,'/');
                            location.href = '../html/cart.html';
                        },'json');
                    },
                    pageClick(){
                        if(this.idx > this.page){
                            this.idx = this.page;
                            return;
                        }else if(this.idx < 1){
                            this.idx = 1;
                            return;
                        }else{
                            // 重新请求数据;
                            $.get('../api/goodsList.php',{
                                'word':word,
                                'page':this.idx
                            },(res)=>{
                                this.opt = res.data;
                                this.create();
                                // 页码更新;
                                $pageUp.find('s').text(`${this.idx}/${this.page}`);
                                $pageDown.find('s').eq(this.idx-1).css('fontWeight','bold').siblings('s').css('fontWeight','normal');
                            },'json');
                        }
                    },
                    goFilter(ele){            
                        if(this.Maxidx >= this.ulLen){
                            alert(`每次最多只能选择$(len)种商品进行比较!`);
                        }
                        if($(ele).attr('onOff') === 'on'){
                            $(ele).css('border-color','#F0F0F0').attr('onOff','off');
                            $('.contrastGoods').children('ul').children('li').eq(this.Maxidx-1).html(this.Maxidx);
                            this.Maxidx--;
                            return;
                        }
                        $(ele).css('border-color','#F7661F').attr('onOff','on');
                        var maxLeft = $('.contrastGoods').children('ul').children('li').eq(this.Maxidx).offset().left;
                        this.ulPos.left = $(ele).parents('li').children('img').position().left;
                        this.ulPos.top = $(ele).parents('li').children('img').position().top;
                        var $iCurImg = $(ele).parents('li').children('img');
                        var $newPic = $iCurImg.clone().css({
                            'position':'absolute',
                            'width':$iCurImg.outerWidth(),
                            'height':$iCurImg.outerHeight(),
                            'left':$iCurImg.offset().left,
                            'top':$iCurImg.offset().top
                        });
                        $('body').append($newPic);
                        $newPic.stop().animate({
                            'top':this.maxTop,
                            'left':maxLeft,
                            'width':40,
                            'height':38
                        },()=>{
                            var cloneImg = $newPic.clone();
                            $newPic.remove();
                            $('.contrastGoods').children('ul').children('li').eq(this.Maxidx).text('').append(cloneImg);
                            this.Maxidx++;
                        })        
                        
                    },
                    clearGoods(){
                       for(var i = 0;i < this.ulLen;i++){
                            (function(i){
                                $('.contrastGoods').children('ul').children('li').eq(i).html(i+1);
                            })(i);
                       }
                       this.Maxidx = 0;
                       $('.goods').find('.fairly').css('border-color','').attr('onOff','off');
                    }
                }
                new createGoods(res);


            },'json');
        }
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
        });
        $('.lists').children('li').children('a').click(function(){
            var word = $(this).text();
            Cookies.set('word',word,null,'/');
            location.href = '../html/goodsList.html';
        })
        // 侧边栏产品生成;
        $.get('../api/index.php',{'gener':word,'view':'true','No':5},function(res){
                if(res){
                    var cont = res.map((item,idx)=>{
                        return `
                            <div data-id=${item.id}>
                               <img src="${item.imgUrl}" alt="" />
                               <p><strong>${idx+1}.</strong><a>${item.details}</a></p>
                               <span>￥${item.nPrice}</span>
                            </div>
                        `;
                    }).join('');
                    var res = '<h3>热销榜</h3>';
                    res+=cont;
                    $('.hotList').html(cont);
                    $('.hotList').find('a').click(function(){
                        var dataId = $(this).parents('div').attr('data-id');
                        $.get('../api/goods.php',{'id':dataId},function(res){
                            Cookies.set('goods',res,null,'/');
                            location.href = '../html/dataList.html';
                        },'json')
                    })
                }else{
                    $('.hotList').hide();
                }
                
        },'json')
    })
})