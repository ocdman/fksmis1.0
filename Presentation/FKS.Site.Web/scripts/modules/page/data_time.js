/*! fks 24-07-2014 */
define(["jquery", "underscore", "backbone", "knockout", "helper", "plugins/map", "modules/base/manager_base", "modules/main_ui", "modules/page/equipment_manager", "plugins/jquery.plot/plugins/jqplot.cursor.min", "plugins/jquery.plot/plugins/jqplot.dateAxisRenderer.min", "plugins/jquery.plot/plugins/jqplot.logAxisRenderer.min", "plugins/jquery.plot/plugins/jqplot.canvasTextRenderer.min", "plugins/jquery.plot/plugins/jqplot.canvasAxisTickRenderer.min", "plugins/jquery.plot/plugins/jqplot.barRenderer.min", "plugins/jquery.plot/plugins/jqplot.categoryAxisRenderer.min", "plugins/jquery.plot/plugins/jqplot.pointLabels.min"],
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
            return c.base("doInit", [a], g) ? (c.doAddTab({
                title: a,
                iconCls: b,
                href: c.getHref(!1, c.controller, "TimeDataIndex"),
                closable: !0,
                onLoad: function () {
                    c.render()
                }
            }), h.doAddModule(c.controller, a, c), !0) : !1
        },
        doRenderChart: function (b) {
            var c = [[]];
            if (b && b.length) {
                for (var d in b) {
                    var f = b[d];
                    c[0].push([e.getUnixToTime1(f.TimeUp.replace("/Date(", "").replace(")/", "")), f.ZTjhqCount / f.ZTfjCount])
                }
                try {
                    this.doDrawChart(c, ["联动比"])
                } catch (g) {
                    console.log(g)
                }
            } else a.messager.alert("提示", "没有数据！", "warning")
        },
        doDrawChart: function (b, c) {
            var d = this;
            d.$jqPlot && d.$jqPlot.destroy(),
            d.$jqPlot = a.jqplot("time", b, {
                seriesDefaults: {
                    pointLabels: {
                        show: !0
                    },
                    shadow: !1,
                    showMarker: !0,
                    renderer: a.jqplot.BarRenderer,
                    rendererOptions: {
                        barWidth: 50,
                        barMargin: 50
                    }
                },
                axes: {
                    xaxis: {
                        show: !0,
                        renderer: a.jqplot.CategoryAxisRenderer,
                        ticks: c,
                        showTicks: !0,
                        showTickMarks: !0,
                        tickOptions: {
                            show: !0,
                            fontSize: "14px",
                            fontFamily: 'tahoma,arial,"Hiragino Sans GB",宋体b8b体,sans-serif',
                            showLabel: !0,
                            showMark: !1,
                            showGridline: !1
                        }
                    },
                    yaxis: {
                        show: !0,
                        showTicks: !1,
                        showTickMarks: !1,
                        autoscale: !0,
                        borderWidth: 1,
                        tickOptions: {
                            show: !0,
                            showLabel: !1,
                            showMark: !1,
                            showGridline: !0,
                            formatString: "￥%.2f"
                        }
                    }
                },
                grid: {
                    drawGridLines: !0,
                    drawBorder: !1,
                    shadow: !1,
                    borderColor: "#000000",
                    borderWidth: 1
                },
                highlighter: {
                    show: !1
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
                url: b.getHref(!1, b.controller, "LinkageDataRow"),
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