/* 
* @Author: Marte
* @Date:   2017-11-14 14:32:48
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-15 21:15:13
*/

requirejs(['config'],function(){
    requirejs(['jquery','comHtmljs'],function($,m){
        m.userH();
        m.footer();
        $('#welcomeArea').load('../html/commonHtml.html .userTop')
   });
})