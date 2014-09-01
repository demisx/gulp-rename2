gulp-rename2
============

A simple, yet powerful [gulp](https://github.com/gulpjs/gulp) plugin for transforming file paths
in the stream.

## Usage

Here is a contrived example of transforming `app/modules/viewer/index.coffee` to `.build/modules/viewer/index.js`.
Obviously, you may do anything you want inside `pathObj.join()` as long as it returns syntactically valid file path
(i.e. no checks are made against the files system whether this path is valid or not).

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

The `transformFunction` must have the following signature `function (pathObj, filePath) {}`. 
The `pathObj` is an instance of the core Node.js [Path](http://nodejs.org/api/path.html) 
module and the `filePath` is the relative file path of the file piped through the stream. 
Basically, use `pathObj` instance to perform transformations on the `filePath` leveraging
methods provided by the Node's `Path` core module. 

This function must return the final path string.

### [options]
```
{ verbose: true }
```
Use verbose option to output the original and the transformed file paths to the log. 
The default is `false`.

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
