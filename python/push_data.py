import pandas as pd
import requests

CONST = input("추가할 데이터의 csv 번호 : ")

ANIME_CSV_PATH = f'./data/anime{CONST}.csv'
SONG_CSV_PATH = f'./data/song{CONST}.csv'
API_URL = 'http://localhost:3001/api/import'  # ✅ 트랜잭션 API

# CSV 읽기 및 전처리
anime_df = pd.read_csv(ANIME_CSV_PATH).fillna('')
song_df = pd.read_csv(SONG_CSV_PATH).fillna('')

# 시리즈 데이터 리스트
anime_list = []
anime_id_map = {}

for _, row in anime_df.iterrows():
    anime_list.append({
        'csvId': row['id'],  # 🔑 CSV에서 ID를 기억해야 연결 가능
        'title': row['title'],
        'titleKr': row['titleKr']
    })

# 노래 데이터 리스트
song_list = []

for _, row in song_df.iterrows():
    karaoke_info = []

    if pd.notna(row['tj']) and str(row['tj']).strip() != "":
        tj_number = str(int(row['tj'])) if isinstance(row['tj'], float) and row['tj'].is_integer() else str(row['tj'])
        karaoke_info.append({
            "provider": "TJ",
            "country": "Korea",
            "songNumber": tj_number
        })

    if pd.notna(row['ky']) and str(row['ky']).strip() != "":
        ky_number = str(int(row['ky'])) if isinstance(row['ky'], float) and row['ky'].is_integer() else str(row['ky'])
        karaoke_info.append({
            "provider": "KY",
            "country": "Korea",
            "songNumber": ky_number
        })

    song_list.append({
        "title": row['title'],
        "titleKr": row['titleKr'],
        "type": row['type'],
        "season": row.get('season', ''),
        "artist": row['artist'],
        "seriesCsvId": row['series_id'],
        "karaokeInfo": karaoke_info
    })

# 전체 전송
payload = {
    "animeList": anime_list,
    "songList": song_list
}

response = requests.post(API_URL, json=payload)

print("Status Code:", response.status_code)
print("Response:", response.text)