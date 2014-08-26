using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FKS.Component.Tools;

namespace FKS.Site.Helper.Attributes
{
    /// <summary>
    /// 登陆验证
    /// </summary>
    public class MyAuthorize : AuthorizeAttribute
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="filterContext"></param>
        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            base.OnAuthorization(filterContext);
        }

        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            HttpRequestBase request = filterContext.HttpContext.Request;

            if (!request.IsAuthenticated)
            {
                if (request.IsAjaxRequest())
                {
                    var res = new JsonResult();

                    res.Data = new OperationResult(OperationResultType.Error, "未登录或登陆失效，请重新登陆！", "未登录或登陆失效");
                    res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
                    filterContext.Result = res;
                    filterContext.HttpContext.Response.StatusCode = 400;

                    return;
                }
            }
            base.HandleUnauthorizedRequest(filterContext);
        }
        /// <summary>
        /// 验证登陆
        /// </summary>
        /// <param name="httpContext"></param>
        /// <returns></returns>
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            if (httpContext.Request.IsAuthenticated)
            {
                return base.AuthorizeCore(httpContext);
            }
            else
            {
                httpContext.Response.StatusCode = 400;
                return false;
            }
        }
    }
}