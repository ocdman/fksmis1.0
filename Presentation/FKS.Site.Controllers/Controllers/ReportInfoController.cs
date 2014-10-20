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
            //AnalyseReportType(param);
            List<DischargeReport> ds1 = (List<DischargeReport>)this.SiteContract.GetDischargeReportData(param.SortType, param.StartTime, param.EndTime);
            List<ConcentrationReport> ds2 = (List<ConcentrationReport>)this.SiteContract.GetConcentrationReportData(param.SortType, param.StartTime, param.EndTime);
            List<PureRateReport> ds3 = (List<PureRateReport>)this.SiteContract.GetPureRateReportData(param.SortType, param.StartTime, param.EndTime);
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/ReportModule/SampleReport.rdlc");
            string parameter1 = param.StartTime.ToString();
            string parameter2 = param.EndTime.ToString();
            ReportDataSource reportDataSource1 = new ReportDataSource("DataSet1", ds1);
            ReportDataSource reportDataSource2 = new ReportDataSource("DataSet2", ds2);
            ReportDataSource reportDataSource3 = new ReportDataSource("DataSet3", ds3);
            localReport.DataSources.Add(reportDataSource1);
            localReport.DataSources.Add(reportDataSource2);
            localReport.DataSources.Add(reportDataSource3);
            localReport.SetParameters(new ReportParameter("ReportParameter1", parameter1));
            localReport.SetParameters(new ReportParameter("ReportParameter2", parameter2));

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

        #region 油烟监测报告
        public ActionResult LampblackMonitorIndex()
        {
            return View();
        }

        /// <summary>
        /// 油烟浓度报表数据
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public ActionResult ConcentrationReportDataRow(ReportParams param)
        {
            if (CheckAuthority() == false)
            {
                return Json("error", JsonRequestBehavior.DenyGet);
            }
            var result = this.SiteContract.GetConcentrationReportData(param.SortType, param.StartTime, param.EndTime);
            var dataGridData = new DataGridView<ConcentrationReport>()
            {
                total = result.Count,
                rows = result.Skip((param.page - 1) * param.rows).Take(param.rows).ToList()
            };
            return Json(dataGridData, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 排放量报表数据
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public ActionResult DischargeReportDataRow(ReportParams param)
        {
            if (CheckAuthority() == false)
            {
                return Json("error", JsonRequestBehavior.DenyGet);
            }
            var result = this.SiteContract.GetDischargeReportData(param.SortType, param.StartTime, param.EndTime);
            var dataGridData = new DataGridView<DischargeReport>()
            {
                total = result.Count,
                rows = result.Skip((param.page - 1) * param.rows).Take(param.rows).ToList()
            };
            return Json(dataGridData, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 净化效率报表数据
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public ActionResult PureRateReportDataRow(ReportParams param)
        {
            if (CheckAuthority() == false)
            {
                return Json("error", JsonRequestBehavior.DenyGet);
            }
            var result = this.SiteContract.GetPureRateReportData(param.SortType, param.StartTime, param.EndTime);
            var dataGridData = new DataGridView<PureRateReport>()
            {
                total = result.Count,
                rows = result.Skip((param.page - 1) * param.rows).Take(param.rows).ToList()
            };
            return Json(dataGridData, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 报警次数报表数据
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public ActionResult AlarmTimeReportDataRow(ReportParams param)
        {
            if (CheckAuthority() == false)
            {
                return Json("error", JsonRequestBehavior.DenyGet);
            }
            //param.StartTime = DateTime.Parse("2014-06-23 00:00:00");
            //param.EndTime = DateTime.Parse("2014-06-23 23:00:00");
            var result = this.SiteContract.GetAlarmTimeReportData(param.SortType, param.StartTime, param.EndTime);
            var dataGridData = new DataGridView<AlarmTimeReport>()
            {
                total = result.Count,
                rows = result.Skip((param.page - 1) * param.rows).Take(param.rows).ToList()
            };
            return Json(dataGridData, JsonRequestBehavior.AllowGet);
        }

        public ActionResult LampblackMonitorReporting(ReportParams param)
        {
            if (CheckAuthority() == false)
            {
                return Json("error", JsonRequestBehavior.DenyGet);
            }
            string type = "Excel";
            //param.StartTime = DateTime.Parse("2014-06-23 00:00:00");
            //param.EndTime = DateTime.Parse("2014-06-23 23:00:00");
            List<ConcentrationReport> ds1 = (List<ConcentrationReport>)this.SiteContract.GetConcentrationReportData(param.SortType, param.StartTime, param.EndTime);
            List<DischargeReport> ds2 = (List<DischargeReport>)this.SiteContract.GetDischargeReportData(param.SortType, param.StartTime, param.EndTime);
            List<AlarmTimeReport> ds3 = (List<AlarmTimeReport>)this.SiteContract.GetAlarmTimeReportData(param.SortType, param.StartTime, param.EndTime);

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

        #region 油烟台账报告

        public ActionResult LampblackAccountIndex()
        {
            return View();
        }

        public ActionResult LampblackAccountReporting(ReportParams param, string NickName, string Address)
        {
            if (CheckAuthority() == false)
            {
                return Json("error", JsonRequestBehavior.DenyGet);
            }
            string type = "Excel";
            //param.collectionCode = "fjb020160001";
            //param.StartTime = DateTime.Parse("2014-06-01 00:00:00");
            //param.EndTime = DateTime.Parse("2014-06-30 23:00:00");

            List<LampblackAccountReport> ds1 = (List<LampblackAccountReport>)this.SiteContract.GetLampblackAccountReportData(param.collectionCode, param.StartTime, param.EndTime);

            int day = 1;
            int temp;
            List<LampblackAccountReport> ds2 = new List<LampblackAccountReport>();

            int year = param.StartTime.Year;
            int month = param.StartTime.Month;
            int bound;
            if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)
            {
                bound = 31;
            }
            else if (month == 2)
            {
                //int year = param.StartTime.Year;
                if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
                {
                    bound = 29;
                }
                else
                {
                    bound = 28;
                }
            }
            else
            {
                bound = 30;
            }

            int i = 0;
            foreach (LampblackAccountReport lap in ds1)
            {

                if (i == lap.AccountDate.Day)
                {
                    ds2.Add(lap);
                    i++;
                }
                else
                {
                    while (i++ != lap.AccountDate.Day - 1)
                    {
                        ds2.Add(new LampblackAccountReport());
                    }
                    ds2.Add(lap);
                }
            }
            while (31 > i++)
            {
                ds2.Add(new LampblackAccountReport());
            }

            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/ReportModule/LampblackAccountReport.rdlc");

            ReportDataSource reportDataSource1 = new ReportDataSource("DataSet1", ds2);
            localReport.DataSources.Add(reportDataSource1);
            localReport.SetParameters(new ReportParameter("ReportParameter1", NickName));
            localReport.SetParameters(new ReportParameter("ReportParameter2", Address));
            localReport.SetParameters(new ReportParameter("ReportParameter3", year.ToString()));
            localReport.SetParameters(new ReportParameter("ReportParameter4", month.ToString()));

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
