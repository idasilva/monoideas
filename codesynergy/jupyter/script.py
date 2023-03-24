# # Convert a JSON File to a CSV File
# import pandas as pd

# df = pd.read_json('./2023-01-01-0.json',lines=True)
# df.to_csv('./gharchive_dev.csv


# import pandas as pd
# import requests
# import io
# import gzip

# #  create range of monthly dates
# download_dates = pd.date_range(start='2023-01-01', end='2023-01-02' , freq="1h")

# #  URL from Chrome DevTools Console
# base_url = ("https://data.gharchive.org/{0}-{1}.json.gz") #  add format option to year and month

# #  create list of remote URL from base URL
# list_of_url = [base_url.format(date.date(),date.hour) for date in download_dates]

# dfs = []
# for url in list_of_url:
#     print("url",url)
# #     response = requests.get(url)
# #     content = response.content
# #     df_aux = pd.read_json(io.BytesIO(content), lines=True, compression='gzip')
# #     dfs.append(df_aux)

# # len(dfs)

# import httpx
# import asyncio
# import time
# import pandas as pd
# import requests
# import io
# import gzip



# download_dates = pd.date_range(start='2023-01-01', end='2023-01-02' , freq="1h")

# #  URL from Chrome DevTools Console
# base_url = ("https://data.gharchive.org/{0}-{1}.json.gz") #  add format option to year and month

# #  create list of remote URL from base URL
# list_of_url = [base_url.format(date.date(),date.hour) for date in download_dates]

# import httpx

# async def get_async(url):
#     async with httpx.AsyncClient() as client:
#         return await client.get(url)

# urls = ["http://google.com", "http://wikipedia.org"]

# # Note that you need an async context to use `await`.
# await asyncio.gather(*map(get_async, list_of_url))

# await asyncio.gather(*map(get_async, list_of_url))


