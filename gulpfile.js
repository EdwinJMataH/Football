//Gulp
const { src, dest, watch } = require('gulp');


const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

function css(callback) {
    src('src/scss/**/*.scss') //Identificar el archivo sass
        .pipe(plumber())
        .pipe(sass()) //Compilarlos
        .pipe(dest('build/css')); //Ubicar codigo css

    callback();
}

function dev(callback) {
    watch('src/scss/**/*.scss',css);
    callback();
}

exports.dev = dev;

