from flask import Blueprint, jsonify, session, current_app
import requests
from app.cache import cache

coins_routes = Blueprint('coins', __name__)


@coins_routes.route('/featured')
@cache.cached(timeout=60)
def featured_cryptocurrencies():
    """
    Fetching data from Coingecko for 6 cryptocurrencies
    to be used in featured section on home page
    """
    res = requests.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=false&locale=en")
    data = res.json()
    return jsonify(data)


@coins_routes.route('/explore')
@cache.cached(timeout=60)
def explore_cryptocurrencies():
    res = requests.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en")
    data = res.json()
    return jsonify(data)
