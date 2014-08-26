/*! fks 24-07-2014 */
define(["jquery", "underscore", "backbone", "knockout", "helper", "plugins/map", "modules/base/manager_base", "modules/main_ui", "modules/page/equipment_manager", "plugins/jquery.plot/plugins/jqplot.cursor.min", "plugins/jquery.plot/plugins/jqplot.dateAxisRenderer.min", "plugins/jquery.plot/plugins/jqplot.logAxisRenderer.min", "plugins/jquery.plot/plugins/jqplot.canvasTextRenderer.min", "plugins/jquery.plot/plugins/jqplot.canvasAxisTickRenderer.min"],
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
            if (a && a.length) {
                for (var d in a) {
                    var f = a[d];
                    b[f.ProbeID + "ND"] || (b[f.ProbeID + "ND"] = [], c.push({
                        label: f.ProbeID + "浓度",
                        markerOptions: {
                            show:!1
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
                }
                var g = [];
                for (var d in b) g.push(b[d]);
                try {
                    this.doDrawChart(g, c)
                } catch (h) { }
            }
        },
        doDrawChart: function (b, c) {
            var d = this;
            d.$jqPlot && d.$jqPlot.destroy();
            d.$jqPlot = a.jqplot("monitor", b, {
                title: "",
                //seriesColors: ["#4bb2c5", "#c5b47f", "#EAA228", "#579575", "#839557", "#958c12", "#953579", "#4b5de4", "#d8b83f", "#ff5800", "#0085cc"],
                seriesColors: ["#008000", "#0000FF", "#FF0000", "#958c12", "#953579", "#4b5de4", "#d8b83f", "#ff5800", "#0085cc", "#4bb2c5", "#c5b47f"],
                series: c,
                legend: {
                    show: !0,
                    location: "ne",
                    xoffset: 12,
                    yoffset: 12,
                    background: "",
                    textColor: ""
                },
                axes: {
                    xaxis: {
                        renderer: a.jqplot.DateAxisRenderer,
                        tickRenderer: a.jqplot.CanvasAxisTickRenderer,
                        tickOptions: {
                            angle: -.1,
                            formatString: "%Y/%#m/%#d"
                        }
                    },
                    yaxis: {
                        renderer: a.jqplot.LinerAxisRenderer,
                        tickOptions: {
                            prefix: "",
                            angle: -10,
                            formatString: "%d"
                        }
                    }
                },
                cursor: {
                    show: !0,
                    zoom: !0
                }
            })
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