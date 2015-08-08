var gulp = require("gulp");
var gutil = require("gulp-util");
var path = require('path');
var webpack = require("webpack");
var webpackDevServer = require("webpack-dev-server");

//Dev Server
var baseDir = __dirname + '/client';
var devServerPort = 8000;
var devServerHost = 'localhost';
var distDirs = {
  dev: baseDir,
  dist: __dirname + '/dist'
}
//Styles - Webpack loader for chosen css preprocessor //TODO support auto-prefixer
var styleLoader = {
  test: /\.scss$/,
  loader: 'style!css!sass'
};
//JS - Webpack loader for chosen JS dialect //TODO - Add other dialects with yeoman
//Empty if plain js

//NGTemplate Loader - Webpack loader for our angular templates
var ngTemplateLoader = {
  test: /\.html$/,
  loader: 'ngtemplate?relativeTo=' + baseDir + '/!html',
};

var webPackConfig = function (env) {
  return {
    context: baseDir,
    module: {
      loaders: [
        styleLoader, ngTemplateLoader
      ],
    },
    entry: {
      app: ["webpack/hot/dev-server", './app.js']
    },
    output: {
      path: distDirs[env],
      filename: 'bundle.js'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  }
}

gulp.task('webpack:dev', function () {
  //Run server that watches filesystem and recompiles bundle then serves bundle to dev server.
  new webpackDevServer(webpack(webPackConfig('dev')), {
    contentBase: baseDir,
    hot: true,
    stats: {
      colors: true
    }
  })
    .listen(devServerPort, devServerHost, function (err) {
      if (err) throw new gutil.PluginError("webpack:dev", err);
    });
});

gulp.task('default',['webpack:dev']);