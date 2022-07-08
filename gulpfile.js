//Gulp
const { src, dest, watch, parallel } = require('gulp');


const sass     = require('gulp-sass')(require('sass'));
const plumber  = require('gulp-plumber');

//Imagenes
const webp     = require('gulp-webp');
const avif     = require('gulp-avif');
const cache    = require('gulp-cache');
const imagemin = require('gulp-imagemin');

function css(callback) {
    src('src/scss/**/*.scss') //Identificar el archivo sass
        .pipe(plumber())
        .pipe(sass()) //Compilarlos
        .pipe(dest('build/css')); //Ubicar codigo css

    callback();
}

function images (callback) {
    const opciones = {
        optimizationLevel: 3
    }

    src('src/img/**/*.{png,jpg,jpeg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'));

    callback();
}

function convertWebp (callback) {
    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg,jpeg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'));
    callback();
}

function convertAvif (callback) {
    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg,jpeg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'));

    callback();
}

function dev(callback) {
    watch('src/scss/**/*.scss',css);
    callback();
}

exports.images = images;
exports.convertWebp = convertWebp;
exports.convertAvif = convertAvif;
exports.dev = parallel(convertAvif, convertWebp, images, dev);

