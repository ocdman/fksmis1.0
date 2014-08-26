﻿// 源文件头信息：
// <copyright file="ComponentException.cs">

// CLR版本：4.0.30319.239
// 开发组织：

// 所属工程：FKS.Component.Tools
// 最后修改：
// 最后修改：2013/05/14 23:04
// </copyright>

using System;
using System.Runtime.Serialization;


namespace FKS.Component.Tools
{
    /// <summary>
    ///     组件异常类
    /// </summary>
    [Serializable]
    public class ComponentException : Exception
    {
        /// <summary>
        ///     初始化 FKS.Component.Tools.ComponentsException 类的新实例
        /// </summary>
        public ComponentException() { }

        /// <summary>
        ///     使用指定错误消息初始化 FKS.Component.Tools.ComponentsException 类的新实例。
        /// </summary>
        /// <param name="message">描述错误的消息</param>
        public ComponentException(string message)
            : base(message) { }

        /// <summary>
        ///     使用异常消息与一个内部异常实例化一个 FKS.Component.Tools.ComponentException 类的新实例
        /// </summary>
        /// <param name="message">异常消息</param>
        /// <param name="inner">用于封装在ComponentException内部的异常实例</param>
        public ComponentException(string message, Exception inner)
            : base(message, inner) { }

        /// <summary>
        ///     使用可序列化数据实例化一个 FKS.Component.Tools.ComponentException 类的新实例
        /// </summary>
        /// <param name="info">保存序列化对象数据的对象。</param>
        /// <param name="context">有关源或目标的上下文信息。</param>
        protected ComponentException(SerializationInfo info, StreamingContext context)
            : base(info, context) { }
    }
}