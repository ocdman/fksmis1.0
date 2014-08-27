using FKS.Component.Tools;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Core.Models.Parameters
{
    [Description("系统参数设定")]
    public class ParameterSet : EntityBase<int>
    {
        /// <summary>
        /// 维护期限
        /// </summary>
        public int MaintenanceBound { get; set; }

       /// <summary>
       /// 浓度阈值
       /// </summary>
        public int ConcentrateBound { get; set; }

        /// <summary>
        /// 净化器阈值
        /// </summary>
        public int PurifierBound { get; set; }

        /// <summary>
        /// 日排放量阈值
        /// </summary>
        public int DayDischargeBound { get; set; }

        /// <summary>
        /// 报表显示位数
        /// </summary>
        public int ShowNumbers { get; set; }
    }
}
