/*! fks 24-07-2014 */
define(["jquery",
    "underscore",
    "backbone",
    "knockout",
    "helper",
    "plugins/map",
    "modules/base/manager_base",
    "modules/main_ui",
    "modules/page/equipment_manager",
    "plugins/js/highcharts"],
function (a, b, c, d, e, f, g, h, i) {
    var j = g.extend({
        controller: "DataAnalyse",
        $jqPlot: null,
        timeID: 0,
        LineData: {},
        serials: [],
        curerntId: 0,
        isStop: !0,
        factor: 10,
        getTableColumns: function () {
            var a = this;
            return [[{
                field: "ProbeID",
                title: "探测器号",
                width: 60,
                sortable: !1
            },
            {
                field: "TimeUp",
                title: "时间",
                width: 150,
                sortable: !1,
                formatter: function (b) {
                    return e.DateFormat(e.getUnixToTime1(b.replace("/Date(", "").replace(")/", "")), "yyyy-MM-dd HH:mm:ss")
                }
            },
            {
                field: "YouYanND",
                title: "浓度(mg/m³)",
                width: 60,
                sortable: !1,
                formatter: function (b) {
                    //return (a.factor / b).toFixed(1)
                    return (b > 100) ? 0 : e.getYouYanND(b);
                }
            },
            {
                field: "YouYanSD",
                title: "湿度(%)",
                width: 60,
                sortable: !1,
                formatter: function (b) {
                    return (b == 255) ? 0 : b;
                }
            },
            {
                field: "YouYanWD",
                title: "温度(℃)",
                width: 60,
                sortable: !1,
                formatter: function (b) {
                    return (b == 255) ? 0 : e.getYouYanWD(b);
                }
            },
            {
                field: "ZTjhq",
                title: "净化器状态",
                width: 60,
                sortable: !1,
                formatter: function (a) {
                    return a ? "开" : "关"
                }
            },
            {
                field: "ZTfj",
                title: "风机状态",
                width: 60,
                sortable: !1,
                formatter: function (a) {
                    return a ? "开" : "关"
                }
            },
            {
                field: "ZTsb",
                title: "系统状态",
                width: 60,
                sortable: !1,
                formatter: function (a) {
                    return a ? "故障" : "正常"
                }
            },
            {
                field: "Id",
                title: "洁净度",
                width: 110,
                sortable: !1,
                formatter: function (b, c, d) {
                    return d = Math.floor(c.YouYanND / 20, 0),
                    d >= 5 && (d = 4),
                    a.getLevel(d)
                }
            }]]
        },
        doInit: function (a, b) {
            var c = this;
            return c.base("doInit", [a], g) ? (c.doAddTab({
                title: a,
                iconCls: b,
                href: c.getHref(!1, c.controller, "MonitorDataIndex"),
                closable: !0,
                onLoad: function () {
                    c.render()
                }
            }), h.doAddModule(c.controller, a, c), !0) : !1
        },
        doRenderChart: function (a) {
            var b = {},
            c = [];
            if (a && a.length) {
                for (var d in a) {
                    var f = a[d];
                    b[f.ProbeID + "ND"] || (b[f.ProbeID + "ND"] = [], c.push(
                        f.ProbeID + "浓度"
                    )),
                    b[f.ProbeID + "WD"] || (b[f.ProbeID + "WD"] = [], c.push(
                        f.ProbeID + "温度"
                    )),
                    b[f.ProbeID + "SD"] || (b[f.ProbeID + "SD"] = [], c.push(
                        f.ProbeID + "湿度"
                    ));
                    if (f.ProbeID == 1) {
                        b["FJ"] || (b["FJ"] = [], c.push("风机"));
                        b["JHQ"] || (b["JHQ"] = [], c.push("净化器"));
                    }
                    b[f.ProbeID + "ND"].push([e.getUnixToTime2(f.TimeUp.replace("/Date(", "").replace(")/", "")), (f.YouYanND > 100) ? 0 : parseFloat(e.getYouYanND(f.YouYanND))]),
                    b[f.ProbeID + "WD"].push([e.getUnixToTime2(f.TimeUp.replace("/Date(", "").replace(")/", "")), parseFloat(e.getYouYanWD(f.YouYanWD))]),
                    b[f.ProbeID + "SD"].push([e.getUnixToTime2(f.TimeUp.replace("/Date(", "").replace(")/", "")), f.YouYanSD]);
                    if (f.ProbeID == 1) {
                        b["FJ"].push([e.getUnixToTime2(f.TimeUp.replace("/Date(", "").replace(")/", "")), (f.ZTfj == true) ? 1 : 0]);
                        b["JHQ"].push([e.getUnixToTime2(f.TimeUp.replace("/Date(", "").replace(")/", "")), (f.ZTjhq == true) ? 1 : 0])
                    }
                }
                var g = [];
                var i = 0;
                for (var d in b) {
                    g.push({
                        name: c[i++],
                        data: b[d]
                    });
                }
                try {
                    this.doDrawChart(g)
                } catch (h) { }
            }
        },
        doDrawChart: function (b) {
            $('#monitor').highcharts({
                credits: {
                    enabled: false
                },
                title: {
                    text: '油烟监测曲线图',
                    x: -20 //center
                },
                subtitle: {
                    //text: 'Source: WorldClimate.com',
                    x: -20
                },
                chart: {
                    zoomType: 'xy'
                },
                xAxis: {
                    type: 'datetime',
                    labels: {
                        //step: 2,
                        formatter: function () {
                            return Highcharts.dateFormat('%Y-%m-%d', this.value);
                        }
                    }
                },
                yAxis: {
                    title: {
                        //text: 'Temperature (°C)'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    //valueSuffix: '°C'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                plotOptions: {
                    series: {
                        marker: {
                            radius: 0
                        },
                    }
                },
                //series: [{
                //    name: '油烟浓度1',
                //    data: b[0]
                //}, {
                //    name: '油烟温度1',
                //    data: b[1]
                //}, {
                //    name: '油烟湿度1',
                //    data: b[2]
                //}]
                series: b
            });
        },
        render: function () {
            var b, c, ee, f = this;
            b = f.$panel.find(".easyui-layout").layout(),
            c = b.layout("panel", "center"),
            ee = b.layout("panel", "north"),
            b.layout("collapse", "east"),
            f.$tablePanel = b.layout("panel", "east"),
            f.doInitTable({
                rownumbers: !0,
                onLoadSuccess: function (a) {
                    f.doRenderChart(a.rows)
                },
                pageSize: 300,
                pageList: [300],
                onDblClickRow: a.noop,
                url: ""
            },
            [], "", ""),
            ee.find(".EquipInfo").combogrid({
                idField: i.prototype.idField,
                textField: i.prototype.textField,
                url: f.getHref(!1, i.prototype.controller, "DataRowIndex"),
                columns: i.prototype.getTableColumns.call(this),
                width: 150,
                panelWidth: 450,
                required: !0,
                pagination: !0,
                onSelect: function (a, b) {
                    f.curerntId = b.CollectionCode
                }
            }),
            ee.find(".dataType").combobox({
                url: f.getHref(!0, "scripts", "datas", "datatype.js"),
                width: 150,
                method: "get"
            }),
            ee.find(".easyui-linkbutton").linkbutton({
                onClick: function () {
                    var b = a(this).attr("data-operation");
                    b && f[b] && f[b].call(f)
                }
            }),
            ee.find(".startTime").datetimebox("setValue", e.getCurrentTime(-2)),
            ee.find(".endTime").datetimebox("setValue", e.getCurrentTime(0)),
            f.$searchBar = ee,
            f.dataViewModel = d.mapping.fromJS({
                Id: 1,
                ZTfj: !1,
                ZTjhq: !1,
                ZTsb: !1
            },
            {
                key: function (a) {
                    return d.utils.unwrapObservable(a.Id)
                }
            }),
            d.applyBindings(f.dataViewModel, ee[0])
        },
        doSearch: function () {
            var a = this,
            b = a.$searchBar.find(".startTime").datetimebox("getValue"),
            c = a.$searchBar.find(".endTime").datetimebox("getValue"),
            d = a.$searchBar.find(".dataType").combobox("getValue");
            b && c && d && a.curerntId && (a.$table.datagrid("options").url = a.getHref(!1, a.controller, "MonitorDataRow"), a.$table.datagrid("reload", {
                tableName: a.curerntId,
                StartTime: b,
                EndTime: c,
                Interval: d
            }))
        },
        dispose: function () {
            this.base("dispose")
        }
    });
    return j
});