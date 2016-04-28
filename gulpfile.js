var gulp = require("gulp");

var jade = require("gulp-jade");

var sass = require("gulp-sass");
var bulkSass = require("gulp-sass-bulk-import");
var pleeease = require("gulp-pleeease");
var sourcemaps = require('gulp-sourcemaps');

var watch = require("gulp-watch");
var rename  = require("gulp-rename");
var uglify  = require("gulp-uglify");
var plumber = require("gulp-plumber");
var browserSync = require("browser-sync");
var notify = require("gulp-notify");

var isProxyMode = false;
var proxy = "";

var dir = {
	"source"     : "src",
	"dest"       : "res",
	"bs_base"    : "./",
	"build_base" : "./2016/"
};

var port = "8080";

gulp.task("server", function(){
	if( isProxyMode ){
		browserSync({
	        proxy : proxy,
			files: [
				dir.build_base + dir.dest + "/**.css",
				dir.build_base + dir.dest + "/**.js",
				dir.build_base + "**.html"
			]
		});
		return;
	}

	browserSync({
	    port: port,
	    server: {
	    	"baseDir": dir.bs_base
	    },
		files: [
			dir.build_base + dir.dest + "/**.css",
			dir.build_base + dir.dest + "/**.js",
			dir.build_base + "**.html"
		]
	});
});

gulp.task("jade", function (){
	gulp.src(dir.build_base + dir.source + "/jade/*.jade")
		.pipe(plumber({
			errorHandler: notify.onError("<%= error.message %>")
		}))
		.pipe(jade({
		client: true,
		pretty: true
		}))
		.pipe(gulp.dest(dir.build_base + dir.dest + "/jade"))
});

gulp.task("js", function (){
	gulp.src(dir.build_base + dir.source + "/js/*.js")
		.pipe(plumber())
		.pipe(gulp.dest(dir.build_base + dir.dest + "/js"))
		.pipe(uglify())
		.pipe(rename({
			extname: ".min.js"
		}))
		.pipe(gulp.dest(dir.build_base + dir.dest + "/js"))
})

gulp.task("sass", function(){
	gulp.src(dir.build_base + dir.source + "/scss/*.scss")
		.pipe(plumber({
			errorHandler: notify.onError("<%= error.message %>")
		}))
		.pipe(bulkSass())
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'expanded'}))
		.pipe(pleeease({
			fallbacks: {
				autoprefixer: ['last 2 versions']
			},
			minifier: false
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(dir.build_base + dir.dest+"/css"))
		.pipe(pleeease({
			minifier: true
		}))
		.pipe(rename({
			extname: '.min.css'
		}))
		.pipe(gulp.dest(dir.build_base + dir.dest+"/css"));
});

gulp.task("build", ["js", "sass", "jade"]);

gulp.task("default", ["server", "js", "jade", "sass"], function (){
	watch(
		[dir.build_base + dir.source + "/js/**"],
		function (){
			return gulp.start(['js']);
		}
	);

	watch(
		[dir.build_base + dir.source + "/scss/**"],
		function (){
			return gulp.start(['sass']);
		}
	);

	watch(
		[dir.build_base + dir.source + "/jade/**"],
		function (){
			return gulp.start(['jade']);
		}
	);
});
