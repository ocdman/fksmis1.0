using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using FKS.Component.Tools;
using FKS.Component.Tools.Logging;
using FKS.Core.Models.logger;

namespace FKS.Site.Helper.Attributes
{
    public class MyHandleErrorAttribute : HandleErrorAttribute
    {
        public override void OnException(ExceptionContext filterContext)
        {
            base.OnException(filterContext);

            if (filterContext.ExceptionHandled || !filterContext.HttpContext.IsCustomErrorEnabled)
            {
                return;
            }
            if (new HttpException(null, filterContext.Exception).GetHttpCode() != 500)
            {
                return;
            }
            if (!ExceptionType.IsInstanceOfType(filterContext.Exception))
            {
                return;
            }

            var controllerName = filterContext.RouteData.Values["controller"].ToString();
            var actionName = filterContext.RouteData.Values["action"].ToString();


            if (filterContext.HttpContext.Request.Headers["X-Requested-With"] == "XMLHttpRequest")
            {
                filterContext.Result = new JsonResult()
                {
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet,
                    Data = new OperationResult(OperationResultType.Error)
                    {
                        Message = filterContext.Exception.Message
                    }
                };
            }
            else
            {
                var model = new HandleErrorInfo(filterContext.Exception, controllerName, actionName);

                filterContext.Result = new ViewResult()
                {
                    ViewName = View,
                    MasterName = Master,
                    ViewData = new ViewDataDictionary(model),
                    TempData = filterContext.Controller.TempData
                };
            }

            LogError(filterContext, controllerName, actionName);

            filterContext.ExceptionHandled = true;
            filterContext.HttpContext.Response.Clear();
            filterContext.HttpContext.Response.StatusCode = 500;
            filterContext.HttpContext.Response.TrySkipIisCustomErrors = true;
        }

        void LogError(ExceptionContext filterContext, string controllerName, string actionName)
        {
            LogInfo log = new LogInfo(controllerName) { LogType = LogType.Admin };
            Logger logger = Logger.GetLogger(filterContext.GetType());

            log.Exception = filterContext.Exception.ToString();
            log.Message = filterContext.Exception.Message;
            log.MethodName = actionName;
            logger.Error(log);
        }
    }
}
