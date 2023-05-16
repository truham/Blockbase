from flask import Blueprint, jsonify, session, current_app, make_response
import requests
from app.cache import cache
import time

coins_routes = Blueprint('coins', __name__)


def handle_api_res(res):
    if res.status_code == 200:
        return jsonify(res.json())
    elif res.status_code == 429:
        return make_response(jsonify({"error": "Too many requests, please try again later."}), 429)
    else:
        return make_response(jsonify({"error": "An error occurred, please try again later."}), 500)


# exponential backoff strategy, wait for increasing amnt of time between retries
# reduces the chances of hitting the rate limit again
def req_with_exponential_backoff(url, retries=10, backoff_factor=2):
    for attempt in range(retries):
        res = requests.get(url)
        if res.status_code != 429:
            return res
        sleep_time = backoff_factor ** (attempt + 1)
        time.sleep(sleep_time)
    return res


@coins_routes.route('/featured')
@cache.cached(timeout=300)
def featured_cryptocurrencies():
    """
    Fetching data from Coingecko for 6 cryptocurrencies
    to be used in featured section on home page
    """
    res = req_with_exponential_backoff(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=false&locale=en")

    try:
        res.raise_for_status()
    except requests.exceptions.HTTPError:
        res = req_with_exponential_backoff(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=false&locale=en")

    return handle_api_res(res)


@coins_routes.route('/explore')
@cache.cached(timeout=300)
def explore_cryptocurrencies():
    res = req_with_exponential_backoff(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en")
    try:
        res.raise_for_status()
    except requests.exceptions.HTTPError:
        res = req_with_exponential_backoff(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en")
    return handle_api_res(res)


@coins_routes.route('/<coin_id>')
@cache.cached(timeout=300)
def details_cryptocurrency(coin_id):
    res = req_with_exponential_backoff(
        f"https://api.coingecko.com/api/v3/coins/{coin_id}?localization=false")
    try:
        res.raise_for_status()
    except requests.exceptions.HTTPError:
        res = req_with_exponential_backoff(
            f"https://api.coingecko.com/api/v3/coins/{coin_id}?localization=false")
    return handle_api_res(res)


@coins_routes.route('/<coin_id>/24h_chart')
@cache.cached(timeout=300)
def day_chart(coin_id):
    res = req_with_exponential_backoff(
        f"https://api.coingecko.com/api/v3/coins/{coin_id}/market_chart?vs_currency=usd&days=1")
    try:
        res.raise_for_status()
    except requests.exceptions.HTTPError:
        res = req_with_exponential_backoff(
            f"https://api.coingecko.com/api/v3/coins/{coin_id}/market_chart?vs_currency=usd&days=1")
    return handle_api_res(res)
