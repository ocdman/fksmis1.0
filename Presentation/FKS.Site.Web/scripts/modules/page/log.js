/// <reference path="main_ui.js" />
define([
    "jquery",
    "underscore",
    "backbone",
    "knockout",
    "helper",
    "modules/base/manager_base",
    "modules/main_ui",
    "text!templates/toolbars/common/toolbar_1.html","localdata/logtype","localdata/operationresulttype"
], function ($, _, Backbone, ko, _helper, ManagerBase, mainUi, toolBarTmp, logtype, operationresulttype) {
    var View = ManagerBase.extend({
        controller: "LogInfo",
        idField: "Operator",
        textField: "IpAddress",
        searchViewModel: null,
        doInit: function (title, icon) {
            var _this = this;

            if (_this.base("doInit", [title])) {
                _this.doAddTab({
                    title: title,
                    iconCls: icon,
                    closable: true,
                    href: _this.getHref(!1,
                        _this.controller,
                        "Index"),
                    onLoad: function () { _this.render()}
                });
                mainUi.doAddModule(_this.controller, title, _this);
                return true;
            }
            return false;
        },
        getTableColumns: function () {
            return [[
                { field: 'Operator', title: '操作者', width: 120, sortable: true },
                { field: 'IpAddress', title: 'IP地址', width: 150, sortable: true },
                {
                    field: 'LogTypeNum', title: '日志类型', width: 120, sortable: true,
                    formatter: function (a) {
                        for (var b in logtype) {
                            var c = logtype[b];
                            if (c.value == a) return c.text;
                        }
                    }
                },
                {
                    field: 'ResultTypeNum', title: '结果类型', width: 120, sortable: true,
                    formatter: function (a) {
                        for (var b in operationresulttype) {
                            var c = operationresulttype[b];
                            if (c.value == a) return c.text;
                        }
                    }
                },
                { field: 'Message', title: '消息', width: 220, sortable: true },
                {
                    field: 'AddDate', title: '操作时间', width: 150, sortable: true,
                    formatter: function (a) {
                        var milliseconds = parseInt(a.replace(/\D/igm, ""));
                        var date = new Date(milliseconds);
                        return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日"
                        + date.getHours() + "时" + date.getMinutes() + "分";
                        //return e.getUnixToTime(a)
                    }
                }
            ]];
        },
        render: function () {
            var a, b = this;
            a = b.$panel.find(".easyui-layout").layout(),
            b.$tablePanel = a.layout("panel", "center"),
            c = a.layout("panel", "north"),
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
            c.find(".easyui-linkbutton").linkbutton({
                onClick: function () {
                    var d = $(this).attr("data-operation");
                    d && b[d] && b[d].call(b)
                }
            }),
            b.$searchBar = c
            //var _this = this;
            //ko.applyBindings(this.searchViewModel, this.$searchBar[0]);
        },
        doSearch: function(){
            var a = this,
                b = a.$searchBar.find(".startTime").datetimebox("getValue"),
                c = a.$searchBar.find(".endTime").datetimebox("getValue");
            b && c && (a.$table.datagrid("options").url = a.getHref(!1, a.controller, "LogInfoDataRow"),
            a.$table.datagrid("reload",
                {
                    StartTime: b,
                    EndTime: c
                }))
        },
        dispose: function () {

        },
    });

    return View;
});