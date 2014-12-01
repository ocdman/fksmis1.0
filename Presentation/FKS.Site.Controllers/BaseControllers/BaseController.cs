using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FKS.Component.Tools;
using System.ComponentModel.Composition;
using FKS.Site.Helper;
using FKS.Core.Models.logger;
using FKS.Core.Models.Account;
using FKS.Site.Models;

namespace FKS.Site.Web.Controllers.BaseControllers
{
    [Export]
    public class BaseController<ISiteContract> : Controller
        where ISiteContract : class
    {
        #region 属性

        /// <summary>
        /// 
        /// </summary>
        [Import]
        protected ISiteContract SiteContract { get; set; }

        [Import]
        protected ILogInfoSiteContract LogInfoSiteContract { get; set; }

        #endregion

        #region 视图功能

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public virtual ActionResult Index()
        {
            var model = new MemberView();
            if (!User.IsInRole("操作员"))
            {
                model.IsAdmin = true;
            }
            else
            {
                model.IsAdmin = false;
            }
               
            model.UserName = User.Identity.Name;
            
            return View(model);
        }

        #endregion

        #region 方法

        /// <summary>
        /// 设置日志消息
        /// </summary>
        /// <param name="message"></param>
        /// <param name="operationResult"></param>
        protected void doSetLogInfo(string message, OperationResult operationResult)
        {
            this.TempData[SiteStaticStrings.LogCustomeMessage] = message;
            this.TempData[SiteStaticStrings.LogOperationResult] = operationResult == null ? new OperationResult(OperationResultType.Success) : operationResult;
            var logInfo = new LogInfo();
            logInfo.ResultType = operationResult.ResultType;
            logInfo.Message = message + (string.IsNullOrEmpty(operationResult.Message) ? "" : "," + operationResult.Message);
            this.LogInfoSiteContract.Add(logInfo);
        }

        #endregion
    }
}
