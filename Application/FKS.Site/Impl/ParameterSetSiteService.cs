using FKS.Core.Impl;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Site.Impl
{
    [Export(typeof(IParameterSetSiteContract))]
    internal class ParameterSetSiteService : ParameterSetService, IParameterSetSiteContract
    {
    }
}
