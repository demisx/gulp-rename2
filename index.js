'use strict';

var gutil = require('gulp-util');
var through = require('through2');
var path = require('path');

var PLUGIN_NAME = 'gulp-rename2';

module.exports = function(rules, options){

  options = arguments[1] || {}
  options.debug && gutil.log("transformation function: ", rules);
  options.debug && gutil.log("options: ", options);

  if (typeof rules !== 'function') {
    throw new gutil.PluginError(
      PLUGIN_NAME, 'Missing function with path transformation rules'
    );
  }

  function rename(file, encoding, cb){
    //jshint validthis:true

    var cwd = file.cwd || process.cwd();
    var relativeFilepath = path.relative(cwd, file.path);
    options.verbose && gutil.log('Original path: ', relativeFilepath);

    var newPath = rules(path, relativeFilepath);
    options.verbose && gutil.log('Transformed path: ', newPath);

    if (!newPath) {
      this.emit('error', new gutil.PluginError(
        PLUGIN_NAME, 
        'The new path is not valid. Please check your transformation function to ensure it returns a valid path'
      ));
    } else {
      file.path = path.resolve(cwd, newPath);
    }

    this.push(file);
    cb();
  }

  return through.obj(rename);
};
