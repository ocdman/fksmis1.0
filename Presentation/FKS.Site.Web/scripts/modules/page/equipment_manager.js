/*! fks 07-07-2014 */
define(["jquery", "underscore", "backbone", "knockout", "helper", "plugins/map", "modules/base/manager_base", "modules/main_ui", "localdata/propertyinfos", "localdata/positioninfos", "localdata/statusinfos", "text!templates/toolbars/common/toolbar_1.html", "text!templates/search_condition/equipment_manager.html", "localdata/timeout", "localdata/fantype", "localdata/jurisdiction"],
function (a, b, c, d, e, f, g, h, i, j, k, l, m, z, y, xx) {
    var n = g.extend({
        controller: "EquipmentView",
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
            return [[{
                field: "NickName",
                title: "用户名称",
                width: 150,
                sortable: !1
            },
            {
                field: "CollectionCode",
                title: "采集器ID",
                width: 100,
                sortable: !1
            },
            {
                field: "Address",
                title: "安装地址",
                width: 250,
                sortable: !1
            },
            {
                field: "EquipCount",
                title: "探测器数量",
                width: 70,
                sortable: !1
            },
            {
                field: "Status",
                title: "工作状态",
                width: 60,
                sortable: !1,
                formatter: function (a) {
                    for (var b in k) {
                        var c = k[b];
                        if (c.value == a) return c.text;
                    }
                    return a;
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
            }], l, m),
            a.searchViewModel = d.mapping.fromJS({
                id: 1,
                PropertyInfo: 0,
                PositionInfo: 0,
            },
            {
                key: function (a) {
                    return d.utils.unwrapObservable(a.id)
                }
            }),
            a.$searchBar.find("#PropertyInfo").combobox({
                data: i,
                width: "100",
                valueField: "value",
                textField: "text",
                groupField: "group",
                onSelect: function (b) {
                    a.searchViewModel.PropertyInfo(b.value)
                }
            }),
            a.$searchBar.find("#PositionInfo").combobox({
                data: j,
                width: "100",
                valueField: "value",
                textField: "text",
                onSelect: function (b) {
                    a.searchViewModel.PositionInfo(b.value)
                }
            }),
            d.applyBindings(a.searchViewModel, a.$searchBar[0])
        },
        doOnloadPage: function () {
            var b = this,
            c = b.$ajaxDialog.find("#Address"),
            d = b.$ajaxDialog.find("#YHX"),
            e = b.$ajaxDialog.find("#YHY"),
            h = b.$ajaxDialog.find("#PropertyInfo"),
            l = b.$ajaxDialog.find("#PositionInfo"),
            m = b.$ajaxDialog.find("#Status"),
            n = b.$ajaxDialog.find("#allmap"),
            o = 1,
            p = 0,
            q = a.md5(b.title),
            r = q + "auto",
            s = b.$ajaxDialog.find("#TimeOut");
            t = b.$ajaxDialog.find("#Interval");
            t[0].value = (t[0].value == "" ? "60" : t[0].value);
            u = b.$ajaxDialog.find("#EquipCount");
            u[0].value = (u[0].value == "" ? "1" : u[0].value);
            v = b.$ajaxDialog.find("#EquipCode");
            //v[0].readOnly = (v[0].value == "" ? false : true);
            w = b.$ajaxDialog.find("#CollectionCode");
            //w[0].readOnly = (w[0].value == "" ? false : true);
            x = b.$ajaxDialog.find("#FanType");
            x[0].value = (x[0].value == "" ? "1" : x[0].value);
            yy = b.$ajaxDialog.find("#Jurisdiction");
            yy[0].value = (yy[0].value == "" ? "0" : yy[0].value);
            b.doWait(o, 0,
            function () {
                b.base("doOnloadPage", null, g)
            });
            n.size() ? (n.append("<div id='" + q + "' class='baidumap'></div>"),
            c.before(c.clone().attr("id", r)),
            c.hide(),
            b.mapApi = new f(q,
            function () {
                d.val() && e.val() && b.mapApi.addLabel(new BMap.Point(1 * d.val(), 1 * e.val()), c.val(), !0),
                b.mapApi.addAutocomplete(r,
                function (a, f) {
                    b.mapApi.setPlace(f,
                    function (a) {
                        d.val(a.lng),
                        e.val(a.lat),
                        c.val(f)
                    })
                }),
                a("#" + r).val(c.val()),
                b.mapApi.doSetControls({}),
                b.progressModel.set("nowCount", ++p)
            },
            !1, !0, !0), b.mapApi.doInit("上海", 12)) : b.progressModel.set("nowCount", ++p),
            h.size() && h.combobox({
                data: i,
                valueField: "value",
                textField: "text",
                groupField: 'group',
                panelHeight: "auto",
                value: h[0].value == "" ? "2" : h[0].value,
            }),
            l.size() && l.combobox({
                data: j,
                valueField: "value",
                textField: "text",
                panelHeight: "auto",
                value: l[0].value == "" ? "1" : l[0].value,
            }),
            m.size() && m.combobox({
                data: k,
                valueField: "value",
                textField: "text",
                panelHeight: "auto",
                value: m[0].value == "" ? "2" : m[0].value,
            }),
            s.size() && s.combobox({
                data: z,
                valueField: "value",
                textField: "text",
                panelHeight: "auto",
                value: s[0].value == "" ? "5" : s[0].value,
            }),
            x.size() && x.combobox({
                data: y,
                valueField: "value",
                textField: "text",
                panelHeight: "auto",
                value: x[0].value == "" ? "1" : x[0].value,
            }),
            yy.size() && yy.combobox({
                data: xx,
                valueField: "value",
                textField: "text",
                panelHeight: "auto",
                value: yy[0].value == "" ? "0" : yy[0].value,
            })
        },
        doGetSearchCondition: function (a) {
            if (this.params = null, a !== !0) {
                this.params = {
                    KeyValues: []
                };
                var b = d.mapping.toJS(this.searchViewModel);
                for (var c in b) b[c] && this.params.KeyValues.push({
                    Key: c,
                    Value: b[c]
                })
            } else d.mapping.fromJS({
                id: 1,
                PropertyInfo: 0,
                PositionInfo: 0,
            },
            this.searchViewModel),
            this.$searchBar.find("#PositionInfo").combobox("setValue", ""),
            this.$searchBar.find("#PropertyInfo").combobox("setValue", "")
        },
        dispose: function () { }
    });
    return n
});
