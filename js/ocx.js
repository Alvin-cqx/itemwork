//平台配置
var DHConfig = {
    szIp: '116.7.231.115', //ip
    nPort: '9000', //端口号
    szUsername: 'admin', //账号
    szPassword: 'admin123'
}
//视频配置
var videoConfig = {
    nMediaType: '1',// 1:视频  2：音频  3：视频+音频
    nTransType: '1', // 0：UDP  1：TCP
    bIVS: 1,
    nStep: 2, //步长
    //云控制
    nDirect: -1,
    nOper: -1,
    nStreamType: '2', //码流 1：主码流  2：辅码流
    // 语音对讲
    nSampleType: '8000', //采样频率
    nBitType: '16', //采样位数
    nAudioType: '2', //音频格式
    nDevType: '1' //对讲类型
}
var gWndId;
var loginState = false  //false：未登录  true：登录
// var DPSDK_OCX = document.getElementById('DPSDK_OCX');


// function DPSDK_login() {
//     if (!IsIe()) return
//     if (DPSDK_OCX.DPSDK_Login(DHConfig.szIp, DHConfig.nPort, DHConfig.szUsername, DHConfig.szPassword) == '0') {
//         loginState = true
//     }
// }
//1.登陆 2.初始化 3.调用方法
//1.
var DPSDK_OCX;
function DPSDK_login(node) {
    if (!IsIe()) return
    DPSDK_OCX=node
    if (DPSDK_OCX.DPSDK_Login(DHConfig.szIp, DHConfig.nPort, DHConfig.szUsername, DHConfig.szPassword) == '0') {
        loginState = true
    }
}

// 移动巡检初始化
function YDXJinit(){
    gWndId = DPSDK_OCX.DPSDK_CreateSmartWnd(0, 0, 100, 100);
    DPSDK_OCX.DPSDK_SetWndCount(gWndId, 1)
    DPSDK_OCX.DPSDK_SetSelWnd(gWndId, 0);
}
// 移动巡检播放
function YDXJplay(cameraId,cb) {
    var nWndNo = DPSDK_OCX.DPSDK_GetSelWnd(gWndId);
    console.log(cameraId,'cameraId')
    var nResult = DPSDK_OCX.DPSDK_StartRealplayByWndNo(gWndId, nWndNo, cameraId, videoConfig.nStreamType, videoConfig.nMediaType, videoConfig.nTransType)
    if (nResult == '0') {
        cb && cb()
    }
}

// 调用方法
//type 1 移动巡检
function livePlay(len, CUR_VIDICON_LIST) {
   
    if (!IsIe()) return
    if (!loginState) {
        DPSDK_login()
        return
    }
    gWndId = DPSDK_OCX.DPSDK_CreateSmartWnd(0, 0, 100, 100);
    len == 1 ? DPSDK_OCX.DPSDK_SetWndCount(gWndId, 1) : DPSDK_OCX.DPSDK_SetWndCount(gWndId, cameraWindowCount(CUR_VIDICON_LIST))
    DPSDK_OCX.DPSDK_SetSelWnd(gWndId, 0);
    if (CUR_VIDICON_LIST.length > 1) {
        var num = 0;
        var maxIndex = CUR_VIDICON_LIST.length

        PlayInterval = window.setInterval(function () {
            if (num < maxIndex) {
                var cameraId = CUR_VIDICON_LIST[num]
                DPSDK_OCX.DPSDK_SetSelWnd(gWndId, num);
                var nWndNo = DPSDK_OCX.DPSDK_GetSelWnd(gWndId)
                DPSDK_OCX.DPSDK_AsyncStartRealplayByWndNo(gWndId, nWndNo, cameraId, videoConfig.nStreamType, videoConfig.nMediaType, videoConfig.nTransType)
            } else {
                window.clearInterval(PlayInterval);
                PlayInterval = null;
            }
            num++;
        }, 100)
    } else if (CUR_VIDICON_LIST.length == 1) {
        var cameraId = CUR_VIDICON_LIST[0]
        DPSDK_OCX.DPSDK_SetSelWnd(gWndId, 0);
        var nWndNo = DPSDK_OCX.DPSDK_GetSelWnd(gWndId)
        DPSDK_OCX.DPSDK_AsyncStartRealplayByWndNo(gWndId, nWndNo, cameraId, videoConfig.nStreamType, videoConfig.nMediaType, videoConfig.nTransType)
    } else {
        return false
    }
}

// 停止播放功能
function stopPlay(cb) {
    var nWndNo = DPSDK_OCX.DPSDK_GetSelWnd(gWndId);
    var result = DPSDK_OCX.DPSDK_StopRealplayByWndNo(gWndId, nWndNo)
    if (result == '0') {
        cb && cb()
    }
}

