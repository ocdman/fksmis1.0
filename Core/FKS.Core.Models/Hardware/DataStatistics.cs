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
    public class DataStatistics : EntityBase<int>
    {
        public float YouYanND { get; set; }

        public int FanRuntime { get; set; }

        public DateTime TimeUp { get; set; }

        public int ConcentrateBound { get; set; }

        public int PurifierBound { get; set; }

        public int DayDischargeBound { get; set; }
    }
}
