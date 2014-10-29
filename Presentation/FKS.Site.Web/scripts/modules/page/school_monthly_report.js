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
        controller: "ReportInfo",
        $jqPlot: null,
        $table1: null,
        $table2: null,
        $tablePanel1: null,
        $tablePanel2: null,
        timeID: 0,
        reportType: "03",
        sortType: "01",
        LineData: {},
        serials: [],
        currentId: 0,
        isStop: !0,
        doInit: function (a, b) {
            var c = this;
            return c.base("doInit", [a], g) ? (c.doAddTab({
                title: a,
                iconCls: b,
                href: c.getHref(!1, c.controller, "SchoolMonthlyReportIndex"),
                closable: !0,
                onLoad: function () {
                    c.render();
                }
            }), h.doAddModule(c.controller, a, c), !0) : !1
        },
        getTableColumns: function () {
            return [[{
                field: "NickName",
                title: "企业名称",
                width: 100,
                sortable: !1
            }, {
                field: "Concentration",
                title: "油烟浓度",
                width: 100,
                sortable: !1,
                formatter: function (a) {
                    return a.toFixed(1);
                }
            }, {
                field: "Address",
                title: "安装地址",
                width: 100,
                sortable: !1
            }, {
                field: "Contacts",
                title: "联系人",
                width: 100,
                sortable: !1
            }, {
                field: "ContactInfo",
                title: "联系方式",
                width: 100,
                sortable: !1
            }]];
        },
        getTableColumns1: function () {
            return [[{
                field: "NickName",
                title: "企业名称",
                width: 100,
                sortable: !1
            }, {
                field: "Discharge",
                title: "排放量",
                width: 100,
                sortable: !1,
                formatter: function (a) {
                    return a.toFixed(1);
                }
            }, {
                field: "Address",
                title: "安装地址",
                width: 100,
                sortable: !1
            }, {
                field: "Contacts",
                title: "联系人",
                width: 100,
                sortable: !1
            }, {
                field: "ContactInfo",
                title: "联系方式",
                width: 100,
                sortable: !1
            }]];
        },
        getTableColumns2: function () {
            return [[{
                field: "NickName",
                title: "企业名称",
                width: 100,
                sortable: !1
            }, {
                field: "AlarmTime",
                title: "报警次数",
                width: 100,
                sortable: !1
            }, {
                field: "Address",
                title: "安装地址",
                width: 100,
                sortable: !1
            }, {
                field: "Contacts",
                title: "联系人",
                width: 100,
                sortable: !1
            }, {
                field: "ContactInfo",
                title: "联系方式",
                width: 100,
                sortable: !1
            }]];
        },
        getTableColumns3: function () {
            return [[
            { field: 'ck', checkbox: !0 },
            {
                field: "NickName",
                title: "用户名称",
                width: 150,
                sortable: !1
            },
            {
                field: "CollectionCode",
                title: "采集器ID",
                width: 100,
                sortable: !1
            },
            {
                field: "Address",
                title: "安装地址",
                width: 200,
                sortable: !1
            }]]
        },
        doRenderChart: function (b) {
            var c = [[]];
            d = [];
            f = "";
            if (b && b.length) {
                j = b[0].DayDischargeBound;
                for (var g in b) {
                    var h = b[g];
                    void 0 != h.TimeUp && void 0 != h.Id && (f != h.TimeUp && (f = h.TimeUp, d.push(e.DateFormat(e.getUnixToTime1(f.replace("/Date(", "").replace(")/", "")), "yyyy/MM/dd"))), c[h.Id].push(h.YouYanND))
                }
                try {
                    this.doDrawChart(c, d, j)
                }
                catch (i) { }
            }
            else a.messager.alert("提示", "没有数据！", "warning");
        },
        render: function () {
            var b, c, d, g = this;
            b = g.$panel.find(".easyui-layout").layout(),
            c = b.layout("panel", "center"),
            d = b.layout("panel", "north"),
            f = g.$panel.find(".easyui-tabs").tabs({
                onSelect: function (a, b) {
                    0 == b && g.$table.datagrid("resize");
                    1 == b && g.$table1.datagrid("resize");
                    2 == b && g.$table2.datagrid("resize");
                }
            });
            d.find(".EquipInfo").combogrid({
                idField: i.prototype.idField,
                textField: i.prototype.textField,
                url: g.getHref(!1, i.prototype.controller, "DataRowIndexForSchool"),
                columns: g.getTableColumns3(),
                width: 150,
                panelWidth: 450,
                required: !0,
                pagination: !0,
                multiple: !0,
                OnSelect: function (a, b) {
                    g.currentId = b.CollectionCode
                }
            });
            g.$tablePanel = f.tabs("getTab", 0);
            g.$tablePanel1 = f.tabs("getTab", 1);
            g.$tablePanel2 = f.tabs("getTab", 2);

            g.doInitTable({
                rownumbers: !0,
                onLoadSuccess: function (a) {

                },
                onDbClickRow: a.noop,
                url: "",
                pagination: !0,
                pageSize: 50,
                pageList: [50]
            }, [], "", "");

            g.doInitTable1({
                rownumbers: !0,
                onLoadSuccess: function (a) {

                },
                onDbClickRow: a.noop,
                url: "",
                pagination: !0,
                pageSize: 50,
                pageList: [50]
            }, [], "", "");

            g.doInitTable2({
                rownumbers: !0,
                onLoadSuccess: function (a) {

                },
                onDbClickRow: a.noop,
                url: "",
                pagination: !0,
                pageSize: 50,
                pageList: [50]
            }, [], "", "");

            d.find("#reportType").combobox({
                required: !0,
                width: 150,
                onSelect: function (a) {
                    g.reportType = a.value;
                    if (a.value == "01") {
                        var yesterday = e.getDate(-1);
                        g.$searchBar.find(".startTime").datetimebox("setValue", yesterday + e.getStartHour());
                        g.$searchBar.find(".endTime").datetimebox("setValue", yesterday + e.getEndHour());
                    }
                    else if (a.value == "02") {
                        var monday = e.getMonday();
                        g.$searchBar.find(".startTime").datetimebox("setValue", e.getDate(-monday - 7) + e.getStartHour());
                        g.$searchBar.find(".endTime").datetimebox("setValue", e.getDate(-monday - 1) + e.getEndHour());
                    }
                    else if (a.value == "03") {
                        g.$searchBar.find(".startTime").datetimebox("setValue", e.getMonth("s", -1) + e.getStartHour());
                        g.$searchBar.find(".endTime").datetimebox("setValue", e.getMonth("g", -1) + e.getEndHour());
                    }
                }
            });
            d.find("#sortType").combobox({
                required: !0,
                width: 150,
                onSelect: function (a) {
                    g.sortType = a.value;
                }
            });
            d.find(".easyui-linkbutton").linkbutton({
                onClick: function () {
                    var b = a(this).attr("data-operation");
                    b && g[b] && g[b].call(g);
                }
            }),
            g.$searchBar = d;
            g.$searchBar.find(".startTime").datetimebox("setValue", e.getMonth("s", -1) + e.getStartHour());
            g.$searchBar.find(".endTime").datetimebox("setValue", e.getMonth("g", -1) + e.getEndHour());
        },
        doInitTable1: function (c, e, f, g) {
            var h = this;
            h.$table1 = a(document.createElement("table")).appendTo(h.$tablePanel1);
            h.$table1 && h.$table1.size() && h.$table1.datagrid(b.extend({
                fit: !0,
                border: !1,
                striped: !0,
                method: "get",
                pagination: !0,
                singleSelect: !0,
                loadMsg: "加载数据中...",
                cache: !1,
                idField: h.idField,
                textField: h.textField,
                queryParams: h.queryParams,
                url: h.getHref(!1, h.controller, "DataRowIndex"),
                columns: h.getTableColumns1(),
                onResize: function () {
                    h.$ajaxDialog && (h.$ajaxDialog.dialog("restore"), h.$ajaxDialog.dialog("maximize"))
                },
                onSelect: function (a, b) {
                    h.currentRow = b
                },
                onLoadError: function () {
                    a.messager.alert("提示", "服务器忙，请稍后再试！", "warning")
                },
                onDblClickRow: function (a, b) {
                    h.currentRow = b,
                    h.doEdit && h.doEdit()
                }
            },
            c));
        },
        doInitTable2: function (c, e, f, g) {
            var h = this;
            h.$table2 = a(document.createElement("table")).appendTo(h.$tablePanel2);
            h.$table2 && h.$table2.size() && h.$table2.datagrid(b.extend({
                fit: !0,
                border: !1,
                striped: !0,
                method: "get",
                pagination: !0,
                singleSelect: !0,
                loadMsg: "加载数据中...",
                cache: !1,
                idField: h.idField,
                textField: h.textField,
                queryParams: h.queryParams,
                url: h.getHref(!1, h.controller, "DataRowIndex"),
                columns: h.getTableColumns2(),
                onResize: function () {
                    h.$ajaxDialog && (h.$ajaxDialog.dialog("restore"), h.$ajaxDialog.dialog("maximize"))
                },
                onSelect: function (a, b) {
                    h.currentRow = b
                },
                onLoadError: function () {
                    a.messager.alert("提示", "服务器忙，请稍后再试！", "warning")
                },
                onDblClickRow: function (a, b) {
                    h.currentRow = b,
                    h.doEdit && h.doEdit()
                }
            },
            c));
        },
        doSearch: function () {
            var b = this;
            b.sortType && (b.$table.datagrid("options").url = b.getHref(!1, b.controller, "ConcentrationReportDataRow"),
            b.$table.datagrid("reload", {
                SortType: b.sortType,
                StartTime: b.$searchBar.find(".startTime").datetimebox("getValue"),
                EndTime: b.$searchBar.find(".endTime").datetimebox("getValue")
            }));
            b.sortType && (b.$table1.datagrid("options").url = b.getHref(!1, b.controller, "DischargeReportDataRow"),
            b.$table1.datagrid("reload", {
                SortType: b.sortType,
                StartTime: b.$searchBar.find(".startTime").datetimebox("getValue"),
                EndTime: b.$searchBar.find(".endTime").datetimebox("getValue")
            }));
            b.sortType && (b.$table2.datagrid("options").url = b.getHref(!1, b.controller, "AlarmTimeReportDataRow"),
            b.$table2.datagrid("reload", {
                SortType: b.sortType,
                StartTime: b.$searchBar.find(".startTime").datetimebox("getValue"),
                EndTime: b.$searchBar.find(".endTime").datetimebox("getValue")
            }));
        },
        createReport: function () {
            var a = this,
                b, d;
            b = a.$panel.find(".easyui-layout").layout(),
            d = b.layout("panel", "north"),
            CollectionCodes = [];

            var grid = d.find(".EquipInfo").combogrid("grid");
            var rows = grid.datagrid('getSelections');

            for (var j = 0; j < rows.length; j++) {
                var row = rows[j];
                CollectionCodes.push(row.CollectionCode);
            }

            var strurl = '../ReportInfo/SchoolMonthlyReporting' + '?CollectionCodes=' + CollectionCodes.toString() + 
                        '&StartTime=' + a.$searchBar.find(".startTime").datetimebox("getValue") + '&EndTime=' + a.$searchBar.find(".endTime").datetimebox("getValue");
            window.open(strurl);
        },

        dispose: function () {
            this.base("dispose");
        }
    });
    return j;
})