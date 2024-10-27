import matplotlib.pyplot as plt

# Example values
categories = ['YES', 'NO']
values = [35, 65]

# Create bar chart
plt.figure(figsize=(8, 6))
plt.bar(categories, values, color=['blue', 'green'])

# Add titles and labels
plt.title('Stablecoin Issuer bandwidth Usage for proof Generation')
plt.xlabel('Decryption peformed by 2PC')
plt.ylabel('Upload Bandwidth (Bytes)')

# Display the bar chart
plt.show()


categories = ['YES', 'NO']
values = [35, 65]

# Create bar chart
plt.figure(figsize=(8, 6))
plt.bar(categories, values, color=['blue', 'green'])

# Add titles and labels
plt.title('Proof Generation Runtime')
plt.xlabel('Decryption peformed in 2PC')
plt.ylabel('Runtime (Seconds)')

# Display the bar chart
plt.show()