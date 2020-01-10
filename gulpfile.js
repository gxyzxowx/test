const { src, dest, series, watch } = require('gulp')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload
const del = require('del')
// 引入后，plugins.uglify = require('gulp-uglify')
const plugins = require('gulp-load-plugins')()

// 对scss/less编译，压缩，输出css文件
function css (cb) {
  src('./static/sass/*.scss')
    .pipe(plugins.sass({outputStyle: 'compressed'}))
      .pipe(plugins.autoprefixer({
        cascade: false, //是否美化属性值 默认：true 像这样：
        //-webkit-transform: rotate(45deg);
        //        transform: rotate(45deg);
        remove: true //是否去掉不必要的前缀 默认：true
      }))
        .pipe(dest('./static/css'))
        .pipe(reload({ stream: true}))
  cb()
}


// 监听这些文件的变化
function watcher () {
  watch('src/*.html')
  watch('static/sass/*.scss', css)
}


// 删除dist目录中的内容
function clean (cb) {
  del('./static/css')
  cb()
}


// server任务
function serve(cb){
  browserSync.init({
    serve:{
      baseDir: './'
    }
  })
  cb()
}
exports.style = css
exports.clean = clean
exports.default = series([
  clean,
  css,
  serve,
  watcher
])