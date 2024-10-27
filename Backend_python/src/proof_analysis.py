# Additionally create a chart showing runtime for different upload(bandwidth in mbps) using a logarithmic scale
import pandas as pd
import matplotlib.pyplot as plt

# Load the CSV data into a DataFrame

df = pd.read_csv("metrics.csv")

# Calculate average uploaded and downloaded grouped by defer_decryption
averages = df.groupby('defer_decryption').agg({
    'uploaded': 'mean',
    'downloaded': 'mean'
}).reset_index()

# Convert defer_decryption boolean to string for better visualization
averages['defer_decryption'] = averages['defer_decryption'].astype(str)

# Plotting
fig, ax = plt.subplots(1, 2, figsize=(14, 6))

# Bar plot for average uploaded
ax[0].bar(["No", "Yes"], averages['uploaded']/1000, color=['blue', 'orange'])
ax[0].set_title('Average Data Uploaded from Prover to Verifier')
ax[0].set_xlabel('Decryption Postponed')
ax[0].set_ylabel('Upload Size (kilobytes)')

# Bar plot for average downloaded
ax[1].bar(["No", "Yes"], averages['downloaded']/1000, color=['blue', 'orange'])
ax[1].set_title('Average Data Downloaded by Prover from Verifier')
ax[1].set_xlabel('Decryption Postponed')
ax[1].set_ylabel('Download Size (kilobytes)')

plt.tight_layout()
plt.show()