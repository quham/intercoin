import requests
   # url = "https://www.etoro.com"
url = "https://query1.finance.yahoo.com/v7/finance/desktop/portfolio?formatted=true&lang=en-GB&region=GB&userId=VHMF5A5KAQDXBGUOP5G6AQFXAA&fields=quoteType&pfIds=p_1&includeBetaVersion=1"
cookie = "F=d=2fYRJmY9vF6Oe.hjcRNgMDzk.aOdXutKGCVt9Xi6SUM5r4ChE4YLKFz1; PH=l=en-GB; Y=v=1&n=0atcfemdq0kv1&l=bc8hslmoldmna489gpfocmua43b7w3o2ehuhmbh6/o&p=n35vvgb00000000&r=1db&intl=uk; GUC=AQAACAFmOTNmY0IibgTH&s=AQAAAD-7fown&g=ZjfvZw; A1=d=AQABBC_vN2YCEBwoTWMyNO0zPucmj5yvM34FEgAACAEzOWZjZvbPb2UBAiAAAAcIKe83ZkTT7acIDxi2N8ww4RPFC5X-tTQeYwkBBwoBdA&S=AQAAAiwsoXdxXXtyiG7cyJsw8sI; A3=d=AQABBC_vN2YCEBwoTWMyNO0zPucmj5yvM34FEgAACAEzOWZjZvbPb2UBAiAAAAcIKe83ZkTT7acIDxi2N8ww4RPFC5X-tTQeYwkBBwoBdA&S=AQAAAiwsoXdxXXtyiG7cyJsw8sI; A1S=d=AQABBC_vN2YCEBwoTWMyNO0zPucmj5yvM34FEgAACAEzOWZjZvbPb2UBAiAAAAcIKe83ZkTT7acIDxi2N8ww4RPFC5X-tTQeYwkBBwoBdA&S=AQAAAiwsoXdxXXtyiG7cyJsw8sI; ucs=tr=1716137337000; OTH=v=2&s=2&d=eyJraWQiOiIwMTY0MGY5MDNhMjRlMWMxZjA5N2ViZGEyZDA5YjE5NmM5ZGUzZWQ5IiwiYWxnIjoiUlMyNTYifQ.eyJjdSI6eyJndWlkIjoiVkhNRjVBNUtBUURYQkdVT1A1RzZBUUZYQUEiLCJwZXJzaXN0ZW50Ijp0cnVlLCJzaWQiOiIxbXhVY0h6aWlnRDcifX0.WskUarRqi6AAswOPs2we17_9bx6II2iau0axs1Q2ejGWE7IHdf3dJZn0MA_m3EwCp4mzDvoylaREySOQJZfMTLMI0wIxgupmIe4whJwiC5dqlRYu2-e6P-pDGzE_c17ef6XjrH2-M8ghthJ-3t8rjstFusSIPAwBmhBzg7acKRg; T=af=JnRzPTE3MTYwNTA5MzcmcHM9OWJYRHNPdWFuaFAyWHhmMHVVdVFLQS0t&d=bnMBeWFob28BZwFWSE1GNUE1S0FRRFhCR1VPUDVHNkFRRlhBQQFhYwFBTHMxRWRobwFhbAFxdWhhbWFkZWZpbGFAZ21haWwuY29tAXNjAWRlc2t0b3Bfd2ViAWZzAXNuOE1PeTVtTi45ZAF6egFkOS5ObUIxYkoBYQFRQUUBbGF0AWQ5Lk5tQgFudQEw&kt=EAAalhFrE93Aplv97Tbu8C_Bw--~I&ku=FAAXV4CnKOOT6k64fw8bcWyMf5yO3prSvwmXZVM9pgXSjJHS8Vxax2esOGpZCHxlXezWwFpjbRoVCwNo.8z1bCx4xzLUa7A_NJYDYo6xScknyVa21VzCnT9cNFAii8sza6RaFv9GzEkgdDyY6aj7iCuYxx_8dWORSFG4Cwg5yKNfpI-~E; PRF=tickersharing-feature-cue-final%3D0%252C1716151392815%26t%3DNGN%253DX%252BNGNUSD%253DX%252BGBPUSD%253DX%252BUSD%252BAAPL%252BSGLN.L%252BIGLN.L%252BBTC-USD%26newChartbetateaser%3D0%252C1717260540316; cmp=t=1716460207&j=1&u=1---&v=27; EuConsent=CP9kvMAP9kvMAAOACKENA1EgAAAAAAAAACiQAAAAAAAA"
headers = {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
   # "Host": "www.etoro.com"
      "Cookie": cookie


   }
