/*
* @Author: zeroli6
* @Date:   2017-10-17 10:53:13
* @Last Modified by:   zeroli6
* @Last Modified time: 2017-10-18 10:07:57
*/

require('./index.css');
var _mm = require('util/mm.js');
// 通用页面头部
var header = {
	init : function () {
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		var keyword = _mm.getUrlParam('keyword');
		//keyword存在，则回填输入框
		if (keyword) {
			$('#search-input').val(keyword);
		}
	},
	bindEvent : function(){
		var _this = this;
		//点击搜索按钮以后，做搜索提交
		$('#search-btn').click(function() {
			//这里是在jQuery选择器里，this不生效？所以需要先定义
			_this.searchSubmit();
		});
		//输入回车后，做搜索提交
		$('#search-input').keyup(function(e) {
			//13是回车键的keyCode
			if (e.keyCode === 13) {
				_this.searchSubmit();
			}
		});
	},
	//搜索的提交
	searchSubmit : function(){
		var keyword = $.trim($('#search-input').val());
		//如果提交的时候有keyword，正常跳转到list页
		if (keyword) {
			//这里把参数名字设置成keyword了，所以getUrlParam('keyword')
			window.location.href = './list.html?keyword=' + keyword;
		}
		//如果keyword为空，直接返回首页
		else{
			_mm.goHome();
		}
	}
};

header.init();
