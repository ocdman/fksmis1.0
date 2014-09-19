define(["jquery",
    "underscore",
    "backbone",
    "knockout",
    "helper",
    "plugins/map",
    "modules/base/manager_base",
    "modules/main_ui",
    "modules/page/equipment_manager",
    "plugins/jquery.plot/plugins/jqplot.cursor.min",
    "plugins/jquery.plot/plugins/jqplot.dateAxisRenderer.min",
    "plugins/jquery.plot/plugins/jqplot.categoryAxisRenderer.min",
    "plugins/jquery.plot/plugins/jqplot.barRenderer.min",
    "plugins/jquery.plot/plugins/jqplot.pointLabels.min",
    "plugins/jquery.plot/plugins/jqplot.canvasAxisTickRenderer.min",
    "plugins/jquery.plot/plugins/jqplot.canvasOverlay.min",
    "plugins/jquery.plot/plugins/jqplot.highlighter.min"],
function (a, b, c, d, e, f, g, h, i) {
    var j = g.extend({
        controller: "ReportInfo",
        $jqPlot: null,
        timeID: 0,
        reportType: "01",
        sortType: "01",
        LineData: {},
        serials: [],
        currentId: 0,
        isStop: !0,
        doInit: function (a, b) {
            var c = this;
            return c.base("doInit", [a], g) ? (c.doAddTab({
                title: a,
                iconCls: b,
                href: c.getHref(!1, c.controller, "DischargeIndex"),
                closable: !0,
                onLoad: function () {
                    c.render();
                }
            }), h.doAddModule(c.controller, a, c), !0) : !1
        },
        getTableColumns: function(){
            var a = this,
                b;
            return [[{
                field: "Discharge",
                title: "排放量",
                width: 100,
                sortable: !1
            },{
                field: "NickName",
                title: "用户名称",
                width: 100,
                sortable: !1
            }]];
        },
        doRenderChart: function (b) {
            var c = [[]];
            d = [];
            f = "";
            if (b && b.length) {
                j = b[0].DayDischargeBound;
                for (var g in b) {
                    var h = b[g];
                    void 0 != h.TimeUp && void 0 != h.Id && (f != h.TimeUp && (f = h.TimeUp, d.push(e.DateFormat(e.getUnixToTime1(f.replace("/Date(", "").replace(")/", "")), "yyyy/MM/dd"))), c[h.Id].push(h.YouYanND))
                }
                try {
                    this.doDrawChart(c, d, j)
                }
                catch (i) { }
            }
            else a.messager.alert("提示", "没有数据！", "warning");

            //var c = [];
            //d = [];
            //f = "";
            // if (b && b.length) {
            //    for (var g in b) {
            //        var h = b[g];
            //        void 0 != h.TimeUp && void 0 != h.Id && (f != h.TimeUp && (f = h.TimeUp, c.push([e.DateFormat(e.getUnixToTime1(f.replace("/Date(", "").replace(")/", "")), "yyyy/MM/dd"), h.YouYanND])));
            //    }
            //    try {
            //        this.doDrawChart(c, d)
            //    }
            //    catch (i) { }
            //}
            //else a.messager.alert("提示", "没有数据！", "warning");
        },
        doDrawChart: function (b, c, j) {
            var d = this;
            d.$jqPlot && d.$jqPlot.destroy();
            d.$jqPlot = a.jqplot("discharge", b, {
                animate: !0,
                animateReplot: !0,
                cursor: {
                    show: !0,
                    zoom: !0,
                    looseZoom: !0,
                    showTooltip: !1
                },
                seriesDefaults: {
                    renderer: a.jqplot.BarRenderer,
                    pointLabels: { show: !0 },
                    rendererOptions: {
                        fillToZero: !0,
                        animation: {
                            speed: 2500
                        },
                    },
                },
                series: [
                    {
                        label: "排放量"
                    },
                ],
                axesDefaults: {
                    pad: 0
                },
                axes: {
                    xaxis: {
                        renderer: a.jqplot.CategoryAxisRenderer,
                        ticks: c,
                    },
                    yaxis: {
                        pad: 1.05,
                        tickOptions: {
                            formatString: "%d 克"
                        },
                    },
                },
                canvasOverlay: {
                    show: true,
                    objects: [
                        {
                            horizontalLine: {
                                name: 'pebbles',
                                y: j,
                                lineWidth: 3,
                                xOffset: 0,
                                color: 'rgb(89, 198, 154)',
                                shadow: false
                            }
                        }
                    ]
                }
            })
            //$('#discharge').bind('jqplotDataHighlight',
            //    function (ev, seriesIndex, pointIndex, data) {
            //        $('#dischargeContent').html('日期： ' + c[pointIndex] + '，数据：' + data[1] + '克');
            //    })

        },
        render: function () {
            var b, c, d, e = this;
            b = e.$panel.find(".easyui-layout").layout(),
            c = b.layout("panel", "center"),
            d = b.layout("panel", "north"),
            f = e.$panel.find(".easyui-tabs").tabs({
                onSelect: function (a, b) {
                    1 == b && e.$table.datagrid("resize");
                }
            });
            e.$tablePanel = f.tabs("getTab", 0);
            e.doInitTable({
                rownumbers: !0,
                onLoadSuccess: function (a) {

                },
                onDbClickRow: a.noop,
                url: "",
                pagination: !0,
                pageSize: 50,
                pageList: [50]
            }, [], "", "");
            d.find("#reportType").combobox({
                required: !0,
                width: 150,
                onSelect: function (a) {
                    e.reportType = a.value;
                    if (a.value == "01") {
                        var yesterday = e.getYesterday(-1);
                        e.$searchBar.find(".startTime").datetimebox("setValue", yesterday + e.getStartHour());
                        e.$searchBar.find(".endTime").datetimebox("setValue", yesterday + e.getEndHour());
                    }
                    else if (a.value == "02") {
                        var lastweek = e.getYesterday(-7);
                        e.$searchBar.find(".startTime").datetimebox("setValue", lastweek + e.getStartHour());
                        e.$searchBar.find(".endTime").datetimebox("setValue", lastweek + e.getEndHour());
                    }
                }
            });
            d.find("#sortType").combobox({
                required: !0,
                width: 150,
                onSelect: function (a) {
                    e.sortType = a.value;
                }
            });
            d.find(".easyui-linkbutton").linkbutton({
                onClick: function () {
                    var b = a(this).attr("data-operation");
                    b && e[b] && e[b].call(e);
                }
            }),
            e.$searchBar = d;
        },
        doSearch: function () {
            var b = this;
            //c = b.$searchBar.find(".startTime").datebox("getValue");
            //d = b.$searchBar.find(".endTime").datebox("getValue");
            b.reportType && b.sortType && (b.$table.datagrid("options").url = b.getHref(!1, b.controller, "DischargeDataRow"),
            b.$table.datagrid("reload", {
                reportType: b.reportType,
                SortType: b.sortType
            }));
            //b.reportType && b.sortType && b.currentId && a.ajax({
            //    url: b.getHref(!1, b.controller, "DischargeDataRow"),
            //    data: {
            //        tableName: b.currentId,
            //        StartTime: c,
            //        EndTime: d,
            //        reportType: b.reportType,
            //        SortType: b.sortType
            //    },
            //    success: function (a) {
            //        console.log(a);
            //        b.doRenderChart(a);
            //    },
            //    error: function () {
            //        a.messager.alert("提示", "获取数据失败", "error");
            //    }
            //})
        },
        createReport: function(){
            var a = this;
            var strurl = '../ReportInfo/DischargeReporting' + '?reportType=' + a.reportType + '&sortType=' + a.sortType;
            window.open(strurl);
        },
        getYesterday: function (day) {
            var today = new Date();
            //var targetDayMilliseconds = today.getTime() + 1000 * 60 * 60 * day;
            //today.setTime(targetDayMilliseconds);

            var tYear = today.getFullYear();
            //var tMonth = today.getMonth() + 1;
            //var tDate = today.getDate() - 1;
            var tMonth = today.getMonth() + day;
            var tDate = today.getDate() - day;
            return tYear + "/" + tMonth + "/" + tDate;
        },
        getStartHour: function () {
            return " 00:00:00";
        },
        getEndHour: function(){
            return " 23:00:00";
        },
        dispose: function () {
            this.base("dispose");
        }
    });
    return j;
})