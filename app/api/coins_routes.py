from flask import Blueprint, jsonify, session
import requests

coins_routes = Blueprint('coins', __name__)


@coins_routes.route('/featured')
def featured_cryptocurrencies():
    """
    Fetching data from Coingecko for 6 cryptocurrencies
    to be used in featured section on home page
    """
    res = requests.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=false&locale=en")
    data = res.json()
    return jsonify(data)

