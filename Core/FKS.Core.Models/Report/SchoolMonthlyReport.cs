using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Core.Models.Report
{
    public class SchoolMonthlyReport
    {
        /// <summary>
        /// 报警次数
        /// </summary>
        public int AlarmTime { get; set; }
        /// <summary>
        /// 总次数
        /// </summary>
        public int CountTime { get; set; }
        /// <summary>
        /// 洁净度
        /// </summary>
        public int Clean { get; set; }
    }
}
