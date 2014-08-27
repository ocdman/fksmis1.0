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
            /*
            List<Member> members = new List<Member>
            {
                new Member { 
                    UserName = "admin", 
                    Password = "123456",
                    NickName = "管理员", 
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

            for (int i = 0; i < 100; i++)
            {
                Random rnd = new Random((int)DateTime.Now.Ticks + i);
                Member member = new Member
                {
                    UserName = "userName" + i,
                    Password = "123456",
                    NickName = "用户" + i,
                    IsAdmin = false
                };

                members.Add(member);
            }
            DbSet<Member> memberSet = context.Set<Member>();
            memberSet.AddOrUpdate(m => new { m.UserName }, members.ToArray());


            List<Equipment> equipments = new List<Equipment>();


            for (int i = 1; i <= 100; i++)
            {
                Random rnd = new Random((int)DateTime.Now.Ticks + i);
                Equipment member = new Equipment
                {
                    //YHDZ = "上海松江",
                    //YHHY = "01",
                    //YHMC = "硬件设备" + i.ToString(),
                    //YHQY = i.ToString("d5"),
                    //YHQY1 = "1" + i.ToString("d4"),
                    //YHQY2 = "2" + i.ToString("d4"),

                    Address = "上海松江",
                    EquipCode = "201407" + i.ToString("d4"),
                    CollectionCode = "fjb02016" + i.ToString("d4"),
                    //EquipCode = "硬件设备" + i.ToString(),
                    EquipCount = 1,
                    Interval = 60,
                    NickName = "硬件设备" + i.ToString(),
                    PositionInfo = 1,
                    PropertyInfo = 1,
                    Status = 1,
                    TimeOut = 2,
                    YHX = 116.983194,
                    YHY = 36.693155,
                    ZTfj = false,
                    ZTjhq = false,
                    ZTst = false,
                    YouYanND = 10,
                    YouYanSD = 20,
                    YouYanWD = 30,
                    //LastTimeGet = DateTime.Now,
                    //Id = "fjb02016" + i.ToString("d4")
                };

                equipments.Add(member);
            }
            DbSet<Equipment> EquipmentSet = context.Set<Equipment>();
            EquipmentSet.AddOrUpdate(m => new { m.CollectionCode }, equipments.ToArray());

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
             
            context.SaveChanges();
             */
        }
    }
}
