var Const=new Object();
Const.Login="Login";
Const.Regeister="Regeister";
Const.AddSSJL="AddSSJL";
Const.GetSSJLlist="GetSSJLlist";
//接口地址
var getWebMethod=function(method){
 method=method||"";	
 return "http://sea.tunnel.qydev.com/"+method
}
 


/**
 * 设置字符串到本地
 * @param {Object} addname--标识
 * @param {Object} addvalue--设置的值
 */
var setLocalValue = function(name, value) {
	value = value || {};
	localStorage.setItem(name, JSON.stringify(value));
};


//根据键获取localStorage存的值
var getLocalByKey = function(localkey) {
	var stateText = localStorage.getItem(localkey) || "{}";
	return JSON.parse(stateText);
}


/**
 * 获取应用本地配置
 **/
var setSettings = function(settings) {
	settings = settings || {};
	localStorage.setItem('$settings', JSON.stringify(settings));
}

/**
 * 设置应用本地配置
 **/
var getSettings = function() {
	var settingsText = localStorage.getItem('$settings') || "{}";
	return JSON.parse(settingsText);
}

//按两次返回按钮退出
var twice_backbutton = function() {
	//处理逻辑：1秒内，连续两次按返回键，则退出应用；
	var first = null;
	mui.back = function() {
		//首次按键，提示‘再按一次退出应用’
		if (!first) {
			first = new Date().getTime();
			mui.toast('再按一次退出应用');
			setTimeout(function() {
				first = null;
			}, 1000);
		} else {
			if (new Date().getTime() - first < 1000) {
				plus.runtime.quit();
			}
		}

	};
}

//获取页面的控件
var get = function(id) {
	return document.getElementById(id);
};
//通用查找方式去获取控件
var getbyall = function(id) {
	return document.querySelector(id);
};

//匹配查询控件数组
var qsa = function(sel) {
	return [].slice.call(document.querySelectorAll(sel));
};

//设置键盘模式
var setsoftinputMode = function(softinputmode) {
	if (softinputmode == "") {
		softinputmode = "adjustResize";
	}
	plus.webview.currentWebview().setStyle({
		softinputMode: softinputmode
	});
};
//显示键盘
var showKeyboard = function() {
	if (mui.os.ios) {
		var webView = plus.webview.currentWebview().nativeInstanceObject();
		webView.plusCallMethod({
			"setKeyboardDisplayRequiresUserAction": false
		});
	} else {
		var Context = plus.android.importClass("android.content.Context");
		var InputMethodManager = plus.android.importClass("android.view.inputmethod.InputMethodManager");
		var main = plus.android.runtimeMainActivity();
		var imm = main.getSystemService(Context.INPUT_METHOD_SERVICE);
		imm.toggleSoftInput(0, InputMethodManager.SHOW_FORCED);
		//var view = ((ViewGroup)main.findViewById(android.R.id.content)).getChildAt(0);
		//getDecorView()方法弃用会出错
		imm.showSoftInput(main.getWindow().getDecorView(), InputMethodManager.SHOW_IMPLICIT);
		//alert("ll");
	}
};

