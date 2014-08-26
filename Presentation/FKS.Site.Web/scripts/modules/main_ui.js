/*! fks 07-07-2014 */
define(["jquery", "underscore", "backbone", "jQEasyui", "plugins/jq/jquery.mdb5"],
function (a, b) {
    var c = {
        $layout: null,
        $tabs: null,
        $menus: null,
        modules: {},
        titles: {},
        doInit: function () {
            var c = this;
            a.fn.pagination.defaults = b.extend(a.fn.pagination.defaults, {
                displayMsg: "{from}-{to}/{total} ",
                beforePageText: "",
                afterPageText: "/{pages}"
            }),
            c.$layout = a(".easyui-layout"),
            c.$tabs = a(".easyui-tabs"),
            c.$menus = a(".easyui-tree"),
            c.$layout.layout(),
            c.$tabs.tabs({
                border: !1,
                onSelect: function () { },
                onClose: function (b) {
                    var d = a.md5(b),
                    e = c.modules[d];
                    e && e.dispose(),
                    c.doRemoveModule(b)
                },
                onAdd: function () { }
            })
        },
        doRemoveModule: function (b) {
            var c = a.md5(b),
            d = this,
            e = d.modules[c];
            if (e) {
                delete d.modules[c];
                for (var f in d.titles) {
                    var g = d.titles[f];
                    if (g == b) {
                        delete d.titles[f];
                        break
                    }
                }
            }
        },
        doAddModule: function (b, c, d) {
            var e = this;
            c = a.md5(c),
            b = b.toLocaleLowerCase(),
            b = a.md5(b),
            e.modules[c] || (e.modules[c] = d),
            e.titles[b] || (e.titles[b] = c)
        },
        doAjaxSuccess: function (b, c, d, e) {
            var f = a.md5(b),
            g = this.modules[f];
            f && g && g.doAjaxSuccess(c, d, e),
            console.log(arguments)
        },
        doAjaxError: function (b, c, d, e) {
            var f = this.titles[a.md5(b)];
            if (f) {
                var g = this.modules[f];
                g && g.doAjaxError(c, d, e)
            }
            console.log(arguments)
        }
    };
    return a(document).ajaxComplete(function (b, c) {
        if (400 == c.status) {
            var d = c.responseText;
            d = JSON.parse(d),
            d && "0" != d.ResultType && a.messager.alert("提示", d.Message || "未登陆！", "error")
        } else if (500 == c.status) {
            var d = c.responseText;
            try {
                d = JSON.parse(d),
                d && "0" != d.ResultType && a.messager.alert("提示", d.Message, "error")
            } catch (e) { }
        }
    }),
    c
});