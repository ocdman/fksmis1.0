﻿// <auto-generated>
//     此代码由工具生成。
//     对此文件的更改可能会导致不正确的行为，并且如果
//     重新生成代码，这些更改将会丢失。
//	   如存在本生成代码外的新需求，请在相同命名空间下创建同名分部类进行实现。
// </auto-generated>


using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CoolCode.Linq;
using FKS.Component.Tools;
using FKS.Site.Models;
using FKS.Site.Helper.Attributes;
using FKS.Site.Web.Controllers.BaseControllers;
using FKS.Core.Models.Hardware;
using FKS.Site.Helper.Logging;

namespace FKS.Site.Web.Controllers.Controllers
{
    [Export]
    public partial class EquipManagerViewController : ManagerController<IEquipManagerSiteContract, EquipManagerView>
    {
        protected IQueryBuilder<EquipManager> ViewQueryBuilderEquipManager { get; set; }
        protected IQueryBuilder<Equipment> ViewQueryBuilderEquipment { get; set; }
        private bool IsExist { get; set; }

        partial void SetQueryBuilder(Pagination pagination);
        partial void SetQueryBuilder2(string[] strs);

        partial void SetQueryBuilder3(Pagination pagination);
        partial void DoCheckExist(EquipManager model, OperationResult res);

        [Import]
        protected IEquipmentSiteContract EquipmentSiteContract { get; set; }

        #region R

        /// <summary>
        /// 查询数据
        /// </summary>
        /// <param name="pagination"></param>
        /// <returns></returns>
        public ActionResult DataRowIndex(Pagination pagination)
        {
            int total = 0;
            List<PropertySortCondition> sortConditions = this.getPropertySortCondition(pagination);
            DataGridView<EquipManagerView> dgvResult = new DataGridView<EquipManagerView>();

            if (pagination.KeyValues.Count > 0)
            {
                this.SetQueryBuilder(pagination);
                var memberView = this.EquipmentSiteContract.Equipments.Where(this.ViewQueryBuilderEquipment.Expression)
                  .Select(m => new EquipmentView
                  {
                      CollectionCode = m.CollectionCode,
                  });

                var a = memberView.ToList();
                var b = new List<string>();
                foreach (var s in a)
                {
                    b.Add(s.CollectionCode);
                }
                this.SetQueryBuilder2(b.ToArray());
            }
            else
            {
                this.SetQueryBuilder3(pagination);
            }

            var memberViews = this.SiteContract.EquipManagers.Where(this.ViewQueryBuilderEquipManager.Expression).Where<EquipManager, int>(m => true, pagination.page, pagination.rows, out total, sortConditions.ToArray()).Join(this.EquipmentSiteContract.Equipments, m => m.CollectionCode, n => n.CollectionCode, (m, n)
                => new EquipManagerView
                {
                    CollectionCode = m.CollectionCode,
                    NickName = n.NickName,
                    UploadInterval = m.UploadInterval,
                    DetectorCount = m.DetectorCount,
                    DetectorNum1 = m.DetectorNum1,
                    DetectorID1 = m.DetectorID1,
                    DetectorNum2 = m.DetectorNum2,
                    DetectorID2 = m.DetectorID2,
                    Humidity = m.Humidity,
                    Temperature = m.Temperature,
                    Concentration = m.Concentration,
                    Result = m.Result,
                });
                //.Select(m => new EquipManagerView
                //{
                //    CollectionCode = m.CollectionCode,
                //    UploadInterval = m.UploadInterval,
                //    DetectorCount = m.DetectorCount,
                //    DetectorNum1 = m.DetectorNum1,
                //    DetectorID1 = m.DetectorID1,
                //    DetectorNum2 = m.DetectorNum2,
                //    DetectorID2 = m.DetectorID2,
                //    Humidity = m.Humidity,
                //    Temperature = m.Temperature,
                //    Concentration = m.Concentration,
                //    Result = m.Result,
                //});
            dgvResult.rows = memberViews.ToList();
            dgvResult.total = total;

            return Json(dgvResult, JsonRequestBehavior.AllowGet);
        }

        #endregion

        /*
        #region Create

        /// <summary>
        /// 添加数据
        /// </summary>
        /// <param name="viewModel"></param>
        /// <returns></returns>
        [HttpPost]
        public override ActionResult Add(EquipmentView viewModel)
        {
            var result = this.doCheckViewModel(res =>
            {
                Equipment model = new Equipment
                {
                    AddDate = DateTime.Now,
                    EquipCode = viewModel.EquipCode,
                    CollectionCode = viewModel.CollectionCode,
                    PropertyInfo = viewModel.PropertyInfo,
                    PositionInfo = viewModel.PositionInfo,
                    NickName = viewModel.NickName,
                    Address = viewModel.Address,
                    EquipCount = viewModel.EquipCount,
                    TimeOut = viewModel.TimeOut,
                    Interval = viewModel.Interval,
                    YHX = viewModel.YHX,
                    YHY = viewModel.YHY,
                    Status = viewModel.Status,
                    FanAirFlow = viewModel.FanAirFlow,
                    FanPower = viewModel.FanPower,
                    Content = viewModel.Content,
                };
                
                this.DoCheckExist(model, res);
                if (res.ResultType == OperationResultType.Success)
                {
                    var count = this.SiteContract.Add(model);
                    if (count > 0)
                    {
                        // add by wbgong at 20140711 start
                        EquipManager equipManagerModel = new EquipManager
                        {
                            CollectionCode = viewModel.CollectionCode,
                            DetectorNum1 = "0000",
                            DetectorID1 = "0000",
                            DetectorNum2 = "----",
                            DetectorID2 = "----"
                        };
                        if (viewModel.EquipCount == 2)
                        {
                            equipManagerModel.DetectorNum2 = "0000";
                            equipManagerModel.DetectorID2 = "0000";
                        }
                        var count1 = this.EquipManagerSiteContract.Add(equipManagerModel);
                        // add by wbgong at 20140711 end
                        if (count1 > 0)
                        {
                            res.ResultType = OperationResultType.Success;
                        }
                    }
                    else
                    {
                        res.ResultType = OperationResultType.Error;
                        res.Message = @"保存数据失败，请查看日志！";
                    }
                }
            });
            this.doSetLogInfo("添加用户", result);

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        #endregion
         */

