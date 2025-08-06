import csv
import uuid
from bs4 import BeautifulSoup

# 파일 경로
html_path = "table01.html"
anime_csv_path = "anime.csv"
song_csv_path = "song.csv"

# 파싱용 초기 변수
anime_data = []
song_data = []

current_anime_id = None

with open(html_path, "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f, "html.parser")
    rows = soup.select("table tr")

    for row in rows:
        tds = row.find_all("td")

        if not tds:
            continue

        # 애니메이션 제목 행
        if len(tds) == 1 and tds[0].has_attr("colspan"):
            title_kr = tds[0].get_text(strip=True)
            anime_id = str(uuid.uuid4())
            anime_data.append([anime_id, "", title_kr])
            current_anime_id = anime_id

        # 노래 데이터 행
        elif len(tds) == 4 and current_anime_id:
            tj = tds[0].get_text(strip=True)
            ky = tds[1].get_text(strip=True)
            title = tds[2].get_text(strip=True)
            artist = tds[3].get_text(strip=True).replace("\n", ", ")
            song_data.append([
                str(uuid.uuid4()),
                title,
                "",  # titleKr
                artist,
                tj,
                ky,
                "",  # series_id
                "INSERT"
            ])

# anime.csv 쓰기
with open(anime_csv_path, "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["id", "title", "titleKr"])
    writer.writerows(anime_data)

# song.csv 쓰기
with open(song_csv_path, "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["id", "title", "titleKr", "artist", "tj", "ky", "series_id", "type"])
    writer.writerows(song_data)

print("크롤링 완료: anime.csv, song.csv 생성됨")