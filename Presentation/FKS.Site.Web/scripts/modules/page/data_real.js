/*! fks 07-07-2014 */
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
            isDrawed: !1,
            dataViewModel: null,
            LineData: {},
            serials: [],
            curerntId: 0,
            isStop: !0,
            getTableColumns: function () {
                return [[{
                    field: "YouYanND",
                    title: "浓度",
                    width: 60,
                    sortable: !1
                }, {
                    field: "YouYanSD",
                    title: "温度",
                    width: 60,
                    sortable: !1
                }, {
                    field: "YouYanWD",
                    title: "湿度",
                    width: 60,
                    sortable: !1
                }, {
                    field: "ZTsb",
                    title: "状态",
                    width: 60,
                    sortable: !1,
                    formatter: function (a) {
                        return 1 * a
                    }
                }, {
                    field: "Id",
                    title: "工况",
                    width: 60,
                    sortable: !1,
                    formatter: function (a, b) {
                        return 1 * b.ZTfj + "" + 1 * b.ZTjhq
                    }
                }, {
                    field: "ZTqd",
                    title: "信号强度",
                    width: 60,
                    sortable: !1
                }, {
                    field: "TimeUp",
                    title: "时间",
                    width: 150,
                    sortable: !1,
                    formatter: function (a) {
                        return e.getUnixToTime(a.replace("/Date(", "").replace(")/", ""), 10)
                    }
                }]]
            }, doInit: function (a, b) {
                var c = this;
                return c.base("doInit", [a], g) ? (c.doAddTab({
                    title: a,
                    iconCls: b,
                    href: c.getHref(!1, c.controller, "RealDataIndex"),
                    closable: !0,
                    onLoad: function () {
                        c.render()
                    }
                }),
                    h.doAddModule(c.controller, a, c), !0) : !1
            }, doStart: function (b) {
                var c = this;
                return c.curerntId ? (b = b || 10,
                    c.isStop && (clearTimeout(this.timeID),
                    a("#start").linkbutton("disable"),
                    a("#stop").linkbutton("enable"),
                    c.$table.datagrid("loadData", []),
                    a("#EquipInfo").combogrid("disable")),
                    c.isStop = !1,
                    void setTimeout(function () {
                        a.ajax({
                            url: c.getHref(!1,
                                c.controller,
                                "RealDataRow",
                                c.curerntId),
                            success: function (a) {
                                if (!c.isStop) {
                                    if (console.log(a), a && a.length) {
                                        d.mapping.fromJS(a[0], c.dataViewModel);
                                        for (var f in a) {
                                            var g = a[f];
                                            var time = e.getUnixToTime2(g.TimeUp.replace("/Date(", "").replace(")/", ""));
                                            c.$table.datagrid("appendRow", g),
                                            c.LineData[g.ProbeID + "ND"] || (c.LineData[g.ProbeID + "ND"] = [],
                                            //c.serials.push({ label: g.ProbeID + "浓度", markerOptions: { show: !1 } })
                                            c.serials.push(g.ProbeID + "浓度")
                                            ),
                                            c.LineData[g.ProbeID + "WD"] || (c.LineData[g.ProbeID + "WD"] = [],
                                            //c.serials.push({ label: g.ProbeID + "温度", markerOptions: { show: !1 } })
                                            c.serials.push(g.ProbeID + "温度")
                                            ),
                                            c.LineData[g.ProbeID + "SD"] || (c.LineData[g.ProbeID + "SD"] = [],
                                            //c.serials.push({ label: g.ProbeID + "湿度", markerOptions: { show: !1 } })
                                            c.serials.push(g.ProbeID + "湿度")
                                            ),
                                            c.LineData[g.ProbeID + "ND"].push([time, g.YouYanND]),
                                            c.LineData[g.ProbeID + "WD"].push([time, g.YouYanWD]),
                                            c.LineData[g.ProbeID + "SD"].push([time, g.YouYanSD])
                                        }
                                        var h = [];
                                        var j = 0;
                                        for (var f in c.LineData) {
                                            //h.push(c.LineData[f]);
                                            h.push({
                                                name: c.serials[j++],
                                                data: c.LineData[f]
                                            })
                                        }
                                        try {
                                            c.doDrawChart(h)
                                        }
                                        catch (i) { }
                                    }
                                    c.timeID = setTimeout(function () {
                                        c.doStart(3e3)
                                    }, b)
                                }
                            }, error: function () {
                                a.messager.alert("错误", "获取数据错误！", "error"), c.doStop()
                            }
                        })
                    }, 10)) : void a.messager.alert("提示", "请选择设备", "warning")
            }, doStop: function () {
                this.isStop || (this.isStop = !0,
                clearTimeout(this.timeID),
                a("#start").linkbutton("enable"),
                a("#stop").linkbutton("disable"),
                a("#EquipInfo").combogrid("enable"),
                this.LineData = {},
                this.serials = [])
            }, doDrawChart: function (b) {
                $('#chart1').highcharts({
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: '实时数据监测',
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
                                return Highcharts.dateFormat('%H:%M:%S', this.value);
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
            }, render: function () {
                {
                    var b, c, e, f = this;
                    a("#tt")
                }
                b = f.$panel.find(".easyui-layout").layout(),
                c = b.layout("panel", "center"),
                e = b.layout("panel", "north"),
                b.layout("collapse", "east"),
                f.$tablePanel = b.layout("panel", "east"),
                f.doInitTable({
                    rownumbers: !0,
                    onDblClickRow: a.noop, url: "",
                    pagination: !1
                }, [], "", ""),
                a("#EquipInfo").combogrid({
                    idField: i.prototype.idField,
                    textField: i.prototype.textField,
                    url: f.getHref(!1, i.prototype.controller, "DataRowIndex"),
                    columns: i.prototype.getTableColumns.call(this),
                    width: 200,
                    panelWidth: 450,
                    pagination: !0,
                    pageSize: 100,
                    pageList: [100, 200, 300],
                    onSelect: function (a, b) {
                        f.curerntId = b.CollectionCode
                    }
                }),
                e.find(".easyui-linkbutton").linkbutton({
                    onClick: function () {
                        var b = a(this).attr("data-operation");
                        b && f[b] && f[b].call(f)
                    }
                }),
                f.dataViewModel = d.mapping.fromJS({
                    Id: 1,
                    ZTfj: !1,
                    ZTjhq: !1,
                    ZTsb: !1
                }, {
                    key: function (a) {
                        return d.utils.unwrapObservable(a.Id)
                    }
                }),
                d.applyBindings(f.dataViewModel, e[0])
            },
            dispose: function () {
                this.base("dispose"),
                this.doStop(),
                clearTimeout(this.timeID)
            }
        });
        return j
    });