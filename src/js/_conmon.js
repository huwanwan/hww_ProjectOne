// 随机颜色
function randomColor(){
                    var r = Math.round(Math.random()*255);// 生成一个0 - 255之间的随机数
                    var g = Math.round(Math.random()*255);
                    var b = Math.round(Math.random()*255);
                    return 'rgb(' + r + ',' + g + ',' + b +')';

                 //利用字符串把随机数赋给div的样式; 
}

// 任意两个数值范围的随机数
function randomNumber(min,max){

    var differ = max - min;
    return Math.round(Math.random()*differ + min);
    // 取出差之间的任意数,然后加上m的值;四舍五入能取到m 也能取到n;
   // 如果m比n大,差是负数,那么-differ+m,等于m-differ,得到的值是等于大于n,小于等于m;
  // 如果n比m大,差是正数,那么 difffer +m,得到的是是等于小于n,大于等于m;
}

// 任意值的任意幂数;
function mathExp(n,times){
              // 设置一个变量来存初始值和结果;
                var res = n;
                for(var i = 0;i < times;i++){
                    //遍历幂的次数,初始值乘等于数值;
                    res*= n;
                }
                return res;
                // 结果返回;
}

// 递归函数;
function factorial(num){
                // 阶乘函数;
                if(num <= 1){
                    // 当num的值小于等于1的时候,返回1;
                    return 1;
                }
                return num * factorial(--num);
                // 当num的值不等于1的时候,调用自己,但num递减;
}

// 斐波那契数列
function fibo(num){
            // 1 2 3 4 5 6 7
            // 1 1 2 3 5 8 13
            if(num <= 2){
                return 1;
            }
            // 斐波那契数列的规律是第一位和第二位是1;第三位数开始是前一位数和前前一位数的和;
            return fibo(num - 1) + fibo(num - 2);
            // 因此 num-1 代表前一位数,num-2代表前前一位数;
}

// 找到最大的参数
function getMax(){
            var num = arguments[0]; //设定一个变量用来做比较;
            for(var i = 0;i < arguments.length;i++){
                // 遍历传进来的参数;
                if(arguments[i] >= num ){
                    // 如果参数大于等于设定的变量,那么把这个参数的值赋给变量;
                    num = arguments[i];
                }
            }
            return num;
            // 返回变量值;
}

// 去重函数;
function norepeat(arr){
                for(var i = 0; i < arr.length;i++){
                // 遍历数组,用前一个和后面所有的做对比;
                    for(var j = i+1;j < arr.length;j++){
                        if(arr[i] === arr[j]){
                            // 如果有重复,那么删掉后面的重复值;
                            arr.splice(j,1);
                        }
                    }
               }
}
// 得到日期date的n天后的日期;
function afterDate(date,n){
                var date = new Date(date);
                date.setDate(date.getDate()+n);
                // 方法一:
                // date.setDate(date.getDate()+n);
                // var oYear = date.getFullYear();
                // var oMonth = date.getMonth()+1;
                // var oDay = date.getDate();
                // oMonth = (oMonth < 10 ? '0' : '') + oMonth;
                // oDay = (oDay < 10 ? '0' : '') + oDay;
                return n +'天后的日期是' + date.toLocaleDateString();
}
// 得到元素的属性值;
function getStyle(obj,attr){
                // if(getComputedStyle){
                //     return getComputedStyle(obj)[attr];
                // }else if(obj.currentStyle){
                //     return obj.currentStyle[attr];
                // }else{
                //     return obj.style[attr];
                // }
                return getComputedStyle ? getComputedStyle(obj)[attr] : obj.currentStyle[attr];
}
// 删除非元素节点;
function delNode(obj){
    // 遍历元素下的所有子节点;
                for(var i = 0;i < obj.childNodes.length;i++){
                    // 如果子节点的类型不是1,表示不是元素节点,则删除;
                    if(obj.childNodes[i].nodeType !== 1){
                        obj.removeChild(obj.childNodes[i]);
                    }
                }
                // 返回删除之后的对象下的子节点;
                return obj.childNodes;
}

// 封装获取className的元素函数;
function getClassName(oParent,cName){
    // 根据参数父级,get父级下面的所有元素;
    var aEls = oParent.getElementsByTagName('*');
    // 设定一个空的数组用来存放找到className的元素;
    var aClassName = [];
    // 遍历所以的子元素,并把它们的className分割成数组;
    for(var i = 0;i < aEls.length;i++){
        var classArr = aEls[i].className.split(' ');
        // 遍历每个子元素下的class数组,判断是否是要找的class,如果是,则把子元素push到结果数组里,并跳出内循环,进行下一轮查找;
        for(var j = 0;j < classArr.length;j++){
            if(classArr[j] === cName){
                aClassName.push(aEls[i]);
                break;
            }
        }
    }
    // 最后返回数组;
    return aClassName;
}

