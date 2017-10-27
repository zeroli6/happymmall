/*
* @Author: zeroli6
* @Date:   2017-10-27 15:08:43
* @Last Modified by:   zeroli6
* @Last Modified time: 2017-10-27 15:38:08
*/

require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js')
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');

//page逻辑部分
var page = {
	init : function () {
		this.onload();
		this.bindEvent();
	},
	onload : function(){
		//初始化左侧菜单
		navSide.init({
			name : 'user-pass-update'
		});
	},
	bindEvent : function(){
		var _this = this;
		//点击提交按钮后的动作
		$(document).on('click','.btn-submit',function(){
			var userInfo = {
				password : $.trim($('#password').val()),
				passwordNew : $.trim($('#password-new').val()),
				passwordConfirm : $.trim($('#password-confirm').val())
			},
			validateResult = _this.validateForm(userInfo);
			if (validateResult.status) {
				//更改用户密码
				_user.updatePassword({
					passwordOld : userInfo.password,
					passwordNew : userInfo.passwordNew
				}, function(res,msg){
					_mm.successTips(msg);
				}, function(errMsg){
					_mm.errorTips(errMsg);
				});
			}
			else{
				_mm.errorTips(validateResult.msg);
			}
		});
	},
	//验证字段信息
	validateForm : function(formData){
		var result = {
			status : false,
			msg : ''
		};
		//验证原密码是否为空
		if (!_mm.validate(formData.password, 'require')) {
			result.msg = '原密码不能为空';
			return result;
		}
		//验证新密码长度
		//如果formData.passwordNew是undefined/none,执行formData.passwordNew.length会报错
		//这里借用了或逻辑的执行顺序来解决这个问题，如果!formData.passwordNew为真，则不会执行后面的内容
		if (!formData.passwordNew || formData.passwordNew.length < 6) {
			result.msg = '新密码长度不得少于6位';
			return result;
		}
		//验证两次密码是否一致
		if (formData.passwordNew !== formData.passwordConfirm) {
			result.msg = '两次输入的密码不一致';
			return result;
		}
		//通过验证，返回正确提示
		result.status = true;
		result.msg = '验证通过';
		return result;
	}		
};
$(function(){
	page.init();
});
