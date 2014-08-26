using System;
using System.Collections.Generic;
using System.Collections;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;
using System.IO;
using System.Text;

namespace FKS.Component.Tools
{
    /// <summary>
    /// json参数处理类
    /// </summary>
    public class DataGridView <T>
    {
        /// <summary>
        /// 总行数
        /// </summary>
        public int total { get; set; }
        /// <summary>
        /// 总行
        /// </summary>
        public IList<T> trows { get; set; }
        /// <summary>
        /// 返回行
        /// </summary>
        public IList<T> rows { get; set; }
        /// <summary>
        /// Footer
        /// </summary>
        public IList<T> footer { get; set; }
    }
}