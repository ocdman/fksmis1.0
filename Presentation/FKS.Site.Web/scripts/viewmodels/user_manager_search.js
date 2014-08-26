/*! fks 07-07-2014 */
define(["knockout"],
    function (a) {
        var b = function (b) {
            this.UserName = a.observable(b),
            this.doResetValue = function () {
                this.UserName("")
            }
        };
        return b
    });