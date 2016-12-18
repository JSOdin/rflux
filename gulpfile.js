"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); // run a local dev server
var open = require('gulp-open'); // open a url in a web browser
var browserify = require('browserify'); // bundler
var reactify = require('reactify'); // transpiler of JSX
var source = require('vinyl-source-stream'); // conventional text streams with gulp
var concat = require('gulp-concat'); // concatenates files
var lint = require('gulp-eslint'); // lint JS files, including JSX.

var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths:{
        html: './src/*.html',
        js : './src/**/*.js',
        images:'./src/images/*',
        css:[
          'node_modules/bootstrap/dist/css/bootstrap.min.css',
          'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
            'node_modules/toastr/toastr.css'
        ],
        dist: './dist',
        mainJs: './src/main.js'
    }
};

// start a local dev server
gulp.task('connect', function(){
   connect.server({
       root: ['dist'],  // where files for dev server gets served from
       port: config.port,
       base: config.devBaseUrl,
       livereload: true
   })
});

// opens a file in the server
gulp.task('open',['connect'],function(){    // run the connect task first then run "open"
    gulp.src('dist/index.html')
        .pipe(open({uri:config.devBaseUrl+':'+config.port+'/'}))
});

gulp.task('html', function(){
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload())
});

gulp.task('js', function(){
   browserify(config.paths.mainJs)   // entry point is main.js
       .transform(reactify)
       .bundle()
       .on('error', console.error.bind(console))
       .pipe(source('bundle.js'))   // result file name
       .pipe(gulp.dest(config.paths.dist+'/scripts'))
       .pipe(connect.reload())
});

gulp.task('css', function(){
   gulp.src(config.paths.css)
       .pipe(concat('bundle.css'))
       .pipe(gulp.dest(config.paths.dist+'/css'));
});

gulp.task('images',function(){
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist+'/images'))
        .pipe(connect.reload());
})

gulp.task('lint',function(){
    return gulp.src(config.paths.js) // return to see the output of our ilnting
        .pipe(lint({config:'eslint.config.json'}))
        .pipe(lint.format());
})

gulp.task('watch',function(){
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js','lint']);
})

gulp.task('default',['html','js','css','images','lint','open','watch']);
