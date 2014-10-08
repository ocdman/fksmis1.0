﻿using FKS.Component.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Core.Models.Report
{
    public class AlarmTimeReport : EntityBase<int>
    {
        public float AlarmTime { get; set; }

        public string NickName { get; set; }

        public string Address { get; set; }

        public string Contacts { get; set; }

        public string ContactInfo { get; set; }
    }
}
