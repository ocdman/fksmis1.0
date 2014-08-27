using FKS.Core.Models.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Core
{
    public interface IParameterSetContract : IContract<ParameterSet>
    {
        IQueryable<ParameterSet> ParameterSets { get; }
    }
}
