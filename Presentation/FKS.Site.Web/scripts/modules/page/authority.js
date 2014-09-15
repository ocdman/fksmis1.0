/// <reference path="main_ui.js" />
define([
    "jquery",
    "underscore",
    "backbone",
    "knockout",
    "helper",
    "modules/base/manager_base",
    "modules/main_ui",
    "text!templates/toolbars/common/toolbar_1.html", "localdata/logtype", "localdata/operationresulttype"
], function ($, _, Backbone, ko, _helper, ManagerBase, mainUi, toolBarTmp, logtype, operationresulttype) {
    var View = ManagerBase.extend({
        controller: "Authority",
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
                    onLoad: function () { _this.render() }
                });
                mainUi.doAddModule(_this.controller, title, _this);
                return true;
            }
            return false;
        },
        render: function () {
            var a, b = this;
            a = b.$panel.find(".easyui-layout").layout(),
            c = a.layout("panel", "north"),
            c.find(".easyui-linkbutton").linkbutton({
                onClick: function () {
                    var d = $(this).attr("data-operation");
                    d && b[d] && b[d].call(b)
                }
            }),
            b.$searchBar = c
        },
        doStart: function () {
            var b = this;
            $.ajax({
                url: b.getHref(!1, b.controller, "Start"),
                method: "get",
                success: function (a) {
                    //console.log(a);
                    //b.doAjaxSuccess(a);
                    $.messager.alert("提示", "操作成功", "success")
                },
                error: function () {
                    $.messager.alert("提示", "获取数据失败！", "error")
                }
            })
        },
        doStop: function () {
            var b = this;
            $.ajax({
                url: b.getHref(!1, b.controller, "Stop"),
                method: "get",
                success: function (a) {
                    //console.log(a);
                    //b.doAjaxSuccess(a);
                    $.messager.alert("提示", "操作成功", "success")
                },
                error: function () {
                    $.messager.alert("提示", "获取数据失败！", "error")
                }
            })
        },
        dispose: function () {

        },
    });

    return View;
});