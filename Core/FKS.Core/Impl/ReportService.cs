using FKS.Core.Data.Repositories.Report;
using FKS.Core.Models.Report;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Core.Impl
{
    public class ReportService : CoreServiceBase<ReportInfo>, IReportContract
    {
        [Import]
        public IReportInfoRepository ReportRepository { get; set; }
        public IQueryable<ReportInfo> Reports
        {
            get { return ReportRepository.Entities; }
        }

        public override int Add(ReportInfo model)
        {
            return ReportRepository.Insert(model);
        }

        public override int Edit(ReportInfo model)
        {
            return ReportRepository.Update(model);
        }

        public override int Del(ReportInfo model)
        {
            return ReportRepository.Delete(model);
        }

        public override ReportInfo Detail<T>(T Id)
        {
            return this.Reports.SingleOrDefault(m => m.Id.Equals(Id));
        }

        public ICollection<ReportInfo> GetReportData(string collectionCode, DateTime timeStart, DateTime timeEnd)
        {
            SqlParameter[] sqlParams = new SqlParameter[3];
            sqlParams[0] = new SqlParameter("@collection_code", collectionCode);
            sqlParams[1] = new SqlParameter("@start_time", System.Data.SqlDbType.DateTime, 4) { Value = timeStart };
            sqlParams[2] = new SqlParameter("@end_time", System.Data.SqlDbType.DateTime, 4) { Value = timeEnd };

            var result = from p in this.UnitOfWork.DbContext.Database.SqlQuery<ReportInfo>("exec pro_get_report_data @collection_code,@start_time,@end_time", sqlParams)
                         select p;
            return result.ToList();
        }


        public ICollection<ReportInfo> GetReportData(string collectionCode, DateTime timeStart, DateTime timeEnd, string reportType)
        {
            SqlParameter[] sqlParams = new SqlParameter[4];
            sqlParams[0] = new SqlParameter("@collection_code", collectionCode);
            sqlParams[1] = new SqlParameter("@start_time", System.Data.SqlDbType.DateTime, 4) { Value = timeStart };
            sqlParams[2] = new SqlParameter("@end_time", System.Data.SqlDbType.DateTime, 4) { Value = timeEnd };
            sqlParams[3] = new SqlParameter("@report_type", reportType);

            var result = from p in this.UnitOfWork.DbContext.Database.SqlQuery<ReportInfo>("exec pro_get_report_data @collection_code,@start_time,@end_time,@report_type", sqlParams)
                         select p;
            return result.ToList();
        }


        public ICollection<ReportStatistics> GetDischargeReportData(string sortType, DateTime timeStart, DateTime timeEnd)
        {
            SqlParameter[] sqlParams = new SqlParameter[3];
            sqlParams[0] = new SqlParameter("@sort_type", sortType);
            sqlParams[1] = new SqlParameter("@start_time", timeStart);
            sqlParams[2] = new SqlParameter("@end_time", timeEnd);

            var result = from p in this.UnitOfWork.DbContext.Database.SqlQuery<ReportStatistics>("exec proc_get_discharge_report @sort_type,@start_time,@end_time", sqlParams)
                         select p;

            return result.ToList();
        }
    }
}
