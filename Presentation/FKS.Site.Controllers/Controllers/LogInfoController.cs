using CoolCode.Linq;
using FKS.Component.Tools;
using FKS.Core.Models.logger;
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
    public class LogInfoParams
    {
        public DateTime StartTime{get;set;}
        public DateTime EndTime{get;set;}
    }

    [Export]
    public class LogInfoController : ManagerController<ILogInfoSiteContract, LogInfoView>
    {
        public override ActionResult Index()
        {
            return View();
        }

        public ActionResult LogInfoDataRow(LogInfoParams param)
        {
            DataGridView<LogInfoView> dgvResult = new DataGridView<LogInfoView>();
            IQueryBuilder<LogInfo> queryBuilder = QueryBuilder.Create<LogInfo>();
            queryBuilder.Between<LogInfo, DateTime>(s => s.AddDate, param.StartTime, param.EndTime);

            var memberViews = this.SiteContract.LogInfos.Where(queryBuilder.Expression).Select(m => new LogInfoView
            {
                Operator = m.Operator,
                IpAddress = m.IpAddress,
                LogTypeNum = m.LogTypeNum,
                ResultTypeNum = m.ResultTypeNum,
                Message = m.Message,
                AddDate = m.AddDate
            }); 
            dgvResult.rows = memberViews.ToList();
            dgvResult.total = memberViews.ToList().Count;
            return Json(dgvResult, JsonRequestBehavior.AllowGet);
        }

    }
}
