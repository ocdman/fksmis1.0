using FKS.Component.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Core.Models.Hardware
{
    public class AbnormalEquip : EntityBase<int>
    {
        public string CollectionCode { get; set; }

        public string NickName { get; set; }

        public string Address { get; set; }

        /// <summary>
        /// 信号强度
        /// </summary>
        public int ZTqd { get; set; }

        public bool ZTst { get; set; }

        /// <summary>
        /// 连接状态
        /// </summary>
        public bool OnOff { get; set; }

        public string  Category { get; set; }
    }
}
