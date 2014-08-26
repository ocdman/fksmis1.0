using FKS.Component.Tools;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Core.Models.Hardware
{
    [Description("设备管理")]
    public class EquipManager : EntityBase<int>
    {
        [Required, StringLength(12)]
        public string CollectionCode { get; set; }

        public int DetectorCount { get; set; }

        public int UploadInterval { get; set; }

        [StringLength(4)]
        public string DetectorNum1 { get; set; }

        [StringLength(4)]
        public string DetectorID1 { get; set; }

        [StringLength(4)]
        public string DetectorNum2 { get; set; }

        [StringLength(4)]
        public string DetectorID2 { get; set; }

        public float Humidity { get; set; }

        public float Temperature { get; set; }

        public float Concentration { get; set; }

        public int Result { get; set; }

        public string Reserved1 { get; set; }

        public string Reserved2 { get; set; }

        public string Reserved3 { get; set; }

        public string Reserved4 { get; set; }
    }
}
