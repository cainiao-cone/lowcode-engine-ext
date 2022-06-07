const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = ({ context,onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    config.resolve.plugin('tsconfigpaths').use(TsconfigPathsPlugin, [
      {
        configFile: './tsconfig.json',
      },
    ]);

    /*
    config
      // 定义插件名称
      .plugin('MonacoWebpackPlugin')
      // 第一项为具体插件，第二项为插件参数
      .use(new MonacoWebpackPlugin({
        languages:["javascript","css","json"]
      }), []);
      */
    config.plugins.delete('hot');
    config.devServer.hot(false);
    if (context.command === 'start') {
      config.devtool('inline-source-map');
    }
    // console.log('====context',context.command)

    // config.devtool('inline-source-map');

    if (process.env.NODE_ENV === 'development') {
      // 将 sourceMap inline 来方便代理调试, 否则加载的是线上的 map 文件
      config.devtool('inline-cheap-module-source-map');
    }
    // build 打包不压缩代码, 方便 debug
    config.output.pathinfo(true);
    config.optimization.minimize(false);
  });
};
