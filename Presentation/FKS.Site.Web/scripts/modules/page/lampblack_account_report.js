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
            return [[{
                field: "Ldb",
                title: "联动比",
                width: 80,
                sortable: !1
            }, {
                field: "NDbjCount",
                title: "超标次数",
                width: 100,
                sortable: !1,
            }, {
                field: "Avgjjd",
                title: "洁净度",
                width: 100,
                sortable: !1
            }, {
                field: "AccountDate",
                title: "日期",
                width: 80,
                sortable: !1
            }]];
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
                columns: i.prototype.getTableColumns.call(this),
                onSelect: function (a, b) {
                    g.currentId = b.CollectionCode,
                    g.nickName = b.NickName,
                    g.address = b.Address
                }
            }),
            g.doInitTable({
                rownumbers: !0,
                onLoadSuccess: function (a) {

                },
                onDbClickRow: a.noop,
                url: "",
                pagination: !0,
                pageSize: 50,
                pageList: [50]
            }, [], "", ""),
            d.find(".easyui-linkbutton").linkbutton({
                onClick: function () {
                    var b = a(this).attr("data-operation");
                    b && g[b] && g[b].call(g);
                }
            }),
            d.find("#month").combobox({
                required: !0,
                width: 150,
                onSelect: function (a) {
                    var thisMonth = (new Date()).getMonth() + 1;
                    if (a.value == "01") {
                        g.StartTime = e.getMonth("s", 1 - thisMonth);
                        g.EndTime = e.getMonth("d", 1 - thisMonth);
                    }
                    else if (a.value == "02") {
                        g.StartTime = e.getMonth("s", 2 - thisMonth);
                        g.EndTime = e.getMonth("d", 2 - thisMonth);
                    }
                    else if (a.value == "03") {
                        g.StartTime = e.getMonth("s", 3 - thisMonth);
                        g.EndTime = e.getMonth("d", 3 - thisMonth);
                    }
                    else if (a.value == "04") {
                        g.StartTime = e.getMonth("s", 4 - thisMonth);
                        g.EndTime = e.getMonth("d", 4 - thisMonth);
                    }
                    else if (a.value == "05") {
                        g.StartTime = e.getMonth("s", 5 - thisMonth);
                        g.EndTime = e.getMonth("d", 5 - thisMonth);
                    }
                    else if (a.value == "06") {
                        g.StartTime = e.getMonth("s", 6 - thisMonth);
                        g.EndTime = e.getMonth("d", 6 - thisMonth);
                    }
                    else if (a.value == "07") {
                        g.StartTime = e.getMonth("s", 7 - thisMonth);
                        g.EndTime = e.getMonth("d", 7 - thisMonth);
                    }
                    else if (a.value == "08") {
                        g.StartTime = e.getMonth("s", 8 - thisMonth);
                        g.EndTime = e.getMonth("d", 8 - thisMonth);
                    }
                    else if (a.value == "09") {
                        g.StartTime = e.getMonth("s", 9 - thisMonth);
                        g.EndTime = e.getMonth("d", 9 - thisMonth);
                    }
                    else if (a.value == "10") {
                        g.StartTime = e.getMonth("s", 10 - thisMonth);
                        g.EndTime = e.getMonth("d", 10 - thisMonth);
                    }
                    else if (a.value == "11") {
                        g.StartTime = e.getMonth("s", 11 - thisMonth);
                        g.EndTime = e.getMonth("d", 11 - thisMonth);
                    }
                    else if (a.value == "12") {
                        g.StartTime = e.getMonth("s", 12 - thisMonth);
                        g.EndTime = e.getMonth("d", 12 - thisMonth);
                    }
                }
            });
            //c.find(".datepicker").val(e.DateFormat(new Date(), "yyyy-MM"));
            //a(".datepicker").select(function () {
            //    alert("hello");
            //})
            g.$searchBar = d;
        },
        doAccount: function () {
            //var b = this;
            //b.currentId && a.ajax({
            //    url: b.getHref(!1, b.controller, "LampblackAccountReporting"),
            //    data: {
            //        tableName: b.currentId,
            //        //StartTime: c,
            //        //EndTime: d
            //    },
            //    success: function (a) {
            //        console.log(a);
            //        //b.doRenderChart(a);
            //    },
            //    error: function () {
            //        a.messager.alert("提示", "获取数据失败", "error");
            //    }
            //})

            var aa = this;
            if (aa.currentId != 0)
            {
                var strurl = '../ReportInfo/LampblackAccountReporting' + '?collectionCode=' + aa.currentId + '&StartTime='
                + aa.StartTime + '&EndTime=' + aa.EndTime + '&NickName=' + aa.nickName + '&Address=' + aa.address;
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