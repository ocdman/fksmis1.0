using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Site.Models
{
    public class ParameterSetView
    {
        /// <summary>
        /// 维护期限
        /// </summary>
        [Required]
        [Display(Name = "维护期限(月)")]
        public int MaintenanceBound { get; set; }

        /// <summary>
        /// 浓度阈值
        /// </summary>
        [Required]
        [Display(Name = "浓度阈值(mg/m³)")]
        public int ConcentrateBound { get; set; }

        /// <summary>
        /// 净化器阈值
        /// </summary>
        [Required]
        [Display(Name = "净化器阈值(%)")]
        public int PurifierBound { get; set; }

        /// <summary>
        /// 日排放量阈值
        /// </summary>
        [Required]
        [Display(Name = "日排放量阈值(g/天)")]
        public int DayDischargeBound { get; set; }

        /// <summary>
        /// 报表显示位数
        /// </summary>
        [Required]
        [Display(Name = "报表显示位数(位)")]
        public int ShowNumbers { get; set; }
    }
}
