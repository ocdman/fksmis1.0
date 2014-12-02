using FKS.Core.Models.Account;
using FKS.Core.Models.Hardware;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;

namespace FKS.Core.Data.Migrations
{
    internal sealed class Configuration : DbMigrationsConfiguration<FKS.Component.Data.EFDbContext>
    {
        public Configuration()
        {
             AutomaticMigrationsEnabled = true;
             AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(FKS.Component.Data.EFDbContext context)
        {
            
            List<Member> members = new List<Member>
            {
                new Member { 
                    UserName = "admin", 
                    Password = "123456",
                    NickName = "π‹¿Ì‘±", 
                    IsDeleted=false ,
                    IsAdmin = true
                },
                new Member { 
                    UserName = "gmfcn", 
                    Password = "123456", 
                    NickName = "NCCN", 
                    IsDeleted=false ,
                    IsAdmin = true
                }
            };

            DbSet<Member> memberSet = context.Set<Member>();
            memberSet.AddOrUpdate(m => new { m.UserName }, members.ToArray());


            FKS.Core.Models.Parameters.ParameterSet parameter = new Models.Parameters.ParameterSet 
            {
                Id = 1,
                MaintenanceBound = 3,
                ConcentrateBound = 1,
                PurifierBound = 80,
                DayDischargeBound = 50,
                ShowNumbers = 10
            };
            DbSet<FKS.Core.Models.Parameters.ParameterSet> parameterSet = context.Set<FKS.Core.Models.Parameters.ParameterSet>();
            parameterSet.AddOrUpdate(m => new { m.Id }, parameter);
             
            FKS.Core.Models.Authority.Authority authority = new Models.Authority.Authority
            {
                Id = 1,
                HasAuthority = true
            };
            DbSet<FKS.Core.Models.Authority.Authority> authoritySet = context.Set<FKS.Core.Models.Authority.Authority>();
            authoritySet.AddOrUpdate(m => new { m.Id }, authority);
            
            context.SaveChanges();
        }
    }
}
