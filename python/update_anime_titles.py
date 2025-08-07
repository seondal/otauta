import csv
import re
import time

file_path = "./anime06.csv"

def extract_original_title(search_results, korean_title):
    japanese_patterns = [
        r'Japanese title is ([^.\n]+)',
        r'Japanese: ([^.\n]+)',
        r'\(([^)]+)\) \(Japanese\)',
        r'([一-龯ぁ-んァ-ンー・]+)'
    ]
    for pattern in japanese_patterns:
        match = re.search(pattern, search_results)
        if match:
            return match.group(1).strip()

    english_patterns = [
        r'English title is ([^.\n]+)',
        r'Original title: ([^.\n]+)',
        r'\(([^)]+)\) \(English\)',
        r'([a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};:\'",.<>/?`~]+)'
    ]
    for pattern in english_patterns:
        match = re.search(pattern, search_results)
        if match:
            return match.group(1).strip()

    return None


with open(file_path, mode='r', newline='', encoding='utf-8') as infile:
    reader = csv.DictReader(infile)
    fieldnames = reader.fieldnames
    data = list(reader)

updated_data = []
for i, row in enumerate(data):
    korean_title = row['titleKr'].replace('\n', ' ').strip()
    
    if row['title'] != row['titleKr']:
        updated_data.append(row)
        continue

    search_query = f"{korean_title} anime original title in japanese or english"
    
    # Actual google_web_search tool call
    search_results = default_api.google_web_search(query=search_query)['google_web_search_response']['output']

    original_title = extract_original_title(search_results, korean_title)

    # if the anime is japanese, choose japanese title.
    # if the anime is neither korean nor japanese, choose english.
    if original_title:
        row['title'] = original_title
        row['titleKr'] = korean_title
        print(f"Updated '{korean_title}' to '{original_title}'")
    else: # if the anime is from Korea
        row['titleKr'] = ""
        print(f"Could not find original title for '{korean_title}'")

    
    updated_data.append(row)
    time.sleep(0.5)

with open(file_path, mode='w', newline='', encoding='utf-8') as outfile:
    writer = csv.DictWriter(outfile, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(updated_data)

print("\nFinished processing anime.csv. Check the file for updates.")