using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FKS.Component.Tools;

namespace FKS.Core
{
    public interface IContract<IModel>
        where IModel : class
    {
        int Add(IModel model);
        int Edit(IModel model);
        int Del(IModel model);
    }
}
