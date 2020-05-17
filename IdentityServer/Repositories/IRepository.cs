using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace IdentityServer.Repositories
{
    internal interface IRepository<T>
        where T : class, new()
    {
        IQueryable<T> All();

        IQueryable<T> Where(System.Linq.Expressions.Expression<Func<T, bool>> expression);

        T Single(Expression<Func<T, bool>> expression);

        void Delete(Expression<Func<T, bool>> expression);

        void Add(T item);

        void Add(IEnumerable<T> items);

        bool CollectionExists();
    }
}
