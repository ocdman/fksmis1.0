using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Component.Tools
{
    /// <summary>
    /// 
    /// </summary>
    public class ViewModelAttribute : Attribute
    {
        public bool CanAdd { get; set; }
        public bool CanEdit { get; set; }

        public bool CanShow { get; set; }

        public ViewModelAttribute()
        {
            this.CanShow = true;
        }
    }

    public class ViewModelInfoAttribute : Attribute
    {
        public string Contract { get; set; }
        public string ModelDllInfo { get; set; }

        public string Model { get; set; }
        public string Positive { get; set; }
        public string IdType { get; set; }

        public string Destribute { get; set; }
    }
}
