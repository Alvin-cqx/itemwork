 //gcjc
 
//  renderGCJC('chart01', 'chart02','chart03')

 function renderGCJC(id01, id02,id03) {
     var chart1 = echarts.init(document.getElementById(id01))
     var chart2 = echarts.init(document.getElementById(id02))
     var chart3 = echarts.init(document.getElementById(id03))
   
     chart1.setOption({
         
         tooltip: {
             trigger: 'item',
             formatter: '{a} <br/>{b} : {c}批 ({d}%)'
         },
         series: [{
             name: '工程',
             type: 'pie',
             radius: ['50%', '70%'],
             center: ['50%', '60%'],
             label: {
                 normal: {
                     formatter: '{b}',
                     color: 'rgba(255,255,255,0.8)'
                 },

             },

             data: [{
                 name: '地坪涂装材料',
                 value: 7,
                 itemStyle: {
                     normal: {
                         color: new echarts.graphic.LinearGradient(
                             0, 0, 0, 1,
                             [{
                                     offset: 0,
                                     color: '#3CFFFA'
                                 },
                                 {
                                     offset: 1,
                                     color: '#3CFFFA'
                                 }
                             ]
                         )
                     }
                 }

             }, {
                 name: '干混砂浆',
                 value: 10,
                 itemStyle: {
                     normal: {
                         color: new echarts.graphic.LinearGradient(
                             0, 0, 0, 1,
                             [{
                                     offset: 0,
                                     color: 'rgba(150,62,200,0.45)'
                                 },
                                 {
                                     offset: 1,
                                     color: 'rgba(166,51,255,1)'
                                 }
                             ]
                         )
                     }

                 }

             }, {
                 name: '湿拌砂浆',
                 value: 15,
                 itemStyle: {
                     normal: {
                         color: new echarts.graphic.LinearGradient(
                             0, 0, 0, 1,
                             [{
                                     offset: 0,
                                     color: 'rgba(43,75,255,0.45)'
                                 },
                                 {
                                     offset: 1,
                                     color: 'rgba(43,76,255,1)'
                                 }
                             ]
                         )
                     }
                 }

             }, {
                 name: '幕墙',
                 value: 23,
                 itemStyle: {
                     normal: {
                         color: new echarts.graphic.LinearGradient(
                             0, 0, 0, 1,
                             [{
                                     offset: 0,
                                     color: 'rgba(159,0,244,0.5)'
                                 },
                                 {
                                     offset: 1,
                                     color: 'rgba(255,0,184,1)'
                                 }
                             ]
                         )
                     }

                 }

             }, {
                 name: '护栏',
                 value: 23,

                 itemStyle: {
                     normal: {
                         color: new echarts.graphic.LinearGradient(
                             0, 0, 0, 1,
                             [{
                                     offset: 0,
                                     color: 'rgba(0,147,255,0.5)'
                                 },
                                 {
                                     offset: 1,
                                     color: 'rgba(0,147,255,0.98)'
                                 }
                             ]
                         )
                     }

                 }

             },{
                name: '石材',
                value: 5,

                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [{
                                    offset: 0,
                                    color: '#FF00B8'
                                },
                                {
                                    offset: 1,
                                    color: '#FF00B8'
                                }
                            ]
                        )
                    }

                }

            },{
                name: '防火门窗',
                value: 7,

                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [{
                                    offset: 0,
                                    color: '#3CFFFA'
                                },
                                {
                                    offset: 1,
                                    color: '#3CFFFA'
                                }
                            ]
                        )
                    }

                }

            },{
                name: '防火卷帘门',
                value: 8,

                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [{
                                    offset: 0,
                                    color: 'rgba(159,0,244,0.5)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(255,0,184,1)'
                                }
                            ]
                        )
                    }

                }

            },{
                name: '幕螺纹钢筋',
                value: 5,

                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [{
                                    offset: 0,
                                    color: '#002AFF'
                                },
                                {
                                    offset: 1,
                                    color: '#002AFF'
                                }
                            ]
                        )
                    }

                }

            }]
         }]
     })
     chart2.setOption({
         grid:[{
            left:'28%',
            top:'20%',
            bottom:'30%',
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
                 color: '#A8ABE2'
             },
             axisTick: {
                 show: false
             },
             data: ['防火卷帘门', '防火门窗', '石材', '护栏', '幕墙']
         }],
         series: [{
            type: 'bar',
            itemStyle: {
                normal: {
                    color: '#223185'
                }
            },
            silent: true,
            barWidth:'40%',
            barGap: '-100%', // Make series be overlap
            data: [10, 10, 10, 10,10]
        },{
             type: 'bar',
             label: {
                 normal: {
                     show: true,
                     position: 'right',
                     formatter: '{c}批',
                     color: '#5C60B6'
                 }
             },
             data: [7, 8, 9, 4, 6],
             itemStyle: {
                 normal: {
                     color: '#00B0ED'
                 }

             },
             barWidth:'40%'
         }]

     })
     chart3.setOption({
        grid:[{
            left:'30%',
            top:'20%',
            bottom:'30%',
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
                color: '#A8ABE2'
            },
            axisTick: {
                show: false
            },
            data: ['干混砂浆', '湿拌砂浆', '地坪涂装材料', '盘圆钢筋', '幕螺纹钢筋']
        }],
        series: [{
           type: 'bar',
           itemStyle: {
               normal: {
                   color: 'rgba(34, 49, 133, 1)'
               }
           },
           barWidth:'40%',
           silent: true,
           barGap: '-100%', // Make series be overlap
           data: [10, 10, 10, 10,10]
       },{
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: '{c}批',
                    color: '#5D72B5'
                }
            },
            data: [7, 8, 9, 4, 6],
            itemStyle: {
                normal: {
                    color: 'rgba(0,176,237,1)'
                }

            },
            barWidth:'40%',
        }]

    })
    window.addEventListener("resize", function () {
        chart1.resize();
        chart2.resize();
        chart3.resize();
    });
    
 }
 //gcjc_pie
 // 经济指标
