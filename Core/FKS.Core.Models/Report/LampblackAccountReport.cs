using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Core.Models.Report
{
    public class LampblackAccountReport
    {
        /// <summary>
        /// 联动比
        /// </summary>
        public double? Ldb { get; set; }

        /// <summary>
        /// 油烟浓度
        /// </summary>
        public double? AvgND { get; set; }

        /// <summary>
        /// 报警次数
        /// </summary>
        public Int16? NDbjCount { get; set; }

        /// <summary>
        /// 洁净度
        /// </summary>
        public Int16? Avgjjd { get; set; }

        /// <summary>
        /// 日期
        /// </summary>
        public DateTime AccountDate { get; set; }

        /// <summary>
        /// 单位
        /// </summary>
        public string NickName { get; set; }

        /// <summary>
        /// 地址
        /// </summary>
        public string Address { get; set; }

        public string EquID { get; set; }

    }
}