//addEventListener和attachEvent兼容
function addEvent(obj,eventName,fn,capture){
    // 参数是元素,事件名字(未有on),函数,是否捕获;
                if(obj.addEventListener){
                    obj.addEventListener(eventName,fn,capture);
                }else if(obj.attachEvent){
                    obj.attachEvent('on'+eventName,fn);
                }else{
                    obj['on'+eventName] = fn;
                }
} 

// cookie的增,删,改,查 方法;
/**
     * [添加/修改cookie]
     * @param {String} name    [cookie名]
     * @param {String} val     [cookie值]
     * @param {[Date]} expires [cookie有效期]
     * @param {[String]} path    [cookie保存路径]
     */
var Cookies = {
    // 增加/修改cookie;
    set:function(name,val,expires,path){
        // name和val是确定值,因此先存入变量;
            var res = name + '=' + val;
            // 当有效期的参数存在,变量+=有效期;
            if(expires){
                res += ';expires=' + expires.toUTCString();
            }
            if(path){
                // 当路径存在;
                res += ';path=' + path;
            }
            document.cookie =  res;
        },
    // 删除cookie;
    remove:function(name,path){
        // 删除cookie只需要让时间过期;
        // 因此获取一个当前时间的日期,并减去1,在传入修改的cookie函数里;
        var now = new Date();
        now.setDate(now.getDate() - 1);
        this.set(name,'null',now,path);
    },
    // 查看cookie;
    get:function(name){
        var res = '';
        // 查找cookie,先获取页面上的所以cookie;
        var allCookie = document.cookie;
        // 如果cookie不存在,则结束函数执行;
        if(!allCookie.length){
            return res;
        }
        // 将获取的cookie分割成数组;
        allCookie = allCookie.split('; ');
        // 变量数组;
        allCookie.forEach(function(item){
            // 继续分割得到的cookie,将名字和值分开;
            var arr = item.split('=');
            if(arr[0] === name){
                // 返回找到的名字对应值;
                res = arr[1]
            }
        })
        return res;
    }
}

// 解构版的获取cookie;
// var Cookies = {
//     set:function({name,val,expires,path}){
//         // 忽略参数顺序,自动匹配相同名字的参数值;
//         var res = name + '=' + val;
//         if(expires){
//             res+=';expires=' + expires.toUTCString();
//         }
//         if(path){
//             res+=';path='+path;
//         }
//         document.cookie = res;
//     },
//     remove:function({name,path}){
//         var now = new Date();
//         now.setDate(now.getDate() - 1);
//         Cookies.set({name,val:null,expires:now,path});
//     },
//     get:function({name}){
//         var res = '';
//         var allCookies = document.cookie;
//         if(!allCookies){
//             return res;
//         }
//         allCookies = allCookies.split(';');
//         allCookies.forEach(function(item){
//             var arr = item.split('=');
//             if(arr[0] === name){
//                 res = arr[1];
//             }
//         })
//         return res;
//     }
// }


