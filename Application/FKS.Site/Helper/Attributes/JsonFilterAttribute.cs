using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace FKS.Site.Helper.Attributes
{
    /// <summary>
    /// json参数处理类
    /// </summary>
    public class JsonFilterAttribute : ActionFilterAttribute
    {
        /// <summary>
        /// 构造方法
        /// </summary>
        /// <param name="type">参数类型,如果是数组请输入数组元素类型</param>
        /// <param name="modelName">参数名称</param>
        public JsonFilterAttribute(Type type, string modelName)
        {
            DataType = type;
            ModelName = modelName;
        }
        /// <summary>
        /// 需要反序列化的类型
        /// </summary>
        protected Type DataType { get; set; }
        /// <summary>
        /// 数据名称
        /// </summary>
        protected string ModelName { get; set; }
        /// <summary>
        /// 参数转换处理
        /// </summary>
        /// <param name="filterContext"></param>
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            string json = string.Empty;

            //获取客户端提交的字符串
            json = filterContext.HttpContext.Request.Form[ModelName];
            if (json == null) return;
            object obj = Activator.CreateInstance(DataType);
            filterContext.ActionParameters[ModelName] = obj;
        }
    }
}
