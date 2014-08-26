using FKS.Component.Tools;
using FKS.Core.Models.Account;
using FKS.Site.Web.Controllers.BaseControllers;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FKS.Site.Helper.Attributes;
using FKS.Site.Helper.Logging;

namespace FKS.Site.Web.Controllers.Controllers
{
    [MyAuthorize]
    public class HomeController : BaseController<object>
    {
        public override ActionResult Index()
        {
            ViewBag.Title = System.Configuration.ConfigurationManager.AppSettings["title"];
            ViewBag.Footer = System.Configuration.ConfigurationManager.AppSettings["footer"];

            return base.Index();
        }
    }
}
