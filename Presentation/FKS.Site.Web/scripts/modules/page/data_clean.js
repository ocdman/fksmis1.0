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
        doInit: function (a, b) {
            var c = this;
            return c.base("doInit", [a], g) ? (c.doAddTab({
                title: a,
                iconCls: b,
                href: c.getHref(!1, c.controller, "CleanDataIndex"),
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
                    var f = b[d],
                    g = Math.floor(f.YouYanND / 20, 0);
                    g >= 5 && (g = 4),
                    c[0].push([e.getUnixToTime2(f.TimeUp.replace("/Date(", "").replace(")/", "")), g])
                }
                var h = [];
                h.push({
                    data: c[0],
                    name: "洁净度"
                })
                try {
                    this.doDrawChart(h)
                } catch (i) { }
            } else a.messager.alert("提示", "没有数据！", "warning")
        },
        doDrawChart: function (b) {
            $('#clean').highcharts({
                credits: {
                    enabled: false
                },
                title: {
                    text: '洁净度曲线图',
                    x: -20 //center
                },
                subtitle: {
                    //text: '1：清洁 2：较清洁 3：脏 4：较脏 5：极脏',
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
                //legend: {
                //    layout: 'vertical',
                //    align: 'right',
                //    verticalAlign: 'middle',
                //    borderWidth: 0
                //},
                plotOptions: {
                    series: {
                        marker: {
                            radius: 0
                        },
                    }
                },
                series: b
            });
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
            c = b.$searchBar.find(".startTime").datetimebox("getValue"),
            d = b.$searchBar.find(".endTime").datetimebox("getValue");
            c && d && b.curerntId && a.ajax({
                url: b.getHref(!1, b.controller, "CleanDataRow"),
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