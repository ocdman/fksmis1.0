﻿// <auto-generated>
//     此代码由工具生成。
//     对此文件的更改可能会导致不正确的行为，并且如果
//     重新生成代码，这些更改将会丢失。
//	   如存在本生成代码外的新需求，请在相同命名空间下创建同名分部类进行实现。
// </auto-generated>


using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CoolCode.Linq;
using FKS.Component.Tools;
using FKS.Site.Models;
using FKS.Site.Helper.Attributes;
using FKS.Site.Web.Controllers.BaseControllers;
using FKS.Core.Models.Account;
using FKS.Site.Helper.Logging;

namespace FKS.Site.Web.Controllers.Controllers
{
    partial class MemberViewController
    {
        partial void SetQueryBuilder(Pagination pagination)
        {
            IQueryBuilder<Member> queryBuilder = QueryBuilder.Create<Member>();

            if (pagination.KeyValues != null)
            {
                foreach (KeyValue kv in pagination.KeyValues)
                {
                    if (kv.Key.Equals("UserName"))
                    {
                        queryBuilder.Like(s => s.UserName, kv.Value);
                    }
                }
            }
            this.ViewQueryBuilder = queryBuilder;
        }
        partial void DoCheckExist(Member model, OperationResult res)
        {
            var mem = this.SiteContract.Members.SingleOrDefault(m => m.UserName.Equals(model.UserName));

            if (mem != null && !string.IsNullOrEmpty(mem.UserName))
            {
                res.ResultType = OperationResultType.Error;
                res.Message = string.Format(@"操作失败，已存在用户名ID为：{0}的用户！", mem.UserName);
            }

            this.IsExist = false;
        }
    }
}



