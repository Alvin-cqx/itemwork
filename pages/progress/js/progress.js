var Progress = (function () {
    var Pro = function () {
        this.init = function () {
            this.formatJDGLBarData1();
            this.formatJDGLBarData2();
            this.formatJDGLBarData3();
            this.formatJDGLFloorData1();
            this.formatJDGLFloorData2();
        }
    }
    Pro.prototype.formatJDGLBarData1 = function (res, id) {
        var paperDataURI1 = './img/bg2.png';
        var paperDataURI2 = './img/bg1.png';
        var data = []
        if (!res) return;
        // 接受结果
        var items = res.data.items
        // 楼层
        var floorList = []
        // 验收工序名字
        var itemNma = []
        items.forEach(function (item, i) {
            floorList.push(item.valueEx)
            itemNma.push(item.typeValueEx)
        })
        // 获取层数
        var arr = [];
        for (var i = 0; i < floorList.length; i++) {
            arr.push(parseInt(floorList[i].split('#')[1]))
        }
        // 去重
        arr=uniq(arr)
        // 一进来做判断
        if (items.length > 20) {
            var value = 0
        } else {
            var value = arr.length * 20000
        }
        // console.log(items, 'waiwi',arr)
        houseName.forEach(function (item) {
            data.push(item)
        })
        floorList = uniq(floorList)
        itemNma = uniq(itemNma)
        // console.log(data, 'waiwi')
        var chart = echarts.init(document.getElementById(id));
        if (id == 'JDGL0') {
            var data = [data[0]]
        }
        if (id == 'JDGL1') {
            var data = [data[1]]
        }
        if (id == 'JDGL2') {
            var data = [data[2]]
        }


        var option = {
            grid: [{
                left: '0%',
                top: '0%',
                bottom: '25%',

            }],
            tooltip: {
                formatter: function (arg) {
                    if (arg.color == "#2f4554") {
                        return arg.seriesName + '<br />' + itemNma + '(合格)'
                    }

                }
            },
            xAxis: [{
                data: data,
                // data:(function(){
                //     var arr=[];
                //     data.forEach(function(item,i){
                //         arr.push(item)
                //     })
                //     console.log(arr,'arr')
                //     return arr[0];
                // })(),
                axisTick: { show: false },
                axisLine: { show: false },
                axisLabel: {
                    margin: 20,
                    textStyle: {
                        color: '#fff',//'#ddd'
                        fontSize: 14
                    }
                }
            }],
            yAxis: {
                splitLine: { show: false },
                axisTick: { show: false },
                axisLine: { show: false },
                axisLabel: { show: false }
            },
            animationEasing: 'elasticOut',
            series: [{
                type: 'pictorialBar',
                name: 'all',
                hoverAnimation: true,
                data: [{
                    value: itemFloorNum.length * 10000,
                    symbol: 'image://' + paperDataURI1,
                    symbolRepeat: true,
                    symbolSize: ['100%', '20%'],
                    symbolOffset: [0, 10],
                    symbolMargin: '-35%',
                    animationDelay: function (dataIndex, params) {
                        return params.index * 30;
                    }
                }],
                markLine: {
                    symbol: ['none', 'none'],
                    label: {
                        normal: { show: false }
                    },
                    lineStyle: {
                        normal: {
                            color: '#e54035',
                            width: 2
                        }
                    },
                    data: [{
                        yAxis: 8844
                    }]
                }
            },
            {
                type: 'pictorialBar',
                name: '验收结果',
                hoverAnimation: true,

                data: [{
                    value: value,
                    symbolRepeat: true,
                    symbol: 'image://' + paperDataURI2,
                    symbolSize: ['100%', '20%'],
                    symbolOffset: [0, 10],
                    symbolMargin: '-35%',
                    animationDelay: function (dataIndex, params) {
                        return params.index * 30;
                    }
                }],
                markLine: {
                    symbol: ['none', 'none'],
                    label: {
                        normal: { show: false }
                    },
                    lineStyle: {
                        normal: {
                            color: '#e54035',
                            width: 2
                        }
                    },

                }
            },
            {
                name: 'all',
                type: 'pictorialBar',
                barGap: '-100%',
                symbol: 'circle',
                itemStyle: {
                    normal: {
                        color: '#185491'
                    }
                },
                silent: true,
                symbolOffset: [0, '50%'],
                z: -10,
                data: [{
                    value: 1,
                    symbolSize: ['120%', 50]
                },]
            }]
        }



        chart.clear();
        chart.setOption(option, true);




        window.addEventListener("resize", function () {

            chart.resize();

        });
    }

    Pro.prototype.formatJDGLBarData2 = function () {
        var paperDataURI1 = './img/bg2.png';
        var paperDataURI2 = './img/bg1.png';
        var data = ['天鹅堡A栋']
        var value = 10000
        var chart4 = echarts.init(document.getElementById('JDGL04'));
        var chart5 = echarts.init(document.getElementById('JDGL05'));
        var chart6 = echarts.init(document.getElementById('JDGL06'));
        var option4 = {
            grid: [{
                left: '0%',
                top: '0%',
                bottom: '15%',

            }],
            tooltip: {},
            xAxis: [{
                data: data,
                axisTick: { show: false },
                axisLine: { show: false },
                axisLabel: {
                    margin: 20,
                    textStyle: {
                        color: '#fff',//'#ddd'
                        fontSize: 14
                    }
                }
            }],
            yAxis: {
                splitLine: { show: false },
                axisTick: { show: false },
                axisLine: { show: false },
                axisLabel: { show: false }
            },
            animationEasing: 'elasticOut',
            series: [{
                type: 'pictorialBar',
                name: 'all',
                hoverAnimation: true,
                data: [{
                    value: 16000,
                    symbol: 'image://' + paperDataURI1,
                    symbolRepeat: true,
                    symbolSize: ['100%', '20%'],
                    symbolOffset: [0, 10],
                    symbolMargin: '-35%',
                    animationDelay: function (dataIndex, params) {
                        return params.index * 30;
                    }
                }],
                markLine: {
                    symbol: ['none', 'none'],
                    label: {
                        normal: { show: false }
                    },
                    lineStyle: {
                        normal: {
                            color: '#e54035',
                            width: 2
                        }
                    },
                    data: [{
                        yAxis: 8844
                    }]
                }
            },
            {
                type: 'pictorialBar',
                name: 'all',
                hoverAnimation: true,

                data: [{
                    value: value,
                    symbolRepeat: true,
                    symbol: 'image://' + paperDataURI2,
                    symbolSize: ['100%', '20%'],
                    symbolOffset: [0, 10],
                    symbolMargin: '-35%',
                    animationDelay: function (dataIndex, params) {
                        return params.index * 30;
                    }
                }],
                markLine: {
                    symbol: ['none', 'none'],
                    label: {
                        normal: { show: false }
                    },
                    lineStyle: {
                        normal: {
                            color: '#e54035',
                            width: 2
                        }
                    },

                }
            },
            {
                name: 'all',
                type: 'pictorialBar',
                barGap: '-100%',
                symbol: 'circle',
                itemStyle: {
                    normal: {
                        color: '#185491'
                    }
                },
                silent: true,
                symbolOffset: [0, '50%'],
                z: -10,
                data: [{
                    value: 1,
                    symbolSize: ['120%', 50]
                },]
            }]
        }
        var option5 = {
            grid: [{
                left: '0%',
                top: '0%',
                bottom: '15%',

            }],
            tooltip: {},
            xAxis: [{
                data: data,
                axisTick: { show: false },
                axisLine: { show: false },
                axisLabel: {
                    margin: 20,
                    textStyle: {
                        color: '#fff',//'#ddd'
                        fontSize: 14
                    }
                }
            }],
            yAxis: {
                splitLine: { show: false },
                axisTick: { show: false },
                axisLine: { show: false },
                axisLabel: { show: false }
            },
            animationEasing: 'elasticOut',
            series: [{
                type: 'pictorialBar',
                name: 'all',
                hoverAnimation: true,
                data: [{
                    value: 16000,
                    symbol: 'image://' + paperDataURI1,
                    symbolRepeat: true,
                    symbolSize: ['100%', '20%'],
                    symbolOffset: [0, 10],
                    symbolMargin: '-35%',
                    animationDelay: function (dataIndex, params) {
                        return params.index * 30;
                    }
                }],
                markLine: {
                    symbol: ['none', 'none'],
                    label: {
                        normal: { show: false }
                    },
                    lineStyle: {
                        normal: {
                            color: '#e54035',
                            width: 2
                        }
                    },
                    data: [{
                        yAxis: 8844
                    }]
                }
            },
            {
                type: 'pictorialBar',
                name: 'all',
                hoverAnimation: true,

                data: [{
                    value: value,
                    symbolRepeat: true,
                    symbol: 'image://' + paperDataURI2,
                    symbolSize: ['100%', '20%'],
                    symbolOffset: [0, 10],
                    symbolMargin: '-35%',
                    animationDelay: function (dataIndex, params) {
                        return params.index * 30;
                    }
                }],
                markLine: {
                    symbol: ['none', 'none'],
                    label: {
                        normal: { show: false }
                    },
                    lineStyle: {
                        normal: {
                            color: '#e54035',
                            width: 2
                        }
                    },

                }
            },
            {
                name: 'all',
                type: 'pictorialBar',
                barGap: '-100%',
                symbol: 'circle',
                itemStyle: {
                    normal: {
                        color: '#185491'
                    }
                },
                silent: true,
                symbolOffset: [0, '50%'],
                z: -10,
                data: [{
                    value: 1,
                    symbolSize: ['120%', 50]
                },]
            }]
        }
        var option6 = {
            grid: [{
                left: '0%',
                top: '0%',
                bottom: '15%',

            }],
            tooltip: {},
            xAxis: [{
                data: data,
                axisTick: { show: false },
                axisLine: { show: false },
                axisLabel: {
                    margin: 20,
                    textStyle: {
                        color: '#fff',//'#ddd'
                        fontSize: 14
                    }
                }
            }],
            yAxis: {
                splitLine: { show: false },
                axisTick: { show: false },
                axisLine: { show: false },
                axisLabel: { show: false }
            },
            animationEasing: 'elasticOut',
            series: [{
                type: 'pictorialBar',
                name: 'all',
                hoverAnimation: true,
                data: [{
                    value: 16000,
                    symbol: 'image://' + paperDataURI1,
                    symbolRepeat: true,
                    symbolSize: ['100%', '20%'],
                    symbolOffset: [0, 10],
                    symbolMargin: '-35%',
                    animationDelay: function (dataIndex, params) {
                        return params.index * 30;
                    }
                }],
                markLine: {
                    symbol: ['none', 'none'],
                    label: {
                        normal: { show: false }
                    },
                    lineStyle: {
                        normal: {
                            color: '#e54035',
                            width: 2
                        }
                    },
                    data: [{
                        yAxis: 8844
                    }]
                }
            },
            {
                type: 'pictorialBar',
                name: 'all',
                hoverAnimation: true,

                data: [{
                    value: value,
                    symbolRepeat: true,
                    symbol: 'image://' + paperDataURI2,
                    symbolSize: ['100%', '20%'],
                    symbolOffset: [0, 10],
                    symbolMargin: '-35%',
                    animationDelay: function (dataIndex, params) {
                        return params.index * 30;
                    }
                }],
                markLine: {
                    symbol: ['none', 'none'],
                    label: {
                        normal: { show: false }
                    },
                    lineStyle: {
                        normal: {
                            color: '#e54035',
                            width: 2
                        }
                    },

                }
            },
            {
                name: 'all',
                type: 'pictorialBar',
                barGap: '-100%',
                symbol: 'circle',
                itemStyle: {
                    normal: {
                        color: '#185491'
                    }
                },
                silent: true,
                symbolOffset: [0, '50%'],
                z: -10,
                data: [{
                    value: 1,
                    symbolSize: ['120%', 50]
                },]
            }]
        }
        chart4.clear();
        chart5.clear();
        chart6.clear();
        chart4.setOption(option4, true);
        chart5.setOption(option5, true);
        chart6.setOption(option6, true);
        window.addEventListener("resize", function () {
            chart4.resize();
            chart5.resize();
            chart6.resize();
        });
    }


    Pro.prototype.formatJDGLBarData3 = function () {
        var paperDataURI1 = './img/bg2.png';
        var paperDataURI2 = './img/bg1.png';
        var data = ['天鹅堡A栋']
        var value = 10000
        var chart7 = echarts.init(document.getElementById('JDGL07'));
        var chart8 = echarts.init(document.getElementById('JDGL08'));
        var chart9 = echarts.init(document.getElementById('JDGL09'));
        var option7 = {
            grid: [{
                left: '0%',
                top: '0%',
                bottom: '15%',

            }],
            tooltip: {},
            xAxis: [{
                data: data,
                axisTick: { show: false },
                axisLine: { show: false },
                axisLabel: {
                    margin: 20,
                    textStyle: {
                        color: '#fff',//'#ddd'
                        fontSize: 14
                    }
                }
            }],
            yAxis: {
                splitLine: { show: false },
                axisTick: { show: false },
                axisLine: { show: false },
                axisLabel: { show: false }
            },
            animationEasing: 'elasticOut',
            series: [{
                type: 'pictorialBar',
                name: 'all',
                hoverAnimation: true,
                data: [{
                    value: 16000,
                    symbol: 'image://' + paperDataURI1,
                    symbolRepeat: true,
                    symbolSize: ['100%', '20%'],
                    symbolOffset: [0, 10],
                    symbolMargin: '-35%',
                    animationDelay: function (dataIndex, params) {
                        return params.index * 30;
                    }
                }],
                markLine: {
                    symbol: ['none', 'none'],
                    label: {
                        normal: { show: false }
                    },
                    lineStyle: {
                        normal: {
                            color: '#e54035',
                            width: 2
                        }
                    },
                    data: [{
                        yAxis: 8844
                    }]
                }
            },
            {
                type: 'pictorialBar',
                name: 'all',
                hoverAnimation: true,

                data: [{
                    value: value,
                    symbolRepeat: true,
                    symbol: 'image://' + paperDataURI2,
                    symbolSize: ['100%', '20%'],
                    symbolOffset: [0, 10],
                    symbolMargin: '-35%',
                    animationDelay: function (dataIndex, params) {
                        return params.index * 30;
                    }
                }],
                markLine: {
                    symbol: ['none', 'none'],
                    label: {
                        normal: { show: false }
                    },
                    lineStyle: {
                        normal: {
                            color: '#e54035',
                            width: 2
                        }
                    },

                }
            },
            {
                name: 'all',
                type: 'pictorialBar',
                barGap: '-100%',
                symbol: 'circle',
                itemStyle: {
                    normal: {
                        color: '#185491'
                    }
                },
                silent: true,
                symbolOffset: [0, '50%'],
                z: -10,
                data: [{
                    value: 1,
                    symbolSize: ['120%', 50]
                },]
            }]
        }
        var option8 = {
            grid: [{
                left: '0%',
                top: '0%',
                bottom: '15%',

            }],
            tooltip: {},
            xAxis: [{
                data: data,
                axisTick: { show: false },
                axisLine: { show: false },
                axisLabel: {
                    margin: 20,
                    textStyle: {
                        color: '#fff',//'#ddd'
                        fontSize: 14
                    }
                }
            }],
            yAxis: {
                splitLine: { show: false },
                axisTick: { show: false },
                axisLine: { show: false },
                axisLabel: { show: false }
            },
            animationEasing: 'elasticOut',
            series: [{
                type: 'pictorialBar',
                name: 'all',
                hoverAnimation: true,
                data: [{
                    value: 16000,
                    symbol: 'image://' + paperDataURI1,
                    symbolRepeat: true,
                    symbolSize: ['100%', '20%'],
                    symbolOffset: [0, 10],
                    symbolMargin: '-35%',
                    animationDelay: function (dataIndex, params) {
                        return params.index * 30;
                    }
                }],
                markLine: {
                    symbol: ['none', 'none'],
                    label: {
                        normal: { show: false }
                    },
                    lineStyle: {
                        normal: {
                            color: '#e54035',
                            width: 2
                        }
                    },
                    data: [{
                        yAxis: 8844
                    }]
                }
            },
            {
                type: 'pictorialBar',
                name: 'all',
                hoverAnimation: true,

                data: [{
                    value: value,
                    symbolRepeat: true,
                    symbol: 'image://' + paperDataURI2,
                    symbolSize: ['100%', '20%'],
                    symbolOffset: [0, 10],
                    symbolMargin: '-35%',
                    animationDelay: function (dataIndex, params) {
                        return params.index * 30;
                    }
                }],
                markLine: {
                    symbol: ['none', 'none'],
                    label: {
                        normal: { show: false }
                    },
                    lineStyle: {
                        normal: {
                            color: '#e54035',
                            width: 2
                        }
                    },

                }
            },
            {
                name: 'all',
                type: 'pictorialBar',
                barGap: '-100%',
                symbol: 'circle',
                itemStyle: {
                    normal: {
                        color: '#185491'
                    }
                },
                silent: true,
                symbolOffset: [0, '50%'],
                z: -10,
                data: [{
                    value: 1,
                    symbolSize: ['120%', 50]
                },]
            }]
        }
        var option9 = {
            grid: [{
                left: '0%',
                top: '0%',
                bottom: '15%',

            }],
            tooltip: {},
            xAxis: [{
                data: data,
                axisTick: { show: false },
                axisLine: { show: false },
                axisLabel: {
                    margin: 20,
                    textStyle: {
                        color: '#fff',//'#ddd'
                        fontSize: 14
                    }
                }
            }],
            yAxis: {
                splitLine: { show: false },
                axisTick: { show: false },
                axisLine: { show: false },
                axisLabel: { show: false }
            },
            animationEasing: 'elasticOut',
            series: [{
                type: 'pictorialBar',
                name: 'all',
                hoverAnimation: true,
                data: [{
                    value: 16000,
                    symbol: 'image://' + paperDataURI1,
                    symbolRepeat: true,
                    symbolSize: ['100%', '20%'],
                    symbolOffset: [0, 10],
                    symbolMargin: '-35%',
                    animationDelay: function (dataIndex, params) {
                        return params.index * 30;
                    }
                }],
                markLine: {
                    symbol: ['none', 'none'],
                    label: {
                        normal: { show: false }
                    },
                    lineStyle: {
                        normal: {
                            color: '#e54035',
                            width: 2
                        }
                    },
                    data: [{
                        yAxis: 8844
                    }]
                }
            },
            {
                type: 'pictorialBar',
                name: 'all',
                hoverAnimation: true,

                data: [{
                    value: value,
                    symbolRepeat: true,
                    symbol: 'image://' + paperDataURI2,
                    symbolSize: ['100%', '20%'],
                    symbolOffset: [0, 10],
                    symbolMargin: '-35%',
                    animationDelay: function (dataIndex, params) {
                        return params.index * 30;
                    }
                }],
                markLine: {
                    symbol: ['none', 'none'],
                    label: {
                        normal: { show: false }
                    },
                    lineStyle: {
                        normal: {
                            color: '#e54035',
                            width: 2
                        }
                    },

                }
            },
            {
                name: 'all',
                type: 'pictorialBar',
                barGap: '-100%',
                symbol: 'circle',
                itemStyle: {
                    normal: {
                        color: '#185491'
                    }
                },
                silent: true,
                symbolOffset: [0, '50%'],
                z: -10,
                data: [{
                    value: 1,
                    symbolSize: ['120%', 50]
                },]
            }]
        }
        chart7.clear();
        chart8.clear();
        chart9.clear();
        chart7.setOption(option7, true);
        chart8.setOption(option8, true);
        chart9.setOption(option9, true);
        window.addEventListener("resize", function () {
            chart7.resize();
            chart8.resize();
            chart9.resize();
        });
    }


    Pro.prototype.formatJDGLFloorData1 = function (res, id) {
        if (!res) return;
        // 接受结果
        var items = res.data.items
        // console.log(items)
        // 楼层
        var floorList = []
        // 楼层名
        var floorName = [];
        // 验收工序名字
        var itemNma = []
        items.forEach(function (item, i) {
            floorList.push(item.valueEx)
            itemNma.push(item.typeValueEx)
        })
        // 楼层去重
        floorList = uniq(floorList)
        // 验收工程
        floorName = uniq(floorName)
        floorName = floorList
        itemNma = uniq(itemNma)
        // console.log(floorName, 'floorName',itemNma)
        // 获取层数
        var arr = [];
        // 获取
        // var max;
        for (var i = 0; i < floorList.length; i++) {
            arr.push(parseInt(floorList[i].split('#')[1]))
        }
        
        max=Math.max.apply(null,arr)
        min=Math.max.apply(null,arr)
        console.log(max,'arrrrr',arr)
        var floor = itemFloorNum;
        var rooms = [];
        for (var i = 1; i <= itemHouseNum; i++) {
            rooms.push(i)
        }
        // 从低到高排序
        var data = []
        for (var i = 0; i < itemHouseNum; i++) {
            for (var j = 0; j < itemFloorNum.length; j++) {
                if ((i >= 0) && ((j <max+1) || (j ==min+1))) {
                    data.push([i, j, 4]);
                }
                else if ((i % 2 == 1) && (j >= 1)) {
                    data.push([i, j, 1]);
                }
                else {
                    data.push([i, j, 1]);
                }
            }
        }

        // console.log(floor,'floorfloor')
        var chart = echarts.init(document.getElementById(id))


        var option = {
            tooltip: {
                position: 'top',
                formatter: function (arg) {
                    if (arg.color == '#027F00') {
                        return arg.seriesName + '<br />' + itemNma + '(合格)'
                    }
                    // console.log(arg)
                }
            },
            grid: {
                left: '0%',
                right: '30%',
                bottom: '8%',
                top: '0%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: rooms,
                splitArea: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    color: '#fff',//'#475A96'
                    interval: 0,
                },
                position: 'top',
            },
            yAxis: {
                max: 'dataMax',
                type: 'category',
                data: floor,
                axisLabel: {
                    show: true,
                    color: '#fff',
                    // margin: 12,
                    interval: 0,
                    // height:100,

                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false,
                },
                splitArea: {
                    show: true,
                },
            },
            visualMap: {
                type: 'piecewise',
                pieces: [{
                    value: '1',
                    label: '不合格',
                    color: '#E2E2E2'
                },
                {
                    value: 2,
                    name: '合格',
                    color: '#F1F1F1'
                },
                {
                    value: 3,
                    name: '空白',
                    color: '#FFA500'
                },
                {
                    value: 4,
                    name: '空白',
                    color: '#027F00'
                }
                ],
                show: false
            },
            series: [{
                name: '验收结果',
                type: 'heatmap',
                data: data,
                label: {
                    normal: {
                        show: false,
                    }
                },
                itemStyle: {
                    normal: {
                        emphasis: {
                            label: {
                                show: true
                            },
                            shadowBlur: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.3)',
                        },
                        borderColor: '#162579',
                        borderWidth: 1
                    }

                }
            }]
        }

        chart.clear();
        chart.setOption(option, true);




        window.addEventListener("resize", function () {

            chart.resize();

        });
    }

    Pro.prototype.formatJDGLFloorData2 = function () {
        var data = []
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 15; j++) {
                if ((i % 2 == 0) && (j > 8)) {
                    data.push([i, j, 1]);
                }
                else if ((i % 2 == 1) && (j > 8)) {
                    data.push([i, j, 2]);
                } else if ((i == 4) && (j == 2 || j == 3)) {
                    data.push([i, j, 3]);
                }
                else {
                    data.push([i, j, 4]);
                }
            }
        }
        var floors = [];
        var rooms = ['1户', '2户', '3户', '4户', '5户', '6户']
        for (var i = 1; i <= 15; i++) {
            //floors.push(i + '层');
            var v = i
            if (i == 15) {
                v = i + '层'
            }
            floors.push({
                name: i + '层',
                value: v
            })
        }
        var chart4 = echarts.init(document.getElementById('JDGL004'))
        var chart5 = echarts.init(document.getElementById('JDGL005'))
        var chart6 = echarts.init(document.getElementById('JDGL006'))



        var option4 = {
            tooltip: {
                position: 'top'
            },
            grid: {
                left: '0%',
                right: '30%',
                bottom: '5%',
                top: '5%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: rooms,
                splitArea: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    color: '#fff',//'#475A96'
                    interval: 0,
                },
                position: 'top',
            },
            yAxis: {
                type: 'category',
                data: floors,
                axisLabel: {
                    show: true,
                    color: '#fff',
                    margin: 16,
                    interval: 0,
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false,
                },
                splitArea: {
                    show: true,
                },
            },
            visualMap: {
                type: 'piecewise',
                pieces: [{
                    value: '1',
                    label: '不合格',
                    color: '#E2E2E2'
                },
                {
                    value: 2,
                    name: '合格',
                    color: '#F1F1F1'
                },
                {
                    value: 3,
                    name: '空白',
                    color: '#FFA500'
                },
                {
                    value: 4,
                    name: '空白',
                    color: '#027F00'
                }
                ],
                show: false
            },
            series: [{
                name: '楼层验收',
                type: 'heatmap',
                data: data,
                label: {
                    normal: {
                        show: false,
                    }
                },
                itemStyle: {
                    normal: {
                        emphasis: {
                            label: {
                                show: true
                            },
                            shadowBlur: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.3)',
                        },
                        borderColor: '#162579',
                        borderWidth: 1
                    }

                }
            }]
        }

        var option5 = {
            tooltip: {
                position: 'top'
            },
            grid: {
                left: '0%',
                right: '30%',
                bottom: '5%',
                top: '5%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: rooms,
                splitArea: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    color: '#fff',//'#475A96'
                    interval: 0,
                },
                position: 'top',
            },
            yAxis: {
                type: 'category',
                data: floors,
                axisLabel: {
                    show: true,
                    color: '#fff',
                    margin: 16,
                    interval: 0,
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false,
                },
                splitArea: {
                    show: true,
                },
            },
            visualMap: {
                type: 'piecewise',
                pieces: [{
                    value: '1',
                    label: '不合格',
                    color: '#E2E2E2'
                },
                {
                    value: 2,
                    name: '合格',
                    color: '#F1F1F1'
                },
                {
                    value: 3,
                    name: '空白',
                    color: '#FFA500'
                },
                {
                    value: 4,
                    name: '空白',
                    color: '#027F00'
                }
                ],
                show: false
            },
            series: [{
                name: '楼层验收',
                type: 'heatmap',
                data: data,
                label: {
                    normal: {
                        show: false,
                    }
                },
                itemStyle: {
                    normal: {
                        emphasis: {
                            label: {
                                show: true
                            },
                            shadowBlur: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.3)',
                        },
                        borderColor: '#162579',
                        borderWidth: 1
                    }

                }
            }]
        }

        var option6 = {
            tooltip: {
                position: 'top'
            },
            grid: {
                left: '0%',
                right: '30%',
                bottom: '5%',
                top: '5%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: rooms,
                splitArea: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    color: '#fff',//'#475A96'
                    interval: 0,
                },
                position: 'top',
            },
            yAxis: {
                type: 'category',
                data: floors,
                axisLabel: {
                    show: true,
                    color: '#fff',
                    margin: 16,
                    interval: 0,
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false,
                },
                splitArea: {
                    show: true,
                },
            },
            visualMap: {
                type: 'piecewise',
                pieces: [{
                    value: '1',
                    label: '不合格',
                    color: '#E2E2E2'
                },
                {
                    value: 2,
                    name: '合格',
                    color: '#F1F1F1'
                },
                {
                    value: 3,
                    name: '空白',
                    color: '#FFA500'
                },
                {
                    value: 4,
                    name: '空白',
                    color: '#027F00'
                }
                ],
                show: false
            },
            series: [{
                name: '楼层验收',
                type: 'heatmap',
                data: data,
                label: {
                    normal: {
                        show: false,
                    }
                },
                itemStyle: {
                    normal: {
                        emphasis: {
                            label: {
                                show: true
                            },
                            shadowBlur: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.3)',
                        },
                        borderColor: '#162579',
                        borderWidth: 1
                    }

                }
            }]
        }





        chart4.clear();
        chart5.clear();
        chart6.clear();


        chart4.setOption(option4, true);
        chart5.setOption(option5, true);
        chart6.setOption(option6, true);


        window.addEventListener("resize", function () {
            chart4.clear();
            chart5.clear();
            chart6.clear();
            chart4.setOption(option4, true);
            chart5.setOption(option5, true);
            chart6.setOption(option6, true);



        });
    }


    // 去重
    function uniq(array) {
        var temp = []; //一个新的临时数组
        for (var i = 0; i < array.length; i++) {
            if (temp.indexOf(array[i]) == -1) {
                temp.push(array[i]);
            }
        }
        return temp;
    }

    return new Pro
})();

Progress.init()