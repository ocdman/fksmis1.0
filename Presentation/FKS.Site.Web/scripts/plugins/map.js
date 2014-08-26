/*! fks 25-07-2014 */
define(["jquery", "underscore", "backbone"],
function () {
    function a(a) {
        this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT,
        this.defaultOffset = new BMap.Size(10, 10),
        this.map = a
    }
    function b(b, c, d, e) {
        var f = this;
        f.loaded = !1,
        f.mapConName = b,
        f.map = new BMap.Map(b),
        f.map.addEventListener("load",
        function () {
            c && c()
        }),
        d && f.map.enableScrollWheelZoom(),
        e && f.map.enableContinuousZoom(),
        f.geocoder = new BMap.Geocoder,
        f.controlOpt = new a(f.map);
        try {
            f.myDrag = new BMapLib.RectangleZoom(f.map, {
                followText: "拖拽鼠标进行操作"
            })
        } catch (g) {
            console.log(g)
        }
    }
    return a.prototype = new BMap.Control,
    a.prototype.addMyControls = function (a) {
        this.map.getContainer().appendChild(a),
        this.map.addControl(a)
    },
    b.prototype.doSetControls = function (a) {
        var b = this;
        a = a || {},
        b.map.addControl(new BMap.NavigationControl),
        b.map.addControl(new BMap.NavigationControl({
            anchor: BMAP_ANCHOR_TOP_RIGHT,
            type: BMAP_NAVIGATION_CONTROL_SMALL
        })),
        b.map.addControl(new BMap.NavigationControl({
            anchor: BMAP_ANCHOR_BOTTOM_LEFT,
            type: BMAP_NAVIGATION_CONTROL_PAN
        })),
        b.map.addControl(new BMap.NavigationControl({
            anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
            type: BMAP_NAVIGATION_CONTROL_ZOOM
        })),
        b.map.addControl(new BMap.OverviewMapControl),
        b.map.addControl(new BMap.OverviewMapControl({
            isOpen: !0,
            anchor: BMAP_ANCHOR_TOP_RIGHT
        }))
    },
    b.prototype.doInit = function (a, b) {
        this.map.centerAndZoom(a, b)
    },
    b.prototype.addremoveEventListener = function (a, b, c) {
        return c ? void this.map.removeEventListener(a, b) : void this.map.addEventListener(a, b)
    },
    b.prototype.getLocationByPoint = function (a, b) {
        a && this.geocoder.getLocation(a,
        function (a) {
            b && b(a)
        })
    },
    b.prototype.getPointByLocation = function (a, b) {
        a && this.geocoder.getPoint(a,
        function (a) {
            b && b(a)
        })
    },
    b.prototype.addAutocomplete = function (a, b, c) {
        var d = this,
        e = new BMap.Autocomplete({
            input: a,
            location: d.map
        });
        e.addEventListener("onhighlight",
        function (a) {
            var b = a.fromitem.value;
            c && c(b)
        }),
        e.addEventListener("onconfirm",
        function (a) {
            var c = a.item.value || {},
            d = c.province + c.city + c.district + c.street + c.business;
            b && b(c, d)
        }),
        d.autoComplete = e
    },
    b.prototype.setPlace = function (a, b) {
        var c = this;
        c.map.clearOverlays();
        var d = new BMap.LocalSearch(c.map, {
            onSearchComplete: function () {
                var e = d.getResults();
                e ? (e = e.getPoi(0), e = e ? e.point : null) : e = null,
                e && (b && b(e), c.addLabel(e, a, !0))
            }
        });
        d.search(a)
    },
    b.prototype.addLabel = function (a, b, c) {
        var d, e, f = this;
        c && f.map.clearOverlays(),
        d = new BMap.Marker(a),
        f.map.centerAndZoom(a, 18),
        f.map.addOverlay(d),
        e = new BMap.Label(b, {
            offset: new BMap.Size(20, -10)
        }),
        d.setLabel(e)
    },
    b.prototype.addCustomerLabel = function (a) {
        var b, c, d = this;
        a = a || {};
        var e = new BMap.Icon(a.icon, new BMap.Size(a.iconWidth, a.iconHeight), {
            anchor: new BMap.Size(10, 30)
        });
        return b = new BMap.Marker(a.point, {
            icon: e
        }),
        c = new BMap.Label(a.text, {
            offset: new BMap.Size(20, -10)
        }),
        b.setLabel(c),
        d.map.addOverlay(b),
        {
            marker: b,
            label: c
        }
    },
    b
});