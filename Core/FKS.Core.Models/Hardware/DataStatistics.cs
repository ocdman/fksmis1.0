using FKS.Component.Tools;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Core.Models.Hardware
{
    /// <summary>
    /// created by wbgong at 2014-08-13 
    /// </summary>
    [Description("数据统计")]
    public class DataStatistics
    {
        public float Value { get; set; }

        public DateTime TimeUp { get; set; }

    }

    /// <summary>
    /// created by wbgong at 2014-12-08
    /// </summary>
    [Description("数据统计集合")]
    public class DataStatisticsGridView<T>
    {
        public int Total { get; set; }

        public int Bound { get; set; }

        public float StatVal { get; set; }

        public IList<T> Vals { get; set; }
    }
}
