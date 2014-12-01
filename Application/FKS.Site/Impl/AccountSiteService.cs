using FKS.Component.Tools;
using FKS.Core.Impl;
using FKS.Core.Models.Account;
using FKS.Site.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Security;

namespace FKS.Site.Impl
{
    /// <summary>
    ///     账户模块站点业务实现
    /// </summary>
    [Export(typeof(IAccountSiteContract))]
    internal class AccountSiteService : AccountService, IAccountSiteContract
    {
        /// <summary>
        ///     用户登录
        /// </summary>
        /// <param name="model">登录模型信息</param>
        /// <returns>业务操作结果</returns>
        public OperationResult Login(LoginModel model)
        {
            PublicHelper.CheckArgument(model, "model");
            LoginInfo loginInfo = new LoginInfo
            {
                Account = model.Account,
                Password = model.Password,
                IpAddress = HttpContext.Current.Request.UserHostAddress
            };
            OperationResult result = base.Login(loginInfo);
            if (result.ResultType == OperationResultType.Success)
            {
                Member member = (Member)result.AppendData;
                DateTime expiration = model.IsRememberLogin
                    ? DateTime.Now.AddDays(7)
                    : DateTime.Now.Add(FormsAuthentication.Timeout);
                FormsAuthenticationTicket ticket = new FormsAuthenticationTicket(1, member.UserName, DateTime.Now, expiration,
                    true, member.IsAdmin ? member.NickName : "操作员", FormsAuthentication.FormsCookiePath);
                HttpCookie cookie = new HttpCookie(FormsAuthentication.FormsCookieName, FormsAuthentication.Encrypt(ticket));
                if (model.IsRememberLogin)
                {
                    cookie.Expires = DateTime.Now.AddDays(7);
                }
                HttpContext.Current.Response.Cookies.Set(cookie);
                result.AppendData = null;
            }
            return result;
        }
        /// <summary>
        ///     用户退出
        /// </summary>
        public void Logout()
        {
            FormsAuthentication.SignOut();
        }
    }
}
