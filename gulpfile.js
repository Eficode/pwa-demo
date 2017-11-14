const gulp = require('gulp');
const browserSync = require('browser-sync');
const wbBuild = require('workbox-build');
const rename = require('gulp-rename');
const reload = browserSync.reload;

gulp.task('default', ['copy-workbox', 'inject-manifest'], () => {
  browserSync({
    notify: false,
    server: ['app'],
    // https: true,
    port: 3000,
  });
});

gulp.task('copy-workbox', () => {
  return gulp.src(['node_modules/workbox-sw/build/importScripts/workbox-sw.prod*.js'])
    .pipe(rename('workbox.js'))
    .pipe(gulp.dest('app'));
});

gulp.task('inject-manifest', () => {
  return wbBuild.injectManifest({
    swSrc: './app/sw.js',
    swDest: './app/service-worker.js',
    globDirectory: './app/',
    globPatterns: ['**\/*.{html,js,css,png}'],
    globIgnores: ['admin.html']
  })
  .then(() => {
    console.log('Service worker generated.');
  });
});

gulp.watch(['app/**/*'], reload);
