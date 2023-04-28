from flask import Blueprint, jsonify, session, current_app, make_response
import requests
from app.cache import cache
import os

nfts_routes = Blueprint('nfts', __name__)

ALCHEMY_API_KEY = os.getenv("ALCHEMY_API_KEY")
endpoint = f"https://eth-mainnet.alchemyapi.io/v2/{ALCHEMY_API_KEY}"
MAX_RETRY_ATTEMPTS = 5


def handle_api_res(res):
    if res.status_code == 200:
        return jsonify(res.json())
    elif res.status_code == 429:
        return make_response(jsonify({"error": "Too many requests, please try again later."}), 429)
    else:
        return make_response(jsonify({"error": "An error occurred, please confirm the address is correct or try again later."}), 500)


@nfts_routes.route('/<address>')
@cache.cached(timeout=60)
def get_nfts_by_address(address):
    url = f"{endpoint}/getNFTs?owner={address}&withMetadata=true&excludeFilters[]=SPAM&excludeFilters[]=AIRDROPS&spamConfidenceLevel=VERY_HIGH&pageSize=100"

    res = requests.get(url)
    return handle_api_res(res)
