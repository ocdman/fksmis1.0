/*! fks 07-07-2014 */
define(["jquery", "underscore", "backbone"],
function (a, b, c) {
    var d = c.View.extend({
        cached: !1,
        initialize: function () { },
        getHref: function (a) {
            for (var b = [].slice.call(arguments, 1), c = "", d = 0, e = b.length; e > d; d++)
                c += (d ? "/" : "") + b[d];
            return c += a ? "?_=" + (new Date).getTime() / 1e3 : ""
        },
        doInit: function () {
            return !0
        },
        base: function (a, b, c) {
            if (!a) return !1;
            var d;
            return c = c || this,
            d = "function" == typeof c ? c.prototype : c.constructor.__super__,
            a in d ? d[a].apply(this, b || []) : !1
        }
    });
    return d
});