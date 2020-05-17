using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using MongoDB.Bson;
using MongoDB.Driver;

namespace IdentityServer.Repositories
{
    internal sealed class MongoRepository<T>: IRepository<T>
        where T: class, new()
    {

        private readonly string collectionName = typeof(T).Name;
        private readonly IMongoDatabase database;

        public MongoRepository(IMongoDatabase database)
        {
            this.database = database;
        }

        public IQueryable<T> All()
        {
            return database.GetCollection<T>(collectionName).AsQueryable();
        }

        public IQueryable<T> Where(Expression<Func<T, bool>> expression)
        {
            return All().Where(expression);
        }

        public void Delete(Expression<Func<T, bool>> predicate)
        {
            database.GetCollection<T>(collectionName).DeleteMany(predicate);
        }

        public T Single(Expression<Func<T, bool>> expression)
        {
            return All().Where(expression).SingleOrDefault();
        }

        public bool CollectionExists()
        {
            var collection = database.GetCollection<T>(collectionName);
            var filter = new BsonDocument();
            var totalCount = collection.CountDocuments(filter);
            return totalCount > 0;

        }

        public void Add(T item)
        {
            database.GetCollection<T>(collectionName).InsertOne(item);
        }

        public void Add(IEnumerable<T> items)
        {
            database.GetCollection<T>(collectionName).InsertMany(items);
        }
    }
}
