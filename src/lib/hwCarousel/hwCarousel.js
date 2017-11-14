/* 
* @Author: Marte
* @Date:   2017-11-08 21:31:21
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-13 12:43:17
*/

;(function($){
    $.fn.hwCarousel = function(options){
        var defaluts = {
            // carousel的宽高;
            width:230,
            height:300,
            opacity:1,
            // 存放图片;
            imgList:[],
            imgSrc:['javascript:;'],
            // 给一个默认的类名;
            clName:'carousel',
            // 给大图的盒子默认的类名;
            imgBox:'showImg',
            // 给页码默认的类名;
            showPage:'showPage',
            // 默认垂直滚动;
            direction:'vertical',
            // 默认无缝滚动;
            seamless:true,
            // 初始index为0;
            index:0,
            // 默认自动播放;
            autoplay:true,
            // 默认显示前后点击按钮;
            btns:false,
            // 默认下面的页面小图标显示;
            pages:true,
            pageNum:false,
            pageSize:{'width':20,'height':20}
        }
        return $(this).each(function(){            
            // 合并参数;遍历调用方法的jq对象类数组;
            var $self = $(this);
            var opt = jQuery.extend({},defaluts,options);
            var Cart = {
                 init(){
                        // 当前调用的jq对象;
                        $self.addClass(opt.clName);
                        // 生成存放图片的ul imgEle;
                        this.imgEle = document.createElement('ul');
                        this.imgEle.classList.add(opt.imgBox);
                        this.index = opt.index;
                        this.lastIndex = 0;
                        // 根据参数的img数量生成li和img;
                        this.imgEle.innerHTML = opt.imgList.map((item,idx)=>{
                            if(opt.direction === 'horizontal'){
                                var len;
                                if(opt.seamless){
                                    len = opt.imgList.length+1;
                                }else{
                                    len = opt.imgList.length;
                                }
                                this.imgEle.style.width = len * opt.width + 'px';
                                return `<li style="float:left;"><a href="${opt.imgSrc}"><img src="${item}" alt="" /></a></li>`;
                            }else{
                                return `<li><a href="${opt.imgSrc}"><img src="${item}" alt="" /></a></li>`; 
                            }
                        }).join('');
                        // 如果无缝滚动为true,那么克隆第一个子元素,并插入imgUl;
                        if(opt.seamless){
                            let lastChild = this.imgEle.firstElementChild;
                            lastChild = lastChild.cloneNode(true);
                            this.imgEle.appendChild(lastChild);
                        } 
                        // 将imgEle插入carousel;
                        $self.html(this.imgEle);
                        // 获取imgEle下的所以li节点;
                        this.allImg = this.imgEle.children;
                        // 遍历给每个imgLi添加宽高;
                        Array.prototype.forEach.call(this.allImg,item=>{
                            item.style.width = opt.width + 'px';
                            item.style.height = opt.height + 'px';
                            // 当动画模式是透明度的时候,li叠在一起;
                            if(opt.direction === 'opacity'){
                                for(var i = 0;i < this.allImg.length;i++){
                                    if(i !== this.index){
                                        animate(this.allImg[i],{'opacity':0});
                                    }
                                    animate(this.allImg[this.index],{'opacity':opt.opacity})
                                }
                                item.style.position = 'absolute';
                                item.style.left = 0;
                                item.style.top = 0;
                            // 横向滚动,imgLi浮动;初始化,根据index的值给ul设置定位置;
                            }else if(opt.direction === 'horizontal'){
                                this.imgEle.style.left = -this.index * opt.width + 'px';
                            }else if(opt.direction === 'vertical'){
                                this.imgEle.style.top = -this.index * opt.height + 'px';
                            }
                        });  
                        
                        // 是否创建页面小图标;
                        if(opt.pages){
                            this.pageEle = document.createElement('ul');
                            this.pageEle.classList.add(opt.showPage);
                            this.pageEle.innerHTML = opt.imgList.map((item,idx)=>{
                                if(opt.pageNum){
                                    return `<li>${idx+1}</li>`;
                                }else{
                                    return `<li></li>`;
                                }
                                
                            }).join('');
                            this.pageEle.children[this.index].classList.add('active');
                            $self.append(this.pageEle);
                            
                            $(this.pageEle).children('li').css({
                                'width':opt.pageSize.width,
                                'height':opt.pageSize.height
                            });

                            var rightPos = ($self.find('img').width() - $(this.pageEle).width()) - 10;
                            $(this.pageEle).css('left',rightPos);
                            this.pageEle = this.pageEle.children;
                        }
                        let _this = this;
                        // 是否创建前后点击按钮;
                        if(opt.btns){
                            this.aNext = document.createElement('span');
                            this.aPrev = document.createElement('span');
                            this.aNext.classList.add('next');
                            this.aPrev.classList.add('prev');
                            this.aNext.innerHTML = '&gt';
                            this.aPrev.innerHTML = '&lt';
                            $self.append(this.aPrev);
                            $self.append(this.aNext);  
                            this.aPrev.onclick = function(){
                                _this.goPrev();
                            }
                            this.aNext.onclick = function(){
                                _this.goNext();
                            } 
                        }
                        // 是否自动播放;
                        if(opt.autoplay){
                            this.start();
                        }
                        $self.on('mouseover','li',function(){
                            _this.aStop();
                        })
                        $self.on('mouseout','li',function(){
                            _this.start();
                        })
                        if(opt.pages){ 
                            // 借用数组方法遍历;
                            Array.prototype.forEach.call(this.pageEle,(item,idx)=>{
                                item.onmouseover = function(){
                                    _this.aStop();
                                    // 把page的下标赋值给index;
                                    _this.index = idx;
                                    _this.move();   
                                }
                                item.onmouseout = function(){
                                    _this.start();
                                }
                            });
                        }
                    },
                    move(){
                        // 当索引值大于所有li节点长度;
                        if(this.index > this.allImg.length-1){
                            // 垂直滚动;
                            if(opt.direction === 'vertical' && opt.seamless){
                                this.imgEle.style.top = 0;
                            //水平滚动; 
                            }else if(opt.direction === 'horizontal' && opt.seamless){
                                this.imgEle.style.left = 0;
                            }
                            //判断是否无缝滚动,重置索引值;
                            this.index = opt.seamless ? 1 : 0;  
                          //当索引值小于0的时候; 
                        }else if(this.index < 0){
                            // 垂直;
                            if(opt.direction === 'vertical' && opt.seamless){
                                this.imgEle.style.top = -((this.allImg.length - 1) * opt.height) + 'px';
                            }else if(opt.direction === 'horizontal' && opt.seamless){
                                // 水平;
                                this.imgEle.style.left = -((this.allImg.length - 1) * opt.width) + 'px';
                            }
                            // 判断是否无缝滚动,重置索引值;
                            this.index = opt.seamless ? this.allImg.length - 2 : this.allImg.length - 1;    
                        }
                        if(opt.pages){
                            //给所有的页码去掉高亮,给当前加上;
                            for(var i = 0;i < this.pageEle.length;i++){
                                this.pageEle[i].classList.remove('active');
                            }
                            // 根据this.index给pages添加高亮;
                            if(this.index < 0){
                                this.pageEle[this.index-1].classList.add('active')
                            }else if((this.index > this.allImg.length - 2 && opt.seamless) || (this.index > this.allImg.length - 1)){
                                this.pageEle[0].classList.add('active');
                            }else{
                                this.pageEle[this.index].classList.add('active')
                            }
                        }
                        let target = {};
                        // 当水平/水平滚动时,设置宽高,算出left/top;
                        if(opt.direction === 'vertical'){
                            this.imgEle.style.width =  opt.width + 'px';
                            this.imgEle.style.height = this.allImg.length * opt.height + 'px';
                            target.top = opt.height * -this.index;
                        }
                        if(opt.direction === 'horizontal'){
                            this.imgEle.style.height = opt.height + 'px';
                            target.left = opt.width * -this.index;
                        }
                        // 当opactiy时候,将前一个li设置为不透明,当前透明;
                        if(opt.direction === 'opacity'){ 
                            
                            this.imgEle.style.width =  opt.width + 'px';
                            this.imgEle.style.height = opt.height + 'px';
                            animate(this.allImg[this.index],{opacity:opt.opacity});
                            animate(this.allImg[this.lastIndex],{opacity:0});
                            //记录一个lastIndex;
                            this.lastIndex = this.index;
                            return;
                        }
                        // 执行函数;
                        animate(this.imgEle,target);
                    },
                    start(){
                        clearInterval(this.timer);
                        this.timer = setInterval(()=>{
                            this.index++;
                            this.move();
                        },opt.times);
                    },
                    aStop(){
                        clearInterval(this.timer);
                    },
                    goPrev(){
                        this.index--;
                        this.move();
                    },
                    goNext(){
                        this.index++;
                        this.move();
                    }
            }
            Cart.init();
        })
    }
}(jQuery))