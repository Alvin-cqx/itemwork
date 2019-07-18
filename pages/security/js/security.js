var mySwiper = new Swiper('.swiper-container', {
    autoplay: false, //可选选项，自动滑动
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});


// var mySwiper = new Swiper('.swiper-container1', {
//     autoplay: false, //可选选项，自动滑动
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },
// });
var Security = (function () {
    var Sec = function () {
        this.init = function () {
            // this.getMoblieStatisticsInfo()
            // this.statisticsList()

            this.renderYDJKList()
            this.renderYSJGList()
        }
    }
    //人员统计
    Sec.prototype.statisticsList = function () {
        global.ajax.getLabourInputInfo(function (res) {
            // console.log(res,'111111')
            var myChart = echarts.init(document.getElementById('item_lwtj_chart'))
            var statisticsList = res.data.personStatistics.reverse();
            // var todayInfo = res.data
            // $('#carCount').html(todayInfo.inCarCount)
            // $('#companyCount').html(todayInfo.labourServiceUnitCount)
            // $('#workersCount').html(todayInfo.labourServiceCount)
            // $('#managerCount').html(todayInfo.manageCount)
            // $('#teamCount').html(todayInfo.labourServiceTeamCount)
            // $('#tempCount').html(todayInfo.temporaryCount)

            // 工种
            // statisticsList.forEach(function (k) {
            //     k.infoList.forEach(function (s) {
            //         s.workTypeCounts = [{
            //             name: '总人数',
            //             count: (Math.random() * 20).toFixed(0)
            //         },
            //         {
            //             name: '电工',
            //             count: (Math.random() * 20).toFixed(0)
            //         },
            //         {
            //             name: '水泥工',
            //             count: (Math.random() * 20).toFixed(0)
            //         },
            //         {
            //             name: '电焊工',
            //             count: (Math.random() * 20).toFixed(0)
            //         },
            //         ]
            //     })
            // })
            //console.log(statisticsList, '人员统计')
            var days = [];
            var colorList = ['#4472C5', '#67F25F', '#FFBC6B']
            // 日期
            var dataFisrt = statisticsList[0].infoList
            for (var i = 0; i < dataFisrt.length; i++) {
                days.push(dataFisrt[i].statisticsDate)
            }
            // array map兼容补丁
            if (!Array.prototype.map) {
                Array.prototype.map = function (fn) {
                    var items = [];
                    for (var i = 0; i < this.length; i++) {
                        items.push(fn(this[i]));
                    }
                    return items;
                }

            }


            var option = {
                color: ['#EB6257', '#4092FF', '#94C553'],
                legend: {
                    data: (function () {
                        var arr = []
                        statisticsList.forEach(function (item) {
                            arr.push(item.statisticsName)
                        })
                        return arr
                    })(),
                    bottom: 1,
                    inactiveColor: '#5D72B5',
                    textStyle: {
                        color: "#EFEFEF",
                        borderColor: '#67F25F'
                    },
                    pageIconInactiveColor: '#67F25F'
                },
                tooltip: {
                    trigger: 'item',
                    position: 'bottom',
                    formatter: function (arg) {
                        // 方法1
                        // return arg.seriesName + '<br/>' + statisticsList[arg.seriesIndex].infoList[arg.dataIndex].workTypeCounts.map(function (item) {
                        //     return item.name + '：' + item.count + '<br/>'
                        // }).join('');
                        // 方法2
                        var array = []

                        statisticsList[arg.seriesIndex].infoList[arg.dataIndex].workTypeCounts.forEach(function (item) {
                            array.push(item.name + '：' + item.count + '<br/>')
                        })

                        return arg.seriesName + '<br/>' + array.join('')
                    }

                },
                grid: {
                    show: false,
                    top: '10%',
                    left: '8%',
                    right: '2%',
                },
                xAxis: {
                    type: 'category',
                    data: days,
                    axisLabel: {
                        color: '#fff', //#5D72B5
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#212F7F'
                        }
                    },
                },
                yAxis: {
                    type: 'value',
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#212F7F'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        color: '#fff', //#475A96
                    }
                },
                // series: series
                series: (function () {
                    var arr = []

                    statisticsList.forEach(function (item) {
                        var obj = {
                            type: 'line',
                            smooth: false,
                            label: {
                                emphasis: {
                                    show: true,
                                    color: '#FFBC6B',
                                    fontSize: 18,
                                    fontWeight: 'bolder',
                                    position: 'right'
                                }
                            },
                            symbolSize: 15,
                            seriesLayoutBy: 'row',
                            data: [],
                            itemStyle: {
                                normal: {
                                    color: colorList[i]
                                }
                            },

                        }
                        obj['name'] = item.statisticsName
                        // 人数
                        item.infoList.forEach(function (v) {
                            //v.count = (Math.random() * 60).toFixed(0)
                            obj.data.push(v.count)

                        })
                        arr.push(obj)
                    })
                    return arr
                })()
            };
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        })
    };

    //环境检查
    Sec.prototype.formatHJJCData = function (res) {
        if (res && res.length > 0) {
            res.forEach(function (item) {
                switch (item.name) {
                    case '风速':
                        $('#icon_fs').html(item.value + item.unit)
                        item.value >= 10.8 ? $('#icon_fs').css('color', '#E45D12') : $('#icon_fs').css('color', '#fff')
                        break;
                    case '风向':
                        $('#icon_fx').html(item.value + item.unit)
                        break;
                    case '大气压':
                        $('#icon_dqy').html(item.value + item.unit)
                        break;
                    case '大气温度':
                        $('#icon_wd').html(item.value + item.unit)
                        item.value >= 35 ? $('#icon_wd').css('color', '#E45D12') : $('#icon_wd').css('color', '#fff')
                        break;
                    case '大气湿度':
                        $('#icon_sd').html(item.value + item.unit)
                        break;
                    case '噪声':
                        $('#icon_zs').html(item.value + item.unit);
                        item.value >= 70 ? $('#icon_zs').css('color', '#E45D12') : $('#icon_zs').css('color', '#fff')
                        break;
                    case '风速':
                        $('#icon_fs').html(item.value + item.unit)
                        break;
                    case 'PM2.5':
                        Sec.prototype.renderHJJCChart('chart01', item.value, item.name)
                        break;
                    case 'PM10':
                        Sec.prototype.renderHJJCChart('chart02', item.value, item.name)
                }
            })

        }
    };
    //工地现场管理

    // Sec.prototype.getMoblieStatisticsInfo = function () {
    //     global.ajax.getMoblieStatisticsInfo(function (res) {
    //         //console.log(res, '工地现场管理')
    //         var todayInfo = res.data
    //         // todayInfo.inCarCount = (Math.random() * 20).toFixed(0)
    //         // todayInfo.labourServiceUnitCount = (Math.random() * 20).toFixed(0)
    //         // todayInfo.labourServiceCount = (Math.random() * 20).toFixed(0)
    //         // todayInfo.manageCount = (Math.random() * 20).toFixed(0)
    //         // todayInfo.labourServiceTeamCount = (Math.random() * 20).toFixed(0)
    //         // todayInfo.temporaryCount = (Math.random() * 20).toFixed(0)

    //         // // 工种的数据
    //         // var statisticsList = res.data.personStatistics;
    //         // // 工种
    //         // statisticsList.forEach(function(k){
    //         //     k.infoList.forEach(function(s){
    //         //         s.workTypeCounts=[
    //         //             {name:'asda',count:111}
    //         //         ]
    //         //     })
    //         // })
    //         // console.log(statisticsList)
    //         $('#carCount').html(todayInfo.inCarCount)
    //         $('#companyCount').html(todayInfo.labourServiceUnitCount)
    //         $('#workersCount').html(todayInfo.labourServiceCount)
    //         $('#managerCount').html(todayInfo.manageCount)
    //         $('#teamCount').html(todayInfo.labourServiceTeamCount)
    //         $('#tempCount').html(todayInfo.temporaryCount)
    //     })
    // }

    Sec.prototype.Modal = function (t, c, h, w) {

        return parent.window.Modal({
            title: t,
            content: c,
            height: h || '80%',
            width: w || 1000
        })
    }

    Sec.prototype.showModal = function (node, t) {
        var _$ = parent.window.$
        var ModalContent = $('#' + node).prop('outerHTML')
        if (!modal) {
            modal = Security.Modal(t, ModalContent);

        } else {
            modal.setTitle(t)
            modal.setContent(ModalContent);

        }
        modal.open()

        _$('.pic_view').each(function () {
            var $node = $(this)
            $node.find('img').each(function (i) {
                $(this).click(function () {

                    parent.window.pic_view($node.prop('outerHTML'), i);

                })
            })
        })





        //模态层图片预览
        // var viewer = new parent.window.Viewer(parent.document.getElementById('jBox1'), {
        //     zIndex: 11111
        // })

        //模态层tab切换
        _$('.modal_nav').find('span').each(function () {
            $(this).click(function () {
                _$('.modal_body>div').each(function () {
                    $(this).css('display', 'none')
                })
                var cName = $(this).attr('name')
                $(this).addClass('active').siblings().removeClass('active')
                _$('.' + cName).css('display', 'block')
            })

        })
        // 查出进出车辆
        _$('#CarIn').find('span').each(function () {
            $(this).click(function () {
                $(this).addClass('active').siblings().removeClass('active')
                engineeringId = $(this).attr('engineeringId')
                Sec.prototype.renderCarInfo(engineeringId)
            })

        })




        //管理人数--人员考察明细
        _$('#glrs_modal').find('a').click(function () {
            Security.showRYKCModal()
            // Security.showModal('rykcmx_modal', '人员考察明细')
            var nameid = $(this).attr('NameId')
            global.ajax.RecordPerson(nameid, function (res) {
                var DATA = res.data.inOutLog;
                var HTML = '<tr><td>项目名称</td><td>人员</td><td>单位名称</td><td>考勤时间</td><td>进出类型</td></tr>'
                DATA.forEach(function (item) {
                    HTML += '<tr><td>' + item.engineeringName + '</td><td>' + item.personnelName + '</td><td>' + item.companyName + '</td><td>' + item.inOutTime + '</td><td>' + item.inOutTypeName + '</td></tr>'
                })
                // _$('#ryck_modal table').html(HTML)
                _$('.rykcmx_modal table').html(HTML)
            })
        })
    }



    //移动巡检
    Sec.prototype.renderYDJKList = function () {
        global.ajax.getMobilePatrolList(function (res) {
            console.log(res, '移动巡检')
            var data = res.data;
            var html = ''
            data.forEach(function (item) {
                html += '<div class="box equipment" playChanle="' + item.playChannel + '" Chanle="' + item.channel + '" name="' + item.name + '">'
                if (item.status == 0) {
                    html += '<li><span class="state state-outline"></span></li><li><span>' + item.name + '' +
                        '</span></li><li><span>' + item.tel + '</span></li><li><span>' + (item.lastOnlineTime ? item.lastOnlineTime : '') + '</span></li></div>'
                } else if (item.status == 1) {
                    html += '<li><span class="state state-online"></span></li><li><span>' + item.name + '' +
                        '</span></li><li><span>' + item.tel + '</span></li><li><span>' + (item.lastOnlineTime ? item.lastOnlineTime : '') + '</span></li></div>'
                }
            })

            $('#ydjklb_list').html(html)


            $('#ydjklb_list').find('.equipment').each(function () {
                $(this).on('click', function () {
                    var playChanle = $(this).attr('playChanle')
                    var Chanle = $(this).attr('Chanle')
                    console.log(playChanle, Chanle, 'playChanleplayChanleplayChanleplayChanle')
                    Security.showMonitorModal(playChanle, Chanle)
                })
            })
        })
        // var list = '<div class="box equipment" playChanle="1000024$1$0$0" Chanle="1000024" name="时代云创三"><li><span class="state state-online"></span></li><li><span>时代云创三' +
        //     '</span></li><li><span>18056889932</span></li><li><span>2018.12.22</span></li></div><div class="box equipment"  playChanle="1000023$1$0$0" Chanle="1000023" name="时代云创二"><li><span class="state state-online"></span></li><li><span>时代云创二' +
        //     '</span></li><li><span>18056889932</span></li><li><span>2018.12.22</span></li></div><div class="box equipment"  playChanle="1000028$1$0$0" Chanle="1000028" name="时代云创一"><li><span class="state state-online"></span></li><li><span>时代云创一' +
        //     '</span></li><li><span>18056889932</span></li><li><span>2018.12.22</span></li></div>'
        // for (var i = 0; i < 2; i++) {
        //     list +=
        //         '<div class="box equipment" name="巡检设备_0' + i +
        //         '"><li><span class="state state-online"></span></li><li><span>巡检设备_0' + i +
        //         '</span></li><li><span>18056889932</span></li><li><span>2018.12.22</span></li></div>'
        // }
        // $('#ydjklb_list').html(list)

    }
    // 人员考察明细弹窗
    Sec.prototype.showRYKCModal=function(){
        var _$ = parent.window.$
        _$('#ryck_modal').show()
    }

    
    Sec.prototype.showMonitorModal = function (playChanle, Chanle) {
        if (IsIe()) {
            var _$ = parent.window.$
            _$('#Modal').css('display', 'block')

            _$('#monitor_modal').show()
            setTimeout(function () {
                // var DPSDK_YDXJ = parent.document.getElementById('DPSDK_YDXJ')
                // var OCX = new Video(DPSDK_YDXJ)
                // var DHSDK_Login_state = OCX.DPSDK_Login('1')
                // 1.验证登陆
                DPSDK_login(parent.document.getElementById('DPSDK_YDXJ'))
                //2.初始化窗口
                YDXJinit()
                _$('#video_control').find('li').each(function () {
                    $(this).click(function () {
                        _$('#Modal').on('click', function () {
                            _$('#monitor_modal').css('display', 'none')
                            $(this).hide()
                            stopPlay()
                        })
                        var _that = $(this)
                        var type = _that.attr('type')
                        var state = _that.attr('state') == '0' ? 1 : 0
                        _that.attr('state', state)

                        switch (type) {
                            case '1': //视频
                                setTimeout(function () {
                                    if (state == 0) {
                                        YDXJplay(playChanle,
                                            function () {
                                                _that.addClass(
                                                    'monitor_modal_active')
                                                    .find('.control_active').show()
                                                    .siblings('img').hide()
                                            })
                                    } else {
                                        stopPlay(function () {
                                            _that.removeClass(
                                                'monitor_modal_active')
                                                .find('.control_active').hide()
                                                .siblings('img').show()
                                        })
                                    }
                                }, 200)
                                break;
                            case '2': //语音
                                if (state == 0) {
                                    ButtonStartTalk_onclick(Chanle, function () {
                                        _that.addClass('monitor_modal_active').find(
                                            '.control_active').show().siblings(
                                                'img').hide()
                                    })
                                } else {
                                    ButtonStopTalk_onclick(Chanle, function () {
                                        _that.removeClass(
                                            'monitor_modal_active')
                                            .find('.control_active').hide()
                                            .siblings('img').show()
                                    })
                                }

                                break;
                            case '3': //录像
                                if (state == 0) {
                                    ButtonStartRealRecordByWndNo_onclick(
                                        function () {
                                            _that.addClass('monitor_modal_active').find(
                                                '.control_active').show().siblings(
                                                    'img').hide()
                                        })
                                } else {
                                    ButtonStopRealRecordByWndNo_onclick(function () {
                                        _that.removeClass(
                                            'monitor_modal_active')
                                            .find('.control_active').hide()
                                            .siblings('img').show()
                                    })
                                }
                                break;
                            case '4': //抓图
                                CapturePicture()
                                break;
                        }
                    })
                })

            }, 300)
        }

        // _$('.closeBtn').on('click', function () {
        //     _$('#monitor_modal').css('display', 'none')
        //     _$('#Modal').css('display', 'none');
        //     _$('#video_control').find('.control_active').hide().siblings('img').show();
        //     _$('#video_control').find('li').removeClass('monitor_modal_active');
        //     // 停止播放
        //     stopPlay()
        //     ButtonStopTalk_onclick('1000038')
        //     ButtonStopRealRecordByWndNo_onclick()
        // })

    }


    //验收结果
    Sec.prototype.renderYSJGList = function () {
        var list = ''
        for (var i = 0; i < 30; i++) {
            list +=
                '<div class="box"><li><span>塔吊安全检查</span></li><li><span>2018-12</span></li><li><span>未完成</span></li></div>'
        }
        $('.ysjg .list').append(list)
    }

    //环境检测 PM2.5 PM10 饼图渲染
    Sec.prototype.renderHJJCChart = function (id, v, name) {
        var chart = echarts.init(document.getElementById(id));
        var color = v > 30 ? ('#E45D12') : ('#68F35F')

        chart.setOption({
            title: {
                text: name + '\n\n' + v,
                x: '48%',
                y: '35%',
                textStyle: {
                    fontSize: 14,
                    color: '#fff', //#9193BF
                    fontWeight: 100
                },
                textAlign: 'center'

            },
            series: [{
                name: '天气',
                type: 'pie',
                radius: ['58%', '80%'],
                label: {
                    normal: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                },

                data: [{
                    name: name,
                    value: v,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [{
                                    offset: 0,
                                    color: color
                                },
                                {
                                    offset: 1,
                                    color: color
                                }
                                ]
                            )
                        }
                    }

                }, {
                    name: name,
                    value: 100 - v,

                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [{
                                    offset: 0,
                                    color: '#2681D9'
                                },
                                {
                                    offset: 1,
                                    color: '#2681D9'
                                }
                                ]
                            )
                        }
                    }

                }]
            }]
        })
        window.addEventListener("resize", function () {
            chart.resize();

        });

    }

    // 安全巡查 第一个图表
    Sec.prototype.renderSafeEchartF = function (CValue, ValueEx) {
        var myChart = echarts.init(document.getElementById('ysjg_chart01'));
        // 指定图表的配置项和数据
        option = {

            tooltip: {
                trigger: 'item',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: '{c}次'
            },
            grid: {
                left: "0%",
                top: '0%',
                containLabel: true,
                height: "100%"
            },
            xAxis: [{
                type: 'category',
                axisLine: {
                    show: false
                },
                axisLabel: {
                    color: '#fff',//#5D72B5
                    // margin: 15,
                    interval: 0,
                },
                axisTick: {
                    show: false
                },
                data: ValueEx

            }],
            yAxis: [{
                type: 'value',
                axisLabel: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },

            }],
            series: [{
                type: 'bar',

                itemStyle: {
                    normal: {
                        color: '#223185'
                    }
                },
                silent: true,
                barWidth: 23,
                barGap: '-100%', // Make series be overlap
                data: [150, 150, 150, 150, 150]
            },
            {
                type: 'bar',
                barWidth: 20,
                z: 10,
                barWidth: 23,
                label: {
                    normal: {
                        show: false,
                        position: 'insideRight',
                        formatter: '{c}次',
                        color: '#A8ABE2'
                    }
                },
                data: CValue,
                itemStyle: {
                    normal: {
                        color: '#67F25F'
                    }

                }


            }
            ]

        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });

    }

    // 安全巡查 第二个图表
    Sec.prototype.renderSafeEchartS = function (ValueExright, CValueright) {
        var chart = echarts.init(document.getElementById('ysjg_chart02'))
        option = {

            tooltip: {
                trigger: 'item',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: '{c}次'
            },
            grid: {
                left: "0%",
                top: '0%',
                containLabel: true,
                height: "100%"
            },
            xAxis: [{
                type: 'category',
                axisLine: {
                    show: false
                },
                axisLabel: {
                    color: '#fff',//#5D72B5
                    interval: 0,
                },
                axisTick: {
                    show: false
                },
                data: ValueExright
            }],
            yAxis: [{
                type: 'value',
                axisLabel: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },

            }],
            series: [{
                type: 'bar',

                itemStyle: {
                    normal: {
                        color: '#223185'
                    }
                },
                silent: true,
                barWidth: 23,
                barGap: '-100%', // Make series be overlap
                data: [150, 150, 150, 150, 150]
            },
            {
                type: 'bar',
                barWidth: 20,
                z: 10,
                barWidth: 23,
                label: {
                    normal: {
                        show: false,
                        position: 'insideRight',
                        formatter: '{c}次',
                        color: '#A8ABE2'
                    }
                },
                data: CValueright,
                itemStyle: {
                    normal: {
                        color: '#67F25F'
                    }

                }


            }
            ]

        };
        // 使用刚指定的配置项和数据显示图表。
        chart.setOption(option);
        window.addEventListener("resize", function () {
            chart.resize();
        });
    }

    // 安全巡查 第三个图表
    Sec.prototype.renderSafeEchartT = function (sth, tgh, noes, noesp, noesl, noeso) {
        var chart = echarts.init(document.getElementById('ysjg_chart03'))
        chart.setOption({
            tooltip: {
                show: 'false',
                trigger: 'item',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: ""
            },
            grid: {
                left: "0%",
                top: '0%',
                containLabel: true,
                height: "100%",
                width: "94%"
            },
            xAxis: [{
                type: 'value',
                axisLabel: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },

            }],
            yAxis: [{
                type: 'category',
                axisLine: {
                    show: false
                },
                axisLabel: {
                    color: '#fff',//#5D72B5
                    margin: 25,
                },
                axisTick: {
                    show: false,

                },
                data: sth
            }],
            series: [{
                type: 'bar',

                itemStyle: {
                    normal: {
                        color: '#223185'
                    }
                },
                silent: true,
                barWidth: 12.5,
                barGap: '-100%', // Make series be overlap
                data: tgh //底数据
            },
            {
                type: 'bar',
                z: 5,
                barWidth: 12.5,
                label: {
                    // normal: {
                    //     show: true,
                    //     position: 'insideRight',
                    //     formatter: '{c}%',
                    //     color: '#A8ABE2'
                    // }
                },
                data: noes, //第一层
                itemStyle: {
                    normal: {
                        color: '#FFFF02'
                    }
                }
            },
            {
                type: 'bar',
                z: 4,
                barWidth: 12.5,
                label: {
                    // normal: {
                    //     show: true,
                    //     position: 'insideRight',
                    //     formatter: '{c}%',
                    //     color: '#A8ABE2'
                    // }
                },
                data: noesp, //第二层
                itemStyle: {
                    normal: {
                        color: '#314BDB'
                    }
                }
            },
            {
                type: 'bar',
                z: 3,
                barWidth: 12.5,
                label: {
                    // normal: {
                    //     show: true,
                    //     position: 'insideRight',
                    //     formatter: '{c}%',
                    //     color: '#A8ABE2'
                    // }
                },
                data: noesl, //第三层
                itemStyle: {
                    normal: {
                        color: '#FF0402'
                    }
                }
            },
            {
                type: 'bar',
                z: 2,
                barWidth: 12.5,
                label: {
                    // normal: {
                    //     show: true,
                    //     position: 'insideRight',
                    //     formatter: '{c}%',
                    //     color: '#A8ABE2'
                    // }
                },
                data: noeso, //第四层
                itemStyle: {
                    normal: {
                        color: '#1F2B57'
                    }
                }
            },

            ]
        })
        window.addEventListener("resize", function () {
            chart.resize();
        });
    }

    // 安全验收 
    Sec.prototype.renderSafeReturn = function (CValue, ValueEx) {
        var chart = echarts.init(document.getElementById('ysjg_chart04'))
        chart.setOption({
            tooltip: {
                trigger: 'item',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'line' // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: '{c}%'
            },
            grid: {
                left: '0',
                right: '4%',
                bottom: '10%',
                top: '3%',
                width: '95%',
                // width: 700,
                height: 190,
                containLabel: true,
            },
            xAxis: [{
                type: 'category',
                axisLine: {
                    show: false,
                    interval: 0,
                    color: '#fff',//#5D72B5
                    // margin: 35,

                },

                axisTick: {
                    show: false
                },
                nameTextStyle: {
                    color: '#fff',//#5D72B5
                },
                data: ValueEx,
                axisLabel: {
                    show: true,
                    color: '#fff',//#5D72B5
                    verticalAlign: 'middle',
                    padding: [70, 0, 0, 0],
                    formatter: function (val) {
                        var len = 6;
                        var strItems = [];
                        for (var i = 0; i < val.length; i += len) {
                            strItems.push(val.substring(i, i + len) + '\n')
                        }
                        return strItems.join('')
                    }
                },
                nameTextStyle: {
                    align: 'center'
                }
                // nameGap: 666660,
                // show: false ,
            }],
            yAxis: [{
                type: 'value',

                axisLabel: {
                    show: false,
                    color: '#fff',//#5D72B5

                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },

            }],
            series: [{
                type: 'bar',

                itemStyle: {
                    normal: {
                        color: '#223185',//#223185
                    }
                },
                silent: true,
                barWidth: 23,
                barGap: '-100%', // Make series be overlap
                data: [100, 100, 100]
            },
            {
                type: 'bar',
                barWidth: 20,
                z: 10,
                barWidth: 23,
                label: {
                    normal: {
                        show: true,
                        position: 'bottom',
                        formatter: '{c}%',
                        color: '#fff',//#A8ABE2
                    }
                },
                data: CValue,
                itemStyle: {
                    normal: {
                        color: '#67F25F'
                    }

                }


            }
            ]


        })
    }

    //进场车次
    Sec.prototype.renderCarInfo = function (engineeringId) {

        global.ajax.getCarEnterList(engineeringId, 1, function (res) {
            if (res.data.inOutLog.length === 0) {
                parent.window.$("#CarRecord").empty()
            } else {
                // 初始化分页
                parent.window.$("#CarRecord").paging({
                    pageNum: 1, // 当前页面
                    totalNum: Math.ceil(res.data.totalSize / 14), // 总页码
                    totalList: res.data.totalSize, // 记录总数量
                    callback: function (num) { //回调函数
                        global.ajax.getCarEnterList(engineeringId, num, function (RES) {
                            Sec.prototype.checkCarInfo(RES)
                        })
                    }
                });
            }

            Sec.prototype.checkCarInfo(res)
        })
    }
    Sec.prototype.checkCarInfo = function (res) {
        if (res.data.inOutLog.length == 0) {
            parent.window.$('#jccc_modal .content').empty()
            parent.window.$('#CarInfo').empty()
            return
        }

        if (res.data.inOutLog.length > 8) {
            console.log('res', res)
            parent.window.$('#CarInfo').show()
            var inOutLog = res.data.inOutLog
            var html = '<table><tr><td>所属单位</td><td>车辆名称</td><td>车牌号</td><td>进出时间</td><td>进出类型</td><td>查看车牌</td></tr>'
            inOutLog.forEach(function (item, index) {
                var carNumber = item.carNumber ? item.carNumber : ''
                var addTime = item.addTime ? item.addTime : ''
                var carName = item.carName ? item.carName : ''
                var companyName = item.companyName ? item.companyName : ''
                var logImage = item.logImage ? item.logImage : ''
                var inOutTypeName = item.inOutTypeName ? item.inOutTypeName : ''
                html += ' <tr><td rowspan="1">' + companyName + '</td><td>' + carName + '</td><td>' + carNumber + '</td><td>' + addTime + '</td><td>' + inOutTypeName + '</td> <td><a href="javascript:void(0)" data-caption="查看照片" data-magnify="gallery" data-group="' + (index + 200) + '"'
                    + 'data-src="' + logImage + '"><img src="' + logImage + '" alt="" class="carNum"></a></td></tr>'
            })
            html += '</table>'
            parent.window.$('#jccc_modal .content').html(html);

            // 调用查看图片预览
            parent.window.$('.pic_view').each(function () {
                var $node = $(this)
                $node.find('img').each(function (i) {
                    $(this).click(function () {
                        parent.window.pic_view($node.prop('outerHTML'), i);

                    })
                })
            })


        }
    }


    // 工人违规
    Sec.prototype.renderillegal = function (engineeringId) {
        global.ajax.getViolationLog(engineeringId, 1,function (res) {
            if (res.data.violationRecordList.length ===0) {
                parent.window.$("#illgelRecord").empty()
            } else {
                // 初始化分页
                parent.window.$("#illgelRecord").paging({
                    pageNum: 1, // 当前页面
                    totalNum: Math.ceil(res.data.totalSize / 8), // 总页码
                    totalList: res.data.totalSize, // 记录总数量
                    callback: function (num) { //回调函数
                        global.ajax.getViolationLog(engineeringId,num,function(RES){
                            Sec.prototype.illegal(RES)
                        })
                    }
                });
            }


            Sec.prototype.illegal(res)
        })

    }

    // 工人违规查看更多html
    Sec.prototype.illegal = function (res) {

        var violationRecordList = res.data.violationRecordList
        var html = ''
        violationRecordList.forEach(function (item) {
            html += '<div class="pic_list">' +
                '<a href="javascript:void(0)" data-caption="查看照片" data-magnify="gallery" data-group="g9" data-src="' + (imageUrl + item.imgUrl) + '">' +
                '<img src="' + (imageUrl + item.imgUrl) + '" alt="">' +
                '</a>' +
                '<p>' + (item.site ? item.site : '') + '</p>' +
                '<span class="time">' + (item.dateTime ? item.dateTime : '') + '</span>' +
                '<p class="des">' + (item.num ? item.num : '') + '人未戴安全帽</p>' +
                '</div>'
        })
        parent.window.$("#ckgd-modal .picbox").html(html)

    }
    return new Sec
})()

Security.init()