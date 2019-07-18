var Video = (function () {
    var szIp = '116.7.231.115' //ip
    var nPort = '9000' //端口号
    var szUsername = 'admin' //账号
    var szPassword = 'admin123' //密码

    // var nStreamType = '2' //码流 1：主码流  2：辅码流
    var nMediaType = '1' // 1:视频  2：音频  3：视频+音频
    var nTransType = '1' // 0：UDP  1：TCP
    var bIVS = 1;
    var nStep = 2 //步长

    //云控制
    var nDirect = -1;
    var nOper = -1;
    // 语音对讲
    var nSampleType = '8000'; //采样频率
    var nBitType = '16'; //采样位数
    var nAudioType = '2'; //音频格式
    var nDevType = '1'; //对讲类型

    var PlayInterval = null
    var gWndId = null
    // var CUR_VIDICON_LIST = ['1000016$1$0$10', '1000016$1$0$2', '1000016$1$0$3', '1000016$1$0$4',
    //     '1000016$1$0$1', '1000016$1$0$5', '1000016$1$0$6', '1000016$1$0$7', '1000016$1$0$8'
    // ]

   
    function Video(node) {
        this.DHSDK_instance = node
        this.nStreamType = '1' //码流 1：主码流  2：辅码流
        this.CUR_VIDICON_LIST = ['1000016$1$0$10', '1000016$1$0$2', '1000016$1$0$3', '1000016$1$0$4',
        '1000016$1$0$1', '1000016$1$0$5', '1000016$1$0$6', '1000016$1$0$7', '1000016$1$0$8']
    }

    Video.prototype = {
       
        DPSDK_Login:function(type){
            //type 1 移动巡检  2：监控
            var DPSDK_OCX = this.DHSDK_instance
            var CUR_VIDICON_LIST=this.CUR_VIDICON_LIST
            console.log(CUR_VIDICON_LIST,'通道1')
            // 初始化窗口
            gWndId = DPSDK_OCX.DPSDK_CreateSmartWnd(0, 0, 100, 100);
            if(type == 1){
                DPSDK_OCX.DPSDK_SetWndCount(gWndId, 1);
            }else{
                DPSDK_OCX.DPSDK_SetWndCount(gWndId, cameraWindowCount(CUR_VIDICON_LIST));
            }
            
            DPSDK_OCX.DPSDK_SetSelWnd(gWndId, 0);
            // return true;
            if (DPSDK_OCX.DPSDK_Login(szIp, nPort, szUsername, szPassword) == '0') {
                //加载组织架构
                //DPSDK_OCX.DPSDK_LoadDGroupInfo()
                return true
            }else{
                return false
            }
        },
        Liveinit: function () {
            var _that = this
            if (IsIe()) {
                if(_that.DPSDK_Login()){
                    _that.livePlay()
                }
            }
        },
        livePlay: function () {
            var DPSDK_OCX = this.DHSDK_instance
            var gWndId = gWndId
            var nStreamType = this.nStreamType
            var CUR_VIDICON_LIST=this.CUR_VIDICON_LIST


            // 验证登录并初始化窗口
            if(DPSDK_OCX.DPSDK_Login(szIp, nPort, szUsername, szPassword)){
                DPSDK_OCX.DPSDK_SetWndCount(gWndId, cameraWindowCount(CUR_VIDICON_LIST));
                // DPSDK_OCX.DPSDK_SetSelWnd(gWndId, 0);
            }
         
            console.log(CUR_VIDICON_LIST,'通道2')
            if (CUR_VIDICON_LIST.length > 1) {
      
                var num = 0;
                var maxIndex = CUR_VIDICON_LIST.length
                
                PlayInterval = window.setInterval(function () {
                    if (num < maxIndex) {
                        var cameraId = CUR_VIDICON_LIST[num]
                        DPSDK_OCX.DPSDK_SetSelWnd(gWndId, num);
                        var nWndNo = DPSDK_OCX.DPSDK_GetSelWnd(gWndId)
                        DPSDK_OCX.DPSDK_AsyncStartRealplayByWndNo(gWndId, nWndNo, cameraId, nStreamType, nMediaType, nTransType)
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
                DPSDK_OCX.DPSDK_AsyncStartRealplayByWndNo(gWndId, nWndNo, cameraId, nStreamType, nMediaType, nTransType)
            } else {
                return false
            }
        },
        //切换码率
        changeStreamType: function (t) {
            if (this.nStreamType == t) return
            this.nStreamType = t
            this.livePlay()
        },
        //播放
        play: function () {
            var DPSDK_OCX = this.DHSDK_instance
            var CUR_VIDICON_LIST=this.CUR_VIDICON_LIST
            var nWndNo = DPSDK_OCX.DPSDK_GetSelWnd(gWndId);
            var cameraId = CUR_VIDICON_LIST[nWndNo]
            var nResult = DPSDK_OCX.DPSDK_StartRealplayByWndNo(gWndId, nWndNo, cameraId, this.nStreamType, nMediaType, nTransType)
        },
        //停止播放
        stop: function (cb) {
            console.log('stop')    
            var DPSDK_OCX = this.DHSDK_instance
            var nWndNo = DPSDK_OCX.DPSDK_GetSelWnd(gWndId);
            var result = DPSDK_OCX.DPSDK_StopRealplayByWndNo(gWndId, nWndNo)
            if(result == '0'){
                cb && cb()
            }
        },
        //移动巡检
        DPSDK_YDXJ_play: function (cameraId,cb) {
            if (IsIe()) {
                var DPSDK_OCX = this.DHSDK_instance
                var nWndNo = DPSDK_OCX.DPSDK_GetSelWnd(gWndId)
                var result = DPSDK_OCX.DPSDK_AsyncStartRealplayByWndNo(gWndId, nWndNo, cameraId, this.nStreamType, nMediaType, nTransType)
                console.log('result='+result)
                if(result == 0){
                    
                    cb && cb()
                }else{
                    alert('移动巡检连接失败')
                }
            }
        },
        //方向控制
        ButtonPtzDirection: function (nDirects) {
            var DPSDK_OCX = this.DHSDK_instance
            var CUR_VIDICON_LIST=this.CUR_VIDICON_LIST
            var nWndNo = DPSDK_OCX.DPSDK_GetSelWnd(gWndId); //获取窗口句柄
            var szCameraId =CUR_VIDICON_LIST[nWndNo];
            nDirect = nDirects;
            DPSDK_OCX.DPSDK_PtzDirection(szCameraId, nDirect, nStep, 0);
        },
        //停止方向控制
        ButtonPtzDirection_onclickStop: function (bStop) {
            var DPSDK_OCX = this.DHSDK_instance
            var CUR_VIDICON_LIST=this.CUR_VIDICON_LIST
            var nWndNo = DPSDK_OCX.DPSDK_GetSelWnd(gWndId); //获取窗口句柄
            if (CUR_VIDICON_LIST[nWndNo] != null) {
                var szCameraId = CUR_VIDICON_LIST[nWndNo];
                DPSDK_OCX.DPSDK_PtzDirection(szCameraId, nDirect, nStep, bStop);
            }
        },
        //镜头控制
        ButtonPtzCameraOperation_onclick: function (nOpers) {
            var obj = this.DHSDK_instance
            var CUR_VIDICON_LIST=this.CUR_VIDICON_LIST
            var nWndNo = obj.DPSDK_GetSelWnd(gWndId); //获取窗口句柄
            var szCameraId = CUR_VIDICON_LIST[nWndNo];
            nOper = nOpers;
            obj.DPSDK_PtzCameraOperation(szCameraId, nOper, nStep, 0);
            this.ButtonPtzCameraOperation_onclickStop();
        },
        //停止镜头控制
        ButtonPtzCameraOperation_onclickStop: function () {
            var obj = this.DHSDK_instance
            var CUR_VIDICON_LIST=this.CUR_VIDICON_LIST
            var nWndNo = obj.DPSDK_GetSelWnd(gWndId); //获取窗口句柄
            var szCameraId = CUR_VIDICON_LIST[nWndNo];
            obj.DPSDK_PtzCameraOperation(szCameraId, nOper, nStep, 1);
        },
        //打开语音对讲
        ButtonStartTalk_onclick: function (szCameraId,cb) {
            if (szCameraId) {
                var CameraId = szCameraId.split('$')[0]
                var obj = this.DHSDK_instance
                var nResult = obj.DPSDK_StartTalk(CameraId, nAudioType, nBitType, this.nSampleType, nDevType, nTransType)
                if (nResult == 0) {
                    cb && cb()
                    alert('语音已接通')
                }
            }
        },
        //停止语音对讲
        ButtonStopTalk_onclick: function (szCameraId,cb) {
            if (szCameraId) {
                var CameraId = szCameraId.split('$')[0]
                var obj = this.DHSDK_instance
                var result = obj.DPSDK_StopTalk(CameraId)
                if(result == 0){
                    cb && cb()
                }
            }
        },
        //抓图
        DPSDK_CapturePictureByWndNo: function () {
            var obj = this.DHSDK_instance
            var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
            var path = "C:\\dhphoto\\" + new Date().getTime() + ".jpg";
            var nResult = obj.DPSDK_CapturePictureByWndNo(gWndId, nWndNo, path);
            if (nResult == 0) {
                alert('图片抓取成功:' + path)
            }
        },
        //开始录像
        ButtonStartRealRecordByWndNo_onclick: function (cb) {
            var obj = this.DHSDK_instance
            var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
            var path = "C:\\dhvideo\\" + new Date().getTime() + ".avi";
            var nResult = obj.DPSDK_StartRealRecordByWndNo(gWndId, nWndNo, path);
            if (nResult == 0) {
                cb && cb()
                alert('开始录像;视频地址:'+path)
            }
        },
        //结束录像
        ButtonStopRealRecordByWndNo_onclick: function (cb) {
            var obj = this.DHSDK_instance
            var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
            var nResult = obj.DPSDK_StopRealRecordByWndNo(gWndId, nWndNo);
            if (nResult == 0) {
                cb && cb()
                alert('停止录像')
            }
        },
        // CUR_VIDICON_LIST:Video.CUR_VIDICON_LIST,
        setList:function(list){
            this.CUR_VIDICON_LIST=list
            console.log(this.CUR_VIDICON_LIST,'111111')
            // this.Liveinit()
        }
    }



    return Video
})();


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
//判断是否内外网
function fnIsOut() {
    var url = location.href.split('#')[0];
    var isOut = true;
    if (url.indexOf(szIp) < 0) {
        isOut = false;
    }
    return isOut;
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