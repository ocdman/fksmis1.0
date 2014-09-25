using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Site.Models
{
    public class OperationMaintenanceView
    {
        public string ContractNo { get; set; }

        public string NickName { get; set; }

        public DateTime? ContractStartTime { get; set; }

        public DateTime? OpenTime { get; set; }

        public DateTime? OperationMaintenanceTime { get; set; }

        public DateTime? OperationMaintenanceContractExpirationTime { get; set; }
    }
}
