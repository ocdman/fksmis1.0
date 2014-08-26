using FKS.Core.Models.logger;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Core
{
    public interface ILogInfoContract : IContract<LogInfo>
    {
        IQueryable<LogInfo> LogInfos { get; }
    }
}
