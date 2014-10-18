using FKS.Component.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Core.Models.Message
{
    public class MessageSet : EntityBase<int>
    {
        public string PhoneNumber { get; set; }

        public string SendTime { get; set; }

    }
}
