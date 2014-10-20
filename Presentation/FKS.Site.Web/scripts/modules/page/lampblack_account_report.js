﻿define(["jquery",
    "underscore",
    "backbone",
    "knockout",
    "helper",
    "plugins/map",
    "modules/base/manager_base",
    "modules/main_ui",
    "modules/page/equipment_manager",
    "plugins/js/highcharts",
    "plugins/js/highcharts-more",
    "plugins/js/modules/exporting"],
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
        render: function () {
            var b, c, d, g = this;
            b = g.$panel.find(".easyui-layout").layout(),
            c = b.layout("panel", "center"),
            d = b.layout("panel", "north"),
            c.find(".EquipInfo").combogrid({
                idField: i.prototype.idField,
                textField: i.prototype.textField,
                url: g.getHref(!1, i.prototype.controller, "DataRowIndex"),
                columns: i.prototype.getTableColumns.call(this),
                width: 150,
                panelWidth: 450,
                required: !0,
                pagination: !0,
                onSelect: function (a, b) {
                    g.currentId = b.CollectionCode,
                    g.nickName = b.NickName,
                    g.address = b.Address
                }
            }),
            c.find(".easyui-linkbutton").linkbutton({
                onClick: function () {
                    var b = a(this).attr("data-operation");
                    b && g[b] && g[b].call(g);
                }
            }),
            c.find("#month").combobox({
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
            g.$searchBar = c;
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

            var a = this;
            var strurl = '../ReportInfo/LampblackAccountReporting' + '?collectionCode=' + a.currentId + '&StartTime='
                + a.StartTime + '&EndTime=' + a.EndTime + '&NickName=' + a.nickName + '&Address=' + a.address;
            window.open(strurl);
        },
        dispose: function () {
            this.base("dispose");
        }
    });
    return j;
})