// 源文件头信息：
// <copyright file="EnumExtensions.cs">

// CLR版本：4.0.30319.239
// 开发组织：

// 所属工程：FKS.Component.Tools
// 最后修改：
// 最后修改：2013/05/15 0:51
// </copyright>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;


namespace FKS.Component.Tools
{
    /// <summary>
    ///     枚举扩展方法类
    /// </summary>
    public static class EnumExtensions
    {
        /// <summary>
        ///     获取枚举项的Description特性的描述文字
        /// </summary>
        /// <param name="enumeration"> </param>
        /// <returns> </returns>
        public static string ToDescription(this Enum enumeration)
        {
            Type type = enumeration.GetType();
            MemberInfo[] members = type.GetMember(enumeration.CastTo<string>());
            if (members.Length > 0)
            {
                return members[0].ToDescription();
            }
            return enumeration.CastTo<string>();
        }
    }
}