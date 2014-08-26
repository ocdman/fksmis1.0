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
        "plugins/jquery.plot/plugins/jqplot.canvasAxisTickRenderer.min"],
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
                href: c.getHref(!1, c.controller, "LinkageIndex"),
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
                    this.doDrawChart(c, [{
                        label: "联动比"
                    }])
                } catch (g) { }
            } else a.messager.alert("提示", "没有数据！", "warning")
        },
        doDrawChart: function (b, c) {
            var d = this;
            d.$jqPlot && d.$jqPlot.destroy(),
            d.$jqPlot = a.jqplot("linkage", b, {
                title: "1：清洁 2：较清洁 3：脏 4：较脏 5：极脏",
                seriesColors: ["#008000", "#0000FF", "#FF0000", "#579575", "#839557", "#958c12", "#953579", "#4b5de4", "#d8b83f", "#ff5800", "#0085cc"],
                series: c,
                legend: {
                    show: !0,
                    location: "ne",
                    xoffset: 12,
                    yoffset: 12,
                    background: "",
                    textColor: ""
                },
                seriesDefaults: {
                    dragable: {
                        color: void 0,
                        constrainTo: "none"
                    }
                },
                axes: {
                    xaxis: {
                        renderer: a.jqplot.DateAxisRenderer,
                        tickRenderer: a.jqplot.CanvasAxisTickRenderer,
                        title: "时间",
                        tickOptions: {
                            angle: -30
                        }
                    },
                    yaxis: {
                        renderer: a.jqplot.LinerAxisRenderer,
                        title: "联动比",
                        tickOptions: {
                            prefix: ""
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