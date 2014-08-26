/*! fks 07-07-2014 */
define(
    ["jquery", "underscore", "backbone"],
    function (a, b, c) {
        var d = c.Router.extend({
            routes: {
                ":module/:page/:param": "doModulesCall",
                "*actions": "doDefault"
            },
            doDefault: function () {
                this.doModulesCall("", "home")
            },
            doModulesCall: function (a, b, c) {
                var d = [a, b]; c = c || "",
                d = d.concat(c.split("-")),
                this.doRequireJS.apply(this, d)
            },
            doRequireJS: function (a, b) {
                var c = [].slice.call(arguments, 2),
                    d = "modules";
                a && (d += "/" + a),
                b && (d += "/" + b),
                require([d], function (a) {
                    var b = null;
                    "function" == typeof a ? b = new a : "object" == typeof a && (b = a),
                    b.doInit.apply(b, c) || b.remove(),
                    location.hash = "#"
                })
            }
        });
        return new d
    });