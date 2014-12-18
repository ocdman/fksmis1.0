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
        currentId: 0,
        isStop: !0,
        doInit: function (a, b) {
            var c = this;
            return c.base("doInit", [a], g) ? (c.doAddTab({
                title: a,
                iconCls: b,
                href: c.getHref(!1, c.controller, "PureRateIndex"),
                closable: !0,
                onLoad: function () {
                    c.render();
                }
            }), h.doAddModule(c.controller, a, c), !0) : !1
        },
        doRenderChart: function (b) {
            var d = [];
            k = {};
            if (b.Vals && b.Vals.length) {
                j = b.Bound;
                for (var g in b.Vals) {
                    var h = b.Vals[g];
                    k[0] || (k[0] = []),
                    k[0].push([e.getUnixToTime2(h.TimeUp.replace("/Date(", "").replace(")/", "")), parseFloat((h.Value * 100).toFixed(1))]);
                }
                var g = [];
                g.push({
                    name: "净化效率",
                    data: k[0]
                })
                try {
                    this.doDrawChart(g, j)
                }
                catch (i) { }
            }
            else a.messager.alert("提示", "没有数据！", "warning");
        },
        doDrawChart: function (b, j) {
            $('#pureRate').highcharts({
                credits: {
                    enabled: false
                },
                title: {
                    text: '净化效率曲线图',
                    x: -20 //center
                },
                subtitle: {
                    //text: 'Source: WorldClimate.com',
                    x: -20
                },
                chart: {
                    zoomType: 'xy',
                    type: 'column'
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
                        text: '净化效率 (%)'
                    },
                    plotLines: [{
                        color: 'red',
                        value: j,
                        width: 2,
                        //color: '#808080'
                        label: {
                            text: '警戒线',
                            align: 'left',
                            x: 10,
                            style: {
                                fontSize: '14px',
                                fontWeight: 'bold'
                            }
                        }
                    }]
                },
                tooltip: {
                    valueSuffix: '%'
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
                series: b
            });
        },
        render: function () {
            var b, c, d, ee = this;
            b = ee.$panel.find(".easyui-layout").layout(),
            c = b.layout("panel", "center"),
            d = b.layout("panel", "north"),
            ee.doInitCombogrid(d.find(".EquipInfo"), {
                idField: i.prototype.idField,
                textField: i.prototype.textField,
                url: ee.getHref(!1, i.prototype.controller, "DataRowIndexForTwoEquipCounts"),
                columns: i.prototype.getTableColumns.call(this),
                onSelect: function (a, b) {
                    ee.currentId = b.CollectionCode
                }
            }),
            d.find(".easyui-linkbutton").linkbutton({
                onClick: function () {
                    var b = a(this).attr("data-operation");
                    b && ee[b] && ee[b].call(ee);
                }
            }),
            d.find(".startTime").datebox("setValue", e.getDate(-7)),
            d.find(".endTime").datebox("setValue", e.getDate(-1)),
            ee.$searchBar = d;
        },
        doSearch: function () {
            var b = this;
            c = b.$searchBar.find(".startTime").datebox("getValue");
            d = b.$searchBar.find(".endTime").datebox("getValue");
            c && d && b.currentId && a.ajax({
                url: b.getHref(!1, b.controller, "PureRateDataRow"),
                data: {
                    tableName: b.currentId,
                    StartTime: c,
                    EndTime: d
                },
                success: function (a) {
                    console.log(a);
                    b.doRenderChart(a);
                },
                error: function () {
                    a.messager.alert("提示", "获取数据失败", "error");
                }
            })
        },
        dispose: function () {
            this.base("dispose");
        }
    });
    return j;
})