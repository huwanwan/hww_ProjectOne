/* 
* @Author: Marte
* @Date:   2017-11-16 16:15:40
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-16 20:00:18
*/

requirejs(['config'],function(){
    requirejs(['jquery','comHtmljs','conmon','zoom'],function($,m,mustJs){
            m.header();
            m.navTop();
            m.hideHead();
            m.links();
            m.footer();
            // // 放大镜部分;
            // $('.picBox').hwZoom({
            //     bWidth:449,
            //     bHeight:400,
            //     swidth:200,
            //     sheight:200,
            //     gap:30,
            //     'src':'../img/pic134.jpg',
            //     'bigPic':'../img/big11.jpg'
            // })
    })
})