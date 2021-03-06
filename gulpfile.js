(function() {
	'use strict';
	var gulp = require('gulp'),
		concat = require('gulp-concat'),
		sourcemaps = require('gulp-sourcemaps'),
		templateCache = require('gulp-angular-templatecache'),
		connect = require('gulp-connect'),
		gOpen = require('gulp-open'),
		del = require('del'),
		Q = require('Q'),
		cssMinify = require('gulp-minify-css'),
		sass = require('gulp-sass'),
		uglify = require('gulp-uglify'),
		util = require('gulp-util'),
		uncache = require('gulp-uncache'),
		runSequence = require('run-sequence'),
		typings = require('gulp-typings'),
		webpack = require('webpack-stream');
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
    
	var tsSource = ['app/**/*.ts'];
	var jsSource = ['app/**/*.js', 'dev/app.js'];
	var outputFolder = 'dev'; // default
	var workFolder = 'work';
	var tsCompiledFilename = 'app.compiled.js';

	gulp.task('html', function() {
		return gulp.src('app/**/*.html')
			.pipe(templateCache({
				module: 'app',
				root: 'app/'
			}))
			.pipe(concat('app.js'))
			.pipe(gulp.dest(outputFolder));
	});

	gulp.task('compile-typescript', function () {
		return gulp.src(tsSource)
            .pipe(webpack(require('./webpack.config.js')))
            .pipe(concat(tsCompiledFilename))
            .pipe(gulp.dest(workFolder));
	});


	gulp.task('compile-javascript', ['compile-typescript','html'], function() {
	    return gulp.src(jsDependencies.concat(jsSource).concat(workFolder + "/" + tsCompiledFilename))
			.pipe(sourcemaps.init())
			.pipe(concat('app.js'))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(outputFolder))
			.pipe(connect.reload());
	});
    
    
	gulp.task('sass', function () {
	return gulp.src('./css/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./css/'));
	});

	gulp.task('compile-style',['sass'], function () {
		return gulp.src(cssDependencies.concat(['css/main.css']))
			.pipe(sourcemaps.init())
			.pipe(concat('main.css'))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(outputFolder))
			.pipe(connect.reload());
	});
    

    gulp.task('copy-testdata', function() {
        return gulp.src([ 
            'app/module/bilevelPartion/bilevelPartionTestData.json',
            'app/module/dualBarChart/dualBarChartTestData.json'])
        .pipe(gulp.dest(outputFolder+'/testData'));
    });
    
	gulp.task('copy-index', function() {
		return gulp.src(['index.html', 'config.json'])
			.pipe(uncache({
				append: 'time'
			}))
			.pipe(gulp.dest(outputFolder))
			.pipe(connect.reload());
	});

	gulp.task('copy-modernizr', function() {
		return gulp.src('bower_components/modernizr/modernizr.js')
			.pipe(gulp.dest(outputFolder));
	});
    
	gulp.task('clear-dev', function() {
		var deferred = Q.defer();
		del([outputFolder+'/**/*.*', outputFolder +'/fonts', outputFolder +'/test'], function() {
			deferred.resolve();
		});
		return deferred.promise;
	});

/* interaction */
	gulp.task('start-server', function() {
		connect.server({
			livereload: true,
			root: outputFolder
		});
	});
	gulp.task('watch-changes', function() {
		gulp.watch('app/**/*.js', ['compile-javascript']);
		gulp.watch('app/**/*.ts', ['compile-javascript']);
		gulp.watch('app/**/*.html', ['compile-javascript']);
		gulp.watch('app/**/*.scss', ['compile-style']);
		gulp.watch('css/sass/**/*.scss', ['compile-style']);
		gulp.watch('css/main.scss', ['compile-style']);
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

