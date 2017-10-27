/*
* @Author: zeroli6
* @Date:   2017-09-23 17:23:46
* @Last Modified by:   zeroli6
* @Last Modified time: 2017-10-23 15:40:36
*/

var Hogan = require('hogan.js');
var conf = {
	//因为接口地址和当前的静态文件地址一样，所以直接为空
	serverHost : ''
};
//定义一个工具类
var _mm = {
	//网络请求，请求后端数据
	request : function (param) {
		var _this = this; //即_mm对象
		$.ajax({
			type : param.method || 'get',   //get或post方法
			url : param.url || '',          //默认为空
			dataType : param.type || 'json',//数据接口，默认为json
			data : param.data || '',        //请求时需要的数据
			//请求成功，但不一定请求的数据成功，所以还需要进一步判断
			success : function(res){
				//请求成功
				if (0 === res.status) {
					typeof param.success === 'function' && param.success(res.data, res.msg);
				}
				//没有登录状态，需要强制登录
				else if (10 === res.status) {
					//因为在ajax这个对象里，取不到_mm对象，所以需要一开始就先定义
					_this.doLogin();
				}
				//请求正常，但请求数据错误
				else if (1 === res.status){
					//通常错误信息都放在msg里
					typeof param.error === 'function' && param.error(res.msg);
				}
			},
			//请求失败
			error : function(err){
				typeof param.error === 'function' && param.error(err.statusText);
			}
		});
	},
	//获取服务器地址
	getServerUrl : function(path){
		return conf.serverHost + path;
	},
	//获取url参数的值,name表示需要获取的是哪个参数
	getUrlParam : function(name){
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		//测试网址 http://localhost:8088/dist/view/index.html?test=hello&key=value
		//name参数取值test
		console.log('reg:'+reg); //reg:/(^|&)test=([^&]*)(&|$)/
		//window.location.search 表示url中问号后的参数部分(包括问号)
		var result = window.location.search.substr(1).match(reg);
		console.log('result:'+result);  //result:test=hello&,,hello,&
		//如果能匹配上则result是一个数组，如果匹配不上则为null
		//如果匹配上，result数组中第三个元素才是参数的值
		//因为在传参数时url进行了编码
		return result ? decodeURIComponent(result[2]) : null;
	},
	//渲染html模板
	//需要传入模板和数据，这个方法的作用就是把传入的模板和数据进行拼接
	//渲染是使用hogan组件,hogan渲染分为两步，先编译再渲染，这里封装这个方法的目的就是把这两步合成一步，简化render流程
	renderHtml : function(htmlTemplate,data){
		var template = Hogan.compile(htmlTemplate),  //编译
		    result = template.render(data);          //render可以通过data把这个模板给渲染出来
		return result;
	},
	//成功提示
	successTips : function(msg){
		alert(msg || '操作成功！');
	},
	//错误提示
	errorTips : function(msg){
		alert(msg || '哪里不对了~');
	},
	//表单字段的验证，支持非空、手机、邮箱的判断
	//即判断(如用户名)是否为空，是否是手机号，邮箱格式是否正确
	//参数包括要验证的字符串(value)和它的类型(是否为空、手机号、邮箱)
	//封装validate，是为了全站标准化，假若判断规则有修改，只要改这里就好了
	validate : function(value,type){
		//$.trim方法可以把value前后的空格去掉，并且如果value不是字符串类型，也会转换成字符串
		var value = $.trim(value);
		//非空验证，判断type是否为必须的，即是否为非空
		if ('require' === type) {
			return !!value;  //强转成boolean型，如果value有值，返回true，如果为空字符串，则为false
		}
		//手机号验证
		if ('phone' === type) {
			//以1开头，接下来10个数字
			return /^1\d{10}$/.test(value);
		}
		//邮箱格式验证
		//验证邮箱的规则比较复杂，可以在网上找一个现成的
		if ('email' === type) {
			return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
		}
	},
	//统一登录处理
	doLogin : function(){
		//先是需要进入登录页
		//因为从哪个页面跳进登录页，在登录完成后，就应该再返回哪个页面，所以需要添加参数
		//参数就是页面的当前地址，但由于当前页面地址可能有特殊字符，会被截断，所以需要完全编码
		window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
	},
	goHome : function(){
		window.location.href = './index.html';
	}
};
//模块化输出
module.exports = _mm;