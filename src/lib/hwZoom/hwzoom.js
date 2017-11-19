/* 
* @Author: Marte
* @Date:   2017-11-09 16:22:57
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-19 12:57:29
*/

;(function($){
    $.fn.hwZoom = function(options){
        var defaluts = {
            swidth:200,
            sheight:200,
            gap:20
        } 
        $(this).each(function(){
           var opt = jQuery.extend({},defaluts,options); 
           var $self = $(this);
           var Zoom = {
                init:function(){
                    this.$smallPic = $(opt.boxPic);
                    var sImg = $(opt.smPic);
                    this.$bigP = $('<div/>').addClass('bigPic hide').css({
                                                                    'width':opt.swidth,
                                                                    'height':opt.sheight
                                                                });
                    $self.append(this.$bigP);         
                    this.$smallPic.on('mouseenter',function(){

                        this.show();
                    }.bind(this));
                    this.$smallPic.on('mouseleave',function(){
                        this.hide();
                    }.bind(this));
                    this.$smallPic.on('mousemove',function(ev){
                        this.move(ev.clientX,ev.clientY);
                    }.bind(this));

                },
                show:function(){
                    this.$bigImg = $('<img/>').addClass('bigImg').attr('src',opt.bigPic).appendTo(this.$bigP);
                    this.$bigP.removeClass('hide');
                    this.$zoom = $('<div/>').addClass('floatBox');
                    this.$smallPic.append(this.$zoom);
                    this.$bigImg[0].onload = function(){
                        this.ratio = this.$bigImg.width() / this.$smallPic.width();
                        this.$zoom .css({
                            'width':opt.swidth/this.ratio,
                            'height':opt.sheight/this.ratio
                        });
                        var setLeft = this.$smallPic.offset().left + this.$smallPic.width()+ opt.gap;
                        this.$bigP.css({
                            'left' : setLeft,
                            'top':0,
                            'z-index':6
                        })
                    }.bind(this);

                },
                hide:function(){
                    this.$zoom.remove();
                    this.$bigImg.remove();
                    this.$bigP.remove();
                },
                move:function(x,y){
                    var left = x - this.$smallPic.offset().left - this.$zoom.outerWidth()/2;
                    var top = y - this.$smallPic.offset().top - this.$zoom.outerHeight()/2;
                    if(left < 0){
                        left = 0;
                    }else if(left > this.$smallPic.outerWidth() - this.$zoom.outerWidth()){
                        left = this.$smallPic.outerWidth() - this.$zoom.outerWidth();
                    }
                    if(top < 0){
                        top = 0;
                    }else if(top > this.$smallPic.outerHeight() - this.$zoom.outerHeight()){
                        top = this.$smallPic.outerHeight() - this.$zoom.outerHeight();
                    }
                    this.$zoom.css({
                        'left':left,
                        'top':top
                    })
                    // 大图移动
                    this.$bigImg.css({
                        left:-left*this.ratio,
                        top:-top*this.ratio
                    })
                }
           }
            Zoom.init();
        })
    }
}(jQuery));