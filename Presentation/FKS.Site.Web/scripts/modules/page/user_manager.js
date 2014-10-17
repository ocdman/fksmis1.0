/*! fks 07-07-2014 */
define(["jquery", "underscore", "backbone", "knockout", "helper", "modules/base/manager_base", "modules/main_ui", "viewmodels/user_manager_search", "text!templates/toolbars/common/toolbar_1.html", "text!templates/search_condition/user_manager.html"],
function (a, b, c, d, e, f, g, h, i, j) {
    var k = f.extend({
        controller: "MemberView",
        idField: "Id",
        textField: "UserName",
        searchViewModel: null,
        doInit: function (a, b) {
            var c = this;
            return c.base("doInit", [a]) ? (c.doAddTab({
                title: a,
                closable: !0,
                iconCls: b
            }), g.doAddModule(c.controller, a, c), c.render(), !0) : !1
        },
        getTableColumns: function () {
            return [[{
                field: "UserName",
                title: "操作员用户名",
                width: 120,
                sortable: !0
            },
            {
                field: "NickName",
                title: "操作员昵称",
                width: 150,
                sortable: !0
            },
            {
                field: "IsAdmin",
                title: "是否为管理员",
                width: 80,
                sortable: !1,
                formatter: function (a, b) {
                    return b.IsAdmin ? "是" : "否"
                }
            }]]
        },
        doOnloadPage: function () {
            this.base("doOnloadPage", null, f),
            a("#PasswordAgain").val(a("#Password").val())
        },
        render: function () {
            this.doInitTable({
                rownumbers: !0
            },
            [{
                operation: "doAdd",
                text: "新建",
                icon: "add",
                toggle: !1,
                selected: !1
            },
            {
                operation: "doEdit",
                text: "修改",
                icon: "edit",
                toggle: !1,
                selected: !1
            },
            {
                operation: "doDel",
                text: "删除",
                icon: "cut",
                toggle: !1,
                selected: !1
            },
            //{
            //    operation: "doPermiss",
            //    text: "分配用户",
            //    icon: "pencil",
            //    toggle: !1,
            //    selected: !1
            //},
            {
                operation: "doShowSearch",
                text: "查询条件",
                icon: "redo",
                toggle: !0,
                selected: !1
            },
            {
                operation: "doResetSearch",
                text: "重置查询",
                icon: "undo",
                toggle: !1,
                selected: !1
            }], i, j),
            this.searchViewModel = new h(""),
            d.applyBindings(this.searchViewModel, this.$searchBar[0])
        },
        doPermiss: function () {
            console.log("dopermiss")
        },
        doGetSearchCondition: function (a) {
            this.params = null,
            a !== !0 && (this.params = {
                KeyValues: []
            },
            this.searchViewModel.UserName() && this.params.KeyValues.push({
                Key: "UserName",
                Value: this.searchViewModel.UserName()
            }))
        },
        dispose: function () { }
    });
    return k
});