const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  baseUrl: '/',
  assetsDir: 'static', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  filenameHashing: false, // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  productionSourceMap: process.env.NODE_ENV !== 'production', // 正式环境不需要
  outputDir: process.env.outputDir || 'dist',
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      let plugins = [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_debugger: true,
              drop_console: true,
            },
          },
          sourceMap: false,
          parallel: true, // 启用/禁用多进程并行运行
        })
      ]
      config.plugins = [...config.plugins, ...plugins]
    } else {
      // 为开发环境修改配置...
    }
  }
};
