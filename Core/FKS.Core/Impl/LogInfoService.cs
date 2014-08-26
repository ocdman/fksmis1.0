using FKS.Core.Data.Repositories.logger;
using FKS.Core.Models.logger;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Core.Impl
{
    public class LogInfoService : CoreServiceBase<LogInfo>, ILogInfoContract
    {
        #region 受保护的属性

        /// <summary>
        /// 获取或设置 用户信息数据访问对象
        /// </summary>
        [Import]
        protected ILogInfoRepository LogInfoRepository { get; set; }

        #endregion

        #region 公共属性

        /// <summary>
        /// 获取 用户信息查询数据集
        /// </summary>
        public IQueryable<LogInfo> LogInfos
        {
            get { return LogInfoRepository.Entities; }
        }

        #endregion

        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public override int Add(LogInfo model)
        {
            return LogInfoRepository.Insert(model);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public override int Edit(LogInfo model)
        {
            return LogInfoRepository.Update(model);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public override int Del(LogInfo model)
        {
            return LogInfoRepository.Delete(model);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="Id"></param>
        /// <returns></returns>
        public override LogInfo Detail<T>(T Id)
        {
            return this.LogInfos.SingleOrDefault(m => m.Id.Equals(Id));
        }
    }
}
