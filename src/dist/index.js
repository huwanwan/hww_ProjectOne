
/* 
* @Author: Marte
* @Date:   2017-11-10 16:54:09
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-14 12:29:21
*/
(function(){
    jQuery(function($){
        // load(url,[data],[callback]) 载入远程 HTML 文件代码并插入页面中。
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
            $('.navSec').on('mouseenter','li',function(){
                var setTop = ($(this).parents('.navSec').position().top)-$(this).outerHeight();
                timer = setTimeout(()=>{
                    $(this).siblings().css('backgroundColor','#F2F2F2');
                    $(this).find('.navThird').css('display','block').stop().animate({'top':setTop}).parent().siblings().find('.navThird').css('display','none');
                },500)
            }).on('mouseleave','li',function(){
                    $(this).siblings().css('backgroundColor','');
                    clearTimeout(timer);
                    $(this).find('.navThird').css({'display':'none',
                                                    'top':0    
                                                });
            })
        });
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
            countPic:[
                {
                    'url':'../img/idxpic60.jpg',
                    'cont':'下单输入蛋券NE11享立减40元',
                    'price':'1115.00'
                },
                {
                    'url':'../img/idxpic71.jpg',
                    'cont':'下单输入蛋券编码 NE11 (满200-10 满500-30 满2000-4',
                    'price':'2352.00'
                },
                {
                    'url':'../img/idxpic72.jpg',
                    'cont':'下单输入蛋券NE11享立减40元',
                    'price':'2115.00'
                },
                {
                    'url':'../img/idxpic128.jpg',
                    'cont':'下单输入蛋券编码 DSV8 立减40 数量有限 先到先得',
                    'price':'2475.00'
                },
                {
                    'url':'../img/idxpic107.jpg',
                    'cont':'使用蛋券 NE11立减30',
                    'price':'1321.00'
                },
                {
                    'url':'../img/idxpic126.jpg',
                    'cont':'下单输入蛋券编码KBH11满99立减5元/满199立减10元',
                    'price':'1723.00'
                },
                {
                    'url':'../img/idxpic121.jpg',
                    'cont':'下单输入蛋券编码 DSV8 立减40 数量有限 先到先得',
                    'price':'1138.00'
                },
                {
                    'url':'../img/idxpic98.jpg',
                    'cont':'下单输入蛋券NE11享立减40元',
                    'price':'1711.00'
                }

            ],
            init(){
                this.$countList = $('<div/>').addClass('countBox clearfix');
                this.$goodsList = $('<ul/>');
                var List = counts.countPic.map(goods=>{
                    return `
                        <li class="item fl">
                            <img src="${goods.url}" />
                            <p>${goods.cont}</p>
                            <span>￥${goods.price}</span>
                        </li>
                    `;
                }).join('');
                this.$goodsList.html(List);
                 this.$countList.append(this.$goodsList).appendTo($countGoods);
                this.len = counts.countPic.length;
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
                }.bind(this))
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
        counts.init();
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
            hotgoods:[
                {
                    'url':'../img/idxpic69.jpg',
                    'cont':'TP-LINK 普联 TL-SG1024T 24口全千兆以太网交换机 3种功能',
                    'price':'2115.00',
                    'hot':'../img/mxsp.png'
                },
                {
                    'url':'../img/idxpic79.jpg',
                    'cont':'SONY 索尼 Hi-Res高解析度无损音乐播放器16GB NW-ZX300A 黑色',
                    'price':'1352.00'
                },
                {
                    'url':'../img/idxpic90.jpg',
                    'cont':'华为 Mate 9 MHA-AL00 摩卡金 内存4GB+64GB 移动联通电信4G手机 全',
                    'price':'2515.00',
                    'hot':'../img/mxsp.png'
                },
                {
                    'url':'../img/idxpic92.jpg',
                    'cont':'下单输入蛋券编码 DSV8 立减40 数量有限 先到先得',
                    'price':'1175.00',
                    'hot':'../img/rqbk.png'
                },
                {
                    'url':'../img/idxpic93.jpg',
                    'cont':'MOPS Avegant 高清VR眼镜一体电玩城和移动私人影院 智能穿戴',
                    'price':'1221.00'
                },
                {
                    'url':'../img/idxpic99.jpg',
                    'cont':'居康/jufit 居康JFF008TM 家用跑步机 免安装迷你折叠静音电动走步跑步机',
                    'price':'2123.00',
                    'hot':'../img/mxsp.png'
                },
                {
                    'url':'../img/idxpic105.jpg',
                    'cont':'Mobil 美孚 金美孚1号 全合成机油 0W-40 1L SN',
                    'price':'538.00',
                    'hot':'../img/qwdj.png'
                },
                {
                    'url':'../img/idxpic109.jpg',
                    'cont':'下单输入蛋券编码 NE11 (满200-10 满500-30 满2000-40) 数量有限',
                    'price':'211.00'
                },
                {
                    'url':'../img/idxpic112.jpg',
                    'cont':'下单输入蛋券编码 DSV8 立减40 数量有限 先到先得',
                    'price':'1138.00'
                },
                {
                    'url':'../img/idxpic115.jpg',
                    'cont':'华为 HUAWEI P10 全网通 4GB+128GB 草木绿 移动联通电信4G手机',
                    'price':'1711.00',
                    'hot':'../img/xpth.png'
                },
                {
                    'url':'../img/idxpic124.jpg',
                    'cont':'下单输入蛋券编码 NE11 立减 (满200-10 满500-30 满2000-40) 数量有限 ',
                    'price':'1138.00'
                },
                {
                    'url':'../img/idxpic67.jpg',
                    'cont':'OPPO R11s 黑色 全面屏拍照手机 全网通 双卡双待 移动联通电信4G手机',
                    'price':'1511.00',
                    'hot':'../img/mxsp.png'
                }
            ],
            idx:0,
            init(){
                this.$hotBox = $('<div/>').addClass('hotBox').appendTo($('.mainCont3'));
                this.$hotList = $('<ul/>').addClass('clearfix').appendTo(this.$hotBox);
                var data = this.hotgoods.map(item=>{
                    return `<li class="fl">
                                <img src="${item.url}" />
                                <p>${item.cont}</p>
                                <span>￥${item.price}</span>
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
        hotArea.init();
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
                img:[
                    {url:'../img/idxpic70.jpg',
                     cont:'TOSHIBA 东芝 55U6600C 55英寸 3840x2160 4K高清安',
                     src:'http://www.newegg.cn/Product/A41-5PQ-36YN03.htm?&neg_sp=Home-_-A41-5PQ-36YN03-_-UserDefineProductV1',
                     price:'1232.00'
                    },
                    {url:'../img/idxpic71.jpg',
                     cont:'微软(Microsoft)Surface Pro 4 二合一平板电脑 Intel Cor',
                     src:'http://www.newegg.cn/Product/A41-5PQ-36YN03.htm?&neg_sp=Home-_-A41-5PQ-36YN03-_-UserDefineProductV1',
                     price:'2332.00',
                     hot:'../img/qwdj.png'
                    },
                    {url:'../img/idxpic72.jpg',
                     cont:'Canon 佳能 EOS 80D 单反相机 含 EF-S 18-200mm f/',
                     src:'http://www.newegg.cn/Product/A41-5PQ-36YN03.htm?&neg_sp=Home-_-A41-5PQ-36YN03-_-UserDefineProductV1',
                     price:'1232.00',
                     hot:'../img/qwdj.png'
                    },
                    {url:'../img/idxpic73.jpg',
                     cont:'华为 Mate 9 MHA-AL00 摩卡金 内存4GB+64GB 移动联通电信4G手机 全网通 双',
                     src:'http://www.newegg.cn/Product/A41-5PQ-36YN03.htm?&neg_sp=Home-_-A41-5PQ-36YN03-_-UserDefineProductV1',
                     price:'12112.00',
                     hot:'../img/xlqg.png'
                    },
                    {url:'../img/idxpic74.jpg',
                     cont:'Canon 佳能 EOS M6 15-45 微型可换镜数码相机 黑色',
                     src:'http://www.newegg.cn/Product/A41-5PQ-36YN03.htm?&neg_sp=Home-_-A41-5PQ-36YN03-_-UserDefineProductV1',
                     price:'3352.00',
                     hot:'../img/xlqg.png'
                    },
                    {url:'../img/idxpic75.jpg',
                     cont:'JBL STV112 可拆分式 蓝牙音箱 Soundbar 条形音箱 回',
                     src:'http://www.newegg.cn/Product/A41-5PQ-36YN03.htm?&neg_sp=Home-_-A41-5PQ-36YN03-_-UserDefineProductV1',
                     price:'7232.00',
                     hot:'../img/qwdj.png'
                    },
                    {url:'../img/idxpic76.jpg',
                     cont:'Apple MacBook Air 13.3英寸笔记本电脑 银色(Core i5 处',
                     src:'http://www.newegg.cn/Product/A41-5PQ-36YN03.htm?&neg_sp=Home-_-A41-5PQ-36YN03-_-UserDefineProductV1',
                     price:'2232.00',
                     hot:'../img/xlqg.png'
                    },
                    {url:'../img/idxpic77.jpg',
                     cont:'MOPS 忻风便携空气净化器 智能防雾霾PM2.5口罩 浅蓝 ',
                     src:'http://www.newegg.cn/Product/A41-5PQ-36YN03.htm?&neg_sp=Home-_-A41-5PQ-36YN03-_-UserDefineProductV1',
                     price:'2321.00'
                    },
                    {url:'../img/idxpic78.jpg',
                     cont:'Amazon亚马逊 kindle 新入门款升级版 6英寸电子墨水',
                     src:'http://www.newegg.cn/Product/A41-5PQ-36YN03.htm?&neg_sp=Home-_-A41-5PQ-36YN03-_-UserDefineProductV1',
                     price:'4353.00',
                     hot:'../img/qwdj.png'
                    },
                    {url:'../img/idxpic102.jpg',
                     cont:'Microsoft 微软 New Surface Pro 二合一平板电脑 12.3英',
                     src:'http://www.newegg.cn/Product/A41-5PQ-36YN03.htm?&neg_sp=Home-_-A41-5PQ-36YN03-_-UserDefineProductV1',
                     price:'6742.00',
                     hot:'../img/xlqg.png'
                    },
                    {url:'../img/idxpic103.jpg',
                     cont:'SONY 索尼 MDR-1000X Hi-Res无线 降噪 立体声 耳机 ',
                     src:'http://www.newegg.cn/Product/A41-5PQ-36YN03.htm?&neg_sp=Home-_-A41-5PQ-36YN03-_-UserDefineProductV1',
                     price:'7543.00'
                    },
                    {url:'../img/idxpic104.jpg',
                     cont:'华为 HUAWEI nova 2 Plus 4GB+128GB 流光金 移动联',
                     src:'http://www.newegg.cn/Product/A41-5PQ-36YN03.htm?&neg_sp=Home-_-A41-5PQ-36YN03-_-UserDefineProductV1',
                     price:'654.00'
                    },
                    {url:'../img/idxpic105.jpg',
                     cont:'华为 Mate 9 MHA-AL00 摩卡金 内存4GB+64GB 移动',
                     src:'http://www.newegg.cn/Product/A41-5PQ-36YN03.htm?&neg_sp=Home-_-A41-5PQ-36YN03-_-UserDefineProductV1',
                     price:'3456.00'
                    },
                    {url:'../img/idxpic106.jpg',
                     cont:'HUAWEI 华为 MateBook D 15.6英寸轻薄窄边框笔记本',
                     src:'http://www.newegg.cn/Product/A41-5PQ-36YN03.htm?&neg_sp=Home-_-A41-5PQ-36YN03-_-UserDefineProductV1',
                     price:'6734.00',
                     hot:'../img/xlqg.png'
                    },
                    {url:'../img/idxpic107.jpg',
                     cont:'Canon 佳能 EOS M6 15-45 微型可换镜数码相机 黑色',
                     src:'http://www.newegg.cn/Product/A41-5PQ-36YN03.htm?&neg_sp=Home-_-A41-5PQ-36YN03-_-UserDefineProductV1',
                     price:'3452.00'
                    },
                    {url:'../img/idxpic108.jpg',
                     cont:'Yamaha 雅马哈 YAS-203BL Soundbar 无线蓝牙低音炮',
                     src:'http://www.newegg.cn/Product/A41-5PQ-36YN03.htm?&neg_sp=Home-_-A41-5PQ-36YN03-_-UserDefineProductV1',
                     price:'2345.00'
                    },
                    {url:'../img/idxpic110.jpg',
                     cont:'美的 Midea 移动空调一体机冷暖大1.5p 冷暖 厨房空调K',
                     src:'http://www.newegg.cn/Product/A41-5PQ-36YN03.htm?&neg_sp=Home-_-A41-5PQ-36YN03-_-UserDefineProductV1',
                     price:'1832.00',
                     hot:'../img/xlqg.png'
                    },
                    {url:'../img/idxpic111.jpg',
                     cont:'Canon 佳能 EOS M6 18-150 微型可换镜数码相机 银色',
                     src:'http://www.newegg.cn/Product/A41-5PQ-36YN03.htm?&neg_sp=Home-_-A41-5PQ-36YN03-_-UserDefineProductV1',
                     price:'1282.00',
                     hot:'../img/xlqg.png'
                    },
                    {url:'../img/idxpic116.jpg',
                     cont:'MOPS Avegant 高清VR眼镜一体电玩城和移动私人影院 ',
                     src:'http://www.newegg.cn/Product/A41-5PQ-36YN03.htm?&neg_sp=Home-_-A41-5PQ-36YN03-_-UserDefineProductV1',
                     price:'1732.00'
                    },
                    {url:'../img/idxpic113.jpg',
                     cont:'华为 荣耀9 全网通 高配版 6GB+64GB 海鸥灰 移动联通',
                     src:'http://www.newegg.cn/Product/A41-5PQ-36YN03.htm?&neg_sp=Home-_-A41-5PQ-36YN03-_-UserDefineProductV1',
                     price:'3132.00',
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
            init(){
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
                            data += `<li class="fl">
                                        <a href="${this.leftArea.img[i].src}">
                                            <img src="${this.leftArea.img[i].url}" />
                                        </a>
                                        <p>${this.leftArea.img[i].cont}</p>
                                        <span>￥${this.leftArea.img[i].price}</span>
                                        <img src="${this.leftArea.img[i].hot}" class="sTips" />
                                    </li>`;
                        }else{
                            data += `<li class="fl">
                                        <a href="${this.leftArea.img[i].src}">
                                            <img src="${this.leftArea.img[i].url}" />
                                        </a>
                                        <p>${this.leftArea.img[i].cont}</p>
                                        <span>￥${this.leftArea.img[i].price}</span>
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
            },
            active(ele){
                ele.addClass().addClass('active').siblings().removeClass('active');
                 $('.goods').eq(this.iCur).show().siblings('.goods').hide();
            },
            move(ele){
                ele.hwCarousel(this.rightArea);
            }
        }
        hobby.init();

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
                    var $carouselBox = $('<div/>').addClass('fl').css({
                        'width':this.width,
                        'height':this.height
                    }).appendTo(this.$tBox);
                    // 调用方法,生成轮播;
                    this.move($carouselBox,this.tabData);
                    // 生成其余的盒子;
                    this.createEle(1,this.picList,this.picList.url.length);
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
                            var $cont = $('<div/>');
                            var data = `
                                <a href="javascript:;">
                                    <img src="${this.hotList[j][i].url}" />
                                </a>
                                <p>${this.hotList[j][i].cont}</p>
                                <span>￥${this.hotList[j][i].price}</span>
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
                },
                move(ele,opt){
                    ele.hwCarousel(opt);
                },
                createEle(idx,arr,len){
                    for(var i = idx; i < len;i++){
                        var $boxList = $('<div/>').addClass('goodsBox fl');
                        if(arr.oldPrice!== undefined && arr.icon!== undefined){
                            $boxList[0].innerHTML = `
                                <a href="${arr.href}" alt="">
                                    <img src="${arr.url[i]}" />
                                </a>
                                <p><i style="background:url('${arr.icon}');"></i>${arr.cont[0]}</p>
                                <span><em>￥${arr.oldPrice[i]}</em>￥${arr.newPrice[i]}</span>
                                <img class="hotIcon" src="${arr.hot[i]}" alt="" />
                            `;
                        }else{
                            $boxList[0].innerHTML = `
                                <a href="${arr.href}" alt="">
                                    <img src="${arr.url[i]}" />
                                </a>
                                <p>${arr.cont[0]}</p>
                                <span>￥${arr.newPrice[i]}</span>
                                <img class="hotIcon" src="${arr.hot[i]}" alt="" />
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
        // 海外购
        var seaData = {
            obj:'.overseas',
            smallBox:{
                'url':['../img/idxpic70.jpg','../img/idxpic71.jpg','../img/idxpic72.jpg','../img/idxpic73.jpg','../img/idxpic74.jpg','../img/idxpic75.jpg'],
                 'icon':'../img/overseashopping12.png',
                 'cont':['Yamaha 雅马哈 YAS-107 双内置低音扬声器','意大利直邮 Michael Kors MK短款十字纹钱包 黑色','香港直邮 日本 虎牌焖烧杯 MCL-A030-AM蓝色300mL',' 香港直邮 美国kiehl\'s科颜氏 契尔氏 高保湿蛋白面霜50ml','Tiger 虎牌 JBA-T10UW 5.5-cup Micom Rice Cooker Whit'],
                 'oldPrice':['2102.00','1263.00','5521.00','411.00','1321.00','4543.00'],
                 'newPrice':['1432.00','1142.00','3312.00','331.00','1002.00','3000.00'],
                 'hot':['../img/xlqg.png','../img/rqfq.png','../img/xsqg.png','../img/qwdj.png','../img/rqfq.png','../img/xsqg.png'],
                 'href':'javascript:;'      
            },
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
            tabTips:['手表','奶粉'],
            tabList:[[
                {
                    url:'../img/s5k3.jpg',
                    cont:'Timex 天美时 T2P142 腕表',
                    price:'4232.00'
                },
                {
                    url:'../img/s5k4.jpg',
                    cont:'Swiss Precimax SP12171 男款计时表',
                    price:'3222.00',
                },
                {   url:'../img/s5k5.jpg',
                    cont:'Citizen 西铁城 Eco-Drive Axiom AU1065-07E 男款光动能腕表',
                    price:'10023.00',

                },
                {   url:'../img/s5k6.jpg',
                    cont:'Fossil 女式手表Jacqueli系列ES3487复古',
                    price:'23221.00',

                }],[
                {
                    url:'../img/naifen1.jpg',
                    cont:'英国直邮英国惠氏婴幼儿牛奶粉800g3段1',
                    price:'226.00'
                },
                {
                    url:'../img/naifen2.jpg',
                    cont:'英国直邮英国Nanny Care 婴儿羊 奶粉3段',
                    price:'324.00',
                },
                {   url:'../img/naifen3.jpg',
                    cont:'荷兰直邮 德国爱他美Aptamil奶粉 3段 800',
                    price:'523.00',

                },
                {   url:'../img/naifen4.jpg',
                    cont:'保税仓发货 包邮包税 Aptamil 德国 爱他美 ',
                    price:'231.00',

                }]],
            btmPic:'../img/idxpic8.jpg'
        }      
        // 手机区域;
        var phoneData = {
            obj:'.phoneList',
            smallBox:{
                'url':['../img/idxpic68.jpg','../img/idxpic68.jpg','../img/idxpic80.jpg','../img/idxpic81.jpg','../img/idxpic88.jpg','../img/idxpic89.jpg'],
                 'cont':['下单输入蛋券编码 NE11 (满200-10 满500-30 满2000-40) 数量有限 先','下单输入蛋券new11,满500-30元,满2000-40元(新蛋老会员福利来袭)','下单输入蛋券编码 NE11 (满200-10 满500-30 满2000-40) 数量有限 先',' Apple iPad 平板电脑 9.7英寸(32G WLAN版/A9 芯片/Retina显示屏/Tou','Apple MacBook Pro 15.4英寸笔记本 深空灰MLH42CH/A (Multi-Touch Ba','下单输入蛋券new11,满500-30元,满2000-40元(新蛋老会员福利来袭)'],
                 'newPrice':['2242.00','13232.00','3421.00','7743.00','33312.00','22142.00'],
                 'hot':['../img/xsqg.png','../img/rqfq.png','../img/xsqg.png','../img/rqfq.png','../img/rqfq.png','../img/xsqg.png'],
                 'href':'javascript:;'      
            },
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
            tabTips:['智能手机','微单','单反'],
            tabList:[[
                {
                    url:'../img/idxpic111.jpg',
                    cont:'华为 荣耀9 全网通 高配版 6GB+64GB 海鸥',
                    price:'2232.00'
                },
                {
                    url:'../img/idxpic112.jpg',
                    cont:'华为 荣耀9 全网通 高配版 6GB+64GB 海鸥',
                    price:'1232.00',
                },
                {   url:'../img/idxpic113.jpg',
                    cont:'小米(MI)小米5X手机 金色 全网通4G(4G RA',
                    price:'1023.00',

                },
                {   url:'../img/idxpic114.jpg',
                    cont:'华为 HUAWEI nova 2 4GB+64GB 极光蓝 移',
                    price:'2221.00',

                }],[
                {
                    url:'../img/idxpic73.jpg',
                    cont:'Canon 佳能 EOS 6D Mark II 单反机身',
                    price:'226.00'
                },
                {
                    url:'../img/idxpic74.jpg',
                    cont:'FUJIFILM 富士 X-A3 XC 16-50mm 微单电',
                    price:'324.00',
                },
                {   url:'../img/idxpic75.jpg',
                    cont:'索尼 SONY ILCE-6000L 微单单镜套机 白 2430万有效像素 16-50',
                    price:'523.00',

                },
                {   url:'../img/idxpic76.jpg',
                    cont:'保税仓发货 包邮包税 Aptamil 德国 爱他美 ',
                    price:'231.00',

                }],[
                {
                    url:'../img/idxpic79.jpg',
                    cont:'Canon 佳能 EOS 77D 单反套机 EF-S 18-20',
                    price:'226.00'
                },
                {
                    url:'../img/idxpic78.jpg',
                    cont:'Canon 佳能 EOS 800D 单反套机 EF-S 18-1',
                    price:'324.00',
                },
                {   url:'../img/idxpic75.jpg',
                    cont:'Canon 佳能 EOS 100D 单反相机 机身',
                    price:'523.00',

                },
                {   url:'../img/idxpic76.jpg',
                    cont:'保税仓发货 包邮包税 Aptamil 德国 爱他美 ',
                    price:'231.00',

                }]],
            btmPic:'../img/bkej.jpg'
        }
        // 电脑平板
        var cmpData = {
            obj:'.computedList',
            smallBox:{
                'url':['../img/idxpic69.jpg','../img/idxpic68.jpg','../img/idxpic70.jpg','../img/idxpic71.jpg','../img/idxpic72.jpg','../img/idxpic80.jpg'],
                 'cont':['ThinkPad 15.6英寸笔记本电脑 S5 20G4A00NCD (i7-6700HQ 4G 1TB GT','NETGEAR 美国网件 R7800 11AC 双频2600M千兆无线路由器 Wave2 双','SONY 索尼 MDR-1000X Hi-Res无线 降噪 立体声 耳机 灰米色',' Apple iPad 平板电脑 9.7英寸(32G WLAN版/A9 芯片/Retina显示屏/Tou','Apple MacBook Pro 15.4英寸笔记本 深空灰MLH42CH/A (Multi-Touch Ba','Microsoft 微软 New Surface Pro 二合一平板电脑 12.3英寸(Intel Core i5'],
                 'newPrice':['11524.00','2331.00','8742.00','22141.00','11261.00','18888.00'],
                 'hot':['../img/xsqg.png','../img/xpsf.png','../img/xpth.png','../img/rqfq.png','../img/xpth.png','../img/xsqg.png'],
                 'href':'javascript:;'      
            },
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
            tabTips:['路由器','笔记本','固态硬盘'],
            tabList:[[
                {
                    url:'../img/idxpic104.jpg',
                    cont:'PHICOMM 斐讯 K2 1200M WIFI穿墙 智能双',
                    price:'221.00'
                },
                {
                    url:'../img/idxpic102.jpg',
                    cont:'斐讯 K2P AC1200 智能双频全千兆无线路',
                    price:'442.00',
                },
                {   url:'../img/idxpic106.jpg',
                    cont:'NETGEAR 美国网件 R7000 AC1900M双频千',
                    price:'662.00',

                },
                {   url:'../img/idxpic108.jpg',
                    cont:'TP-LINK 普联 TL-WVR450G 450M 三天线 ',
                    price:'228.00',

                }],[
                {
                    url:'../img/idxpic101.jpg',
                    cont:'PLEXTOR 浦科特 M7VC系列 256G SSD固态硬盘 PX-256M7VC - ',
                    price:'2126.00'
                },
                {
                    url:'../img/idxpic109.jpg',
                    cont:'Kingston 金士顿 HyperX Fury系列 240GB ',
                    price:'1324.00',
                },
                {   url:'../img/idxpic105.jpg',
                    cont:'PLEXTOR 浦科特 M7VC系列 128G SSD固态',
                    price:'1123.00',

                },
                {   url:'../img/idxpic103.jpg',
                    cont:'Kingston 金士顿 UV400系列 240G SSD固 ',
                    price:'931.00',

                }],[
                {
                    url:'../img/idxpic69.jpg',
                    cont:'Thinkpad 14英寸笔记本电脑 X1 CARBON 2',
                    price:'6226.00'
                },
                {
                    url:'../img/idxpic70.jpg',
                    cont:'Microsoft 微软 Surface Laptop 轻薄触控笔',
                    price:'9324.00',
                },
                {   url:'../img/idxpic68.jpg',
                    cont:'Microsoft 微软 Surface Laptop 轻薄触控笔',
                    price:'9999.00',

                },
                {   url:'../img/idxpic136.jpg',
                    cont:'Microsoft 微软 Surface Laptop 轻薄触控笔',
                    price:'11231.00',

                }]],
            btmPic:'../img/idxpic6.jpg'
        }
        // 家用电器
        var homeAppliance = {
            obj:'.appliance',
            smallBox:{
                'url':['../img/idxpic1.jpg','../img/idxpic2.jpg','../img/idxpic3.jpg','../img/idxpic131.jpg','../img/idxpic132.jpg','../img/idxpic133.jpg'],
                 'cont':['600ML双果汁杯 下单送原装日式饭盒+便携式购物袋+食谱','整机质保一年 下单时请备注A\\B\\C尺寸','Dyson 戴森 HP03 空气净化风扇 净化 PM0.1甲醛 气流循环 凉风 制暖 ','Midea 美的 冰箱 206升三门三温 静音省电 BCD-206TM(E)悦动白','Ecovacs 科沃斯 地宝 小睿 DW700 智能扫地机器人 扫地机 规划扫地拖地一体 家用 白色','戴森 Dyson 吸尘器 V6 ANIMAL+ 手持吸尘器 家用除螨 无线'],
                 'newPrice':['1124.00','2331.00','822.00','2141.00','5261.00','1888.00'],
                 'hot':['../img/qwdj.png','../img/rqfq.png','../img/xpth.png','../img/rqbk.png','../img/xpth.png','../img/qwdj.png'],
                 'href':'javascript:;'      
            },
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
            tabTips:['平板电视','电冰箱','电烤箱'],
            tabList:[[
                {
                    url:'../img/idxpic138.jpg',
                    cont:'SONY 索尼 55英寸 4K高清安卓6.0系统智能LED液晶电视 黑色 ',
                    price:'5121.00'
                },
                {
                    url:'../img/idxpic139.jpg',
                    cont:'索尼 SONY KD-55X8000E 55英寸 4K高清智',
                    price:'5512.00',
                },
                {   url:'../img/idxpic140.jpg',
                    cont:'索尼 SONY KD-55X9000E 55英寸4K智能网',
                    price:'6662.00',

                },
                {   url:'../img/idxpic141.jpg',
                    cont:'索尼 SONY KD-65X9000E 65英寸4K智能网',
                    price:'7228.00',

                }],[
                {
                    url:'../img/txd1.jpg',
                    cont:'飞科剃须刀FS363',
                    price:'726.00'
                },
                {
                    url:'../img/txd2.jpg',
                    cont:'BRAUN 博朗电动剃须刀M60S全身水洗往复式刮胡刀',
                    price:'1124.00',
                },
                {   url:'../img/txd3.jpg',
                    cont:'Panasonic 松下 电动剃须刀 ES-RC30K',
                    price:'523.00',

                },
                {   url:'../img/txd4.jpg',
                    cont:'FLYCO 飞科剃须刀 FS355 ',
                    price:'231.00',

                }],[
                {
                    url:'../img/2bl1.jpg',
                    cont:'Midea 美的 微波炉 旋转加热 M1-L213C 21L',
                    price:'8825.00'
                },
                {
                    url:'../img/wbl2.jpg',
                    cont:'Midea 美的 EV923MF7-NRH 变频微波炉 湿',
                    price:'2264.00',
                },
                {   url:'../img/wbl3.jpg',
                    cont:'Midea 美的 电烤箱家用多功能 搪瓷内胆烤',
                    price:'1799.00',

                },
                {   url:'../img/idxpic134.jpg',
                    cont:'Midea 美的 M3-232B 微波炉 光波炉 智能蒸',
                    price:'6631.00',

                }]],
            btmPic:'../img/idxpic7.jpg'
        }
        // 生活百货
        var lifeUser = {
            obj:'.lifeStyle',
            smallBox:{
                'url':['../img/idxpic87.jpg','../img/idxpic66.jpg','../img/idxpic130.jpg','../img/idxpic64.jpg','../img/idxpic143.jpg','../img/idxpic4.jpg'],
                 'cont':['XD Design 蒙马特防盗背包 商务双肩背包 15寸电脑包 灰色','Lutule 路途乐 途途龟太空记忆U型枕 格调蓝','THERMOS 膳魔师 真空不锈钢保温杯 焖烧杯 食物罐 SK-3020 CBW 咖 ','Castrol 嘉实多 极护全合成机油 钛流体技术 SN OW-40 4L 新老包装发','OPPLE 欧普照明 LED七彩氛围触控台灯 蘑菇拍拍灯 床头创意灯 MZT-H','乐为家纺全棉40支素色双拼四件套 浅湖蓝'],
                 'newPrice':['3232.00','2323.00','225.00','543.00','323.00','331.00'],
                 'hot':['../img/xpth.png','../img/rqfq.png','../img/xpth.png','../img/rqfq.png','../img/xpth.png','../img/qwdj.png'],
                 'href':'javascript:;'      
            },
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
            tabTips:['机油','箱包','锅具'],
            tabList:[[
                {
                    url:'../img/idxpic61.jpg',
                    cont:'SMobil 美孚 金美孚1号 全合成机油 0W-40 1L ',
                    price:'80.00'
                },
                {
                    url:'../img/idxpic61.jpg',
                    cont:'shell 壳牌 *凡喜力全合成机油 中*限量版 ',
                    price:'63.00',
                },
                {   url:'../img/idxpic64.jpg',
                    cont:'Mobil 美孚 银美孚1号全合成机油 5W-30 4L ',
                    price:'56.00',

                },
                {   url:'../img/idxpic65.jpg',
                    cont:'Mobil 美孚 银美孚1号全合成机油 5W-40 4L ',
                    price:'98.00',

                }],[
                {
                    url:'../img/idxpic83.jpg',
                    cont:'Wenger 威戈 中性 双肩包背包14寸电脑包',
                    price:'102.00'
                },
                {
                    url:'../img/idxpic84.jpg',
                    cont:'SWISSWIN 瑞士军刀 男士单肩包手提休闲',
                    price:'99.99',
                },
                {   url:'../img/idxpic87.jpg',
                    cont:'SWISSWIN瑞士军刀电脑包商务休闲双肩',
                    price:'99.00',

                },
                {   url:'../img/idxpic86.jpg',
                    cont:'SWISSWIN 瑞士十字 A4商务单肩包男士斜',
                    price:'90.99',

                }],[
                {
                    url:'../img/idxpic126.jpg',
                    cont:'炊大皇 健康无油烟炒锅32CM',
                    price:'99.00'
                },
                {
                    url:'../img/idxpic127.jpg',
                    cont:'炊大皇 玲珑三层蒸锅30cm Z30A',
                    price:'142.99',
                },
                {   url:'../img/idxpic128.jpg',
                    cont:'炊大皇 不粘早餐煎盘 红色 25cm J25A',
                    price:'199.00',

                },
                {   url:'../img/idxpic129.jpg',
                    cont:'炊大皇 麦饭石养生煎盘 煎锅 24cm J24D',
                    price:'332.00',

                }]],
            btmPic:'../img/idxpic9.jpg'
        }
        var seas = new CommonArea(seaData)
        var phone = new CommonArea(phoneData);
        var computer = new CommonArea(cmpData)
        var homeApp = new CommonArea(homeAppliance);
        var lifeStyle = new CommonArea(lifeUser);
        $('#myLinks').load('../html/commonHtml.html .mylink'); 
        $('#footer').load('../html/commonHtml.html .foot');
        
    });
})();