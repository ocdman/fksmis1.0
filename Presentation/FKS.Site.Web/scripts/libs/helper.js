/*! fks 07-07-2014 */
define(["jquery", "underscore", "backbone"],
function () {
    var a = function () {
        var a = {};
        return a.isArray = Function.isArray ||
        function (a) {
            return "object" == typeof a && "[object Array]" === Object.prototype.toString.call(a)
        },
        a.convertArrayToObject = function (b, c, d) {
            function e(b, c) {
                for (var d in c) if (a.isArray(c[d]) || "object" != typeof c[d]) f[b + "[" + d + "]"] = c[d];
                else for (var g in c[d]) a.isArray(c[d][g]) ? e(b + "[" + d + "]." + g, c[d][g]) : "object" == typeof c[d][g] ? a.convertObject(b + "[" + d + "]." + g + ".", c[d][g], f) : f[b + "[" + d + "]." + g] = c[d][g]
            }
            var f = d || {};
            return e(b, c),
            f
        },
        a.convertObject = function (b, c, d) {
            function e(b, c) {
                for (var d in c) a.isArray(c[d]) ? a.convertArrayToObject(d, c[d], f) : "object" == typeof c[d] ? e(b + d + ".", c[d]) : f[b + d] = c[d]
            }
            var f = d || {};
            return e(b, c),
            f
        },
        function (b, c) {
            if (c = c || "", "object" != typeof b) throw new Error("请传入json对象");
            if (a.isArray(b) && !c) throw new Error("请指定数组名，对应Action中数组参数名称！");
            return a.isArray(b) ? a.convertArrayToObject(c, b) : a.convertObject("", b)
        }
    }(),
    b = {
        getUnixToTime3: function (a) {
            return parseInt(a);
        },
        getUnixToTime2: function (a) {
            return parseInt(a) + 1000 * 60 * 60 * 8;
        },
        getUnixToTime1: function (a) {
            return 10 == a.toString().length && (a += "000"),
            new Date(parseInt(a))
        },
        getUnixToTime: function (a) {
            return 10 == a.toString().length && (a += "000"),
            new Date(parseInt(a)).toLocaleString().replace(/:\d{1,2}$/, " ")
        },
        getHrefRefs: function () {
            var a = location.href,
            b = a.indexOf("?"),
            c = a.substring(a.indexOf("?") + 1),
            d = {},
            b = 0,
            e = "";
            c = c.split("&");
            for (var f = 0; f < c.length; f++) e = c[f],
            e = e.split("="),
            e[1] && (b = e[1].indexOf("#"), d[e[0]] = -1 == b ? e[1] : e[1].substring(0, e[1].indexOf("#")));
            return d
        },
        DateFormat: function (a, b) {
            var c = {
                "M+": a.getMonth() + 1,
                "d+": a.getDate(),
                "h+": a.getHours() % 12 == 0 ? 12 : a.getHours() % 12,
                "H+": a.getHours(),
                "m+": a.getMinutes(),
                "s+": a.getSeconds(),
                "q+": Math.floor((a.getMonth() + 3) / 3),
                S: a.getMilliseconds()
            },
            d = {
                0: "日",
                1: "一",
                2: "二",
                3: "三",
                4: "四",
                5: "五",
                6: "六"
            };
            /(y+)/.test(b) && (b = b.replace(RegExp.$1, (a.getFullYear() + "").substr(4 - RegExp.$1.length))),
            /(E+)/.test(b) && (b = b.replace(RegExp.$1, (RegExp.$1.length > 1 ? RegExp.$1.length > 2 ? "星期" : "周" : "") + d[a.getDay() + ""]));
            for (var e in c) new RegExp("(" + e + ")").test(b) && (b = b.replace(RegExp.$1, 1 == RegExp.$1.length ? c[e] : ("00" + c[e]).substr(("" + c[e]).length)));
            return b
        },
        strFormat: function (a) {
            var b = [].slice.call(arguments, 1);
            return a.replace(/\{(\d+)\}/g,
            function (a, c) {
                return b[c]
            })
        },
        mvcParamsFormat: function (b, c) {
            return a(b, c)
        },
        replotChart: function (a, b) {
            return this.setChartDataToPlot(a, b),
            a.replot({
                resetAxes: !0
            }),
            a
        },
        setChartDataToPlot: function (a, b) {
            for (var c = 0; c < a.series.length; c++) for (var d = 0; d < a.series[c].data.length; d++) try {
                a.series[c].data[d][1] = b[c][d]
            } catch (e) { }
        },
        getDate: function (dates) {
            var dd = new Date();
            dd.setDate(dd.getDate() + dates);
            var y = dd.getFullYear();
            var m = dd.getMonth() + 1;
            var d = dd.getDate();
            return y + "/" + m + "/" + d;
        },
        getMonday: function () {
            var d = new Date();
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            var date = d.getDate();
            //周
            var day = d.getDay();
            var monday = day != 0 ? day - 1 : 6;
            return monday;
        },
        getMonth: function (type, months) {
            var d = new Date();
            var year = d.getFullYear();
            var month = d.getMonth() + 1;

            if (months != 0) {
                //如果本月为12月,年份加1,月份为1,否则月份加1
                if (month == 12 && months > 0) {
                    year++;
                    month = 1;
                }
                else if (month == 1 && months < 0) {
                    year--;
                    month = 12;
                }
                else {
                    month += months;
                }
            }

            var date = d.getDate();
            var firstday = year + "/" + month + "/" + 1;
            var lastday;

            if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 ||
                month == 10 || month == 12) {
                lastday = year + "/" + month + "/" + 31;
            }
            else if (month == 2) {
                //判断是否为闰年
                if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
                    lastday = year + "/" + month + "/" + 29;
                }
                else {
                    lastday = year + "/" + month + "/" + 28;
                }
            }
            else {
                lastday = year + "/" + month + "/" + 30;
            }

            var day = "";
            if (type == "s") {
                day = firstday;
            }
            else {
                day = lastday;
            }
            return day;
        },
        getStartHour: function () {
            return " 00:00:00";
        },
        getEndHour: function () {
            return " 23:00:00";
        },
        //getDay: function (day) {
        //    var today = new Date();
        //    var targetDayMilliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
        //    today.setTime(targetDayMilliseconds);

        //    var tYear = today.getFullYear();
        //    var tMonth = today.getMonth() + 1;
        //    var tDate = today.getDate();
        //    return tYear + "/" + tMonth + "/" + tDate;
        //},
    };
    return b
});