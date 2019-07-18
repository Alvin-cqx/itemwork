var global = (function () {
    var config = {
        'mockUrl': 'http://192.168.1.17:9000/mockjsdata/19',
        'test': 'http://192.168.1.22:8668',
        'dev': 'http://test.qingning123.com/worksite', //对外测试
        'pro': 'http://116.7.231.114:9001/worksite'
    }
    //环境
    var ENV = 'pro'

    //请求头部设置
    var Platform = 'h5'
    var TOKEN = 'e9a7fbbe-10dc-4007-8b4f-8a0cde19dcf4'
    var App_Version = '2.2.0'
    //公用方法
    var unit = {}



    //请求 global.ajax{}
    var Ajax = function () {
        var token = unit.getCookie('token') || TOKEN
        this.ajax = function (opt, res_fn) {
            $.ajax({
                url: config[ENV] + opt.url,
                type: opt.type || 'get',
                data: opt.data || {},
                headers: {
                    'Token': token,
                    'Platform': Platform,
                    'App-Version': App_Version
                },
                contentType: 'application/json;charset=UTF-8',
                dataType: 'json',
                beforeSend: function (xmlHttp) {
                    xmlHttp.setRequestHeader("If-Modified-Since", "0");
                    xmlHttp.setRequestHeader("Cache-Control", "no-cache");
                },
                success: function (res) {
                    if (res.code == '000001') {
                        window.location.href = window.location.origin + '/admin/index/logout'
                        return
                    }
                    res_fn && res_fn(res)
                },
                fail: function () {

                }

            })
        }
    }


    Ajax.prototype = {
        // 获取图片
        getImg: function (cb) {
            this.ajax({
                url: '/common/picServer.do',
                // async: false,
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)
                }
            })
        },
        // 人脸识别
        //两台设备的人脸通行记录（有人脸照片）
        faceDo: function (engineeringId, cb) {
            this.ajax({
                url: '/tvscreen/statistics/inout/face.do',
                data: {
                    // engineeringId: '2c90c6d065043b1e016511f0a7130031'
                    engineeringId: engineeringId
                }
            }, function (res) {

                if (res.code === '0') {
                    cb && cb(res)

                }
            })
        },

        //在场人员类型统计
        staffDo: function (engineeringId, cb) {
            this.ajax({
                url: '/tvscreen/statistics/staff.do',
                data: {
                    // engineeringId: '2c90c6d065043b1e016511f0a7130031'
                    engineeringId: engineeringId
                }
            }, function (res) {

                if (res.code === '0') {
                    cb && cb(res)

                }
            })
        },
        //在场单位统计
        companyDo: function (engineeringId, cb) {
            this.ajax({
                url: '/tvscreen/statistics/company.do',
                data: {
                    // engineeringId: '2c90c6d065043b1e016511f0a7130031'
                    engineeringId: engineeringId
                }
            }, function (res) {

                if (res.code === '0') {
                    cb && cb(res)

                }
            })
        },
        //实时通行记录
        recordDo: function (engineeringId, cb) {
            this.ajax({
                url: '/tvscreen/statistics/inout/record.do',
                data: {
                    // engineeringId: '2c90c6d065043b1e016511f0a7130031'
                    engineeringId: engineeringId,
                    pageNo: 1,
                    pageSize: 6
                }
            }, function (res) {

                if (res.code === '0') {
                    cb && cb(res)

                }
            })
        },

        //现场违规统计
        illegalDo: function (engineeringId, cb) {
            this.ajax({
                url: '/tvscreen/statistics/illegal.do',
                data: {
                    // engineeringId: '2c90c6d065043b1e016511f0a7130031'
                    engineeringId: engineeringId
                    // pageNo:1,
                    // pageSize:27
                }
            }, function (res) {

                if (res.code === '0') {
                    cb && cb(res)

                }
            })
        },
    }


    //获取cookie
    unit.getCookie = function (Name) {
        var search = Name + "=" //查询检索的值
        var returnvalue = ""; //返回值


        if (document.cookie.length > 0) {
            sd = document.cookie.indexOf(search);
            if (sd != -1) {
                sd += search.length;
                end = document.cookie.indexOf(";", sd);
                if (end == -1)
                    end = document.cookie.length;
                //unescape() 函数可对通过 escape() 编码的字符串进行解码。
                returnvalue = unescape(document.cookie.substring(sd, end))
            }
        }

        return returnvalue;
    }

    //设置cookie
    unit.setCookie = function (key, val) {
        var date = new Date(); //获取当前时间
        var expiresDays = 30; //将date设置为n天以后的时间
        date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); //格式化为cookie识别的时间
        document.cookie = key + "=" + val + ";expires=" + date.toGMTString() + ";path=/"; //设置cookie
        return true
    }

    // 时间
    unit.renderCurrentTime=function(){
        var timer = null;
        var str= '星期'+'日一二三四五六'.charAt(new Date().getDay());
        $('#date').html(unit.formatDate(new Date(), 'yyyy-MM-dd  hh:mm:ss'))
        $('#day').html(str)
        timer = setInterval(this.renderCurrentTime,1000)
    }
    //格式化时间
    unit.formatDate = function (date, fmt) {
        var o = {
            "M+": date.getMonth() + 1, //月份  
            "d+": date.getDate(), //日  
            "h+": date.getHours(), //小时  
            "m+": date.getMinutes(), //分  
            "s+": date.getSeconds(), //秒  
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度  
            "S": date.getMilliseconds() //毫秒  
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    return {
        ajax: new Ajax,
        unit: unit,
    }
})()