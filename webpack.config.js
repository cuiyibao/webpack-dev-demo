/**
 * Created by bao on 2017/9/18.
 */
const path = require('path');
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'app');
const webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //入口
    entry:  {
        app: APP_PATH,
        vendor:['jquery','moment'],
    },
    //出口文件输出配置
    output: {
        path:ROOT_PATH,
        filename: 'build/[name].[chunkhash:8].js',
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            //manifest:抽取变动部分，防止第三方控件的多次打包
            names: ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            filename:'index.html',    //生成的html存放路径，相对于 path
            template:'app/index.html',    //html模板路径
            inject:true,    //允许插件修改哪些内容，true/'head'/'body'/false,
            // chunks:['vendor','app'],//加载指定模块中的文件，否则页面会加载所有文件
            hash:false,    //为静态资源生成hash值
            minify:{    //压缩HTML文件
                removeComments:false,    //移除HTML中的注释
                collapseWhitespace:false    //删除空白符与换行符
            }
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, "/build"), //网站的根目录为 根目录/dist
        port: 8992, //端口改为9000
        host: '127.0.0.1', //如果指定的host，这样同局域网的电脑或手机可以访问该网站,host的值在dos下使用ipconfig获取 
        open:true, // 自动打开浏览器
        index:'index.html', // 与HtmlWebpackPlugin中配置filename一样
        inline:true, // 默认为true, 意思是，在打包时会注入一段代码到最后的js文件中，用来监视页面的改动而自动刷新页面,当为false时，网页自动刷新的模式是iframe，也就是将模板页放在一个frame中
        hot:false,
        compress:true //压缩
    }
};