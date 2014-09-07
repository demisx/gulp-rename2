gutil = require("gulp-util")
through = require("through2")
path = require("path")
PLUGIN_NAME = "gulp-rename2"

module.exports = (rules, options) ->
  
  options = options or {}

  if options.debug
    gutil.log("[DEBUG] transformation function: ", rules)
    gutil.log("[DEBUG] options: ", options)
  
  throw new gutil.PluginError(
    PLUGIN_NAME, "[ERROR] Missing transformation function."
  )  if typeof rules isnt "function"

  rename = (file, encoding, cb) ->
    cwd = file.cwd or process.cwd()
    relativeFilepath = path.relative(cwd, file.path)
    gutil.log("Original path: ", relativeFilepath) if options.verbose
    
    newPath = rules(path, relativeFilepath)
    gutil.log("Transformed path: ", newPath) if options.verbose
  
    unless newPath
      @emit "error",
      err = new gutil.PluginError(
        PLUGIN_NAME,
        "[ERROR] The new path is not valid. Please check your transformation
         function to ensure it returns a valid path"
      )
      return cb(err)

    file.path = path.resolve(cwd, newPath)
    @push file
    cb()
    return
  
  through.obj rename