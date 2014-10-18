using FKS.Core.Models.Message;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Core
{
    public interface IMessageSetContract : IContract<MessageSet>
    {
        IQueryable<MessageSet> MessageSets { get; }
    }
}
