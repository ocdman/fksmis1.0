// 源文件头信息：
// <copyright file="PublicHelper.cs">

// CLR版本：4.0.30319.239
// 开发组织：

// 所属工程：FKS.Component.Tools
// 最后修改：
// 最后修改：2013/05/14 23:04
// </copyright>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace FKS.Component.Tools
{
    /// <summary>
    ///     公共辅助操作类
    /// </summary>
    public static class PublicHelper
    {
        #region 公共方法

        /// <summary>
        /// 将unix时间戳转换为一般时间格式
        /// </summary>
        /// <param name="now"></param>
        /// <returns></returns>
        public static DateTime GetNoralTime(string now)
        {
            string timeStamp = now;
            DateTime dtStart = TimeZone.CurrentTimeZone.ToLocalTime(new DateTime(1970, 1, 1));
            long lTime = long.Parse(timeStamp + "0000000");
            TimeSpan toNow = new TimeSpan(lTime);
            DateTime dtResult = dtStart.Add(toNow);
            return dtResult;
        }
        /// <summary>
        /// 将Unix时间戳转换为DateTime类型时间
        /// </summary>
        /// <param name="d">double 型数字</param>
        /// <returns>DateTime</returns>
        public static System.DateTime ConvertIntDateTime(double d)
        {
            System.DateTime time = System.DateTime.MinValue;
            System.DateTime startTime = TimeZone.CurrentTimeZone.ToLocalTime(new System.DateTime(1970, 1, 1));
            time = startTime.AddMilliseconds(d);
            return time;
        }

        /// <summary>
        /// 将c# DateTime时间格式转换为Unix时间戳格式
        /// </summary>
        /// <param name="time">时间</param>
        /// <returns>long</returns>
        public static long ConvertDateTimeInt(System.DateTime time)
        {
            //double intResult = 0;
            System.DateTime startTime = TimeZone.CurrentTimeZone.ToLocalTime(new System.DateTime(1970, 1, 1, 0, 0, 0, 0));
            //intResult = (time- startTime).TotalMilliseconds;
            long t = (time.Ticks - startTime.Ticks) / 10000;            //除10000调整为13位
            return t;
        }
        /// <summary>
        /// 时间转换时间戳
        /// </summary>
        /// <param name="dt"></param>
        /// <returns></returns>
        public static long GetUnixTime(DateTime time)
        {
            System.DateTime startTime = TimeZone.CurrentTimeZone.ToLocalTime(new System.DateTime(1970, 1, 1, 0, 0, 0, 0));
            //intResult = (time- startTime).TotalMilliseconds;
            long t = (time.Ticks - startTime.Ticks) / 10000;            //除10000调整为13位
            return t;
        }

        /// <summary>
        ///     检验参数合法性，数值类型不能小于0，引用类型不能为null，否则抛出相应异常
        /// </summary>
        /// <param name="arg"> 待检参数 </param>
        /// <param name="argName"> 待检参数名称 </param>
        /// <param name="canZero"> 数值类型是否可以等于0 </param>
        /// <exception cref="ComponentException" />
        public static void CheckArgument(object arg, string argName, bool canZero = false)
        {
            if (arg == null)
            {
                ArgumentNullException e = new ArgumentNullException(argName);
                throw ThrowComponentException(string.Format("参数 {0} 为空引发异常。", argName), e);
            }
            Type type = arg.GetType();
            if (type.IsValueType && type.IsNumeric())
            {
                bool flag = !canZero ? arg.CastTo(0.0) <= 0.0 : arg.CastTo(0.0) < 0.0;
                if (flag)
                {
                    ArgumentOutOfRangeException e = new ArgumentOutOfRangeException(argName);
                    throw ThrowComponentException(string.Format("参数 {0} 不在有效范围内引发异常。具体信息请查看系统日志。", argName), e);
                }
            }
            if (type == typeof(Guid) && (Guid)arg == Guid.Empty)
            {
                ArgumentNullException e = new ArgumentNullException(argName);
                throw ThrowComponentException(string.Format("参数{0}为空Guid引发异常。", argName), e);
            }
        }

        /// <summary>
        ///     向调用层抛出组件异常
        /// </summary>
        /// <param name="msg"> 自定义异常消息 </param>
        /// <param name="e"> 实际引发异常的异常实例 </param>
        public static ComponentException ThrowComponentException(string msg, Exception e = null)
        {
            if (string.IsNullOrEmpty(msg) && e != null)
            {
                msg = e.Message;
            }
            else if (string.IsNullOrEmpty(msg))
            {
                msg = "未知组件异常，详情请查看日志信息。";
            }
            return e == null ? new ComponentException(string.Format("组件异常：{0}", msg)) : new ComponentException(string.Format("组件异常：{0}", msg), e);
        }

        /// <summary>
        ///     向调用层抛出数据访问层异常
        /// </summary>
        /// <param name="msg"> 自定义异常消息 </param>
        /// <param name="e"> 实际引发异常的异常实例 </param>
        public static DataAccessException ThrowDataAccessException(string msg, Exception e = null)
        {
            if (string.IsNullOrEmpty(msg) && e != null)
            {
                msg = e.Message;
            }
            else if (string.IsNullOrEmpty(msg))
            {
                msg = "未知数据访问层异常，详情请查看日志信息。";
            }
            return e == null
                ? new DataAccessException(string.Format("数据访问层异常：{0}", msg))
                : new DataAccessException(string.Format("数据访问层异常：{0}", msg), e);
        }

        /// <summary>
        ///     向调用层抛出数据访问层异常
        /// </summary>
        /// <param name="msg"> 自定义异常消息 </param>
        /// <param name="e"> 实际引发异常的异常实例 </param>
        public static BusinessException ThrowBusinessException(string msg, Exception e = null)
        {
            if (string.IsNullOrEmpty(msg) && e != null)
            {
                msg = e.Message;
            }
            else if (string.IsNullOrEmpty(msg))
            {
                msg = "未知业务逻辑层异常，详情请查看日志信息。";
            }
            return e == null ? new BusinessException(string.Format("业务逻辑层异常：{0}", msg)) : new BusinessException(string.Format("业务逻辑层异常：{0}", msg), e);
        }

        #endregion
    }
}