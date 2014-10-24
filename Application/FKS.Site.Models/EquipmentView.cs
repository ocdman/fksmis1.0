using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FKS.Component.Tools;

namespace FKS.Site.Models
{
    /// <summary>
    /// 
    /// </summary>
    [ViewModelInfo(
        Contract = "IEquipmentSiteContract",
        Model = "Equipment",
        ModelDllInfo = "FKS.Core.Models.Hardware",
        IdType = "int",
        Positive = "Equipments",
        Destribute = "用户")]
    public class EquipmentView : ViewModelBase
    {
        /// <summary>
        /// 设备编码
        /// </summary>
        [StringLength(12)]
        [Display(Name = "设备编码")]
        public string EquipCode { get; set; }

        /// <summary>
        /// 采集器ID
        /// </summary>
        [Required, StringLength(12)]
        [Display(Name = "采集器ID")]
        [ViewModel(CanAdd = true, CanEdit = false)]
        public string CollectionCode { get; set; }
        /// <summary>
        /// 属性信息
        /// </summary>
        [Required]
        [Display(Name = "属性信息")]
        [ViewModel(CanAdd = true, CanEdit = true)]
        public int PropertyInfo { get; set; }
        /// <summary>
        /// 位置信息
        /// </summary>
        [Required]
        [Display(Name = "位置信息")]
        [ViewModel(CanAdd = true, CanEdit = true)]
        public int PositionInfo { get; set; }
        /// <summary>
        /// 用户名称
        /// </summary>
        [Required, StringLength(128)]
        [Display(Name = "用户名称")]
        [ViewModel(CanAdd = true, CanEdit = true)]
        public string NickName { get; set; }
        /// <summary>
        /// 安装地址
        /// </summary>
        [Required, StringLength(128)]
        [Display(Name = "安装地址")]
        [ViewModel(CanAdd = true, CanEdit = true)]
        public string Address { get; set; }
        /// <summary>
        /// 探测器数量
        /// </summary>
        [Required]
        [Display(Name = "探测器数量")]
        [ViewModel(CanAdd = true, CanEdit = true)]
        public int EquipCount { get; set; }
        /// <summary>
        /// 超时时间
        /// </summary>
        [Required]
        [Display(Name = "超时时间")]
        [ViewModel(CanAdd = true, CanEdit = true)]
        public int TimeOut { get; set; }
        /// <summary>
        /// 采集间隔
        /// </summary>
        [Required]
        [Display(Name = "采集间隔(s)")]
        [ViewModel(CanAdd = true, CanEdit = true)]
        public int Interval { get; set; }
        /// <summary>
        /// 用户坐标X
        /// </summary>
        [Required]
        [Display(Name = "用户坐标X")]
        [ViewModel(CanAdd = true, CanEdit = true)]
        public double YHX { get; set; }
        /// <summary>
        /// 用户坐标Y
        /// </summary>
        [Required]
        [Display(Name = "用户坐标Y")]
        [ViewModel(CanAdd = true, CanEdit = true)]
        public double YHY { get; set; }
        /// <summary>
        /// 工作状态
        /// </summary>
        [Required]
        [Display(Name = "工作状态")]
        [ViewModel(CanAdd = true, CanEdit = true)]
        public int Status { get; set; }
        /// <summary>
        /// 风机风量
        /// </summary>
        [Required]
        [Display(Name = "风机风量(l/h)")]
        [ViewModel(CanAdd = true, CanEdit = true)]
        public double FanAirFlow { get; set; }
        /// <summary>
        /// 风机功率
        /// </summary>
        [Required]
        [Display(Name = "风机功率(kw)")]
        [ViewModel(CanAdd = true, CanEdit = true)]
        public double FanPower { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        [Display(Name = "备注")]
        [ViewModel(CanAdd = true, CanEdit = true)]
        public string Content { get; set; }
        /// <summary>
        /// 净化器状态
        /// </summary>
        [ViewModel(CanAdd = false, CanEdit = false)]
        public bool ZTjhq { get; set; }
        /// <summary>
        /// 风机状态
        /// </summary>
        [ViewModel(CanAdd = false, CanEdit = false)]
        public bool ZTfj { get; set; }
        /// <summary>
        /// 系统状态(探测器)
        /// </summary>
        [ViewModel(CanAdd = false, CanEdit = false)]
        public bool ZTst { get; set; }
        /// <summary>
        /// 油烟浓度
        /// </summary>
        [ViewModel(CanAdd = false, CanEdit = false)]
        public int YouYanND { get; set; }
        /// <summary>
        /// 温度
        /// </summary>
        [ViewModel(CanAdd = false, CanEdit = false)]
        public int YouYanWD { get; set; }
        /// <summary>
        /// 湿度
        /// </summary>
        [ViewModel(CanAdd = false, CanEdit = false)]
        public int YouYanSD { get; set; }
        /// <summary>
        /// 地图搜索地址
        /// </summary>
        [ViewModel(CanAdd = false, CanEdit = false, CanShow = false)]
        public string MapAddress { get; set; }
        [ViewModel(CanShow = true)]
        public long LastTimeGet { get; set; }

        /// <summary>
        /// 启用时间
        /// </summary>
        public DateTime? OpenTime { get; set; }

        [ViewModel(CanAdd = false, CanEdit = false, CanShow = false)]
        public bool IsTimeOut
        {
            get
            {
                var date = PublicHelper.GetNoralTime(this.LastTimeGet.ToString());

                return date.AddMinutes(this.TimeOut) < DateTime.Now;
            }
        }

        public DateTime? CleanTime { get; set; }

        /// <summary>
        /// 操作员用户名
        /// </summary>
        [Required, StringLength(20)]
        [Display(Name = "操作员用户名")]
        [ViewModel(CanAdd = true, CanEdit = true)]
        public string UserName { get; set; }

        [Required, StringLength(20)]
        [Display(Name = "联系人")]
        [ViewModel(CanAdd = true, CanEdit = true)]
        public string Contacts { get; set; }

        [Required, StringLength(20)]
        [Display(Name = "联系方式")]
        [ViewModel(CanAdd = true, CanEdit = true)]
        public string ContactInfo { get; set; }

        [Display(Name = "净化器功率(l/h)")]
        [ViewModel(CanAdd = true, CanEdit = true)]
        public double? PurifierAirFlow { get; set; }

        // add by wbgong at 2014-9-24 start
        public DateTime? NextCleanTime { get; set; }

        [Display(Name = "合同编号")]
        public string ContractNo { get; set; }

        [Display(Name = "合同起始日期")]
        public DateTime? ContractStartTime { get; set; }

        [Display(Name="安装人")]
        public string Installer { get; set; }


    }
}
