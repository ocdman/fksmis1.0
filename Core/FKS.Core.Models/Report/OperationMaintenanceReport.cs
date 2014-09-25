using FKS.Component.Tools;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Core.Models.Report
{
    [Description("运维报表")]
    public class OperationMaintenanceReport: EntityBase<int>
    {
        public string ContractNo { get; set; }

        public string NickName { get; set; }

        public DateTime? ContractStartTime { get; set; }

        public DateTime? OpenTime { get; set; }

        public DateTime? OperationMaintenanceTime { get; set; }

        public DateTime? OperationMaintenanceContractExpirationTime { get; set; }
    }
}
