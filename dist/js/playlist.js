(function($,tar){
    function songList(data){
         var str = ``;
         data.forEach(function(e,index){
            str += `<li data-list=${index}>${e.song}</li>`
         });
         $('.songlist','.wrapper').append(str);
    }
tar.songList = songList;
})(window.$,window.player || (window.player = {}))