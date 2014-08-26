using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FKS.Component.Tools;
using FKS.Core.Data.Repositories.Account;
using FKS.Core.Models.Account;

namespace FKS.Core.Impl
{
    public class AccountService : CoreServiceBase<Member>, IAccountContract
    {
        #region 受保护的属性

        /// <summary>
        /// 获取或设置 用户信息数据访问对象
        /// </summary>
        [Import]
        protected IMemberRepository MemberRepository { get; set; }

        /// <summary>
        /// 获取或设置 用户扩展信息数据访问对象
        /// </summary>
        [Import]
        protected IMemberExtendRepository MemberExtendRepository { get; set; }

        #endregion

        #region 公共属性

        /// <summary>
        /// 获取 用户信息查询数据集
        /// </summary>
        public IQueryable<Member> Members
        {
            get { return MemberRepository.Entities; }
        }

        /// <summary>
        /// 获取 用户扩展信息查询数据集
        /// </summary>
        public IQueryable<MemberExtend> MemberExtends
        {
            get { return MemberExtendRepository.Entities; }
        }

        #endregion

        /// <summary>
        /// 用户登录
        /// </summary>
        /// <param name="loginInfo">登录信息</param>
        /// <returns>业务操作结果</returns>
        public virtual OperationResult Login(LoginInfo loginInfo)
        {
            PublicHelper.CheckArgument(loginInfo, "loginInfo");
            Member member = MemberRepository.Entities.SingleOrDefault(m => m.UserName == loginInfo.Account);
            if (member == null)
            {
                return new OperationResult(OperationResultType.QueryNull, "指定账号的用户不存在。");
            }
            if (member.Password != loginInfo.Password)
            {
                return new OperationResult(OperationResultType.Warning, "登录密码不正确。");
            }
           
            return new OperationResult(OperationResultType.Success, "登录成功。", member);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public override int Add(Member model)
        {
            return MemberRepository.Insert(model);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public override int Edit(Member model)
        {
            return MemberRepository.Update(model);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public override int Del(Member model)
        {
            return MemberRepository.Delete(model);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="Id"></param>
        /// <returns></returns>
        public override Member Detail<T>(T Id)
        {
            return this.Members.SingleOrDefault(m => m.Id.Equals(Id));
        }
    }
}
