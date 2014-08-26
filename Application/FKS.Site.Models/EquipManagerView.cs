using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Site.Models
{
    public class EquipManagerView
    {
        [Required, StringLength(12)]
        [Display(Name="采集器ID")]
        public string CollectionCode { get; set; }

        public string NickName { get; set; }

        public int DetectorCount { get; set; }

        [Display(Name="上传间隔")]
        public int UploadInterval { get; set; }

        [StringLength(4)]
        [Display(Name="探测器编号1")]
        public string DetectorNum1 { get; set; }

        [StringLength(4)]
        [Display(Name="探测器ID1")]
        public string DetectorID1 { get; set; }

        [StringLength(4)]
        [Display(Name = "探测器编号2")]
        public string DetectorNum2 { get; set; }

        [StringLength(4)]
        [Display(Name = "探测器ID2")]
        public string DetectorID2 { get; set; }

        [Display(Name="湿度标定")]
        public float Humidity { get; set; }

        [Display(Name="温度标定")]
        public float Temperature { get; set; }

        [Display(Name="浓度标定")]
        public float Concentration { get; set; }

        [Display(Name="结果")]
        public int Result { get; set; }

        public string Reserved1 { get; set; }

        public string Reserved2 { get; set; }

        public string Reserved3 { get; set; }

        public string Reserved4 { get; set; }
    }
}
