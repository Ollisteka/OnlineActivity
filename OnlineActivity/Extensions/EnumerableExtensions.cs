using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace OnlineActivity.Extensions
{
    public static class EnumerableExtensions
    {
        private static readonly Random Random = new Random();

        public static T GetRandomItem<T>(this IEnumerable<T> enumerable)
        {
            var collection = enumerable.ToList();

            return !collection.Any() ? default : collection.ElementAt(Random.Next(collection.Count));
        }
    }
}
