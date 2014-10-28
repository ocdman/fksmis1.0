using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FKS.Core.Data.Repositories.Hardware;
using FKS.Core.Models.Hardware;
using System.Data.SqlClient;

namespace FKS.Core.Impl
{
    [Export]
    public class DataAnalyseService : CoreServiceBase<DataAnalyse>, IDataAnalyseContract
    {
        /// <summary>
        /// 获取或设置 用户信息数据访问对象
        /// </summary>
        [Import]
        protected IDataAnalyseRepository Repository { get; set; }

        public override int Add(DataAnalyse model)
        {
            throw new NotImplementedException();
        }

        public override int Edit(DataAnalyse model)
        {
            throw new NotImplementedException();
        }

        public override int Del(DataAnalyse model)
        {
            throw new NotImplementedException();
        }

        public override DataAnalyse Detail<T>(T Id)
        {
            throw new NotImplementedException();
        }



        #region IDataAnalyseContract 成员

        public ICollection<DataAnalyse> GetRealData(string tableName, DateTime timeUp, int maxCount = 1)
        {
            SqlParameter[] sqlparams = new SqlParameter[3];

            sqlparams[0] = new SqlParameter("@table_name", tableName);
            sqlparams[1] = new SqlParameter("@datetime", System.Data.SqlDbType.DateTime, 4) { Value = timeUp };
            sqlparams[2] = new SqlParameter("@maxCount", maxCount);

            var result = from p in this.UnitOfWork.DbContext.Database.SqlQuery<DataAnalyse>("exec pro_get_real_data @table_name,@datetime,@maxCount", sqlparams)
                         select p;

            return result.ToList();
        }

        public ICollection<DataAnalyse> GetMonitorData(string tableName, DateTime timeStart, DateTime timeEnd, int interval)
        {
            SqlParameter[] sqlparams = new SqlParameter[4];

            sqlparams[0] = new SqlParameter("@table_name", tableName);
            sqlparams[1] = new SqlParameter("@start_time", System.Data.SqlDbType.DateTime, 4) { Value = timeStart };
            sqlparams[2] = new SqlParameter("@end_time", System.Data.SqlDbType.DateTime, 4) { Value = timeEnd };
            sqlparams[3] = new SqlParameter("@interval", interval);

            var result = from p in this.UnitOfWork.DbContext.Database.SqlQuery<DataAnalyse>("exec pro_getInterval_data @table_name,@start_time,@end_time,@interval", sqlparams)
                         select p;

            return result.ToList();
        }

        public ICollection<DataAnalyse> GetCleanData(string tableName, DateTime timeStart, DateTime timeEnd, int interval)
        {
            SqlParameter[] sqlparams = new SqlParameter[4];

            sqlparams[0] = new SqlParameter("@table_name", tableName);
            sqlparams[1] = new SqlParameter("@start_time", System.Data.SqlDbType.DateTime, 4) { Value = timeStart };
            sqlparams[2] = new SqlParameter("@end_time", System.Data.SqlDbType.DateTime, 4) { Value = timeEnd };
            sqlparams[3] = new SqlParameter("@interval", interval);

            var result = from p in this.UnitOfWork.DbContext.Database.SqlQuery<DataAnalyse>("exec pro_getClean_data @table_name,@start_time,@end_time,@interval", sqlparams)
                         select p;

            return result.ToList();
        }

        public ICollection<DataAnalyse> GetLinkageData(string tableName, DateTime timeStart, DateTime timeEnd)
        {
            SqlParameter[] sqlparams = new SqlParameter[3];

            sqlparams[0] = new SqlParameter("@table_name", tableName);
            sqlparams[1] = new SqlParameter("@start_time", System.Data.SqlDbType.DateTime, 4) { Value = timeStart };
            sqlparams[2] = new SqlParameter("@end_time", System.Data.SqlDbType.DateTime, 4) { Value = timeEnd };

            var result = from p in this.UnitOfWork.DbContext.Database.SqlQuery<DataAnalyse>("exec pro_getLinkage_data @table_name,@start_time,@end_time", sqlparams)
                         select p;

            return result.ToList();
        }

        #endregion

