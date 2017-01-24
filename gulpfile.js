var  gulp = require('gulp');
var  watch = require('gulp-watch');
var  prefixer = require('gulp-autoprefixer');
//var  uglify = require('gulp-uglify');
var  sourcemaps = require('gulp-sourcemaps');
var  cssmin = require('gulp-minify-css');
var  imagemin = require('gulp-imagemin');
var  pngquant = require('imagemin-pngquant');
var  browserSync = require("browser-sync");
var  rigger = require('gulp-rigger');
var  reload = browserSync.reload;
var  rimraf = require('rimraf');
var plumber = require('gulp-plumber');
var sequence = require('gulp-sequence');
var less = require('gulp-less');

var path = {
  build: {
    //Адреса куда ложить файлы сборки
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img/',
    fonts: 'build/fonts/'
  },
  src: {
    //Откуда брать исходники
    html: 'src/*.html',
    js: 'src/js/main.js',
    css: 'src/style/main.less',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*',
    cssVendor: 'src/style/vendor/*.css'
  },
  watch: {
    //За изменениями каких файлов мы хотим наблюдать
    html: 'src/**/*.html',
    js: 'src/js/**/*.js',
    css: 'src/style/**/*.less',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  clean: './build'
};

var config = {
  server: {
    baseDir: "./build"
  },
  tunnel: true,
  host: 'localhost',
  port: 9000,
  logPrefix: "Laplandin"
};

gulp.task('html:build', function() {
  gulp.src(path.src.html) //выбор фалов по нужному пути
    .pipe(rigger()) //вставляет код файла вместо указанного к файлу пути
    .pipe(gulp.dest(path.build.html)) //папка назначения
    .pipe(reload({stream:true})); //Перезагрузка сервера
});

gulp.task('js:build', function() {
  gulp.src(path.src.js)
    //.pipe(rigger())
    //.pipe(sourcemaps.init()) //Инициируем sourcemap
    //.pipe(uglify()) //Сжимаем js
    //.pipe(sourcemaps.write()) //Прописываем карты
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream:true}));
});

gulp.task('css:build', function() {
  gulp.src(path.src.css)
    .pipe(plumber())
    //.pipe(sourcemaps.init())
    .pipe(less())
    .pipe(prefixer())
    // .pipe(cssmin())
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream:true}));
});

gulp.task('css:vendor', function() {
  gulp.src(path.src.cssVendor)
    .pipe(gulp.dest(path.build.css));
});

gulp.task('image:build', function () {
  gulp.src(path.src.img) //Выберем наши картинки
    .pipe(imagemin({ //Сожмем их
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest(path.build.img)) //И бросим в build
    .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts));
});

gulp.task('build', sequence([
      'clean'
    ],
    [
      'html:build',
      'js:build',
      'css:build',
      'css:vendor',
      'fonts:build',
      'image:build'
]) );

gulp.task('watch', function() {
  watch([path.watch.html], function(event, cb) {
    gulp.start('html:build');
  });
  watch([path.watch.css], function(event, cb) {
    gulp.start('css:build');
  });
  watch([path.watch.js], function(event, cb) {
    gulp.start('js:build');
  });
  watch([path.watch.img], function(event, cb) {
    gulp.start('image:build');
  });
  watch([path.watch.fonts], function(event, cb) {
    gulp.start('fonts:build');
  });
});

gulp.task('webserver', function() {
  browserSync(config);
});

gulp.task('clean', function(cb) {
  rimraf(path.clean, cb);
});

gulp.task('default', sequence(['build'], ['webserver'], 'watch') );
