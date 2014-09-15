using FKS.Component.Tools;
using FKS.Core.Models.Authority;
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
    public class AuthorityController : ManagerController<IAuthoritySiteContract, AuthorityView>
    {
        //
        // GET: /Authority/

        public override ActionResult Index()
        {
            return View();
        }

        public ActionResult Stop()
        {
            var result = this.doCheckViewModel(res =>
            {
                var model = this.SiteContract.Authorities.Single<Authority>(m => m.Id == 1);
                if (model != null)
                {
                    model.HasAuthority = false;

                    var count = this.SiteContract.Edit(model);
                    if (count >= 0)
                    {
                        res.ResultType = OperationResultType.Success;
                    }
                    else
                    {
                        res.ResultType = OperationResultType.Error;
                        res.Message = @"保存数据失败，请查看日志！";
                    }
                }
                else
                {
                    res.ResultType = OperationResultType.Error;
                    res.Message = @"未查询到数据！";
                }
            });
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Start()
        {
            var result = this.doCheckViewModel(res =>
            {
                var model = this.SiteContract.Authorities.Single<Authority>(m => m.Id == 1);
                if (model != null)
                {
                    model.HasAuthority = true;

                    var count = this.SiteContract.Edit(model);
                    if (count >= 0)
                    {
                        res.ResultType = OperationResultType.Success;
                    }
                    else
                    {
                        res.ResultType = OperationResultType.Error;
                        res.Message = @"保存数据失败，请查看日志！";
                    }
                }
                else
                {
                    res.ResultType = OperationResultType.Error;
                    res.Message = @"未查询到数据！";
                }
            });
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
