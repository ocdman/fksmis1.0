using FKS.Core.Data.Repositories.Authority;
using FKS.Core.Models.Authority;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Core.Impl
{
    public class AuthorityService : CoreServiceBase<Authority>, IAuthorityContract
    {
        [Import]
        public IAuthorityRepository AuthorityRepository { get; set; }

        public IQueryable<Authority> Authorities
        {
            get { return AuthorityRepository.Entities; }
        }

        public override int Add(Authority model)
        {
            return AuthorityRepository.Insert(model);
        }

        public override int Edit(Authority model)
        {
            return AuthorityRepository.Update(model);
        }

        public override int Del(Authority model)
        {
            return AuthorityRepository.Delete(model);
        }

        public override Authority Detail<T>(T Id)
        {
            return this.Authorities.SingleOrDefault(m => m.Id.Equals(Id));
        }
    }
}
