gulp-rename2
============

A simple, yet powerful [gulp](https://github.com/gulpjs/gulp) plugin for transforming file paths.

## Usage

Here is an example of transforming `app/modules/viewer/index.coffee` to `.build/modules/viewer/index.js`

```js
var rename = require("gulp-rename2");

gulp.src("app/modules/viewer/index.coffee")
  .pipe(rename(function (pathObj, filePath) {
    return pathObj.join(
      // remove leading 'app/' directory from the file path
      pathObj.dirname(filePath).replace(/^app\/?/,''), 
      // replace '.coffee' file extension with '.js'
      pathObj.basename(filePath, '.coffee') + '.js'
    );
  }))
  // output to '.build' directory
  .pipe(gulp.dest('.build')); // .build/modules/viewer/index.js
```

## API

```
rename(transformFunction [, options])
```

### transformFunction

The `transformFunction` must have the following signature `function (pathObj, filePath) {}`
and must return a transformed path string. The `pathObj` is an instance of the core Node.js 
[Path](http://nodejs.org/api/path.html) module and the `filePath` is the relative file path of 
the file piped through the stream. Use `pathObj` instance to perform transformations on the 
`file`.

### [options]
```
{ verbose: true }
```
Use verbose option to output the original and transformed paths to the log. The default is `false`.

```js
var rename = require("gulp-rename2");

gulp.src("app/**/*.coffee")
  .pipe(rename(function (pathObj, filePath) {
    return pathObj.join(
      // file path transformations
      ... ... ...
    );
  }, { verbose: true }))
  .pipe(gulp.dest('.build'));
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
