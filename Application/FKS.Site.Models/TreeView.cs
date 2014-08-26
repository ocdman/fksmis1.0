using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Site.Models
{
    public class TreeView
    {
        public string id { get; set; }
        public string text { get; set; }
        public string iconCls { get; set; }
        public string State { get; set; }
        public string attributes { get; set; }
        public ICollection<TreeView> children { get; set; }
    }
}
