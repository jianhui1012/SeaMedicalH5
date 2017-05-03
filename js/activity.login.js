(function($, owner) {
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
//		console.log(JSON.stringify(loginInfo))
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		//判断用户名与密码是否存在
		loginInfo.uid = loginInfo.uid || '';
		loginInfo.pwd = loginInfo.pwd || '';
		if (loginInfo.uid.length == 0 || loginInfo.pwd.length == 0) {
			return callback('用户名或密码不能为空');
		}
 
 

 
		NewMuiAjax2("http://localhost:2526/","", loginInfo, 'json', 'post',
			function(data) {
 	          console.log(JSON.stringify(data));
				if ("False" == result) {
//					console.log(JSON.stringify(data))
					return callback('用户名或密码错误');
				} else {

					return owner.createState(message, callback);
				}
			}, function(xhr, type, errorThrown) {
				plus.nativeUI.toast(xhr.toString());
				console.log(type);
			});
	};

	//设置登录返回数据
	owner.createState = function(logindata, callback) {
		setLocalValue('$user', logindata, true);
		return callback();
	};


	/**
	 * 选择类型
	 */
}(mui, window.owner = {}));