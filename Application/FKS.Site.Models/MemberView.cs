using FKS.Component.Tools;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Site.Models
{
    /// <summary>
    /// 
    /// </summary>
    [ViewModelInfo(
        Contract = "IAccountSiteContract",
        Model = "Member",
        ModelDllInfo = "FKS.Core.Models.Account",
        IdType = "long",
        Positive = "Members",
        Destribute = "操作员")]
    public class MemberView : ViewModelBase
    {
        /// <summary>
        /// 用户ID
        /// </summary>
        [ScaffoldColumn(false)]
        [ViewModel(CanAdd = false, CanEdit = false)]
        public long Id { get; set; }
        /// <summary>
        /// 用户名
        /// </summary>
        [Required, StringLength(20), Display(Name = "用户名")]
        [ViewModel(CanAdd = true, CanEdit = false)]
        public string UserName { get; set; }
        /// <summary>
        /// 用户昵称
        /// </summary>
        [Required, StringLength(20), Display(Name = "用户昵称")]
        [ViewModel(CanAdd = true, CanEdit = true)]
        public string NickName { get; set; }
        /// <summary>
        /// 用户密码
        /// </summary>
        [Required, StringLength(64), MinLength(6), Display(Name = "密码")]
        [DataType(DataType.Password)]
        [ViewModel(CanAdd = true, CanEdit = false)]
        public string Password { get; set; }
        /// <summary>
        /// 重复密码
        /// </summary>
        [Required, StringLength(64), Display(Name = "重复密码")]
        [Compare("Password", ErrorMessage = "两次密码要相同！")]
        [DataType(DataType.Password)]
        public string PasswordAgain { get; set; }
        /// <summary>
        /// 是否为管理员
        /// </summary>
        [Display(Name = "是否为管理员")]
        [ViewModel(CanAdd = true, CanEdit = true)]
        public bool IsAdmin { get; set; }

        /// <summary>
        /// 日期
        /// </summary>
        public DateTime AddDate { get; set; }
    }
}
