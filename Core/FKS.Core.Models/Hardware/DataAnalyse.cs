using FKS.Component.Tools;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Core.Models.Hardware
{
    /// <summary>
    /// 
    /// </summary>
    [Description("数据分析数据")]
    public class DataAnalyse : EntityBase<int>
    {
        /// <summary>
        /// 
        /// </summary>
        public byte ProbeID { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public DateTime TimeUp { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public DateTime TimeGet { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public byte YouYanND { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public byte YouYanWD { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public byte YouYanSD { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public bool ZTjhq { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public bool ZTfj { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public bool ZTsb { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public byte ZTqd { get; set; }
        /// <summary>
        /// 净化器时间
        /// </summary>
        public Int32? ZTjhqCount { get; set; }
        /// <summary>
        /// 风机时间
        /// </summary>
        public Int32? ZTfjCount { get; set; }
    }
}