//  renderJJZB('jjjszb01')
//  renderJJZB('jjjszb02')
//  renderJJZB('jjjszb03')

 function renderJJZB(id) {
     var chart = echarts.init(document.getElementById(id))
     if (id == 'jjjszb01') {
         var firstColor = 'rgba(4,71,255,0.1)'
         var secColor = 'rgba(72,121,255,1)'
         var data = ['天鹅堡A栋']
         var value = 50
     }
     if (id == 'jjjszb02') {
         var firstColor = 'rgba(255,0,184,0.1)'
         var secColor = 'rgba(255,0,184,1)'
         var data = ['天鹅堡B栋']
         var value = 80
     }
     if (id == 'jjjszb03') {
         var firstColor = 'rgba(3,247,255,0.06)'
         var secColor = 'rgba(9,236,243,1)'
         var data = ['天鹅堡C栋']
         var value = 60
     }
     chart.setOption({
         title: {
             text: data[0],
             left: '48%',
             bottom: 20,
             textAlign: 'center',
             textStyle: {
                 fontSize: 14,
                 color: '#9193BF'
             }
         },

         tooltip: {
             position: 'top'
         },
         xAxis: [{
             type: 'category',

             axisLine: {
                 show: false
             },

             axisTick: {
                 show: false
             },
             axisLabel: {
                 show: false
             },
             data: data,
         }],
         yAxis: [{
             type: 'value',
             max: 100,
             min: 0,
             axisLine: {
                 show: false
             },
             axisTick: {
                 show: false
             },
             axisLabel: {
                 show: false,
             },
             splitLine: {
                 show: false
             },
         }],

         series: [{
                 type: 'bar',
                 itemStyle: {
                     normal: {
                         color: 'rgba(18,20,101,0.3)'
                     }
                 },
                 silent: true,
                 barGap: '-100%',
                 barCategoryGap: '40%',
                 data: [100, 100, 100],
                 animation: false,
             },
             {
                 type: 'bar',
                 zlevel: 3,
                 markLine: {
                     symbol: ['none', 'none'],
                     label: {
                         normal: {
                             show: false
                         }
                     },
                     lineStyle: {
                         normal: {
                             color: '#A8ABE2',
                             width: 1
                         }
                     },
                     data: [{
                         yAxis: value
                     }]
                 },
                 data: [{
                     value: value,
                     itemStyle: {
                         normal: {
                             color: new echarts.graphic.LinearGradient(
                                 0, 0, 0, 1,
                                 [{
                                         offset: 0,
                                         color: firstColor
                                     },
                                     {
                                         offset: 1,
                                         color: secColor
                                     }
                                 ]
                             )
                         }
                     },
                 }],
             }

         ]
     })
  
 }

