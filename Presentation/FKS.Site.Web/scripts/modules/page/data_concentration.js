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
    "plugins/jquery.plot/plugins/jqplot.categoryAxisRenderer.min",
    "plugins/jquery.plot/plugins/jqplot.barRenderer.min",
    "plugins/jquery.plot/plugins/jqplot.pointLabels.min",
    "plugins/jquery.plot/plugins/jqplot.canvasAxisTickRenderer.min",
    "plugins/jquery.plot/plugins/jqplot.canvasOverlay.min",
    "plugins/jquery.plot/plugins/jqplot.highlighter.min"],
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
                href: c.getHref(!1, c.controller, "ConcentrationIndex"),
                closable: !0,
                onLoad: function () {
                    c.render();
                }
            }), h.doAddModule(c.controller, a, c), !0) : !1
        },
        doRenderChart: function (b) {
            var c = [[]];
            d = [];
            f = "";
            if (b && b.length) {
                for (var g in b) {
                    var h = b[g];
                    void 0 != h.TimeUp && void 0 != h.Id && (f != h.TimeUp && (f = h.TimeUp, d.push(e.DateFormat(e.getUnixToTime1(f.replace("/Date(", "").replace(")/", "")), "yyyy/MM/dd"))), c[h.Id].push(h.YouYanND))
                }
                try {
                    this.doDrawChart(c, d)
                }
                catch (i) { }
            }
            else a.messager.alert("提示", "没有数据！", "warning");
        },
        doDrawChart: function (b, c) {
            var d = this;
            d.$jqPlot && d.$jqPlot.destroy();
            d.$jqPlot = a.jqplot("concentration", b, {
                animate: !0,
                animateReplot: !0,
                cursor:{
                    show: !0,
                    zoom: !0,
                    looseZoom: !0,
                    showTooltip: !1
                },
                seriesDefaults: {
                    renderer: a.jqplot.BarRenderer,
                    //pointLabels: { show: !0},
                    rendererOptions: {
                        fillToZero: !0,
                        animation: {
                            speed: 2500
                        },
                    },
                },
                series: [
                    { label: "油烟浓度" }
                ],
                axes: {
                    xaxis: {
                        renderer: a.jqplot.CategoryAxisRenderer,
                        ticks: c,
                    },
                    yaxis: {
                        pad: 1.05,
                        tickOptions: {
                            formatString: "%d (mg/m3)"
                        },
                    },
                },
                canvasOverlay: {
                    show: true,
                    objects: [
                        {
                            horizontalLine: {
                                name: 'pebbles',
                                y: 50,
                                lineWidth: 3,
                                xOffset: 0,
                                color: 'rgb(89, 198, 154)',
                                shadow: false
                            }
                        }
                    ]
                }
            })
            //$('#discharge').bind('jqplotDataHighlight',
            //    function (ev, seriesIndex, pointIndex, data) {
            //        $('#dischargeContent').html('日期： ' + c[pointIndex] + '，数据：' + data[1] + '克');
            //    })

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
                url: b.getHref(!1, b.controller, "ConcentrationDataRow"),
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