﻿define(["jquery",
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
                href: c.getHref(!1, c.controller, "DischargeIndex"),
                closable: !0,
                onLoad: function () {
                    c.render();
                }
            }), h.doAddModule(c.controller, a, c), !0) : !1
        },
        doRenderChart: function (b) {
            var d = [];
            k = {};
            if (b && b.length) {
                j = b[0].DayDischargeBound;
                for (var g in b) {
                    var h = b[g];
                    k[h.Id] || (k[h.Id] = []),
                    k[h.Id].push([e.getUnixToTime2(h.TimeUp.replace("/Date(", "").replace(")/", "")), parseFloat((h.YouYanND).toFixed(1))])
                }
                var g = [];
                g.push({
                    name: "排放量",
                    data: k[h.Id]
                })
                try {
                    this.doDrawChart(g, j)
                }
                catch (i) { }
            }
            else a.messager.alert("提示", "没有数据！", "warning");
        },
        doDrawChart: function (b, j) {

            $('#discharge').highcharts({
                credits: {
                    enabled: false
                },
                title: {
                    text: '排放量曲线图',
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
                        text: '排放量 (克/天)'
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
                    valueSuffix: '克/天'
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
            var b, c, d, e = this;
            b = e.$panel.find(".easyui-layout").layout(),
            c = b.layout("panel", "center"),
            d = b.layout("panel", "north"),
            e.doInitCombogrid(d.find(".EquipInfo"), {
                idField: i.prototype.idField,
                textField: i.prototype.textField,
                url: e.getHref(!1, i.prototype.controller, "DataRowIndex"),
                columns: i.prototype.getTableColumns.call(this),
                onSelect: function (a, b) {
                    e.currentId = b.CollectionCode
                }
            }),
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
            c = b.$searchBar.find(".startTime").datebox("getValue");
            d = b.$searchBar.find(".endTime").datebox("getValue");
            c && d && b.currentId && a.ajax({
                url: b.getHref(!1, b.controller, "DischargeDataRow"),
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