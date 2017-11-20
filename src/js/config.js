/* 
* @Author: Marte
* @Date:   2017-11-14 19:00:25
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-20 13:10:12
*/
requirejs.config({
    paths:{
        'jquery':'jquery-3.2.1',
        'jqueryUI':'../lib/jquery-ui-1.12.1/jquery-ui',
        'carousel':'../lib/hwCarousel/hwCarousel',
        'conmon':'_conmon',
        'comHtmljs':'_conmonHtml',
        'zoom':'../lib/hwZoom/hwZoom'
    },
    shim:{
        'jqueryUI':['jquery'],
        'carousel':['jquery'],
        'zoom':['jquery']
    }
});