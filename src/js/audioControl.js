(function ($,tar){
     function audioControl(){
         this.audio = new Audio();
         this.status = 'pause';
         this.paused = this.getstatus;
     }
     audioControl.prototype = {
         play:function(){
             this.audio.play();
             this.status = "play";
         },
         pause:function(){
             this.audio.pause();
             this.status = "pause"
         },
         getaudio:function(src){
             this.audio.src = src;
             this.audio.load();
         },
         getstatus:function(){
             return this.audio.paused;
         }
     }
     tar.audioManager = new audioControl();

})(window.$, window.player || (window.player = {}))