response = requests.get(url, headers=headers)
print(response.status_code)
print(response.content)




   # curl -X GET "https://www.etoro.com/api/logindata/v1.1/logindata?client_request_id=ed524df7-9ce1-448f-8155-3ba0e3447bc5&conditionIncludeDisplayableInstruments=false&conditionIncludeMarkets=false&conditionIncludeMetadata=false&conditionIncludeMirrorValidation=false"\
   #      -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/"\
   #    -H "Authorization: eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoiNDE1ODAiLCJ0eXAiOiJKV1QiLCJjdHkiOiJKV1QifQ..jgyQB1vBMCGx_5rBlP5bjA.ffbMPogXjwPBJxbWSbguhkq3oF6DNS4yP6I-umlhyne4HUqVwyDLmPNH3FvoVTc-9v-_53iA9mGhNl1qzeEg4ugMXWATv_bNlPxAjqQTuVK9zRZYZ9sWkaAjwMQYLhcOBPfoUs1EWB6FcpTFApgh9zpoZ-EQHK69ZvSQ-RuiC-bSzjngW-7y43HbHriBCmZA3aaLvALXZhNIX8O9Ud-c2NDoGEqQggNk-iXfF5A-bWRXbyd0iXwEhk3sYPL-JFkxcPlb23RomyriOaj6gYqEw_1NnoKYeWw6xkypjYK6_MX6dGenygxrp94D6tKWQLG3c96qs6yyHxjnVXIO-iWqkkDBe2YZal1ehdKvQ85-uHwgfop2HHZ8qqJpYGeIpEphLlN5olg9BPxBhBpdYkhX3fGkSfJJvg_YhCkd3Uh5lbzYbTN-PDrqoeUnJ1QzwxX1LPtwZr-_EZfk5yvtbiEwkz8VGkWb1ENl9-fWRHV4c1mpzRyV6LzLRGh4SbWzoZta7G3K4D9SorG0-aN9aZFHpZATQDEm059Id1z0geRithBkie6NwUXUdb_EHNhduncWYU9iTwu_XJ4uTy6KNWbrMC2x5Y0gZx06JetFrExxo6WFuz-WTuMREssmV2qH2aMEDg0i_ym4Nb6n4REi9qeeyyU-fDSodI3VX6XF180DYnxFYIUOO-qZxjVZ-edUI5ETgzJ-yiKB_CRNbcBxYR3p6-3TZyrdNd-7BF02CyBd2IsM7dd2-7UE_Nnz4YsxRddJYybpw-X2ZbUbj69yUuHbP1VeyCKho8X_nIjgIkiYCfZ1eElHMV5omPy3eRqcJik0pVn7pWxYKEo9_AJNqFfalXk5sMc_-NnOUaFfstIVVU40OvunQI_bkZwhBtV73iy2kjK-wi29chrvfMrLkXlpz0usjPaHA6IOaYRLQ1efLr-ViweJM5R31_dIHGFj0BRzGuSul84KcoSiZz7bEzcroADHWKlntWd4RMD7mFBuXePD1kiE9VVrZVaCYfYr3ut-NIOAwka7dXQW2QjgTcdLKbTtX06v-MFm5roMngNFJqltbl30VmKgX_xo4y82zbyAI-_MdsfALVi1XGZT1JkyVEGrN3Qt8sCVj8udwo40e5GY031OLKYvOhlWCuuzlbaQ7nib99vMSIy6W4ceOkMXpFnByrBXOVb0vb5zZg38P1Lx4vRbncJq8vSlMeGUYr8ekjBzt32WyXZr3R86LazQ0uts9ohEf4ZnewEMDXP3yHP-cPb7b6KYgZnKBZXOMac2xjM4LpGPoXSQ7FY4-m63ZjRgwhZgS3oDCiEVxRLIjnIZftpaUd-jsZEanPqe3sQ0oiXXKCjklQYqi-sFqA84lFNWbvKr01Xn2V250Qfc1k4Ab-XM7GAd9fVrg5Yg9HgOWaLNTp85WbpsLvSX_J7-LW4Kz-z6_QHlywbpnKenWikGehmSUrvHWYKyZy-yZA91.z0qGl3KMZTX9PhJtqEWU2v9owAWTcjZKUNmeI8HwDbg"\
   # -H "Accounttype: Demo"\
   # -H "Applicationidentifier: ReToro"\
   # -H "Applicationversion: v651.33.2"\
   # -H "Accept: application/json"\