using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

using FKS.Component.Tools;

namespace FKS.Core.Models.Account
{
    /// <summary>
    /// 实体类 -- 用户信息
    /// </summary>
    [Description("操作员信息")]
    public class Member : EntityBase<long>
    {
        /// <summary>
        /// 用户名
        /// </summary>
        [Required, StringLength(20)]
        public string UserName { get; set; }
        /// <summary>
        /// 用户密码
        /// </summary>
        [Required, StringLength(64)]
        public string Password { get; set; }
        /// <summary>
        /// 用户昵称
        /// </summary>
        [Required, StringLength(30)]
        public string NickName { get; set; }
        /// <summary>
        /// 是否为管理员
        /// </summary>
        [Required]
        public bool IsAdmin { get; set; }
        /// <summary>
        /// 用户扩展
        /// </summary>
        public virtual MemberExtend MemberExtend { get; set; }
    }
}
