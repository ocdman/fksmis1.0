using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Text;

namespace FKS.Component.Tools.T4
{
    /// <summary>
    /// T4实体模型信息类
    /// </summary>
    public class T4ModeController
    {
        /// <summary>
        /// 获取 是否使用模块文件夹
        /// </summary>
        public bool UseModuleDir { get; private set; }

        /// <summary>
        /// 获取 模型所在模块名称
        /// </summary>
        public string ModuleName { get; private set; }

        /// <summary>
        /// 获取 模型名称
        /// </summary>
        public string Name { get; private set; }

        /// <summary>
        /// 获取 模型描述
        /// </summary>
        public string Description { get; private set; }

        /// <summary>
        /// 主键类型
        /// </summary>
        public Type KeyType { get; set; }

        /// <summary>
        /// 主键类型名称
        /// </summary>
        public string KeyTypeName { get; set; }
        /// <summary>
        /// 映射的类名
        /// </summary>
        public string ClassName { get; set; }
        /// <summary>
        /// 字段关联地图
        /// </summary>
        public Dictionary<string, string> Maps { get; set; }
        /// <summary>
        /// 属性集合
        /// </summary>
        public IEnumerable<PropertyInfo> Properties { get; private set; }

        public ViewModelInfoAttribute ViewModelInfo { get; set; }

        /// <summary>
        /// 构造
        /// </summary>
        /// <param name="modelType"></param>
        /// <param name="useModuleDir"></param>
        public T4ModeController(Type modelType, bool useModuleDir = false)
        {
            var @namespace = modelType.Namespace;
            if (@namespace == null)
            {
                return;
            }
            UseModuleDir = useModuleDir;
            if (UseModuleDir)
            {
                var index = @namespace.LastIndexOf('.') + 1;
                ModuleName = @namespace.Substring(index, @namespace.Length - index);

                if (ModuleName.ToLower() == "models")
                {
                    UseModuleDir = false;
                }
            }

            Name = modelType.Name;

            var descAttributes = modelType.GetCustomAttributes(typeof(DescriptionAttribute), true);
            Description = descAttributes.Length == 1 ? ((DescriptionAttribute)descAttributes[0]).Description : Name;
            Properties = modelType.GetProperties();

            var modelInfoAttributes = modelType.GetCustomAttributes(typeof(ViewModelInfoAttribute), true);

            ViewModelInfo = modelInfoAttributes.Length == 1 ? (ViewModelInfoAttribute)modelInfoAttributes[0] : new ViewModelInfoAttribute();
        }
    }
}
