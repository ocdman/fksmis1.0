using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace FKS.Site.Web.App_Start
{
    public class BundleConfig
    {
        /// <summary>
        /// 有关 Bundling 的详细信息，请访问 http://go.microsoft.com/fwlink/?LinkId=254725
        /// </summary>
        /// <param name="bundles"></param>
        public static void RegisterBundles(BundleCollection bundles)
        {
           
            string jsPath = System.Configuration.ConfigurationManager.AppSettings["jsPath"];

            if(string.IsNullOrEmpty(jsPath))
            {
                jsPath = "scripts";
            }

            bundles.Add(new ScriptBundle("~/bundles/main").Include(
                        string.Format("~/{0}/libs/require.js", jsPath),
                        string.Format("~/{0}/main.js", jsPath)));

            bundles.Add(new ScriptBundle("~/bundles/ajaxform").Include(
                        string.Format("~/{0}/form/jquery.validate.js",jsPath),
                        string.Format("~/{0}/form/jquery.validate.unobtrusive.js", jsPath)));

            bundles.Add(new StyleBundle("~/contents/bootstrap/bootstrap").Include(
                "~/contents/bootstrap/bootstrap.css",
                "~/contents/bootstrap/bootstrap-theme.css"
                ));
            bundles.Add(new StyleBundle("~/contents/easyui/themes/metro-green/easyui").Include(
                "~/contents/easyui/themes/metro-green/easyui.css"
                ));
            bundles.Add(new StyleBundle("~/contents/site").Include(
                "~/contents/site.css"
                ));
            bundles.Add(new StyleBundle("~/contents/easyui/themes/icon").Include(
                "~/contents/easyui/themes/icon.css"
                ));

            bundles.Add(new StyleBundle("~/contents/login/login").Include(
                "~/contents/login/login.css"
                ));

            bundles.Add(new StyleBundle("~/Contents/ui/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));

            bundles.Add(new StyleBundle("~/Contents/ui/themes/smoothness/css").Include(
                        "~/Content/themes/smoothness/jquery.ui.core.css",
                        "~/Content/themes/smoothness/jquery.ui.resizable.css",
                        "~/Content/themes/smoothness/jquery.ui.selectable.css",
                        "~/Content/themes/smoothness/jquery.ui.accordion.css",
                        "~/Content/themes/smoothness/jquery.ui.autocomplete.css",
                        "~/Content/themes/smoothness/jquery.ui.button.css",
                        "~/Content/themes/smoothness/jquery.ui.dialog.css",
                        "~/Content/themes/smoothness/jquery.ui.slider.css",
                        "~/Content/themes/smoothness/jquery.ui.tabs.css",
                        "~/Content/themes/smoothness/jquery.ui.datepicker.css",
                        "~/Content/themes/smoothness/jquery.ui.progressbar.css",
                        "~/Content/themes/smoothness/jquery.ui.theme.css"));
        }
    }
}