// 简历验收统计
rederJLYS('JLYS')
function rederJLYS(item1) {
    var chart = echarts.init(document.getElementById(item1))
  
    chart.setOption({
        tooltip: {
            trigger: 'item',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: '{c}%'
        },
        grid: {
            top:'10%',
            left: '3%',
            right: '4%',
            bottom: '6%',
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
                color: '#A8ABE2'
            },
            axisTick: {
                show: false
            },
            data: ['二次验收合格', '一次验收合格']
        }],
        series: [{
           type: 'bar',
           itemStyle: {
               normal: {
                   color: 'rgba(34, 49, 133, 1)'
               }
           },
           barWidth:'60%',
           silent: true,
           barGap: '-100%', // Make series be overlap
           data: [100, 100]
       },{
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight',
                    formatter: '{c}%',
                    color: '#000000'
                }
            },
            data: [70, 80],
            itemStyle: {
                normal: {
                    color: '#68FC9A'
                }

            },
            barWidth:'60%',
        }]

    })

    window.addEventListener("resize", function () {
        chart.resize();
      
    });
}
// 不合格检查
//rederJCTJ()
function rederJCTJ(){
    var chart = echarts.init(document.getElementById('JCTJ')) 
    chart.setOption({
        grid: {
            top:'20%',
            left: '3%',
            right: '4%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['绑扎钢筋网','受力钢筋','绑扎钢筋骨架','预埋件','层钢筋弯起点位置','安装位置受力钢筋'],
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
            data: [300,200,200,300,200,200],
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
            data: [240,250,260,210,300,250],
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
    })
 
    window.addEventListener("resize", function () {
        chart.resize();
      
    });
}
 // 质量巡查
//  renderXJJD('XJJD')
//  renderXJJD('ZLXC')
 function renderXJJD(id1) {
     var chart = echarts.init(document.getElementById(id1))
     chart.setOption({
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
            data: ['卫生器具支架阀门','室内顶棚','管道接口坡道支架','室内墙面','雨罩台阶/坡度/散水','屋面','楼梯踏步/护栏','室外墙面','室内地面','变形缝雨水管'],
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
            // {
            //     data: [90, 90, 90, 90, 90,90,90,90,90,90],
            //     type: 'bar',
            //     barWidth: '50%',
            //     silent: true,
            //     barGap: '-100%',
            //     itemStyle: {
            //         normal: {
            //             color: '#061a57',
            //         }
            //     },
            // },
            {
            type: 'bar',
            stack: '总量',
            barWidth: '50%',
            label: {
                normal: {
                    show: true,
                    color:'#fff'
                }
            },
            data: [8, 14, 11, 12, 10,16,18,22,17,11],
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
                    color:'#fff'
                }
            },
            data: [12, 14, 11, 12, 10,16,18,22,17,11],
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
                    color:'#fff'
                }
            },
            data: [19, 14, 11, 12, 10,16,18,22,17,11],
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
                    color:'#fff'
                }
            },
            data: [10, 20, 15, 10, 10,25,15,20,24,14],
            itemStyle: {
                normal: {
                    color: '#94C553',
                }
            }
        }
    ]
    })
 
    
     window.addEventListener("resize", function () {
        chart.resize();
      
    });
 }

 // 质量巡检