        #region IDataAnalyseContract 成员


        public ICollection<RunningTime> GetRunningTimeData(string tableName, DateTime timeStart, DateTime timeEnd)
        {
            SqlParameter[] sqlparams = new SqlParameter[3];

            sqlparams[0] = new SqlParameter("@table_name", tableName);
            sqlparams[1] = new SqlParameter("@start_time", System.Data.SqlDbType.DateTime, 4) { Value = timeStart };
            sqlparams[2] = new SqlParameter("@end_time", System.Data.SqlDbType.DateTime, 4) { Value = timeEnd };

            var result = from p in this.UnitOfWork.DbContext.Database.SqlQuery<RunningTime>("exec pro_get_running_time @table_name,@start_time,@end_time", sqlparams)
                         select p;

            return result.ToList();
        }

        public ICollection<AbnormalEquip> GetAbnormalData()
        {
            var result = from p in this.UnitOfWork.DbContext.Database.SqlQuery<AbnormalEquip>("exec pro_get_abnormal")
                         select p;
            return result.ToList();
        }

        public ICollection<OverdualEquip> GetOverdueData(string overdualType)
        {
            SqlParameter[] sqlparams = new SqlParameter[1];

            sqlparams[0] = new SqlParameter("overdual_type", overdualType);

            var result = from p in this.UnitOfWork.DbContext.Database.SqlQuery<OverdualEquip>("exec pro_get_overdue_data @overdual_type", sqlparams) select p;
            return result.ToList();
        }

        public ICollection<DataStatistics> GetDischarge(string tableName, DateTime timeStart, DateTime timeEnd)
        {
            SqlParameter[] sqlparams = new SqlParameter[3];

            sqlparams[0] = new SqlParameter("@table_name", tableName);
            sqlparams[1] = new SqlParameter("@start_time", System.Data.SqlDbType.DateTime, 4) { Value = timeStart };
            sqlparams[2] = new SqlParameter("@end_time", System.Data.SqlDbType.DateTime, 4) { Value = timeEnd };

            var result = from p in this.UnitOfWork.DbContext.Database.SqlQuery<DataStatistics>("exec pro_get_discharge @table_name,@start_time,@end_time", sqlparams) select p;

            return result.ToList();
        }

        public ICollection<DataStatistics> GetPureRate(string tableName, DateTime timeStart, DateTime timeEnd)
        {
            SqlParameter[] sqlparams = new SqlParameter[3];

            sqlparams[0] = new SqlParameter("@table_name", tableName);
            sqlparams[1] = new SqlParameter("@start_time", System.Data.SqlDbType.DateTime, 4) { Value = timeStart };
            sqlparams[2] = new SqlParameter("@end_time", System.Data.SqlDbType.DateTime, 4) { Value = timeEnd };

            var result = from p in this.UnitOfWork.DbContext.Database.SqlQuery<DataStatistics>("exec pro_get_pure_rate @table_name,@start_time,@end_time", sqlparams) select p;

            return result.ToList();
        }

        #endregion


        public ICollection<DataStatistics> GetConcentration(string tableName, DateTime timeStart, DateTime timeEnd)
        {
            SqlParameter[] sqlparams = new SqlParameter[3];

            sqlparams[0] = new SqlParameter("@table_name", tableName);
            sqlparams[1] = new SqlParameter("@start_time", System.Data.SqlDbType.DateTime, 4) { Value = timeStart };
            sqlparams[2] = new SqlParameter("@end_time", System.Data.SqlDbType.DateTime, 4) { Value = timeEnd };

            var result = from p in this.UnitOfWork.DbContext.Database.SqlQuery<DataStatistics>("exec pro_get_concentration @table_name,@start_time,@end_time", sqlparams) select p;

            return result.ToList();
        }


        public int UpdateCleanTime(string CollectionCodes)
        {
            SqlParameter[] sqlparams = new SqlParameter[1];

            sqlparams[0] = new SqlParameter("@collectionCodes", CollectionCodes);

            var result = this.UnitOfWork.DbContext.Database.ExecuteSqlCommand("exec pro_update_cleantime @collectionCodes", sqlparams);

            return result;
        }



    }
}
