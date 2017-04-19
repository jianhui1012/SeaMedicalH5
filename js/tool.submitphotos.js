//设置最大的图片上传数量
var imageslistmax = 6;
//当前图片的数量
var imagesum = 0;
//图片索引
var imageIndexIdNum = 0;

//获取页面的控件
var get = function(id) {
	return document.getElementById(id);
};
//声明图片控件集合
var pcitureui = {
	imageList: get('image-list'),
};
pcitureui.getFileInputArray = function() {
	return [].slice.call(pcitureui.imageList.querySelectorAll('input[type="button"]'));
};
pcitureui.getFileInputIdArray = function() {
	var fileInputArray = pcitureui.getFileInputArray();
	var idArray = [];
	fileInputArray.forEach(function(fileInput) {
		if (fileInput.value != '') {
			idArray.push(fileInput.getAttribute('id'));
		}
	});
	return idArray;
};

pcitureui.newPlaceholder = function() {
	var fileInputArray = pcitureui.getFileInputArray();
	if (fileInputArray &&
		fileInputArray.length > 0 &&
		fileInputArray[fileInputArray.length - 1].parentNode.classList.contains('space')) {
		return;
	}
	imageIndexIdNum++;
	var placeholder = document.createElement('div');
	placeholder.setAttribute('class', 'image-item space');
	var closeButton = document.createElement('div');
	closeButton.setAttribute('class', 'image-close');
	closeButton.innerHTML = 'X';
	//删除图片事件
	closeButton.addEventListener('click', function(event) {
		event.stopPropagation();
		event.cancelBubble = true;
		setTimeout(function() {
			if (imagesum <= 0) {
				imagesum = 0;
			} else {
				//当前图片数最大的值为设定最大值
				if (imagesum == imageslistmax) {
					pcitureui.newPlaceholder();
				}
				imagesum--;
				//删除当前图片
				pcitureui.imageList.removeChild(placeholder);
			}
		}, 0);
		return false;
	}, false);
	var fileInput = document.createElement('input');
	fileInput.setAttribute('type', 'button');
	fileInput.setAttribute('id', 'image-' + imageIndexIdNum);
	//设置图片上传事件
	fileInput.addEventListener('tap', function tapcustom(event) {
		
		var btnArray = [{
			title: "拍照"
		}, {
			title: "选取图库"
		}];
		plus.nativeUI.actionSheet({
			title: "选择照片",
			cancel: "取消",
			buttons: btnArray
		}, function(e) {
			var index = e.index;
			switch (index) {
				case 0:
					break;
				case 1:
					var cmr = plus.camera.getCamera();
					cmr.captureImage(function(path) {
						pcitureui.addscpic("file://" + plus.io.convertLocalFileSystemURL(path), placeholder);
						fileInput.removeEventListener('tap', tapcustom, false)
					}, function(err) {});

					break;
				case 2:
					plus.gallery.pick(function(path) {
						pcitureui.addscpic(path, placeholder);
						fileInput.removeEventListener('tap', tapcustom, false)
					}, function(err) {}, null);
					break;
			}
		});
		
	}, false);
	placeholder.appendChild(closeButton);
	placeholder.appendChild(fileInput);
	pcitureui.imageList.appendChild(placeholder);
};

//初始化添加默认的空白图片item
pcitureui.newPlaceholder();

//选择图片后返回添加到前台页面
pcitureui.addscpic = function(picpath, szplaceholder) {

	var that = this;
	lrz(picpath, {
		width: 450
	}).then(function(rst) {
		imagesum++;
		szplaceholder.src = rst.base64.split(',')[1];
		szplaceholder.style.backgroundImage = 'url(' + rst.base64 + ')';
		szplaceholder.classList.remove('space');
		if (imagesum >= imageslistmax) {
			mui.toast("达到最大的图片数");
		} else {
			pcitureui.newPlaceholder();
		}
		return rst;
	});

};

//将所有base64图片源转化进行encodeURIComponent加密并以','隔开
function getimagebase64() {
	var picbasestr = "";
	var imageitemlist = $('.image-item');
	$.each(imageitemlist, function(index, item) {
		if (index == 0 && (item.src != undefined)) {
			picbasestr = encodeURIComponent(item.src);
		} else if (item.src != undefined) {
			picbasestr += "," + encodeURIComponent(item.src);
		}
	});
	return picbasestr;
}