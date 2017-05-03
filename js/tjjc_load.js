var curtype, cururl, lat, longt;
var ui = {
	ssr: $('#ssr'),
	sssj: $('#sssj'), //受伤时间
	cbh: $('#cbh'), //船编号
	kamt: $('#kamt'), //靠岸码头
	bqms: $('#bqms'), //病情描述
	//
	jcsubmit: $('#jcsubmit'),
	jcclear: $('#jcclear'),
};

function TjjcAppPage(type, url) {
	curtype = type;
	cururl = url;
	mui.plusReady(function() {
		getPosByBaidu();
	});
	this.initui();
	this.initevent();
}

//获取位置信息
function geoInf(position) {
	var codns = position.coords; //获取地理坐标信息；
	lat = codns.latitude; //获取到当前位置的纬度；
	longt = codns.longitude; //获取到当前位置的经度
}

// 通过百度定位模块获取位置信息需要配置百度地图--目前支持两种地图(百度地图与高德地图)
function getPosByBaidu() {
	plus.geolocation.getCurrentPosition(geoInf, function(e) {
		alert("获取位置信息失败：" + e.message);
	}, {
		provider: 'baidu',
		coordsType: 'bd09ll'
	});
}
//gps定位(需要在空旷的地方)
function getPosByGps() {
	plus.geolocation.getCurrentPosition(geoInf, function(e) {
		var s = e.message;
		alert("获取位置信息失败：" + e.message);
	}, {
		provider: 'system'
	});
}

//原型对象方法
TjjcAppPage.prototype = {
	constructor: TjjcAppPage,
	initui: function() {
		ui.sssj.calendar({});
	},
	initevent: function() {
		ui.jcsubmit.click(function() {
			console.log(cururl);
			$.post(cururl, {
				"受伤部位": ui.ssr.val(),
				"时间": ui.sssj.val(),
				"处理状态": ui.cbh.val(),
				"码头": ui.kamt.val(),
				"简要描述": ui.bqms.val(),
				"精度": longt,
				"维度": lat,
				"图片": getimagebase64()
			}, function(data) {
				console.log(data);
				data = JSON.parse(data);
				if(data.response.error == 0) {
					//获得服务器响应
					plus.nativeUI.toast('提交成功');
					mui.back();
				} else {
					plus.nativeUI.toast('提交失败' + response);
				}
			})
		});
		ui.jcclear.click(function() {
			ui.jcr.val("");
			ui.jcrs.val("");
			ui.xccs.val("");
			ui.zfwsqk.val("");
			ui.jcsj.val("");
		});
	}

}