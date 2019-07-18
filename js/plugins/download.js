'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = download;
/**
 * 下载文件
 *
 * @export
 * @param {*} type 设置接收数据类型 参数 1 或 2
 * @param {*} data type为 1 时 data 为文件地址； type为 2 时 data 为canvas对象
 * @param {*} name 当文件为图片类型时需设置文件名
 */
function download(type, data, name) {
  if (type == 1) {
    var url = data;
    // 通过地址判断是否为图片类型文件
    var ext = url.slice(url.lastIndexOf('.') + 1).toLowerCase();
    if (isImage(ext)) {
      convertUrlToBase64(url).then(function (base64) {
        var blob = convertBase64UrlToBlob(base64);
        // 下载
        if (myBrowser() == 'IE') {
          window.navigator.msSaveBlob(blob, name + '.jpg');
        } else {
          var a = document.createElement('a');
          a.download = name;
          a.href = URL.createObjectURL(blob);
          a.click();
        }
      });
    } else {
      var a = document.createElement('a');
      a.download = name;
      a.href = url;
      a.click();
    }
  } else {
    var dataURL = data.toDataURL('image/jpeg', 1.0);
    var base64 = {
      dataURL: dataURL,
      type: 'image/jpg',
      ext: 'jpg'
    };
    var blob = convertBase64UrlToBlob(base64);
    // 下载
    if (myBrowser() == 'IE') {
      window.navigator.msSaveBlob(blob, name + '.jpg');
    } else {
      var _a = document.createElement('a');
      _a.download = name;
      _a.href = URL.createObjectURL(blob);
      _a.click();
    }
  }
}

/**
 * 将 base64 转换位 blob 对象
 * blob 存储 2进制对象的容器
 * @export
 * @param {*} base64
 * @returns
 */
function convertBase64UrlToBlob(base64) {
  var parts = base64.dataURL.split(';base64,');
  var contentType = parts[0].split(':')[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;
  var uInt8Array = new Uint8Array(rawLength);
  for (var i = 0; i < rawLength; i++) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: contentType });
}

/**
 * 将图片地址转换为 base64 格式
 *
 * @param {*} url
 */
function convertUrlToBase64(url) {
  return new Promise(function (resolve, reject) {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = url;
    img.onload = function () {
      var canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);
      var ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase();
      var dataURL = canvas.toDataURL('image/' + ext);
      var base64 = {
        dataURL: dataURL,
        type: 'image/' + ext,
        ext: ext
      };
      resolve(base64);
    };
  });
}

// 判断浏览器类型 
function myBrowser() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  if (userAgent.indexOf("OPR") > -1) {
    return "Opera";
  }; //判断是否Opera浏览器 OPR/43.0.2442.991
  if (userAgent.indexOf("Firefox") > -1) {
    return "FF";
  } //判断是否Firefox浏览器  Firefox/51.0
  if (userAgent.indexOf("Trident") > -1) {
    return "IE";
  } //判断是否IE浏览器  Trident/7.0; rv:11.0
  if (userAgent.indexOf("Edge") > -1) {
    return "Edge";
  } //判断是否Edge浏览器  Edge/14.14393
  if (userAgent.indexOf("Chrome") > -1) {
    return "Chrome";
  } // Chrome/56.0.2924.87
  if (userAgent.indexOf("Safari") > -1) {
    return "Safari";
  } //判断是否Safari浏览器 AppleWebKit/534.57.2 Version/5.1.7 Safari/534.57.2
}

// 判断文件是否为图片类型
function isImage(ext) {
  if (ext == 'png' || ext == 'jpg' || ext == 'jpeg' || ext == 'gif' || ext == 'bmp') {
    return true;
  }
}