        #region Update

        /// <summary>
        /// 修改数据视图
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public ActionResult Edit(string Id)
        {
            EquipManagerView viewModel = null;

            var model = this.SiteContract.EquipManagers.Single<EquipManager>(m => m.CollectionCode == Id);
            if (model != null)
            {
                viewModel = new EquipManagerView
                {
                    CollectionCode = model.CollectionCode,
                    UploadInterval = model.UploadInterval,
                    DetectorCount = model.DetectorCount,
                    DetectorNum1 = model.DetectorNum1,
                    DetectorID1 = model.DetectorID1,
                    DetectorNum2 = model.DetectorNum2,
                    DetectorID2 = model.DetectorID2,
                    Humidity = model.Humidity,
                    Temperature = model.Temperature,
                    Concentration = model.Concentration,
                    Result = model.Result,
                };
            }

            this.doGetAjaxReturnInfo();
            return View(viewModel);
        }
        /// <summary>
        /// 修改数据保存
        /// </summary>
        /// <param name="viewModel"></param>
        /// <returns></returns>
        [HttpPost]
        public override ActionResult Edit(EquipManagerView viewModel)
        {
            var result = this.doCheckViewModel(res =>
            {
                var model = this.SiteContract.EquipManagers.Single<EquipManager>(m => m.CollectionCode == viewModel.CollectionCode);

                if (model.Result == 1)
                {
                    res.ResultType = OperationResultType.Error;
                    res.Message = @"数据正在上传中";
                    return;
                }

                if (model != null)
                {
                    model.CollectionCode = viewModel.CollectionCode;
                    model.UploadInterval = viewModel.UploadInterval;
                    model.DetectorCount = viewModel.DetectorCount;
                    model.DetectorNum1 = viewModel.DetectorNum1;
                    model.DetectorID1 = viewModel.DetectorID1;
                    model.DetectorNum2 = viewModel.DetectorNum2;
                    model.DetectorID2 = viewModel.DetectorID2;
                    model.Humidity = viewModel.Humidity;
                    model.Temperature = viewModel.Temperature;
                    model.Concentration = viewModel.Concentration;
                    model.Result = 1;

                    var count = this.SiteContract.Edit(model);
                    if (count >= 0)
                    {
                        res.ResultType = OperationResultType.Success;
                    }
                    else
                    {
                        res.ResultType = OperationResultType.Error;
                        res.Message = @"保存数据失败，请查看日志！";
                    }
                }
                else
                {
                    res.ResultType = OperationResultType.Error;
                    res.Message = @"未查询到数据！";
                }
            });
            //this.doSetLogInfo("修改用户", result);

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        #endregion

        /*
        #region Delete

        /// <summary>
        /// 删除数据
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public ActionResult Delete(string Id)
        {
            EquipManagerView viewModel = null;

            var model = this.SiteContract.EquipManagers.Single<EquipManager>(m => m.CollectionCode == Id);
            if (model != null)
            {
                viewModel = new EquipManagerView
                {
                    CollectionCode = model.CollectionCode,
                    UploadInterval = model.UploadInterval,
                    DetectorNum1 = model.DetectorNum1,
                    DetectorID1 = model.DetectorID1,
                    DetectorNum2 = model.DetectorNum2,
                    DetectorID2 = model.DetectorID2,
                    Humidity = model.Humidity,
                    Temperature = model.Temperature,
                    Concentration = model.Concentration,
                    Result = model.Result,
                };
            }

            this.doGetAjaxReturnInfo();
            return View(viewModel);
        }
        /// <summary>
        /// 删除数据保存
        /// </summary>
        /// <param name="viewModel"></param>
        /// <returns></returns>
        [HttpPost]
        [ActionName("DELETE")]
        public ActionResult DelConfirm(EquipManagerView viewModel)
        {
            //var result = this.doCheckViewModel(res =>
            //{
            var res = new OperationResult(OperationResultType.Success, string.Empty);
            var model = this.SiteContract.EquipManagers.Single<EquipManager>(m => m.CollectionCode == viewModel.CollectionCode);
            if (model != null)
            {
                var count = this.SiteContract.Del(model);

                if (count > 0)
                {
                    res.ResultType = OperationResultType.Success;
                }
                else
                {
                    res.ResultType = OperationResultType.Error;
                    res.Message = @"保存数据失败，请查看日志！";
                }
            }
            else
            {
                res.ResultType = OperationResultType.Error;
                res.Message = @"未查询到数据！";
            }
            //});
            this.doSetLogInfo("删除用户", res);

            return Json(res, JsonRequestBehavior.AllowGet);
        }

        #endregion
         */
    }
}



