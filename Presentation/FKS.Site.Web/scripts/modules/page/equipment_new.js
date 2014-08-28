/*! fks 07-07-2014 */
define(["jquery", "underscore", "backbone", "knockout", "helper", "plugins/map", "modules/base/manager_base", "modules/main_ui", "modules/page/equipment_manager", "text!templates/layout/center_bottom.html", "text!templates/toolbars/common/toolbar_1.html"],
function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = i.extend({
        doResetForm: function () {
            this.$ajaxDialog.find("form")[0].reset()
            //this.$ajaxDialog.find("#PropertyInfo").val("2"),
            //this.$ajaxDialog.find("#PositionInfo").val("1"),
            //this.$ajaxDialog.find("#Interval").val("60"),
            //this.$ajaxDialog.find("#TimeOut").val("5")
            this.doOnloadPage();
        },
        render: function () {
            var b = this;
            b.$panel.append(j);
            var c = b.$panel.find(".easyui-layout");
            c.layout();
            var d = c.layout("panel", "center"),
            e = c.layout("panel", "south");
            b.$ajaxDialog = d,
            d.panel({
                href: b.getHref(!1, b.controller, "add"),
                onLoad: function () {
                    b.doOnloadPage()
                }
            }),
            e.append(b.doInitOperations([{
                operation: "doSubmit",
                text: "保存",
                icon: "save",
                toggle: !1,
                selected: !1
            },
            {
                operation: "doResetForm",
                text: "重置",
                icon: "undo",
                toggle: !1,
                selected: !1
            }], k)),
            e.find(".easyui-linkbutton").linkbutton().on("click",
            function () {
                var c = a(this).attr("data-operation");
                c && b[c] && b[c].call(b)
            })
        },
        doAjaxSuccess: function (b) {
            var c = this;
            a.messager.progress("close"),
            b && "0" != b.ResultType ? a.messager.alert("提示", b.Message, "error") : a.messager.alert("提示", "添加成功！", "info",
            function () {
                c.doResetForm()
            })
        }
    });
    return l
});