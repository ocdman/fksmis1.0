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

        public string SortObject { get; set; }

        public int PositionInfo { get; set; }

        public int PropertyInfo { get; set; }
    }

    [Export]
    public class ReportInfoController : ManagerController<IReportSiteContract, ReportInfoView>
    {
        [Import]
        protected IAuthoritySiteContract AuthoritySiteContract { get; set; }

        [Import]
        protected IEquipmentSiteContract EquipmentSiteContract { get; set; }

        int jurisdiction = 1;
        static string type = "Excel";
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

        private void CheckIsInEducatorRole()
        {
            if (User.IsInRole("松江教育局"))
            {
                jurisdiction = 0;
            }
        }

        private void GetRenderedBytes(LocalReport localReport)
        {
            renderedBytes = localReport.Render(
                reportType,
                deviceInfo,
                out mimeType,
                out encoding,
                out fileNameExtension,
                out streams,
                out warnings);
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
            
            var result = this.SiteContract.GetConcentrationReportData(param.SortType, param.PositionInfo, param.PropertyInfo, jurisdiction, param.StartTime, param.EndTime);
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
            CheckIsInEducatorRole();
            var result = this.SiteContract.GetDischargeReportData(param.SortType, param.PositionInfo, param.PropertyInfo, jurisdiction, param.StartTime, param.EndTime);
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
            CheckIsInEducatorRole();
            var result = this.SiteContract.GetAlarmTimeReportData(param.SortType, param.PositionInfo, param.PropertyInfo, jurisdiction, param.StartTime, param.EndTime);
            var dataGridData = new DataGridView<AlarmTimeReport>()
            {
                total = result.Count,
                rows = result.Skip((param.page - 1) * param.rows).Take(param.rows).ToList()
            };
            return Json(dataGridData, JsonRequestBehavior.AllowGet);
        }

        public ActionResult LampblackMonitorReporting(ReportParams param)
        {
            var count = 0;
            if (CheckAuthority() == false)
            {
                return Json("error", JsonRequestBehavior.DenyGet);
            }
            CheckIsInEducatorRole();
            List<ConcentrationReport> ds1 = (List<ConcentrationReport>)this.SiteContract.GetConcentrationReportData(param.SortType, param.PositionInfo, param.PropertyInfo, jurisdiction, param.StartTime, param.EndTime);
            List<DischargeReport> ds2 = (List<DischargeReport>)this.SiteContract.GetDischargeReportData(param.SortType, param.PositionInfo, param.PropertyInfo, jurisdiction, param.StartTime, param.EndTime);
            List<AlarmTimeReport> ds3 = (List<AlarmTimeReport>)this.SiteContract.GetAlarmTimeReportData(param.SortType, param.PositionInfo, param.PropertyInfo, jurisdiction, param.StartTime, param.EndTime);

            var member = EquipmentSiteContract.Equipments;
            if (User.IsInRole("松江教育局"))
            {
                if (param.PositionInfo == 0 && param.PropertyInfo == 0)
                {
                    count = member.Where(m => m.Jurisdiction == 0).Count();
                }
                else if (param.PositionInfo != 0 && param.PropertyInfo == 0)
                {
                    count = member.Where(m => m.PositionInfo == param.PositionInfo).Where(m => m.Jurisdiction == 0).Count();
                }
                else if (param.PositionInfo == 0 && param.PropertyInfo != 0)
                {
                    count = member.Where(m => m.PropertyInfo == param.PropertyInfo).Where(m => m.Jurisdiction == 0).Count();
                }
                else
                {
                    count = member.Where(m => m.PropertyInfo == param.PropertyInfo).Where(m => m.PositionInfo == param.PositionInfo).Where(m => m.Jurisdiction == 0).Count();
                }
            }
            else
            {
                if (param.PositionInfo == 0 && param.PropertyInfo == 0)
                {
                    count = member.Count();
                }
                else if (param.PositionInfo != 0 && param.PropertyInfo == 0)
                {
                    count = member.Where(m => m.PositionInfo == param.PositionInfo).Count();
                }
                else if (param.PositionInfo == 0 && param.PropertyInfo != 0)
                {
                    count = member.Where(m => m.PropertyInfo == param.PropertyInfo).Count();
                }
                else
                {
                    count = member.Where(m => m.PropertyInfo == param.PropertyInfo).Where(m => m.PositionInfo == param.PositionInfo).Count();
                }
            }
            
            string parameter1 = count.ToString();
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

            GetRenderedBytes(localReport);
            return File(renderedBytes, mimeType);
        }
        #endregion

        #region 油烟台账报告

        public ActionResult LampblackAccountIndex()
        {
            return View();
        }

        public ActionResult LampblackAccountDataRaw(ReportParams param) 
        {
            if (CheckAuthority() == false)
            {
                return Json("error", JsonRequestBehavior.DenyGet);
            }
            var result = this.SiteContract.GetLampblackAccountReportData(param.collectionCode, param.StartTime, param.EndTime);
            var dataGridData = new DataGridView<LampblackAccountReport>()
            {
                total = result.Count,
                rows = result.Skip((param.page - 1) * param.rows).Take(param.rows).ToList()
            };
            return Json(dataGridData, JsonRequestBehavior.AllowGet);
        }

        public ActionResult LampblackAccountReporting(ReportParams param)
        {
            if (CheckAuthority() == false)
            {
                return Json("error", JsonRequestBehavior.DenyGet);
            }

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
            string tempEquID = string.Empty;
            foreach (LampblackAccountReport lap in ds1)
            {
                if (tempEquID != string.Empty && (lap.EquID != tempEquID))
                {
                    while (32 > i++)
                    {
                        ds2.Add(new LampblackAccountReport() { NickName = lap.NickName, Address = lap.Address});
                    }
                    i = 0;
                }
                while (i++ != lap.AccountDate.Day - 1)
                {
                    ds2.Add(new LampblackAccountReport() { NickName = lap.NickName, Address = lap.Address });
                }
                ds2.Add(lap);
                tempEquID = lap.EquID;
            }
            while (32 > i++)
            {
                ds2.Add(new LampblackAccountReport());
            }

            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/ReportModule/LampblackAccountReport.rdlc");

            ReportDataSource reportDataSource1 = new ReportDataSource("DataSet1", ds2);
            localReport.DataSources.Add(reportDataSource1);
            localReport.SetParameters(new ReportParameter("ReportParameter3", year.ToString()));
            localReport.SetParameters(new ReportParameter("ReportParameter4", month.ToString()));

            GetRenderedBytes(localReport);
            return File(renderedBytes, mimeType);
        }

        #endregion

        #region 学校油烟监测月报表
        public ActionResult SchoolMonthlyReportIndex()
        {
            return View();
        }

        public ActionResult SchoolMonthlyReportDataRow(string CollectionCodes, ReportParams param)
        {
            if (CheckAuthority() == false)
            {
                return Json("error", JsonRequestBehavior.DenyGet);
            }
            var result = this.SiteContract.GetSchoolMonthlyReportData(CollectionCodes,param.SortType, param.SortObject, param.StartTime, param.EndTime);
            var dataGridData = new DataGridView<SchoolMonthlyReport>()
            {
                total = result.Count,
                rows = result.Skip((param.page - 1) * param.rows).Take(param.rows).ToList()
            };
            return Json(dataGridData, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SchoolMonthlyReporting(string CollectionCodes, ReportParams param)
        {
            if (CheckAuthority() == false)
            {
                return Json("error", JsonRequestBehavior.DenyGet);
            }

            List<SchoolMonthlyReport> ds1 = (List<SchoolMonthlyReport>)this.SiteContract.GetSchoolMonthlyReportData(CollectionCodes, param.SortType, param.SortObject, param.StartTime, param.EndTime);
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/ReportModule/HorizontalTable.rdlc");
            string parameter1 = param.StartTime.ToString();
            string parameter2 = param.EndTime.ToString();
            ReportDataSource reportDataSource1 = new ReportDataSource("DataSet1", ds1);
            localReport.DataSources.Add(reportDataSource1);
            localReport.SetParameters(new ReportParameter("ReportParameter1", parameter1));
            localReport.SetParameters(new ReportParameter("ReportParameter2", parameter2));

            GetRenderedBytes(localReport);
            return File(renderedBytes, mimeType);
        }


        #endregion
    }
}
