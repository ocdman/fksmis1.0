using FKS.Component.Tools;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Core.Models.Report
{
    [Description("报表打印")]
    public class ReportInfo:EntityBase<int>
    {
        /// <summary>
        /// 采集器上传时间
        /// </summary>
        public DateTime? UploadTime { get; set; }

        /// <summary>
        /// 油烟浓度
        /// </summary>
        public int? YouYanND { get; set; }

        /// <summary>
        /// 油烟湿度
        /// </summary>
        public int? YouYanSD { get; set; }

        /// <summary>
        /// 油烟温度
        /// </summary>
        public int? YouYanWD { get; set; }

        /// <summary>
        /// 油烟浓度2
        /// </summary>
        public int? YouYanND2 { get; set; }

        /// <summary>
        /// 油烟湿度2
        /// </summary>
        public int? YouYanSD2 { get; set; }

        /// <summary>
        /// 油烟温度2
        /// </summary>
        public int? YouYanWD2 { get; set; }

        /// <summary>
        /// 净化器运行时间
        /// </summary>
        public int? PurifierRunTime { get; set; }

        /// <summary>
        /// 风机运行时间
        /// </summary>
        public int? FanRunTime { get; set; }

        /// <summary>
        /// 探测器ID1
        /// </summary>
        public string DetectorID1 { get; set; }

        /// <summary>
        /// 探测器ID2
        /// </summary>
        public string DetectorID2 { get; set; }


    }
}
