﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;


namespace FKS.Component.Data
{
    /// <summary>
    ///     业务单元操作接口
    /// </summary>
    public interface IUnitOfWork
    {
        #region 属性

        /// <summary>
        ///     获取 当前单元操作是否已被提交
        /// </summary>
        bool IsCommitted { get; }
        DbContext DbContext { get; }

        #endregion

        #region 方法

        /// <summary>
        ///     提交当前单元操作的结果
        /// </summary>
        /// <param name="validateOnSaveEnabled">保存时是否自动验证跟踪实体</param>
        /// <returns></returns>
        int Commit(bool validateOnSaveEnabled = true);

        /// <summary>
        ///     把当前单元操作回滚成未提交状态
        /// </summary>
        void Rollback();

        #endregion
    }
}