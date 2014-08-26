/*! fks 07-07-2014 */
define(["jquery", "underscore", "backbone", "knockout", "helper", "plugins/map", "modules/base/manager_base", "modules/main_ui", "modules/page/equipment_manager", "localdata/propertyinfos", "localdata/positioninfos", "text!templates/layout/top_center.html", "text!templates/search_condition/equipment_manager.html", "text!templates/toolbars/common/toolbar_1.html"],
function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    var o = i.extend({
        isInitTable: !1,
        getTableColumns: function () {
            var a = this;
            return [[{
                field: "NickName",
                title: "用户名称",
                width: 150,
                sortable: !1
            },
            {
                field: "Address",
                title: "安装地址",
                width: 200,
                sortable: !1
            },
            {
                field: "OpenTime",
                title: "启用时间",
                width: 150,
                sortable: !1,
                formatter: function (a) {
                    return e.DateFormat(e.getUnixToTime1(a.replace("/Date(", "").replace(")/", "")), "yyyy-MM-dd");
                }
            },
            {
                field: "CleanTime",
                title: "清洗时间",
                width: 150,
                sortable: !1,
                formatter: function (a) {
                    return e.DateFormat(e.getUnixToTime1(a.replace("/Date(", "").replace(")/", "")), "yyyy-MM-dd");
                }
            },
            {
                field: "IsTimeOut",
                title: "是否在线",
                width: 80,
                sortable: !1,
                formatter: function (a) {
                    return a ? "<i class='red' />" : "<i class='green' />"
                }
            },
            {
                field: "ZTfj",
                title: "风机状态",
                width: 80,
                sortable: !1,
                formatter: function (a) {
                    return a ? "<i class='green' />" : "<i class='red' />"
                }
            },
            {
                field: "ZTjhq",
                title: "净化器状态",
                width: 90,
                sortable: !1,
                formatter: function (a) {
                    return a ? "<i class='green' />" : "<i class='red' />"
                }
            },
            {
                field: "YouYanND",
                title: "洁净度",
                width: 110,
                sortable: !1,
                formatter: function (b, c, d) {
                    return d = Math.floor(b / 20, 0),
                    d >= 5 && (d = 4),
                    a.getLevel(d)
                }
            }]]
        },
        doSearch: function () {
            this.params = {
                KeyValues: [],
                page: 1,
                rows: 50
            };
            var b = d.mapping.toJS(this.searchViewModel);
            for (var c in b)
                b[c] && this.params.KeyValues.push({
                Key: c,
                Value: b[c]
            });
            a.messager.progress({
                title: "",
                msg: "正在加载数据",
                text: "正在加载数据{value}%",
                interval: 0
            }),
            this.$table.datagrid("loadData", []),
            this.mapApi.map.clearOverlays(),
            this.getData()
        },
        doAddMapLabel: function (a) {
            var b, c = this;
            b = new BMap.Point(1 * a.YHX, 1 * a.YHY),
            c.mapApi.addCustomerLabel({
                icon: a.ZTfj ? "/contents/images/red.png" : "/contents/images/green.png",
                iconWidth: 32,
                iconHeight: 32,
                point: b,
                text: a.Address
            })
        },
        doClearCondition: function () {
            d.mapping.fromJS({
                id: 1,
                PropertyInfo: 0,
                PositionInfo: 0,
                Status: "1"
            },
            this.searchViewModel),
            this.$searchBar.find("#PositionInfo").combobox("setValue", ""),
            this.$searchBar.find("#PropertyInfo").combobox("setValue", "")
        },
        getData: function () {
            var b = this;
            a.ajax({
                url: b.getHref(!1, b.controller, "DataRowIndex"),
                data: e.mvcParamsFormat(this.params, "KeyValues"),
                success: function (c) {
                    for (var d in c.rows)
                        b.$table.datagrid("appendRow", c.rows[d]),
                    b.doAddMapLabel(c.rows[d]);
                    return a.messager.progress("bar").progressbar("setValue", Math.ceil(b.params.page * b.params.rows / c.total * 100, 0)),
                    c.total > b.params.page * b.params.rows ? (b.params.page++, void b.getData()) : void a.messager.progress("close")
                },
                error: function () {
                    alert("error")
                }
            })
        },
        doInitSearchInfo: function () {
            var a = this;
            a.searchViewModel = d.mapping.fromJS({
                id: 1,
                PropertyInfo: 0,
                PositionInfo: 0
            },
            {
                key: function (a) {
                    return d.utils.unwrapObservable(a.id)
                }
            }),
            a.$searchBar.find("#PropertyInfo").combobox({
                data: j,
                width: "100",
                valueField: "value",
                textField: "text",
                onSelect: function (b) {
                    a.searchViewModel.PropertyInfo(b.value)
                }
            }),
            a.$searchBar.find("#PositionInfo").combobox({
                data: k,
                width: "100",
                valueField: "value",
                textField: "text",
                onSelect: function (b) {
                    a.searchViewModel.PositionInfo(b.value)
                }
            })
        },
        render: function () {
            var b, c, d, e = this,
            g = a.md5(e.title),
            h = a(m);
            e.$panel.append(l),
            b = e.$panel.find(".easyui-layout").layout(),
            c = b.layout("panel", "center"),
            d = b.layout("panel", "north"),
            h = e.$panel.find(".easyui-tabs").tabs({
                onSelect: function (a, b) {
                    1 == b && e.$table.datagrid("resize")
                }
            }),
            e.$tablePanel = h.tabs("getTab", 1),
            e.doInitTable({
                rownumbers: !0,
                onDblClickRow: a.noop,
                url: "",
                pagination: !0,
            },
            [], n, ""),
            e.$searchBar = a(m),
            d.append(e.$searchBar.show()),
            h.tabs("getTab", 0).append("<div id='" + g + "' class='baidumap'></div>"),
            e.mapApi = new f(g,
            function () {
                e.mapApi.doSetControls({})
            },
            !1, !0, !0),
            e.mapApi.doInit("上海", 12),
            e.$searchBar.on("click", "[data-operation]",
            function () {
                var b = a(this).attr("data-operation");
                b && e[b] && e[b].call(e)
            }),
            e.doInitSearchInfo()
        }
    });
    return o
});