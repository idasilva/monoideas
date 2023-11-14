import pandas as pd
import re


csv_file_path = './extractions-one.csv'


df = pd.read_csv(csv_file_path, error_bad_lines=False)

len(df)

df.head(10)

data = [
    "BLOCO 2    APARTAMENTO 501",
    "Bloco 2 apartamento 503",
    "Bloco 4, apartamento 423",
    "Bloco M apto 102",
    "Bloco 2 APARTAMENTO 102",
    "Bl D AP 519",
    "bl 12 ap 401",
    "Apartamento 41 Bloco B",
    "Apartamento 161 Bloco 1",
    "ap 53 bl 10",
    "Ap 404 Bl 2",
    "ap 53 bl 10",
    "BLOCO 2 APARTAMENTO 501",
    "Bloco 2 apartamento 503",
    "BLOCO 10 APARTAMENTO 41",
    "BLOCO 678 APARTAMENTO 102",
    "BLOCO 6 APARTAMENTO 201",
    "Bloco 4, apartamento 423",
    "Bloco B - APTO 31",
    "Bloco D apto 22",
    "BLOCO FLORES APARTAMENTO 406",
    "BLOCO B19 APARTAMENTO 53C",
    "Bloco M, apto 102",
    "BL 04 AP 302",
    "bl 12 ap 401",
    "Bl D AP 519",
    "Bl 05 Ap 810",
    "BL A - AP 302",
    "Apartamento 41 Bloco B",
    "Apartamento 161 Bloco 1",
    "Apartamento 706 Bloco A",
    "Apartamento 913 bloco A",
    "Apartamento 202 Bloco B",
    "Apartamento 706 Bloco A",
    "Apartamento 33A Bloco 1",
    "Apartamento 203 Bloco N",
    "ap 53 bl 10",
    "Ap 404 Bl 2",
    "ap 31 BL D",
    "TORRE 9   APARTAMENTO 13",
    "APT 904 TORRE 1",
    "TORRE APARTAMENTO 603",
    "TORRE A, AP 206",
    "TORRE 1, Apto 1401",
    "TORRE 1, Ap 22",
    "TORRE 2 APARTAMENTO 302",
    "Apartamento 2307 Torre Flamboyan",
    "AP 307 torre 2",
    "Apartamento 54 torre A",
    "Apt 342 torre 3",
    "Apto.155 Bloco A",
    "Bloco B / Apto 6",
    "BLOCO 5, Ap5201",
    "Apartamento203 Bloco N",
    "Bloco 22  Apto 301",
    "AP 44 - Bloco 1",
    "BLOCO 2; apt. 103",
    "Bloco: D1, Ap. 306",
    "Bloco: 1 APT: 1307",
    "Bloco 15, Ap 202.",
    "bloco 09, apto 108",
    "Apto 209 - Torre 1",
    "TORRE A , APTO 153",
    "Torre 04 Apt 01",
    "ap:96, torre 3",
    "TORRE 3 - AP. 501",
    "Apto. 1004, Torre Roma"
]


# pattern = r'^[A-Za-z]+\s\d+$'
pattern = r'(?i)(?:bloco|bl|bloco:|torre)\s*\w*[\s,-/;]*\s*(?:apartamento|ap|ap:|apt|apt:|apto|apto.)\s*\w*[\s,-/:]*\s*\w*|(?:apartamento|ap|ap:|apt|apt:|apto|apto.)\s*\w*[\s,-/;]*\s*(?:bloco|bl|bloco:|torre)\s*\w*'


for i in  data:
    match = re.match(pattern, i)

    if match:
        matched_string = match.group()
        print("ENTROU NA REGRA - " + matched_string)
        continue
    print("NÃO ENTROU NA REGRA - " + i)

pattern = r'(?i)(?:torre)\s*\w*[\s,-]*\s*(?:apartamento|ap|apt|apto)\s*\w*|(?:apartamento|ap|apt|apto)\s*\w*[\s,-]*\s*(?:torre)\s*\w*'
df.loc[df['Complementos'].str.match(pattern,flags=re.IGNORECASE), 'TIPO' ] = '1'


pattern = r'(?i)(?:bloco|bl)\s*\w*[\s,-]*\s*(?:apartamento|ap|apt|apto)\s*\w*|(?:apartamento|ap|apt|apto)\s*\w*[\s,-]*\s*(?:bloco|bl)\s*\w*'
df.loc[df['Complementos'].str.match(pattern,flags=re.IGNORECASE), 'TIPO' ] = '2'



df.head()

df.to_csv(r'./result.csv', index = False, header=True,sep=';')



