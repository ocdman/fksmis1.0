using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;
using System.IO;
using System.Runtime;
using System.IO.Ports;
using System.Text;
using System.Security;

namespace FKS.Component.Tools
{
    [Serializable]
    public class KeyValue
    {
        public string Key { get; set; }
        public string Value { get; set; }
    }

    /// <summary>
    /// 分页信息等
    /// </summary>
    [Serializable]
    public class Pagination
    {
        /// <summary>
        /// 每页的行数
        /// </summary>
        public int rows { get; set; }
        /// <summary>
        /// 当前页数
        /// </summary>
        public int page { get; set; }
        /// <summary>
        /// 排序
        /// </summary>
        public string sort { get; set; }
        /// <summary>
        /// 排序
        /// </summary>
        public string order { get; set; }
        /// <summary>
        /// 查询条件
        /// </summary>
        public string filter { get; set; }
        /// <summary>
        /// 查询条件model
        /// </summary>
        public object[] Params { get; set; }
        /// <summary>
        /// 是否需要分页
        /// </summary>
        public bool isPagination { get; set; }
        /// <summary>
        /// 是否需要搜索
        /// </summary>
        public bool isSearch { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public List<KeyValue> KeyValues { get; set; }
        /// <summary>
        /// 构造
        /// </summary>
        public Pagination()
        {
            this.isPagination = true;
            this.isSearch = false;
            this.rows = 10;
            this.page = 1;
            this.filter = string.Empty;
            this.sort = this.order = string.Empty;
            this.KeyValues = new List<KeyValue>();
        }
    }
}
