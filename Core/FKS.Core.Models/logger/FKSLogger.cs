using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FKS.Component.Tools;

namespace FKS.Core.Models.logger
{
    public class FKSLogger : EntityBase<long>
    {
        public string sThread { get; set; }
        public string sLevel { get; set; }
        public string sLogger { get; set; }
        public string sMessage { get; set; }
        public string sException { get; set; }
    }
}
