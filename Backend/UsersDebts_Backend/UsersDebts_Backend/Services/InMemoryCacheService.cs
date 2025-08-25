using System.Collections.Concurrent;

namespace UsersDebts_Backend.Services
{
    public class InMemoryCacheService : ICacheService
    {
        private static readonly ConcurrentDictionary<string, object> _cache = new();

        public T? Get<T>(string key)
        {
            return _cache.TryGetValue(key, out var value) ? (T)value : default;
        }

        public void Set<T>(string key, T value, TimeSpan? expiration = null)
        {
            _cache[key] = value;
            // Expiraci�n ignorada en la simulaci�n
        }

        public void Remove(string key)
        {
            _cache.TryRemove(key, out _);
        }
    }
}
