using FKS.Component.Tools;
using FKS.Core.Models.Message;
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
    public class MessageSetController : ManagerController<IMessageSetSiteContract, MessageSetView>
    {
        //
        // GET: /MessageSet/

        public override ActionResult Index()
        {
            MessageSetView viewModel = null;

            var model = this.SiteContract.MessageSets.Single<MessageSet>(m => m.Id == 1);
            if (model != null)
            {
                viewModel = new MessageSetView
                {
                    PhoneNumber = model.PhoneNumber,
                    SendTime = model.SendTime
                };
            }
            this.doGetAjaxReturnInfo();
            return View(viewModel);
        }

        [HttpPost]
        public override ActionResult Edit(MessageSetView viewModel)
        {
            var result = this.doCheckViewModel(res =>
            {
                var model = this.SiteContract.MessageSets.Single<MessageSet>(m => m.Id == 1);
                if (model != null)
                {
                    model.PhoneNumber = viewModel.PhoneNumber;
                    model.SendTime = viewModel.SendTime;
 
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
            this.doSetLogInfo("修改短信设置", result);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

    }
}
