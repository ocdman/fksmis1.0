/*! fks 07-07-2014 */
define(["jquery",
    "underscore",
    "backbone",
    "knockout",
    "helper",
    "plugins/map",
    "modules/base/manager_base",
    "modules/main_ui",
    "text!templates/toolbars/common/toolbar_1.html"],
function (a, b, c, d, e, f, g, h, l) {
    var n = g.extend({
        controller: "OperationMaintenance",
        idField: "CollectionCode",
        textField: "NickName",
        map: null,
        viewModel: null,
        title: "",
        doInit: function (a, b) {
            var c = this;
            return c.base("doInit", [a], g) ? (c.doAddTab({
                title: a,
                closable: !0,
                iconCls: b
            }), h.doAddModule(c.controller, a, c), c.render(), !0) : !1
        },
        getTableColumns: function () {
            return [[
            {
                field: "ContractNo",
                title: "合同编号",
                width: 100,
                sortable: !1
            },
            {
                field: "NickName",
                title: "顾客名称",
                width: 150,
                sortable: !1
            },
            {
                field: "ContractStartTime",
                title: "合同起始日期",
                width: 100,
                sortable: !1,
                formatter: function (a) {
                    return a != null ? e.DateFormat(e.getUnixToTime1(a.replace("/Date(", "").replace(")/", "")), "yyyy/MM/dd") : "";
                }
            },
            {
                field: "OpenTime",
                title: "安装日期",
                width: 100,
                sortable: !1,
                formatter: function (a) {
                    return a != null ? e.DateFormat(e.getUnixToTime1(a.replace("/Date(", "").replace(")/", "")), "yyyy/MM/dd") : "";
                }
            },
            {
                field: "OperationMaintenanceTime",
                title: "运维日期",
                width: 100,
                sortable: !1,
                formatter: function (a) {
                    return a != null ? e.DateFormat(e.getUnixToTime1(a.replace("/Date(", "").replace(")/", "")), "yyyy/MM/dd") : "";
                }
            },
            {
                field: "OperationMaintenanceContractExpirationTime",
                title: "运维合同周期到期日",
                width: 100,
                sortable: !1,
                formatter: function (a) {
                    return a != null ? e.DateFormat(e.getUnixToTime1(a.replace("/Date(", "").replace(")/", "")), "yyyy/MM/dd") : "";
                }
            }]]
        },
        render: function () {
            var a = this;
            a.doInitTable({
                rownumbers: !0,
                pageSize: 100,
                pageList: [100, 200, 300]
            },
            [{
                operation: "doPrint",
                text: "生成报表",
                icon: "print",
                toggle: !1,
                selected: !1
            }], l, "")
        },
        doOnloadPage: function () {
            
        },
        doGetSearchCondition: function (a) {
            
        },
        doPrint: function(){
            var urlStr = '../OperationMaintenance/Reporting';
            window.open(urlStr);
        },
        dispose: function () { }
    });
    return n
});
