/// <reference path="main_ui.js" />
define([
    "jquery",
    "underscore",
    "backbone",
    "knockout",
    "helper",
    "modules/base/manager_base",
    "modules/main_ui",
    "text!templates/toolbars/common/toolbar_1.html"
], function ($, _, Backbone, ko, _helper, ManagerBase, mainUi, toolBarTmp) {
    var View = ManagerBase.extend({
        controller: "DataAnalyse",
        searchViewModel: null,
        SI: null,
        time: 60,
        seconds: 0,
        doInit: function (title, icon) {
            var _this = this;

            if (_this.base("doInit", [title])) {
                _this.doAddTab({
                    title: title,
                    iconCls: icon,
                    closable: true,
                    href: _this.getHref(!1,
                        _this.controller,
                        "AbnormalDataIndex"),
                    onLoad: function () { _this.render()}
                });
                mainUi.doAddModule(_this.controller, title, _this);
                return true;
            }
            return false;
        },
        getTableColumns: function () {
            return [[
                { field: 'NickName', title: '用户名', width: 100, sortable: true },
                { field: 'Address', title: '用户地址', width: 150, sortable: true },
                { field: 'CollectionCode', title: '设备ID', width: 100, sortable: true },

                {
                    field: 'OnOff', title: '连接状态', width: 100, sortable: true,
                    formatter: function (a) {
                        if (a == 0)
                            return "离线";
                        else
                            return "在线";
                    }
                },
                {
                    field: 'ZTst', title: '探测器', width: 100, sortable: true,
                    formatter: function (a, b) {
                        if (b.OnOff == 0)
                            return "----";
                        else
                        {
                            if (a == 1)
                                return "报警";
                            else
                                return "正常";
                        }
                    }
                },
                {
                    field: 'ZTqd', title: '信号强度', width: 100, sortable: true,
                    formatter: function (a, b) {
                        if (b.OnOff == 0)
                            return "----";
                        else {
                            if (a < 15 && a >= 10) {
                                return "弱";
                            }
                            else if (a < 10) {
                                return "差";
                            }
                            else if (a >= 15 && a < 20) {
                                return "正常";
                            }
                            else if (a >= 20) {
                                return "良好";
                            }
                        }
                    }
                }
            ]];
        },
        render: function () {
            var a, b = this;
            a = b.$panel.find(".easyui-layout").layout(),
            b.$tablePanel = a.layout("panel", "center"),
            //c = a.layout("panel", "north"),
            this.doInitTable({
                rownumbers: !0,
                //onLoadSuccess: function (a) {
                //    f.doRenderChart(a.rows)
                //},
                pageSize: 200,
                pageList: [200],
                onDblClickRow: $.noop,
                url: ""
            },
                [],
                "",
                ""),
            //c.find(".easyui-linkbutton").linkbutton({
            //    onClick: function () {
            //        var d = $(this).attr("data-operation");
            //        d && b[d] && b[d].call(b)
            //    }
            //}),
            //b.$searchBar = c;
            b["doSearch"].call(b);
            //var _this = this;
            //ko.applyBindings(this.searchViewModel, this.$searchBar[0]);
        },
        doSearch: function(){
            var a = this;
            a.seconds = a.time;
            //(a.$table.datagrid("options").url = a.getHref(!1, a.controller, "AbnormalDataRow"),
            //a.$table.datagrid("reload",
            //    {}))
            (a.$table.datagrid("options").url = a.getHref(!1, a.controller, "AbnormalDataRow"))
            if (a.SI != null) {
                clearInterval(a.SI);
            }
            a.SI = setInterval(function () {
                a.doSearchTiming()
            }, 1000);
        },
        doSearchTiming: function () {
            var b = this;
            b.seconds -= 1;
            $("#hintAbnormal").html("离下次刷新时间还有 " + b.seconds + " 秒");
            if (b.seconds == 0) {
                b.$table.datagrid("loadData", []),
                $.ajax({
                    url: b.getHref(!1, b.controller, "AbnormalDataRow"),
                    success: function (c) {
                        for (var d in c)
                            b.$table.datagrid("appendRow", c[d]);
                    },
                    error: function () {
                        alert("error")
                    }
                });
                b.seconds = b.time;
            }
        },
        dispose: function () {
            this.base("dispose");
            clearInterval(this.SI);
        },
    });

    return View;
});