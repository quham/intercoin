import yfinance as yf
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Define the tickers
tickers = ['SPY5.L', 'SGLD.L', 'O', 'BTC-USD']

# Fetch historical price data
prices = yf.download(tickers, start="2022-01-01", end="2024-06-10")['Adj Close']

# Include USD as an additional asset with constant prices
prices['USD'] = 1.0

# Calculate daily returns
daily_returns = prices.pct_change().dropna()

# Calculate mean returns
mean_returns = daily_returns.mean()

# Calculate covariance matrix
cov_matrix = daily_returns.cov()

# Generate random portfolios
num_portfolios = 10000
results = np.zeros((3, num_portfolios))
weights_record = []

for i in range(num_portfolios):
    weights = np.random.random(len(tickers) + 1)
    weights /= np.sum(weights)
    weights_record.append(weights)
    portfolio_return = np.sum(weights * mean_returns)
    portfolio_std_dev = np.sqrt(np.dot(weights.T, np.dot(cov_matrix, weights)))
    results[0,i] = portfolio_return
    results[1,i] = portfolio_std_dev
    results[2,i] = results[0,i] / results[1,i]  # Sharpe ratio

# Convert results array to a DataFrame
results_frame = pd.DataFrame(results.T, columns=['Return', 'StdDev', 'Sharpe'])

# Locate the portfolio with the highest Sharpe ratio
max_sharpe_port = results_frame.iloc[results_frame['Sharpe'].idxmax()]

# Locate the portfolio with the minimum standard deviation
min_vol_port = results_frame.iloc[results_frame['StdDev'].idxmin()]

# Plotting the efficient frontier
plt.figure(figsize=(10, 7))
plt.scatter(results_frame.StdDev, results_frame.Return, c=results_frame.Sharpe, cmap='viridis')
plt.colorbar(label='Sharpe Ratio')
plt.scatter(max_sharpe_port[1], max_sharpe_port[0], color='red', marker='*', s=200)
plt.scatter(min_vol_port[1], min_vol_port[0], color='blue', marker='*', s=200)
plt.title('Efficient Frontier')
plt.xlabel('Volatility (Std. Deviation)')
plt.ylabel('Return')
plt.show()
