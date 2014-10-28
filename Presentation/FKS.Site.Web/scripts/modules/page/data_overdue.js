/// <reference path="main_ui.js" />
define([
    "jquery",
    "underscore",
    "backbone",
    "knockout",
    "helper",
    "modules/base/manager_base",
    "modules/main_ui",
    "text!templates/toolbars/common/toolbar_1.html",
    "text!templates/search_condition/overdual.html"
], function ($, _, Backbone, ko, _helper, ManagerBase, mainUi, toolBarTmp, overdualTmp) {
    var View = ManagerBase.extend({
        controller: "DataAnalyse",
        idField: "CollectionCode",
        overdualType: "01",
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
                        "OverdueDataIndex"),
                    onLoad: function () { _this.render() }
                });
                mainUi.doAddModule(_this.controller, title, _this);
                return true;
            }
            return false;
        },
        getTableColumns: function () {
            return [[
                { field: 'ck', checkbox: !0 },
                { field: 'NickName', title: '用户名', width: 100, sortable: !0 },
                { field: 'Address', title: '用户地址', width: 150, sortable: !0 },
                { field: 'CollectionCode', title: '设备ID', width: 100, sortable: !0 },
                {
                    field: 'CleanTime', title: '上次维护时间', width: 100, sortable: !0,
                    formatter: function (a) {
                        return _helper.DateFormat(_helper.getUnixToTime1(a.replace("/Date(", "").replace(")/", "")), "yyyy-MM-dd")
                    }
                },
                {
                    field: 'NextCleanTime', title: '下次维护时间', width: 100, sortable: !0,
                    formatter: function (a) {
                        return _helper.DateFormat(_helper.getUnixToTime1(a.replace("/Date(", "").replace(")/", "")), "yyyy-MM-dd")
                    }
                },
                { field: 'Category', title: '类型', width: 100, sortable: !0 },
            ]];
        },
        render: function () {
            var a, b = this;
            a = b.$panel.find(".easyui-layout").layout(),
            b.$tablePanel = a.layout("panel", "center"),
            //c = a.layout("panel", "north"),
            this.doInitTable({
                rownumbers: !0,
                singleSelect: !1,
                //onLoadSuccess: function (a) {
                //    f.doRenderChart(a.rows)
                //},
                pageSize: 200,
                pageList: [200],
                onDblClickRow: $.noop,
                url: b.getHref(!1, b.controller, "OverdueDataRow" + "?overdualType=" + b.overdualType),
            },
                [{
                    operation: "UpdateCleanTime",
                    text: "更新维护时间设备",
                    icon: "save",
                    toggle: !1,
                    selected: !1
                }, {
                    operation: "doShowSearch",
                    text: "查询条件",
                    icon: "redo",
                    toggle: !0,
                    selected: !1
                }],
                toolBarTmp,
                overdualTmp);
            b.$tablePanel.find("#overdualType").combobox({
                required: !0,
                width: 150,
                panelHeight: "auto",
                onSelect: function (a) {
                    b.overdualType = a.value;
                }
            })

            //b.$searchBar = c;
            //b["doSearch"].call(b);
            //var _this = this;
            //ko.applyBindings(this.searchViewModel, this.$searchBar[0]);
        },
        UpdateCleanTime: function () {
            var a = this,
                ss = [],
                rowsIndex = [];
            var rows = a.$table.datagrid('getSelections');
            
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                ss.push(row.CollectionCode);
                rowsIndex.push(a.$table.datagrid('getRowIndex', row));
            }
            if (rows.length == 0) {
                $.messager.alert('提示', "请选中行", "warning");
                return;
            }
            //$.messager.alert('Info', ss.join('<br />'));
            $.ajax({
                url: a.getHref(!1, a.controller, "UpdateCleanTime"),
                data: {
                    CollectionCodes: ss.toString()
                },
                success: function (b) {
                    $.messager.alert("提示", "操作成功", "info");
                    for(var i in rowsIndex){
                        a.$table.datagrid("deleteRow", i)
                    }
                    a.$table.datagrid("reload");
                },
                error: function () {
                    $.messager.alert('提示', "操作失败", "error");
                }
            })
        },
        doSearch: function () {
            var a = this;
            (a.$table.datagrid("options").url = a.getHref(!1, a.controller, "OverdueDataRow" + "?overdualType=" + a.overdualType),
            a.$table.datagrid("reload",
                {}))
        },
        dispose: function () {

        },
    });

    return View;
});