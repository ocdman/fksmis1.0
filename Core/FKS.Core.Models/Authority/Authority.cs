using FKS.Component.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Core.Models.Authority
{
    public class Authority : EntityBase<int>
    {
        public bool HasAuthority { get; set; }
    }
}
