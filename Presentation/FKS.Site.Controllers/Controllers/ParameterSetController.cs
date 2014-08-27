using FKS.Site.Models;
using FKS.Site.Web.Controllers.BaseControllers;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FKS.Site.Web.Controllers.Controllers
{
    [Export]
    public class ParameterSetController : ManagerController<IParameterSetSiteContract, ParameterSetView>
    {
        //
        // GET: /ParameterSet/

        public override ActionResult Index()
        {
            return View();
        }

    }
}
