using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FKS.Component.Tools;
using System.ComponentModel.DataAnnotations.Schema;

namespace FKS.Core.Models.Hardware
{
    /// <summary>
    /// 用户信息
    /// </summary>
    [Description("用户信息")]
    public class Equipment : EntityBase<int>
    {
        ///// <summary>
        ///// 用户名称
        ///// </summary>
        //[Required, StringLength(256)]
        //public string YHMC { get; set; }
        ///// <summary>
        ///// 用户地址
        ///// </summary>
        //[Required, StringLength(256)]
        //public string YHDZ { get; set; }
        ///// <summary>
        ///// 用户坐标X
        ///// </summary>
        //[Required]
        //public double YHX { get; set; }
        ///// <summary>
        ///// 用户坐标Y
        ///// </summary>
        //[Required]
        //public double YHY { get; set; }
        ///// <summary>
        ///// 用户区域编码
        ///// </summary>
        //[Required, StringLength(6)]
        //public string YHQY { get; set; }
        ///// <summary>
        ///// 用户区域编码
        ///// </summary>
        //[Required, StringLength(6)]
        //public string YHQY1 { get; set; }
        ///// <summary>
        ///// 用户区域编码
        ///// </summary>
        //[Required, StringLength(6)]
        //public string YHQY2 { get; set; }
        ///// <summary>
        ///// 用户行业编码
        ///// </summary>
        //[Required, StringLength(4)]
        //public string YHHY { get; set; }


        /// <summary>
        /// 设备编码
        /// </summary>
        [StringLength(12)]
        public string EquipCode { get; set; }
        /// <summary>
        /// 采集器ID
        /// </summary>
        [Required, StringLength(12)]
        public string CollectionCode { get; set; }
        /// <summary>
        /// 属性信息
        /// </summary>
        [Required]
        public int PropertyInfo { get; set; }
        /// <summary>
        /// 位置信息
        /// </summary>
        [Required]
        public int PositionInfo { get; set; }
        /// <summary>
        /// 用户名称
        /// </summary>
        [Required, StringLength(128)]
        public string NickName { get; set; }
        /// <summary>
        /// 安装地址
        /// </summary>
        [Required, StringLength(128)]
        public string Address { get; set; }
        /// <summary>
        /// 探测器数量
        /// </summary>
        [Required]
        public int EquipCount { get; set; }
        /// <summary>
        /// 超时时间
        /// </summary>
        [Required]
        [DefaultValue(60)]
        public int TimeOut { get; set; }
        /// <summary>
        /// 启用时间
        /// </summary>
        //public long OpenTime { get; set; }
        public DateTime? OpenTime { get; set; }
        /// <summary>
        /// 采集间隔
        /// </summary>
        [Required]
        public int Interval { get; set; }
        /// <summary>
        /// 用户坐标X
        /// </summary>
        [Required]
        public double YHX { get; set; }
        /// <summary>
        /// 用户坐标Y
        /// </summary>
        [Required]
        public double YHY { get; set; }
        private int _status = 1;
        /// <summary>
        /// 工作状态
        /// </summary>
        [Required]
        public int Status
        {
            get
            {
                return _status;
            }
            set
            {
                if (value != _status)
                {
                    _status = value;
                    if (value == 1)
                    {
                        //this.OpenTime = PublicHelper.GetUnixTime(DateTime.Now);
                        this.OpenTime = DateTime.Now;
                    }
                }
            }
        }
        [Required]
        public double FanAirFlow { get; set; }
        [Required]
        public double FanPower { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        [StringLength(128)]
        public string Content { get; set; }
        /// <summary>
        /// 净化器状态
        /// </summary>
        public bool ZTjhq { get; set; }
        /// <summary>
        /// 风机状态
        /// </summary>
        public bool ZTfj { get; set; }
        /// <summary>
        /// 系统状态(探测器)
        /// </summary>
        public bool ZTst { get; set; }
        /// <summary>
        /// 油烟浓度
        /// </summary>
        public int? YouYanND { get; set; }
        /// <summary>
        /// 温度
        /// </summary>
        public int? YouYanWD { get; set; }
        /// <summary>
        /// 湿度
        /// </summary>
        public int? YouYanSD { get; set; }

        public long LastTimeGet { get; set; }

        /// <summary>
        /// 清洗时间
        /// </summary>
        public DateTime? CleanTime { get; set; }

        [Required]
        [StringLength(20)]
        /// <summary>
        /// 操作员用户名
        /// </summary>
        public string UserName { get; set; }

        [StringLength(20)]
        /// <summary>
        /// 联系人
        /// </summary>
        public string Contacts { get; set; }

        [StringLength(20)]
        /// <summary>
        /// 联系方式
        /// </summary>
        public string ContactInfo { get; set; }

        /// <summary>
        /// 净化器风量
        /// </summary>
        public double? PurifierAirFlow { get; set; }

        /// <summary>
        /// 信号强度
        /// </summary>
        public int ZTqd { get; set; }

        /// <summary>
        /// 连接状态
        /// </summary>
        public bool OnOff { get; set; }

        // 合同编号
        public string ContractNo { get; set; }

        // 合同起始日期
        public DateTime? ContractStartTime { get; set; }

        /// <summary>
        /// 安装人
        /// </summary>
        public string Installer { get; set; }

        private int _fantype = 1;
        /// <summary>
        /// 风机类型
        /// </summary>
        [Required]
        public int FanType 
        {
            get { return _fantype; }
            set { _fantype = value; }
        }
        /// <summary>
        /// 管辖
        /// </summary>
        public int Jurisdiction { get; set; }
    }
}
