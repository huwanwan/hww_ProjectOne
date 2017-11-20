
/* 
* @Author: Marte
* @Date:   2017-11-10 16:54:09
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-20 11:06:32
*/
requirejs(['config'],function(){
    requirejs(['jquery','comHtmljs','carousel','conmon'],function($,m){
        m.header();
        m.navTop();
        m.navBtm();
        m.links();
        m.footer();
             //main的轮播图; 
        $('.carousel').hwCarousel({
            width:771,
            height:245,
            imgList:['../img/idxpic51','../img/idxpic52','../img/idxpic53','../img/idxpic54','../img/idxpic55','../img/idxpic56','../img/idxpic57','../img/idxpic58'],
            index:1,
            btns:false,
            pages:true,
            seamless:false,
            times:3000,
            direction:'opacity',
            pageNum:true,
            pageSize:{'width':20,'height':20}
        });
        // 生成倒计时盒子;
        $countGoods = $('.countGoods');
            var endDate = '2017-11-28 23:43:40';
            var countTimer = setInterval(function(){
                var differ = (Date.parse(endDate) - Date.now())/1000;
                var getSec = Math.floor(differ%60);
                var getMin = Math.floor(differ/60)%60;
                var getHours = Math.floor(differ/60/60)%24;
                if(getSec == 0 && getMin == 0 && getHours == 0){
                    clearInterval(countTimer);
                    return;
                }
                getSec = (getSec < 10 ? '0' : '')+ getSec;
                getMin = (getMin < 10 ? '0' : '') + getMin;
                getHours = (getHours < 10 ? '0' : '') + getHours;
                var time = '剩余时间: <i>' + getHours + '</i> : <i>' + getMin + '</i> : <i>' + getSec + '</i>';
                $countGoods.find('.count span').html(time); 
            },1000);

        var counts = {
            init(data){
                var countPic = data; 
                this.$countList = $('<div/>').addClass('countBox clearfix');
                this.$goodsList = $('<ul/>');
                var List = countPic.map(goods=>{
                    return `
                        <li class="item fl" data-id="${goods.id}">
                            <img src="${goods.imgUrl}" style="width:144px;height:108px;" />
                            <p><a>${goods.details}</a></p>
                            <span>￥${goods.nPrice}</span>
                        </li>
                    `;
                }).join('');
                this.$goodsList.html(List);
                 this.$countList.append(this.$goodsList).appendTo($countGoods);
                this.len = countPic.length;
                var ulW = this.$goodsList.children('li').outerWidth(true);
                var ulH = this.$goodsList.children('li').height();
                this.$goodsList.css('width',ulW*this.len);
                var $nextBtn = $('<i/>').addClass('glyphicon glyphicon-chevron-right').css({
                    'right':0,
                    'top':( this.$countList.outerHeight() - 12)/2
                });
                var $prevBtn = $('<i/>').addClass('glyphicon glyphicon-chevron-left').css({
                    'left':0,
                    'top':( this.$countList.outerHeight() - 12)/2
                });
                this.$countList.append([$prevBtn,$nextBtn]);
                this.clientW = this.$goodsList.parent('.countBox').width();
                this.idx = 0;
                this.maxLeft = this.len*this.$goodsList.children('li').outerWidth();
                this.maxIdx = Math.ceil(this.maxLeft/ this.$countList.width())-1;
                this.autoPlay();
                this.$goodsList.on('mouseenter',()=>{
                    clearInterval(this.timer);
                }).on('mouseleave',()=>{
                    this.autoPlay();
                })
                $prevBtn.on('click',function(){
                    this.idx--;
                    this.move();
                }.bind(this))

                $nextBtn.on('click',function(){
                    this.idx++;
                    this.move();
                }.bind(this));
                var self = this;
                this.$countList.find('a').click(function(){
                    var dataId = $(this).parents('li').attr('data-id');
                    self.setCookie(dataId);
                }) 
            },
            setCookie(dataId){
                $.get('../api/goods.php',{'id':dataId},function(res){
                    res = JSON.stringify(res[0]);
                    Cookies.set('goods',res,null,'/');
                    location.href = 'html/dataList.html';
                },'json')
            },
            move(){
                if(this.idx < 0){
                    this.idx = 0;
                    this.$goodsList.css('left',0);
                    return;
                }else if(this.idx > this.maxIdx){
                    this.idx = this.maxIdx;
                    this.$goodsList.css('left',-this.idx*this.clientW);
                    return;
                }
                this.$goodsList.stop().animate({'left':-this.idx*this.clientW});
            },
            autoPlay(){
                this.timer = setInterval(()=>{
                    this.idx++;
                    if(this.idx > this.maxIdx){
                        this.idx = 0;
                    }
                    this.move();
                },5000)
            }
        }

        // 数据库请求数据;
        $.get('../api/index.php',{
            'gener':'手机',
            'No':8,
            'price':'true'
        },function(res){
            counts.init(res);
        },'json');
        // main侧边轮播;
        var asideCarousel = {
            tab1:{
                'width':228,
                'height':243,
                'imgList':['../img/01.jpg','../img/1.jpg','../img/4.jpg','../img/5.jpg'],
                'index':0,
                'pages':true,
                'times':6000,
                'direction':'horizontal',
                'pageSize':{'width':10,'height':10}
            },
            box1:{
                width:230,
                height:218,
                img:'../img/idxpic18.jpg'
            },
            box2:{
                newsCont:[
                    {
                     'newSrc':'javascript:;',
                     'newList':'手机专场最高赠3千积分,赠壕礼',
                     'icon':'glyphicon glyphicon-thumbs-up'
                    },
                    {
                     'newSrc':'javascript:;',
                     'newList':'手机苹果直降血拼'
                    }
                ]
            },
            tab2:{
                'width':230,
                'height':123,
                'imgList':['../img/idxpic10.jpg','../img/idxpic11.jpg','../img/idxpic12.jpg','../img/idxpic13.jpg','../img/idxpic14.jpg','../img/idxpic15.jpg','../img/idxpic16.jpg','../img/idxpic17.jpg'],
                'index':0,
                'pages':false,
                'times':6000,
                'direction':'opacity',
            },
            init(){
                // mainCont2页面中已存在的盒子;
                this.$newBox = $('.newBox');
               
                // 生成第一个盒子;
                this.$tabTop = $('<div/>').addClass('tab1');
                // 生成第二个盒子;
                this.$picOne = $('<div/>').addClass('picOne');
                this.box1 = $('<img/>').attr('src',this.box1.img).css({'width':this.box1.width,
                                             'height':this.box1.height
                                        }).appendTo(this.$picOne);
                // 生成第三个盒子的新闻内容;
                var news = this.box2.newsCont.map(function(item){
                    if(item.icon){
                        return `<li>
                                    <a href="${item.newSrc}">
                                        ${item.newList}
                                    </a>
                                    <i class="${item.icon}"></i>
                               </li>`;
                    }else{
                        return `<li>
                                    <a href="${item.newSrc}">
                                        ${item.newList}
                                    </a>
                               </li>`;
                    }
                }.bind(this));
                $('.newList').html(news);
                // 生成第四个盒子;
                this.$tabBtm = $('<div/>').addClass('tab2');
                // 将mianCont2里的前面两个盒子添加在新闻盒子的前面;
                this.$newBox.before([this.$tabTop,this.$picOne]);
                //执行第一个/第二个盒子的动画;
                this.move(this.$tabTop,this.tab1);
                this.move(this.$tabBtm,this.tab2);
                // 将第四个盒子添加在最后;
                this.$newBox.after(this.$tabBtm);
            },
            move(ele,opt){
                ele.hwCarousel(opt);
            }

        }
        asideCarousel.init();
        // 热卖区;
        var hotArea = {
            list:[
                {
                    'imgUrl':'../img/idxpic69.jpg',
                    'details':'TP-LINK 普联 TL-SG1024T 24口全千兆以太网交换机 3种功能',
                    'nPrice':'2115.00',
                    'hot':'../img/mxsp.png'
                },
                {
                    'imgUrl':'../img/idxpic79.jpg',
                    'details':'SONY 索尼 Hi-Res高解析度无损音乐播放器16GB NW-ZX300A 黑色',
                    'nPrice':'1352.00'
                },
                {
                    'imgUrl':'../img/idxpic90.jpg',
                    'details':'华为 Mate 9 MHA-AL00 摩卡金 内存4GB+64GB 移动联通电信4G手机 全',
                    'nPrice':'2515.00',
                    'hot':'../img/mxsp.png'
                },
                {
                    'imgUrl':'../img/idxpic92.jpg',
                    'details':'下单输入蛋券编码 DSV8 立减40 数量有限 先到先得',
                    'nPrice':'1175.00',
                    'hot':'../img/rqbk.png'
                },
                {
                    'imgUrl':'../img/idxpic93.jpg',
                    'details':'MOPS Avegant 高清VR眼镜一体电玩城和移动私人影院 智能穿戴',
                    'nPrice':'1221.00'
                },
                {
                    'imgUrl':'../img/idxpic99.jpg',
                    'details':'居康/jufit 居康JFF008TM 家用跑步机 免安装迷你折叠静音电动走步跑步机',
                    'nPrice':'2123.00',
                    'hot':'../img/mxsp.png'
                },
                {
                    'imgUrl':'../img/idxpic105.jpg',
                    'details':'Mobil 美孚 金美孚1号 全合成机油 0W-40 1L SN',
                    'nPrice':'538.00',
                    'hot':'../img/qwdj.png'
                },
                {
                    'imgUrl':'../img/idxpic109.jpg',
                    'details':'下单输入蛋券编码 NE11 (满200-10 满500-30 满2000-40) 数量有限',
                    'nPrice':'211.00'
                },
                {
                    'imgUrl':'../img/idxpic112.jpg',
                    'details':'下单输入蛋券编码 DSV8 立减40 数量有限 先到先得',
                    'nPrice':'1138.00'
                },
                {
                    'imgUrl':'../img/idxpic115.jpg',
                    'details':'华为 HUAWEI P10 全网通 4GB+128GB 草木绿 移动联通电信4G手机',
                    'nPrice':'1711.00',
                    'hot':'../img/xpth.png'
                },
                {
                    'imgUrl':'../img/idxpic124.jpg',
                    'details':'下单输入蛋券编码 NE11 立减 (满200-10 满500-30 满2000-40) 数量有限 ',
                    'nPrice':'1138.00'
                },
                {
                    'imgUrl':'../img/idxpic67.jpg',
                    'details':'OPPO R11s 黑色 全面屏拍照手机 全网通 双卡双待 移动联通电信4G手机',
                    'nPrice':'1511.00',
                    'hot':'../img/mxsp.png'
                }
            ],
            idx:0,
            init(res){
                this.hotgoods = [];
                this.list.forEach((item,idx)=>{
                    this.hotgoods.push(Object.assign({},item,res[idx]));
                })
                this.$hotBox = $('<div/>').addClass('hotBox').appendTo($('.mainCont3'));
                this.$hotList = $('<ul/>').addClass('clearfix').appendTo(this.$hotBox);
                var data = this.hotgoods.map(item=>{
                    return `<li class="fl" data-id=${item.id}>
                                <img src="${item.imgUrl}" style="width:180px;height:135px;" />
                                <p><a>${item.details}</a></p>
                                <span>￥${item.nPrice}</span>
                                <button>抢购</button>
                            </li>`;
                }).join('');
                var self = this;
                this.$hotList.html(data).children().each(function(idx){
                    if(self.hotgoods[idx].hot){
                        var $hot = $('<img/>').addClass('hotPic').attr('src',self.hotgoods[idx].hot);
                        $(this).append($hot);
                    }
                })
                this.len = this.hotgoods.length;
                this.totleW = this.$hotList.children().outerWidth(true)*this.len;
                this.$hotList.css('width',this.totleW);     
                this.$changeBtn = $('.changeBtn').click(()=>{
                    this.idx++;
                    this.changeList();
                })
                this.$hotBox.find('a').click(function(){
                    var dataId = $(this).parents('li').attr('data-id');
                    self.setCookie(dataId);
                })
                $('button').click(function(){
                    var dataId = $(this).parents('li').attr('data-id');
                    self.setCart(dataId);
                })
            },
            setCookie(dataId){
                $.get('../api/goods.php',{'id':dataId},function(res){
                    Cookies.set('goods',JSON.stringify(res[0]),null,'/');
                    location.href = 'html/dataList.html';
                },'json');
            },
            setCart(dataId){
                $.get('../api/goods.php',{'id':dataId},(res)=>{  
                    if(Cookies.get('cart')){
                        this.cartList = JSON.parse(Cookies.get('cart'));
                    }else{
                        this.cartList =[];
                    }
                    res[0].qty = 1;
                    var getId = true;
                    for(var i = 0; i <this.cartList.length;i++){
                        if(this.cartList[i].id === res[0].id){
                            this.cartList[i].qty += res[0].qty;
                            getId = false;
                        }
                    }
                    if(getId){
                        this.cartList.push(res[0]);
                    }   
                    Cookies.set('cart',JSON.stringify(this.cartList),null,'/');
                    location.href = 'html/cart.html';
                },'json');
            },
            changeList(){
                var clientW = this.$hotBox.innerWidth();
                var maxIdx = Math.round(this.totleW/clientW);
                if(this.idx >= maxIdx){
                    this.idx = 0;
                    this.$hotList.css('left',0);
                }
                this.$hotList.stop().animate({'left':-this.idx*clientW});
            }
        }
        $.get('../api/index.php',{
            'gener':'护肤',
            'No':12,
            'view':'true'
        },function(res){
            hotArea.init(res);
        },'json')
        // 好评区;
        var praiseArea = {
            dataList:[{
                'url':'../img/praiseArea1.jpg',
                'praise':'Sennheiser 森海 PC350 特别版高性能游戏耳机 - 布朗盒版',
                'recommend':'100%',
                'num':6,
                'username':'huwanwan',
                'userCont':'音质很清晰，听起来非常舒服，棒棒的',
                'userPic':'../img/imgMini1.jpg'
            },
            {
                'url':'../img/praiseArea2.jpg',
                'praise':' Logitech罗技 G213 键盘 G403 Prodigy 游戏鼠标 组合套装',
                'recommend':'98%',
                'num':3,
                'username':'jessica',
                'userCont':'键盘很灵敏，声音不大，很好',
                'userPic':'../img/imgMini2.jpg'
            },{
                'url':'../img/praiseArea3.jpg',
                'praise':'华为 荣耀9 全网通 高配版 6GB+64GB 海鸥灰 移动联通电信4G手机 双卡双待',
                'recommend':'92%',
                'num':12,
                'username':'krystal',
                'userCont':'喜欢胡歌，喜欢他代言的手机',
                'userPic':'../img/imgMini3.jpg'
            },{
                'url':'../img/praiseArea4.jpg',
                'praise':'戴森 Dyson 吸尘器 V6 ANIMAL+ 手持吸尘器 家用除螨 无线',
                'recommend':'100%',
                'num':8,
                'username':'carlien',
                'userCont':'吸尘器很好。很方便，很高科技',
                'userPic':'../img/imgMini4.jpg'
            }],
            init(){
                this.$goodsBox = $('<ul/>').addClass('clearfix');
                this.idx = 1;  
                this.createEle();
                var $accordion = $('<div/>').addClass('accordion').append(this.$goodsBox);
                $('.hobbieList').before($accordion);
                this.otherW = this.$goodsBox.children('.active').css('width',665).siblings().outerWidth(true);
                var left;
                for(var i = 0;i < this.dataList.length;i++){
                    left+=this.$goodsBox.children().eq(i).outerWidth(true);
                    if(this.idx === 0 && i === 0){
                        this.$goodsBox.children().eq(this.idx).css('left',0);
                    }else{
                        this.$goodsBox.children().eq(i).css('left',left);
                    }
                    
                }
                var self = this;
                this.$goodsBox.on('mouseenter','li',function(){
                    self.changeLi($(this).index());
                })
            },
            changeLi(iCurNum){
                if(iCurNum == this.idx){
                    return;
                }
                this.idx = iCurNum;
                this.$goodsBox.children().eq(iCurNum).addClass('active').siblings().removeClass('active');
                this.$goodsBox[0].innerHTML = '';
                this.createEle();
                var disLeft = this.$goodsBox.children().eq(iCurNum).css('left');
                this.$goodsBox.children().eq(iCurNum).stop().animate({'width':665,'left':(disLeft-665)+disLeft}).siblings().stop().animate({'width':this.otherW});
            
            },
            createEle(){
                for(var i = 0;i < this.dataList.length;i++){
                    var $Li = $('<li/>').addClass('fl');
                    if(i === this.idx){
                        var data = `<img src="${this.dataList[i].url}" style="width:250px;height:185px" />
                                    <p><em>推荐度${this.dataList[i].recommend}</em><a href="javascript:;">${this.dataList[i].praise}</a></p>
                                    <span>${this.dataList[i].userCont}</span>
                                    <div class="user">
                                        <span>${this.dataList[i].username}</span>
                                        <img src="${this.dataList[i].userPic}" style="width:40px;height:40px"/>
                                    </div>`;
                        $Li.html(data).addClass('active');                        
                    }else{
                        var data = `
                            <p><a href="javascript:;">${this.dataList[i].praise}</a></p>
                            <em>推荐度${this.dataList[i].recommend}</em>
                            <em>${this.dataList[i].num}人已评论</em>
                            <img src="${this.dataList[i].url}" style="width:250px;height:155px" />
                        `;
                        $Li.html(data);
                    }
                    this.$goodsBox.append($Li);
                }
                
            }
        }
        praiseArea.init();
        // hobbieList区;
        var hobby = {
            leftArea:{
                width:960,
                height:240,
                list:[
                    {imgUrl:'../img/idxpic70.jpg',
                     details:'TOSHIBA 东芝 55U6600C 55英寸 3840x2160 4K高清安',
                     src:'html/dataList.html',
                     nPrice:'1232.00'
                    },
                    {imgUrl:'../img/idxpic71.jpg',
                     details:'微软(Microsoft)Surface Pro 4 二合一平板电脑 Intel Cor',
                     src:'html/dataList.html',
                     nPrice:'2332.00',
                     hot:'../img/qwdj.png'
                    },
                    {imgUrl:'../img/idxpic72.jpg',
                     details:'Canon 佳能 EOS 80D 单反相机 含 EF-S 18-200mm f/',
                     src:'html/dataList.html',
                     nPrice:'1232.00',
                     hot:'../img/qwdj.png'
                    },
                    {imgUrl:'../img/idxpic73.jpg',
                     details:'华为 Mate 9 MHA-AL00 摩卡金 内存4GB+64GB 移动联通电信4G手机 全网通 双',
                     src:'html/dataList.html',
                     nPrice:'12112.00',
                     hot:'../img/xlqg.png'
                    },
                    {imgUrl:'../img/idxpic74.jpg',
                     details:'Canon 佳能 EOS M6 15-45 微型可换镜数码相机 黑色',
                     src:'html/dataList.html',
                     nPrice:'3352.00',
                     hot:'../img/xlqg.png'
                    },
                    {imgUrl:'../img/idxpic75.jpg',
                     details:'JBL STV112 可拆分式 蓝牙音箱 Soundbar 条形音箱 回',
                     src:'html/dataList.html',
                     nPrice:'7232.00',
                     hot:'../img/qwdj.png'
                    },
                    {imgUrl:'../img/idxpic76.jpg',
                     details:'Apple MacBook Air 13.3英寸笔记本电脑 银色(Core i5 处',
                     src:'html/dataList.html',
                     nPrice:'2232.00',
                     hot:'../img/xlqg.png'
                    },
                    {imgUrl:'../img/idxpic77.jpg',
                     details:'MOPS 忻风便携空气净化器 智能防雾霾PM2.5口罩 浅蓝 ',
                     src:'html/dataList.html',
                     nPrice:'2321.00'
                    },
                    {imgUrl:'../img/idxpic78.jpg',
                     details:'Amazon亚马逊 kindle 新入门款升级版 6英寸电子墨水',
                     src:'html/dataList.html',
                     nPrice:'4353.00',
                     hot:'../img/qwdj.png'
                    },
                    {imgUrl:'../img/idxpic102.jpg',
                     details:'Microsoft 微软 New Surface Pro 二合一平板电脑 12.3英',
                     src:'html/dataList.html',
                     nPrice:'6742.00',
                     hot:'../img/xlqg.png'
                    },
                    {imgUrl:'../img/idxpic103.jpg',
                     details:'SONY 索尼 MDR-1000X Hi-Res无线 降噪 立体声 耳机 ',
                     src:'html/dataList.html',
                     nPrice:'7543.00'
                    },
                    {imgUrl:'../img/idxpic104.jpg',
                     details:'华为 HUAWEI nova 2 Plus 4GB+128GB 流光金 移动联',
                     src:'html/dataList.html',
                     nPrice:'654.00'
                    },
                    {imgUrl:'../img/idxpic105.jpg',
                     details:'华为 Mate 9 MHA-AL00 摩卡金 内存4GB+64GB 移动',
                     src:'html/dataList.html',
                     nPrice:'3456.00'
                    },
                    {imgUrl:'../img/idxpic106.jpg',
                     details:'HUAWEI 华为 MateBook D 15.6英寸轻薄窄边框笔记本',
                     src:'html/dataList.html',
                     nPrice:'6734.00',
                     hot:'../img/xlqg.png'
                    },
                    {imgUrl:'../img/idxpic107.jpg',
                     details:'Canon 佳能 EOS M6 15-45 微型可换镜数码相机 黑色',
                     src:'html/dataList.html',
                     nPrice:'3452.00'
                    },
                    {imgUrl:'../img/idxpic108.jpg',
                     details:'Yamaha 雅马哈 YAS-203BL Soundbar 无线蓝牙低音炮',
                     src:'html/dataList.html',
                     nPrice:'2345.00'
                    },
                    {imgUrl:'../img/idxpic110.jpg',
                     details:'美的 Midea 移动空调一体机冷暖大1.5p 冷暖 厨房空调K',
                     src:'html/dataList.html',
                     nPrice:'1832.00',
                     hot:'../img/xlqg.png'
                    },
                    {imgUrl:'../img/idxpic111.jpg',
                     details:'Canon 佳能 EOS M6 18-150 微型可换镜数码相机 银色',
                     src:'html/dataList.html',
                     nPrice:'1282.00',
                     hot:'../img/xlqg.png'
                    },
                    {imgUrl:'../img/idxpic116.jpg',
                     details:'MOPS Avegant 高清VR眼镜一体电玩城和移动私人影院 ',
                     src:'html/dataList.html',
                     nPrice:'1732.00'
                    },
                    {imgUrl:'../img/idxpic113.jpg',
                     details:'华为 荣耀9 全网通 高配版 6GB+64GB 海鸥灰 移动联通',
                     src:'html/dataList.html',
                     nPrice:'3132.00',
                     hot:'../img/qwdj.png'
                    }
                ],
                tips:['您也许感兴趣','新品发布','发烧好评','狠惠配']
            },
            rightArea:{
                'width':238,
                'height':268,
                'imgList':['../img/idxpic19.jpg','../img/idxpic20.jpg','../img/idxpic21.jpg','../img/idxpic22.jpg'],
                'index':0,
                'pages':true,
                'times':5000,
                'direction':'horizontal',
                'pageSize':{'width':10,'height':10}
            },
            iCur:0,
            init(res){
                // 左边盒子合并数据库传出的数据;
                this.leftArea.img = [];
                this.leftArea.list.forEach((item,idx)=>{
                    this.leftArea.img.push(Object.assign({},item,res[idx]));
                })
                // 生成左边区域的盒子;
                var $leftBox = $('<div/>').addClass('leftBox fl').appendTo($('.hobbieList'));
                this.leftArea.areaNum = Math.ceil(this.leftArea.img.length/this.leftArea.tips.length);
                this.$tipsBox = $('<ul/>').addClass('clear fix tipsBox').appendTo($leftBox);
                this.leftArea.tips.forEach((item,idx)=>{
                    var $List = $('<li/>').addClass('tabList fl').text(item).appendTo(this.$tipsBox);
                    var $goods = $('<ul/>').addClass('goods clearfix').css({
                        'width':this.leftArea.width,
                        'height':this.leftArea.height
                    });
                    var len = (idx+1)*this.leftArea.areaNum;
                    var data = '';
                    for(var i = this.leftArea.areaNum*idx;i < len;i++){
                        if(this.leftArea.img[i].hot){
                            data += `<li class="fl" data-id=${this.leftArea.img[i].id}>
                                        <a>
                                            <img src="${this.leftArea.img[i].imgUrl}" style="width:144px;height:108px;" />
                                        </a>
                                        <p><a>${this.leftArea.img[i].details}</a></p>
                                        <span>￥${this.leftArea.img[i].nPrice}</span>
                                        <img src="${this.leftArea.img[i].hot}" class="sTips" />
                                    </li>`;
                        }else{
                            data += `<li class="fl" data-id=${this.leftArea.img[i].id}>
                                        <a>
                                            <img src="${this.leftArea.img[i].imgUrl}" style="width:144px;height:108px;" />
                                        </a>
                                        <p><a>${this.leftArea.img[i].details}</a></p>
                                        <span>￥${this.leftArea.img[i].nPrice}</span>
                                    </li>`; 
                        }  
                    }
                    $goods.html(data).appendTo($leftBox);
                });
                // 生成右边盒子;
                var $rightBox = $('<div/>').addClass('rightBox fr').css({
                    'width':this.rightArea.width,
                    'height':this.rightArea.height
                }).appendTo($('.hobbieList'));

                // 左边区域初始化;
                this.$tipsBox.children().eq(this.iCur).addClass('active').siblings().removeClass('active');
                $('.goods').eq(this.iCur).show().siblings('.goods').hide();
                // 给左边区域的盒子标题加鼠标移入事件;
                var self = this;
                this.$tipsBox.on('mouseover','li',function(){
                    self.iCur = $(this).index();
                    self.active($(this));
                })
                // 给右边盒子加轮播;
                this.move($rightBox);
                var self = this;
                $leftBox.find('a').click(function(){
                    var dataId = $(this).parents('li').attr('data-id');
                    self.setCookie(dataId);
                })
            },
            setCookie(dataId){
                $.get('../api/goods.php',{'id':dataId},function(res){
                    res = JSON.stringify(res[0]);
                    Cookies.set('goods',res,null,'/');
                    location.href = 'html/dataList.html';
                },'json')
            },
            active(ele){
                ele.addClass().addClass('active').siblings().removeClass('active');
                 $('.goods').eq(this.iCur).show().siblings('.goods').hide();
            },
            move(ele){
                ele.hwCarousel(this.rightArea);
            }
        }
        $.get('../api/index.php',{
            'gener':'数码',
            'No':20,
            'nPrice':'true'
        },function(res){
            hobby.init(res);
        },'json')

        function CommonArea(opt){
            this.parent = opt.obj;
            this.width = opt.carouselData.width;
            this.height = opt.carouselData.height;
            this.picList = opt.smallBox;
            this.tabData = opt.carouselData;
            this.iconList = opt.iCon;
            this.hotList = opt.tabList;
            this.tabTitle = opt.tabTitle;
            this.tabTips = opt.tabTips;
            this.btmPic = opt.btmPic;
            this.idx = 0;
            this.init();
        }
        CommonArea.prototype = {
                construtor:'CommonArea',
                init(){
                    this.$tBox = $('<div/>').addClass('areaTop fl clearfix').appendTo($(this.parent));
                    // 生成第一个小盒子;
                    this.createEle(0,this.picList,1);      
                    // 生成第二个盒子;
                    var $carouselBox = $('<div/>').attr('data-id',this.picList[1].id).addClass('fl').css({
                        'width':this.width,
                        'height':this.height
                    }).appendTo(this.$tBox);
                    // 调用方法,生成轮播;
                    this.move($carouselBox,this.tabData);
                    // 生成其余的盒子;
                    this.createEle(1,this.picList,this.picList.length);
                    //生成底部盒子;
                    var $boxBtm = $('<ul/>').addClass('areaBtm clearfix fl');
                    var btmCont = this.iconList.map((item)=>{
                        return `<li class="fl">
                                    <a href="javascript:;">
                                        <img src="${item}" alt="" />
                                    </a>
                                </li>`;
                    }).join('');
                    // 生成侧边盒子;
                    this.$aside = $('<div/>').addClass('asideArea fr').appendTo($(this.parent));
                    var $asideT = $('<div/>').addClass('asideTop');
                    var topCont = `<h4 class="fl">${this.tabTitle}</h4>`;
                    $asideT.html(topCont);
                    var $ul = $('<ul/>').addClass('fl');
                    for(var i = 0;i < this.tabTips.length;i++){
                        var $list = $('<li/>').addClass('fl').text(this.tabTips[i]);
                        $ul.append($list).appendTo($asideT)
                    }
                    this.$aside.append($asideT);
                    for(var j = 0;j < this.hotList.length;j++){
                         var $item = $('<div/>').addClass('asideBtm');
                        for(var i = 0;i < this.hotList[j].length;i++){
                            var $cont = $('<div/>').attr('data-id',this.hotList[j][i].id);
                            var data = `
                                <a href="javascript:;">
                                    <img src="${this.hotList[j][i].imgUrl}" style="width:80px;height:60px;" />
                                </a>
                                <p><a>${this.hotList[j][i].details}<a></p>
                                <span>￥${this.hotList[j][i].nPrice}</span>
                            `;
                            $cont.html(data).appendTo($item)
                        }                     
                        $item.appendTo(this.$aside);
                    }
                    // 侧边初始化;
                    $ul.children().eq(this.idx).addClass('active');
                    this.$aside.find('.asideBtm').eq(this.idx).show().siblings('.asideBtm').hide();
                    // 侧边底部广告;
                    var btmPic = $('<img/>').addClass('btmPic').attr('src',this.btmPic).appendTo(this.$aside);
                    var self = this;
                    $boxBtm.html(btmCont).appendTo($(this.parent)).on('mouseenter','li',function(){
                        self.iConT = parseInt($boxBtm.find('img').height())/2;
                        self.iConOver($(this))
                    }).on('mouseleave','li',function(){
                        self.iConOut($(this)) 
                    });
                    // 侧边tab标签切换;
                    $ul.on('mouseover','li',function(){
                        self.tipsOver($(this));
                    })
                    this.$aside.find('a').click(function(){
                        var dataId = $(this).parents('div').attr('data-id');
                        self.setCookie(dataId);
                    })
                    $('.areaTop').find('a').click(function(){
                        var dataId = $(this).parents('div').attr('data-id');
                        self.setCookie(dataId);
                    })
                },
                move(ele,opt){
                    ele.hwCarousel(opt);
                },
                setCookie(dataId){
                    $.get('../api/goods.php',{'id':dataId},function(res){
                        res = JSON.stringify(res[0]);
                        Cookies.set('goods',res,null,'/');
                        location.href = 'html/dataList.html';
                    },'json')
                },
                createEle(idx,arr,len){
                    for(var i = idx; i < len;i++){
                        var $boxList = $('<div/>').attr('data-id',arr[i].id).addClass('goodsBox fl');
                        if(arr[i].oPrice!== undefined && arr[i].icon!== undefined){
                            $boxList[0].innerHTML = `
                                <a>
                                    <img src="${arr[i].imgUrl}" style="width:144px;height:108px;" />
                                </a>
                                <p><a><i style="background:url('${arr[i].icon}');"></i>${arr[i].details}</a></p>
                                <span><em>￥${arr[i].oPrice}</em>￥${arr[i].nPrice}</span>
                                <img class="hotIcon" src="${arr[i].hot}" alt="" />
                            `;
                        }else{
                            $boxList[0].innerHTML = `
                                <a>
                                    <img src="${arr[i].imgUrl}" style="width:144px;height:108px;" />
                                </a>
                                <p><a>${arr[i].details}</a></p>
                                <span>￥${arr[i].nPrice}</span>
                                <img class="hotIcon" src="${arr[i].hot}" alt="" />
                            `;
                        }
                        this.$tBox.append($boxList);
                    }
                },
                iConOver(ele){
                    ele.find('img').css({
                        'top':-this.iConT
                    }).parents('li').siblings().find('img').css({
                        'top':0
                    });
                },
                iConOut(ele){
                    ele.find('img').css({
                        'top':0
                    });
                },
                tipsOver(ele){
                    this.idx = ele.index();
                    ele.addClass('active').siblings().removeClass('active');
                    this.$aside.find('.asideBtm').eq(this.idx).show().siblings('.asideBtm').hide();
                }
        }

        // 海外直购部分;
        var seaData = {
                    obj:'.overseas',
                    carouselData:{
                    width:480,
                    height:205,
                    imgList:['../img/idxpic24','../img/idxpic25','../img/idxpic26','../img/idxpic27','../img/idxpic28','../img/idxpic29','../img/idxpic30'],
                    index:0,
                    btns:false,
                    pages:true,
                    seamless:true,
                    times:3000,
                    direction:'horizontal',
                    pageNum:true,
                    pageSize:{'width':20,'height':20}
                    },
                    iCon:['../img/logo11.jpg','../img/logo12.jpg','../img/logo13.jpg','../img/logo114.jpg','../img/logo14.jpg','../img/logo15.jpg','../img/logo16.jpg','../img/logo17.jpg','../img/logo18.jpg'],
                    tabTitle:'热销榜',
                    btmPic:'../img/idxpic8.jpg'
        };        
        var seaList = [['护肤',6,'true'],['面膜',4,'true'],['箱包',4,'true']];
        var seaBox = [{'hot':'../img/xlqg.png',
                          'href':'html/dataList.html',
                          'icon':'../img/overseashopping12.png'
                        },
                        {'hot':'../img/rqfq.png',
                          'href':'html/dataList.html',
                          'icon':'../img/overseashopping12.png'   
                        },
                        {'hot':'../img/qwdj.png',
                          'href':'html/dataList.html',
                          'icon':'../img/overseashopping12.png'   
                        },
                        {'hot':'../img/rqfq.png',
                          'href':'html/dataList.html',
                          'icon':'../img/overseashopping12.png'   
                        },
                        {'hot':'../img/xlqg.png',
                          'href':'html/dataList.html',
                          'icon':'../img/overseashopping12.png'
                        },
                        {'hot':'../img/xsqg.png',
                          'href':'html/dataList.html',
                          'icon':'../img/overseashopping12.png'
                        }
            ];
        var seaTips = ['面膜','箱包'];
        setPromise(seaData,seaList,seaBox,seaTips);
        // 手机区域;        
        var phoneList = [['数码',6,'true'],['手机',4,'true'],['路由器',4,'true']];
        var phoneBox = [{'hot':'../img/xsqg.png',
                          'href':'html/dataList.html'
                        },
                        {'hot':'../img/xsqg.png',
                          'href':'html/dataList.html'
                        },
                        {'hot':'../img/qwdj.png',
                          'href':'html/dataList.html'
                        },
                        {'hot':'../img/rqfq.png',
                          'href':'html/dataList.html'   
                        },
                        {'hot':'../img/xlqg.png',
                          'href':'html/dataList.html'
                        },
                        {'hot':'../img/rqfq.png',
                          'href':'html/dataList.html'
                        }
            ];
        var phoneData = {
            obj:'.phoneList',
            carouselData:{
                width:480,
                height:205,
                imgList:['../img/idxpic31','../img/idxpic32','../img/idxpic33','../img/idxpic34','../img/idxpic34','../img/idxpic35','../img/idxpic36'],
                index:0,
                btns:false,
                pages:true,
                seamless:true,
                times:3000,
                direction:'horizontal',
                pageNum:true,
                pageSize:{'width':20,'height':20}
            },
            iCon:['../img/logo110.jpg','../img/logo114.jpg','../img/logo115.jpg','../img/logo116.jpg','../img/logo118.jpg','../img/logo120.jpg','../img/logo112.jpg','../img/logo126.jpg','../img/logo133.jpg'],
            tabTitle:'热销榜',
            btmPic:'../img/bkej.jpg'
        }    
        var phoneTips = ['手机','路由器'];
        setPromise(phoneData,phoneList,phoneBox,phoneTips);

        // 电脑平板
        var cmpBox = [{'hot':'../img/xsqg.png',
                          'href':'html/dataList.html'
                        },
                        {'hot':'../img/xpsf.png',
                          'href':'html/dataList.html'
                        },
                        {'hot':'../img/qwdj.png',
                          'href':'html/dataList.html'
                        },
                        {'hot':'../img/xsqg.png',
                          'href':'html/dataList.html'
                        },
                        {'hot':'../img/xpth.png',
                          'href':'html/dataList.html'
                        },
                        {'hot':'../img/rqfq.png',
                          'href':'html/dataList.html'
                        }
            ];
        var cmpList = [['箱包',6,'true'],['数码',4,'true'],['箱包',4,'true']]; 
        var cmpData = {
            obj:'.computedList',
            carouselData:{
                width:480,
                height:205,
                imgList:['../img/idxpic36','../img/idxpic37','../img/idxpic38','../img/idxpic39','../img/idxpic40','../img/idxpic41','../img/idxpic42'],
                index:0,
                btns:false,
                pages:true,
                seamless:true,
                times:3000,
                direction:'horizontal',
                pageNum:true,
                pageSize:{'width':20,'height':20}
            },
            iCon:['../img/logo127.jpg','../img/logo128.jpg','../img/logo129.jpg','../img/logo130.jpg','../img/logo131.jpg','../img/logo132.jpg','../img/logo133.jpg','../img/logo134.jpg','../img/logo135.jpg'],
            tabTitle:'热销榜',
            btmPic:'../img/idxpic6.jpg'
        }    
        var cmpTips = ['数码','箱包'];
        setPromise(cmpData,cmpList,cmpBox,cmpTips);
        // 家用电器
        var homeBox = [{'hot':'../img/xsqg.png',
                          'href':'html/dataList.html'
                        },
                        {'hot':'../img/xpsf.png',
                          'href':'html/dataList.html'
                        },
                        {'hot':'../img/qwdj.png',
                          'href':'html/dataList.html'
                        },
                        {'hot':'../img/xsqg.png',
                          'href':'html/dataList.html'
                        },
                        {'hot':'../img/qwdj.png',
                          'href':'html/dataList.html'
                        },
                        {'hot':'../img/qwdj.png',
                          'href':'html/dataList.html'
                        }
            ];
        var homeList = [['路由器',6,'true'],['护肤',4,'true'],['数码',4,'true']]; 
        var homeData = {
            obj:'.appliance',
            carouselData:{
                width:480,
                height:205,
                imgList:['../img/idxpic42','../img/idxpic43','../img/idxpic44','../img/idxpic45','../img/idxpic46','../img/idxpic47','../img/idxpic48'],
                index:0,
                btns:false,
                pages:true,
                seamless:true,
                times:3000,
                direction:'horizontal',
                pageNum:true,
                pageSize:{'width':20,'height':20}
            },
            iCon:['../img/logo111.jpg','../img/logo112.jpg','../img/logo113.jpg','../img/logo115.jpg','../img/logo117.jpg','../img/logo16.jpg','../img/logo137.jpg','../img/logo18.jpg','../img/logo140.jpg'],
            tabTitle:'热销榜',
            btmPic:'../img/idxpic7.jpg'
        }  
        var homeTips = ['护肤','数码'];
        setPromise(homeData,homeList,homeBox,homeTips);
        
        // 生活百货
        var lifeData = {
            obj:'.lifeStyle',
            carouselData:{
                width:480,
                height:205,
                imgList:['../img/idxpic49','../img/idxpic50','../img/idxpic51','../img/idxpic52','../img/idxpic53','../img/idxpic54','../img/idxpic55'],
                index:0,
                btns:false,
                pages:true,
                seamless:true,
                times:3000,
                direction:'horizontal',
                pageNum:true,
                pageSize:{'width':20,'height':20}
            },
            iCon:['../img/logo135.jpg','../img/logo136.jpg','../img/logo137.jpg','../img/logo138.jpg','../img/logo139.jpg','../img/logo140.jpg','../img/logo141.jpg','../img/panasoniclogo1.jpg','../img/midea.jpg'],
            tabTitle:'热销榜',
            btmPic:'../img/idxpic9.jpg'
        }
        
        var lifeBox = [{'hot':'../img/xsqg.png',
                          'href':'html/dataList.html'
                        },
                        {'hot':'img/xpsf.png',
                          'href':'html/dataList.html'  
                        },
                        {'hot':'img/qwdj.png',
                          'href':'html/dataList.html'  
                        },
                        {'hot':'../img/xsqg.png',
                          'href':'html/dataList.html'   
                        },
                        {'hot':'../img/xpth.png',
                          'href':'html/dataList.html'
                        },
                        {'hot':'../img/rqfq.png',
                          'href':'html/dataList.html'
                        }
        ];
        var lifeList = [['机油',6,'true'],['箱包',4,'true'],['手机',4,'true']]; 
        var lifeTips = ['箱包','手机'];
        setPromise(lifeData,lifeList,lifeBox,lifeTips);        
        function setPromise(disData,getList,smallBox,tips){
            var sPromise = new Promise(function(resolve,reject){
                   var list = getList[0];
                    $.get('../api/index.php',{
                        'gener':list[0],
                        'No':list[1],
                        'price':list[2]
                    },function(res){
                        resolve(res);
                    },'json');
            });        
            sPromise.then(function(res){
                    var dataBox = res;
                    var tabList1 = new Promise(function(resolve,reject){
                    var list = getList[1];
                    $.get('../api/index.php',{
                            'gener':list[0],
                            'No':list[1],
                            'view':list[2]
                        },function(data){
                            resolve([dataBox,data]);
                    },'json');
                })
                return tabList1;
            }).then(function(arr){
                var arr = arr;
                var tabList2 = new Promise(function(resolve,reject){
                    var list = getList[2];
                    $.get('../api/index.php',{
                        'gener': list[0],
                        'No': list[1],
                        'view': list[2]
                    },function(res){
                        arr.push(res);
                        resolve(arr);
                    },'json');
                })
                return tabList2;
            }).then(function(arr){
                var tabs = [];
                var newArr = [];
                smallBox.forEach((item,idx)=>{
                    newArr.push(Object.assign({},item,arr[0][idx]));
                })
                tabs.push(arr[1],arr[2]);
                disData.smallBox = newArr;
                disData.tabTips = tips;
                disData.tabList = tabs;
                new CommonArea(disData)   
            });
        };



         $('a').click(function(){
                var data_id = $(this).parents('li').attr('data-id');
                $.get('../api/index.php',{'id':data_id},function(res){
                    console.log(res);
                },'json')
        })
    })
})
