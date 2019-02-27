/* 1 获取数据
   2 渲染页面
   3 绑定事件
   4 控制播放
*/
var nowIndex = 0,
    len,
    datalist,
    changepro = false,
    audio = player.audioManager;
    // console.log(audio);
getData("../../mock/data.json");
function getData(url){
    $.ajax({
    //    type:'GET',
       url:url,
       success:function(data){
           len = data.length;
           datalist = data;
           audio.getaudio(data[0].audio);
           player.render(data[0]);
           player.pross.rendTime(0,data[0].duration);
           bindEvent();
           player.songList(data);
       },
       error:function(){
          console.log('error')
       }
   })
}

function plays(){
    audio.status == "pause" ? audio.play() : audio.pause();
    audio.status == "pause" ? $('.play','.wrapper').removeClass('playing'): $('.play','.wrapper').addClass('playing');
}
function trun(){
    if(audio.status == 'play'){
         $('.song-showimg img','.wrapper').addClass('playing');
        if(!audio.paused()){
          $('.song-showimg img','.wrapper').css('animation-play-state','running');     
        }
      }else if(audio.status == 'pause' && audio.paused()){
          console.log('paused');
          $('.song-showimg img','.wrapper').css('animation-play-state','paused');
      }
}

function bindEvent(){
    var curwidth = $('.pro','.wrapper').width(),
        starttime = 0,
        pro = 0,
        left = $('.pro','.wrapper').offset().left;
    $('.pro-btn','.wrapper').on('touchstart',function(e){
        if(audio.status == "play"){
            $('.play','.wrapper').trigger('click')
        }
    })
    $('.pro-btn','.wrapper').on('touchmove',function(e){
        // strat = e.target.offsetLeft;
        var move = e.touches[0].clientX - left;
        player.pross.initstart();
        pro = parseInt((move/ curwidth)*100);
        if(pro <= 100 && pro >=0){
            starttime = parseInt((pro/100)*datalist[nowIndex].duration) ;
        }
        player.pross.changePross(pro, starttime);
    })
    $('.pro-btn','.wrapper').on('touchend',function(e){

            $('.play','.wrapper').trigger('click');

    })
    $('.prev','.wrapper').on('click',function(){
        nowIndex ? nowIndex -- : nowIndex = len -1 ;
        player.render(datalist[nowIndex]);
        audio.getaudio(datalist[nowIndex].audio);
        player.pross.rendTime(0,datalist[nowIndex].duration);
        starttime = pro = 0;
        player.pross.initstart();
        if(audio.status == 'play'){
            $('.play','.wrapper').trigger('click')
            setTimeout(function(){
                trun();
            },100);    
        }
        
    });
    $('.play','.wrapper').on('click',function(){
      if(starttime){
          starttime = player.pross.getstart() || starttime;
          audio.audio.currentTime = starttime;
      }
      plays();
      trun();
      player.pross.changeAnimate(starttime, audio.status);

    });
    $('.next','.wrapper').on('click',function(){
        nowIndex == len -1 ? nowIndex = 0 : nowIndex ++;
        player.render(datalist[nowIndex]);
        audio.getaudio(datalist[nowIndex].audio); 
        player.pross.rendTime(0,datalist[nowIndex].duration);
        starttime = pro = 0;
        player.pross.initstart();
        if(audio.status == 'play'){
            $('.play','.wrapper').trigger('click')
            $('.play','.wrapper').trigger('click')
            setTimeout(function(){
                trun();
            },100);
        }
    });
    $('.like','.wrapper').on('click',function(){
        datalist[nowIndex].isLike ? datalist[nowIndex].isLike = false : datalist[nowIndex].isLike = true;
        datalist[nowIndex].isLike ? $('.like','.wrapper').addClass('liking'):$('.like','.wrapper').removeClass('liking');
    })
    $('.playlist','.wrapper').on('click',function(){
        $('.songlist').toggleClass('show');
    })
    $('.songlist','.wrapper').on('click','li',function(){
        // console.log($(this).attr('data-list'));
        nowIndex = $(this).attr('data-list');
        player.render(datalist[nowIndex]);
        audio.getaudio(datalist[nowIndex].audio); 
        starttime = pro = 0;
        player.pross.changePross(pro, starttime);
        if(audio.status == 'play'){
            $('.play','.wrapper').trigger('click')
            $('.play','.wrapper').trigger('click')
            setTimeout(function(){
                trun();
            },100);
        }
    })
    $('.close','.wrapper').on('click',function(){
        $('.songlist').removeClass('show');
    })
      
}