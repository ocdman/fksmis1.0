using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web.Mvc.Html;

namespace FKS.Site.Helper.MVCHtmlExtend
{
    /// <summary>
    /// Create by FENGXIAO bootstrap模板表单
    /// </summary>
    public static class MVCExtend
    {
        public static MvcHtmlString FormItem<TModel, TValue>(this HtmlHelper<TModel> helper, Expression<Func<TModel, TValue>> expression, string dataBind = "", bool ShowValid = true)
        {
            MvcHtmlString label = LabelExtensions.LabelFor(helper, expression, new { @class = "col-sm-2 control-label" });
            //MvcHtmlString input = EditorExtensions.EditorFor(helper, expression, new { @class = "form-control" });
            MvcHtmlString input = InputExtensions.TextBoxFor(helper, expression, new { @class = "form-control" });
            MvcHtmlString valid = ValidationExtensions.ValidationMessageFor(helper, expression, "", new { @class = "control-label" });

            return FormItem(helper, label, input, valid, ShowValid);
        }

        public static MvcHtmlString FormItem<TModel, TValue>(this HtmlHelper<TModel> helper, Expression<Func<TModel, TValue>> expression, object additionalValue, bool ShowValid = true)
        {
            //MvcHtmlString label = LabelExtensions.LabelFor(helper, expression, new { @class = "col-sm-2 control-label" });
            //MvcHtmlString input = EditorExtensions.EditorFor(helper, expression, additionalValue);
            MvcHtmlString label = LabelExtensions.LabelFor(helper, expression, new { @class = "col-sm-2 control-label" });
            MvcHtmlString input = InputExtensions.TextBoxFor(helper, expression, additionalValue);
            MvcHtmlString valid = ValidationExtensions.ValidationMessageFor(helper, expression, "", new { @class = "control-label" });

            return FormItem(helper, label, input, valid, ShowValid);
        }

        public static MvcHtmlString FormItemInLine<TModel, TValue>(this HtmlHelper<TModel> helper, Expression<Func<TModel, TValue>> expression, object additionalValue, bool ShowValid = true)
        {
            MvcHtmlString label = LabelExtensions.LabelFor(helper, expression, new { @class = "sr-only control-label" });
            MvcHtmlString input = EditorExtensions.EditorFor(helper, expression, additionalValue);
            MvcHtmlString valid = ValidationExtensions.ValidationMessageFor(helper, expression, "", new { @class = "control-label" });

            return FormItemInline(helper, label, input, valid, ShowValid);
        }

        public static MvcHtmlString FormItemInline(this HtmlHelper helper, MvcHtmlString label, MvcHtmlString input, MvcHtmlString valid, bool ShowValid)
        {
            StringBuilder stringBuilder = new StringBuilder();

            //stringBuilder.AppendFormat("<div class='{0}'>", "form-group");
            stringBuilder.Append(label);

            stringBuilder.Append(input);
            if (ShowValid)
            {
                //stringBuilder.Append(valid);
            }
            //stringBuilder.Append("</div>");

            return MvcHtmlString.Create(stringBuilder.ToString());
        }
        public static MvcHtmlString FormItem(this HtmlHelper helper, MvcHtmlString label, MvcHtmlString input, MvcHtmlString valid, bool ShowValid)
        {
            StringBuilder stringBuilder = new StringBuilder();

            stringBuilder.AppendFormat("<div class='{0}'>", "form-group");
            stringBuilder.Append(label);
            stringBuilder.AppendFormat("<div class='{0}'>", "col-sm-10");
            stringBuilder.Append(input);
            if (ShowValid)
            {
                stringBuilder.Append(valid);
            }
            stringBuilder.Append("</div>");
            stringBuilder.Append("</div>");

            return MvcHtmlString.Create(stringBuilder.ToString());
        }
    }
}
