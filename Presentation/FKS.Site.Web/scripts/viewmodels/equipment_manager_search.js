/*! fks 07-07-2014 */
define(["knockout"],
    function (a) {
        var b = function (b, c) {
            this.ID = a.observable(b),
            this.EquipName = a.observable(c),
            this.doResetValue = function () {
                this.ID(""),
                this.EquipName("")
            }
        };
        return b
    });