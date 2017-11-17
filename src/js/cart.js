/* 
* @Author: Marte
* @Date:   2017-11-17 09:58:57
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-17 12:03:15
*/

requirejs(['config'],function(){
    requirejs(['jquery'],function($){
        $('#footer').load('../html/commonHtml.html .foot',function(){
            $('#footer').find('.picLink').remove();
        })
    })
})