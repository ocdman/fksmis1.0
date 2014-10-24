using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FKS.Core.Models.Hardware;

namespace FKS.Core
{
    public interface IDataAnalyseContract : IContract<DataAnalyse>
    {
        /// <summary>
        /// 取得实时数据
        /// </summary>
        /// <param name="tableName"></param>
        /// <param name="timeUp"></param>
        /// <param name="maxCount"></param>
        /// <returns></returns>
        ICollection<DataAnalyse> GetRealData(string tableName, DateTime timeUp, int maxCount = 2);

        /// <summary>
        /// 取得监测数据
        /// </summary>
        /// <param name="tableName"></param>
        /// <param name="timeStart"></param>
        /// <param name="timeEnd"></param>
        /// <param name="interval"></param>
        /// <returns></returns>
        ICollection<DataAnalyse> GetMonitorData(string tableName, DateTime timeStart, DateTime timeEnd, int interval);

        /// <summary>
        /// 取得联动比数据
        /// </summary>
        /// <param name="tableName"></param>
        /// <param name="timeStart"></param>
        /// <param name="timeEnd"></param>
        /// <returns></returns>
        ICollection<DataAnalyse> GetLinkageData(string tableName, DateTime timeStart, DateTime timeEnd);
        /// <summary>
        /// 运行时间数据
        /// </summary>
        /// <param name="tableName"></param>
        /// <param name="timeStart"></param>
        /// <param name="timeEnd"></param>
        /// <returns></returns>
        ICollection<RunningTime> GetRunningTimeData(string tableName, DateTime timeStart, DateTime timeEnd);
        /// <summary>
        /// 异常设备
        /// </summary>
        /// <returns></returns>
        ICollection<AbnormalEquip> GetAbnormalData();
        /// <summary>
        /// 维护时间超时设备
        /// </summary>
        /// <returns></returns>
        ICollection<OverdualEquip> GetOverdueData(string overdualType);

        /// <summary>
        /// 排放量
        /// </summary>
        /// <param name="tableName"></param>
        /// <param name="timeStart"></param>
        /// <param name="timeEnd"></param>
        /// <returns></returns>
        ICollection<DataStatistics> GetDischarge(string tableName, DateTime timeStart, DateTime timeEnd);
        /// <summary>
        /// 净化效率
        /// </summary>
        /// <param name="tableName"></param>
        /// <param name="timeStart"></param>
        /// <param name="timeEnd"></param>
        /// <returns></returns>
        ICollection<DataStatistics> GetPureRate(string tableName, DateTime timeStart, DateTime timeEnd);
        /// <summary>
        /// 油烟浓度
        /// </summary>
        /// <param name="tableName"></param>
        /// <param name="timeStart"></param>
        /// <param name="timeEnd"></param>
        /// <returns></returns>
        ICollection<DataStatistics> GetConcentration(string tableName, DateTime timeStart, DateTime timeEnd);
    }
}
