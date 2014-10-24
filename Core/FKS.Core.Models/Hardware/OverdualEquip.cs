using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Core.Models.Hardware
{
    public class OverdualEquip
    {
        public string CollectionCode { get; set; }

        public string NickName { get; set; }

        public string Address { get; set; }

        public string Category { get; set; }

        public DateTime CleanTime { get; set; }

        public DateTime NextCleanTime { get; set; }
    }
}
