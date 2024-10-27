import json
from web3 import Web3
from statistics import mean

# Connect to local Ethereum node (e.g., Ganache)
web3 = Web3(Web3.HTTPProvider('https://polygon-amoy.g.alchemy.com/v2/TsZ4T0SNOKlXhFGD_1eMCVg6Lp1gV4ae')) # Change to your provider
web3.eth.default_account = web3.eth.accounts[0]

# Load the contract ABI
with open('abi.json', 'r') as abi_file:
    abi = json.load(abi_file)

# Contract address (replace with your contract address)
contract_address = '0xYourContractAddressHere'

# Create the contract instance
contract = web3.eth.contract(address=contract_address, abi=abi)

# Function to estimate gas cost
def estimate_gas(func, *args):
    tx = func(*args).buildTransaction({'from': web3.eth.default_account, 'nonce': web3.eth.getTransactionCount(web3.eth.default_account)})
    gas_estimate = web3.eth.estimateGas(tx)
    return gas_estimate

# Example calls to each function with example parameters
def calculate_gas_costs():
    gas_costs = {
        'updateAllowedSupply': [],
        'mint': [],
        'burn': [],
        'burnFrom': [],
        'approve': [],
        'transfer': []
    }

    # Update Allowed Supply
    gas_costs['updateAllowedSupply'].append(estimate_gas(contract.functions.updateAllowedSupply, 10000))

    # Mint
    gas_costs['mint'].append(estimate_gas(contract.functions.mint, web3.eth.accounts[1], 1000))

    # Burn
    gas_costs['burn'].append(estimate_gas(contract.functions.burn, 100))

    # Burn From
    gas_costs['burnFrom'].append(estimate_gas(contract.functions.burnFrom, web3.eth.accounts[1], 50))

    # Approve
    gas_costs['approve'].append(estimate_gas(contract.functions.approve, web3.eth.accounts[2], 500))

    # Transfer
    gas_costs['transfer'].append(estimate_gas(contract.functions.transfer, web3.eth.accounts[3], 200))

    # Calculate average gas costs
    avg_gas_costs = {func: mean(costs) for func, costs in gas_costs.items() if costs}

    return avg_gas_costs

# Print the average gas costs
average_gas_costs = calculate_gas_costs()
for func, cost in average_gas_costs.items():
    print(f"Average gas cost for {func}: {cost} gas")

if __name__ == "__main__":
    average_gas_costs = calculate_gas_costs()
    for func, cost in average_gas_costs.items():
        print(f"Average gas cost for {func}: {cost} gas")
