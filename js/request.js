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


    //页面公用
    var page = (function () {
        var o = {
            init: function () {
                this.tabNav('.tab_nav');
                this.tabNav('.dhsqList');
                this.tabNav('.workManger');
                this.tabNav('.illegal')
                this.pic_view();
                this.tabNav1('.tab_nav1');
                this.tabNav1('.tab_nav2');
                this.tabNav1('.tab_nav3');
                this.tabNav1('.tab_nav4');
                this.tabNav1('.tab_nav5');
                this.renderCurrentTime()
            },
            tabNav: function (wrap, cb) {
                $(wrap).find('li').each(function () {
                    $(this).click(function () {
                        var content = $(this).attr('contentNode')
                        $('.' + content).css('display', 'block').siblings().css('display', 'none')
                        $(this).find('span').addClass('nav_active').parent().siblings().find('span').removeClass('nav_active')
                        cb && cb($(this))
                    })
                })
            },
            tabNav1: function (wrap, cb) {
                // $(wrap).find('li').each(function () {
                //     $(this).click(function () {      
                //         $(this).find('span').addClass('nav_active').parent().siblings().find('span').removeClass('nav_active')
                //         cb && cb($(this))
                //     })
                // })
                $(wrap).on('click', 'li', function () {
                    $(this).find('span').addClass('nav_active').parent().siblings().find('span').removeClass('nav_active');
                    cb && cb($(this))
                })
            },
            pic_view: function () {
                $('.pic_view').each(function () {
                    var $node = $(this)
                    $node.find('img').each(function (i) {
                        $(this).click(function () {
                            //console.log($node.prop('outerHTML'))
                            parent.window.pic_view($node.prop('outerHTML'), i);

                        })
                    })
                })
            },
            // 下拉框选择
            chooseSelect: function (wrap, cb) {
                $(wrap).find('ul li').each(function () {
                    $(this).click(function () {
                        $(wrap).find('.firstName').html($(this).html())
                        cb && cb($(this))
                    })
                })
            },
            logout: function () {
                window.location.href = window.location.origin + '/admin/index/logout'
            },
            renderCurrentTime: function () {
                var timer = null;
                var str = '星期' + '日一二三四五六'.charAt(new Date().getDay());
                $('#date').html(unit.formatDate(new Date(), 'yyyy-MM-dd  hh:mm:ss'))
                $('.workerList').html("值班表:(" + unit.formatDate(new Date(), 'yyyy-MM-dd') + ")")
                // parent.window.$('.workerList').html("值班表:("+unit.formatDate(new Date(), 'yyyy-MM-dd')+")")
                $('#day').html(str)
                $('#DAY').html(str)
                timer = setInterval(this.renderCurrentTime, 1000)
            },
            fullScreen: function () {
                $('#fullScreen').on('click', function () {
                    unit.fullScreen()
                })
            }
        }
        return o
    })();

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

        /********监控大屏 **************/




        //大屏地图对接后台接口数据
        getMapData: function (cb) {
            this.ajax({
                url: '/screen/index/get_map.do'
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)
                }
            })
        },
        //查询设备告警列表
        getDeviceAlarmList: function (cb) {
            this.ajax({
                url: '/screen/index/getDeviceAlarmList.do'
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)
                    console.log(res, '查询设备告警列表')
                }
            })
        },
        //获取实名制人员统计
        getStatistics: function (cb) {
            this.ajax({
                url: '/screen/index/get_statistics.do'
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)
                }
            })
        },
        //获取工程信息
        getEngineering: function (cb) {
            this.ajax({
                url: '/screen/index/get_engineering.do'
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)
                }
            })
        },
        /********工程概览 **************/
        //查询项目列表 /project/getProjectList.do
        getProjectList: function (cb) {
            this.ajax({
                url: '/project/getProjectList.do'
            }, function (res) {
                if (res.code === '0') {

                    cb && cb(res)

                }
            })
        },
        //查询项目下的所有工程
        getEngineeringList: function (cb) {
            var projectId = global.unit.getCookie('projectId')
            this.ajax({
                url: '/project/getEngineeringList.do',
                data: {
                    projectId: projectId
                }
            }, function (res) {
                if (res.code === '0') {
                    //console.log(res);

                    cb && cb(res)

                }
            })
        },

        //查询工地概览详情
        getProjectInfo: function (cb) {
            var projectId = global.unit.getCookie('projectId')
            console.log(projectId, '工地概览详情')
            this.ajax({
                url: '/project/getProjectInfo.do',
                data: {
                    projectId: projectId
                }
            }, function (res) {
                if (res.code === '0') {
                    //  console.log(res);
                    cb && cb(res)
                }
            })
        },
        // 查询图片个关联人员信息
        getImageRelateInfo: function (companyId, cb) {
            var projectId = global.unit.getCookie('projectId')
            // console.log(projectId);

            this.ajax({
                url: '/project/getImageRelateInfo.do',
                data: {
                    projectId: projectId,
                    companyId: companyId
                }
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)
                }
            })

        },
        //查询项目设备关联图片坐标列表  /screenImage/getDeviceImgList.do
        getDeviceImgList: function (cb) {
            var projectId = global.unit.getCookie('projectId')
            // console.log(projectId);

            this.ajax({
                url: '/screenImage/getDeviceImgList.do',
                data: {
                    projectId: projectId
                }
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)
                }
            })
        },

        // screenImage/getDeviceList.do
        getDeviceList: function (cb) {
            var projectId = global.unit.getCookie('projectId')
            //console.log(projectId);
            this.ajax({
                url: '/screenImage/getDeviceList.do',
                data: {
                    projectId: projectId
                }
            }, function (res) {
                // console.log(res);
                if (res.code === '0') {
                    cb && cb(res)
                }
            })
        },

        //删除设备关联图片坐标  /screenImage/removeDeviceImg.do
        removeDeviceImg: function (devImageId, cb) {
            this.ajax({
                url: '/screenImage/removeDeviceImg.do',

                data: {
                    devImageId: devImageId
                }
            }, function (res) {
                // console.log(res);
                if (res.code === '0') {
                    cb && cb(res)
                }
            })
        },

        //保存工地概览设备关联图片坐标
        saveDeviceImg: function (opts, cb) {
            var projectId = global.unit.getCookie('projectId')
            this.ajax({
                url: '/screenImage/saveDeviceImg.do',
                data: JSON.stringify({
                    projectId: projectId,
                    deviceId: opts.deviceId,
                    coordinateX: opts.coordinateY,
                    coordinateY: opts.coordinateX,
                    deviceType: opts.deviceType
                }),
                type: 'post'
            }, function (res) {
                //console.log(res);
                if (res.code === '0') {
                    cb && cb(res)
                }
            })
        },
        /********质量管理 **************/
        // 材料进场-专业
        searchItem: function (cb) {
            this.ajax({
                url: '/screen/quality/professions.do',
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)
                }
            })
        },
        // 查询某专业下材料进场数据
        getIntoData: function (RegionId, SourceId1, cb) {
            this.ajax({
                url: '/screen/quality/material_approach.do',
                data: {
                    EnterpriseId: 'OCT01',
                    RegionId: RegionId,
                    SourceId1: SourceId1
                }
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)

                }
            })
        },
        // 查询工序验收(楼栋)
        searchArea: function (RegionId, TypeValue, cb) {
            this.ajax({
                url: '/screen/quality/area_info.do',
                data: {
                    RegionId: RegionId,
                    TypeValue: TypeValue,
                }
            }, function (res) {
                // console.log(res)
                if (res.code === '0') {
                    cb && cb(res)
                }
            })
        },
        // 查询工序验收 分部分项信息
        itemName: function (RegionId, TypeValue, cb) {
            this.ajax({
                url: '/screen/quality/part_project_info.do',
                data: {
                    RegionId: RegionId,
                    TypeValue: TypeValue,
                }
            }, function (res) {
                // console.log(res)
                if (res.code === '0') {
                    cb && cb(res)
                }
            })
        },

        //  查询质量管理-质量巡检
        searchQuality: function (RegionId, cb) {
            this.ajax({
                url: '/screen/quality/quality_inspection.do',
                data: {
                    RegionId: RegionId,
                }
            }, function (res) {
                // console.log(res)
                if (res.code === '0') {
                    cb && cb(res)
                }
            })
        },

        //查询质量管理-工序验收
        itemCheck: function (EnterpriseId, RegionId, SourceId1, cb) {
            this.ajax({
                url: '/screen/quality/procedure_acceptance.do',
                data: {
                    EnterpriseId: EnterpriseId,
                    RegionId: RegionId,
                    SourceId1: SourceId1,
                }
            }, function (res) {
                // console.log(res)
                if (res.code === '0') {
                    cb && cb(res)
                }
            })
        },
        // 查询任务统计
        searchTask: function (cb) {
            var projectId = global.unit.getCookie('projectId')
            this.ajax({
                url: '/screen/quality/taskStatis.do',
                data: {
                    projectId: projectId,
                }
            }, function (res) {
                // console.log(res)
                if (res.code === '0') {
                    cb && cb(res)
                }
            })
        },

        /********安全管理 **************/
        //人员统计 /screen/safe/attendance/statistics_today.do
        statisticsToday: function (cb) {
            var projectId = global.unit.getCookie('projectId')
            this.ajax({
                url: '/screen/safe/attendance/statistics_today.do',
                data: {
                    projectId: projectId
                }
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)

                }
            })
        },


        //劳务统计列表
        statisticsList: function (cb) {
            var projectId = global.unit.getCookie('projectId')
            this.ajax({
                url: '/screen/safe/attendance/statistics_list.do',
                data: {
                    projectId: projectId
                }
            }, function (res) {
                if (res.code === '0') {

                    cb && cb(res)
                }
            })
        },
        ServiceDetails: function (cb) { //劳务人员详情
            var projectId = global.unit.getCookie('projectId')
            this.ajax({
                url: '/safeManage/labourServiceDetail.do',
                data: {
                    projectId: projectId
                }
            }, function (res) {
                // if (res.code === '0') {

                //     cb && cb(res)
                // }

                if (res.code === '0') {


                    cb && cb(res)
                }
            })
        },
        //安全管理-安全月检
        Safetyinspection: function (cd) {
            var projectId = global.unit.getCookie('projectId');


            this.ajax({
                url: '/screen/safety/safe_month_inspection.do',
                data: {
                    RegionId: projectId
                }
            }, function (res) {



                if (res.code === '0') {

                    cd && cd(res)

                }
            })
        },
        //安全管理-安全验收
        Safetyacceptance: function (cd) {
            //console.log("这是第几个");

            var projectId = global.unit.getCookie('projectId')
            this.ajax({
                url: '/screen/safety/safe_acceptance.do',
                data: {
                    RegionId: "OCT010100100004"
                }
            }, function (res) {
                if (res.code === '0') {
                    cd && cd(res)

                }
            })
        },
        // 安全管理-安全巡检
        patrol: function (cd) {
            var projectId = global.unit.getCookie('projectId')
            this.ajax({
                url: '/screen/safety/safe_inspection.do',
                data: {
                    RegionId: "OCT010100100004"
                }
            }, function (res) {
                if (res.code === '0') {
                    cd && cd(res)



                }
            })

        },
        //管理人员详情
        ManagementDetails: function (cd) {
            var projectId = global.unit.getCookie('projectId')
            this.ajax({
                url: '/safeManage/labourServiceManageStatics.do',
                data: {
                    projectId: projectId
                }
            }, function (res) {
                if (res.code === '0') {
                    // cb && cb(res)

                    // console.log("安全巡检");
                    //  var shuj=0

                    cd && cd(res)

                }
            })
        },
        // 管理人员出入记录
        RecordPerson: function (personnelId, cb) {
            var projectId = global.unit.getCookie('projectId')
            this.ajax({
                url: '/safeManage/labourServiceManageInOutLog.do',
                data: {
                    projectId: projectId,
                    personnelId: personnelId
                }
            }, function (res) {
                if (res.code == '0') {
                    cb && cb(res)

                }
            })
        },
        //演练培训
        Exerciseraining: function (cb) {
            var projectId = global.unit.getCookie('projectId')
            this.ajax({
                url: '/safeManage/getPersonnelTrainingRecord.do',
                data: {
                    projectId: projectId
                }
            }, function (res) {
                if (res.code === '0') {
                    //    console.log("演练培训");
                    cb && cb(res)


                }
            })
        },
        //劳务单位人员统计
        LaborStatistics: function (cd) {
            var projectId = global.unit.getCookie('projectId')
            this.ajax({
                url: '/safeManage/labourServiceCpyStatics.do',
                data: {
                    projectId: projectId
                }
            }, function (res) {
                if (res.code === '0') { //劳务公司人员统计
                    cd && cd(res)

                }
            })
        },
        // 查询最近七天的劳务统计
        getLabourInputInfo: function (cb) {
            var projectId = global.unit.getCookie('projectId');
            this.ajax({
                url: '/safeManage/getLabourInputInfo.do',
                data: {
                    projectId: projectId
                }
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)

                }
            })
        },
        //工地现场管理
        getMoblieStatisticsInfo: function (cb) {
            var projectId = global.unit.getCookie('projectId')
            this.ajax({
                url: '/safeManage/getMoblieStatisticsInfo.do',
                data: {
                    projectId: projectId
                }
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)

                    // $("#workersCount").html('' + parseInt(res.data.labourServiceCount) + '')

                    // $("#managerCount").html('' + parseInt(res.data.manageCount) + '')

                    $("#tempCount").html('' + parseInt(res.data.temporaryCount) + '')

                    // $("#companyCount").html('' + parseInt(res.data.labourServiceUnitCount) + '')

                    // $("#teamCount").html('' + parseInt(res.data.labourServiceTeamCount) + '')

                    // $("#carCount").html('' + parseInt(res.data.inCarCount) + '')
                }
            })
        },

        //查询劳务人员总数
        getLabourNumInfo: function (cb) {
            var projectId = global.unit.getCookie('projectId')
            this.ajax({
                url: '/safeManage/getLabourNumInfo.do',
                data: {
                    projectId: projectId
                }
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)
                    $("#workersCount").html(res.data.labourServiceCount)


                }
            })

        },
        // 查询管理人员总数
        getManageNumInfo: function (cb) {
            var projectId = global.unit.getCookie('projectId')
            this.ajax({
                url: '/safeManage/getManageNumInfo.do',
                data: {
                    projectId: projectId
                }
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)
                    $("#managerCount").html(res.data.manageCount)


                }
            })

        },
        // 查询车辆总数
        getCarNumInfo: function (cb) {
            var projectId = global.unit.getCookie('projectId')
            this.ajax({
                url: '/safeManage/getCarNumInfo.do',
                data: {
                    projectId: projectId
                }
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)
                    $("#carCount").html('' + parseInt(res.data.inCarCount) + '')
                }
            })

        },

        // 查询劳务单位总数
        getLabourCpyNumInfo: function (cb) {
            var projectId = global.unit.getCookie('projectId')
            this.ajax({
                url: '/safeManage/getLabourCpyNumInfo.do',
                data: {
                    projectId: projectId
                }
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)
                    $("#companyCount").html('' + parseInt(res.data.labourServiceUnitCount) + '')
                }
            })
        },

        // 查询劳务班组总数
        getLabourTeamNumInfo: function (cb) {
            var projectId = global.unit.getCookie('projectId')
            this.ajax({
                url: '/safeManage/getLabourTeamNumInfo.do',
                data: {
                    projectId: projectId
                }
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)
                    $("#teamCount").html('' + parseInt(res.data.labourServiceTeamCount) + '')
                }
            })

        },
        //获取环境设备列表 /environmentMonitor/getNowAmbientData.do
        getNowAmbientData: function (cb) {
            var projectId = global.unit.getCookie('projectId')
            this.ajax({
                url: '/environmentMonitor/getNowAmbientData.do',
                data: {
                    projectId: projectId
                }
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)
                }
            })
        },

        //查询某项目工程下环境监测数据
        getTimePeriodData: function (ambientId, cb) {
            this.ajax({
                url: '/environmentMonitor/getAmbientDataByAmbientId.do',
                data: {
                    ambientId: ambientId
                }
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)
                }
            })
        },
        //查询劳务班组
        dygryhdgs: function (cb) {
            var projectId = global.unit.getCookie('projectId')
            this.ajax({
                url: '/safeManage/labourServiceTeamStatics.do',
                data: {
                    projectId: projectId
                }
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)


                }
            })
        },
        //动火申请列表
        dhuosqlb: function (cb) {
            var projectId = global.unit.getCookie('projectId')
            this.ajax({
                url: '/safeManage/getUseFireApplyList.do',
                data: {
                    projectId: projectId
                }
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)

                }
            })

        },
        //动火申请详情
        dhsqxq: function (usefireid, cb) {
            this.ajax({
                url: '/safeManage/getUseFireApplyDetail.do',
                data: {
                    useFireId: usefireid
                }
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)
                }
            })
        },
        //移动监控列表
        moveCheckList: function (cb) {
            var projectId = global.unit.getCookie('projectId')
            this.ajax({
                url: '/screen/camera/mobileInspect/cameraList.do',
                data: {
                    engineeringId: projectId
                }
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)
                }
            })

        },
        // 查看车辆进出
        getCarEnterList: function (engineeringId, pageNo, cb) {
            this.ajax({
                url: '/deviceCar/getCarInOutLog.do',
                data: {
                    engineeringId: engineeringId,
                    pageSize: 14,
                    pageNo: pageNo
                }
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)
                }
            })
        },
        // 查询劳务投入
        getPlanPersonInput: function (cb) {
            this.ajax({
                url: '/personnelInput/getPlanPersonInput.do',
            })
        },
        // 查询劳务投入
        getPlanPersonInput: function (cb) {
            var projectId = global.unit.getCookie('projectId')
            this.ajax({
                url: '/personnelInput/getPlanPersonInput.do',
                data: {
                    projectId: projectId
                }
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)
                }
            })
        },
        // 查询劳务投入详情
        getPlanPersonInputDetail: function (workTypeId, cb) {
            var projectId = global.unit.getCookie('projectId')
            this.ajax({
                url: '/personnelInput/getPlanPersonInputDetail.do',
                data: {
                    projectId: projectId,
                    workTypeId: workTypeId
                }
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)
                }
            })
        },

        // 查询工人违规
        getViolationPCRecord: function (cb) {
            var projectId = global.unit.getCookie('projectId');
            this.ajax({
                url: '/wokerViolation/getViolationPCRecord.do',
                data: {
                    projectId: projectId,
                    pageNum: 1,
                    pageSize: 6
                }
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)
                }
            })

        },
        // 查看更多工人违规
        getViolationLog: function (engineeringId, pageNum,cb) {
            this.ajax({
                url: '/wokerViolation/getViolationLog.do',
                data: {
                    engineeringId: engineeringId,
                    pageNum: pageNum,
                    pageSize: 8
                }
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)
                }
            })
        },
        // 移动巡检列表
        getMobilePatrolList: function (cb) {
            var projectId = global.unit.getCookie('projectId')
            this.ajax({
                url: '/safeManage/getMobilePatrolList.do',
                data: {
                    projectId: projectId,
                }
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)
                }
            })

        },
        //管理人员考勤（人员总数统计）
        getmanagerAmount: function (cb) {
            var projectId = global.unit.getCookie('projectId')
            this.ajax({
                url: '/safeManage/managerAttendanceAmount.do',
                data: {
                    projectId: projectId,
                }
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)
                }
            })

        },
        // 管理人员考勤（人员详情统计）
        getmanageAttendanceDetail: function (companyTypeId, cb) {
            var projectId = global.unit.getCookie('projectId')
            this.ajax({
                url: '/safeManage/manageAttendanceDetail.do',
                data: {
                    companyTypeId: companyTypeId,
                    projectId: projectId,
                }
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)
                }
            })
        },
        // 值班表数据
        getmanageAttendanceOndutyAmount: function (cb) {
            var projectId = global.unit.getCookie('projectId')
            this.ajax({
                url: '/safeManage/manageAttendanceOndutyAmount.do?',
                data: {
                    projectId: projectId,
                }
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)
                }
            })

        },

        // 值班表详情
        getmanageAttendanceOndutyDetail: function (cb) {
            var projectId = global.unit.getCookie('projectId')
            this.ajax({
                url: '/safeManage/manageAttendanceOndutyDetail.do',
                data: {
                    projectId: projectId,
                }
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)
                }
            })

        },
        /********视频管理 **************/
        // 查询项目下的所有工程
        getEngineeringList: function (cb) {
            var projectId = global.unit.getCookie('projectId');
            this.ajax({
                url: '/project/getEngineeringList.do',
                data: {
                    projectId: projectId,
                }
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)
                }
            })
        },

        //获取工程视频分组
        getGroupList: function (engineeringId, cb) {
            this.ajax({
                url: '/screen/camera/group/list.do',
                data: {
                    engineeringId: engineeringId,
                }
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)
                }
            })
        },

        // 获取工程视频分组下视频列表
        getMovieList: function (engineeringId, cameraGroupId, cb) {
            this.ajax({
                url: '/screen/camera/group/list_camera.do',
                data: {
                    engineeringId: engineeringId,
                    cameraGroupId: cameraGroupId,

                }
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)
                }
            })
        },

        // 获取移动巡检视频列表
        getGroupMove: function (cb, engineeringId) {
            // var projectId = global.unit.getCookie('projectId');
            this.ajax({
                url: '/screen/camera/mobileInspect/cameraList.do',
                data: {
                    engineeringId: engineeringId
                }
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)
                }
            })
        },
        /********工程档案 **************/

        //获取工程
        huoq: function (cd) {

            var projectId = global.unit.getCookie('projectId')

            this.ajax({
                url: '/project/getEngineeringList.do',
                data: {
                    projectId: projectId,
                }
            }, function (res) {
                if (res.code === '0') {
                    //  console.log(res);


                    cd && cd(res)

                }
            })



        },

        //工程档案列表
        dsgsrgt: function (cb, idmon) {


            // var projectId = global.unit.getCookie('projectId')
            // console.log(idmon,'项目工程id')
            this.ajax({
                url: '/recFolder/getRecFolderList.do',
                data: {
                    engineeringId: idmon
                }
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)

                }
            })

        },

        //查询文件档案详情列表
        dsgetgfd: function (cd, gcdan) {


            var projectId = global.unit.getCookie('projectId')
            //console.log(gcdan)
            //console.log(gcdan,'详情id');

            this.ajax({
                url: '/recFolder/getRecFileList.do',
                data: {
                    recFolderId: gcdan
                }
            }, function (res) {
                if (res.code === '0') {
                    cd && cd(res)


                }
            })
        },
        //查询文件
        chaxwj: function (cd, idmon, srnr) {
            var projectId = global.unit.getCookie('projectId')
            // console.log(idmon)
            console.log(srnr);

            this.ajax({
                url: '/recFolder/searchRecFileByKey.do',
                data: {
                    recFolderId: idmon,
                    keyWord: srnr
                }
            }, function (res) {
                if (res.code === '0') {
                    cd && cd(res)
                    //  console.log("人人");

                    //  console.log(res);





                }
            })
        },
        /********统计报表 **************/
        // 劳务人员、劳务管理人员在岗时长统计报表
        workerTotalTime: function (cb, dw, yf, pageNum, etgid, xm, zw) { //考勤机
            var projectId = global.unit.getCookie('projectId')
            // console.log(etgid)
            if (etgid == undefined) {
                etgid = "" //类型选择
            }
            if (dw == undefined) {
                dw = "" //单位
            }
            if (yf == undefined) {
                yf = "" //月份
            }
            if (xm == undefined) {
                xm = "" //姓名
            }
            if (zw == undefined) {
                zw = "" //姓名
            }
            //  console.log(etgid,dw,yf);
            this.ajax({
                url: '/statisticsSheet/getManagerAttence.do',
                data: {
                    projectId: projectId,
                    yearMonth: yf,
                    // companyName : dw ,
                    companyTypeId: etgid,
                    pageNum: pageNum,
                    pageCount: 10,
                    personnelName: xm,
                    manageTypeName: zw
                }
            }, function (res) {
                if (res.code === '0') {
                    //console.log(res);
                    // if(res.data.personAttenceList.length==0){
                    //     // alert("本次考勤机查询无数据")
                    //     return
                    // }

                    cb && cb(res)

                }
            })
        },
        //查询门禁
        entrancguard: function (cb, dw, xm, yf, pageNum, zw) {
            var projectId = global.unit.getCookie('projectId')
            //console.log(projectId)
            //console.log(dw,xm,yf);
            if (dw == undefined) {
                dw = "" //单位
            }
            if (xm == undefined) {
                xm = "" //姓名
            }
            if (yf == undefined) {
                yf = "" //月份
            }
            if (zw == undefined) {
                zw = "" //月份
            }
            this.ajax({
                url: '/statisticsSheet/managerInJobStatistics.do',
                data: {
                    projectId: projectId,
                    companyName: dw,
                    personnelName: xm,
                    yearMonth: yf,
                    pageNum: pageNum,
                    manageTypeName: zw
                }
            }, function (res) {
                if (res.code === '0') {
                    // console.log(res);
                    // if(res.data.personelInJobList.length==0){
                    //     // alert("本次门禁查询无数据")
                    //     return
                    // }

                    cb && cb(res)

                }
            })
        },

        Theorkingtime: function (cb, dw, xm, yf, pageNum, etgid) { //劳务时长在岗安排


            var projectId = global.unit.getCookie('projectId')

            if (etgid == undefined) {
                etgid = "" //单位ID
            }
            if (dw == undefined) {
                dw = "" //单位名称
            }
            if (xm == undefined) {
                xm = "" //姓名
            }
            if (yf == undefined) {
                yf = "" //月份
            }
            // console.log(etgid, dw,xm, yf)
            this.ajax({
                url: '/statisticsSheet/labourInJobStatistics.do',
                data: {
                    projectId: projectId,
                    companyName: dw,
                    companyTypeId: etgid,
                    personnelName: xm,
                    yearMonth: yf,
                    pageNum: pageNum,

                }
            }, function (res) {
                if (res.code === '0') {
                    console.log(res);
                    // if(res.data.personelInJobList.length==0){
                    //     // alert("本次劳务时长查询无数据")
                    //     return
                    // }
                    cb && cb(res)

                }
            })
        },
        housinguthority: function (cb, dw, xm, yf, pageNum, etgid, gz, bz) { //人员月考勤统计报表（住建局）
            //  console.log(etgid, dw,xm, yf)
            var projectId = global.unit.getCookie('projectId')
            //console.log(projectId)
            if (etgid == undefined) {
                etgid = "" //单位ID
            }
            if (dw == undefined) {
                dw = "" //单位名称
            }
            if (xm == undefined) {
                xm = "" //姓名
            }
            if (yf == undefined) {
                yf = "" //月份
            }
            this.ajax({
                url: '/statisticsSheet/personInJobStatistics.do',
                data: {
                    projectId: projectId,
                    companyName: dw,
                    personnelName: xm,
                    yearMonth: yf,
                    pageNum: pageNum,
                    workTypeName: gz,
                    teamName: bz
                }
            }, function (res) {
                if (res.code === '0') {
                    //  console.log(res);

                    // if(res.data.personelInJobList.length==0){
                    //     // alert("本次住建局查询无数据")
                    //     return
                    // }
                    cb && cb(res)

                }
            })
        },


        Hotapplicationform: function (cb, yf, pageNum) { //动火申请报表
            var projectId = global.unit.getCookie('projectId')
            if (yf == undefined) {
                yf = "" //月份
            }
            // console.log(yf)
            this.ajax({
                url: '/statisticsSheet/fireApplyStatistics.do',
                data: {

                    projectId: projectId,
                    yearMonth: yf,
                    pageNum: pageNum,
                    pageCount: 10
                }
            }, function (res) {
                if (res.code === '0') {
                    //console.log(res);

                    // if(res.data.fireApplyStatistics.fireApplyList.length==0){
                    //     // alert("本次动火申请报表查询无数据")
                    //     return
                    // }
                    cb && cb(res)

                }
            })
        },



        Theequipmentlist: function (cb) { //获取设备列表
            var projectId = global.unit.getCookie('projectId')
            //console.log(projectId)
            this.ajax({
                url: '/environmentMonitor/getInspectDeviceInfo.do',
                data: {
                    projectId: projectId
                }
            }, function (res) {
                if (res.code === '0') {
                    cb && cb(res)

                }
            })
        },
        asdgfsgsd: function (yfen, etg, cb) { //环境监测
            var projectId = global.unit.getCookie('projectId')
            //console.log(projectId)
            // console.log(yfen);
            this.ajax({
                url: '/environmentMonitor/getMonthInspectData.do',
                data: {
                    deviceCode: etg,
                    yearMonth: yfen
                }
            }, function (res) {
                if (res.code === '0') {


                    // if(res.data.daysStatistics.length==0){
                    //     // alert("本次设备查询无数据  ")
                    //     return
                    // }

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
    // 获取增加摄像头权限
    unit.getMovieCookie = function (cookieName) {
            var value = '%7B%220%22%3A%22227%22%2C%221%22%3A%22257%22%2C%222%22%3A%22258%22%2C%223%22%3A%22259%22%2C%224%22%3A%22260%22%2C%225%22%3A%22261%22%2C%226%22%3A%22262%22%2C%227%22%3A%22263%22%2C%228%22%3A%22264%22%2C%229%22%3A%22265%22%2C%2210%22%3A%22266%22%2C%2211%22%3A%22267%22%2C%2212%22%3A%22268%22%2C%2213%22%3A%22269%22%2C%2214%22%3A%22270%22%2C%2215%22%3A%22271%22%2C%2216%22%3A%22272%22%2C%2217%22%3A%22273%22%2C%2218%22%3A%22274%22%2C%2219%22%3A%22275%22%2C%2220%22%3A%22276%22%2C%2221%22%3A%22277%22%2C%2222%22%3A%22278%22%2C%2223%22%3A%22279%22%2C%2224%22%3A%22280%22%2C%2225%22%3A%22281%22%2C%2226%22%3A%22282%22%2C%2227%22%3A%22283%22%2C%2228%22%3A%22284%22%2C%2229%22%3A%22285%22%2C%2230%22%3A%22286%22%2C%2231%22%3A%22287%22%2C%2232%22%3A%22288%22%2C%2233%22%3A%22289%22%2C%2234%22%3A%22290%22%2C%2235%22%3A%22291%22%2C%2236%22%3A%22292%22%2C%2237%22%3A%22293%22%2C%2238%22%3A%22294%22%2C%2239%22%3A%22295%22%2C%2240%22%3A%22296%22%2C%2241%22%3A%22297%22%2C%2242%22%3A%22298%22%2C%2243%22%3A%22299%22%2C%2244%22%3A%22300%22%2C%2245%22%3A%22301%22%2C%2246%22%3A%22302%22%2C%2247%22%3A%22303%22%2C%2248%22%3A%22304%22%2C%2249%22%3A%22305%22%2C%2250%22%3A%22306%22%2C%2251%22%3A%22307%22%2C%2252%22%3A%22308%22%2C%2253%22%3A%22309%22%7D'
            document.cookie = "admin_rules=" + value
            var strCookie = document.cookie;
            var arrCookie = strCookie.split("; ");
            for (var i = 0; i < arrCookie.length; i++) {
                var arr = arrCookie[i].split("=");
                if (cookieName == arr[0]) {
                    return arr[1];
                }
            }
            return "";
        },
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



    //判断是否是ie浏览器内核

    unit.IsIe = function () {
        var state = false
        try {
            var obj = new ActiveXObject("DPSDK_OCX.DPSDK_OCXCtrl.1");
            state = true
        } catch (e) {
            // if (window.confirm('大华控件未安装或浏览器不支持，请先安装控件，用IE打开！\n现在是否下载安装？')) {
            //     window.open('http://' + window.location.host + '/dh.exe');
            // }
        }
        return state

    }
    unit.fullScreen = function () {
        var element = document.documentElement; //若要全屏页面中div，var element= document.getElementById("divID");
        //var element= document.getElementById("fullScreen_panorama");
        //IE 10及以下ActiveXObject
        if (window.ActiveXObject) {
            var WsShell = new ActiveXObject('WScript.Shell');
            WsShell.SendKeys('{F11}');
            //写全屏后的执行函数
        }
        //HTML W3C 提议
        else if (element.requestFullScreen) {
            element.requestFullScreen();
            //写全屏后的执行函数
        }
        //IE11
        else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
            //写全屏后的执行函数
        }
        // Webkit (works in Safari5.1 and Chrome 15)
        else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
            //写全屏后的执行函数
        }
        // Firefox (works in nightly)
        else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
            //写全屏后的执行函数
        }
    }
    page.init()
    return {
        ajax: new Ajax,
        unit: unit,
        page: page
    }
})()