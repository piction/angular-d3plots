(function() {
	'use strict';
	var gulp = require('gulp'),
		concat = require('gulp-concat'),
		sourcemaps = require('gulp-sourcemaps'),
		templateCache = require('gulp-angular-templatecache'),
        less = require('gulp-less'),
		connect = require('gulp-connect'),
		gOpen = require('gulp-open'),
		del = require('del'),
		Q = require('Q'),
		cssMinify = require('gulp-minify-css'),
		uglify = require('gulp-uglify'),
		util = require('gulp-util'),
		uncache = require('gulp-uncache'),
		runSequence = require('run-sequence');
	    util.log('gulp task');
	var LessPluginAutoPrefix = require('less-plugin-autoprefix'),
		autoprefix= new LessPluginAutoPrefix({browsers: ["last 2 versions"]});
	var jsDependencies = [
        	'external_scripts/bower_components/jquery/dist/jquery.js',
			'external_scripts/bower_components/angular/angular.js',
			'external_scripts/bower_components/angular-route/angular-route.js',
			'external_scripts/bower_components/lodash/lodash.js',
			'external_scripts/bower_components/spin.js/spin.js',
			'external_scripts/bower_components/angular-spinner/angular-spinner.js',
			'external_scripts/bower_components/toastr/toastr.js',
            'external_scripts/bower_components/d3/d3.js',
            'external_scripts/bower_components/bootstrap/dist/js/bootstrap.min.js',
            'external_scripts/bower_components/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.min.js',     
		],
		cssDependencies = [
			'external_scripts/bower_components/toastr/toastr.css',
            'external_scripts/bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
            'external_scripts/bower_components/bootstrap/dist/css/bootstrap.min.css',
            'external_scripts/bower_components/angular-bootstrap-colorpicker/css/colorpicker.min.css'
		];
        
/* development */
	gulp.task('html', function() {
		return gulp.src('app/**/*.html')
			.pipe(templateCache({
				module: 'app',
				root: 'app/'
			}))
			.pipe(concat('app.js'))
			.pipe(gulp.dest('dev'));
	});

	gulp.task('compile-javascript', ['html'], function() {
	    return gulp.src(jsDependencies.concat(['app/**/*.js', 'dev/app.js']))
			.pipe(sourcemaps.init())
			.pipe(concat('app.js'))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest('dev'))
			.pipe(connect.reload());
	});
    
    
	// gulp.task('compile-less', function () {
	// 	util.log( util.colors.green('compile less '));
	// 	return gulp.src('css/main.less')
	// 		.pipe(less({
	// 			plugins: [autoprefix]
	// 		}))
	// 		.pipe(gulp.dest('css'));
	// });

	gulp.task('compile-style', function () {
		return gulp.src(cssDependencies.concat(['css/main.css']))
			.pipe(sourcemaps.init())
			.pipe(concat('main.css'))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest('dev'))
			.pipe(connect.reload());
	});
    

    gulp.task('copy-testdata', function() {
        return gulp.src([ 'app/module/bilevelPartion/bilevelPartionTestData.json'])
        .pipe(gulp.dest('dev/testData'));
    });
    
	gulp.task('copy-index', function() {
		return gulp.src(['index.html', 'config.json'])
			.pipe(uncache({
				append: 'time'
			}))
			.pipe(gulp.dest('dev'))
			.pipe(connect.reload());
	});

	gulp.task('copy-modernizr', function() {
		return gulp.src('bower_components/modernizr/modernizr.js')
			.pipe(gulp.dest('dev'));
	});
    
	gulp.task('clear-dev', function() {
		var deferred = Q.defer();
		del(['dev/**/*.*', 'dev/fonts', 'dev/test'], function() {
			deferred.resolve();
		});
		return deferred.promise;
	});

/* interaction */
	gulp.task('start-server', function() {
		connect.server({
			livereload: true,
			root: 'dev'
		});
	});
	gulp.task('watch-changes', function() {
		gulp.watch('app/**/*.js', ['compile-javascript']);
		gulp.watch('app/**/*.html', ['compile-javascript']);
		gulp.watch('app/**/*.less', ['compile-style']);
		gulp.watch('css/less/**/*.less', ['compile-style']);
		gulp.watch('css/main.less', ['compile-style']);
		gulp.watch('css/main.css', ['compile-style']);
		gulp.watch('index.html', ['copy-index']);
    });

	gulp.task('open-browser', function() {
		var options = {
			url: 'http://localhost:8080'
		};
		return gulp.src('./index.html')
			.pipe(gOpen('', options));
	});


        /*   ==== DEVELOPMENT DEFAULT TASK ==== */
    
    	gulp.task('default', function() {
		runSequence('clear-dev', 'compile-javascript','compile-style', 'copy-index','copy-testdata',
			function() {
				gulp.start('start-server', 'watch-changes', 'open-browser');
			});
	});




}());