//多属性值同时动画;
function animate(ele,obj,callBack){
    // 写一个变量用来计算所有的定时器;
    let timerQty = 0; 
    // 遍历所有需要改变的值,分别传入定时器函数;
    for(var attr in obj){
        timerQty++;
        createTimer(attr);
    }
    function createTimer(attr){
        var target = obj[attr];
        // 给每一个属性的定时器取一个名字;
        var timerName = attr + 'timer';
        // 关闭的当前属性有的定时器.再重开一个;
        clearInterval(ele[timerName]);
        ele[timerName] = setInterval(function(){
            // 获取元素的当前属性值;
            var currenAttr = getStyle(ele,attr);
            // 提取单位;
            var unit = currenAttr.match(/\d([a-z]*)$/);
            unit = unit ? unit[1] : '';
            // 提取当前值;
            currenAttr = parseFloat(currenAttr);
            // 计算速度平均值;
            var iSpeed = (target - currenAttr)/10;
            if(attr === 'opacity'){
                // 当属性为透明度的时候,给一个固定的速度;
                iSpeed = iSpeed > 0 ? 0.05 : -0.05;
            }else{
                // 其它属性给平均速度值;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            } 
            // 设置的值;
            var setAttr = currenAttr + iSpeed;
            if(setAttr === target){
                // 当设置的值=目标值的时候,关掉定时器,并重置元素的值;
                clearInterval(ele[timerName]);
                // 关掉一个定时器,把定时器的变量--;
                timerQty--;
                ele.style[attr] = target + unit;
                // 最后一个参数是函数属性并且所有的定时器都清完的时候,再执行回调函数;
                if(typeof(callBack) === 'function' && timerQty === 0){
                    callBack();
                }
            }else{
                ele.style[attr] = setAttr + unit;
            }        
        },30)
    }
}

// <!-- 封装ajax函数，要求如下：
//         简化ajax请求操作
//         解决兼容性问题
//         支持跨域JSONP请求-->
var xhrAjax = {
    jsonp(jsonp,callBack){
        let _this = this;
        window.getData = function(data){
            _this.oScript.parentNode.removeChild(_this.oScript);
            callBack(data);
        }
        this.oScript = document.createElement('script');
        this.oScript.src = jsonp;
        document.body.appendChild(this.oScript);           
    },
    oXhr(opt,callBack){
        this.xhr = new XMLHttpRequest();
        this.xhr.onreadystatechange = function(){
            if(this.readyState === 4 && (this.status === 200 || this.status === 304)){
                let res;
                try{
                    res = JSON_parse(this.responseText);
                }catch(error){
                    try{
                        res = eval('(' + this.responseText + ')');
                    }catch(erro){
                        res = this.responseText;
                    }
                }
                callBack(res);
            }
        }
        if(opt.type === 'get'){
            this.xhr.open(opt.type,opt.Url,opt.b);
            this.xhr.send();
        }else if(opt.type === 'post'){
            this.xhr.open(opt.type,opt.Url,opt.b);
            this.xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
            this.xhr.send(opt.urlArgumt);
        }
    }
}

// 完美版ajax/jsonp封装;
var ajax = {
    // 调用时,先重置options中的type,再传参执行sends方向;
    jsonp(options){
        options.type = 'jsonp';
        this.sends(options);
    },
    get(options){
        options.type = 'get';
        this.sends(options);
    },
    post(options){
        options.type = 'post';
        this.sends(options);
    },
    sends(options){
        // 先给一个默认的参数值;
        var defaults = {
            type:'get',
            async:'true',
            // jsonp的参数中的函数名;
            jsonpName:'callback'
        }   
        //遍历options,将options中的值复制给默认的对象,相同的则覆盖; 
        for(var attr in options){
            defaults[attr] = options[attr];
        }
        // 将defaults的名字重置;
        var opt = defaults;
        console.log(opt)
        // 声明一个参数变量名;
        var params = '';
        // 如果传参中有data参数;
        if(opt.data){
            // 遍历参数对象,把参数组合成url后的值;
            for(var attr in opt.data){
                params += attr + '=' + opt.data[attr] + '&';
            }
        }
        // 删除最后一个&;
        params = params.slice(0,-1);
        // 但对象的type是jsonp的时候;
        if(opt.type === 'jsonp'){
            // 避免多个jsonp的处理函数重名覆盖,给window的不同变量名;
            var callBacks = 'getData' + Date.now();
            window[callBacks] = function(res){
                let data;
                // 处理端口返回的数据;
                try{
                    data = JSON.parse(res);
                }catch(error){
                    try{
                        data = eval('(' + res + ')');
                    }catch(erro){
                        data = res;
                    }
                }
                // 如果传参进来的success是函数,这执行;
                if(typeof opt.success === 'function'){
                    opt.success(data);
                }
                // 删除创建的oScript;
                oScript.parentNode.removeChild(oScript);
            }
            var oScript = document.createElement('script');
            // 如果传参进来的url中有?,那么后面接一个&,否则加上一个?;
            opt.url += opt.url.indexOf('?') >= 0 ? '&' : '?';
            // 将url,端口处理函数名字+全局函数名字 + 参数;
            
            oScript.src = opt.url + '&' + opt.jsonpName + '=' + callBacks + '&' + params;
            document.body.appendChild(oScript);
            // 下面的代码不再执行;
            return;
        }
        // 创建懿贵妃ajax请求;
        var xhr = new XMLHttpRequest();
        // 声明一个数组存放所有可能返回的http状态值;
        var status = [200,304];
        xhr.onreadystatechange = function(){
            // 当状态值在设定的数组中能找到时候,执行下面函数;
            if(this.readyState === 4 && status.indexOf(this.status) >= 0){
                // 处理返回值;
                let res = this.responseText;
                try{
                    res = JSON.parse(res);
                }catch(error){
                    try{
                        res = eval('(' + res + ')');
                    }catch(erro){
                        res = this.responseText;
                    }
                }
                if(typeof opt.success === 'function'){
                    opt.success(res);
                }
            }
        }
        // 当请求方法为get的时候;
        if(opt.type === 'get'){

            opt.url += opt.url.indexOf('?') >= 0 ? '&' : '?';
            opt.url+= params;
            // 避免下面send报错,清空参数params;
            params = null;
        }
        xhr.open(opt.type,opt.url,opt.async);
        // 当请求方法为post的时候;
        if(opt.type === 'post'){
            // 设置请求头;
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        }
        // send参数;
        xhr.send(params);
    }
}

// 工具包;
var Tool = {
    getType(data){
        return Object.prototype.toString.call(data).slice(8,-1);
    }
}