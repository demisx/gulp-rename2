'use strict';

var gutil = require('gulp-util');
var through = require('through2');
var path = require('path');

var PLUGIN_NAME = 'gulp-rename2';

module.exports = function(rules, options){

  options = options || {};
  options.debug && gutil.log("[DEBUG] transformation function: ", rules);
  options.debug && gutil.log("[DEBUG] options: ", options);

  if (typeof rules !== 'function') {
    throw new gutil.PluginError(
      PLUGIN_NAME, '[ERROR] Missing transformation function.'
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
        '[ERROR] The new path is not valid. Please check your transformation function to ensure it returns a valid path'
      ));
    } else {
      file.path = path.resolve(cwd, newPath);
    }

    this.push(file);
    cb();
  }

  return through.obj(rename);
};
