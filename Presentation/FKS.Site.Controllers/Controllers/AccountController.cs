using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FKS.Component.Tools;
using FKS.Core.Models.Account;
using FKS.Site.Helper;
using FKS.Site.Helper.Logging;
using FKS.Site.Models;
using FKS.Site.Web.Controllers.BaseControllers;

namespace FKS.Site.Web.Controllers.Controllers
{
    [Export]
    public class AccountController : BaseController<IAccountSiteContract>
    {
        #region 视图功能

        /// <summary>
        /// 登陆视图
        /// </summary>
        /// <returns></returns>
        public ActionResult Login()
        {
            string returnUrl = Request.Params["returnUrl"];
            returnUrl = returnUrl ?? Url.Action("Index", "Home", new { area = "" });
            LoginModel model = new LoginModel
            {
                ReturnUrl = returnUrl
            };

            if (User.Identity.IsAuthenticated)
            {
                return Redirect(model.ReturnUrl);
            }
            ViewBag.Title = System.Configuration.ConfigurationManager.AppSettings["title"];
            ViewBag.Footer = System.Configuration.ConfigurationManager.AppSettings["footer"];

            return View(model);
        }
        /// <summary>
        /// 提交登陆
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult Login(LoginModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    OperationResult result = this.SiteContract.Login(model);
                    string msg = result.Message ?? result.ResultType.ToDescription();
                    if (result.ResultType == OperationResultType.Success)
                    {
                        return Redirect(model.ReturnUrl);
                    }
                    ModelState.AddModelError("", msg);
                    this.doSetLogInfo("用户登陆", result);
                }

                ViewBag.Title = System.Configuration.ConfigurationManager.AppSettings["title"];
                ViewBag.Footer = System.Configuration.ConfigurationManager.AppSettings["footer"];
                return View(model);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("", e.Message);
                return View(model);
            }
        }
        /// <summary>
        /// 登出
        /// </summary>
        /// <returns></returns>
        public ActionResult Logout()
        {
            //this.doSetLogInfo("用户登出", null);
            string returnUrl = Request.Params["returnUrl"];
            returnUrl = returnUrl ?? Url.Action("Index", "Home", new { area = "" });
            if (User.Identity.IsAuthenticated)
            {
                this.SiteContract.Logout();
            }
            return Redirect(returnUrl);
        }

        #endregion
    }
}