//  renderYDJK('pie01')
 function renderYDJK(id) {
     var chart = echarts.init(document.getElementById(id));

     chart.setOption({
         title: [{
                text: '屋面',
                left:'11%',
                top:'50%',
                textStyle: {
                    fontSize: 12,
                    color: '#9193BF'
                },
                textAlign: 'center'
             },
             {
                 text: '饰面板',
                 left:'36%',
                 top:'50%',
                 textStyle: {
                     fontSize: 12,
                     color: '#9193BF'
                 },
                 textAlign: 'center'
             },
             {
                text: '石材幕墙',
                left:'61%',
                top:'50%',
                textStyle: {
                    fontSize: 12,
                    color: '#9193BF'
                },
                textAlign: 'center'
            },
            {
                text: '涂饰工程',
                left:'86%',
                top:'50%',
                textStyle: {
                    fontSize: 12,
                    color: '#9193BF'
                },
                textAlign: 'center'
            }
         ],
       
         tooltip: {
             trigger: 'item',
             formatter: "{b} : {c} ({d}%)"
         },
         series: [{
             type: 'pie',
             radius: ['50%', '65%'],
             center: ['12%', '60%'],
             labelLine:{
                normal:{
                    length:2,
                    length2:6
                }
             },
             label: {
                 normal: {
                     formatter: '{c}',
                     color: 'rgba(255,255,255,0.8)'
                 }
             },
             data: [{
                 name: '超期未整改',
                 value: 15,
                 itemStyle: {
                     normal: {
                        color: 'rgba(35, 121, 255, 1)'
                     }
                 }

             }, {
                 name: '整改中',
                 value: 11,
                 itemStyle: {
                     normal: {
                         color:'rgba(255, 209, 78, 1)'
                     }
                 }

             }, {
                 name: '不合格',
                 value: 15,
                 itemStyle: {
                     normal: {
                        color: 'rgba(0, 255, 248, 1)'
                     }
                 }

             }, {
                 name: '合格',
                 value: 11,
                 itemStyle: {
                     normal: {
                         color:'rgba(131, 91, 255, 1)'
                     }
                 }

             }]
         }, {
             type: 'pie',
             radius: ['50%', '65%'],
             center: ['37%', '60%'],
             labelLine:{
                normal:{
                    length:2,
                    length2:6
                }
             },
             label: {
                 normal: {
                     formatter: '{c}',
                     color: 'rgba(255,255,255,0.8)'
                 }
             },
             data: [{
                 name: '超期未整改',
                 value: 15,
                 itemStyle: {
                     normal: {
                        color: 'rgba(35, 121, 255, 1)'
                     }
                 }

             }, {
                 name: '整改中',
                 value: 11,
                 itemStyle: {
                    normal:{
                        color:'rgba(255, 209, 78, 1)'
                    }
                 }

             }, {
                 name: '不合格',
                 value: 15,
                 itemStyle: {
                     normal: {
                        color: 'rgba(0, 255, 248, 1)'
                     }
                 }

             }, {
                 name: '合格',
                 value: 11,
                 itemStyle: {
                     normal: {
                        color:'rgba(131, 91, 255, 1)'
                     }
                 }

             }]
         }, {
             type: 'pie',
             radius: ['50%', '65%'],
             center: ['62%', '60%'],
             labelLine:{
                normal:{
                    length:2,
                    length2:6
                }
             },
             label: {
                 normal: {
                     formatter: '{c}',
                     color: 'rgba(255,255,255,0.8)'
                 }
             },
             data: [{
                 name: '超期未整改',
                 value: 15,
                 itemStyle: {
                     normal: {
                        color: 'rgba(35, 121, 255, 1)'
                     }
                 }

             }, {
                 name: '整改中',
                 value: 11,
                 itemStyle: {
                     normal: {
                        color:'rgba(255, 209, 78, 1)'
                     }
                 }

             }, {
                 name: '不合格',
                 value: 15,
                 itemStyle: {
                     normal: {
                        color: 'rgba(0, 255, 248, 1)'
                     }
                 }

             }, {
                 name: '合格',
                 value: 11,
                 itemStyle: {
                     normal: {
                        color:'rgba(131, 91, 255, 1)'
                     }
                 }

             }]
         },{
             type: 'pie',
             radius: ['50%', '65%'],
             center: ['87%', '60%'],
             labelLine:{
                normal:{
                    length:2,
                    length2:6
                }
             },
             label: {
                 normal: {
                     formatter: '{c}',
                     color: 'rgba(255,255,255,0.8)'
                 }
             },
             data: [{
                 name: '超期未整改',
                 value: 15,
                 itemStyle: {
                     normal: {
                         color: 'rgba(35, 121, 255, 1)'
                     }
                 }

             }, {
                 name: '整改中',
                 value: 11,
                 itemStyle: {
                     normal: {
                        color:'rgba(255, 209, 78, 1)'
                     }
                 }

             }, {
                 name: '不合格',
                 value: 15,
                 itemStyle: {
                     normal: {
                         color: 'rgba(0, 255, 248, 1)'
                     }
                 }

             }, {
                 name: '合格',
                 value: 11,
                 itemStyle: {
                    normal:{
                        color:'rgba(131, 91, 255, 1)'
                    }
                 }
             }]
         } ]
     
     
     
     
        
        })
     window.addEventListener("resize", function () {
        chart.resize();
      
    });
   
 }


