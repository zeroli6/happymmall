/*
* @Author: zeroli6
* @Date:   2017-10-23 08:58:13
* @Last Modified by:   zeroli6
* @Last Modified time: 2017-10-23 10:13:19
*/

require('./index.css');

var _mm = require('util/mm.js');
require('page/common/nav-simple/index.js');

$(function () {
	var type = _mm.getUrlParam('type') || 'default',
		$element = $('.' + type + '-success');
	// 显示对应的提示元素
	$element.show();
})