// 源文件头信息：
// <copyright file="Entity.cs">

// CLR版本：4.0.30319.239
// 开发组织：

// 所属工程：FKS.Component.Tools
// 最后修改：
// 最后修改：2013/05/14 23:04
// </copyright>

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;


namespace FKS.Component.Tools
{
    /// <summary>
    ///     可持久到数据库的领域模型的基类。
    /// </summary>
    [Serializable]
    public abstract class EntityBase<TKey>
    {
        #region 构造函数

        /// <summary>
        ///     数据实体基类
        /// </summary>
        protected EntityBase()
        {
            IsDeleted = false;
            AddDate = DateTime.Now;
        }

        #endregion

        #region 属性

        [Key]
        public TKey Id { get; set; }

        /// <summary>
        ///     获取或设置 获取或设置是否禁用，逻辑上的删除，非物理删除
        /// </summary>
        public bool IsDeleted { get; set; }

        /// <summary>
        ///     获取或设置 添加时间
        /// </summary>
        [DataType(DataType.DateTime)]
        public DateTime AddDate { get; set; }

        #endregion
    }
}