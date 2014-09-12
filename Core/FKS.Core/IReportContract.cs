using FKS.Core.Models.Report;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Core
{
    public interface IReportContract : IContract<ReportInfo>
    {
        IQueryable<ReportInfo> Reports { get; }

        ICollection<ReportInfo> GetReportData(string collectionCode, DateTime timeStart, DateTime timeEnd, string reportType);

        ICollection<ReportStatistics> GetDischargeReportData(string reportType, string sortType, DateTime timeStart,
            DateTime timeEnd);
    }
}
