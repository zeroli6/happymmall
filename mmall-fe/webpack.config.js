/*
* @Author: zeroli6
* @Date:   2017-09-14 20:08:32
* @Last Modified by:   zeroli6
* @Last Modified time: 2017-10-27 15:11:24
*/
var webpack = require('webpack');  //因为下面用到了webpack，所以需要先require
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量配置：dev(开发环境) / online(线上环境，即打包后上线)
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

//获取html-webpack-plugin参数的方法
var getHtmlConfig = function (name,title) {
	return {
		template : './src/view/' + name + '.html',
		filename : 'view/' + name + '.html',
        title : title,
		inject : true,
		hash : true,
		chunks : ['common',name]
	};
}
//webpack config
var config = {
    entry: {
    	'common': ['./src/page/common/index.js'],
    	'index' : ['./src/page/index/index.js'],
        'user-login' : ['./src/page/user-login/index.js'],
        'user-register' : ['./src/page/user-register/index.js'],
        'user-pass-reset' : ['./src/page/user-pass-reset/index.js'],
        'user-center' : ['./src/page/user-center/index.js'],
        'user-center-update' : ['./src/page/user-center-update/index.js'],
        'user-pass-update' : ['./src/page/user-pass-update/index.js'],
    	'result' : ['./src/page/result/index.js'],
    },
    output: {
        path: './dist', //生成文件的目录
        publicPath: '/dist', //访问文件时的路径
        filename: 'js/[name].js'
    },
    externals: {
    	'jquery' : 'window.jquery'
    },
    module: {
    	loaders: [
    		{ test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
    		//表示检测到以.css结尾的文件就用后面的loader，感叹号表示对 loader的串联，并且是从右向左的顺序，即先执行css-loader，再把结果执行style-loader
    		{ test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
    		//url-loader的使用，列举需要加载文件的类型，设置limit参数(以byte为单位)，如果小于limit，则转换为base64编码；如果大于limit，则以文件形式打包，这是需要设置存放路径，这个路径也是以output中的path为基础的，[name]表示使用原文件名，[ext]表示使用原扩展名
            { test: /\.string$/, loader: 'html-loader'}
    	]
    },
    resolve : {
    	alias : {
    		// __dirname表示当前根目录
    		util : __dirname + '/src/util',
    		page : __dirname + '/src/page',
    		service : __dirname + '/src/service',
    		image : __dirname + '/src/image',
            node_modules : __dirname + '/node_modules'
    	}
    },
    plugins: [
    	//独立通用模块到js/base.js
    	new webpack.optimize.CommonsChunkPlugin({
    		name : 'common',  //插件本身提供的
    		filename : 'js/base.js'  //注意这个也是在output的根目录基础上的
    	}),
    	//把css单独打包到文件里
    	new ExtractTextPlugin("css/[name].css"),
    	//html模板的处理
    	new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update','修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),
    	new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
    ] 
};

//保证在开发环境时才打包webpack-dev-server
if ('dev' === WEBPACK_ENV) {
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

 module.exports = config;