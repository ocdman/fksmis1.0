using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Web;

using FKS.Component.Tools;


namespace FKS.Core.Models.logger
{
    /// <summary>
    /// 实体类——日志信息
    /// </summary>
    [Description("日志信息")]
    public class LogInfo : EntityBase<int>
    {
        public LogInfo()
        {
            //Id = CombHelper.NewComb();
            if (HttpContext.Current == null)
            {
                return;
            }
            Operator = HttpContext.Current.User.Identity.Name;
            if (string.IsNullOrEmpty(Operator))
            {
                Operator = "系统";
            }
            IpAddress = HttpContext.Current.Request.UserHostAddress;
            LogType = LogType.System;
            ResultType = OperationResultType.NoChanged;
        }

        public LogInfo(string method, string entity = null)
            : this()
        {
            MethodName = method;
            EntityName = entity;
        }

        [StringLength(16)]
        public string Thread { get; set; }

        [StringLength(16)]
        public string Level { get; set; }

        [StringLength(32)]
        public string Logger { get; set; }

        [StringLength(16)]
        public string Operator { get; set; }

        [StringLength(16)]
        public string IpAddress { get; set; }

        [StringLength(16)]
        public string EntityName { get; set; }

        [StringLength(16)]
        public string MethodName { get; set; }

        public LogType LogType
        {
            get { return (LogType)LogTypeNum; }
            set { LogTypeNum = (int)value; }
        }

        public int LogTypeNum { get; set; }

        public OperationResultType ResultType
        {
            get { return (OperationResultType)ResultTypeNum; }
            set { ResultTypeNum = (int)value; }
        }

        public int ResultTypeNum { get; set; }

        public string Message { get; set; }

        public string Exception { get; set; }

        public override string ToString()
        {
            StringBuilder strBuilder = new StringBuilder();

            if (!string.IsNullOrEmpty(this.Operator))
            {
                strBuilder.AppendFormat("操作者：{0}；", this.Operator);
            }
            if (!string.IsNullOrEmpty(this.IpAddress))
            {
                strBuilder.AppendFormat("IP地址为：{0}；", this.IpAddress);
            }
            if (!string.IsNullOrEmpty(this.MethodName))
            {
                strBuilder.AppendFormat("方法名称为：{0}；", this.MethodName);
            }
            if (!string.IsNullOrEmpty(this.EntityName))
            {
                strBuilder.AppendFormat("方法名称为：{0}；", this.EntityName);
            }
            strBuilder.AppendFormat("执行结果为：{0}；", this.ResultType);
            if (!string.IsNullOrEmpty(this.Message))
            {
                strBuilder.AppendFormat("执行结果消息为：{0}；", this.Message);
            }

            return strBuilder.ToString();
        }

    }
}
