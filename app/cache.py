from flask_caching import Cache

# Set up cache to store API data (handle against Coingecko's rate limits)
cache_config = {
    "CACHE_TYPE": "SimpleCache",  # Flask-Caching related configs
    # timeout in seconds, how long we store the data for before expiration
    "CACHE_DEFAULT_TIMEOUT": 120
}
cache = Cache(config=cache_config)
