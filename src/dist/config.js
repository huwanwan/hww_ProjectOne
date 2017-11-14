/* 
* @Author: Marte
* @Date:   2017-11-14 19:00:25
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-14 19:18:32
*/
requirejs,config({
    paths:{
        'jquery':'../js/jquery-3.2.1',
        'jqueryUI':'../lib/jquery-ui-1.12.1/jquery-ui'.
        'carousel':'../lib/hwCarousel/hwCarousel'
    },
    shim:{
        'jqueryUI':['jquery']
    }
});