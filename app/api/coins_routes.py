from flask import Blueprint, jsonify, session, current_app, make_response
import requests
from app.cache import cache

coins_routes = Blueprint('coins', __name__)


def handle_api_res(res):
    if res.status_code == 200:
        return jsonify(res.json())
    elif res.status_code == 429:
        return make_response(jsonify({"error": "Too many requests, please try again later."}), 429)
    else:
        return make_response(jsonify({"error": "An error occurred, please try again later."}), 500)


@coins_routes.route('/featured')
@cache.cached(timeout=60)
def featured_cryptocurrencies():
    """
    Fetching data from Coingecko for 6 cryptocurrencies
    to be used in featured section on home page
    """
    res = requests.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=false&locale=en")

    try:
        res.raise_for_status()
    except requests.exceptions.HTTPError:
        res = requests.get(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=false&locale=en")

    return handle_api_res(res)


@coins_routes.route('/explore')
@cache.cached(timeout=60)
def explore_cryptocurrencies():
    res = requests.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en")
    try:
        res.raise_for_status()
    except requests.exceptions.HTTPError:
        res = requests.get(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en")
    return handle_api_res(res)


@coins_routes.route('/<coin_id>')
@cache.cached(timeout=60)
def details_cryptocurrency(coin_id):
    res = requests.get(
        f"https://api.coingecko.com/api/v3/coins/{coin_id}?localization=false")
    try:
        res.raise_for_status()
    except requests.exceptions.HTTPError:
        res = requests.get(
            f"https://api.coingecko.com/api/v3/coins/{coin_id}?localization=false")
    return handle_api_res(res)


@coins_routes.route('/<coin_id>/24h_chart')
@cache.cached(timeout=60)
def day_chart(coin_id):
    res = requests.get(
        f"https://api.coingecko.com/api/v3/coins/{coin_id}/market_chart?vs_currency=usd&days=1")
    try:
        res.raise_for_status()
    except requests.exceptions.HTTPError:
        res = requests.get(
            f"https://api.coingecko.com/api/v3/coins/{coin_id}/market_chart?vs_currency=usd&days=1")
