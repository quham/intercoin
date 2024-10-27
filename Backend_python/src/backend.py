from pymongo import MongoClient
from datetime import datetime, timezone


from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
from copy import deepcopy
import yfinance as yf
# from abi import AFRICOIN_ABI, PRIVATE_KEY
# import web3

import requests

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'
jwt = JWTManager(app)


asset_quant = {"Bitcoin": 0.000024, "Gold ETF": 0.02 , "US Dollar": 0.21 , "S&P 500": 0.006, "REIT": 0.001} # per coin
asset_name = {"BTC-USD": "Bitcoin", "SGLD.L": "Gold ETF", "USD": "US Dollar", "SPY5.L": "S&P 500", "O": "REIT"} #  "GBPUSD=X": "Pound", "EURUSD=X": "Euro", "NGNUSD=X": "Naira"
currencies = [ "GBPUSD=X", "EURUSD=X","NGNUSD=X"]
currency_name = {"GBPUSD=X": "GBP", "EURUSD=X": "EUR", "NGNUSD=X": "NGN"}

CONNECTION_STRING = "mongodb+srv://quhamadefila:Prodigy1!@africoin.nvhahsz.mongodb.net/?retryWrites=true&w=majority&appName=Africoin"
client = MongoClient(CONNECTION_STRING)
db = client['customer']

# AFRICOIN_ADDRESS = "0xA33E5d6dC72Ce61FE2323c5a4173013A581A528E"
# AFRICOIN_ADDRESS = "0x7fA609372f6D1bF89502bF8b0194b71717789594"
# africoin_contract = web3.eth.contract(address=AFRICOIN_ADDRESS, abi=AFRICOIN_ABI)


