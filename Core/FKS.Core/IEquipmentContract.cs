using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FKS.Core.Models.Hardware;

namespace FKS.Core
{
    public interface IEquipmentContract : IContract<Equipment>
    {
        #region 属性

        /// <summary>
        /// 获取 用户信息查询数据集
        /// </summary>
        IQueryable<Equipment> Equipments { get; }

        #endregion
    }
}
