/*! fks 07-07-2014 */
define(["jquery", "underscore", "backbone", "modules/base/view_base", "modules/main_ui", "knockout"],
function (a, b, c, d, e) {
    var f = d.extend({
        initialize: function (z) {
            var b = this;
            e.$menus ? e.$menus.tree({
                url: b.getHref(b.cached, "scripts", "datas", "menus.js"),
                method: "get",
                animate: !0,
                lines: !0,
                onClick: function (a) {
                    a.attributes && a.attributes.hash && (location.hash = a.attributes.hash + "-" + a.iconCls)
                },
                onLoadSuccess: function () {
                    if (a(".hidden")[0].children.IsAdmin.value == "False") {
                        this.childNodes[0].hidden = !0;
                        this.childNodes[3].hidden = !0;
                    };
                    a(".loading").fadeOut();
                    //location.hash = "#page/data_monitor/dajige数据"
                }
            }) : a.messager.alert("提示", "菜单加载错误！")
        },
        render: function () { }
    });
    return new f
});