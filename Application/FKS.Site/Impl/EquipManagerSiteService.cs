﻿using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FKS.Core.Impl;

namespace FKS.Site.Impl
{
    [Export(typeof(IEquipManagerSiteContract))]
    internal class EquipManagerSiteService : EquipManagerService, IEquipManagerSiteContract
    {
    }
}
