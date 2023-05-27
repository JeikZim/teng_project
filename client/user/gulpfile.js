const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');


const style = done => {
    gulp.src('./src/sass/**/*.sass')
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                errLogToConsole: true,
                outputStyle: 'compressed',
            }),
        )
        .on('error', console.error.bind(console))
        .pipe(
            autoprefixer({
                cascade: false,
            }),
        )
        .pipe(
            csso({
                debug: true, // dev
            }),
        )
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./src/css'))
}

const devStyle = done => {
    gulp.src('./src/sass/**/*.sass')
        .pipe(
            sass({
                errLogToConsole: true,
            }),
        )
        .on('error', console.error.bind(console))
        .pipe(gulp.dest('./src/css'))

	done()
}

gulp.task('watch', () => {
    gulp.watch('./src/sass/**/*.sass', devStyle);
});

gulp.task('production', done => {
	style();
	done();
});

gulp.task('default', done => {
	style();
	done();
})