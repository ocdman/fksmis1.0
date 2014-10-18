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
        [Display(Name="发送时间")]
        public string SendTime { get; set; }
    }
}
