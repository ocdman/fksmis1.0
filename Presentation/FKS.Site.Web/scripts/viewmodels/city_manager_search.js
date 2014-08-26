/*! fks 07-07-2014 */
define(["knockout"],
    function (a) {
        var b = function (b, c) {
            this.Name = a.observable(b),
            this.Type = a.observable(c),
            this.doResetValue = function () {
                this.Name(""),
                this.Type(0)
            }
        };
        return b
    });