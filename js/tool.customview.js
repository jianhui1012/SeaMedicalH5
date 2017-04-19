//返回带有自定义的PopPicker
var setcpoppicker = function(jsondata) {
	var userPicker = new mui.PopPicker();
	userPicker.setData(jsondata);
	return userPicker;
}