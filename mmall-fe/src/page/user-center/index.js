/*
* @Author: zeroli6
* @Date:   2017-10-26 15:05:12
* @Last Modified by:   zeroli6
* @Last Modified time: 2017-10-26 18:31:12
*/

require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js')
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var templateIndex = require('./index.string');

//page逻辑部分
var page = {
	init : function () {
		this.onload();

	},
	onload : function(){
		//初始化左侧菜单
		navSide.init({
			name : 'user-center'
		});
		//加载用户信息
		this.loadUserInfo();
	},
	//加载用户信息
	loadUserInfo : function(){
		var userHtml = '';
		_user.getUserInfo(function(res){
			userHtml = _mm.renderHtml(templateIndex, res);
			$('.panel-body').html(userHtml);
		}, function(errMsg){
			_mm.errorTips(errMsg);
		});
	}		
};
$(function(){
	page.init();
});
