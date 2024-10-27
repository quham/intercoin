import pandas as pd
import matplotlib.pyplot as plt
from io import StringIO

# Load the CSV data into a DataFrame

df = pd.read_csv("metrics.csv")

# Calculate average runtime grouped by upload speed and defer_decryption
average_runtime = df.groupby(['upload', 'defer_decryption']).agg({
    'runtime': 'mean'
}).reset_index()

# Convert defer_decryption boolean to string for better visualization
average_runtime['defer_decryption'] = average_runtime['defer_decryption'].astype(str)

# Plotting the average runtime for different upload speeds with defer_decryption true and false
plt.figure(figsize=(10, 6))

# Line plot for average runtime with logarithmic scale
for key, grp in average_runtime.groupby('defer_decryption'):
    label = 'Decryption Postponed' if key == 'True' else 'Decryption Not Postponed'
    plt.plot(grp['upload'], grp['runtime'], marker='o', label=label)

# plt.xscale('log')
# plt.yscale('log')
plt.title('Average Runtime for Different Upload Speeds ')
plt.xlabel('Upload Bandwidth (Mbps)')
plt.ylabel('Runtime (seconds) ')
plt.legend()

plt.tight_layout()
plt.show()