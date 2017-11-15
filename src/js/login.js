/* 
* @Author: Marte
* @Date:   2017-11-14 14:32:48
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-15 13:01:06
*/

requirejs(['config'],function(){
    requirejs(['jquery','comHtmljs'],function($){
        $('#welcomeArea').load('../html/commonHtml.html .userTop')
   });
})