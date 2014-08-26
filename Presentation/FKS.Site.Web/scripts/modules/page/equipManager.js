/*! fks 07-07-2014 */
define(["jquery", "underscore", "backbone", "knockout", "helper", "modules/base/manager_base", "modules/main_ui", "localdata/propertyinfos", "localdata/positioninfos", "text!templates/toolbars/common/toolbar_1.html", "text!templates/search_condition/equipment_manager.html", "localdata/result"],
function (a, b, c, d, e, g, h, i, j, l, m, z) {
    var n = g.extend({
        controller: "EquipManagerView",
        idField: "CollectionCode",
        textField: "DetectorID1",
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
                width: 120,
                sortable: !1
            },
            {
                field: "UploadInterval",
                title: "上传间隔",
                width: 60,
                sortable: !1
            },
            {
                field: "DetectorCount",
                title: "探测器数量",
                width: 60,
                sortable: !1
            },
            {
                field: "DetectorNum1",
                title: "探测器编号1",
                width: 120,
                sortable: !1
            },
            {
                field: "DetectorID1",
                title: "探测器ID1",
                width: 120,
                sortable: !1
            },
            {
                field: "DetectorNum2",
                title: "探测器编号2",
                width: 120,
                sortable: !1
            },
            {
                field: "DetectorID2",
                title: "探测器ID2",
                width: 120,
                sortable: !1
            },
            {
                field: "Humidity",
                title: "湿度标定",
                width: 60,
                sortable: !1
            },
            {
                field: "Temperature",
                title: "温度标定",
                width: 60,
                sortable: !1
            },
            {
                field: "Concentration",
                title: "浓度标定",
                width: 60,
                sortable: !1
            },
            {
                field: "Result",
                title: "结果",
                width: 60,
                sortable: !1,
                formatter:function(a) {
                    for (var b in z) {
                        var c = z[b];
                        if(c.value == a) return c.text;
                    }
                }
            }]]
        },
        render: function () {
            var a = this;
            a.doInitTable({
                rownumbers: !0
            },
            [{
                operation: "doEdit",
                text: "修改",
                icon: "edit",
                toggle: !1,
                selected: !1
            },
            //{
            //    operation: "doDel",
            //    text: "删除",
            //    icon: "cut",
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
            }], l, m),
            a.searchViewModel = d.mapping.fromJS({
                id: 1,
                PropertyInfo: 0,
                PositionInfo: 0,
                Result: 0
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
            a.$searchBar.find("#Result").combobox({
                data: z,
                width: "100",
                valueField: "value",
                textField: "text",
                onSelect: function (b) {
                    a.searchViewModel.Result(b.value)
                }
            }),
            d.applyBindings(a.searchViewModel, a.$searchBar[0])
        },
        doOnloadPage: function () {
            var b = this,
            //c = b.$ajaxDialog.find("#Address"),
            //d = b.$ajaxDialog.find("#YHX"),
            //e = b.$ajaxDialog.find("#YHY"),
            h = b.$ajaxDialog.find("#PropertyInfo"),
            l = b.$ajaxDialog.find("#PositionInfo"),
            //m = b.$ajaxDialog.find("#Status"),
            //n = b.$ajaxDialog.find("#allmap"),
            o = 1,
            p = 0,
            //q = a.md5(b.title),
            //r = q + "auto",
            s = b.$ajaxDialog.find("#Result");
            b.doWait(o, 0,
            function () {
                b.base("doOnloadPage", null, g)
            }),
            b.progressModel.set("nowCount", ++p),
            //n.size() ? (n.append("<div id='" + q + "' class='baidumap'></div>"), c.before(c.clone().attr("id", r)), c.hide(), b.mapApi = new f(q,
            //function () {
            //    d.val() && e.val() && b.mapApi.addLabel(new BMap.Point(1 * d.val(), 1 * e.val()), c.val(), !0),
            //    b.mapApi.addAutocomplete(r,
            //    function (a, f) {
            //        b.mapApi.setPlace(f,
            //        function (a) {
            //            d.val(a.lng),
            //            e.val(a.lat),
            //            c.val(f)
            //        })
            //    }),
            //    a("#" + r).val(c.val()),
            //    b.mapApi.doSetControls({}),
            //    b.progressModel.set("nowCount", ++p)
            //},
            //!1, !0, !0), b.mapApi.doInit("上海", 12)) : b.progressModel.set("nowCount", ++p),
            h.size() && h.combobox({
                data: i,
                valueField: "value",
                textField: "text"
            }),
            l.size() && l.combobox({
                data: j,
                valueField: "value",
                textField: "text"
            }),
            //m.size() && m.combobox({
            //    data: k,
            //    valueField: "value",
            //    textField: "text",
            //    panelHeight: "auto"
            //}),
            s.size() && s.combobox({
                data: z,
                valueField: "value",
                textField: "text",
                panelHeight: "auto"
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
                Result: 0
            },
            this.searchViewModel),
            this.$searchBar.find("#PositionInfo").combobox("setValue", ""),
            this.$searchBar.find("#PropertyInfo").combobox("setValue", "")
            //this.$searchBar.find("#Result").combobox("setValue", "")
        },
        dispose: function () { }
    });
    return n
});