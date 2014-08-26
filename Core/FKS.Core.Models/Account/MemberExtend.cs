using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FKS.Component.Tools;

namespace FKS.Core.Models.Account
{
    [Description("操作员扩展类")]
    public class MemberExtend : EntityBase<long>
    {
        /// <summary>
        /// Email
        /// </summary>
        [StringLength(30)]
        public string Email { get; set; }
        /// <summary>
        /// 地址
        /// </summary>
        [Required, StringLength(200)]
        public string Address { get; set; }
        /// <summary>
        /// 用户信息
        /// </summary>
        public virtual Member Member { get; set; }
    }
}
