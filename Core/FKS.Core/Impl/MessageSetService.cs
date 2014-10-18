using FKS.Core.Data.Repositories.Message;
using FKS.Core.Models.Message;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FKS.Core.Impl
{
    public class MessageSetService : CoreServiceBase<MessageSet>, IMessageSetContract
    {
        [Import]
        public IMessageSetRepository MessageRepository { get; set; }

        public override int Add(MessageSet model)
        {
            return MessageRepository.Insert(model);
        }

        public override int Edit(MessageSet model)
        {
            return MessageRepository.Update(model);
        }

        public override int Del(MessageSet model)
        {
            return MessageRepository.Delete(model);
        }

        public override MessageSet Detail<T>(T Id)
        {
            return this.MessageSets.SingleOrDefault(m => m.Id.Equals(Id));
        }

        public IQueryable<MessageSet> MessageSets
        {
            get { return MessageRepository.Entities; }
        }
    }
}
