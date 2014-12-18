/*! fks 07-07-2014 */
require.config(
    {
        baseUrl: "/scripts/libs",
        paths: {
            jquery: "jQuery-2.1.0.min",
            jQEasyui: "../plugins/easyui/jquery.easyui.min",
            plugins: "../plugins",
            views: "../views",
            modules: "../modules",
            localdata: "../datas",
            viewmodels: "../viewmodels",
            komapping: "knockout.mapping",
            templates: "../templates",
            unobtrusive_ajax: "../form/jquery.unobtrusive-ajax",
            jqValid: "../form/jquery.validate",
            jqValidUnob: "../form/jquery.validate.unobtrusive"
        }, shim: {
            jquery: { exports: "$" },
            underscore: { exports: "_" },
            knockout: { exports: "ko" },
            backbone: {
                deps: ["jquery", "underscore"],
                exports: "Backbone"
            },
            jQEasyui: {
                deps: ["jquery"]
            },
            jQValid: {
                deps: ["jquery"]
            },
            unobtrusive_ajax: {
                deps: ["jquery"]
            },
            jqValid: {
                deps: ["unobtrusive_ajax"]
            },
            jqValidUnob: {
                deps: ["jqValid"]
            }
        },
        urlArgs: "1.0.0.0"
    }),
require(["jquery",
    "underscore",
    "backbone",
    "../router",
    "modules/main_ui",
    "jqValidUnob",
    "knockout",
    "knockout.mapping",
    "plugins/jquery.plot/jquery.jqplot.min"],
    function (a, b, c, d, e, f, g, h)
    {
        g.mapping = h,
        c.history.start(),
        e.doInit()
    });