using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FKS.Core.Data.Repositories.Hardware;
using FKS.Core.Models.Hardware;

namespace FKS.Core.Impl
{
    [Export]
    public class EquipmentService : CoreServiceBase<Equipment>, IEquipmentContract
    {
        #region 受保护的属性

        /// <summary>
        /// 获取或设置 用户信息数据访问对象
        /// </summary>
        [Import]
        protected IEquipmentRepository EquipmentRepository { get; set; }

        #endregion

        #region 公共属性

        /// <summary>
        /// 获取 用户信息查询数据集
        /// </summary>
        public IQueryable<Equipment> Equipments
        {
            get { return EquipmentRepository.Entities; }
        }

        #endregion

        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public override int Add(Equipment model)
        {
            return EquipmentRepository.Insert(model);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public override int Edit(Equipment model)
        {
            return EquipmentRepository.Update(model);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public override int Del(Equipment model)
        {
            return EquipmentRepository.Delete(model);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="Id"></param>
        /// <returns></returns>
        public override Equipment Detail<T>(T Id)
        {
            return this.Equipments.SingleOrDefault(m => m.Id.Equals(Id));
        }
    }
}
