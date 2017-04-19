//人员id，平台类型
var items, liArray, curpid, curtype;
//页索引与页大小
var pageindex = 1,
	pagesize = 10;
// 加载flag
var loading = false;
// 最多可加载的条目
var maxItems = 0;
var lastIndex = 0;

/***
 * 初始化操作
 * @param {Object} pid--人员id
 * @param {Object} type--android,ios
 */
function FcgyAppPage(pid, type) {
	$.init(); //初始化上拉加载组件
	curtype = type;
	curpid = pid;
	this.initele();
	//this.initdata(curpid);
	FcgyAppPage.addItems(0, 10, "");
	FcgyAppPage.LoadMoreItems();

}

//类方法-- 静态方法
//android 调用activity转详情页面方法
FcgyAppPage.turnQiYeDetail = function(cid) {
	window.location.href = 'company_detail.html?cid=' + cid;
};

//添加数据
FcgyAppPage.addItems = function(pindex, psize, cname) {
	var lsid = null;
	$.getJSON("data.json", function(data, status, xhr) {
		if (data["Result"] == "False" || data["Result"] == "undefined") {
			$.alert('数据加载失败');
			return;
		}
		//获取数据大小
		maxItems = data["total"];
		for (var item in data["rows"]) {
			lsid = data["rows"][item];
			$("#content").append('<li><a  class="item-link item-content" onClick="FcgyAppPage.turnQiYeDetail(\'' + lsid["ID"] + '\')"><div class="item-inner"><div class="item-title-row"><div class="item-title">企业名称</div><div class="item-after">' + lsid['企业名称'] + '</div></div>' +
				'<div class = "item-title-row" > <div class = "item-title" > 地址 </div><div class="item-after">' + lsid["注册地址"] + '</div></div>' +
				'<div class="item-title-row"><div class="item-title">法人</div><div class="item-after">' + lsid["法定代表人"] + '</div></div>' +
				'<div class="item-title-row"><div class="item-title">电话</div><div class="item-after">' + lsid["联系电话"] + '</div></div></div></a></li>');
		}
		// 更新最后加载的序号
		lastIndex = $('#content li').length;
	});

}

//加载更多页面方法
FcgyAppPage.LoadMoreItems = function() {
	//无限滚动
	// 注册'infinite'事件处理函数
	$(".infinite-scroll").on('infinite', function() {
		// 如果正在加载，则退出
		if (loading)
			return;
		// 设置flag
		loading = true;
		// 模拟1s的加载过程
		setTimeout(function() {
			// 重置加载flag
			loading = false;
			if (lastIndex >= maxItems) {
				// 加载完毕，则注销无限加载事件，以防不必要的加载
				$.detachInfiniteScroll($('.infinite-scroll'));
				// 删除加载提示符
				$('.infinite-scroll-preloader').remove();
				return;
			}
			// 添加新条目
			FcgyAppPage.addItems(++pageindex, pagesize);

			//容器发生改变,如果是js滚动，需要刷新滚动
			$.refreshScroller();
		}, 1000);
	});

};

FcgyAppPage.onsearch = function(event) {
	var con = $("#content")[0];
	//企业名称所在li list
	items = [].slice.call(con.querySelectorAll('.item-content'));
	//企业名称 list
	liArray = [].slice.call(con.querySelectorAll('.item-inner'));
	//var e = event || window.event;
	//var keyCode = e.keyCode || e.which;
	var keyword = $("#search").val();
	//关键字匹配若该项与之匹配则显示否则隐藏(不占控件)--根据企业名本地搜素与远程搜素
	liArray.forEach(function(item) {
		var currentIndex = liArray.indexOf(item);
		var text = (item.innerText || '').toLowerCase();
		var curitem = items[currentIndex];
		if (keyword && text.indexOf(keyword) < 0) {
			curitem.style.display = "none";
		} else {
			curitem.style.display = "";
		}
	});
	if (event.keyCode == 13) {
		//网络请求加载数据Fc
		pageindex = 1;
		$("#content").html("");
		FcgyAppPage.addItems(pageindex, pagesize, keyword == "undefined" ? "" : keyword);
		console.log(keyword);
	}
};

//原型对象方法
FcgyAppPage.prototype = {
	constructor: FcgyAppPage,
	initele: function() {
		$(".searchbar-cancel").click(function() {
			$("#search").val("");
		});
		$(".backTopBtn").click(function() {
			$('.content').scrollTop(0); //==> number
		});
	},
	initdata: function(pid) {
		for (var i = 15; i >= 0; i--) {
			$("#content").append('<li><a  class="item-link item-content" onClick="FcgyAppPage.turnQiYeDetail(\'' + lsid["ID"] + '\')"><div class="item-inner"><div class="item-title-row"><div class="item-title">企业名称</div><div class="item-after">' + lsid['企业名称'] + '</div></div>' +
				'<div class = "item-title-row" > <div class = "item-title" > 地址 </div><div class="item-after">' + lsid["注册地址"] + '</div></div>' +
				'<div class="item-title-row"><div class="item-title">法人</div><div class="item-after">' + lsid["法定代表人"] + '</div></div>' +
				'<div class="item-title-row"><div class="item-title">电话</div><div class="item-after">' + lsid["联系电话"] + '</div></div></div></a></li>');
		}
	}

}