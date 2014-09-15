using FKS.Core.Models.Authority;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Core
{
    public interface IAuthorityContract : IContract<Authority>
    {
        IQueryable<Authority> Authorities { get; }
    }
}
