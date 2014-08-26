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
                { field: 'EquipCode', title: '设备ID', width: 100, sortable: true },
                { field: 'ZTqd', title: '信号强度', width: 100, sortable: true },
                { field: 'OnOff', title: '连接状态', width: 100, sortable: true, formatter: function () { return "离线" } },
                { field: 'ZTst', title: '探测器', width: 100, sortable: true, formatter: function () { return "报警" } },
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
            (a.$table.datagrid("options").url = a.getHref(!1, a.controller, "AbnormalDataRow"),
            a.$table.datagrid("reload",
                {}))
        },
        dispose: function () {

        },
    });

    return View;
});