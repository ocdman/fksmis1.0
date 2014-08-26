using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FKS.Component.Tools;

namespace FKS.Core.Data.Configurations
{
    /// <summary>
    /// Parameters object for the 'testone' stored procedure
    /// </summary>
    public class RealDataParam
    {
        // Override the parameter name. The parameter name is "in", but that's
        // not a valid property name in C#, so we must name the property
        // something else and provide an override to set the parameter name.
        [StoredProcAttributes.Name("table_name")]
        [StoredProcAttributes.ParameterType(System.Data.SqlDbType.VarChar)]
        public String TableName { get; set; }

        // Override the parameter name. The parameter name is "in", but that's
        // not a valid property name in C#, so we must name the property
        // something else and provide an override to set the parameter name.
        [StoredProcAttributes.Name("datetime")]
        [StoredProcAttributes.ParameterType(System.Data.SqlDbType.DateTime)]
        public String TimeUp { get; set; }

        // Override the parameter name. The parameter name is "in", but that's
        // not a valid property name in C#, so we must name the property
        // something else and provide an override to set the parameter name.
        [StoredProcAttributes.Name("maxCount")]
        [StoredProcAttributes.ParameterType(System.Data.SqlDbType.Int)]
        public String MaxCount { get; set; }
        
    }
    /// <summary>
    /// 
    /// </summary>
    public class RealDataResult
    {
        /// <summary>
        /// 
        /// </summary>
        [StoredProcAttributes.Name("Probeid")]
        public int ProbeID { get; set; }
        /// <summary>
        /// 
        /// </summary>
        [StoredProcAttributes.Name("TimeUp")]
        public DateTime TimeUp { get; set; }
        /// <summary>
        /// 
        /// </summary>
        [StoredProcAttributes.Name("TimeGet")]
        public DateTime TimeGet { get; set; }
        /// <summary>
        /// 
        /// </summary>
        [StoredProcAttributes.Name("YouYanND")]
        public Int16 YouYanND { get; set; }
        /// <summary>
        /// 
        /// </summary>
        [StoredProcAttributes.Name("YouYanWD")]
        public Int16 YouYanWD { get; set; }
        /// <summary>
        /// 
        /// </summary>
        [StoredProcAttributes.Name("YouYanSD")]
        public Int16 YouYanSD { get; set; }
        /// <summary>
        /// 
        /// </summary>
        [StoredProcAttributes.Name("ZTjhq")]
        public bool ZTjhq { get; set; }
        /// <summary>
        /// 
        /// </summary>
        [StoredProcAttributes.Name("ZTfj")]
        public bool ZTfj { get; set; }
        /// <summary>
        /// 
        /// </summary>
        [StoredProcAttributes.Name("ZTsb")]
        public bool ZTsb { get; set; }
        /// <summary>
        /// 
        /// </summary>
        [StoredProcAttributes.Name("ZTqd")]
        public Int16 ZTqd { get; set; }
    }
}
