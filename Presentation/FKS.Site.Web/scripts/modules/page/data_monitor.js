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
    "plugins/jquery.plot/plugins/jqplot.cursor.min",
    "plugins/jquery.plot/plugins/jqplot.dateAxisRenderer.min",
    "plugins/jquery.plot/plugins/jqplot.logAxisRenderer.min",
    "plugins/jquery.plot/plugins/jqplot.canvasTextRenderer.min",
    "plugins/jquery.plot/plugins/jqplot.canvasAxisTickRenderer.min",
    "plugins/js/highcharts",
    "plugins/js/highcharts-more",
    "plugins/js/modules/exporting"],
function (a, b, c, d, e, f, g, h, i) {
    var j = g.extend({
        controller: "DataAnalyse",
        $jqPlot: null,
        timeID: 0,
        LineData: {},
        serials: [],
        curerntId: 0,
        isStop: !0,
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
                formatter: function (a) {
                    return e.getUnixToTime(a.replace("/Date(", "").replace(")/", ""), 10)
                }
            },
            {
                field: "YouYanND",
                title: "浓度",
                width: 60,
                sortable: !1
            },
            {
                field: "YouYanSD",
                title: "温度",
                width: 60,
                sortable: !1
            },
            {
                field: "YouYanWD",
                title: "湿度",
                width: 60,
                sortable: !1
            },
            {
                field: "ZTjhq",
                title: "净化器状态",
                width: 60,
                sortable: !1,
                formatter: function (a) {
                    return 1 * a
                }
            },
            {
                field: "ZTfj",
                title: "风机状态",
                width: 60,
                sortable: !1,
                formatter: function (a) {
                    return 1 * a
                }
            },
            {
                field: "ZTsb",
                title: "系统状态",
                width: 60,
                sortable: !1,
                formatter: function (a) {
                    return 1 * a
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
            x = [];
            y = [];
            z = [];
            t = [];
            if (a && a.length) {
                for (var d in a) {
                    var f = a[d];
                    b[f.ProbeID + "ND"] || (b[f.ProbeID + "ND"] = [], c.push({
                        label: f.ProbeID + "浓度",
                        markerOptions: {
                            show: !1
                        }
                    })),
                    b[f.ProbeID + "WD"] || (b[f.ProbeID + "WD"] = [], c.push({
                        label: f.ProbeID + "温度",
                        markerOptions: {
                            show: !1
                        }
                    })),
                    b[f.ProbeID + "SD"] || (b[f.ProbeID + "SD"] = [], c.push({
                        label: f.ProbeID + "湿度",
                        markerOptions: {
                            show: !1
                        }
                    })),
                    b[f.ProbeID + "ND"].push([e.getUnixToTime1(f.TimeUp.replace("/Date(", "").replace(")/", "")), .02 * f.YouYanND]),
                    b[f.ProbeID + "WD"].push([e.getUnixToTime1(f.TimeUp.replace("/Date(", "").replace(")/", "")), .64 * f.YouYanWD - 40]),
                    b[f.ProbeID + "SD"].push([e.getUnixToTime1(f.TimeUp.replace("/Date(", "").replace(")/", "")), f.YouYanSD])
                    x.push(.02 * f.YouYanND);
                    y.push(.64 * f.YouYanWD - 40);
                    z.push(f.YouYanSD);
                    t.push(e.getUnixToTime1(f.TimeUp.replace("/Date(", "").replace(")/", "")))
                }
                var g = [];
                for (var d in b)
                    g.push(b[d]);
                try {
                    this.doDrawChart(g, c)
                } catch (h) { }
            }
        },
        doDrawChart: function (b, c) {
            //var d = this;
            //d.$jqPlot && d.$jqPlot.destroy();
            //d.$jqPlot = a.jqplot("monitor", b, {
            //    title: "",
            //    seriesColors: ["#008000", "#0000FF", "#FF0000", "#958c12", "#953579", "#4b5de4", "#d8b83f", "#ff5800", "#0085cc", "#4bb2c5", "#c5b47f"],
            //    series: c,
            //    legend: {
            //        show: !0,
            //        location: "ne",
            //        xoffset: 12,
            //        yoffset: 12,
            //        background: "",
            //        textColor: ""
            //    },
            //    axes: {
            //        xaxis: {
            //            renderer: a.jqplot.DateAxisRenderer,
            //            tickRenderer: a.jqplot.CanvasAxisTickRenderer,
            //            tickOptions: {
            //                angle: -.1,
            //                formatString: "%Y/%#m/%#d"
            //            }
            //        },
            //        yaxis: {
            //            renderer: a.jqplot.LinerAxisRenderer,
            //            tickOptions: {
            //                prefix: "",
            //                angle: -10,
            //                formatString: "%d"
            //            }
            //        }
            //    },
            //    cursor: {
            //        show: !0,
            //        zoom: !0
            //    }
            //})
            $('#monitor').highcharts({
                title: {
                    text: 'Monthly Average Temperature',
                    x: -20 //center
                },
                subtitle: {
                    text: 'Source: WorldClimate.com',
                    x: -20
                },
                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yAxis: {
                    title: {
                        text: 'Temperature (°C)'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: '°C'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [{
                    name: 'Tokyo',
                    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                }, {
                    name: 'New York',
                    data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
                }, {
                    name: 'Berlin',
                    data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
                }, {
                    name: 'London',
                    data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
                }]
            });
        },
        render: function () {
            var b, c, e, f = this;
            b = f.$panel.find(".easyui-layout").layout(),
            c = b.layout("panel", "center"),
            e = b.layout("panel", "north"),
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
            e.find(".EquipInfo").combogrid({
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
            e.find(".dataType").combobox({
                url: f.getHref(!0, "scripts", "datas", "datatype.js"),
                width: 150,
                method: "get"
            }),
            e.find(".easyui-linkbutton").linkbutton({
                onClick: function () {
                    var b = a(this).attr("data-operation");
                    b && f[b] && f[b].call(f)
                }
            }),
            f.$searchBar = e,
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
            d.applyBindings(f.dataViewModel, e[0])
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