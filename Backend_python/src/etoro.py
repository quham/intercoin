import requests
   # url = "https://www.etoro.com"
url = "https://www.etoro.com/api/logindata/v1.1/logindata?client_request_id=ed524df7-9ce1-448f-8155-3ba0e3447bc5&conditionIncludeDisplayableInstruments=false&conditionIncludeMarkets=false&conditionIncludeMetadata=false&conditionIncludeMirrorValidation=false"
   
    
headers = {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Authorization": "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoiNDE1ODAiLCJ0eXAiOiJKV1QiLCJjdHkiOiJKV1QifQ..I3LjaEziUCOx2F1lmAVsJA.RH8mepwzgGXzIfWihtLm1MHquRre3L9yNrbdjHw8hnojBzIjiVm0oI5EcVKf5rbeygXEj6QW-emKCV6EmjIfSyCg4dxBf5N6tVGzNNv46EXpXOxE4AWgt0fyiayZM7pWltCVRkAYqaBDgTpvGga4tnq3UYRSRjOqKDqboK2ZFQ_r933xy80wL1WlqQQfluMst_Dj1fx6F75eYK1bM95pYBzAbKw5dCot24meDFmE4U5iykQE3DEwhVIQOPCc6Mr7Gxyx-NODVmDjD8KQHS4vAkc0xikBaGtKrpHg8sD1XfWqd9q7iP7-fXveXGb4itNH5APipYTnuiyGxR3c8xlgSmOYv6dc5UJIFNHqDBVBycJgR7o-9rivg5bwpK7_P__4NSFUum6KekYPTw3FlaHqBL5Y9rX028EXEosyORJbiELKNRR8MFvxGiDPmHhMwmXdLkvC1qu0z_qbfZqFK5h5JdLJjgl-WpC8CtNi33MZ0OZvf93imRBFVpaE83x5WsFacu47UwM7Wt3OhNDAf1w1AYqOoszWUb_AX87UBWe9ilZyNisMKSvGb3uHjCUcaGsvWevSFBxGLOTYLnBZWxKsVK8Arek4x_lYq3F5xdRRRQ4sk6gwjb0-r1EtqQJHGHsA3AoFcSIZiEkh91kJnzz__ZX4vETfXFyNOREywMyFAGcX-eA0IJqXalPWLZ53DEgI1foXeqVa9-mrLMSfLy8pV9z0PsoMf6FE5ddyZs0maOi9DAeRL8zxBgr_t1jQjoA2C29lteHHX51JDGS-5dS6OszjFOYbRqJs8PVI7z8JkLpSrcTlWcqkLXZyFX5bHJyQeiC-nesJnoHNzpzzoKCiTB8jxQBIHZkWpLevCP2KMXbVFtTt7A5i2Eqn6clgc-wBYeuxi0epxzHfJ115EcG647ZpIm4MMJE-Ql17yDfA1rsIhm3M5ZdQ21iS0SniDMqZXNSxtQo2mVnu72vrROQvitTG5b0PY3bVmTA82-arRe0YwQL3vUr8iAA2M_9cs08W_p82bXtFRzingcbfs2FtzBtWVNaYnZG-nyiW9dO4NnT0dGlwZWpeX4At5LHwM45pwvoKuXPNJeoEzN831McKcVuRyUPjBxKPHnTKR8dJjXw3gmaNVUC4M4txZPhZR15cCF4JezVBEorocU2QhGgW6TxnLIVyNRIbHkjqO7l09rEJcrZ78HWHHj4aAWXeHOuvaGWonImdGEC-Yb0DqhPENQni5qlmvTKpC176sAv38203Ayj4FAdnhou-lJLWh5Fy_LsZ-BzyyIm42q8yl0CSQ7uqmhi9L_V91wANKXNOOs1wOeUakc8FG9OYsydmloW7OLZBHXOa0r4G6-uCChS5ONcuqX15LWR-FudLjFUn9ZVi0_8UaJLFOUcvpW-kGgvoBTJ_Dqg9k6WIT7Vw6NEtbQ.bw2UBpIIOJISVU2x4Ry8BmwCQsXB6rsEf2FyWReyxv4" ,  "Accounttype": "Demo",
   "Applicationidentifier": "ReToro",
   "Applicationversion": "v651.33.2",
   "Accept": "application/json",
   # "Host": "www.etoro.com"

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