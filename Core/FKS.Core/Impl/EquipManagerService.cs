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
    public class EquipManagerService : CoreServiceBase<EquipManager>, IEquipManagerContract
    {
        #region 受保护的属性

        /// <summary>
        /// 获取或设置 用户信息数据访问对象
        /// </summary>
        [Import]
        protected IEquipManagerRepository EquipManagerRepository { get; set; }

        #endregion

        #region 公共属性

        /// <summary>
        /// 获取 用户信息查询数据集
        /// </summary>
        public IQueryable<EquipManager> EquipManagers
        {
            get { return EquipManagerRepository.Entities; }
        }

        #endregion

        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public override int Add(EquipManager model)
        {
            return EquipManagerRepository.Insert(model);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public override int Edit(EquipManager model)
        {
            return EquipManagerRepository.Update(model);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public override int Del(EquipManager model)
        {
            return EquipManagerRepository.Delete(model);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="Id"></param>
        /// <returns></returns>
        public override EquipManager Detail<T>(T Id)
        {
            return this.EquipManagers.SingleOrDefault(m => m.Id.Equals(Id));
        }
    }
}
