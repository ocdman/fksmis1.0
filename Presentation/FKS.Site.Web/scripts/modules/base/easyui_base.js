/*! fks 07-07-2014 */
define(["jquery", "underscore", "backbone", "helper", "modules/base/view_base", "modules/main_ui"],
function (a, b, c, d, e, f) {
    var g = e.extend({
        $panel: null,
        $tablePanel: null,
        $table: null,
        $treePanel: null,
        $tree: null,
        $toolbar: null,
        $searchBar: null,
        $ajaxDialog: null,
        progressModel: null,
        currentRow: null,
        queryParams: null,
        title: "",
        getLevel: function (a) {
            var b = [];
            b.push("<div>");
            for (var c = 4; c >= a; c--) b.push("<i class='level_high' />");
            return b.push("</div>"),
            b.join("")
        },
        doInit: function (a) {
            return f.$tabs && a ? f.$tabs.tabs("exists", a) ? (f.$tabs.tabs("select", a), !1) : (this.progressModel = new c.Model({
                maxCount: 1,
                nowCount: 0
            }), !0) : !1
        },
        doAddTab: function (a) {
            a.title && (f.$tabs.tabs("add", a), this.$panel = f.$tabs.tabs("getTab", a.title), this.$tablePanel = this.$panel, this.title = a.title)
        },
        getTableColumns: function () {
            return [[]]
        },
        doInitTable: function (c, e, f, g) {
            var h = this;
            h.doInitTableToolbar(e, f, g),
            h.$table && h.$table.size() && h.$table.datagrid(b.extend({
                fit: !0,
                border: !1,
                striped: !0,
                method: "get",
                pagination: !0,
                singleSelect: !0,
                loadMsg: "加载数据中...",
                cache: !1,
                idField: h.idField,
                textField: h.textField,
                queryParams: h.queryParams,
                url: h.getHref(!1, h.controller, "DataRowIndex"),
                toolbar: d.strFormat("#{0}_toolbar", a.md5(h.title)),
                columns: h.getTableColumns(),
                onResize: function () {
                    h.$ajaxDialog && (h.$ajaxDialog.dialog("restore"), h.$ajaxDialog.dialog("maximize"))
                },
                onSelect: function (a, b) {
                    h.currentRow = b
                },
                onLoadError: function () {
                    a.messager.alert("提示", "服务器忙，请稍后再试！", "warning")
                },
                onDblClickRow: function (a, b) {
                    h.currentRow = b,
                    h.doEdit && h.doEdit()
                }
            },
            c))
        },
        doInitTableToolbar: function (c, e, f) {
            var g = this;
            g.$table = a(document.createElement("table")).appendTo(g.$tablePanel),
            g.$toolbar = a(document.createElement("div")).appendTo(g.$tablePanel),
            g.$toolbar.attr("id", d.strFormat("{0}_toolbar", a.md5(g.title))),
            g.$searchBar = a(b.template(f)()),
            g.$toolbar.append(g.doInitOperations(c, e)).append(g.$searchBar),
            g.$toolbar.find(".easyui-linkbutton").linkbutton({
                onClick: function () {
                    var b = a(this).attr("data-operation");
                    b && g[b] && g[b].call(g)
                }
            }),
            g.$toolbar.on("click", "a[data-operation]",
            function () {
                var b = a(this).attr("data-operation");
                return b && g[b] && g[b].call(g),
                !1
            })
        },
        doInitOperations: function (a, c) {
            var d = [];
            c = b.template(c);
            for (var e in a) {
                var f = a[e];
                d.push(c(f))
            }
            return d.join("")
        },
        doInitAjaxForm: function (c, d) {
            var e = this,
            f = [{
                iconCls: "icon-ok",
                text: "保存",
                plain: !0,
                disabled: !0,
                handler: function () {
                    e.doSubmit()
                }
            },
            {
                iconCls: "icon-no",
                text: "取消",
                plain: !0,
                disabled: !1,
                handler: function () {
                    e.$ajaxDialog.dialog("close")
                }
            }];
            e.$ajaxDialog || (e.$ajaxDialog = a(document.createElement("div")).appendTo(e.$panel), e.$ajaxDialog.dialog(b.extend({
                noheader: !0,
                fit: !0,
                inline: !0,
                width: 100,
                height: 100,
                border: !1,
                loadingMessage: "正在加载页面...",
                toolbar: f,
                buttons: f,
                onLoad: function () {
                    d && d.call(e)
                },
                onLoadError: function () {
                    a.messager.alert("提示", "服务器忙，请稍后再试！", "warning")
                },
                onClose: function () {
                    a(this).dialog("destroy", !0),
                    e.$ajaxDialog = null
                },
                onOpen: function () {
                    a(this).find(".l-btn.l-btn-plain").linkbutton("disable")
                }
            },
            c)))
        },
        doInitCombogrid: function (a, c) {
            a.combogrid(b.extend({
                width: 150,
                panelWidth: 450,
                rownumbers: !0,
                panelHeight: 450,
                required: !0,
                pagination: !0,
                pageSize: 100,
                pageList: [100, 200, 300],
            }, c))
        }
    });
    return g
});