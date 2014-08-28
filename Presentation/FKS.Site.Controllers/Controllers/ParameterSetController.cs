using FKS.Component.Tools;
using FKS.Core.Models.Parameters;
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
            ParameterSetView viewModel = null;

            var model = this.SiteContract.ParameterSets.Single<ParameterSet>(m => m.Id == 1);
            if (model != null)
            {
                viewModel = new ParameterSetView
                {
                    MaintenanceBound = model.MaintenanceBound,
                    ConcentrateBound = model.ConcentrateBound,
                    PurifierBound = model.PurifierBound,
                    DayDischargeBound = model.DayDischargeBound,
                    ShowNumbers = model.ShowNumbers
                };
            }
            this.doGetAjaxReturnInfo();
            return View(viewModel);
        }

        [HttpPost]
        public override ActionResult Edit(ParameterSetView viewModel)
        {
            var result = this.doCheckViewModel(res => 
            {
                var model = this.SiteContract.ParameterSets.Single<ParameterSet>(m => m.Id == 1);
                if (model != null)
                {
                    model.MaintenanceBound = viewModel.MaintenanceBound;
                    model.ConcentrateBound = viewModel.ConcentrateBound;
                    model.PurifierBound = viewModel.PurifierBound;
                    model.DayDischargeBound = viewModel.DayDischargeBound;
                    model.ShowNumbers = viewModel.ShowNumbers;

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
            this.doSetLogInfo("修改系统参数", result);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

    }
}
