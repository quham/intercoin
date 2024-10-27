
import numpy as np
import pandas as pd
from scipy.optimize import minimize

import yfinance as yf
import pandas as pd

# Define the tickers
tickers = ['SPY5.L', 'SGLD.L', 'O', 'BTC-USD']

# Fetch historical price data
prices = yf.download(tickers, start="2022-01-01", end="2024-06-10")['Adj Close']
# prices['USD'] = 1.0
print("prices**********")
print(prices)
# Calculate daily returns
daily_returns = prices.pct_change().dropna()
print(daily_returns)
# Calculate mean returns
mean_returns = daily_returns.mean()

# Calculate covariance matrix
cov_matrix = daily_returns.cov()

print(mean_returns)
print(cov_matrix)
# # Example data
# returns = np.array([0.12, 0.18, 0.15, 0.10])
# cov_matrix = np.array([
#     [0.005, -0.010, 0.004, -0.002],
#     [-0.010, 0.040, -0.002, 0.004],
#     [0.004, -0.002, 0.023, 0.002],
#     [-0.002, 0.004, 0.002, 0.012]
# ])
returns = mean_returns
# Number of assets
n_assets = len(returns)
expected_return = 0.0006
# Constraints
constraints = ({
    'type': 'eq',
    'fun': lambda weights: np.sum(weights) - 1
})
return_constraint = ({
    'type': 'ineq',
    'fun': lambda weights: np.dot(weights, returns) - expected_return
})

# Bounds for the weights (0 <= weight <= 1)
bounds = tuple((0, 1) for _ in range(n_assets))

# Initial guess
initial_guess = [0.1, 0.2, 0.3, 0.4]

# Objective function (portfolio variance)
def portfolio_variance(weights):
    return weights.T @ cov_matrix @ weights

# Perform optimization
result = minimize(portfolio_variance, initial_guess, method='SLSQP', bounds=bounds, constraints=[constraints, return_constraint])

# Optimal weights
optimal_weights = result.x
print(result)
print(optimal_weights)

target_volatility = 0.01

# Objective function (negative portfolio return, as we need to maximize it)
def negative_portfolio_return(weights):
    return -np.dot(weights, returns)

# Volatility constraint
volatility_constraint = ({
    'type': 'ineq',
    'fun': lambda weights: target_volatility - np.sqrt(weights.T @ cov_matrix @ weights)
})

# Perform optimization
result = minimize(negative_portfolio_return, initial_guess, method='SLSQP', bounds=bounds, constraints=[constraints, volatility_constraint])

# Optimal weights
optimal_weights = result.x
print(optimal_weights)
print(result)