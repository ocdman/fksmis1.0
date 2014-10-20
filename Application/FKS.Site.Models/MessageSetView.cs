using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Site.Models
{
    public class MessageSetView
    {
        [Required]
        [Display(Name="手机号")]
        public string PhoneNumber { get; set; }

        [Required]
        [RegularExpression(@"^(2[0-3]|1[0-9]{1}|0[0-9]{1}):[0-5]{1}[0-9]{1}$", ErrorMessage = "无效的时间格式")]
        [Display(Name="发送时间")]
        public string SendTime { get; set; }
    }
}
