using FKS.Component.Tools;
using FKS.Core.Models.Authority;
using FKS.Core.Models.Report;
using FKS.Site.Models;
using FKS.Site.Web.Controllers.BaseControllers;
using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FKS.Site.Web.Controllers.Controllers
{
    public class ReportParams
	{
		public string collectionCode { get; set; }
        public string reportType { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int page { get; set; }
        public int rows { get; set; }

        public string SortType { get; set; }
	}

    [Export]
    public class ReportInfoController : ManagerController<IReportSiteContract, ReportInfoView>
    {
        [Import]
        protected IAuthoritySiteContract AuthoritySiteContract { get; set; }

        //
        // GET: /ReportInfo/

        public override ActionResult Index()
        {
            return View();
        }

        public bool CheckAuthority()
        {
            var authority = this.AuthoritySiteContract.Authorities.Single<Authority>(m => m.Id == 1);
            return authority.HasAuthority;
        }


        public ActionResult ReportDataRow(ReportParams param)
        {
            if (CheckAuthority() == false)
            {
                return Json("error", JsonRequestBehavior.DenyGet);
            }

            AnalyseReportType(param);
            //param.StartTime = DateTime.Parse("2014-06-23 00:00:00");
            //param.EndTime = DateTime.Parse("2014-06-28 00:00:00");
            var result = this.SiteContract.GetReportData(param.collectionCode, param.StartTime, param.EndTime, param.reportType);
            var dataGridData = new DataGridView<ReportInfo>
            {
                total = result.Count,
                rows = result.Skip((param.page - 1) * param.rows).Take(param.rows).ToList()
            };
            return Json(dataGridData, JsonRequestBehavior.AllowGet);
        }

        private void AnalyseReportType(ReportParams param)
        {
            DateTime dt = DateTime.Today;
            switch (param.reportType)
            {
                case "01":  //日报表
                    param.StartTime = dt.AddDays(-1);
                    param.EndTime = dt.AddHours(-1);
                    break;
                case "02":  //周报表
                    int n = (int)dt.DayOfWeek;
                    param.StartTime = dt.AddDays(-7 - n + 1);
                    param.EndTime = dt.AddDays(-n);
                    break;
                case "03":  //月报表
                    param.StartTime = dt.AddDays(1 - dt.Day).AddMonths(-1);
                    param.EndTime = dt.AddDays(1 - dt.Day).AddDays(-1);
                    break;
                case "04":  //季度报表
                    param.StartTime = dt.AddMonths(-3 - ((dt.Month - 1) % 3)).AddDays(1 - dt.Day); //上季度第一天
                    param.EndTime = dt.AddMonths(0 - ((dt.Month - 1) % 3)).AddDays(1 - dt.Day).AddDays(-1); //上季度最后一天
                    break;
                case "05":  //年报表
                    param.StartTime = dt.AddYears(-1).AddMonths(-dt.Month + 1).AddDays(-dt.Day + 1);
                    param.EndTime = dt.AddMonths(-dt.Month + 1).AddDays(-dt.Day);
                    break;
                default:
                    param.StartTime = DateTime.Now;
                    param.EndTime = DateTime.Now;
                    break;
            }
        }

        public ActionResult Reporting(ReportParams param)
        {
            if (CheckAuthority() == false)
            {
                return Json("error", JsonRequestBehavior.DenyGet);
            }

            string type = "Excel";
            //param.StartTime = DateTime.Parse("2014-06-23 00:00:00");
            //param.EndTime = DateTime.Parse("2014-06-28 00:00:00");
            AnalyseReportType(param);
            List<ReportInfo> ds = (List<ReportInfo>)this.SiteContract.GetReportData(param.collectionCode, param.StartTime, param.EndTime, param.reportType);
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/ReportModule/SampleReport.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", ds);
            localReport.DataSources.Add(reportDataSource);

            string reportType = type;
            string mimeType;
            string encoding;
            string fileNameExtension;

            string deviceInfo =
                "<DeviceInfo>" +
                "<OutputFormat>" + type + "</OutputFormat>" +
                "<PageWidth>11in</PageWidth>" +
                "<PageHeight>11in</PageHeight>" +
                "<MarginTop>0.5in</MarginTop>" +
                "<MarginLeft>1in</MarginLeft>" +
                "<MarginRight>1in</MarginRight>" +
                "<MarginBottom>0.5in</MarginBottom>" +
                "</DeviceInfo>";
            Warning[] warnings;
            string[] streams;
            byte[] renderedBytes;

            renderedBytes = localReport.Render(
                reportType,
                deviceInfo,
                out mimeType,
                out encoding,
                out fileNameExtension,
                out streams,
                out warnings);

            //renderedBytes = localReport.Render(reportType, deviceInfo);
            return File(renderedBytes, mimeType);
        }

        #region 排放量统计
        public ActionResult DischargeIndex()
        {
            return View();
        }

        public ActionResult DischargeDataRow(ReportParams param)
        {
            //AnalyseReportType(param);
            param.StartTime = DateTime.Parse("2014-06-23 00:00:00");
            param.EndTime = DateTime.Parse("2014-06-23 23:00:00");
            var result = this.SiteContract.GetDischargeReportData(param.SortType, param.StartTime, param.EndTime);
            var dataGridData = new DataGridView<DischargeReport>()
            {
                total = result.Count,
                rows = result.Skip((param.page - 1) * param.rows).Take(param.rows).ToList()
            };
            return Json(dataGridData, JsonRequestBehavior.AllowGet);
        }

        public ActionResult DischargeReporting(ReportParams param)
        {
            string type = "Excel";
            param.StartTime = DateTime.Parse("2014-06-23 00:00:00");
            param.EndTime = DateTime.Parse("2014-06-23 23:00:00");
            List<ConcentrationReport> ds1 = (List<ConcentrationReport>)this.SiteContract.GetConcentrationReportData(param.SortType, param.StartTime, param.EndTime);
            List<DischargeReport> ds2 = (List<DischargeReport>)this.SiteContract.GetDischargeReportData(param.SortType, param.StartTime, param.EndTime);
            List<AlarmTimeReport> ds3 = (List<AlarmTimeReport>)this.SiteContract.GetAlarmTimeReportData(param.SortType, param.StartTime, param.EndTime);
            //List<ReportStatistics>[] ds = new List<ReportStatistics>[2];
            //ds[0] = ds0;
            //ds[1] = ds1;
            string parameter1 = ds2.Count.ToString();
            string parameter2 = param.StartTime.ToString();
            string parameter3 = param.EndTime.ToString();

            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/ReportModule/LampblackMonitorReport.rdlc");
            ReportDataSource reportDataSource1 = new ReportDataSource("DataSet1", ds1);
            ReportDataSource reportDataSource2 = new ReportDataSource("DataSet2", ds2);
            ReportDataSource reportDataSource3 = new ReportDataSource("DataSet3", ds3);
            localReport.DataSources.Add(reportDataSource1);
            localReport.DataSources.Add(reportDataSource2);
            localReport.DataSources.Add(reportDataSource3);
            localReport.SetParameters(new ReportParameter("ReportParameter1", parameter1));
            localReport.SetParameters(new ReportParameter("ReportParameter2", parameter2));
            localReport.SetParameters(new ReportParameter("ReportParameter3", parameter3));

            string reportType = type;
            string mimeType;
            string encoding;
            string fileNameExtension;

            string deviceInfo =
                "<DeviceInfo>" +
                "<OutputFormat>" + type + "</OutputFormat>" +
                "<PageWidth>11in</PageWidth>" +
                "<PageHeight>11in</PageHeight>" +
                "<MarginTop>0.5in</MarginTop>" +
                "<MarginLeft>1in</MarginLeft>" +
                "<MarginRight>1in</MarginRight>" +
                "<MarginBottom>0.5in</MarginBottom>" +
                "</DeviceInfo>";
            Warning[] warnings;
            string[] streams;
            byte[] renderedBytes;

            renderedBytes = localReport.Render(
                reportType,
                deviceInfo,
                out mimeType,
                out encoding,
                out fileNameExtension,
                out streams,
                out warnings);

            //renderedBytes = localReport.Render(reportType, deviceInfo);
            return File(renderedBytes, mimeType);
        }
        #endregion
    }
}
