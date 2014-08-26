using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Site.Models
{
    public class LogInfoView
    {
        [Required, StringLength(16)]
        [Display(Name = "操作人员")]
        public string Operator { get; set; }

        [Required, StringLength(16)]
        [Display(Name = "IP地址")]
        public string IpAddress { get; set; }

        public int LogTypeNum { get; set; }

        public int ResultTypeNum { get; set; }

        public string Message { get; set; }

        public DateTime AddDate { get; set; }
    }
}
