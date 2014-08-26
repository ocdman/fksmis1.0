using FKS.Component.Tools;
using FKS.Core;
using FKS.Site.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Site
{
    /// <summary>
    ///     账户模块站点业务契约
    /// </summary>
    public interface IAccountSiteContract : IAccountContract
    {
        /// <summary>
        ///     用户登录
        /// </summary>
        /// <param name="model">登录模型信息</param>
        /// <returns>业务操作结果</returns>
        OperationResult Login(LoginModel model);
        /// <summary>
        ///     用户退出
        /// </summary>
        void Logout();
    }
}
