﻿/*! fks 24-07-2014 */
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
            var d = [],
            k = {};
            if (b.Vals && b.Vals.length) {
                c = this.$panel.find(".easyui-layout").layout();
                dd = c.layout("panel", "north");
                dd.find(".FjTotal").text(b.FjTotal + "分钟");
                dd.find(".JhqTotal").text(b.JhqTotal + "分钟");
                for (var g in b.Vals) {
                    var h = b.Vals[g];
                    k[h.Category] || (k[h.Category] = [],
                        h.Category == "fjall" ? d.push("风机运行时间") :
                        (h.Category == "jhqall" ? d.push("净化器运行时间") : null)),
                    k[h.Category].push([e.getUnixToTime2(h.TimeUp.replace("/Date(", "").replace(")/", "")), h.ProbeID])
                }
                var g = [],
                    j = 0;
                for (var a in k) {
                    g.push({
                        name: d[j++],
                        data: k[a]
                    })
                }
                try {
                    this.doDrawChart(g)
                } catch (i) { }
            } else a.messager.alert("提示", "没有数据！", "warning")
        },
        doDrawChart: function (b) {
            $('#runningtime').highcharts({
                credits: {
                    enabled: false
                },
                title: {
                    text: '运行时间曲线图',
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
                        text: '运行时间 分钟'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: '分钟'
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
                url: ee.getHref(!1, i.prototype.controller, "DataRowIndex"),
                columns: i.prototype.getTableColumns.call(this),
                onSelect: function (a, b) {
                    ee.curerntId = b.CollectionCode
                }
            }),
            d.find(".easyui-linkbutton").linkbutton({
                onClick: function () {
                    var b = a(this).attr("data-operation");
                    b && ee[b] && ee[b].call(ee)
                }
            });
            d.find(".startTime").datetimebox("setValue", e.getBeginningOfMonth());
            d.find(".endTime").datetimebox("setValue", e.getCurrentTime(0));
            ee.$searchBar = d;
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