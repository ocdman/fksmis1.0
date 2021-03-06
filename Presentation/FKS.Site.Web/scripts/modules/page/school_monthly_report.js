﻿define(["jquery",
    "underscore",
    "backbone",
    "knockout",
    "helper",
    "plugins/map",
    "modules/base/manager_base",
    "modules/main_ui",
    "modules/page/equipment_manager",
    "localdata/jurisdiction"],
function (a, b, c, d, e, f, g, h, i, l) {
    var j = g.extend({
        controller: "ReportInfo",
        $jqPlot: null,
        timeID: 0,
        reportType: "03",
        sortType: "01",
        sortObject: "01",
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
            var a = this;
            return [[{
                field: "NickName",
                title: "企业名称",
                width: 100,
                sortable: !1
            }, {
                field: "AlarmTime",
                title: "报警次数(次)",
                width: 100,
                sortable: !1,
            }, {
                field: "CountTime",
                title: "总次数(次)",
                width: 100,
                sortable: !1
            }, {
                field: "SumDischarge",
                title: "排放量(克)",
                width: 100,
                sortable: !1
            }, {
                field: "AvgConcentration",
                title: "油烟浓度(mg/m³)",
                width: 100,
                sortable: !1,
                formatter: function (a) {
                    var b = a.toFixed(2);
                    return a == 0 ? 0 : (b == "0.00" ? 0 : b);
                }
            }, {
                field: "Clean",
                title: "清洁度",
                width: 100,
                sortable: !1,
                formatter: function (b) {
                    return b >= 5 && (b = 4),
                    a.getLevel(b);
                }
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
                width: 250,
                sortable: !1
            },
            {
                field: "EquipCount",
                title: "探测器数量",
                width: 70,
                sortable: !1
            },
            {
                field: "Jurisdiction",
                title: "管辖",
                width: 80,
                sortable: !1,
                formatter: function (a) {
                    for (var b in l) {
                        var c = l[b];
                        if (c.value == a) return c.text;
                    }
                    return a;
                }
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
                }
            });
            g.doInitCombogrid(d.find(".EquipInfo"), {
                idField: i.prototype.idField,
                textField: i.prototype.textField,
                url: g.getHref(!1, i.prototype.controller, "DataRowIndexForSchool"),
                columns: g.getTableColumns3(),
                multiple: !0,
                OnSelect: function (a, b) {
                    g.currentId = b.CollectionCode
                }
            }),
            g.$tablePanel = f.tabs("getTab", 0);

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
            d.find("#sortObject").combobox({
                required: !0,
                width: 150,
                onSelect: function (a) {
                    g.sortObject = a.value;
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
        doSearch: function () {
            var b = this;
            var a, d;
            a = b.$panel.find(".easyui-layout").layout(),
            d = a.layout("panel", "north"),
            ss = [];

            var grid = d.find(".EquipInfo").combogrid("grid");
            var rows = grid.datagrid('getSelections');

            for (var j = 0; j < rows.length; j++) {
                var row = rows[j];
                ss.push(row.CollectionCode);
            }

            b.sortType && b.sortObject && (b.$table.datagrid("options").url = b.getHref(!1, b.controller, "SchoolMonthlyReportDataRow"),
            b.$table.datagrid("reload", {
                CollectionCodes: ss.toString(),
                SortType: b.sortType,
                SortObject: b.sortObject,
                StartTime: b.$searchBar.find(".startTime").datetimebox("getValue"),
                EndTime: b.$searchBar.find(".endTime").datetimebox("getValue")
            }));
        },
        createReport: function () {
            var aa = this,
                b, d;
            b = aa.$panel.find(".easyui-layout").layout(),
            d = b.layout("panel", "north"),
            ss = [];

            var grid = d.find(".EquipInfo").combogrid("grid");
            var rows = grid.datagrid('getSelections');

            for (var j = 0; j < rows.length; j++) {
                var row = rows[j];
                ss.push(row.CollectionCode);
            }

            if (ss.length > 0) {
                var strurl = '../ReportInfo/SchoolMonthlyReporting' + '?CollectionCodes=' + ss.toString() + '&SortType=' + aa.sortType + '&SortObject=' + aa.sortObject +
                        '&StartTime=' + aa.$searchBar.find(".startTime").datetimebox("getValue") + '&EndTime=' + aa.$searchBar.find(".endTime").datetimebox("getValue");
                window.open(strurl);
            }
            else {
                a.messager.alert("提示", "请选择设备！", "warning");
            }
        },

        dispose: function () {
            this.base("dispose");
        }
    });
    return j;
})