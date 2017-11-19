/* 
* @Author: Marte
* @Date:   2017-11-17 09:58:57
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-19 17:10:44
*/

requirejs(['config'],function(){
    requirejs(['jquery','conmon'],function($){
        $('#footer').load('../html/commonHtml.html .foot',function(){
            $('#footer').find('.picLink').remove();
        })
        var cart = Cookies.get('cart');
        if(cart){
            cart = JSON.parse(cart);
        }else{
            return;
        }
        var car = {
            data:cart,
            lists:'.carCont',
            countP:0,
            init(){
                this.lists = $(this.lists);
                // 生成tbody的内容;
                var bodyList = this.data.map((item)=>{
                    return ` <tr data-id=${item.id}>
                                <td><input type="checkbox" /></td>
                                <td>
                                    <img src="${item.imgUrl}" alt="" />
                                    <a class="datails" href="javascript:;">${item.details}</a><br/>
                                    <span>产品编号:${item.num}</span>
                                </td>
                                <td class="nP">￥${item.nPrice}</td>
                                <td>
                                    <input type="text" value="${item.qty}"/>
                                    <em class="sub">-</em>
                                    <em class="add">+</em>
                                    
                                    <span>限购200</span>
                                </td>
                                <td class="count">￥${(item.qty*item.nPrice).toFixed(2)}</td>
                                <td>
                                    <a class="del" href="javascript:;">删除</a>
                                    <a href="javascript:;">移入收藏夹</a>
                                </td>
                            </tr>
                    `;
                }).join('');
                this.lists.find('tbody').html(bodyList);
                var self = this;
                // 数量加减;
                this.lists.find('.sub').click(function(){
                    var qty = $(this).siblings('input')[0].value;
                    qty--;
                    self.changeQty(this,qty);
                    self.allChecked();
                });
                this.lists.find('.add').click(function(){
                    var qty = $(this).siblings('input')[0].value;
                    var price = $(this).parents('td').prev('td').text().substr(1);
                    qty++;
                    self.changeQty(this,qty);
                    self.allChecked();
                });
                // 输入数量计算价格;
                this.lists.find('input').blur(function(){
                    if(this.type == 'checkbox'){
                        return;
                    }
                    var qty = this.value;
                    var price = $(this).parents('td').prev('td').text().substr(1);
                    if(/^[1-9^\.]$/.test(qty)&&qty>0){
                        $('.count').text(`￥${(qty*price).toFixed(2)}`);
                    }else{
                        this.value = 1;
                        qty = 1;
                        $('.count').text(`￥${(qty*price).toFixed(2)}`);
                    }
                    self.allChecked();
                })

                // 点击checkbox;
                this.lists.find('tbody').find(':checkbox').click(function(){
                    var getP = $(this).parents('tr').find('.count').text().slice(1);
                    if(this.checked){
                        self.countAll('add',Number(getP));
                    }else{
                        $('thead').find(':checkbox')[0].checked = false;
                        self.countAll('sub',Number(getP));
                    }
                    self.allChecked();

                });
                $('.datails').click(function(){
                    var getId = $(this).parents('tr').attr('data-id');
                    self.setCookie(getId);
                });
                // 删除商品;
                $('.del').click(function(){
                    var idx = $(this).parents('tr').index();
                    self.goodsRemove(idx);
                })
                $('thead').find(':checkbox').click(function(){
                    $('tbody').find(':checkbox').attr('checked',this.checked);
                    self.allChecked();
                })
            },
            allChecked(check){
                this.countP = 0;
                var check = $('tbody').find(':checked');
                if(check.length == this.data.length){
                    $('thead').find(':checkbox')[0].checked = true;
                }
                for(var i = 0;i < check.length;i++){
                    this.countP += Number($(check[i]).parents('tr').find('.count').text().slice(1));
                }
                $('.allPrice').find('span').text(this.countP);
            },
            goodsRemove(idx){
                $('tbody')[0].deleteRow(idx);
                this.data.splice(idx,1);
                Cookies.set('cart',JSON.stringify(this.data),null,'/');
            },
            setCookie(id){
                for(var i = 0;i < this.data.length;i++){
                    if(this.data[i].id == id){
                        Cookies.set('goods',JSON.stringify(this.data[i]),null,'/');
                        location.href = '../html/dataList.html';
                    }
                }
            },
            countAll(type,pr){
                if(type == 'add'){
                    this.countP+=pr;
                }else if(type == 'sub'){
                    this.countP-=pr;
                }
                $('.allPrice').find('span').text(this.countP);
            },
            changeQty(ele,qty){
                if(qty<1){
                    qty = 1;
                }
                // 单价;
                var price = $(ele).parents('td').prev('td').text().substr(1);
                $(ele).parents('tr').find('.count').text(`￥${(qty*price).toFixed(2)}`);
                $(ele).siblings('input')[0].value = qty;
            }
        }
        car.init();
        // 底部疯抢商品;
        var btmGoods = {
            name:'#otherGoods',
            init(){
                this.ele = $(this.name).find('.goods');
                var data = JSON.parse(Cookies.get('cart'))[0];
                if(!data){
                    return;
                }
                var word = data.gener;
                $.get('../api/index.php',{
                    'gener':word,
                    'view':'true',
                    'No':5
                },(res)=>{
                    var cont = res.map((item)=>{
                        return `<li>
                                    <a href="javascript:;"><img src="${item.imgUrl}" alt="" /></a>
                                    <p><a href="javascript:;">${item.details}</a></p>
                                    <span>${item.name}</span>
                                    <em>￥${item.nPrice}</em>
                                    <button>加入购物车</button>
                                </li>
                        `;
                    }).join('');
                    var self = this;
                    this.ele.html(cont);
                    // 点击跳转详情页;
                    this.ele.find('a').click(function(){
                        var idx = $(this).parents('li').index();
                        self.goDetails(res[idx]);
                    })
                    // 点击加入购物车;
                    this.ele.find('button').click(function(){
                        var idx = $(this).parents('li').index();
                        self.goCart(res[idx]);
                    })
                },'json');
            },
            goCart(data){
                data.qty = 1;
                var setC = true;
                var cart = JSON.parse(Cookies.get('cart'));
                cart.forEach((item)=>{
                    if(data.id == item.id){
                        item.qty += Number(data.qty);
                        setC = false;
                    }
                })
                if(setC){
                    cart.push(data);
                }
                cart = JSON.stringify(cart);
                Cookies.set('cart',cart,null,'/');
                location.href = '../html/cart.html';
            },
            goDetails(data){
                Cookies.set('goods',JSON.stringify(data),null,'/');
                location.href = '../html/dataList.html';
            }
        }
        btmGoods.init();
    })
})