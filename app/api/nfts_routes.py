from flask import Blueprint, jsonify, session, current_app, make_response, Response
import requests
from app.cache import cache
import os
import pandas as pd
import numpy as np
import datetime
import time
import math

nfts_routes = Blueprint("nfts", __name__)

ALCHEMY_API_KEY = os.getenv("ALCHEMY_API_KEY")
endpoint = f"https://eth-mainnet.g.alchemy.com/nft/v2/{ALCHEMY_API_KEY}"
MAX_RETRY_ATTEMPTS = 5


def handle_api_res(res):
    if res.status_code == 200:
        return res.json()
    elif res.status_code == 429:
        return make_response(
            jsonify({"error": "Too many requests, please try again later."}), 429
        )
    else:
        return make_response(
            jsonify(
                {
                    "error": "An error occurred, please confirm the address is correct or try again later."
                }
            ),
            500,
        )


@nfts_routes.route("/profile/<address>")
@cache.cached(timeout=60)
def get_nfts_by_address(address):
    url = f"{endpoint}/getNFTs?owner={address}&withMetadata=true&excludeFilters[]=SPAM&excludeFilters[]=AIRDROPS&spamConfidenceLevel=VERY_HIGH&pageSize=100"

    res = requests.get(url)
    return handle_api_res(res)


@nfts_routes.route("/collections/<address>")
@cache.cached(timeout=60)
def get_nfts_by_collection(address):
    url = f"{endpoint}/getNFTsForCollection?contractAddress={address}&withMetadata=true"

    res = requests.get(url)
    return handle_api_res(res)


@nfts_routes.route("/collections/<address>/appraise")
@cache.cached(timeout=60)
def get_nfts_appraised(address):
    # call the getNFTs API
    # filter out spam and airdrops
    url = f"{endpoint}/getNFTs?owner={address}&pageSize=100&withMetadata=false&excludeFilters[]=SPAM&excludeFilters[]=AIRDROPS"

    res = requests.get(url)

    if res.status_code != 200:
        print("No NFTs found")

    data = res.json()

    # if pageKey is present in the result it means there are more pages of NFT data to pull for this account
    # we use a loop to flip through those pages and compile all the data into one table
    if "pageKey" in data:
        more_pages = True
        holdings = pd.DataFrame(data["ownedNfts"])
        pageKey = data["pageKey"]

        while more_pages:
            url = f"{endpoint}/getNFTs?owner={address}&pageSize=100&withMetadata=false&excludeFilters[]=SPAM&excludeFilters[]=AIRDROPS&pageKey={pageKey}"
            res = requests.get(url)
            data = res.json()
            new_page = pd.DataFrame(data["ownedNfts"])
            if isinstance(holdings, pd.DataFrame):
                holdings = pd.concat([holdings, new_page]).reset_index(drop=True)
            else:
                print(f"Unexpected type for holdings: {type(holdings)}")
            if "pageKey" in data:
                pageKey = data["pageKey"]
            else:
                more_pages = False
    else:
        holdings = pd.DataFrame(data["ownedNfts"])

    # change balance from string type to number
    holdings["balance"] = pd.to_numeric(holdings["balance"])

    # make new column called address that takes raw address out of contract data {'address': '0x...'}, taking the 0x...
    holdings["address"] = holdings.apply(lambda x: x["contract"]["address"], axis=1)

    # trim table to only include address and balance columns
    holdings = holdings[["address", "balance"]]

    # sum up balance of NFTs held by contract address
    holdings = holdings.groupby(["address"]).sum().reset_index()

    # table would be
    # holdings(idx)          addresss            balance
    # 0...                   0x...               1...

    holdings.head()

    # use getContractMetadataBatch endpoint to fetch metadata
    if len(holdings) < 100:
        contract_list = holdings["address"].tolist()
        url = f"{endpoint}/getContractMetadataBatch"
        payload = {"contractAddresses": contract_list}
        headers = {"accept": "application/json", "content-type": "application/json"}

        res = requests.post(url, json=payload, headers=headers)
        data = res.json()
        metadata = pd.DataFrame(data)
    else:
        # if the number of collections the wallet holds is more than 100 we need a loop to pull
        # the metadata in sets of 100

        # find how many sets of 100 there are in this group of contracts
        number_of_pages = math.ceil(len(holdings) / 100)

        # split the dataset we have into sets of 100
        holdings_list = np.array_split(holdings, number_of_pages)
        metadata_list = []

        # loop through the sets of 100
        # get each set's metadata and add it to a list
        for i in holdings_list:
            contract_list = i["address"].tolist()
            url = "https://eth-mainnet.g.alchemy.com/nft/v2/92mxAbGvSiei0Ghs19DobSPC3s_Cyk1j/getContractMetadataBatch"
            payload = {"contractAddresses": contract_list}
            headers = {"accept": "application/json", "content-type": "application/json"}

            r = requests.post(url, json=payload, headers=headers)
            data = r.json()
            temp = pd.DataFrame(data)
            metadata_list.append(temp)

        metadata = pd.concat(metadata_list, axis=0)

    # custom functions to append desired information from metadata
    # a function to extract OpenSea floorprice from the contractMetadata column of the table
    def get_floorprice(x):
        try:
            return x["contractMetadata"]["openSea"]["floorPrice"]
        except:
            return 0

    # a function to extract the collection's name from the contractMetadata column of the table
    def get_name(x):
        try:
            return x["contractMetadata"]["name"]
        except:
            return "Name not found"

    # a function to extract the collection's image from the contractMetadata column of the table
    def get_image(x):
        try:
            return x["contractMetadata"]["openSea"]["imageUrl"]
        except:
            return "x"

    # create new column's in the metadata table for name, image and floor price using the functions we just created
    metadata["name"] = metadata.apply(lambda x: get_name(x), axis=1)
    metadata["image"] = metadata.apply(lambda x: get_image(x), axis=1)
    metadata["floor price"] = metadata.apply(lambda x: get_floorprice(x), axis=1)

    # merge the holdings table we made earlier (has contract address and balance columns)
    # with the metadata we just made (has name, image, floor price for each nft contract)
    portfolio = holdings.merge(metadata, how="inner", on="address")
    # this will give us address, balance, contractmetadata, name, image, floor price, can return this to the front end to render out

    # filter out collections that dont have a floor price
    portfolio = portfolio[portfolio["floor price"] > 0]

    # cut the portfolio table to only include relevant columns
    portfolio = portfolio[["address", "balance", "name", "image", "floor price"]]

    # calculate the total value of each collection held by multiplying the target
    # wallet's balance of each collection by its floor price
    portfolio["value"] = portfolio["balance"] * portfolio["floor price"]

    total_value = portfolio["value"].sum()

    portfolio = portfolio.to_dict(orient="records")

    return {"portfolio": portfolio, "total_value": total_value}
