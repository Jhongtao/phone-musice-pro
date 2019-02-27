(function($, tar){
   var duration,
       animationId = null,
       start = 0;
    function changeAnimate(alltime,status){
       if(animationId && status == 'pause'){
           cancelAnimationFrame(animationId);
       }else if(status == 'play'){
        alltime =  alltime > start ? alltime: start;
        // console.log(alltime,status,start);
        startPross(alltime);
       }
       return;
   }
    function timeFormat(time){
      var m = Math.floor(time/60);
      var s = time - m*60;
      m = m >= 10 ? '' + m : '0' + m ;
      s = s >= 10 ? '' + s : '0' + s ;
      return m + ':' + s;
   }
    function rendTime(start, end){
    duration = end ;
    $('.start').html(timeFormat(start));
    $('.end').html(timeFormat(end));
}
    function startPross(alltime){
     var starttime = new Date().getTime();
     function pross(){
        // console.log(start);
         if(alltime){
            var curtime = new Date().getTime() +  alltime*1000;
        }else{
            var curtime = new Date().getTime();
        }
         var pro = (curtime - starttime) / (duration*1000);
         start = parseInt((curtime - starttime)/1000);
         
         pro = parseInt(pro*100);
    
         changePross(pro , start)
         animationId = requestAnimationFrame(pross);
         if(pro >=100){
            // console.log(start)
            start = 0;
            $('.next','.wrapper').trigger('click');
         }
     }
     pross();
 }
 function changePross(pro, start){
     if(pro<100){
        $('.pro-show').css('width',pro + '%');
     }
    //  console.log(pro)
     rendTime(start, duration);

 }
   tar.pross = {
    //    timeFormat, 
    // timeFormat,
    changeAnimate,
    rendTime, 
    startPross,
    changePross,
    initstart: function(){
        start = 0;
    },
    getstart: function(){
        return start;
    }
   }
}(window.$, window.player = player || {}))