var gulp = require('gulp');
var htmlclean = require('gulp-htmlclean');
//压缩js
var uglify = require('gulp-uglify');
//去掉调试
var debug = require('gulp-strip-debug');
//压缩图片
var imagemin = require('gulp-imagemin');
//less解析
var less = require('gulp-less');
//css压缩
var cleancss = require('gulp-clean-css')
//css3属性标注
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
//链接服务器
var connect = require('gulp-connect');

process.env.NODE_ENV = 'development'
var Dev = process.env.NODE_ENV == 'development'
console.log(process.env.NODE_ENV);


var Ourl = {
    src:'./src',
    dist:'./dist',
    img:'./img',
}
// 文件加载输出
gulp.task('html',function(){
  var page = gulp.src(Ourl.src + "/html/*")
  .pipe(connect.reload())
  if(!Dev){
     page.pipe(htmlclean())
  }
  page.pipe(gulp.dest(Ourl.dist + "/html"));
})
gulp.task('css',function(){
  var page = gulp.src(Ourl.src + "/css/*")
  .pipe(connect.reload())
  .pipe(less())
  .pipe(postcss([autoprefixer()]))
  if(!Dev){
    page.pipe(cleancss())
  }
  page.pipe(gulp.dest(Ourl.dist + "/css"));
})
gulp.task('img',function(){
  gulp.src(Ourl.src + "/img/*")
  .pipe(imagemin())
  .pipe(gulp.dest(Ourl.dist + "/img"));
})
gulp.task('js',function(){
  var page = gulp.src(Ourl.src + "/js/*")
  .pipe(connect.reload())
  if(!Dev){
  page.pipe(uglify()).pipe(debug())
  }
  page.pipe(gulp.dest(Ourl.dist + "/js"));
})
//创建服务连接
gulp.task('connect',function(){
  connect.server({
    port:8088,
    livereload:true,
  })
})
//创建实时监听任务
gulp.task('watch',function(){
  gulp.watch(Ourl.src + '/html/*',['html']);
  gulp.watch(Ourl.src + '/css/*',['css']);
  gulp.watch(Ourl.src + '/js/*',['js']);
  // gulp.watch(Ourl.src + '/*',['html','js','css'])
})
//任务流启动
gulp.task('default',['html','js','css','img','connect','watch']);