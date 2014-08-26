using FKS.Component.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Core.Models.Hardware
{
    public class RunningTime : EntityBase<int>
    {
        public string Category { get; set; }
        public DateTime TimeUp { get; set; }
        public int ProbeID { get; set; }
    }
}
