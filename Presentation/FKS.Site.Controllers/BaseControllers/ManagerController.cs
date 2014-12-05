using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FKS.Component.Tools;
using FKS.Site.Helper.Attributes;
using CoolCode.Linq;
using FKS.Site.Helper.Logging;

namespace FKS.Site.Web.Controllers.BaseControllers
{
    [MyAuthorize]
    [AdminLog]
    public class ManagerController<ISiteContract, IModel> : BaseController<ISiteContract>
        where ISiteContract : class
        where IModel : class
    {
        #region 视图

        //[OutputCache(Duration = 3600, VaryByParam = "add")]
        public virtual ActionResult Add()
        {
            this.doGetAjaxReturnInfo();
            return View();
        }
        //[OutputCache(Duration = 3600, VaryByParam = "edit")]
        //public virtual ActionResult Edit()
        //{
        //    this.doGetAjaxReturnInfo();
        //    return View();
        //}
        //[OutputCache(Duration = 3600, VaryByParam = "del")]
        //public virtual ActionResult Del()
        //{
        //    this.doGetAjaxReturnInfo();
        //    return View();
        //}

        #endregion

        #region CRUD

        [HttpPost]
        public virtual ActionResult Add(IModel model)
        {
            var result = new OperationResult(OperationResultType.QueryNull, string.Empty);

            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public virtual ActionResult Edit(IModel model)
        {
            var result = new OperationResult(OperationResultType.QueryNull, string.Empty);

            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public virtual ActionResult Del(IModel model)
        {
            var result = new OperationResult(OperationResultType.QueryNull, string.Empty);

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region 方法

        /// <summary>
        /// 获得排序数据
        /// </summary>
        /// <param name="pagination"></param>
        /// <returns></returns>
        protected List<PropertySortCondition> getPropertySortCondition(Pagination pagination)
        {
            List<PropertySortCondition> result = new List<PropertySortCondition>();
            PropertySortCondition propertySortCondition = null;

            if (!string.IsNullOrEmpty(pagination.sort))
            {
                propertySortCondition = new PropertySortCondition(pagination.sort, System.ComponentModel.ListSortDirection.Ascending);
                if (pagination.order.ToLower() == "dasc")
                {
                    propertySortCondition.ListSortDirection = System.ComponentModel.ListSortDirection.Descending;
                }
                result.Add(propertySortCondition);
            }

            return result;
        }
       
        protected OperationResult doCheckViewModel(Action<OperationResult> act)
        {
            var result = new OperationResult(OperationResultType.Success, string.Empty);

            if (ModelState.IsValid)
            {
                act.Invoke(result);
            }
            else
            {
                foreach (ModelState ms in ModelState.Values)
                {
                    if (ms.Errors.Count > 0)
                    {
                        foreach (ModelError me in ms.Errors)
                        {
                            result.Message += me.ErrorMessage + "</br>";
                        }
                    }
                }
                result.ResultType = OperationResultType.Error;
            }

            return result;
        }
        protected void doGetAjaxReturnInfo()
        {
            string controller = this.ControllerContext.Controller.ToString();
            int lastIndex = controller.LastIndexOf('.');

            lastIndex++;
            controller = controller.Substring(lastIndex, (controller.Length - lastIndex) - 10);
            controller = controller.ToLower();

            ViewBag.Success = this.doGetAjaxCall(@"doAjaxSuccess", controller, @"data, status, xhr");
            ViewBag.Failure = this.doGetAjaxCall(@"doAjaxError", controller, @"xhr, status, error");
        }

        private string doGetAjaxCall(string func, string controller, string param)
        {
            string result = string.Empty;

            result = @"require(['modules/main_ui'],function(mainUi){ mainUi." + func + "('" + controller + "'," + param + "); })";

            return result;
        }

        #endregion
    }
}
