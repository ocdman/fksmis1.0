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
        var o = g.extend({
            controller: "ReportInfo",
            isInitTable: !1,
            currentId: 0,
            reportType: "01",
            $jqPlot: null,
            doInit: function (title, icon) {
                var _this = this;

                if (_this.base("doInit", [title])) {
                    _this.doAddTab({
                        title: title,
                        iconCls: icon,
                        closable: !0,
                        href: _this.getHref(!1, _this.controller, "Index"),
                        onLoad: function () { _this.render(); }
                    });
                    h.doAddModule(_this.controller, title, _this);
                    return true;
                }
                return false;
            },
            getTableColumns: function () {
                var a = this;
                var b;
                return [[{
                    field: "UploadTime",
                    title: "上传时间",
                    width: 100,
                    sortable: !1,
                    formatter: function (a) {
                        return e.DateFormat(e.getUnixToTime1(a.replace("/Date(", "").replace(")/", "")), "yyyy-MM-dd HH:mm:ss");
                    }
                },
                //{
                //    field: "DetectorID1",
                //    title: "探测器ID1",
                //    width: 80,
                //    sortable: !1
                //},
                {
                    field: "YouYanND",
                    title: "油烟浓度",
                    width: 100,
                    sortable: !1
                },
                {
                    field: "YouYanSD",
                    title: "油烟湿度",
                    width: 100,
                    sortable: !1
                },
                {
                    field: "YouYanWD",
                    title: "油烟温度",
                    width: 100,
                    sortable: !1
                },
                //{
                //    field: "DetectorID2",
                //    title: "探测器ID2",
                //    width: 80,
                //    sortable: !1,
                //},
                {
                    field: "YouYanND2",
                    title: "油烟浓度2",
                    width: 100,
                    sortable: !1,
                },
                {
                    field: "YouYanSD2",
                    title: "油烟湿度2",
                    width: 100,
                    sortable: !1,
                },
                {
                    field: "YouYanWD2",
                    title: "油烟温度2",
                    width: 100,
                    sortable: !1,
                },
                {
                    field: "PurifierRunTime",
                    title: "净化器运行时间",
                    width: 110,
                    sortable: !1
                },
                {
                    field: "FanRunTime",
                    title: "风机运行时间",
                    width: 110,
                    sortable: !1
                }]]
            },
            render: function () {
                var b, c, d, f, e = this,
                g = a.md5(e.title);
                b = e.$panel.find(".easyui-layout").layout();
                c = b.layout("panel", "center");
                d = b.layout("panel", "north");
                f = e.$panel.find(".easyui-tabs").tabs({
                    onSelect: function (a, b) {
                        1 == b && e.$table.datagrid("resize")
                    }
                });
                e.$tablePanel = f.tabs("getTab", 1);
                e.doInitTable({
                    rownumbers: !0,
                    onLoadSuccess: function (a) {
                        e.doRenderChart(a.rows);
                    },
                    onDblClickRow: a.noop,
                    url: "",
                    pagination: !0,
                    pageSize: 300,
                    pageList: [300]
                }, [], "", "");
                d.find(".EquipInfo").combogrid({
                    idField: i.prototype.idField,
                    textField: i.prototype.textField,
                    url: e.getHref(!1, i.prototype.controller, "DataRowIndex"),
                    columns: i.prototype.getTableColumns.call(this),
                    required: !0,
                    width: 150,
                    panelWidth: 450,
                    pagination: !0,
                    onSelect: function (a, b) {
                        e.currentId = b.CollectionCode;
                    }
                });
                d.find("#cc").combobox({
                    required: !0,
                    width: 150,
                    onSelect: function (a) {
                        e.reportType = a.value;
                    }
                })
                d.find(".easyui-linkbutton").linkbutton({
                    onClick: function () {
                        var b = a(this).attr("data-operation");
                        b && e[b] && e[b].call(e);
                    }
                })
            },
            doSearch: function () {
                var a = this;
                a.reportType && a.currentId && (a.$table.datagrid("options").url = a.getHref(!1, a.controller, "ReportDataRow"),
                a.$table.datagrid("reload", {
                    collectionCode: a.currentId,
                    reportType: a.reportType
                }))
            },
            createReport: function () {
                var a = this;
                var urlStr = '../ReportInfo/Reporting' + '?collectionCode=' + a.currentId + '&reportType=' + a.reportType;
                window.open(urlStr);
            },
            doRenderChart: function (b) {
                var c = [[],[],[],[],[],[]];
                if (b && b.length) {
                    for (var d in b) {
                        var f = b[d];
                        c[0].push([e.getUnixToTime1(f.UploadTime.replace("/Date(", "").replace(")/", "")), f.YouYanND]);
                        c[1].push([e.getUnixToTime1(f.UploadTime.replace("/Date(", "").replace(")/", "")), f.YouYanSD]);
                        c[2].push([e.getUnixToTime1(f.UploadTime.replace("/Date(", "").replace(")/", "")), f.YouYanWD]);
                        c[3].push([e.getUnixToTime1(f.UploadTime.replace("/Date(", "").replace(")/", "")), f.YouYanND2]);
                        c[4].push([e.getUnixToTime1(f.UploadTime.replace("/Date(", "").replace(")/", "")), f.YouYanSD2]);
                        c[5].push([e.getUnixToTime1(f.UploadTime.replace("/Date(", "").replace(")/", "")), f.YouYanWD2]);
                    }
                    try{
                        this.doDrawChart(c);
                    }
                    catch (g) { }
                }
                else {
                    a.messager.alert("提示", "没有数据", "warning");
                }
            },
            doDrawChart: function (b) {
                var d = this;
                d.$jqPlot && d.$jqPlot.destroy();
                d.$jqPlot = a.jqplot("reportChart", b, {
                    seriesColors: ["#008000", "#0000FF", "#FF0000", "#00FF00", "#00BFFF", "#8A2BE2", "#953579", "#4b5de4", "#d8b83f", "#ff5800", "#0085cc"],
                    series: [{
                        label: "油烟浓度",
                        markerOptions: {
                            show: !1
                        }
                        
                    }, {
                        label: "油烟湿度",
                        markerOptions: {
                            show: !1
                        }
                    }, {
                        label: "油烟温度",
                        markerOptions: {
                            show: !1
                        }
                    }, {
                        label: "油烟浓度2",
                        markerOptions: {
                            show: !1
                        }

                    }, {
                        label: "油烟湿度2",
                        markerOptions: {
                            show: !1
                        }
                    }, {
                        label: "油烟温度2",
                        markerOptions: {
                            show: !1
                        }
                    }],
                    legend:{
                        show: !0,
                        xoffset: 12,
                        yoffset: 12,
                    },
                    axes: {
                        xaxis: {
                            renderer: a.jqplot.DateAxisRenderer,
                            tickRenderer: a.jqplot.CanvasAxisTickRenderer,
                            title: "时间",
                            tickOptions: {
                                angle: -.1,
                                formatString: "%#m-%#d %H:%M"
                            }
                        },
                        yaxis: {
                            renderer: a.jqplot.LinerAxisRenderer,
                            title: "",
                        }
                    },
                    cursor: {
                        show: !0,
                        zoom: !0
                    }
                });
            }
        });
        return o;
    })