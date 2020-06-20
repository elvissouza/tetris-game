// Adiciona os modulos instalados
const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

// Funçao para compilar o SASS e adicionar os prefixos
function compilaSass() {
  return gulp
    .src("public/css/scss/**/*.scss")
    .pipe(
      sass({
        outputStyle: "compressed",
      })
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(gulp.dest("public/css/"))
    .pipe(browserSync.stream());
}

// Tarefa de gulp para a função de SASS
// gulp.task('sass', function(done){
//   compilaSass();
//   done();
// });
exports.compilaSass = compilaSass;

// Função para juntar o JS
function gulpJS() {
  return gulp
    .src("public/js/scripts/*.js")
    .pipe(concat("main.js"))
    .pipe(
      babel({
        presets: ["env"],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("public/js/"))
    .pipe(browserSync.stream());
}

// gulp.task('mainjs', gulpJS);
exports.gulpJS = gulpJS;

// JS Plugins
function pluginJS() {
  return gulp
    .src(["public/js/plugins/*.js"])
    .pipe(concat("plugins.js"))
    .pipe(gulp.dest("public/js/"))
    .pipe(browserSync.stream());
}

exports.pluginJS = pluginJS;

// Função para iniciar o browser
function browser() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
}

// Tarefa para iniciar o browser-sync
exports.browser = browser;

// Função de watch do Gulp
function watch() {
  gulp.watch("public/css/scss/**/*.scss", compilaSass);
  gulp.watch("public/js/scripts/*.js", gulpJS);
  gulp.watch("public/js/plugins/*.js", pluginJS);
  gulp.watch(["*.html"]).on("change", browserSync.reload);
}

// Inicia a tarefa de watch
exports.watch = watch;

// Tarefa padrão do Gulp, que inicia o watch e o browser-sync
exports.default = gulp.parallel(watch, browser, compilaSass, gulpJS, pluginJS);
