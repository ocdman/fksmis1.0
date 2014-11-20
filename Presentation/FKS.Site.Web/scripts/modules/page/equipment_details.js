/*! fks 07-07-2014 */
define(["jquery", "underscore", "backbone", "knockout", "helper", "plugins/map", "modules/base/manager_base", "modules/main_ui", "modules/page/equipment_manager", "localdata/propertyinfos", "localdata/positioninfos", "text!templates/layout/top_center.html", "text!templates/search_condition/equipment_manager.html", "text!templates/toolbars/common/toolbar_1.html"],
function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    var o = i.extend({
        isInitTable: !1,
        SI: null,
        time: 60,
        seconds: 0,
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
                width: 100,
                sortable: !1,
                formatter: function (a) {
                    return (a != null) ? e.DateFormat(e.getUnixToTime1(a.replace("/Date(", "").replace(")/", "")), "yyyy-MM-dd") : "";
                }
            },
            {
                field: "CleanTime",
                title: "上次维护时间",
                width: 100,
                sortable: !1,
                formatter: function (a) {
                    return (a != null) ? e.DateFormat(e.getUnixToTime1(a.replace("/Date(", "").replace(")/", "")), "yyyy-MM-dd") : "";
                }
            },
            {
                field: "NextCleanTime",
                title: "下次维护时间",
                width: 100,
                sortable: !1,
                formatter: function (a) {
                    return (a != null) ? e.DateFormat(e.getUnixToTime1(a.replace("/Date(", "").replace(")/", "")), "yyyy-MM-dd") : "";
                }
            },
            {
                field: "YouYanND",
                title: "浓度(mg/m³)",
                width: 70,
                sortable: !1,
                formatter: function (b) {
                    return (b != null) ? ((b == 255) ? 0 : e.getYouYanND(b)) : "----";
                }
            },
            {
                field: "YouYanSD",
                title: "湿度(%)",
                width: 70,
                sortable: !1,
                formatter: function (b) {
                    return (b != null) ? ((b == 255) ? 0 : b) : "----";
                }
            },
            {
                field: "YouYanWD",
                title: "温度(℃)",
                width: 70,
                sortable: !1,
                formatter: function (b) {
                    return (b != null) ? ((b == 255) ? 0 : e.getYouYanWD(b)) : "----";
                }
            },
            {
                field: "OnOff",
                title: "是否在线",
                width: 80,
                sortable: !1,
                formatter: function (a) {
                    //return a ? "<i class='red' />" : "<i class='green' />"
                    return a ? "在线" : "离线"
                }
            },
            {
                field: "ZTfj",
                title: "风机状态",
                width: 80,
                sortable: !1,
                formatter: function (a) {
                    //return a ? "<i class='green' />" : "<i class='red' />"
                    return a ? "开" : "关"
                }
            },
            {
                field: "ZTjhq",
                title: "净化器状态",
                width: 90,
                sortable: !1,
                formatter: function (a) {
                    //return a ? "<i class='green' />" : "<i class='red' />"
                    return a ? "开" : "关"
                }
            },
            {
                field: "Clean",
                title: "洁净度",
                width: 110,
                sortable: !1,
                formatter: function (b, c, d) {
                    return (b != null || b == 255) ? (c.OnOff == true ? (d = Math.floor(b / 10, 0),
                    d >= 5 && (d = 4),
                    a.getLevel(d)) : "----") : "----"
                }
            }]]
        },
        doSearch: function () {
            var _this = this;
            _this.seconds = _this.time;
            _this.params = {
                KeyValues: [],
                page: 1,
                rows: 100
            };
            var b = d.mapping.toJS(_this.searchViewModel);
            for (var c in b)
                b[c] && _this.params.KeyValues.push({
                Key: c,
                Value: b[c]
            });
            a.messager.progress({
                title: "",
                msg: "正在加载数据",
                text: "正在加载数据{value}%",
                interval: 0
            }),
            _this.$table.datagrid("loadData", []),
            _this.mapApi.map.clearOverlays();
            _this.getData();
            if(_this.SI != null){
                clearInterval(_this.SI);
            }
            _this.SI = setInterval(function () {
                _this.doSearchTiming()
            }, 1000);
        },
        doSearchTiming: function () {
            var b = this;
            b.seconds -= 1;
            a("#hint").html("离下次刷新时间还有 " + b.seconds + " 秒")
            if (b.seconds == 0) {
                b.$table.datagrid("loadData", []),
                a.ajax({
                url: b.getHref(!1, b.controller, "DataRowIndexForNextCleanTime"),
                data: e.mvcParamsFormat(this.params, "KeyValues"),
                success: function (c) {
                    for (var d in c.rows)
                        b.$table.datagrid("appendRow", c.rows[d]);
                },
                error: function () {
                    alert("error")
                }
                });
                b.seconds = b.time;
            }
        },
        doAddMapLabel: function (a) {
            var b, c = this;
            b = new BMap.Point(1 * a.YHX, 1 * a.YHY),
            c.mapApi.addCustomerLabel({
                icon: a.ZTfj ? "/contents/images/green.png" : "/contents/images/red.png",
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
                url: b.getHref(!1, b.controller, "DataRowIndexForNextCleanTime"),
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
            });
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
                groupField: "group",
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
            });
            j.push({ "text": "默认", "value": 0 });
            k.push({ "text": "默认", "value": 0 });
            a.$searchBar.find("#PropertyInfo").combobox("loadData", j);
            a.$searchBar.find("#PositionInfo").combobox("loadData", k);
            var dataProperty = a.$searchBar.find("#PropertyInfo").combobox('getData');
            var dataPosition = a.$searchBar.find("#PositionInfo").combobox('getData');
            if (dataProperty.length > 0) {
                a.$searchBar.find("#PropertyInfo").combobox('select', dataProperty[9].value);
            }
            if (dataPosition.length > 0) {
                a.$searchBar.find("#PositionInfo").combobox('select', dataPosition[15].value);
            }
            
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
                pageSize: 100,
                pageList: [100, 200, 300]
                //url: e.getHref(!1, e.controller, "DataRowIndexForNextCleanTime"),
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
            e.doInitSearchInfo();
            e.doSearch();
        },
        dispose: function () {
            this.base("dispose");
            clearInterval(this.SI);
            j.pop();
            k.pop();
        }
    });
    return o
});