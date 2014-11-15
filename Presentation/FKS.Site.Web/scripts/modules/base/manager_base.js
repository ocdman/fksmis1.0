/*! fks 07-07-2014 */
define(["jquery", "underscore", "backbone", "helper", "modules/base/easyui_base", "../../plugins/easyui/easyui-lang-zh_CN"],
function (a, b, c, d, e) {
    var f = e.extend({
        controller: "",
        idField: "Id",
        textField: "",
        params: null,
        onBeforeEdit: function () { },
        doOnloadPage: function () {
            var b = this,
            c = b.$ajaxDialog.find("form"),
            d = c.attr("data-ajax-success"),
            e = c.attr("data-ajax-failure");
            b.$ajaxDialog.on("click", "[data-operation]",
            function () {
                var c = a(this).attr("data-operation");
                c && b[c] && b[c].call(b)
            }),
            c.find("input.text-box").addClass("form-control"),
            c.attr("data-ajax-success", d.replace(b.controller.toLocaleLowerCase(), b.title)),
            c.attr("data-ajax-failure", e.replace(b.controller.toLocaleLowerCase(), b.title)),
            b.$ajaxDialog.find(".l-btn.l-btn-plain").linkbutton("enable")
        },
        doAdd: function () {
            this.doInitAjaxForm({
                href: this.getHref(!1, this.controller, "add")
            },
            this.doOnloadPage)
        },
        doEdit: function () {
            this.currentRow && this.currentRow[this.idField] && (this.onBeforeEdit && this.onBeforeEdit(this.currentRow), this.doInitAjaxForm({
                href: this.getHref(!1, this.controller, "edit", this.currentRow[this.idField])
            },
            this.doOnloadPage))
        },
        doDel: function () {
            this.currentRow && this.currentRow[this.idField] && this.doInitAjaxForm({
                href: this.getHref(!1, this.controller, "delete", this.currentRow[this.idField])
            },
            this.doOnloadPage)
        },
        doShowSearch: function () {
            this.$searchBar.toggle(),
            this.$table.datagrid("resize")
        },
        doGetSearchCondition: function () {
            this.params = null
        },
        doSearch: function (a) {
            this.doGetSearchCondition(a),
            this.$table && (this.params = b.extend(this.params || {},
            this.queryParams || {}), this.$table.datagrid("reload", d.mvcParamsFormat(this.params, "KeyValues")))
        },
        doResetSearch: function () {
            null != this.params && (this.params = null, this.doSearch(!0))
        },
        doSubmit: function () {
            var b = this,
            c = a(b.$ajaxDialog).find("form");
            if (c.size())
                if (c.valid())
                    this.doWait(1, 200),
                    c.trigger("submit");
                else {
                    var d = c.find("[generated='true']:eq(0)");
                    d.length > 0 && a("#" + d.attr("for")).focus()
                }
        },
        doAjaxSuccess: function (b) {
            var c = this;
            a.messager.progress("close"),
            b && "0" != b.ResultType ? a.messager.alert("提示", b.Message, "error") : (c.$ajaxDialog && c.$ajaxDialog.dialog("close"), a.messager.alert("提示", "成功！", "info",
            function () {
                c.doSearch()
            }))
        },
        doAjaxError: function () {
            a.messager.progress("close"),
            a.messager.alert("错误", "服务器错误", "error")
        },
        doWait: function (b, c, d) {
            a.messager.progress("close"),
            a.messager.progress({
                interval: c || 0,
                text: c ? " " : void 0
            }),
            this.progressModel.off();
            var e = a.messager.progress("bar");
            c || (this.progressModel.set("maxCount", b), this.progressModel.set("nowCount", 0), this.progressModel.on("change:nowCount",
            function (b) {
                e.progressbar("setValue", 100 * b.get("nowCount") / b.get("maxCount")),
                b.get("nowCount") == b.get("maxCount") && (a.messager.progress("close"), d && d())
            },
            this))
        },
        dispose: function () {
            console.log("dispose")
        }
    });
    return f
});