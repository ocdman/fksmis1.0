using FKS.Component.Tools;
using FKS.Core.Models.Hardware;
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
    [Export]
    public class OperationMaintenanceController : ManagerController<IEquipmentSiteContract, EquipmentView>
    {
        //
        // GET: /OperationMaintenance/

        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 查询数据
        /// </summary>
        /// <param name="pagination"></param>
        /// <returns></returns>
        public ActionResult DataRowIndex(Pagination pagination)
        {
            DataGridView<OperationMaintenanceView> dgvResult = new DataGridView<OperationMaintenanceView>();

            var memberViews = this.SiteContract.Equipments.Where<Equipment>(m => true)
                .Select(m => new OperationMaintenanceView
                {
                    ContractNo = m.ContractNo,
                    NickName = m.NickName,
                    ContractStartTime = m.ContractStartTime,
                    OpenTime = m.OpenTime
                }).ToList();

            dgvResult.rows = memberViews.Skip((pagination.page - 1) * pagination.rows).Take(pagination.rows).ToList();

            foreach (OperationMaintenanceView omv in dgvResult.rows)
            {
                if (omv.OpenTime != null)
                {
                    omv.OperationMaintenanceTime = omv.OpenTime.Value.AddMonths(3);
                    omv.OperationMaintenanceContractExpirationTime = omv.OpenTime.Value.AddYears(1);
                }
            }

            dgvResult.total = memberViews.Count();

            return Json(dgvResult, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Reporting(ReportParams param)
        {
            string type = "Excel";
            
            var members = this.SiteContract.Equipments.Where<Equipment>(m => true)
                .Select(m => new OperationMaintenanceView
                {
                    ContractNo = m.ContractNo,
                    NickName = m.NickName,
                    ContractStartTime = m.ContractStartTime,
                    OpenTime = m.OpenTime
                });
            List<OperationMaintenanceView> reportList = members.ToList();

            foreach (OperationMaintenanceView omr in reportList)
            {
                if (omr.OpenTime != null)
                {
                    omr.OperationMaintenanceTime = omr.OpenTime.Value.AddMonths(3);
                    omr.OperationMaintenanceContractExpirationTime = omr.OpenTime.Value.AddYears(1);
                }
            }

            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/ReportModule/OperationMaintenanceReport.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", reportList);
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
    }
}