//  实测实量
renderFloor('scslLeft')
function renderFloor(id) {
    var data = []
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 24; j++) {
            if (i == 2 && (j == 6 || j == 7)) {
                data.push([i, j, false]);
            } else {
                data.push([i, j, true]);
            }
        }
    }
    // console.log(data)
    var floors = [];
    var rooms = ['A', 'B', 'C', 'D']
    for (var i = 1; i <= 24; i++) {
        //floors.push(i + '层');
        var v = i
        if (i == 24) {
            v = i + '层'
        }
        if(i == 1){
            v = i + '层'
        }
        floors.push({
            name: i + '层',
            value: v
        })
    }
    var chart = echarts.init(document.getElementById(id))
    chart.setOption({

        tooltip: {
            position: 'top',
            formatter: function (items) {
                // console.log(items)
                var dotHtml=items.marker
                if(items.value[2]==true){
                    items.value[2]="合格"
                }else if(items.value[2]==false){
                    items.value[2]="不合格"
                }
                return (items.value[1]+1)+'层'+items.name +  '<br />'+dotHtml+(items.value[2])
            }
        },
        grid: {
            left: '2%',
            right: '4%',
            bottom: 0,
            top: '6%',
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
                color: '#fff',//#A8ABE2
                
            },
            position:'top',
        },
        yAxis: {
            type: 'category',
            data: floors,
            axisLabel: {
                show: true,
                color: '#fff',//#A8ABE2
                // margin: 16,
                interval:0, 
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
            // axisLabel:{
            //     interval:0, 
            // }
        },
        visualMap: {
            type: 'piecewise',
            pieces: [{
                    value: true,
                    label: '合格',
                    color: '#91D7FF'
                },
                {
                    value: false,
                    name: '不合格',
                    color: '#9193BF'
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
                    borderWidth: 2
                }

            }
        }]
    });
    window.addEventListener("resize", function () {
        chart.resize();
      
    });
   
}



renderHGL()
function renderHGL() {
    var chart = echarts.init(document.getElementById('scslRight'))
    chart.setOption({
        // title: {
        //     text: '合格率:',
        //     top:'10%',
        //     padding:[0,0,0,25],
        //     textStyle:{
        //         fontSize:'14',
        //         color:'#A8ABE2'
        //     }
        // },
        // tooltip: {
        //     trigger: 'item',
        //     axisPointer: { // 坐标轴指示器，坐标轴触发有效
        //         type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        //     },
        //     formatter: '{c}批'
        // },
        grid: {
            left: '2%',
            right: '2%',
            bottom: '-6%',
            top: '12%',
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
                color: '#fff',//#A8ABE2
                interval:0,
            },
            axisTick: {
                show: false,
                interval:0,
            },
            interval:0,
            data: ['pc构件尺寸', '高经真毒结\n构面平整', '方正性', '钢筋保护层\n厚度', '楼板厚度', '顶楼水平度', '垂直度', '外墙墙面\n平整度',
                '内墙墙面平\n整度', '截面尺寸']
        }],
        series: [{
           type: 'bar',
           itemStyle: {
               normal: {
                   color: '#1F2B57'
               }
           },
           silent: true,
           barWidth:'70%',
           barGap: '-100%', // Make series be overlap
           data: [10, 10, 10, 10,10,10,10,10,10,10]
           },
            {
                name: '利润',
                type: 'bar',
                barWidth:'70%',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight',
                        formatter: '{c}批',
                        color: '#212c54',//#141869
                    }
                },
                data: [7, 8, 6, 6, 8, 6, 8, 3, 9, 6],
                itemStyle: {
                    normal: {
                        color: '#67F25F'
                    }

                }
            }

        ]
    })
    window.addEventListener("resize", function () {
        chart.resize();
      
    });
   
}

//renderLWTJ()
function renderLWTJ(){
    var chart = echarts.init(document.getElementById('LWTJ'))
    chart.setOption({    
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}批 ({d}%)'
        },
        series: [{
            name: '工程',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['30%', '50%'],
            labelLine:{
                normal:{
                    length:2,
                    length2:15
                }
            },
            label: {
                normal: {
                    formatter: '{c}',
                    color: 'rgba(255,255,255,0.8)'
                },

            },

            data: [{
                name: '地坪涂装材料',
                value: 13,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [{
                                    offset: 0,
                                    color: '#01C804'
                                },
                                {
                                    offset: 1,
                                    color: '#01C804'
                                }
                            ]
                        )
                    }
                }

            }, {
                name: '干混砂浆',
                value: 10,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [{
                                    offset: 0,
                                    color: '#FEFF07'
                                },
                                {
                                    offset: 1,
                                    color: '#FEFF07'
                                }
                            ]
                        )
                    }

                }

            }, {
                name: '湿拌砂浆',
                value: 85,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [{
                                    offset: 0,
                                    color: '#FF0402'
                                },
                                {
                                    offset: 1,
                                    color: '#FF0402'
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

// showSelect(name)
// function showSelect(name){
//     $(name).find('span').each(function(){
//         $(this).click(function(){
//             $(this).parent().find('ul').show();
//             $(this).parent().siblings().find('ul').hide();
//         })
//     })
    
// }
// chooseItem(name)
// function chooseItem(name){
//     $(name).find('ul li').each(function () {
//         $(this).on('click', function () {
//             $(this).parent().parent().find('.infoName').text($(this).html())
//             $(this).parent().parent().find('ul').slideToggle()
//         })
// })
// }