/* 1 初始化渲染页面 （歌曲图片 title）
   2 绑定事件渲染（like  ben）

*/
(function ($, tar){
  function renderImg(url){
      var img = new Image();
      img.src = url;
      img.onload = function(){
        $(".song-showimg",'.wrapper').html(img);
        tar.blurImg(img, $('body'))
      };
 
  }
  function renderTitle(data){
    $('.song-title','.wrapper').html(`<div class="song-name">${data.song}</div>
    <div class="song-songer">${data.singer}</div>
    <div class="song-album">${data.album}</div>`)
  }
  function renderLike(like){

     like.isLike ? $('.like','.wrapper').addClass('liking'):$('.like','.wrapper').removeClass('liking');

  }
  tar.render = function (data){
    renderImg(data.image);
    renderTitle(data);
    renderLike(data)
  }
})(window.$,window.player || (window.player = {}))
