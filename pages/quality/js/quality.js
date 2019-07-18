var mySwiper = new Swiper('.swiper-container', {
    autoplay: {
        delay: 2000,
        stopOnLastSlide: false,
        disableOnInteraction: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
    },
});

var Quality = (function () {
    var Qua = function () {
        this.init = function () {
            // this.formatCLJCData();
            // 监理统计验收
            this.formatJLTJData();
            // 检查项统计
            this.formatJCXData();

            // this.formatZLXJData();
            // this.formatZLXJPieDate();
            this.formatTaskData();
            this.formatCheckData();
        }
    }

    // 材料进场
    Qua.prototype.formatCLJCData = function (res) {
        if (!res) return;
        var items = res;
        // console.log(items)
        var chart1 = echarts.init(document.getElementById('chart01'));
        var chart2 = echarts.init(document.getElementById('chart02'));
        var chart3 = echarts.init(document.getElementById('chart03'))
        var colorList = ['#EE1C19', '#FF9D47', '#F7F80A', '#006EFF', '#01CB01', '#835BFF','#EE1C19', '#FF9D47', '#F7F80A', '#006EFF'];
        var option1 = {
            tooltip: {
                trigger: 'item',
                formatter: function (items) {
                    // console.log(items)
                    return items.seriesName + '<br />' + items.name + ':' + items.value + '批(' + items.data.totalValue + '%)'
                }
            },
            series: (function () {
                var arr = [];
                var obj = {
                    name: '工程',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    center: ['50%', '50%'],
                    labelLine: {
                        normal: {
                            length: 2,
                            length2: 10
                        }
                    },
                    label: {
                        normal: {
                            formatter: '{b}',
                            color: '#fff',//#a8abe2
                            fontSize:14,
                        },

                    },
                    data: [],
                };
                items.forEach(function (item, i) {
                    var dataList = {
                        name: item.typeValueEx,
                        value: item.nodeType,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [{
                                        offset: 0,
                                        color: colorList[i]
                                    },
                                    {
                                        offset: 1,
                                        color: colorList[i]
                                    }
                                    ]
                                )
                            }
                        },
                        // 合格率的属性
                        totalValue: item.totalValue
                    }
                    obj.data.push(dataList);
                })
                arr.push(obj)
                return arr
            })()
        };


        var option2 = {

            grid: [{
                left: '28%',
                top: '10%',
                bottom: '1%',
            }],
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
                    color: '#fff',//#A8ABE2
                    formatter: function (val) {
                        var len = 6, strItems = []
                        for (var i = 0; i < val.length; i += len) {
                            strItems.push(val.substring(i, i + len) + '\n')
                        }
                        return strItems.join('')
                    },
                    interval: 0,
                    padding: [5, 0, 0, 0]
                },
                axisTick: {
                    show: false
                },
                data: (function () {
                    var firstList = [];
                    items.forEach(function (item, i) {
                        if (i <= 4) {
                            firstList.push(item.typeValueEx)
                        }
                    })
                    return firstList
                })()
            }],
            series: [{
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: '#1F2B57',
                    }
                },
                silent: true,
                barWidth: '60%',
                barGap: '-100%', // Make series be overlap
                data: (function () {
                    var num = [];
                    items.forEach(function (item, i) {
                        if (i <= 4) {
                            num.push(100)
                        }
                    })
                    return num
                })()
            }, {
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: '{c}批',
                        color: '#fff'//#5C60B6
                    }

                },
                data: (function () {
                    var numberList = [];
                    items.forEach(function (item, i) {
                        if (i <= 4) {
                            numberList.push(item.nodeType)
                        }
                    })
                    return numberList
                })(),
                itemStyle: {
                    normal: {
                        color: '#67F25F'
                    }

                },
                barWidth: '60%'
            }]
        };

        var option3 = {
            grid: [{
                left: '30%',
                top: '9%',
                bottom: '36%',
            }],
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
                    color: '#fff',//#A8ABE2
                },
                axisTick: {
                    show: false
                },
                data: (function () {
                    var secondList = [];
                    items.forEach(function (item, i) {
                        if (i > 4) {
                            secondList.push(item.typeValueEx)
                        }
                    })
                    return secondList
                })(),
            }],
            series: [{
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: '#1F2B57'
                    }
                },
                barWidth: '60%',
                silent: true,
                barGap: '-100%', // Make series be overlap
                data: (function () {
                    var num = [];
                    items.forEach(function (item, i) {
                        if (i > 4) {
                            num.push(20)
                        }
                    })
                    return num
                })()
            }, {
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: '{c}批',
                        color: '#fff'//#5C60B6
                    }
                },
                data: (function () {
                    var numberList = [];
                    items.forEach(function (item, i) {
                        if (i > 4) {
                            numberList.push(item.nodeType)
                        }
                    })
                    return numberList
                })(),
                itemStyle: {
                    normal: {
                        color: '#67F25F'
                    }

                },
                barWidth: '60%',
            }]
        }

        chart1.setOption(option1);
        chart2.setOption(option2);
        chart3.setOption(option3);
        window.addEventListener("resize", function () {
            chart1.resize();
            chart2.resize();
            chart3.resize();
        });
    }
    // 监理统计验收
    Qua.prototype.formatJLTJData = function (res) {
        if (!res) return;
        var items1 = res.data.items;
        // console.log(items1);
        var chart = echarts.init(document.getElementById('JLYS'));
        var option = {
            tooltip: {
                trigger: 'item',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: '{c}批'
            },
            grid: {
                top: '3%',
                left: '3%',
                right: '4%',
                bottom: '2%',
                containLabel: true
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
                    color: '#fff'//#A8ABE2
                },
                axisTick: {
                    show: false
                },
                data: ['一次验收合格', '二次验收合格']
            }],
            series: [{
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: 'rgba(30, 43, 87, 1)'
                    }
                },
                barWidth: '60%',
                silent: true,
                barGap: '-100%', // Make series be overlap
                data: [10, 10]
            }, {
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight',
                        formatter: '{c}批',
                        color: '#A8ABE2'
                    }
                },
                data: (function () {
                    var arr = [];
                    items1.forEach(function (item) {
                        if (item.type == 1) {
                            arr.push(item.typeValue)
                        }
                    })
                    return arr.reverse();
                })(),
                itemStyle: {
                    normal: {
                        color: '#68FC9A'
                    }

                },
                barWidth: '60%',
            }]
        }
        chart.setOption(option);
        window.addEventListener("resize", function () {
            chart.resize();

        });
    }
     

    // 检查项统计
    Qua.prototype.formatJCXData = function(res){
        console.log(res,'检查项统计')
        if(!res) return;
        var item=res.data.items;
        var DATA=[];
        var JLCheck=[];
        var SGCheck=[];
        item.forEach(function(item){
            if(item.type == 2){
                DATA.push(item.valueEx)
                SGCheck.push(item.typeValue)
            }else if(item.type== 4){
                DATA.push(item.valueEx)
                JLCheck.push(item.typeValue)
            }
        })
        var chart = echarts.init(document.getElementById('JCTJ'));
        var option={
            grid: {
                top:'20%',
                left: '3%',
                right: '4%',
                bottom: '5%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: DATA,
                axisLabel: {
                    show: true,
                    color: '#fff',//#A8ABE2
                    interval: 0,
                    formatter:function (val) {
                        var len=4,strItems=[]
                        for(var i = 0;i<val.length;i+=len){
                        strItems.push(val.substring(i,i+len)+'\n')
                        }
                        return strItems.join('')
                        
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle:{
                        color: 'rgba(64, 86, 211, 0.5)',
                    }
                },
                axisTick: {
                    show: false
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    show: false
                },
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                
            },
            series: [{
                data: JLCheck,
                type: 'bar',
                barWidth:'30%',
                itemStyle:{
                    normal: {
                        color: '#FA7045',
                    }
                },
                label:{
                    normal:{
                        show:true,
                        position:'top',
                        color:'#A8ABE2',
                    }
                }
            },{
                data: SGCheck,
                type: 'bar',
                barWidth:'30%',
                barGap: 0,
                itemStyle:{
                    normal: {
                        color: '#58F3FF',
                    }
                },
                label:{
                    normal:{
                        show:true,
                        position:'top',
                        color:'#A8ABE2',
                    }
                }
            }]
        }
        chart.setOption(option);
        window.addEventListener("resize", function () {
            chart.resize();

        });
    }
    // 质量巡检 树状图
    // Qua.prototype.formatZLXJData = function (res) {
    //     console.log(res, '树状图')
    //     if (!res) return;
    //     var items2 = res.data.items;
    //     console.log(items2.length, '长度');
    //     var chart4 = echarts.init(document.getElementById('XJJD'));
    //     var chart5 = echarts.init(document.getElementById('ZLXC'));
    //     var option1 = {
    //         grid: {
    //             top: '20%',
    //             left: '3%',
    //             right: '4%',
    //             bottom: '5%',
    //             containLabel: true
    //         },
    //         tooltip: {
    //             trigger: 'item',
    //             axisPointer: { // 坐标轴指示器，坐标轴触发有效
    //                 type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    //             },
    //             formatter: '{c}次'
    //         },
    //         xAxis: {
    //             type: 'category',
    //             data: (function () {
    //                 var firstList = [];
    //                 items2.forEach(function (item, i) {
    //                     if (item.type === 1) {
    //                         if (i <= 4) {
    //                             firstList.push(item.valueEx)
    //                         }
    //                     }
    //                 })
    //                 return firstList
    //             })(),
    //             axisLabel: {
    //                 show: true,
    //                 color: '#fff',//#A8ABE2
    //                 interval: 0,
    //                 formatter: function (val) {
    //                     var len = 6, strItems = []
    //                     for (var i = 0; i < val.length; i += len) {
    //                         strItems.push(val.substring(i, i + len) + '\n')
    //                     }
    //                     return strItems.join('')

    //                 }
    //             },
    //             axisLine: {
    //                 show: true,
    //                 lineStyle: {
    //                     color: 'rgba(64, 86, 211, 0.5)',
    //                 }
    //             },
    //             axisTick: {
    //                 show: false
    //             },
    //         },
    //         yAxis: {
    //             type: 'value',
    //             axisLabel: {
    //                 show: false
    //             },
    //             axisLine: {
    //                 show: false,
    //             },
    //             splitLine: {
    //                 show: false
    //             },
    //             axisTick: {
    //                 show: false
    //             },

    //         },
    //         series: [{
    //             data: [100, 100, 100, 100, 100],
    //             type: 'bar',
    //             barWidth: '25%',
    //             silent: true,
    //             barGap: '-100%',
    //             itemStyle: {
    //                 normal: {
    //                     color: '#1F2B57',
    //                 }
    //             },
    //         }, {
    //             data: (function () {
    //                 var firstList = [];
    //                 items2.forEach(function (item, i) {
    //                     if (item.type === 1) {
    //                         if (i <= 4) {
    //                             firstList.push(item.typeValue)
    //                         }
    //                     }
    //                 })
    //                 return firstList
    //             })(),
    //             type: 'bar',
    //             barWidth: '25%',
    //             itemStyle: {
    //                 normal: {
    //                     color: '#67F25F',
    //                 }
    //             },
    //             label: {
    //                 normal: {
    //                     show: true,
    //                     position: 'top',
    //                     color: '#A8ABE2',
    //                     formatter: '{c}次'
    //                 }
    //             }
    //         }]
    //     }
    //     var option2 = {
    //         grid: {
    //             top: '20%',
    //             left: '3%',
    //             right: '4%',
    //             bottom: '5%',
    //             containLabel: true
    //         },
    //         tooltip: {
    //             trigger: 'item',
    //             axisPointer: { // 坐标轴指示器，坐标轴触发有效
    //                 type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    //             },
    //             formatter: '{c}次'
    //         },
    //         xAxis: {
    //             type: 'category',
    //             data: (function () {
    //                 var firstList = [];
    //                 items2.forEach(function (item, i) {
    //                     if (item.type === 1) {
    //                         if (i > 4 && i < 10) {
    //                             firstList.push(item.valueEx)
    //                         }
    //                     }

    //                 })
    //                 return firstList
    //             })(),
    //             axisLabel: {
    //                 show: true,
    //                 color: '#fff',//#A8ABE2
    //                 interval: 0,
    //                 formatter: function (val) {
    //                     var len = 6, strItems = []
    //                     for (var i = 0; i < val.length; i += len) {
    //                         strItems.push(val.substring(i, i + len) + '\n')
    //                     }
    //                     return strItems.join('')

    //                 }
    //             },
    //             axisLine: {
    //                 show: true,
    //                 lineStyle: {
    //                     color: 'rgba(64, 86, 211, 0.5)',
    //                 }
    //             },
    //             axisTick: {
    //                 show: false
    //             },
    //         },
    //         yAxis: {
    //             type: 'value',
    //             axisLabel: {
    //                 show: false
    //             },
    //             axisLine: {
    //                 show: false,
    //             },
    //             splitLine: {
    //                 show: false
    //             },
    //             axisTick: {
    //                 show: false
    //             },

    //         },
    //         series: [{
    //             data: [100, 100, 100, 100, 100],
    //             type: 'bar',
    //             barWidth: '25%',
    //             silent: true,
    //             barGap: '-100%',
    //             itemStyle: {
    //                 normal: {
    //                     color: '#1F2B57',
    //                 }
    //             },
    //         }, {
    //             data: (function () {
    //                 var firstList = [];
    //                 items2.forEach(function (item, i) {
    //                     if (i > 4 && i < 10) {
    //                         firstList.push(item.typeValue)
    //                     }
    //                 })
    //                 return firstList
    //             })(),
    //             type: 'bar',
    //             barWidth: '25%',
    //             itemStyle: {
    //                 normal: {
    //                     color: '#67F25F',
    //                 }
    //             },
    //             label: {
    //                 normal: {
    //                     show: true,
    //                     position: 'top',
    //                     color: '#A8ABE2',
    //                     formatter: '{c}次'
    //                 }
    //             }
    //         }]
    //     }
    //     chart4.clear();
    //     chart5.clear();
    //     chart4.setOption(option1, true);
    //     chart5.setOption(option2, true);
    //     window.addEventListener("resize", function () {
    //         chart4.resize();
    //         chart5.resize();
    //     });
    // }


    //质量巡检  饼状图
    // Qua.prototype.formatZLXJPieDate = function (res) {
    //     if (!res) return;
    //     var items = res.data.items;
    //     var arr = [];
    //     var data = [];
    //     var radius = ['65%', '80%'];
    //     var center = [['12%', '60%'], ['37%', '60%'], ['62%', '60%'], ['87%', '60%']];
    //     var left = ['11%', '36%', '61%', '86%',];
    //     var nameList = ['待处理', '已逾期', '未验收', '已关闭'];
    //     var colorList = ['#FEFF07', '#FF0402', '#F2F2FF', '#3B5B4B']
    //     items.forEach(function (item) {
    //         if (item.type === 2) {
    //             arr.push(item);
    //             var name = item.typeValueEx.split('|')
    //             data.push(name)
    //         }
    //     })
    //     //console.log(arr, data)
    //     var chart = echarts.init(document.getElementById('pie01'));
    //     var option = {
    //         title: (function () {
    //             var titleInfo = [];
    //             arr.forEach(function (item, i) {
    //                 var fn = function (item) {
    //                     var len = 5;
    //                     strItems = [];
    //                     var itemName = item.valueEx;
    //                     for (var i = 0; i < itemName.length; i += len) {
    //                         strItems.push(itemName.substring(i, i + len) + '\n')

    //                     }
    //                     return strItems.join('')
    //                 };
    //                 var obj = {
    //                     text: fn(item),
    //                     left: left[i],
    //                     top: '50%',
    //                     textStyle: {
    //                         fontSize: 12,
    //                         color: '#fff',//#9193BF
    //                     },
    //                     textAlign: 'center',
    //                 }
    //                 titleInfo.push(obj)
    //             })
    //             return titleInfo
    //         })(),
    //         tooltip: {
    //             trigger: 'item',
    //             formatter: "{b} : {c} ({d}%)"
    //         },
    //         series: (function () {
    //             var peiInfo = [];
    //             data.forEach(function (item, i) {
    //                // console.log(item)
    //                 var obj = {
    //                     type: 'pie',
    //                     radius: radius,
    //                     center: center[i],
    //                     labelLine: {
    //                         normal: {
    //                             length: 2,
    //                             length2: 6
    //                         }
    //                     },
    //                     label: {
    //                         normal: {
    //                             formatter: '{c}',
    //                             color: 'rgba(255,255,255,0.8)'
    //                         }
    //                     },
    //                     data: [],
    //                 };
    //                 item.forEach(function (item, i) {
    //                     var dataList = {
    //                         name: nameList[i],
    //                         value: item,
    //                         itemStyle: {
    //                             normal: {
    //                                 color: colorList[i]
    //                             }
    //                         }
    //                     }
    //                     obj.data.push(dataList)
    //                 })
    //                 peiInfo.push(obj);
    //             })
    //             return peiInfo;
    //         })(),



    //     }
    //     chart.setOption(option);

    //     window.addEventListener("resize", function () {
    //         chart.resize();
    //     });
    // }



    // 质量巡查
    Qua.prototype.formatCheckData=function(res){
        if(!res) return;
        var Data=res.data.items;
        console.log(Data,'树状图数据');
        var arrList=[];
        var data=[];
        var dataO=[];
        var dataS=[];
        var dataT=[];
        var dataF=[];
        // Data.forEach(function(item){
        //     item.type=2
        //     item.typeValueEx=(Math.random() * 20).toFixed(0)+'|'+(Math.random() * 20).toFixed(0)+'|'+(Math.random() * 20).toFixed(0)+'|'+(Math.random() * 20).toFixed(0)
        // })
        Data.forEach(function(items){
            if(items.type==2){
                arrList.push(items)
                var name=items.typeValueEx.split('|')
                data.push(name)
            }
        })
        console.log(arrList,data,'数据处理')
        for(var i = 0; i < data.length; i++){
            dataO[i] = data[i][0]
            dataS[i] = data[i][1]
            dataT[i] = data[i][2]
            dataF[i] = data[i][3]
        }
        console.log(dataO,dataS,dataT,dataF)
        var chart = echarts.init(document.getElementById('XJJD'));
        var option={
            grid: {
                top:'3%',
                left: '3%',
                right: '4%',
                bottom: '0%',
                containLabel: true
            },
            tooltip: {
                trigger: 'item',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: '{c}次'
            },
            xAxis: {
                type: 'value',
                axisLabel: {
                    show: false
                },
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
            },
            yAxis: {
                type: 'category',
                data:(function(){
                    var arr=[];
                    arrList.forEach(function(item){
                        arr.push(item.valueEx)
                    })
                    return arr;
                })(),
                axisLabel: {
                    show: true,
                    color: '#fff',
                    interval: 0,
                    padding: [6, 0, 0, 0],
                    formatter:function (val) {
                        var len=6,strItems=[]
                        for(var i = 0;i<val.length;i+=len){
                        strItems.push(val.substring(i,i+len)+'\n')
                        }
                        return strItems.join('')
                        
                    }
                },
                axisLine: {
                    show: false,
                    lineStyle:{
                        color: 'rgba(64, 86, 211, 0.5)',
                    }
                },
                axisTick: {
                    show: false
                },
                
            },
            series: [
                {
                type: 'bar',
                stack: '总量',
                barWidth: '50%',
                label: {
                    normal: {
                        show: true,
                        color:'#fff',
                        position:'insideLeft'
                    }
                },
                data:dataO,
                itemStyle: {
                    normal: {
                        color: '#FC9A27',
                    }
                }
            },
            {
         
                type: 'bar',
                stack: '总量',
                barWidth: '50%',
                label: {
                    normal: {
                        show: true,
                        color:'#fff',
                        position:'insideLeft'
                    }
                },
                data: dataS,
                itemStyle: {
                    normal: {
                        color: '#EB6257',
                    }
                }
            },
            {
          
                barWidth: '50%',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        color:'#fff',
                        position:'insideLeft'
                    }
                },
                data: dataT,
                itemStyle: {
                    normal: {
                        color: '#4092FF',
                    }
                }
            },
            { 
                barWidth: '50%',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        color:'#fff',
                        position:'insideLeft'
                    }
                },
                data:dataF,
                itemStyle: {
                    normal: {
                        color: '#94C553',
                    }
                }
            }
        ]
        }
        chart.clear();
        chart.setOption(option,true);

        window.addEventListener("resize", function () {
            chart.resize();
        });
    }



    //任务统计 
    Qua.prototype.formatTaskData = function (res) {
        if(!res) return;
        var dataL=res.data
        var chart = echarts.init(document.getElementById('LWTJ'));
        var colorList = ['#FEFF07', '#01C804', '#FF0402'];
        var itemName = ['整改中', '整改完成', '已逾期']
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c}批 ({d}%)'
            },
            series: [{
                name: '工程',
                type: 'pie',
                radius: ['50%', '70%'],
                center: ['30%', '50%'],
                labelLine: {
                    normal: {
                        length: 2,
                        length2: 15
                    }
                },
                label: {
                    normal: {
                        formatter: '{c}',
                        color: 'rgba(255,255,255,0.8)'
                    },

                },

                data: (function () {
                    var dataList = [];
                    dataL.forEach(function (item, i) {
                        var data = {
                            name: itemName[i],
                            value: item.statusCount,
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [{
                                            offset: 0,
                                            color: colorList[i]
                                        },
                                        {
                                            offset: 1,
                                            color: colorList[i]
                                        }
                                        ]
                                    )
                                }

                            }
                        }
                        dataList.push(data)

                    })
                    return dataList;
                })()
            }]
        }
        chart.setOption(option);

        window.addEventListener("resize", function () {
            chart.resize();
        });
    }

    return new Qua
})();

console.log(Quality)
Quality.init()