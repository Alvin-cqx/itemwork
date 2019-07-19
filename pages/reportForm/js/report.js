var Security = (function () {
    var Sec = function () {
        this.init = function () {
            this.statisticsList()

        }
    }
    //考勤机
    Sec.prototype.statisticsList = function (res) {
        console.log(res.personAttenceList, '考勤机');
        // var onPagechange = function (page) {
        //     console.log('当前点击页码', page);
        // }

        // var obj = {
        //     wrapid: 'wrap1', //页面显示分页器容器id
        //     total: 200, //总条数
        //     pagesize: 10, //每页显示10条
        //     currentPage: 1, //当前页
        //     onPagechange: onPagechange,
        //     //btnCount:7 页数过多时，显示省略号的边界页码按钮数量，可省略，且值是大于5的奇数
        // }
        // pagination.init(obj);


        var inde = 2
        var shuj = [] //考勤机数据
        $(".astwsf").empty()//整体布局的删除
        $(".astwsf").append(' <table cellspacing="0" id="dyzt01">    <tr>        <td style="width:50px">序</td>        <td style="width:15%">单位 </td>        <td style="width:7%">职务</td>        <td style="width:7%" id="dyzt01-index">姓名</td>            <td style="width:100px;">总出勤天数</td>    </tr></table>')
        //$("#dyzt01").append('<tr><td style="width:50px">序</td><td style="width:200px">单位 </td><td style="width:100px">职务</td><td style="width:100px">姓名</td><td style="width:100px" id="dyzt01-index">月份</td><td style="width:100px">总出勤天数</td></tr>')

        res.personAttenceList.forEach(function (currentValue, index) {
            // console.log(currentValue);
            inde++
            shuj.push(currentValue.monthStatistics)
            var companyName = currentValue.companyName ? currentValue.companyName : ''
            var manageTypeName = currentValue.manageTypeName ? currentValue.manageTypeName : ''
            var personnelName = currentValue.personnelName ? currentValue.personnelName : ''
            var totalDays = currentValue.totalDays ? currentValue.totalDays : ''
            var month = currentValue.month ? currentValue.month : ''
            if(month<10){
                month = month.substr(1)
            }
            $("#dyzt01 tbody").append(' <tr>  <td>' + (index+1) + '</td>  <td>' + companyName + ' </td>  <td>' + manageTypeName + '</td>  <td>' + personnelName + '</td>  <td>' + totalDays + '</td></tr>')
        })
        //console.log(res, '总共多少天')
        $("#dyzt01-index").after('<td rowspan="' + inde + '" class="td_table"><div class="date_table" id="dyzt01-bott">   </div></td>')
        // $("#dyzt01-bott").append('<table cellspacing="0"><tr><td colspan="2">1</td><td colspan="2">2</td><td colspan="2">3</td><td colspan="2">4</td><td colspan="2">5</td><td colspan="2">6</td><td colspan="2">7</td><td colspan="2">8</td><td colspan="2">9</td><td colspan="2">10</td><td colspan="2">11</td><td colspan="2">12</td><td colspan="2">13</td><td colspan="2">14</td><td colspan="2">15</td><td colspan="2">16</td><td colspan="2">17</td><td colspan="2">18</td><td colspan="2">19</td><td colspan="2">20</td><td colspan="2">21</td><td colspan="2">22</td><td colspan="2">23</td><td colspan="2">24</td><td colspan="2">25</td><td colspan="2">26</td><td colspan="2">27</td><td colspan="2">28</td><td colspan="2">29</td><td colspan="2">30</td><td colspan="2">31</td></tr><tr><td>上班</td><td>下班</td><td>上班</td><td>下班</td><td>上班</td><td>下班</td><td>上班</td><td>下班</td><td>上班</td><td>下班</td><td>上班</td><td>下班</td><td>上班</td><td>下班</td><td>上班</td><td>下班</td><td>上班</td><td>下班</td><td>上班</td><td>下班</td><td>上班</td><td>下班</td><td>上班</td><td>下班</td><td>上班</td><td>下班</td><td>上班</td><td>下班</td><td>上班</td><td>下班</td><td>上班</td><td>下班</td><td>上班</td><td>下班</td><td>上班</td><td>下班</td><td>上班</td><td>下班</td><td>上班</td><td>下班</td><td>上班</td><td>下班</td><td>上班</td><td>下班</td><td>上班</td><td>下班</td><td>上班</td><td>下班</td><td>上班</td><td>下班</td><td>上班</td><td>下班</td><td>上班</td><td>下班</td><td>上班</td><td>下班</td><td>上班</td><td>下班</td><td>上班</td><td>下班</td><td>上班</td><td>下班</td></tr></table>')
        var s = shuj[0].length
     
        var html = ''
        var HTML=''
        for (var i = 1; i <= s; i++) {
            html += '<td colspan="2">' + i + '</td>'
           
        }
        for (var j = 1; j <= s; j++) {
         
            HTML+='<td>上班</td><td>下班</td>'
        }
   
        $("#dyzt01-bott").append('<table cellspacing="0"><tr>' + html +'<tr>'+HTML+'</tr></tr></table>')

        var l = 0 //id数
        shuj.forEach(function (currentValue, index) { //信息
            l++
            $("#dyzt01-bott table").append('<tr class="' + ("diop" + l) + '"></tr>')
            // var html = ''
            // for (var i = 1; i <= 31; i++) {
            //     html += '<td></td><td></td>'
            // }
            // var segf = ".diop" + l
            // $(segf).append(html)
            currentValue.forEach(function (currentValue, index) {
                var segf = ".diop" + l //确定往什么id里添加数据
                var data = currentValue.inTime ? currentValue.inTime : ''
                var data1 = currentValue.outTime ? currentValue.outTime : ''
                $(segf).append('<td>' + data +'</td><td>' + data1 + '</td>')
                // var html = ''
                // for (var i = 1; i <= 31; i++) {
                //     html += '<td>'+data+'</td>'+data1+'<td></td>'
                // }
                // var segf = ".diop" + l
                // $(segf).append(html)

            })

        })
        //$("#dyzt01-bott").append()

    };
    //门禁
    Sec.prototype.minjin = function (res) {
        console.log(res, '门禁');
        // var onPagechange = function (page) {
        //     console.log('当前点击页码', page);
        // }

        // var obj = {
        //     wrapid: 'wrap2', //页面显示分页器容器id
        //     total: 200, //总条数
        //     pagesize: 10, //每页显示10条
        //     currentPage: 1, //当前页
        //     onPagechange: onPagechange,
        //     //btnCount:7 页数过多时，显示省略号的边界页码按钮数量，可省略，且值是大于5的奇数
        // }
        // pagination.init(obj);

        var inde = 2
        var shuj = [] //门禁数据
        $(".table_bott").empty()//整体布局的删除
        // $(".table_bott").append('<div class="form_table" id="dyzt02">        <table cellspacing="0">            <tr>                <td style="width:50px">序</td>                <td style="width:15%">单位 </td>                <td style="width:7%">职务</td>                <td style="width:7%">姓名</td>                <td style="width:100px">身份证</td>                <td style="width:100px" id="dyzt02-index">月份</td>                <td style="width:100px;">月总时长统计</td>            </tr>        </table>    </div>')
        $(".table_bott").append('<div class="form_table" id="dyzt02">        <table cellspacing="0">            <tr>                <td style="width:50px">序</td>                <td style="width:15%">单位 </td>                <td style="width:100px">职务</td>                <td style="width:7%" id="dyzt02-index">姓名</td>                           <td style="width:7%;">月总时长统计</td>            </tr>        </table>    </div>')
        res.personelInJobList.forEach(function (currentValue, index) {
            //console.log(currentValue);
            inde++
            shuj.push(currentValue.monthStatistics);
            var companyName=currentValue.companyName?currentValue.companyName:'';
            var manageTypeName=currentValue.manageTypeName?currentValue.manageTypeName:'';
            var personnelName=currentValue.personnelName?currentValue.personnelName:''
            var idCard=currentValue.idCard?currentValue.idCard:'';
            var month=currentValue.month?currentValue.month:'';
            var totalTimes=currentValue.totalTimes?currentValue.totalTimes:'';
            $("#dyzt02 tbody").append(' <tr>  <td>' + (index+1) + '</td>  <td>' + companyName + ' </td>  <td>' + manageTypeName + '</td>  <td>' + personnelName + '</td><td>' + totalTimes + '</td> </tr>')
        })
        $("#dyzt02-index").after('<td rowspan="' + inde + '" class="td_table"><div class="date_table" id="dyzt02-bott">   </div></td>')
        // $("#dyzt02-bott").append('<table cellspacing="0"><tr><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td><td>21</td><td>22</td><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td><td>29</td><td>30</td><td>31</td></tr><tr>    <td colspan="31">在岗信息</td></tr></table>')
        console.log(shuj, 'shuj');
        var s = shuj[0].length
     
        var html = ''
        for (var i = 1; i <= s; i++) {
            html += '<td>' + i + '</td>'
        }
        $("#dyzt02-bott").append('<table cellspacing="0"><tr>' + html + '<tr>    <td colspan="31">在岗信息</td></tr></tr><tr>')
        var l = 0 //id数
        shuj.forEach(function (currentValue, index) {
            l++
            $("#dyzt02-bott table").append('<tr class="' + ("diot" + l) + '"></tr>')
            currentValue.forEach(function (currentValue, index) {
                var segf = ".diot" + l //确定往什么id里添加数据
                var data = currentValue.totalTime ? currentValue.totalTime : ''
                $(segf).append('<td>' + data + '</td>')

            })
        }) //信息

    }
    // 劳务人员在岗时长
    Sec.prototype.laowryzgsc = function (res) {
        //console.log(res);


        // var onPagechange = function (page) {
        //     console.log('当前点击页码', page);
        // }

        // var obj = {
        //     wrapid: 'wrap3', //页面显示分页器容器id
        //     total: 200, //总条数
        //     pagesize: 10, //每页显示10条
        //     currentPage: 1, //当前页
        //     onPagechange: onPagechange,
        //     //btnCount:7 页数过多时，显示省略号的边界页码按钮数量，可省略，且值是大于5的奇数
        // }
        // pagination.init(obj);




        var inde = 2
        var shuj = [] //考勤机数据
        $(".dyzt-lp").empty()//整体布局的删除
        $(".dyzt-lp").append('<div class="form_table" id="dyzt03"><table cellspacing="0"><tr>                <td style="width:50px">序</td>                <td style="width:15%">单位 </td>                <td style="width:7%">班组</td>                <td style="width:7%">人员类型</td>                <td style="width:100px" id="dyzt03-index">姓名</td>           <td style="width:7%">月总时长统计</td>            </tr>        </table>    </div>')
        res.personelInJobList.forEach(function (currentValue, index) {
            //console.log(currentValue);
            inde++
            shuj.push(currentValue.monthStatistics)
            var companyName=currentValue.companyName?currentValue.companyName:'';
            var teamName=currentValue.teamName?currentValue.teamName:'';
            var personnelTypeName=currentValue.personnelTypeName?currentValue.personnelTypeName:'';
            var personnelName=currentValue.personnelName?currentValue.personnelName:'';
            var idCard=currentValue.idCard?currentValue.idCard:'';
            var month=currentValue.month?currentValue.month:'';
            var totalTimes=currentValue.totalTimes?currentValue.totalTimes:'';
            $("#dyzt03 tbody").append(' <tr>  <td>' +  (index+1)  + '</td>  <td>' + companyName + ' </td>  <td>' + teamName + '</td>  <td>' + personnelTypeName + '</td>  <td>' +personnelName + '</td> <td>' +totalTimes + '</td> </tr>')
        })
        // console.log(shuj);
        $("#dyzt03-index").after('<td rowspan="' + inde + '" class="td_table"><div class="date_table" id="dyzt03-bott">   </div></td>')
        // $("#dyzt03-bott").append('<table cellspacing="0"><tr><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td><td>21</td><td>22</td><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td><td>29</td><td>30</td><td>31</td></tr><tr>    <td colspan="31">在岗信息</td></tr></table>')
        var s = shuj[0].length
     
        var html = ''
        for (var i = 1; i <= s; i++) {
            html += '<td>' + i + '</td>'
        }
        $("#dyzt03-bott").append('<table cellspacing="0"><tr>' + html + '<tr>    <td colspan="31">在岗信息</td></tr></tr><tr>')
        var l = 0 //id数
        shuj.forEach(function (currentValue, index) {
            l++
            $("#dyzt03-bott table").append('<tr class="' + ("dioq" + l) + '"></tr>')
            currentValue.forEach(function (currentValue, index) {
                var segf = ".dioq" + l //确定往什么id里添加数据
                var data = currentValue.totalTime ? currentValue.totalTime : ''
                $(segf).append('<td>' + data + '</td>')

            })
        }) //信息

    }
    //住建局
    Sec.prototype.kaoqji = function (res) {

        // // 分页调用功能
        // var onPagechange = function (page) {
        //     console.log('当前点击页码', page);
             
        // }

        // var obj = {
        //     wrapid: 'wrap5', //页面显示分页器容器id
        //     total: 200, //总条数
        //     pagesize: 10, //每页显示10条
        //     currentPage: 1, //当前页
        //     onPagechange: onPagechange,
        //     //btnCount:7 页数过多时，显示省略号的边界页码按钮数量，可省略，且值是大于5的奇数
        // }
        // pagination.init(obj);











        // console.log(res);
        //console.log($("#dyzt05"));
        $(".table_05-bott").empty()//整体布局的删除
        $(".table_05-bott").append('<div class="form_table" id="dyzt05">        <table cellspacing="0">            <tr>                <td style="width:15%">单位</td>                <td style="width:7%">姓名 </td>                <td style="width:7%">工种</td>                <td style="width:7%">班组</td>                <td style="width:7%" id="dyzt05-index">入职日期</td>                           <td style="width:100px">实勤工时</td>            </tr>        </table>    </div>')
        var inde = 2
        var shuj = [] //住建局数据
        res.personelInJobList.forEach(function (currentValue, index) {
            //console.log(currentValue);
            inde++
            shuj.push(currentValue.monthStatistics)
            var companyName=currentValue.companyName?currentValue.companyName:''
            var personnelName=currentValue.personnelName?currentValue.personnelName:''
            var workTypeName=currentValue.workTypeName?currentValue.workTypeName:''
            var teamName=currentValue.teamName?currentValue.teamName:''
            var inJobDate=currentValue.inJobDate?currentValue.inJobDate:''
            var month=currentValue.month?currentValue.month:''
            var totalTimes=currentValue.totalTimes?currentValue.totalTimes:''
            //$("#dyzt05 tbody").append(' <tr >   <td>'+currentValue.companyName+' </td>  <td>'+currentValue.personnelName+'</td>  <td>'+currentValue.workTypeName+'</td>  <td>'+currentValue.teamName+'</td>  <td>'+currentValue.inJobDate+'</td><td>'+currentValue.month+'</td><td>'+currentValue.totalTimes+'</td>')
            $("#dyzt05 tbody").append(' <tr>  <td>' + companyName + '</td>  <td>' + personnelName + ' </td>  <td>' +workTypeName + '</td>  <td>' + teamName + '</td>  <td>' + inJobDate + '</td><td>' + totalTimes + '</td>   </tr>')
        })
        //console.log(shuj);
     
        $("#dyzt05-index").after('<td rowspan="' + inde + '" class="td_table"><div class="date_table" id="dyzt05-bott">   </div></td>')
        var l = shuj[0].length
        console.log('设备详情数据', shuj, l)
        var html = ''
        for (var i = 1; i <= l; i++) {
            html += '<td>' + i + '</td>'
        }
        $("#dyzt05-bott").append('<table cellspacing="0"><tr>' + html + '</tr><tr>')
        // $("#dyzt05-bott").append('<table cellspacing="0"><tr><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td><td>21</td><td>22</td><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td><td>29</td><td>30</td><td>31</td></tr><tr>    ')
        var l = 0 //id数
        shuj.forEach(function (currentValue, index) {
            l++
            $("#dyzt05-bott table").append('<tr class="' + ("diom" + l) + '"></tr>')
            currentValue.forEach(function (currentValue, index) {
                var segf = ".diom" + l //确定往什么id里添加数据
                var data = currentValue.totalTime ? currentValue.totalTime : ''
                $(segf).append('<td>' + data + '</td>')

            })
        }) //信息

    }
    //动火申请
    Sec.prototype.donhuosq = function (res) {
        // console.log(res.fireApplyStatistics,res.fireApplyStatistics.applyCount,res.fireApplyStatistics.safetyOfficerCount,res.fireApplyStatistics.supervisionCount,res.fireApplyStatistics.probability);
        // console.log($("#dhsq"), $("#dhsq2"),$("#dhsq3"), $("#dhsq4"))
        $("#dhsq").html('动火次数：' + res.fireApplyStatistics.applyCount + '')
        $("#dhsq2").html('安全员上传:' + res.fireApplyStatistics.safetyOfficerCount + '')
        $("#dhsq3").html('监理上传：' + res.fireApplyStatistics.supervisionCount + '')
        $("#dhsq4").html('监理动火检查率：' + res.fireApplyStatistics.probability + '')
        // $(".dhsq").empty()
        // $(".dhsq2").empty()
        // $(".dhsq3").empty()
        // $(".dhsq4").empty()
        $(".donhsq").empty()//整体布局的删除
        $(".donhsq").append('<table cellspacing="0" style="" id="dyzt06"  ><tr><td>序号</td><td>总包</td><td>上传人</td><td>安全员</td><td>上传人</td><td>监理</td><td>上传人</td></tr></table>')
        res.fireApplyStatistics.fireApplyList.forEach(function (currentValue, index) {
            
            //console.log(currentValue, 'tongji');
            var mainContractorName = currentValue.mainContractorName ? currentValue.mainContractorName : '';
            var safetyOfficerName = currentValue.safetyOfficerName ? currentValue.safetyOfficerName : '';
            var supervisionName = currentValue.supervisionName ? currentValue.supervisionName : '';
            var mainContractorTime = currentValue.mainContractorTime ? currentValue.mainContractorTime : '';
            var safetyOfficerTime = currentValue.safetyOfficerTime ? currentValue.safetyOfficerTime : '';
            var supervisionTime = currentValue.supervisionTime ? currentValue.supervisionTime : '';
            if (index > 9) return
            $("#dyzt06").append('<tr><td>' + (index + 1) + '</td><td>' + mainContractorTime + '</td><td>' + mainContractorName + '</td><td>' + safetyOfficerTime + '</td><td>' + safetyOfficerName + '</td><td>' + supervisionTime + '</td><td>' + supervisionName + '</td></tr>')
        })
    }

    //设备列表
    Sec.prototype.sheblb = function (res) {
      
        res.deviceList.forEach(function (currentValue, index) {
            if(index===0){
                $('.table_04 .allChoose').html(currentValue.deviceName)
                $('.table_04 .allChoose').attr('id',currentValue.deviceCode)
            }
             
            $("#shebchax").append('<li><a href="javascript:void(0)" id=' + currentValue.deviceCode + '>' + currentValue.deviceName + '</a></li>')

            
        })
     
  
    }


    //设备详情
    Sec.prototype.shebxq = function (res) {
        //console.log("进入操作");
        //console.log(res);

        // if (res.daysStatistics) {
        //     var onPagechange = function (page) {
        //         console.log('当前点击页码', page);
        //     }

        //     var obj = {
        //         wrapid: 'wrap4', //页面显示分页器容器id
        //         total: 18891, //总条数
        //         pagesize: 10, //每页显示10条
        //         currentPage: 1, //当前页
        //         onPagechange: onPagechange,
        //         //btnCount:7 页数过多时，显示省略号的边界页码按钮数量，可省略，且值是大于5的奇数
        //     }
        //     pagination.init(obj);
        // }



        var inde = 2
        var shuj = [] //设备数据

        console.log('dyzt04-top')
        $(".dyzt04-top").empty();

        //添加布局
        $(".dyzt04-top").append('<div class="form_table" id="dyzt04">        <table cellspacing="0">            <tr class="dyige">                <td style="width:100px" id="dyzt04-index">日期</td>                <td style="width:90px">月最大值</td>            </tr>        </table>    </div>')
        for (var tp = 0; tp <= res.daysStatistics.length - 1; tp++) {
            inde++
            shuj.push(res.daysStatistics[tp].dayValueList)
            //console.log(res.daysStatistics.length);
            if (tp == res.daysStatistics.length - 1) {
                console.log(tp);
                $("#dyzt04 tbody").append(' <tr>  <td>' + res.daysStatistics[tp].name + '</td> <td>' + res.daysStatistics[tp].maxValue + '</td> </td>')
                //环境预警值
                $("#dyzt04 tbody").append('<tr><td colspan="13">    <p>环境预警值</p>    <p>        <span>PM2.5：<strong>60ug/m3</strong></span>        <span>PM10：<strong>60ug/m3</strong></span>        <span>噪音：<strong>70dB</strong></span>        <span>扬尘：<strong>75ug/m³</strong></span>        <span>温度：<strong>35℃</strong></span>    </p></td></tr>')
            } else {
                $("#dyzt04 tbody").append(' <tr>  <td>' + res.daysStatistics[tp].name + '</td> <td>' + res.daysStatistics[tp].maxValue + '</td> </td>')
            }

        }
        var l = shuj[0].length
        console.log('设备详情数据', shuj, l)
        var html = ''
        for (var i = 1; i <= l; i++) {
            html += '<td>' + i + '</td>'
        }
        // 原本是inde 改成了10
        $("#dyzt04-index").after('<td rowspan="' + 10 + '" class="td_table"><div class="date_table" id="dyzt04-bott">   </div></td>');
        $("#dyzt04-bott").append('<table cellspacing="0"><tr>' + html + '</tr><tr>')
        // $("#dyzt04-bott").append('<table cellspacing="0"><tr><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td><td>21</td><td>22</td><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td><td>29</td><td>30</td><td>31</td></tr><tr>    ')
        var l = 0 //id数
        shuj.forEach(function (currentValue, index) {
            l++
            index++
            $("#dyzt04-bott table").append('<tr class="' + ("diox" + l) + '"></tr>')
            if(index==1){
                currentValue.forEach(function(Value){
                    var data = Value.dayValue ? Value.dayValue : ''
                    $('.diox1').append('<td>' + data + '</td>')
                })
            }else if(index==2){
                currentValue.forEach(function(Value){
                    var data = Value.dayValue ? Value.dayValue : ''
                    $('.diox2').append('<td>' + data + '</td>')
                })
            }else if(index==3){
                currentValue.forEach(function(Value){
                    var data = Value.dayValue ? Value.dayValue : ''
                    $('.diox3').append('<td>' + data + '</td>')
                })
            }else if(index==4){
                currentValue.forEach(function(Value){
                    var data = Value.dayValue ? Value.dayValue : ''
                    num=parseFloat(data);
                    num>35?$('.diox4').append('<td class="warm">' + data + '</td>'): $('.diox4').append('<td>' + data + '</td>');
                    $('.diox4 .warm').css('color','red')
                })
            }else if(index==5){
                currentValue.forEach(function(Value){
                    var data = Value.dayValue ? Value.dayValue : ''
                    $('.diox5').append('<td>' + data + '</td>')
                })
            }else if(index==6){
                currentValue.forEach(function(Value){
                    var data = Value.dayValue ? Value.dayValue : ''
                    num=parseFloat(data);
                    num>60?$('.diox6').append('<td class="warm">' + data + '</td>'): $('.diox6').append('<td>' + data + '</td>');
                    $('.diox6 .warm').css('color','red')
                })
            }else if(index==7){
                currentValue.forEach(function(Value){
                    var data = Value.dayValue ? Value.dayValue : ''
                    num=parseFloat(data);
                    num>60?$('.diox7').append('<td class="warm">' + data + '</td>'): $('.diox7').append('<td>' + data + '</td>');
                    $('.diox7 .warm').css('color','red')
                })
            }else if(index==8){
                currentValue.forEach(function(Value){
                    var data = Value.dayValue ? Value.dayValue : ''
                    num=parseFloat(data);
                    num>70?$('.diox8').append('<td class="warm">' + data + '</td>'): $('.diox8').append('<td>' + data + '</td>');
                    $('.diox8 .warm').css('color','red')
                })
            }else if(index==9){
                currentValue.forEach(function(Value){
                    var data = Value.dayValue ? Value.dayValue : ''
                    num=parseFloat(data);
                    num>75?$('.diox9').append('<td class="warm">' + data + '</td>'): $('.diox9').append('<td>' + data + '</td>');
                    $('.diox9 .warm').css('color','red')
                })
            }
            
            // currentValue.forEach(function (currentValue, index) {
               
            //     var segf = ".diox" + l //确定往什么id里添加数据
            //     var data = currentValue.dayValue ? currentValue.dayValue : ''
            //     $(segf).append('<td>' + data + '</td>')

            // })
        })

    }



    return new Sec
})()