#AUTHENTICATION
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    print(data)
    username = data['username']
    email = data['email']
    password = data['password']
    wallet_address = data['wallet_address']
    user_info = db["info"]

    if user_info.find_one({'email': email}):
        return jsonify({"msg": "User already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    user_info.insert_one({'email': email, 'password': hashed_password, 'username': username, 'wallet_address': wallet_address, 'balance': 0, 'amountIn': 0, 'amountOut': 0, 'investmentReturn': 0, 'amountInPctChange': 0, 'amountOutPctChange': 0, 'investmentReturnPctChange': 0})
    date = datetime.now(timezone.utc)
    set_balance_history(email, date.month, [0] * date.day)
    
    return jsonify({"msg": "User registered successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']
    user_info = db["info"]

    user = user_info.find_one({'email': email})
    if not user or not bcrypt.check_password_hash(user['password'], password):
        return jsonify({"msg": "Invalid credentials"}), 401

    access_token = create_access_token(identity=email)
    return jsonify({"access_token":access_token}), 200

@app.route('/logout', methods=['POST']) # deal with frontend
def logout():
   #  session.pop('email', None)
    return jsonify({"msg": "Logout successful"}), 200

# BALANCE

@app.route('/prevBalance', methods=['GET'])
@jwt_required()
def get_prev_balance():
   email = get_jwt_identity()
   balance = db["info"].find_one({"email": email}).get('prev_balance', 1)
   return {"prevBalance": balance}

@app.route('/balanceHistory') # not needed will hardcode
@jwt_required()
def get_balance_history():
   month = int(request.args.get('month', 5))
   email = get_jwt_identity()
   balances = client['customer']["balance_history"]
   bh = balances.find_one({"email": email, "month": month})
   return {"balance_history": bh.get('balance_history') if bh else []}, 200

@app.route('/cashflows')
@jwt_required()
def get_cashflows():
   email = get_jwt_identity()
   user = db['info'].find_one({"email": email})
   return {"amountIn": user.get('amountIn'), "amountOut": user.get('amountOut'), "investmentReturn": user.get('investmentReturn'), 
           "amountInPctChange": user.get('amountInPctChange'), "amountOutPctChange": user.get('amountOutPctChange'), "investmentReturnPctChange": user.get('investmentReturnPctChange')}

@app.route('/userDetails', methods=['GET'])
@jwt_required()
def get_user_details():
   email = get_jwt_identity()
   user = db['info'].find_one({"email": email})
   details = {"email": email, "wallet": user.get('wallet_address'), "phone": user.get('phone', "")}
   return {"details": details}
# TRANSACTIONS
@app.route('/getWallet')
@jwt_required()
def get_wallet():

   if request.args.get('email'):
      method = "email"
      receiver = request.args.get('email')
   else:
      method = "mobile"
      receiver = request.args.get('mobile')
   
   info = client['customer']["info"]
   print({"wallet_address": info.find_one({method: receiver}).get('wallet_address')})
   return {"wallet_address": info.find_one({method: receiver}).get('wallet_address')}

@app.route('/addActivity', methods=['POST'])
@jwt_required()
def add_activty(): # customer_email, type, amount, receiver_wallet=None
   data = request.get_json()
   type = data.get("type")
   amount = float(data.get("amount"))
   receiver_wallet = data.get("recipient_wallet")

   email = get_jwt_identity()
   info = client['customer']["info"]
   transactions = client['customer']["activity"]
   date = datetime.now(timezone.utc)
   receiver = info.find_one({"wallet_address": receiver_wallet})
   receiver_email = receiver.get('email')

   type_to = {"deposit": "Me", "withdraw": "My Bank", "transfer": receiver.get('username')}
   type_from = {"deposit": "My Bank", "withdraw": "Me", "transfer": "Me"}
   to = type_to[type]
   from_ = type_from[type]
   if type == "transfer":
      sender = info.find_one({"email": email})
      sender_username = sender.get('username')
      trans = {"metadata": {"email": receiver_email}, "type": "transfer_in", "amount": amount, "time": date, "to": "Me", "from": sender_username }
      transactions.insert_one(trans)
      type = "transfer_out"

   # x = info.find_one({"email": customer_email})
   # if type == "deposit":
   #    # update_balance(customer_email, amount + get_balance(customer_email))
   #    to = "Me"
   # elif type == "withdrawal":
   #    # update_balance(customer_email, amount - get_balance(customer_email))
   #    to = "Bank"
   # else:
   #    to = info.find_one({"wallet_address": receiver_wallet}).get('username')
   #    trans = {"metadata": {"email": receiver_email}, "type": "transfer_in", "amount": amount, "time": date, "to": "Me"}
   #    transactions.insert_one(trans)
   #    type = "transfer_out"

      # update_balance(receiver_email, amount + get_balance(receiver_email))
      # update_balance(customer_email, amount - get_balance(customer_email))
      # TODO update amount in and out
   
   transaction = {"metadata": {"email": email}, "type": type, "amount": amount, "time": date, "to": to, "from": from_} # tofo add wallet address and recipient email
   print(transaction)
   transactions.insert_one(transaction)
   return {"status": "success"}

@app.route('/getActivity')
@jwt_required()
def get_activity(): 
   customer_email = get_jwt_identity()
   month = int(request.args.get("month", 6))
   # month = 6
   activity = client['customer']["activity"]
   transactions = activity.find({"metadata.email": customer_email, "time": {"$gte": datetime(2024, month, 1), "$lt": datetime(2024, month + 1, 1)}}) # datetime.now() - timedelta(days=30)

   t = list(deepcopy(transactions))
   for transaction in t:
        transaction['date'] = transaction['time'].strftime('%a, %d %b %Y')
        
        transaction.pop('metadata')
        transaction.pop('time')
        transaction.pop('_id')
        # todo add wallet address

   print("activity", t)
   return {"activity": t[::-1]}

# INVESTMENT

@app.route('/getPortfolio')
@jwt_required()
def get_investment_portfolio():
   portfolio = []
   # email = get_jwt_identity()
   balance = float(request.args.get('balance', 0))
   ap, _ = get_asset_prices()
   asset_values = get_component_values(ap)
   coin_value = sum(asset_values.values())
   for asset, value in asset_values.items():
      portfolio.append({"asset": asset, "value": value * balance /coin_value, "percentage": value/coin_value})
   print("portfolio", portfolio)
   return {"portfolio": portfolio}
   




def get_asset_prices():
   tickers = list(asset_name.keys()) + currencies

   data = yf.Tickers(tickers)
   current_prices = {asset_name[ticker]: data.tickers[ticker].fast_info['lastPrice'] for ticker in asset_name.keys()}
   exchange_rates = {currency_name[currency]: data.tickers[currency].fast_info['lastPrice'] for currency in currencies}
   current_prices["US Dollar"] = 1
   print("cure", current_prices)
   return current_prices, exchange_rates

@app.route('/exchangeRates')
def get_exchange_rates():
   asset_values, exchange_rates = get_asset_prices()
   component_values = get_component_values(asset_values)
   afri_ex_rates = {}
   afri = sum(component_values.values())
   for currency in currency_name.values():
      afri_ex_rates[currency] = afri / exchange_rates[currency]
   afri_ex_rates["USD"] = afri
   afri_ex_rates["AFR"] = 1
   return {"exchangeRates": afri_ex_rates} 

def get_component_values(asset_values):
   for asset in asset_values:
      asset_values[asset] *= asset_quant[asset]
   return asset_values

def get_coin_value(asset_values):
   return sum(get_component_values(asset_values).values())
   


# RESERVES
def getTotalSupply():
   return 10000 # TODO source correctly


def getYahooReserves():
   url = "https://query1.finance.yahoo.com/v7/finance/desktop/portfolio?formatted=true&lang=en-GB&region=GB&userId=VHMF5A5KAQDXBGUOP5G6AQFXAA&fields=quoteType&pfIds=p_1&includeBetaVersion=1"
   cookie = "F=d=2fYRJmY9vF6Oe.hjcRNgMDzk.aOdXutKGCVt9Xi6SUM5r4ChE4YLKFz1; PH=l=en-GB; Y=v=1&n=0atcfemdq0kv1&l=bc8hslmoldmna489gpfocmua43b7w3o2ehuhmbh6/o&p=n35vvgb00000000&r=1db&intl=uk; GUC=AQAACAFmZdJmk0IibgTH&s=AQAAADM3E4GI&g=ZmSErQ; A1=d=AQABBC_vN2YCEBwoTWMyNO0zPucmj5yvM34FEgAACAHSZWaTZvZ0rXYBAiAAAAcIKe83ZkTT7acIDy47LWfYbYCfKfEqzFkWHgkBBwoB-A&S=AQAAAl3jPz7PYYscz9Rbc-8BGho; A3=d=AQABBC_vN2YCEBwoTWMyNO0zPucmj5yvM34FEgAACAHSZWaTZvZ0rXYBAiAAAAcIKe83ZkTT7acIDy47LWfYbYCfKfEqzFkWHgkBBwoB-A&S=AQAAAl3jPz7PYYscz9Rbc-8BGho; A1S=d=AQABBC_vN2YCEBwoTWMyNO0zPucmj5yvM34FEgAACAHSZWaTZvZ0rXYBAiAAAAcIKe83ZkTT7acIDy47LWfYbYCfKfEqzFkWHgkBBwoB-A&S=AQAAAl3jPz7PYYscz9Rbc-8BGho; PRF=tickersharing-feature-cue-final%3D0%252C1716151392815%26t%3DO%252BCL%253DF%252BSGLNL.XC%252BSGLN.L%252BGLD%252BGC%253DF%252BGBP%253DX%252BNGN%253DX%252BNGNUSD%253DX%252BGBPUSD%253DX%252BUSD%252BAAPL%252BIGLN.L%252BBTC-USD%26newChartbetateaser%3D0%252C1717260540316; ucs=tr=1719084238000; OTH=v=2&s=2&d=eyJraWQiOiIwMTY0MGY5MDNhMjRlMWMxZjA5N2ViZGEyZDA5YjE5NmM5ZGUzZWQ5IiwiYWxnIjoiUlMyNTYifQ.eyJjdSI6eyJndWlkIjoiVkhNRjVBNUtBUURYQkdVT1A1RzZBUUZYQUEiLCJwZXJzaXN0ZW50Ijp0cnVlLCJzaWQiOiJmbTM5M2IwZEZ5cUUifX0.5K48P19a139mey3GiK06zuYG1a7Y5ml-Bpb5RpWIrR5P7ar_MJjAJKNFLplISJVclVDJFdMCtfy-NQcxHfWcObWUFqUtrtjHhk4Xwhar-EViZPfH4KRx6KkWqqaX8yLAw29lPzKa9MdkBo3cS-DfbQzi0m0wO0upsCka90ov5u0; T=af=JnRzPTE3MTg5OTc4MzgmcHM9QkVWXzVRZ29hcDljX2VtN3NVM3lZdy0t&d=bnMBeWFob28BZwFWSE1GNUE1S0FRRFhCR1VPUDVHNkFRRlhBQQFhYwFBQXNrTm5tdwFhbAFxdWhhbWFkZWZpbGFAZ21haWwuY29tAXNjAWRlc2t0b3Bfd2ViAWZzAXNuOE1PeTVtTi45ZAF6egFPTmRkbUJBN0UBYQFRQUUBbGF0AWQ5Lk5tQgFudQEw&kt=EAAJgt.M82cnlVYz6IV2lWFEQ--~I&ku=FAAXCvVSuuRu4lQ1A69uC5TmaUJ.N9aIh61orXmWbA.5E8m1xWRAa0LFSDPQvA4SzTdLACQXPZ.sGgo2FOsOPLuA370fxi.xxMSCWdn0i5n7VhwD6gIF_eJYCSgoDOhmSa0gu_m8gzsXg37X_Nna0gc0bUr4y0ELDKliAHyEM68_hA-~E; EuConsent=CP9kvMAP9kvMAAOACKENA5EgAAAAAAAAACiQAAAAAAAA; cmp=t=1719133283&j=1&u=1---&v=31"  
   headers = {
         "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
         "Cookie": cookie,
         "Content-Type": "application/json"


      }
   response = requests.get(url, headers=headers).json()
   print(response)
   portfolio = response["finance"]["result"][0]["portfolios"][0]
   

   reserves = {}
   reserves["US Dollar"] = portfolio["cashPosition"]
   for position in portfolio["positions"]:
      ticker = position["symbol"]
      if ticker in asset_name:
         reserves[asset_name[ticker]] = position["currentMarketValue"] 
   return reserves

      

      
def get212Reserves():
   url = "https://demo.trading212.com/api/v0/equity/portfolio"

   headers = {"Authorization": "32204258ZZUUvjhLHFuZBzLBSMwZvkelsIDxc"}
   reserve_list = requests.get(url, headers=headers).json()
   print(reserve_list)
   # reserve_list[1]["ticker"] = "GLD" # adjust to have mathcing

   reserves = {}
   # for reserve in reserve_list:
   #    print(reserve)
   #    ticker = reserve["ticker"] # may adjust 
   #    if ticker in asset_name:
   #       actual = reserve["quantity"] * reserve["currentPrice"]
   #       reserves[asset_name[ticker]] = actual
   return reserves



   return 
@app.route('/reserves')
@jwt_required()
def getLatestReserves():
   
   reserves = []
   asset_prices, _ = get_asset_prices()
   coin = get_coin_value(deepcopy(asset_prices))
   # print("asset_prices", asset_prices)
   trading_reserves = get212Reserves()
   yahoo_reserves = getYahooReserves()
   for asset in asset_name.values():
      actual = (trading_reserves.get(asset, 0) + yahoo_reserves.get(asset, 0)) / coin
      required = getTotalSupply() * asset_quant[asset] * asset_prices[asset] / coin
      d = {"asset": asset, "actual": round(actual,2), "required": round(required,2), "ratio": round(actual/required,2)}
      reserves.append(d)
   # print(reserves)
   return {"reserves": reserves}
   # # parsing data from 212
   # import json
   # proofs = client['reserves']["proofs"]
   # proof = list(proofs.find().sort({"_id":-1}).limit(1))[0]
   # data = proof["recieved"]
   # # Find the start of the JSON data
   # start_index = data.find('[')

   # # Extract the JSON string
   # json_string = data[start_index:]

   # asset_prices = get_asset_prices()

   # # Parse the JSON string into a Python list of dictionaries
   # reserve_list = json.loads(json_string)
   # reserves = []
   # for reserve in reserve_list:
   #    ticker = reserve["ticker"] # may adjust 
   #    if ticker in asset_name:
   #       actual = reserve["quantity"] * asset_prices[asset_name[ticker]]
   #       required = total_supply * asset_quant[asset_name[ticker]]
   #       d = {"asset": asset_name[ticker], "actual": actual, "required": required, "ratio": actual/required}
   #       reserves.append(d)
   # return {"reserves": reserves}




brokers = ["yahoo", "212"]
@app.route('/reserveProofs')
@jwt_required()
def getLatestReserveProof():
   # from  ast import literal_eval
   allProofs = []
   for broker in brokers:
      col = client['reserves'][broker]
      proofs = list(col.find().sort({"_id":-1}).limit(1))
      proof = proofs[0] if proofs else ""
      allProofs.append({"name": broker, "request": proof["request"], "proof": proof["proof"], "response": proof["response"]})
   return {"proofs": allProofs}


@app.route('/reserveTime')
@jwt_required()
def getReserveTime():
   # from  ast import literal_eval
   times = []
   for broker in brokers:
      col = client['reserves'][broker]
      proofs = list(col.find().sort({"_id":-1}).limit(1))
      proof = proofs[0] if len(proofs) > 0 else ""
      times.append(proof["timestamp"])
   time = max(times)# max for demo purposes would be min in reality
   return {"time": time.strftime("%a, %d %b %Y %H:%M:%S GMT")}
      


def set_balance_history(customer_email, month, balance_history):
   balances = client['customer']["balance_history"]
   balances.insert_one({"email": customer_email, "month": month, "balance_history": balance_history})

def update_cashflows(customer_email, amountIn, amountOut, investmentReturn, amountInPctChange, amountOutPctChange, investmentReturnPctChange):
   info = client['customer']["info"]
   info.update_one({"email": customer_email}, {"$set": {"amountIn": amountIn, "amountOut": amountOut, "investmentReturn": investmentReturn, "amountInPctChange": amountInPctChange, "amountOutPctChange": amountOutPctChange, "investmentReturnPctChange": investmentReturnPctChange}})

def set_activity(transactions):
   activity = client['customer']["activity"]
   activity.insert_many(transactions)


# def deposit(to_address, amount):
#    nonce = web3.eth.getTransactionCount(web3.eth.default_account)

#    # Mint transaction
#    mint_txn = africoin_contract.functions.mint(to_address, amount).buildTransaction({
#       'chainId': 4,  # Rinkeby testnet chain ID; use 1 for Mainnet
#       'gas': 2000000,
#       'gasPrice': web3.toWei('20', 'gwei'),
#       'nonce': nonce,
#    })

#    # Sign the transaction
#    signed_mint_txn = web3.eth.account.signTransaction(mint_txn, private_key=PRIVATE_KEY)

#    # Send the transaction
#    mint_txn_hash = web3.eth.sendRawTransaction(signed_mint_txn.rawTransaction)
#    print(f"Mint transaction sent with hash: {web3.toHex(mint_txn_hash)}")




def balance_in_default_currency():
   pass

def get_investment_return():
   pass

def set_default_currency():
   pass

if __name__ == "__main__": 
   # print(get212Reserves())
   app.run(debug=True)
   # print(getLatestReserves())
   # get212Reserves()
   



   # *** DEMO DATA ***

   # update_cashflows("tester@africoin.com", 131.71, 51.2, 121.34, 0.51, 0.32, 0.01)


   # import random 
   # balance_history = []

   # for i in range(1, 25):
   #    balance_history.append(9000 + (100 + i)* 10 *random.random())
   # set_balance_history("tester@africoin.com", 6, balance_history) 
   # # app.run(debug=True)



 
