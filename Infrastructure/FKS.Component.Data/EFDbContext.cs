﻿// 源文件头信息：
// <copyright file="EFDbContext.cs">
// Copyright(c)2012-2013 GMFCN.All rights reserved.
// CLR版本：4.0.30319.239
// 开发组织：
// 公司网站：http://www.gmfcn.net
// 所属工程：FKS.Component.Data
// 最后修改：
// 最后修改：2013/06/14 22:57
// </copyright>

using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Data.Common;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;

using FKS.Component.Tools;


namespace FKS.Component.Data
{
    /// <summary>
    ///     EF数据访问上下文
    /// </summary>
    [Export("EF", typeof(DbContext))]
    public class EFDbContext : DbContext
    {
        public EFDbContext()
            : base("default")
        {
        }

        public EFDbContext(string nameOrConnectionString)
            : base(nameOrConnectionString) { }

        public EFDbContext(DbConnection existingConnection)
            : base(existingConnection, true) { }

        [ImportMany(typeof(IEntityMapper))]
        public IEnumerable<IEntityMapper> EntityMappers { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            if (EntityMappers == null)
            {
                return;
            }

            foreach (var mapper in EntityMappers)
            {
                mapper.RegistTo(modelBuilder, modelBuilder.Configurations);
            }
        }
    }
}