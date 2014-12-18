using FKS.Component.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Core.Models.Hardware
{
    public class RunningTime
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public DateTime TimeUp { get; set; }
        public int ProbeID { get; set; }
    }

    public class RunningTimeGridView<T>
    {
        public IList<T> Vals { get; set; }

        public int FjTotal { get; set; }

        public int JhqTotal { get; set; }
    }
}
