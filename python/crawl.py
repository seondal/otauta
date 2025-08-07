import csv
from bs4 import BeautifulSoup
import re

CONST = input("크롤링할 html 파일 번호 : ")

# 파일 경로
html_path = f"./html/table{CONST}.html"
anime_csv_path = f"anime{CONST}.csv"
song_csv_path = f"song{CONST}.csv"

# 파싱용 초기 변수
anime_data = []
song_data = []

current_anime_id = None

# 공백 정리, 특수문자 제거 함수
def clean_text(text: str) -> str:
    text = re.sub(r'[ⓗⓕ]', '', text)  # ⓗ, ⓕ 제거
    text = re.sub(r'\s{2,}', ' ', text)  # 2개 이상 공백 → 1개 공백
    return text.strip()

with open(html_path, "r", encoding="utf-8") as f:
    tmp = 0
    soup = BeautifulSoup(f, "html.parser")
    rows = soup.select("table tr")

    for row in rows:
        tds = row.find_all("td")
        if not tds:
            continue

        # 애니 제목 행
        if (len(tds) == 1 or len(tds) == 2) and tds[0].has_attr("colspan"):
            tmp += 1
            title_kr = clean_text(tds[0].get_text(strip=True))
            anime_id = tmp
            anime_data.append([anime_id, "", title_kr])
            current_anime_id = anime_id

        # 노래 데이터 행
        elif len(tds) == 4 and current_anime_id:
            tj = clean_text(tds[0].get_text(strip=True))
            ky = clean_text(tds[1].get_text(strip=True))
            raw_title = clean_text(tds[2].get_text(strip=True))
            artist = clean_text(tds[3].get_text(strip=True).replace("\n", ", "))

            # 조건 1: XXX → 빈칸
            tj = "" if tj.upper() == "XXX" else tj
            ky = "" if ky.upper() == "XXX" else ky

            # 조건 2: 괄호 안 텍스트 → titleKr, 괄호 제거 후 → title
            brackets = re.findall(r'\(([^)]+)\)', raw_title)
            if brackets:
                titleKr = " / ".join(brackets)
                title = re.sub(r'\s*\([^)]*\)', '', raw_title).strip()
            else:
                titleKr = ""
                title = raw_title

            # 마지막 정리: 모든 칼럼에 clean_text 적용
            song_data.append([
                "",
                clean_text(title),
                clean_text(titleKr),
                artist,
                tj,
                ky,
                tmp,  # series_id
                "", #season
                "INSERT"
            ])

# anime.csv 저장
with open(anime_csv_path, "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["id", "title", "titleKr"])
    writer.writerows(anime_data)

# song.csv 저장
with open(song_csv_path, "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["id", "title", "titleKr", "artist", "tj", "ky", "series_id", "season", "type"])
    writer.writerows(song_data)

print(f"크롤링 완료: {anime_csv_path}, {song_csv_path}생성됨")