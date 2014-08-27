using FKS.Core.Data.Repositories.Parameters;
using FKS.Core.Models.Parameters;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Core.Impl
{
    public class ParameterSetService : CoreServiceBase<ParameterSet>, IParameterSetContract
    {
        [Import]
        public IParameterSetRepository ParameterRepository { get; set; }

        public override int Add(ParameterSet model)
        {
            return ParameterRepository.Insert(model);
        }

        public override int Edit(ParameterSet model)
        {
            return ParameterRepository.Update(model);
        }

        public override int Del(ParameterSet model)
        {
            return ParameterRepository.Delete(model);
        }

        public override ParameterSet Detail<T>(T Id)
        {
            return this.ParameterSets.SingleOrDefault(m => m.Id.Equals(Id));
        }

        public IQueryable<ParameterSet> ParameterSets
        {
            get { return ParameterRepository.Entities; }
        }
    }
}
