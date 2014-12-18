define(["jquery",
    "underscore",
    "backbone",
    "knockout",
    "helper",
    "plugins/map",
    "modules/base/manager_base",
    "modules/main_ui",
    "modules/page/equipment_manager",
    "localdata/jurisdiction"],
function (a, b, c, d, e, f, g, h, i, k) {
    var j = g.extend({
        controller: "ReportInfo",
        $jqPlot: null,
        timeID: 0,
        LineData: {},
        serials: [],
        currentId: 0,
        isStop: !0,
        StartTime: e.getMonth("s", -(new Date()).getMonth()),
        EndTime: e.getMonth("d", -(new Date()).getMonth()),
        nickName: "",
        address: "",
        doInit: function (a, b) {
            var c = this;
            return c.base("doInit", [a], g) ? (c.doAddTab({
                title: a,
                iconCls: b,
                href: c.getHref(!1, c.controller, "LampblackAccountIndex"),
                closable: !0,
                onLoad: function () {
                    c.render();
                }
            }), h.doAddModule(c.controller, a, c), !0) : !1
        },
        getTableColumns: function () {
            var _this = this;
            return [[{
                field: "AccountDate",
                title: "日期",
                width: 80,
                sortable: !1,
                formatter: function (a) {
                    return e.DateFormat(e.getUnixToTime1(a.replace("/Date(", "").replace(")/", "")), "yyyy-MM-dd");
                }
            },{
                field: "Ldb",
                title: "联动比",
                width: 80,
                sortable: !1,
                formatter: function (a) {
                    return a >= 0.9 ? "√" : "×";
                }
            }, {
                field: "NDbjCount",
                title: "超标次数",
                width: 100,
                sortable: !1,
                formatter: function (a,b) {
                    return b.AvgND <= 2.0 ? "√" : (a < 20 ? "○" : "×");
                }
            }, {
                field: "Avgjjd",
                title: "洁净度",
                width: 100,
                sortable: !1,
                formatter: function (b) {
                    return b >= 4 ? "√" : "×";
                }
            }, {
                field: "NickName",
                title: "单位",
                width: 150,
                sortable: !1,
            }, {
                field: "Address",
                title: "地址",
                width: 220,
                sortable: !1,
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
                    for (var b in k) {
                        var c = k[b];
                        if (c.value == a) return c.text;
                    }
                    return a;
                }
            }]]
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
            g.$tablePanel = f.tabs("getTab", 0);
            g.doInitCombogrid(d.find(".EquipInfo"), {
                idField: i.prototype.idField,
                textField: i.prototype.textField,
                url: g.getHref(!1, i.prototype.controller, "DataRowIndex"),
                columns: g.getTableColumns3(),
                multiple: !0,
                onSelect: function (a, b) {
                    g.currentId = b.CollectionCode
                }
            }),
            g.doInitTable({
                rownumbers: !0,
                onLoadSuccess: function (a) {

                },
                onDbClickRow: a.noop,
                url: "",
                pagination: !0,
                pageSize: 100,
                pageList: [300, 200, 100]
            }, [], "", ""),
            d.find(".easyui-linkbutton").linkbutton({
                onClick: function () {
                    var b = a(this).attr("data-operation");
                    b && g[b] && g[b].call(g);
                }
            }),
            d.find(".monthpicker").val(e.DateFormat(new Date(e.getMonth("s", -1)), "yyyy-MM"));
            //a(".datepicker").select(function () {
            //    alert("hello");
            //})
            g.$searchBar = d;
        },
        getStartAndEndTime: function (year, month) {
            var g = this;
            var thisMonth = (new Date()).getMonth() + 1;
            var thisYear = new Date().getFullYear();
            if (month == "01") {
                g.StartTime = e.getMonth("s", 1 - thisMonth).replace(thisYear, year);
                g.EndTime = e.getMonth("d", 1 - thisMonth).replace(thisYear, year);
            }
            else if (month == "02") {
                g.StartTime = e.getMonth("s", 2 - thisMonth).replace(thisYear, year);
                g.EndTime = e.getMonth("d", 2 - thisMonth).replace(thisYear, year);
            }
            else if (month == "03") {
                g.StartTime = e.getMonth("s", 3 - thisMonth).replace(thisYear, year);
                g.EndTime = e.getMonth("d", 3 - thisMonth).replace(thisYear, year);
            }
            else if (month == "04") {
                g.StartTime = e.getMonth("s", 4 - thisMonth).replace(thisYear, year);
                g.EndTime = e.getMonth("d", 4 - thisMonth).replace(thisYear, year);
            }
            else if (month == "05") {
                g.StartTime = e.getMonth("s", 5 - thisMonth).replace(thisYear, year);
                g.EndTime = e.getMonth("d", 5 - thisMonth).replace(thisYear, year);
            }
            else if (month == "06") {
                g.StartTime = e.getMonth("s", 6 - thisMonth).replace(thisYear, year);
                g.EndTime = e.getMonth("d", 6 - thisMonth).replace(thisYear, year);
            }
            else if (month == "07") {
                g.StartTime = e.getMonth("s", 7 - thisMonth).replace(thisYear, year);
                g.EndTime = e.getMonth("d", 7 - thisMonth).replace(thisYear, year);
            }
            else if (month == "08") {
                g.StartTime = e.getMonth("s", 8 - thisMonth).replace(thisYear, year);
                g.EndTime = e.getMonth("d", 8 - thisMonth).replace(thisYear, year);
            }
            else if (month == "09") {
                g.StartTime = e.getMonth("s", 9 - thisMonth).replace(thisYear, year);
                g.EndTime = e.getMonth("d", 9 - thisMonth).replace(thisYear, year);
            }
            else if (month == "10") {
                g.StartTime = e.getMonth("s", 10 - thisMonth).replace(thisYear, year);
                g.EndTime = e.getMonth("d", 10 - thisMonth).replace(thisYear, year);
            }
            else if (month == "11") {
                g.StartTime = e.getMonth("s", 11 - thisMonth).replace(thisYear, year);
                g.EndTime = e.getMonth("d", 11 - thisMonth).replace(thisYear, year);
            }
            else if (month == "12") {
                g.StartTime = e.getMonth("s", 12 - thisMonth).replace(thisYear, year);
                g.EndTime = e.getMonth("d", 12 - thisMonth).replace(thisYear, year);
            }
        },
        doAccount: function () {
            var aa = this,
            c = aa.$searchBar.find(".monthpicker").val();
            year = c.substr(0, 4);
            month = c.substr(5);
            aa.getStartAndEndTime(year, month);
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
            if (ss.length > 0)
            {
                var strurl = '../ReportInfo/LampblackAccountReporting' + '?collectionCode=' + ss.toString() + '&StartTime='
                + aa.StartTime + '&EndTime=' + aa.EndTime;
                window.open(strurl);
            }
            else {
                a.messager.alert("提示", "请选择设备！", "warning");
            }
            
        },
        doSearch: function () {
            var b = this;
            c = b.$searchBar.find(".monthpicker").val();
            year = c.substr(0, 4);
            month = c.substr(5);
            b.getStartAndEndTime(year, month);
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
            b.$table.datagrid("options").url = b.getHref(!1, b.controller, "LampblackAccountDataRaw"),
            b.$table.datagrid("reload", {
                CollectionCode: ss.toString(),
                StartTime: b.StartTime,
                EndTime: b.EndTime
            });
        },
        dispose: function () {
            this.base("dispose");
        }
    });
    return j;
})