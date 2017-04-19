mui.plusReady(function() {
	//重写返回事件
	mui.back = function() {
		plus.runtime.quit();
	};
});