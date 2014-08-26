using System.Web;
using System.Web.Mvc;
using FKS.Site.Helper.Attributes;
using FKS.Site.Helper.Logging;

namespace FKS.Site.Web
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new MyHandleErrorAttribute());
            filters.Add(new HandleErrorAttribute());
            filters.Add(new AdminLogAttribute());
        }
    }
}