// 开始播放
function play(CUR_VIDICON_LIST) {
    var nWndNo = DPSDK_OCX.DPSDK_GetSelWnd(gWndId);
    var cameraId = CUR_VIDICON_LIST[nWndNo]
    console.log(cameraId,'cameraId')
    var nResult = DPSDK_OCX.DPSDK_StartRealplayByWndNo(gWndId, nWndNo, cameraId, videoConfig.nStreamType, videoConfig.nMediaType, videoConfig.nTransType)
}
// 抓图
function CapturePicture() {

    var nWndNo = DPSDK_OCX.DPSDK_GetSelWnd(gWndId);
    var path = "C:\\dhphoto\\" + new Date().getTime() + ".jpg";
    console.log(path, '地址')
    var nResult = DPSDK_OCX.DPSDK_CapturePictureByWndNo(gWndId, nWndNo, path);
    console.log('抓图', nResult)
    if (nResult == 0) {
        alert('图片抓取成功:' + path)

    }
}

// 开启录像
function ButtonStartRealRecordByWndNo_onclick(cb) {

    var nWndNo = DPSDK_OCX.DPSDK_GetSelWnd(gWndId);
    var path = "C:\\dhvideo\\" + new Date().getTime() + ".avi";
    var nResult = DPSDK_OCX.DPSDK_StartRealRecordByWndNo(gWndId, nWndNo, path);
    if (nResult == 0) {
        cb && cb()
        alert('开始录像;视频地址:' + path)
    }
}

// 关闭录像
function ButtonStopRealRecordByWndNo_onclick(cb) {

    var nWndNo = DPSDK_OCX.DPSDK_GetSelWnd(gWndId);
    var nResult = DPSDK_OCX.DPSDK_StopRealRecordByWndNo(gWndId, nWndNo);
    if (nResult == 0) {
        cb && cb()
        // alert('停止录像')
    }
}
//控制方向
function ButtonPtzDirection(nDirects) {
 
    var nWndNo = DPSDK_OCX.DPSDK_GetSelWnd(gWndId); //获取窗口句柄
    var szCameraId = CUR_VIDICON_LIST[nWndNo];
    videoConfig.nDirect = nDirects;
    DPSDK_OCX.DPSDK_PtzDirection(szCameraId, videoConfig.nDirect, videoConfig.nStep, 0);
}
// 停止控制方向
function PtzDirectionStop(bStop){
    var nWndNo = DPSDK_OCX.DPSDK_GetSelWnd(gWndId); //获取窗口句柄
    if (CUR_VIDICON_LIST[nWndNo] != null) {
        var szCameraId = CUR_VIDICON_LIST[nWndNo];
        DPSDK_OCX.DPSDK_PtzDirection(szCameraId, videoConfig.nDirect, videoConfig.nStep, bStop);
    }
    
}
// 变焦 变倍
function PtzFocusDown(nOpers){
    var nWndNo = DPSDK_OCX.DPSDK_GetSelWnd(gWndId); //获取窗口句柄
    var szCameraId = CUR_VIDICON_LIST[nWndNo];
    videoConfig.nOper = nOpers;
    DPSDK_OCX.DPSDK_PtzCameraOperation(szCameraId, videoConfig.nOper, videoConfig.nStep, 0);
    ButtonPtzCameraOperation_onclickStop();

}
//停止镜头控制
function ButtonPtzCameraOperation_onclickStop(){
  
    var nWndNo = DPSDK_OCX.DPSDK_GetSelWnd(gWndId); //获取窗口句柄
    var szCameraId = CUR_VIDICON_LIST[nWndNo];
    DPSDK_OCX.DPSDK_PtzCameraOperation(szCameraId, videoConfig.nOper, videoConfig.nStep, 1);

}
// 打开语音对讲
function ButtonStartTalk_onclick (szCameraId,cb){
    if (szCameraId) {
        var CameraId = szCameraId.split('$')[0]
        var nResult = DPSDK_OCX.DPSDK_StartTalk(CameraId, videoConfig.nAudioType, videoConfig.nBitType, videoConfig.nSampleType, videoConfig.nDevType, videoConfig.nTransType)
        if (nResult == 0) {
            cb && cb()
            // alert('语音已接通')
        }
    }
}
// 关闭语音
function ButtonStopTalk_onclick (szCameraId,cb) {
    if (szCameraId) {
        var CameraId = szCameraId.split('$')[0]
        var result = DPSDK_OCX.DPSDK_StopTalk(CameraId)
        if(result == 0){
            cb && cb()
        }
    }
}
//判断ie浏览器
function IsIe() {
    var state = false
    try {
        var obj = new ActiveXObject("DPSDK_OCX.DPSDK_OCXCtrl.1");
        state = true
    } catch (e) {
        if (window.confirm('大华控件未安装或浏览器不支持，请先安装控件，用IE打开！\n现在是否下载安装？')) {
            window.open('http://' + window.location.host + '/dh.exe');
        }
    }
    return state
}
function cameraWindowCount(CUR_VIDICON_LIST) {
    var l = CUR_VIDICON_LIST.length;

    if (l > 1 && l <= 4) {
        return 4
    } else if (l > 4 && l <= 9) {
        return 9
    } else if (l > 9 && l <= 16) {
        return 16
    } else {
        return l
    }
}


