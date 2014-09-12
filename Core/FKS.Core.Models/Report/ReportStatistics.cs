using FKS.Component.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Core.Models.Report
{
    public class ReportStatistics : EntityBase<int>
    {
        public float Discharge { get; set; }

        public float Concentration { get; set; }

        public float PureRate { get; set; }

        public string NickName { get; set; }
    }
}
