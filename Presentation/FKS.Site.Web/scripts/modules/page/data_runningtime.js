/*! fks 24-07-2014 */
define(["jquery", "underscore", "backbone", "knockout", "helper", "plugins/map", "modules/base/manager_base", "modules/main_ui", "modules/page/equipment_manager", "plugins/jquery.plot/plugins/jqplot.cursor.min", "plugins/jquery.plot/plugins/jqplot.dateAxisRenderer.min", "plugins/jquery.plot/plugins/jqplot.categoryAxisRenderer.min", "plugins/jquery.plot/plugins/jqplot.barRenderer.min", "plugins/jquery.plot/plugins/jqplot.pointLabels.min", "plugins/jquery.plot/plugins/jqplot.canvasAxisTickRenderer.min"],
function (a, b, c, d, e, f, g, h, i) {
    var j = g.extend({
        controller: "DataAnalyse",
        $jqPlot: null,
        timeID: 0,
        LineData: {},
        serials: [],
        curerntId: 0,
        isStop: !0,
        doInit: function (a, b) {
            var c = this;
            return c.base("doInit", [a], g) ? (c.doAddTab   ({
                title: a,
                iconCls: b,
                href: c.getHref(!1, c.controller, "RunningTimeIndex"),
                closable: !0,
                onLoad: function () {
                    c.render()
                }
            }), h.doAddModule(c.controller, a, c), !0) : !1
        },
        doRenderChart: function (b) {
            var c = [[], [], [], []],
            d = [],
            f = "";
            if (b && b.length) {
                for (var g in b) {
                    var h = b[g];
                    void 0 != h.TimeUp && void 0 != h.Id && (f != h.TimeUp && (f = h.TimeUp, d.push(e.DateFormat(e.getUnixToTime1(f.replace("/Date(", "").replace(")/", "")), "yyyy/MM/dd"))), c[h.Id].push(h.ProbeID))
                }
                try {
                    this.doDrawChart(c, d)
                } catch (i) { }
            } else a.messager.alert("提示", "没有数据！", "warning")
        },
        doDrawChart: function (b, c) {
            var d = this;
            d.$jqPlot && d.$jqPlot.destroy(),
            d.$jqPlot = a.jqplot("runningtime", b, {
                seriesDefaults: {
                    renderer: a.jqplot.BarRenderer,
                    rendererOptions: {
                        fillToZero: !0
                    }
                },
                series: [{
                    label: "风机有效时间"
                },
                {
                    label: "风机运行时间"
                },
                {
                    label: "净化器有效时间"
                },
                {
                    label: "净化器运行时间"
                }],
                legend: {
                    show: !0,
                    placement: "outsideGrid"
                },
                axes: {
                    xaxis: {
                        renderer: a.jqplot.CategoryAxisRenderer,
                        ticks: c,
                        tickOptions: {
                            angle: -30,
                            //formatString: "%Y/%#m/%#d"
                        }
                    },
                    yaxis: {
                        pad: 1.05,
                        tickOptions: {
                            formatString: "%d 分钟"
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
            var b, c, d, e = this;
            b = e.$panel.find(".easyui-layout").layout(),
            c = b.layout("panel", "center"),
            d = b.layout("panel", "north"),
            d.find(".EquipInfo").combogrid({
                idField: i.prototype.idField,
                textField: i.prototype.textField,
                url: e.getHref(!1, i.prototype.controller, "DataRowIndex"),
                columns: i.prototype.getTableColumns.call(this),
                width: 150,
                panelWidth: 450,
                required: !0,
                pagination: !0,
                onSelect: function (a, b) {
                    e.curerntId = b.CollectionCode
                }
            }),
            d.find(".easyui-linkbutton").linkbutton({
                onClick: function () {
                    var b = a(this).attr("data-operation");
                    b && e[b] && e[b].call(e)
                }
            }),
            e.$searchBar = d
        },
        doSearch: function () {
            var b = this,
            c = b.$searchBar.find(".startTime").datebox("getValue"),
            d = b.$searchBar.find(".endTime").datebox("getValue");
            c && d && b.curerntId && a.ajax({
                url: b.getHref(!1, b.controller, "RunningTimeDataRow"),
                data: {
                    tableName: b.curerntId,
                    StartTime: c,
                    EndTime: d
                },
                success: function (a) {
                    console.log(a),
                    b.doRenderChart(a)
                },
                error: function () {
                    a.messager.alert("提示", "获取数据失败！", "error")
                }
            })
        },
        dispose: function () {
            this.base("dispose")
        }
    });
    return j
});